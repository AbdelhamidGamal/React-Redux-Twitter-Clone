import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTweetHandler } from '../actions/tweets';
import { Redirect } from 'react-router-dom';

class NewTweet extends Component {
  state = {
    text: '',
    toHome: false
  };

  changeValue = e => {
    this.setState({ text: e.target.value });
  };

  addTweet = e => {
    e.preventDefault();
    let text = this.state.text;
    let replayingTo = this.props.replayingTo ? this.props.replayingTo : null;
    this.props.dispatch(addTweetHandler(text, replayingTo));
    this.setState({ text: '', toHome: this.props.replayingTo ? false : true });
  };

  render() {
    let textleft = 280 - this.state.text.length;

    if (this.state.toHome) {
      return <Redirect to='/' />;
    }

    return (
      <div>
        <h3 className='center'>Compose new Tweet</h3>
        <form className='new-tweet'>
          <textarea
            className='textarea'
            value={this.state.text}
            onChange={this.changeValue}
            cols='60'
            rows='10'
            maxLength={280}
          ></textarea>
          {textleft <= 100 && <div className='tweet-length'> {textleft} </div>}
          <button
            disabled={this.state.text === ''}
            className='btn center'
            onClick={this.addTweet}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    authedUser: state.authedUser
  };
};

export default connect(mapStateToProps)(NewTweet);
