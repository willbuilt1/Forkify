import axios from 'axios';
import { key, proxy } from '../config';

class Search {
    constructor(query) {
        this.query = query;
        this.result = null;
    }

    async getResults(){
        try{
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