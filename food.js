let result = document.getElementById("result");
const searchBtn = document.getElementById("search-btn");
const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener("click", () => {
    let userInp = document.getElementById("user-inp").value.trim();
    if (userInp.length == 0) {
        result.innerHTML = `<h3>Input field cannot be empty</h3>`
    } else {
        fetch(url + userInp).then(res => res.json()).then(data => {
            console.log(data);
            let myMeal = data.meals[0];
            console.log(myMeal.strMealThumb);
            console.log(myMeal.strArea)
            console.log(myMeal.strInstructions)
            let count = 1;
            let ingredients = [];
            for (let i in myMeal) {
                let ingredient = "";
                let measure = "";
                if (i.startsWith("strIngredient") && myMeal[i]) {
                    ingredient = myMeal[i];
                     measure = myMeal["strMeasure" + count]; 
                    count++;
                    ingredients.push(`${ingredient} : ${measure}`)
                }
            }
            console.log(ingredients);
            result.innerHTML = `<div class = "img-container"><img src = ${myMeal.strMealThumb}>
            <div class = "details">
                    <h2>${myMeal.strMeal}</h2>
                    <h4>${myMeal.strArea}</h4>
            </div>
            </div>
            <div id = "ingredient-container">         
            <div id = "recipe">
                <button id = "hide-recipe">X</button>
                <pre id = "instructions">${myMeal.strInstructions}</pre>
            </div>
             </div>
             <div class = "btn-container">
                <button id = "show-recipe">View Recipe</button>
            </div>
            `;
        
            const ingredientContainer = document.getElementById("ingredient-container");
            const parent = document.createElement("ul");
            const recipe = document.getElementById("recipe");
            const hideRecipe = document.getElementById("hide-recipe");
            const showRecipe = document.getElementById("show-recipe");
        
            ingredients.forEach(ingredient => {
                let child = document.createElement("li");
                child.innerText = ingredient;
                parent.appendChild(child);
                ingredientContainer.appendChild(parent)
            })

        
            hideRecipe.addEventListener("click", () => {
                recipe.style.display = "none"
            });
        
            showRecipe.addEventListener("click", () => {
                recipe.style.display = "block"
            });
            
            
        }).catch(error => {
            result.innerHTML = '<h3>Invalid input</h3>'
        })
        
    }
})
