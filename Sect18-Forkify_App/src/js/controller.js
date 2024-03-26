import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

const controlRecipes = async function () {
  try {
    //Getting recipe hash from url
    const id = window.location.hash.slice(1);
    if (!id) return; //Guard clause if the url doesn't have a recipe hash
    recipeView.renderSpinner();
    //1) Loading Recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;
    console.log(recipe);

    //2) Render Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
