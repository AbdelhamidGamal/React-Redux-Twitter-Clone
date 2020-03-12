import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tweet from './Tweet';
import NewTweet from './NewTweet';

export class TweetPage extends Component {
  render() {
    let { replies, id, tweet } = this.props;
    console.log(replies, 'xxxxxxxxxxxx', id, 'xxxxxxxxxxxx', tweet);
    return (
      <div>
        <Tweet id={id} />
        <NewTweet replayingTo={id} />
        {replies.length > 0 && replies.reverse().map(r => <Tweet id={r} />)}
      </div>
    );
  }
}

function mapStateToProps({ authedUser, tweets, users }, props) {
  const { id } = props.match.params;
  let tweet;
  for (let t of tweets) {
    if (t.id === id) {
      tweet = t;
      break;
    }
  }
  let replies = tweet.replies;

  return {
    id,
    tweet,
    replies
  };
}

export default connect(mapStateToProps)(TweetPage);
