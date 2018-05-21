import React from "react";

import { Query } from "react-apollo";
import { GET_RECIPE } from "../../queries";

class RecipePage extends React.Component {
  state = {
    _id: ""
  };

  componentDidMount() {
    const { _id } = this.props.match.params;
    this.setState({ _id });
  }

  render() {
    const { _id } = this.state;
    return (
      <Query query={GET_RECIPE} variables={{ _id }}>
        {({ loading, error, data }) => {
          if (loading) return <div className="App">Loading...</div>;
          if (error) return <div>Error :(</div>;
          console.log(data);
          return (
            <div className="App">
              <h2>{data.getRecipe.name}</h2>
              <p>{data.getRecipe.category}</p>
              <p>{data.getRecipe.description}</p>
              <p>{data.getRecipe.instructions}</p>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default RecipePage;
