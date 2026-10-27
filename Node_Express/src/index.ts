import express from "express";
import type { Request, Response, NextFunction } from 'express';
import homeRouter from "./routes/home.routes.js"
const app = express();
const PORT = 3000;


app.use((req: Request, res: Response, next: NextFunction) => {
console.log(`Request: ${req.method} ${req.url}`);
next();
})

app.use("/shop", homeRouter)
app.use((req: Request, res: Response) => {
res.status(404).send("<h1>404 - Page Not Found</h1>");
});

app.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}`);
});