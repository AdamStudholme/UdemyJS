import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    //Getting recipe hash from url
    const id = window.location.hash.slice(1);
    if (!id) return; //Guard clause if the url doesn't have a recipe hash
    recipeView.renderSpinner();

    //0) Update results view to mark selected recipe
    resultsView.update(model.getSearchResultsPage());
    //1) Loading Recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;
    //2) Render Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    //1) get search query
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();
    //2) Load search results
    await model.loadSearchResults(query);

    //3) Render results
    resultsView.render(model.getSearchResultsPage());

    //4) Render intial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (page) {
  //3) Render NEW results
  resultsView.render(model.getSearchResultsPage(page));
  //4) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);
  // Update the recipeView
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
};
init();
