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

// import { config } from "dotenv";

// config();

// export const PORT = process.env.PORT || 3001;
// export const DB_USER = process.env.DB_USER || "root";
// export const DB_HOST = process.env.DB_HOST || "localhost";
// export const DB_PASSWORD = process.env.DB_PASSWORD || "matcr7shirohige";
// export const DB_DATABASE = process.env.DB_DATABASE || "platzi_operation";
// export const DB_PORT = process.env.DB_PORT || 3306;