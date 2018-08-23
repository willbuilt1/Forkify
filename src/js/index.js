// Global app controller
import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base';

/* Global state of the app
- Search object
- Current recipe object
- Shopping list object
- Liked recipes
*/

const state = {};

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

        //search for results
        await state.search.getResults();

        //render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
        console.log(state.search.result);
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



