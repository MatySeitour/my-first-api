const { response } = require("express");
const express = require("express");
const mysql = require("mysql");

const app = express();
app.use(express.json())

app.use((request, response, next) => {
    console.log(request.method)
    console.log(request.path)
    console.log(request.body)
    next();
})

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "matcr7shirohige",
    database: "platzi_operation",
})



let notes = [
    {
        "id": 1,
        "content": "mi nombre es matias",
        "important": true,
    },
    {
        "id": 2,
        "content": "hoy comí arroz con pechuga",
        "important": false,
    },
    {
        "id": 3,
        "content": "hoy es miercoles",
        "important": true,
    },
]

app.get(`/api/notes`, (request, response) => {
    const sql = "SELECT * FROM books";
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(error)
        }
        if (results.length > 0) {
            response.json(results)
        }
        else {
            response.send("Not results")
        }
    })
})

app.get(`/api/notes/:id`, (request, response) => {
    const id = Number(request.params.id);
    const sql = `SELECT * FROM books WHERE book_id = ${id}`;
    connection.query(sql, (error, result) => {
        if (error) {
            console.log(error)
        }
        if (result.length > 0) {
            response.json(result)
        }
        else {
            response.send("Not result")
        }
    })
})

app.put(`/api/notes/:id`, (request, response) => {
    const id = Number(request.params.id);
    const { copies } = request.body;
    const sql = `UPDATE books SET copies = ${copies} WHERE book_id = ${id}`

    connection.query(sql, error => {
        if (error) throw error;
        response.send("Book modificate")
    })
})

app.delete(`/api/notes/:id`, (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter(note => note.id !== id)
    response.status(204).end();
})

app.post(`/api/notes`, (request, response) => {
    const note = request.body;
    const sql = 'INSERT INTO books SET ?';

    const newBook = {
        author_id: request.body.author_id,
        title: request.body.title,
        year: request.body.year,
        language: request.body.language,
        cover_url: request.body.cover_url,
        price: request.body.price,
        sellable: request.body.sellable,
        copies: request.body.copies,
        description: request.body.description,
    }

    connection.query(sql, newBook, error => {
        if (error) throw error;
        response.send("Book create")
    })
    // if (!note || !note.content) {
    //     return response.status(400).json({
    //         error: "note.content is missing",
    //     })
    // }

    // const ids = notes.map(note => note.id);
    // const maxId = Math.max(...ids);

    // const newNote = {
    //     book_id: maxId + 1,
    //     content: note.content,
    //     important: typeof note.important !== "undefined" ? note.important : false,
    //     data: new Date().toISOString(),
    // }

    // notes = [...notes, newNote];

    // response.json(newNote);
})

app.use((request, response) => {
    response.status(404).json({
        error: "error not found"
    })
})

const PORT = procces.env.PORT || 3001;


connection.connect(error => {
    if (error) {
        console.log(error)
    }
    console.log("Database server running!");
})

app.listen(PORT, () => {
    console.log(`server running in port ${PORT}`)
})