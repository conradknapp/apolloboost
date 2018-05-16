import React, { Component } from 'react';

// Import gql and Query
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

// Make createUser mutation with gql
const CREATE_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      username
      email
      password
    }
  }
`;

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  }

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
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
      <Mutation
        mutation={CREATE_USER}
        variables={{ username, email, password }}
      >
        {(createUser, { data, loading, error }) => (
          <form onSubmit={event => this.handleSubmit(event, createUser)}>
            <input name="username" onChange={this.handleChange} value={username} type="text" placeholder="Full Name" />
            <input name="email" onChange={this.handleChange} value={email} type="text" placeholder="Email Address" />
            <input name="password" onChange={this.handleChange} value={password} type="password" placeholder="Password" />
            <input name="passwordConfirmation" value={passwordConfirmation} onChange={this.handleChange} type="password" placeholder="Confirm Password" />
            <button disabled={loading || isInvalid} type="submit">Sign Up</button>
            {error}
          </form>
        )}
      </Mutation>
    );
  }
};

export default Signup;