import React from 'react';

import { Query } from 'react-apollo';
import { GET_USER } from '../queries';

const formatDate = date => new Date(date).toLocaleDateString('en-GB');

const Profile = ({ username }) => (
  <Query query={GET_USER} variables={{username}}>
  {({ loading, error, data }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error :(</div>;
    console.log(data);
    return (
    <div className="App">
      <p>Username: {data.getUser.username}</p>
      <p>Email: {data.getUser.email}</p>
      <p>Join date: {formatDate(data.getUser.joinDate)}</p>
    </div>
    )
  }}
  </Query>
);

export default Profile;