import React from 'react';

import { Query } from 'react-apollo';
import { GET_RECIPE } from '../../queries';

class RecipePage extends React.Component {
  state = {
    id: ''
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({ id });
  }

  render() {
    const { id } = this.state;
    return (
      <Query query={GET_RECIPE} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) return <div className="App">Loading...</div>;
        if (error) return <div>Error :(</div>;
        console.log(data);
        return (
        <div className="App">
          <p>{data.getRecipe.name}</p>
          <p>{data.getRecipe.category}</p>
          <p>{data.getRecipe.description}</p>
          <p>{data.getRecipe.instructions}</p>
        </div>
        )
      }}
      </Query>
    );
  }
}

export default RecipePage;