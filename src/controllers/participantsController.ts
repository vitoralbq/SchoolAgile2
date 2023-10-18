import { Response, Request, NextFunction } from "express";
import participants from "../models/Participants";
import createDbConnection from "../db/dbConfig";
import { Database } from "sqlite3";
import logger from "../services/logger";


let db: Database = createDbConnection();

const participantsRoot = (req: Request, res: Response, next: NextFunction) => {

    res.sendStatus(201);

    // res.send("Página Inicial participants");
}

const participantsList = (req: Request, res: Response) => {


    let participantsList: participants[] = [];

    let sql = `SELECT * FROM participants`;

    db.all(sql, [], (error: Error, rows: participants[]) => {
        if (error) {
            logger.error(error.message);
            res.send(error.message);
        }
        rows.forEach((row: participants) => { participantsList.push(row) });
        logger.info(req);
        res.send(participantsList);
    }
    );
}



const participantsDetailsByQuery = (req: Request, res: Response) => {
    logger.info(req);
    let id = req.query.id;
    let sql = `SELECT * FROM participants WHERE id="${id}"`;

    db.all(sql, [], (error: Error, rows: participants[]) => {
        if (error) {
            res.send(error.message);
        }
        if (rows.length > 0) {
            res.send(rows[0]);
        } else {
            res.send("Participante não existe");
        }

    }
    );
}

const participantsDetailsByParams = (req: Request, res: Response) => {
    logger.info(req);
    let id = req.params.id;
    let sql = `SELECT * FROM participants WHERE id="${id}"`;

    db.all(sql, [], (error: Error, rows: participants[]) => {
        if (error) {
            res.send(error.message);
        }
        if (rows.length > 0) {
            res.send(rows[0]);
        } else {
            res.send("participante não existe");
        }

    }
    );
}

const addparticipants = (req: Request, res: Response) => {
    logger.info(req);

    let token = req.headers.authorization;

    if (token == "Bearer 12345") {
        let participants: participants = req.body;
        let typeToUppercase: string = participants.type.toUpperCase();

        let sql = `INSERT INTO participants(name, id, type) VALUES ("${participants.name}", "${participants.id}", "${typeToUppercase}")`;

        if (participants.name && participants.id && participants.type) {
            db.run(sql,
                (error: Error) => {
                    if (error) {
                        res.end(error.message);
                    }
                    res.send(`participants ${participants.name} Added`);
                })
        } else {
            res.send("Erro na criação do participante. Verifique se todos os campos foram preenchidos");
        }
    } else {
        res.sendStatus(403);
    }



}

const updateparticipants = (req: Request, res: Response) => {
    logger.info(req);
    let participants: participants = req.body;
    let sql = `UPDATE participants SET name="${participants.name}", 
                    type="${participants.type}", 
                    WHERE id="${participants.id}"
                                   `;


    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("participants Updated");
    });
}

const updateparticipantsBySpecificField = (req: Request, res: Response) => {
    logger.info(req);
    let participants: participants = req.body;
    let sql = `UPDATE participants SET name="${participants.name}"
                                   WHERE id="${participants.id}"
    `
    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("participants Updated");
    })
}

const deleteparticipantsByQuery = (req: Request, res: Response) => {
    logger.info(req);
    let id = req.query.id;
    let sql = `DELETE from participants WHERE id="${id}"`;

    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("participants Deleted");
    })
}

const deleteparticipantsByParams = (req: Request, res: Response) => {
    logger.info(req);
    let id = req.params.id;
    let sql = `DELETE from participants WHERE id="${id}"`;

    db.all(sql, [], (error: Error) => {
        if (error) {
            res.send(error.message);
        }
        res.send("participants Deleted");
    })
}



export {
    participantsRoot,
    participantsList,
    participantsDetailsByQuery,
    participantsDetailsByParams,
    addparticipants,
    updateparticipants,
    updateparticipantsBySpecificField,
    deleteparticipantsByQuery,
    deleteparticipantsByParams
};