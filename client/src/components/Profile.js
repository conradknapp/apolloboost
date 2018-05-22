import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import { GET_USER, GET_CREATED_RECIPES } from "../queries";
import withSession from "../components/withSession";

const formatDate = date => {
  const newDate = new Date(date).toLocaleDateString("en-US");
  const newTime = new Date(date).toLocaleTimeString("en-US");
  return `${newDate} at ${newTime}`;
};

const Profile = ({ currentUser }) => (
  <main>
    <Query query={GET_USER} variables={{ username: currentUser }}>
      {({ loading, error, data }) => {
        if (loading) return <div className="App">Loading...</div>;
        if (error) return <div>Error :(</div>;
        // console.log(data);
        return (
          <div className="App" style={{ marginBottom: "2em" }}>
            <p>Username: {data.getUser.username}</p>
            <p>Email: {data.getUser.email}</p>
            <p>Join date: {formatDate(data.getUser.joinDate)}</p>
            <ul>
              Favorites:{data.getUser.favorites.map((el, i) => (
                <li key={el._id}>
                  <Link to={`/recipes/${el._id}`}>{el.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    </Query>
    <Query query={GET_CREATED_RECIPES} variables={{ username: currentUser }}>
      {({ loading, error, data }) => {
        if (loading) return <div className="App">Loading...</div>;
        if (error) return <div>Error :(</div>;
        return (
          <ul className="App">
            <h3>{currentUser}'s Recipes</h3>
            {!data.getCreatedRecipes.length && (
              <h4>No recipes currently. Go add some!</h4>
            )}
            {data.getCreatedRecipes.map(recipe => (
              <li key={recipe._id}>
                <Link to={`/recipes/${recipe._id}`}>
                  <p>Recipe Name: {recipe.name}</p>
                </Link>
                <p>Like Count: {recipe.likes}</p>
                <p>Created On: {formatDate(recipe.createdDate)}</p>
              </li>
            ))}
          </ul>
        );
      }}
    </Query>
  </main>
);

export default withSession(Profile);
