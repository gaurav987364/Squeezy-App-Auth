// !Purpose of this file is clear, we have to make logout thing works with properly with session, so on clear the session the user will logout properly, making logout functionlity have different ways but we prefer this so so for clear the session we have to need the session id from the user request. but sessionId is not direclty present in the req params. so we need this file basically decalre the top level type so that sessionId is attach in the req.params.

//? we use express-session package also, so that by used that we get a sessionid from cookie. so when a client makes a request, cookie containing the session id is automatically sent in the header.

import { UserDocument } from "../models/userModel";
import { Request } from "express";

declare global {
  namespace Express {
    interface User extends UserDocument {}
    interface Request {
      sessionId?: string;
    }
  }
}

// make sure our this @types folder includes in the ts.config.json;
