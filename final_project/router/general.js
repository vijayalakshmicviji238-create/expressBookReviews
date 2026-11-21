
const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

const public_users = express.Router();

public_users.post("/register", (req, res) => {
    return res.status(300).json({ message: "Yet to be implemented" });
});

// Get all books
public_users.get('/', (req, res) => {
    Promise.resolve(books)
        .then((bookList) => {
            return res.status(200).json(bookList);
        })
        .catch((error) => {
            return res.status(500).json({ message: "Error retrieving books" });
        });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', (req, res) => {
    Promise.resolve(books)
        .then((bookList) => {
            const isbn = req.params.isbn;

            if (bookList[isbn]) {
                return res.status(200).json(bookList[isbn]);
            }

            return res.status(404).json({ message: "Book not found" });
        })
        .catch((error) => {
            return res.status(500).json({ message: "Error retrieving book" });
        });
});

// Get book details based on author
public_users.get('/author/:author', (req, res) => {
    Promise.resolve(books)
        .then((bookList) => {
            const author = req.params.author.toLowerCase();

            const result = Object.values(bookList).filter(
                book => book.author.toLowerCase() === author
            );

            if (result.length === 0) {
                return res.status(404).json({ message: "Author not found" });
            }

            return res.status(200).json(result);
        })
        .catch((error) => {
            return res.status(500).json({ message: "Error retrieving books" });
        });
});

// Get all books based on title
public_users.get('/title/:title', (req, res) => {
    Promise.resolve(books)
        .then((bookList) => {
            const title = req.params.title.toLowerCase();

            const result = Object.values(bookList).filter(
                book => book.title.toLowerCase() === title
            );

            if (result.length === 0) {
                return res.status(404).json({ message: "Title not found" });
            }

            return res.status(200).json(result);
        })
        .catch((error) => {
            return res.status(500).json({ message: "Error retrieving books" });
        });
});

// Get book review
public_users.get('/review/:isbn', (req, res) => {
    return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
