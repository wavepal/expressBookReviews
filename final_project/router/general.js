const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({message: "Username and password are required"});
  if (users.find(u => u.username === username)) return res.status(409).json({message: "User already exists"});
  
  users.push({username, password});
  return res.status(200).json({message: "Customer successfully registered. Now you can login"});
});

public_users.get('/',function (req, res) {
  return res.status(200).send(JSON.stringify(books, null, 4));
});

public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  return res.status(200).json(books[isbn]);
});

public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let foundBooks = Object.values(books).filter(b => b.author === author);
  return res.status(200).json(foundBooks);
});

public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let foundBooks = Object.values(books).filter(b => b.title === title);
  return res.status(200).json(foundBooks);
});

public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;

// ==========================================
// TASK 11: Axios Async/Await Implementation
// ==========================================
const axios = require('axios');

// Задание 10: Получить все книги с использованием async/await
async function getAllBooksAxios() {
    try {
        let response = await axios.get('http://localhost:5000/');
        console.log("All books:", response.data);
    } catch (error) {
        console.error(error);
    }
}

// Задание 11: Получить книгу по ISBN с использованием Promises
function getBookByIsbnAxios(isbn) {
    axios.get(`http://localhost:5000/isbn/${isbn}`)
        .then(response => {
            console.log("Book by ISBN:", response.data);
        })
        .catch(error => {
            console.error(error);
        });
}

// Задание 12: Получить книгу по автору
async function getBookByAuthorAxios(author) {
    try {
        let response = await axios.get(`http://localhost:5000/author/${author}`);
        console.log("Book by Author:", response.data);
    } catch (error) {
        console.error(error);
    }
}

// Задание 13: Получить книгу по названию
async function getBookByTitleAxios(title) {
    try {
        let response = await axios.get(`http://localhost:5000/title/${title}`);
        console.log("Book by Title:", response.data);
    } catch (error) {
        console.error(error);
    }
}

// Раскомментируйте функции ниже, чтобы проверить их работу в консоли
// getAllBooksAxios();
// getBookByIsbnAxios(1);
// getBookByAuthorAxios("Chinua Achebe");
// getBookByTitleAxios("Things Fall Apart");
