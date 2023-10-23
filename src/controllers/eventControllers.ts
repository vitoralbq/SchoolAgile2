import axios from "axios";
import { Response, Request} from "express";
import {open} from "sqlite";
import sqlite3 from "sqlite3";
import {Event} from "../models/Event";
import {log} from "../services/logger"
import { Database } from "sqlite3";
import { createDbConnection } from "../db/dbConfig";
let db: Database = createDbConnection();
const dbPromise = open({
    filename: "src/db/eventDatabase.sqlite",
    driver: sqlite3.Database,
    });

    export const eventController = {  // Função assíncrona para criar um novo evento (exportada)
        createEvent: async (req: Request, res: Response) => {
          const db = await dbPromise; //estabelece conexão com o banco
          const event: Event = req.body; // Dados do evento vindos do corpo da requisição
          const usersServiceURL = process.env.USERS_SERVICE_URL;// URL do microsserviço de usuários, definida em variáveis de ambiente - cuidar .env

    if (
      !event.name ||
      !event.location ||
      !event.maxNumberOfParticipants ||
      !event.hoursOfDuration ||
      !event.typeOfEvent ||
      !event.eventHost ||
      !event.guests
    ) {
      return res
        .status(400)
        .send("Propriedades obrigatórias ausentes no corpo da requisição.");
    }
    const guestsDetails = [];

    // Loop para verificar e coletar detalhes dos convidados usando o microsserviço de usuários
    for (const id of event.guests) {
      const handleUsersURL = `${usersServiceURL}/events/eventDetails/${id}`;
      try {
        const userResponse = await axios.get(handleUsersURL);
        if (userResponse.status === 200) {
          guestsDetails.push(userResponse.data);
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    }
  }
};
const addEvent = (req: Request, res: Response) => {
  log.info(req);

  let token = req.headers.authorization;

  if (token == "Bearer 12345") {
      let event: Event = req.body;
      let locationToUppercase: string = event.location.toUpperCase();

      let sql = `INSERT INTO events(name, shift, year, location) VALUES ("${event.name}", "${event.typeOfEvent}", "${event.maxNumberOfParticipants}", "${locationToUppercase}", "${event.hoursOfDuration}","${event.guests}","${event.eventHost}")`;

      if (event.name && event.eventHost && event.guests && event.location && event.maxNumberOfParticipants && event.hoursOfDuration && event.typeOfEvent) {
          db.run(sql,
              (error: Error) => {
                  if (error) {
                      res.end(error.message);
                  }
                  res.send(`event ${event.name} Added`);
              })
      } else {
          res.send("Erro na criação do Evento. Verifique se todos os campos foram preenchidos");
      }
  } else {
      res.sendStatus(403);
  }

}
export {addEvent};