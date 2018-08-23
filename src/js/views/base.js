export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResList: document.querySelector('.results__list'),
    searchRes: document.querySelector('.results')
}
// Element strings in object to allow easy changing if necessary
export const elementStrings = {
    loader: 'loader'
}
// render HTML "loader" as child of parent div
export const renderLoader = parent => {
    const loader = `
        <div class = "${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
}
// function to clear loader. If exists clear loader.
export const clearLoader = function() {
    const loader = document.querySelector(`.${elementStrings.loader}`)
    if(loader) {
        loader.parentElement.removeChild(loader);
    }
}