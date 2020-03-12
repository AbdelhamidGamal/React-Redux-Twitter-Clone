import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tweet from './Tweet';

class Dashboard extends Component {
  render() {
    let { tweets } = this.props;
    return (
      <div>
        <h1 className='center'>Your Timeline</h1>
        <ul>
          {tweets.map(tweet => (
            <Tweet id={tweet.id} key={tweet.id} />
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(state => ({
  tweets: state.tweets.sort((a, b) => b.timestamp - a.timestamp)
}))(Dashboard);
