import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = function(){
    elements.searchInput.value = '';
};
export const clearResults = function(){
    //Clear result list
    elements.searchResList.innerHTML = '';
    //Clear buttons
    elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    })
    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
}
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
            <a class="results__link" href="#${recipe.recipe_id}">
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

// type either prev or next
// implicit return using arrow function
const createButton = (page, type) => `
<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
</button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if (page === 1 && pages > 1){
        // Only show next
        button = createButton(page, 'next')
    } else if (page < pages){
        // Show both buttons
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1){
        // only show prev
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML("afterbegin", button);
}

// Function recieves recipies array from state and renders markup above.
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    //render results of current page
    const start= (page - 1) * resPerPage;
    const end = (page * resPerPage); // slice method does not include "end";
    recipes.slice(start, end).forEach(renderRecipe);//forEach(recipe => renderRecipe(recipe));

    //render pagination buttons
    renderButtons(page, recipes.length, resPerPage);

}