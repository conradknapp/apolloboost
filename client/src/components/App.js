import React from 'react';
import './App.css';
import { Query } from 'react-apollo';

import withSession from "./withSession";
import Recipe from './Recipe/Recipe';
import { GET_RECIPES } from '../queries';

class App extends React.Component {
render () {
  const { auth, username } = this.props;
  return (
      <div className="App">
        <h1>Recipes</h1>
        <Query query={GET_RECIPES}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error :(</div>;
              console.log(data);
            return (
              <ul>
                {data.getAllRecipes.map(recipe =>
                <Recipe key={recipe.id} auth={auth} username={username} {...recipe} />)}
              </ul>
            )
          }}
        </Query>
      </div>
    );
  }
}


export default withSession(App);