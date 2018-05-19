import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';

import { Query } from 'react-apollo';
import { GET_USER } from '../queries';


class Profile extends Component {
  state = {
    username: null
  };

  componentWillMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    const token = localStorage.getItem('token');
    const username = jwtDecode(token).username;
    this.setState(() => {
      return { username }
    });
  }

  render() {
    const { username } = this.state;

    return (
      <Query query={GET_USER} variables={{username}}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error :(</div>;
        console.log(data);
        return (
        <div className="App">
          <p>{data.getUser.username}</p>
          <p>{data.getUser.email}</p>
        </div>
        )
      }}
    </Query>
    );
  }
};

export default Profile;