import axios from 'axios';
import { key, proxy } from '../config';

class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try{
            const res = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;

        }catch(err){
            alert(err);
            console.log(err);
        }
    }
    // assuming that every 3 ingredients takes 15 minutes
    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings(){
        this.servings = 4;
    }

    parseIngredients(){

        const longUnits = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'cup', 'pounds', 'pound'];
        const shortUnits = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cups', 'cup', 'lbs', 'lb'];

        const newIngredients = this.ingredients.map(el => {
        // 1. uniform units
        let ingredient = el.toLowerCase();
        longUnits.forEach((unit, i) =>{
            ingredient = ingredient.replace(unit, shortUnits[i]);
        });
        // 2. Remove Parentheses
        ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

        // 3. Parse ingrdients into, amount units and ingredient
        const arrIng = ingredient.split(' ');
        
        // where in array is units? findIndex returns index or -1 if not found
        const unitIndex = arrIng.findIndex(el2 => shortUnits.includes(el2));
        
        let objIng;
        //If there is a unit
        if(unitIndex > -1){
            const arrCount = arrIng.slice(0, unitIndex);
            let count; // quantity
            if(arrCount === 1){
                count = eval(arrIng[0].replace('-', '+'));
            } else {
                count = eval(arrIng.slice(0, unitIndex).join('+'));
            }
            objIng = {
                count,
                unit: arrIng[unitIndex],
                ingredient: arrIng.slice(unitIndex+1)
            }

        } else if (parseInt(arrIng[0], 10)) {
            // no unit but first element is a number. If is string above will return NaN === false
            objIng = {
                count: parseInt(arrIng[0], 10),
                unit: '',
                ingredient: arrIng.slice(1).join(' ') 
            }
        } else if (unitIndex === -1) {
            // no units or number
            objIng = {
                count: 1,
                unit: '',
                ingredient
            }
        }
        return objIng;
    });
    this.ingredients = newIngredients;
    }
}

export default Recipe;