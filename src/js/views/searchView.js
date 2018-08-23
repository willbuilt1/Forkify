import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = function(){
    elements.searchInput.value = '';
};
export const clearResults = function(){
    elements.searchResList.innerHTML = '';
};
// Checks title length. If longer than limit trims it. Function used in render method
const limitRecipe = (title, limit = 17) => { //default parameter
    const newTitle = [];
    if(title.length > limit){
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit) {
                newTitle.push(cur)
            }
            return acc + cur.length;
        }, 0)

        return newTitle.join(' ') + ' ...';
    }
    return title
};
// HTML markup for each recipe to be inserted in list
const renderRecipe = function(recipe){
    const markup = `
        <li>
            <a class="results__link" href="${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipe(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
        `;
    
        elements.searchResList.insertAdjacentHTML('beforeend', markup);
}
// Function recieves recipies array from state and renders markup above.
export const renderResults = recipes => {
    recipes.forEach(renderRecipe);//forEach(recipe => renderRecipe(recipe));
}