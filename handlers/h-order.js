const db = require("../models");
const {gatherDataById} = require("../manipulate");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.create = async(req, res, next) => {
    try {
        const {user_id} = req.params;
        const {orderEditions, order, stripeToken} = req.body;

        // Create stripe charge if the order is online paid successfully
        let isCheckedOut = false;
        if(stripeToken) {
            let charge = await stripe.charges.create({
                amount: order.money * 100,
                currency: 'usd',
                source: stripeToken,
                description: 'Charge for order book',
            })
            if(charge.paid) isCheckedOut = true;
        }

        // Decrease the amount of each edition
        for(let e of orderEditions) {
            let foundEdition = await db.Edition.findById(e.edition_id);
            if(foundEdition) {
                foundEdition.amount -= e.quantity;
                await foundEdition.save();
            }
        }

        // Create the Order and get the order id
        let createdOrder = await db.Order.create({...order, user_id, isCheckedOut});

        // Using the created order id for creating OrderItem
        for(let e of orderEditions) {
            await db.OrderEdition.create({
                order_id: createdOrder._id,
                ...e
            });
        }

        return res.status(200).json(createdOrder);
    } catch (e) {
        return next(e);
    }
}

exports.get = async(req, res, next) => {
    try {
        const {user_id} = req.params;
        let foundOrder = await db.Order.find(user_id ? {user_id} : {});
        return res.status(200).json(foundOrder);
    } catch (e) {
        return next(e);
    }
}

exports.getOne = async(req, res, next) => {
    try {
        const {order_id} = req.params;
        let foundOrder = await db.Order.findById(order_id).lean().exec();
        // get list of order item
        let foundOrderEdition = await db.OrderEdition.find({order_id}).populate({
            path: "edition_id",
            populate: {
                path: "book_id"
            }
        }).lean().exec();

        // add author for each book (access through edition)
        let bookauthors = await db.BookAuthor.find().populate("author_id").exec();
        foundOrderEdition.forEach(e => {
            e.edition_id.book_id.authors = gatherDataById(e.edition_id.book_id._id, "author_id", bookauthors);
        })

        // add orderEdtion to Order
        foundOrder.items = foundOrderEdition;

        return res.status(200).json(foundOrder);
    } catch (e) {
        return next(e);
    }
}

exports.edit = async(req, res, next) => {
    try {
        const {order_id} = req.params;
        let foundOrder = await db.Order.findById(order_id);
        if(foundOrder) {
            foundOrder.status = req.body.status;
            if(req.body.status === 2) foundOrder.isCheckedOut = true;
            await foundOrder.save();
        }
        return res.status(200).json(foundOrder);
    } catch (e) {
        return next(e);
    }
}
