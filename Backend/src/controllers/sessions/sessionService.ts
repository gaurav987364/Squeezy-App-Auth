import SessionModel from "../../models/sessionModel";
import { NotFoundExeption } from "../../utils/Error/ErrorTypes";

export const GetAllSessionService = async (userId: string) => {
  const sessions = await SessionModel.find(
    {
      userId,
      expiresAt: { $gt: Date.now() },
    },
    {
      _id: 1,
      userId: 1,
      userAgent: 1,
      createdAt: 1,
      expiresAt: 1,
    },
    {
      sort: {
        createdAt: -1,
      },
    }
  );

  return {
    sessions,
  };
};

export const GetCurrentSessionService = async (sessionId: string) => {
  const session = await SessionModel.findById(sessionId)
    .populate("userId")
    .select("-expiresAt");

  if (!session) {
    throw new NotFoundExeption("Session Not Found.");
  }

  const { userId: user } = session; // gives only user id, but we need whole document so we do poplutae and select
  return {
    user,
  };
};

export const DeleteSessionService = async (
  sessionId: string,
  userId: string
) => {
  const deleteSession = await SessionModel.findByIdAndDelete({
    _id: sessionId,
    userId: userId,
  });

  if (!deleteSession) {
    throw new NotFoundExeption("Session Not Found.");
  }

  return;
};
