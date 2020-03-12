export const RECIVE_TWEETS = 'RECIVE_TWEETS';
export const ADD_TWEET = 'ADD_TWEET';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';
export const ADD_REPLAY = 'ADD_REPLAY';

export function reciveTweets(tweets) {
  return {
    type: RECIVE_TWEETS,
    payload: tweets
  };
}

function toggleTweet(tweet, user) {
  return {
    type: TOGGLE_TWEET,
    payload: { tweet, user }
  };
}

export function addTweet(tweet) {
  return {
    type: ADD_TWEET,
    payload: tweet
  };
}

export function addReplay(targetid, addid) {
  return {
    type: ADD_REPLAY,
    payload: {
      targetid,
      addid
    }
  };
}

export function handleToggleTweet(tweet, currentUser) {
  return dispatch => {
    fetch(`http://localhost:4000/tweets/${tweet.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...tweet,
        likes: tweet.likes.includes(currentUser)
          ? tweet.likes.filter(i => i !== currentUser)
          : [...tweet.likes, currentUser]
      })
    })
      .then(res => res.json())
      .then(data => dispatch(toggleTweet(tweet, currentUser)))
      .catch(err => console.log(err));
  };
}

export function addTweetHandler(text, replayingTo) {
  return (dispatch, getState) => {
    let { authedUser } = getState();
    fetch('http://localhost:4000/tweets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: text,
        author: authedUser,
        timestamp: Date.now(),
        likes: [],
        replies: [],
        replyingTo: replayingTo
      })
    })
      .then(res => res.json())
      .then(data => {
        dispatch(addTweet(data));
        if (replayingTo) {
          let { tweets } = getState();
          let thetweet;
          for (let t of tweets) {
            if (t.id === replayingTo) {
              thetweet = t;
            }
          }
          fetch(`http://localhost:4000/tweets/${thetweet.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...thetweet,
              replies: [...thetweet.replies, data.id]
            })
          })
            .then(res => res.json())
            .then(x => dispatch(addReplay(x.id, data.id)))
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  };
}
