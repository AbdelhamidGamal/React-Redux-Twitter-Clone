import {
  RECIVE_TWEETS,
  ADD_TWEET,
  TOGGLE_TWEET,
  ADD_REPLAY
} from '../actions/tweets';

export default function tweets(state = [], action) {
  switch (action.type) {
    case RECIVE_TWEETS:
      return action.payload;
    case TOGGLE_TWEET:
      let newArray = state.map(tweet => {
        if (action.payload.tweet.id === tweet.id) {
          tweet.likes = tweet.likes.includes(action.payload.user)
            ? tweet.likes.filter(i => i !== action.payload.user)
            : [...tweet.likes, action.payload.user];
        }
        return tweet;
      });
      return newArray;
    case ADD_TWEET:
      let newArr = state.map(i => i);
      newArr.push(action.payload);
      return newArr;
    case ADD_REPLAY:
      return state.filter(tweet => {
        if (tweet.id === action.payload.targetid) {
          tweet.replies = [...tweet.replies, action.payload.addid];
        }
        return tweet;
      });
    default:
      return state;
  }
}
