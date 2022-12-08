import { Router } from 'express'
import { getBooks, getBookById, putBook, deleteBook, createBooks } from "../controllers/books.controllers.js"

const router = Router();

router.get(`/api/books`, getBooks)

router.get(`/api/books/:id`, getBookById)

router.patch(`/api/books/:id`, putBook)

router.delete(`/api/books/`, deleteBook)

router.post(`/api/books`, createBooks)

export default router;