import React from 'react';

const Error = ({ error }) => (
  <h3>Error: {error.graphQLErrors[0].message}</h3>
);

export default Error;