import UserModel from "../../models/userModel";
import { NotFoundExeption } from "../../utils/Error/ErrorTypes";

export const UserService = async (userId: string) => {
  try {
    const user = await UserModel.findById(userId, {
      password: false,
    });
    return user || null;
  } catch (error) {
    throw new NotFoundExeption("User Not found.");
  }
};
