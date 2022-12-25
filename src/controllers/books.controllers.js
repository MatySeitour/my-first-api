import { pool } from "../db.js";


export const getBooks = async (request, response) => {
    try {
        const [result] = await pool.query("SELECT * FROM books");
        response.json(result)
    }
    catch (error) {
        return response.status(500).json({
            message: "somethingasdas was wrong"
        })
    }
}

export const getBookById = async (request, response) => {
    try {
        const id = Number(request.params.id);
        const [result] = await pool.query(`SELECT * FROM books WHERE book_id = ${id}`);
        if (result.length <= 0) return response.status(404).json({
            message: "book not found"
        })
        response.json(result[0])
    }
    catch (error) {
        return response.status(500).json({
            message: "something was wrong"
        })
    }

}

export const putBook = async (request, response) => {
    try {
        const id = Number(request.params.id);
        const { author_id, title, year, language, cover_url, price, sellable, copies, description } = request.body;

        const [result] = await pool.query(`UPDATE books SET ? WHERE book_id = ?`, [request.body, id])

        if (result.affectedRows === 0) return response.status(404).json({
            message: "Book not found"
        })

        const [rows] = await pool.query(`SELECT * FROM books WHERE book_id = ${id}`)

        response.json(rows)
    }
    catch (error) {
        return response.status(500).json({
            message: "something was wrong"
        })
    }
}

export const deleteBook = async (request, response) => {
    try {
        const [result] = await pool.query(`DELETE FROM books where book_id=${request.body.idToDelete}`)
        response.json(result[0])
    }
    catch (error) {
        return response.status(500).json({
            message: "something was wrong"
        })
    }
}

export const createBooks = async (request, response) => {
    try {
        const { author_id, title, year, language, cover_url, price, sellable, copies, description } = request.body;
        const [result] = await pool.query(`INSERT INTO books (author_id, title, year, language, cover_url, price, sellable, copies, description) VALUES (${author_id}, "${title}", ${year}, "${language}", ${cover_url}, ${price}, ${sellable}, ${copies}, ${description})`);
        response.send({
            id: result.insertId,
        })
    }
    catch (error) {
        return response.status(500).json({
            message: "something was wrong"
        })
    }
}