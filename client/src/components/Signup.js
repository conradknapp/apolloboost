import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { CREATE_USER } from '../queries';

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit = (event, createUser) => {
    event.preventDefault();
    createUser().then(async ({ data }) => {
      console.log(data);
    });
  };

  render() {
    const { username, email, password, passwordConfirmation } = this.state;
    const isInvalid = !username || !email || !password || password !== passwordConfirmation;

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
            <button disabled={loading || isInvalid} type="submit">Sign Up</button>
            {error}
          </form>
        )}
      </Mutation>
      </React.Fragment>
    );
  }
};

export default Signup;