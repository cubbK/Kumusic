import { combineReducers } from "redux";
import songsReducer from "./songsReducer";
export const combinedReducers= combineReducers({
  songs: songsReducer
});