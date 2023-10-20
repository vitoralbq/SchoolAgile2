import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import eventsRoutes from "./routes/eventsRoutes";

dotenv.config();

const server = express();
const port = 3002 //process.env.PORT;

server.use(cors());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

server.get("/", (req, res) => {
    res.send("FUNCIONANDO GRACAS A DEUS PAIS RECEBA!");
});

// Defina suas rotas aqui usando participantsRouter
server.use("/events", eventsRoutes);

server.listen(port, () => {
    console.log(`Servidor escutando na porta ${port}`);
});