import { combineComponents } from "../helper/context";
import ProfileContext from "./ProfileContext";
const providers = [ProfileContext];

export const AppContextProvider = combineComponents(...providers);
