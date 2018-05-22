import React from "react";

class RecipeButton extends React.Component {
  componentDidMount() {
    const { data, _id, onChildMount } = this.props;
    const prevLiked = data.getUser.favorites.some(fave => fave._id === _id);
    onChildMount(prevLiked);
  }

  render() {
    const { prevLiked, likeRecipe, handleClick, liked } = this.props;

    return (
      <button onClick={() => handleClick(likeRecipe)}>
        {prevLiked || liked ? "Liked!" : "Like"}
      </button>
    );
  }
}

export default RecipeButton;
