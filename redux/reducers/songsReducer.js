export default function songsReducer (state = [], action) {
  switch(action.type) {
    case "SET_SONGS":
      return action.payload;
    default:
      return state
  }
}