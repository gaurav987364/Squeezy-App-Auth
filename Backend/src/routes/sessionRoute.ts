import { Router } from "express";
import {
  getAllSessions,
  getSession,
  deleteSession,
} from "../controllers/sessions/sessionController";

const sessionRoute = Router();

//get all
sessionRoute.get("/getall", getAllSessions);

//current session
sessionRoute.get("/", getSession);

//delet-session-by-id
sessionRoute.delete("/:id", deleteSession);

export default sessionRoute;
