import { Router } from "express";
import {
    participantsRoot,
    participantsList,
    participantsDetailsByQuery,
    participantsDetailsByParams,
    addparticipants,
    updateparticipants,
    deleteparticipantsByQuery,
    deleteparticipantsByParams,
    updateparticipantsBySpecificField
} from "../controllers/participantsController";


const participantsRouter = Router();

participantsRouter.get("/", participantsRoot);

participantsRouter.get("/participantsList", participantsList);

participantsRouter.get("/participantsDetails/", participantsDetailsByQuery);

participantsRouter.get("/participantsDetails/:id", participantsDetailsByParams);

participantsRouter.post("/addparticipants", addparticipants);

participantsRouter.put("/updateparticipants", updateparticipants);

participantsRouter.patch("/updateparticipantsBySpecificField", updateparticipantsBySpecificField);

participantsRouter.delete("/deleteparticipants", deleteparticipantsByQuery);

participantsRouter.delete("/deleteparticipants/:id", deleteparticipantsByParams);



export default participantsRouter;