// Global app controller
import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements} from './views/base';

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

        //search for results
        await state.search.getResults();

        //render results on UI
        searchView.renderResults(state.search.result);
        console.log(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})



