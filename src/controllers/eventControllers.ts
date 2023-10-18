import axios from "axios";
import { Response, Request} from "express";
import {open} from "sqlite";
import sqlite3 from "sqlite3";
import Event from "../eventModels";
//import { createDbConnection } from "../db/dbConfig"; - pq não usa?
//import { Database } from "sqlite3"; - pq não usa?
import logger from "../services/logger";


const dbPromise = open({
    filename: "src/db/eventDatabase.sqlite",
    driver: sqlite3.Database,
    });

    export const eventControllerGuestDetails = {  // Função assíncrona para criar um novo evento (exportada)
        logger.info(req);
        createEvent: async (req: Request, res: Response) => {
          const db = await dbPromise; //estabelece conexão com o banco
          const event: Event = req.body; // Dados do evento vindos do corpo da requisição
          const usersServiceURL = process.env.USERS_SERVICE_URL;// URL do microsserviço de usuários, definida em variáveis de ambiente - cuidar .env

    if (
      !event.event.Name ||
      !event.eventLocation ||
      !event.maxNumberOfPariticipants ||
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
    for (const userId of event.guests) {
      const handleUsersURL = `${usersServiceURL}/students/studentDetails/${userId}`;
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