import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";

import Error from "../Error";
import withSession from "../withSession";
import { CREATE_RECIPE, GET_RECIPES } from "../../queries";

const initialState = {
  name: "",
  instructions: "",
  category: "Breakfast",
  description: ""
};

class CreateRecipe extends Component {
  state = { ...initialState };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, createRecipe) => {
    event.preventDefault();
    createRecipe().then(async ({ data }) => {
      // console.log(data);
      this.clearState();
      this.props.history.push("/");
    });
  };

  clearState = () => {
    this.setState({ ...initialState });
  };

  validateForm = () => {
    const { name, instructions, category, description } = this.state;
    const isInvalid = !name || !instructions || !category || !description;
    return isInvalid;
  };

  updateCache = (cache, { data: { createRecipe } }) => {
    const { getAllRecipes } = cache.readQuery({ query: GET_RECIPES });

    cache.writeQuery({
      query: GET_RECIPES,
      data: {
        getAllRecipes: getAllRecipes.concat(createRecipe)
      }
    });
  };

  render() {
    const { name, instructions, category, description } = this.state;
    const { currentUser } = this.props;

    return (
      <Fragment>
        <h2 className="App">Add Recipe</h2>
        <Mutation
          mutation={CREATE_RECIPE}
          variables={{
            name,
            instructions,
            category,
            description,
            username: currentUser
          }}
          update={this.updateCache}
        >
          {(createRecipe, { data, loading, error }) => (
            <form
              className="App"
              onSubmit={event => this.handleSubmit(event, createRecipe)}
            >
              <input
                name="name"
                onChange={this.handleChange}
                value={name}
                type="text"
                placeholder="Recipe Name"
              />
              <select
                name="category"
                value={category}
                onChange={this.handleChange}
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Snack">Snack</option>
                <option value="Dinner">Dinner</option>
              </select>
              <input
                name="description"
                onChange={this.handleChange}
                value={description}
                type="text"
                placeholder="Add Description"
              />
              <textarea
                name="instructions"
                value={instructions}
                onChange={this.handleChange}
                placeholder="Add instructions"
              />
              <button disabled={loading || this.validateForm()} type="submit">
                Add Recipe
              </button>
              {error && <Error error={error} />}
            </form>
          )}
        </Mutation>
      </Fragment>
    );
  }
}

export default withSession(withRouter(CreateRecipe));
