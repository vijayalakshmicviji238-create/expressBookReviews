

const express = require('express');
const axios = require('axios');

const general = express.Router();

// Get book by ISBN
general.get('/isbn/:isbn', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000');
        const books = response.data;
        const book = books[req.params.isbn];

        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving book' });
    }
});

// Get books by author
general.get('/author/:author', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000');
        const books = Object.values(response.data);

        const result = books.filter(book =>
            book.author.toLowerCase() === req.params.author.toLowerCase()
        );

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving books' });
    }
});

// Get books by title
general.get('/title/:title', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000');
        const books = Object.values(response.data);

        const result = books.filter(book =>
            book.title.toLowerCase() === req.params.title.toLowerCase()
        );

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving books' });
    }
});

module.exports = general;

