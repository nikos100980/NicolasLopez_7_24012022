import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import messageReducer from "./messages.reducer";
import usersReducer from "./users.reducer";


export default combineReducers ({
    userReducer,
    usersReducer,
    messageReducer,
    
});  