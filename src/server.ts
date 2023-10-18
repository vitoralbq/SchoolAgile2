import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import participantsRouter from "./routes/participantsRoutes";

dotenv.config();

const server = express();
const port = process.env.PORT || 3000;

server.use(cors());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

server.get("/", (req, res) => {
    res.send("FUNCIONANDO GRACAS A DEUS PAIS RECEBA!");
});

// Defina suas rotas aqui usando participantsRouter
server.use("/participants", participantsRouter);

server.listen(port, () => {
    console.log(`Servidor escutando na porta ${port}`);
});