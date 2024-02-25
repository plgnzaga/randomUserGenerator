import { combineReducers } from "redux";
import todoListReducer from "./todoListReducer";

export const allReducers = combineReducers({
    toDoList:todoListReducer
});