import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { handleReciveData } from '../actions/shared';
import Dashboard from './Dashboard';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NewTweet from './NewTweet';
import Nav from './Nav';
import TweetPage from './TweetPage';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleReciveData());
  }
  render() {
    let { loading } = this.props;

    if (loading) {
      return <h1> Loading </h1>;
    }
    return (
      <BrowserRouter>
        <Fragment>
          <Nav />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/new' component={NewTweet} />
            <Route path='/tweet/:id' component={TweetPage} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default connect(state => ({
  alltweets: state.tweets,
  loading: state.authedUser === null
}))(App);
