const { Book } = require("../models/book");

module.exports = app => {
  // GET

  // * get one book
  app.get("/api/getBook", (req, res) => {
    // get book by id
    //http://localhost:3001/api/getBook?id=5dbc691a4f754f43fc44c195
    let id = req.query.id;
    Book.findById(id, (err, doc) => {
      if (err) return res.status(400).send(err);
      res.send(doc);
    });
  });

  // * get all books
  app.get("/api/books", (req, res) => {
    // some options to get books
    // the url will be   localhost:3001/api/books?skip=3&limit=2&order=asc  order as asc
    // the url will be   localhost:3001/api/books?skip=3&limit=2&order=desc  order as desc
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;
    // order = asc || desc
    Book.find()
      .skip(skip)
      .sort({ _id: order })
      .limit(limit)
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
      });
  });

  // POST
  app.post("/api/book", (req, res) => {
    // geting the new book from inside body parser
    const book = new Book(req.body);
    // store book to database
    book.save((err, doc) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        post: true,
        // id of book
        bookId: doc._id
      });
    });
  });

  // UPDATE
  app.post("/api/book_update", (req, res) => {
    Book.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true },
      (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
          success: true,
          doc
        });
      }
    );
  });
  // DELETE
  app.delete("/api/delete_book", (req, res) => {
    let id = req.query.id;
    Book.findByIdAndRemove(id, (err, doc) => {
      if (err) return res.status(400).send(err);
      res.json(true);
    });
  });
};
