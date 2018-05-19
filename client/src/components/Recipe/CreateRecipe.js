import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import Error from '../Error';
import { CREATE_RECIPE } from '../../queries';

const initialState = {
  name: '',
  instructions: '',
  category: '',
  description: ''
};

class CreateRecipe extends Component {
  state = { ...initialState };

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit = (event, createRecipe) => {
    event.preventDefault();
    createRecipe().then(async ({ data }) => {
      console.log(data);
      this.clearState();
    });
  };

  clearState = () => {
    this.setState({ ...initialState });
  }

  validateForm = () => {
    const { name, instructions, category, description } = this.state;
    const isInvalid = !name || !instructions || !category || !description;
    return isInvalid;
  }

  render() {
    const { name, instructions, category, description } = this.state;

    return (
      <React.Fragment>
      <h2 className="App">Add Recipe</h2>
      <Mutation
        mutation={CREATE_RECIPE}
        variables={{ name, instructions, category, description }}
      >
        {(createRecipe, { data, loading, error }) => (
          <form className="App" onSubmit={event => this.handleSubmit(event, createRecipe)}>
            <input
              name="name"
              onChange={this.handleChange}
              value={name}
              type="text"
              placeholder="Recipe Name" />
            <input
              name="category"
              onChange={this.handleChange}
              value={category} type="text"
              placeholder="Add Category" />
            <input
              name="description"
              onChange={this.handleChange}
              value={description} type="text"
              placeholder="Add Description"
            />
            <textarea
              name="instructions"
              value={instructions}
              onChange={this.handleChange}
              placeholder="Add instructions"
            />
            <button disabled={loading || this.validateForm()} type="submit">Add Recipe</button>
            {error && <Error error={error} />}
          </form>
        )}
      </Mutation>
      </React.Fragment>
    );
  }
};

export default CreateRecipe;