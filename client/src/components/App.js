import React from 'react';
import './App.css';
import { Query } from 'react-apollo';

import withSession from "./withSession";
import Recipe from './Recipe/Recipe';
import { LATEST_RECIPES } from '../queries';

class App extends React.Component {
render () {
  const { auth } = this.props;
  return (
      <div className="App">
        <h1>Latest Recipes</h1>
        <Query query={LATEST_RECIPES}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error :(</div>;
            return (
              <ul>
                <h1>From App</h1>
                {data.getLatestRecipes.map(recipe =>
                <Recipe key={recipe.id} auth={auth} {...recipe} />)}
              </ul>
            )
          }}
        </Query>
      </div>
    );
  }
}


export default withSession(App);