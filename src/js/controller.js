import * as model from "./model.js";
import { MODAL_CLOSE_SEC } from "./config.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";

// https://forkify-api.herokuapp.com/v2

/////////////////////////////////////// e7954ed0-983d-44bc-84ec-1d6e7210870a

if(module.hot){
  // module.hot.accept();
}

const controlRecipes = async function(){  
  try{
    const id = window.location.hash.slice(1);

    if(!id) return;

    // 0) update resulst view to mark selected search result

    resultsView.update(model.getSearchResultPage());
    bookmarksView.update(model.state.bookmarks);

    recipeView.renderSpinner();
    const a = await model.loadRecipe(id);
    console.log(a);

    recipeView.render(model.state.recipe);  
        
  }
  catch(err){
    console.log("err ne la", err);     
    recipeView.renderError();
  } 
}

const init = function(){
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);

  addRecipeView.addHandlerUpload(controlAddRecipe);
  newFeature()
  console.log("Welcome!");
  console.log(BUG);
}


const newFeature = function(){
  console.log("welcome to the appliactaon");
}

const controlPagination = function(goToPage){
  resultsView.render(model.getSearchResultPage(goToPage));
  paginationView.render(model.state.search);
}

const controlSearchResults = async function(){
  try{
    resultsView.renderSpinner();
    
    const query = searchView.getQuery();

    if(!query) return;
    
    await model.loadSearchResults(query);
    
    resultsView.render(model.getSearchResultPage( ));

    paginationView.render(model.state.search);

  }
  catch(err){
    console.log(err);
  }
}

const controlServings = function(newServings){
  // update the recipe servings
  model.updateServings(newServings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}



const controlAddBookmark = function(){
  if(model.state.recipe.bookmarked){
    model.deleteBookmark(model.state.recipe.id);
  }
  else{
    model.addBookmark(model.state.recipe);
  }
  
  console.log(model.state.recipe);
  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe){
  
  try{
    // 
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);
    console.log(newRecipe);
    // console.log(model.state.recipe);

    recipeView.render(model.state.recipe);

    setTimeout(function(){
      addRecipeView._toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  }

  catch(err){
    console.error(err + " 🍚");
    addRecipeView.renderError(err.message);
  }
}

init();

// controlSearchResults();