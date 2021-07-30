/* eslint-disable no-param-reassign */
const express = require('express');
const bodyParser = require('body-parser');
const booksController = require('../controllers/books');

function routes(Book) {
  const bookRouter = express.Router();
  const controller = booksController(Book);

  bookRouter.use(bodyParser.urlencoded({
    extended: true
  }));
  bookRouter.use(bodyParser.json());

  bookRouter.route('/books')
    .get(controller.get)
    .post(controller.post);

  // Middleware function
  bookRouter.use('/books/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });

  bookRouter.route('/books/:bookId')
    .get((req, res) => {
      const returnBook = req.book.toJSON();
      const encodedGenre = encodeURI(req.book.genre);
      returnBook.links = {};
      returnBook.links.FilterByThisGenre = `${req.protocol}://${req.headers.host}${req.baseUrl}/books/?genre=${encodedGenre}`;
      res.json(returnBook);
    })
    .put((req, res) => {
      const {
        book
      } = req;
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      book.save();
      return res.json(book);
    });
  return bookRouter;
}
module.exports = routes;
