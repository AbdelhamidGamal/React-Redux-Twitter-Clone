import { ReciveUsers } from './users';
import { reciveTweets } from './tweets';
import { setAuthedUser } from './authedUser';
import { showLoading, hideLoading } from 'react-redux-loading';

const AUTHED_ID = 'tylermcginnis';

export function handleReciveData() {
  return dispatch => {
    dispatch(showLoading());
    fetch('http://localhost:4000/users')
      .then(res => res.json())
      .then(data => dispatch(ReciveUsers(data)))
      .catch(err => console.log(err));

    fetch('http://localhost:4000/tweets')
      .then(res => res.json())
      .then(data => {
        dispatch(reciveTweets(data));
        setTimeout(() => {
          dispatch(setAuthedUser(AUTHED_ID));
        }, 1000);
      })
      .catch(err => console.log(err));

    setTimeout(() => {
      dispatch(hideLoading());
    }, 500);
  };
}
