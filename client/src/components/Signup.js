import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from "react-router-dom";

import Error from './Error';
import { CREATE_USER } from '../queries';

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: ''
};

class Signup extends Component {
  state = { ...initialState };

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit = (event, createUser) => {
    event.preventDefault();
    createUser().then(async ({ data }) => {
      console.log(data);
      localStorage.setItem('token', data.createUser.token);
      this.clearState();
      this.props.history.push('/');
    });
  };

  clearState = () => {
    this.setState({ ...initialState });
  }

  checkIfValid = () => {
    const { username, email, password, passwordConfirmation } = this.state;
    const isInvalid = !username || !email || !password || password !== passwordConfirmation;
    return isInvalid;
  }

  render() {
    const { username, email, password, passwordConfirmation } = this.state;

    return (
      <React.Fragment>
      <h2 className="App">Sign Up</h2>
      <Mutation
        mutation={CREATE_USER}
        variables={{ username, email, password }}
      >
        {(createUser, { data, loading, error }) => (
          <form className="App" onSubmit={event => this.handleSubmit(event, createUser)}>
            <input
              name="username"
              onChange={this.handleChange}
              value={username}
              type="text"
              placeholder="Full Name" />
            <input
              name="email"
              onChange={this.handleChange}
              value={email} type="text"
              placeholder="Email Address" />
            <input
              name="password"
              onChange={this.handleChange}
              value={password} type="password"
              placeholder="Password"
            />
            <input
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={this.handleChange}
              type="password"
              placeholder="Confirm Password"
            />
            <button disabled={loading || this.checkIfValid()} type="submit">Sign Up</button>
            {error && <Error error={error} />}
          </form>
        )}
      </Mutation>
      </React.Fragment>
    );
  }
};

export default withRouter(Signup);