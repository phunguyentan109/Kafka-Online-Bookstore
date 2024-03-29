// import genre images
import gA from 'assets/imgs/gA.jpg'
import scifi2 from './images/scifi2.jpg'
import fantasy from './images/fantasy.jpg'
import fantasy2 from './images/fantasy2.jpg'
import crime from './images/crime.jpg'

// import book image
import bookFrt from 'assets/imgs/frt.jpg'
import bookBck from 'assets/imgs/bck.png'
import book from 'assets/imgs/book.jpg'

const benefits = [
  {
    icon: 'fas fa-shopping-cart',
    name: 'Free Shipping',
    subname:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit ante tempor lectus.',
  },
  {
    icon: 'fas fa-gift',
    name: 'Gift Wrapping',
    subname:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit ante tempor lectus.',
  },
  {
    icon: 'fas fa-share-square',
    name: '30-Day Return',
    subname:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit ante tempor lectus.',
  },
]

const genres = [
  {
    bg: gA,
    col: 14,
    genre: 'Politics & Region',
  },
  {
    bg: scifi2,
    col: 24,
    genre: 'Science Fiction',
  },
  {
    bg: fantasy2,
    col: 24,
    genre: 'Young Adult',
  },
  {
    bg: crime,
    col: 24,
    genre: 'Crime / Thriller',
  },
]

export const subGenres = [
  'Fantasy',
  'Short Stories',
  'Mystery',
  'Audiobook',
  'Fiction',
]

const recommend = {
  name: 'Journey To the center of the Earth',
  author: 'Jules Vernes',
  desc: 'From advanced selectors to generated content to web fonts, and from gradients, shadows, and rounded corners to elegant animations, CSS3 hold a universe of creative possibilities. No one can better guide you through these galaxies than Dan Cederholm.',
  front: bookFrt,
  back: bookBck,
}

const books = [
  {
    img: book,
    name: 'Go Set A Watchman',
    author: 'Harper Lee',
    price: 105,
    discount: 20,
  },
  {
    img: book,
    name: 'Brave New World',
    author: 'Aldous Huxley',
    price: 105,
    discount: 20,
  },
  {
    img: book,
    name: 'The Murder Of Roger Ackroyd',
    author: 'Agatha Christie',
    price: 105,
    discount: 20,
  },
  {
    img: book,
    name: 'Wolf Hall',
    author: 'Hilary Mantel',
    price: 105,
    discount: 20,
  },
]

export { benefits, genres, recommend, books }
