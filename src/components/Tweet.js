import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../utils/helpers';
import {
  TiArrowBackOutline,
  TiHeartOutline,
  TiHeartFullOutline
} from 'react-icons/ti';
import { handleToggleTweet } from '../actions/tweets';
import { Link, withRouter } from 'react-router-dom';

export class Tweet extends Component {
  toParent = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/tweet/${id}`);
  };

  handleLike = e => {
    e.preventDefault();
    this.props.dispatch(
      handleToggleTweet(this.props.tweet, this.props.authedUser)
    );
  };

  render() {
    if (!this.props.tweet) {
      return <h1> Tweet Dosn't Exist </h1>;
    }

    let { parentTweet, tweet, selectedUser, authedUser } = this.props;
    const { author, timestamp, text, likes, replies } = tweet;
    const { name, avatarURL } = selectedUser;

    return (
      <Link to={`/tweet/${tweet.id}`}>
        <li>
          <div className='tweet'>
            <img className='avatar' src={avatarURL} alt={author} />
            <div className='tweet-info'>
              <span>{name}</span>
              <span>{formatDate(timestamp)}</span>
              {parentTweet && (
                <button
                  className='replying-to'
                  onClick={e => this.toParent(e, parentTweet.id)}
                >{`Replaying to @${parentTweet.author}`}</button>
              )}
              <p>{text}</p>
              <div className='tweet-icons'>
                <TiArrowBackOutline className='tweet-icon' />
                <span>{replies.length !== 0 && replies.length}</span>
                <button className='heart-button' onClick={this.handleLike}>
                  {likes.includes(authedUser) ? (
                    <TiHeartFullOutline
                      color='#e0245e'
                      className='tweet-icon'
                    />
                  ) : (
                    <TiHeartOutline className='tweet-icon' />
                  )}
                </button>
                <span>{likes.length !== 0 && likes.length}</span>
              </div>
            </div>
          </div>
        </li>
      </Link>
    );
  }
}

let mapStateToProps = (state, props) => {
  let users = state.users;
  let tweet;
  for (let t of state.tweets) {
    if (t.id === props.id) {
      tweet = t;
    }
  }
  let selectedUser;
  let parentTweet;
  if (tweet.replyingTo) {
    parentTweet = {
      id: tweet.replyingTo,
      author: ''
    };
    state.tweets.forEach(t => {
      if (tweet.replyingTo === t.id) {
        parentTweet.author = t.author;
      }
    });
  }

  users.forEach(user => {
    if (tweet.author === user.id) {
      selectedUser = user;
    }
  });

  return {
    tweet,
    tweetsarray: state.tweets,
    selectedUser,
    parentTweet,
    authedUser: state.authedUser
  };
};

export default withRouter(connect(mapStateToProps)(Tweet));
