import React, {useState, useEffect, useCallback} from "react";
import {Col, Row, Card, Form, Input} from "antd";
import SearchBar from "components/Shop/Bar/SearchBar";
import withNoti from "hocs/App/withNoti";
import api from "constants/api";
import {apiCall, apiFdCall} from "constants/apiCall";
import Widget from "components/Widget/index";

const FormItem = Form.Item;
const {TextArea} = Input;

const DEFAULT_EDITION = {
    bookimage_id: [],
    provider_id: "",
    book_id: "",
    desc: ""
}

const SelectedBook = ({image, name, isbn, authors, deselect}) => (
    <Widget styleName="gx-p-lg-1">
        <Row>
            <Col xl={9} lg={10} md={10} sm={10} xs={24}>
                <img className="gx-rounded-lg gx-w-100" alt="..." src={image.url}/>
            </Col>
            <Col xl={15} lg={14} md={14} sm={14} xs={24}>
                <div className="gx-fnd-content">
                    <p className="gx-text-grey">ISBN - {isbn}</p>
                    <h2 className="gx-text-uppercase gx-text-black gx-font-weight-bold gx-fnd-title">{name}</h2>
                    <p>{authors.toString()}</p>
                    <button onClick={deselect}>Deselect</button>
                </div>
            </Col>
        </Row>
    </Widget>
)

const Book = ({book, select}) => (
    <Widget styleName="gx-card-full gx-dot-arrow-hover">
        <div className="gx-user-wid-row">
            <div className="gx-user-wid gx-mr-3">
                <img alt="..." src={book.image.url} className="gx-object-cover"/>
            </div>
            <div className="gx-user-wid-body gx-py-3 gx-pr-3">
                <div className="ant-row-flex">
                    <h2 className="h4 gx-mr-1 gx-mb-1">{book.name}</h2>
                </div>
                <p className="gx-mb-1 gx-text-grey gx-fs-sm">{book.authors.toString()}<br/> ISBN - {book.isbn}</p>
                <div className="gx-dot-arrow" onClick={select}>
                    <div className="gx-bg-primary gx-hover-arrow">
                        <i className="icon icon-long-arrow-right gx-text-white"/>
                    </div>
                    <div className="gx-dot">
                        <i className="icon icon-ellipse-v gx-text-primary"/>
                    </div>
                </div>
            </div>
        </div>
    </Widget>
)

function SearchView({books, setBooks, hdSelect, ...props}) {
    return (
        <div>
            <Card className="gx-card" title="Select Subject Book">
                <Form layout="horizontal">
                    <FormItem
                        label="Select the subject book"
                        labelCol={{xs: 24, sm: 6}}
                        wrapperCol={{xs: 24, sm: 10}}
                    >
                        <SearchBar
                            placeholder="Enter the name of any book or author..."
                            data={books}
                            setData={setBooks}
                            keys={["name", "authors"]}
                            {...props}
                        />
                    </FormItem>
                </Form>
            </Card>
            {
                props.disabled || <Row>
                    {
                        books.map((v, i) => (
                            <Col xl={6} lg={12} md={12} sm={12} xs={24} key={i}>
                                <Book select={hdSelect.bind(this, v)} book={v}/>
                            </Col>
                        ))
                    }
                </Row>
            }
        </div>
    )
}

function CreateEdition({notify, ...props}) {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState({});
    const [edition, setEdition] = useState(DEFAULT_EDITION);

    const load = useCallback(async() => {
        try {
            let bookData = await apiCall(...api.book.get());
            bookData.forEach(b => b.authors = b.authors.map(a => a.name))
            setBooks(bookData);
        } catch (e) {
            return notify("error", "Data is not loaded");
        }
    }, [notify]);

    useEffect(() => {
        load();
    }, [load]);

    function hdSelect(book) {
        setSelectedBook(book);
    }

    function hdChange(e) {
        const {name, value} = e.target;
        setEdition(prev => ({...prev, [name]: value}))
    }

    return (
        <div>
            <SearchView
                books={books}
                setBooks={setBooks}
                disabled={!!selectedBook._id}
                hdSelect={hdSelect}
            />
            {
                books.length === 0 && <Card>There is no subject book found. <u>Create one here.</u></Card>
            }
            {
                selectedBook._id && <Row>
                    <Col xl={10} lg={24} md={24} sm={24} xs={24}>
                        <SelectedBook {...selectedBook} deselect={() => setSelectedBook({})}/>
                    </Col>
                    <Col xl={14} lg={24} md={24} sm={24} xs={24}>
                        <Card className="gx-card" title="Edition's Information">
                            <Form layout="vertical">
                                <FormItem label="Edition Description">
                                    <TextArea
                                        rows={4}
                                        name="desc"
                                        placeholder="Enter the edition's description here..."
                                        value={edition.desc}
                                        onChange={hdChange}
                                    />
                                </FormItem>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            }
        </div>
    )
}

export default withNoti(CreateEdition);