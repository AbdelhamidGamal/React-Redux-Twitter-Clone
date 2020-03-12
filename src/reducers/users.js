import { RECIVE_USERS } from '../actions/users';

export default function Users(state = [], action) {
  switch (action.type) {
    case RECIVE_USERS:
      return action.payload;
    default:
      return state;
  }
}
