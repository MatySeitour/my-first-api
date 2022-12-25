import express from "express"
import booksRoutes from "./routes/books.routes.js";
import authorsRoutes from "./routes/authors.routes.js"
import cors from "cors"

const app = express();
app.use(express.json())
app.use(cors());

app.use(booksRoutes);
app.use(authorsRoutes)


app.use((request, response) => {
    response.status(404).json({
        error: "error not found"
    })
})

export default app;
