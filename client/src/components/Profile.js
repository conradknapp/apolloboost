import React from 'react';

import { Query } from 'react-apollo';
import { GET_USER } from '../queries';

const Profile = ({ username }) => (
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

export default Profile;