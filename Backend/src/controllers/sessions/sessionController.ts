import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import {
  DeleteSessionService,
  GetAllSessionService,
  GetCurrentSessionService,
} from "./sessionService";
import { HTTPSSTATUS } from "../../config/http.config";
import { NotFoundExeption } from "../../utils/Error/ErrorTypes";
import { z } from "zod";

const getAllSessions = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const sessionId = req.sessionId;
    const userId = req.user?.id;

    const { sessions } = await GetAllSessionService(userId);
    const modifySessions = sessions.map((session) => ({
      ...session.toObject(), //convert to plain-js object taki we do below stuff
      ...(session.id === sessionId && {
        isCurrent: true, //adding proprty to object;
      }),
    }));

    return res.status(HTTPSSTATUS.OK).json({
      message: "Retrieved All Session Succesfully.",
      sessions: modifySessions,
    });
  }
);

//get current-active session
const getSession = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const sessionId = req.sessionId;

    if (!sessionId) {
      throw new NotFoundExeption("Invalid Session.");
    }

    const { user } = await GetCurrentSessionService(sessionId);
    return res.status(HTTPSSTATUS.OK).json({
      message: "Session Retrieved Successfully",
      user,
    });
  }
);

//delete session
const deleteSession = asyncHandler(async (req: Request, res: Response) => {
  const sessionId = z.string().parse(req.params.id);
  const userId = req.user?.id;

  if (!sessionId || !userId) {
    throw new NotFoundExeption("Resources Not Found.");
  }

  await DeleteSessionService(sessionId, userId);

  return res.status(HTTPSSTATUS.OK).json({
    message: "Session Deleted Successfully.",
  });
});

export { getAllSessions, getSession, deleteSession };
