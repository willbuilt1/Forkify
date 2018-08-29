// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {elements, renderLoader, clearLoader} from './views/base';

/* Global state of the app
- Search object
- Current recipe object
- Shopping list object
- Liked recipes
*/

const state = {};


// Search controller
const controlSearch = async () => {
    // Get query from view
    const query = searchView.getInput();

    if (query) {
        // new search oblect and add to state
        state.search = new Search(query);

        // Prepare UI for recipes
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        try{
            //search for results
            await state.search.getResults();
    
            //render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
            console.log(state.search.result);
        } catch(err) {
            alert('something went wrong');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})


elements.searchResPages.addEventListener('click', e =>{
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt((btn.dataset.goto), 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
})

//Recipe controller

const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if(id){
        //prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search in search list
        if (state.search) {
            searchView.highlightSelected(id);
        }
        //Create new recipe object
        state.recipe = new Recipe(id);
        try{
            //Get recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            //Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch(err){
            alert('Error processing recipe');
            console.log(err);
        }
    }
}

//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe))


