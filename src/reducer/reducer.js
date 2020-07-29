import {combineReducers} from "redux";
import {reducer as data} from "./data/data";
import {reducer as states} from "./states/states";
import {reducer as user} from "./user/user";
import NameSpace from "./name-space.js";

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.STATES]: states,
  [NameSpace.USER]: user,
});
