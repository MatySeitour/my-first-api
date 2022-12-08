import { pool } from "../db.js";

export const getAuthors = async (request, response) => {
    try {
        const [result] = await pool.query("SELECT * FROM authors");
        response.json(result)
    }
    catch (error) {
        return response.status(500).json({
            message: "something was wrong"
        })
    }
}