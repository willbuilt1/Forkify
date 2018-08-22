import axios from 'axios';

class Search {
    constructor(query) {
        this.query = query;
        this.result = null;
    }

    async getResults(){
        const key = '95231f42333fc631bb4a4f8ee0b4b1c7'; 
        try{
            const proxy = 'https://cors-anywhere.herokuapp.com/' //to use if API is not CORS enabled
            const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            //console.table(this.result);
        } catch(err) {
            console.log(err);
            alert(err);
        }
    }
}

export default Search;