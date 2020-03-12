export const RECIVE_USERS = 'RECIVE_USERS';

export function ReciveUsers(users) {
  return {
    type: RECIVE_USERS,
    payload: users
  };
}
