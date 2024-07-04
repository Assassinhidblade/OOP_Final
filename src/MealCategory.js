document.querySelectorAll('.title-head').forEach((link) => {
    link.addEventListener('click', (e) => {
        const mealType = e.target.getAttribute('data-meal-type');


        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealType}`)
            .then(response => response.json())
            .then(data => {
                const mealListElement = document.getElementById('meal-list');
                mealListElement.innerHTML = '';
                data.meals.forEach((meal) => {
                    const listItem = document.createElement('li');
                    listItem.className = 'list-group-item';

                    const mealNameElement = document.createElement('span');
                    mealNameElement.textContent = meal.strMeal;
                    mealNameElement.dataset.mealId = meal.idMeal;
                    mealNameElement.style.cursor = 'pointer';

                    listItem.appendChild(mealNameElement);
                    mealListElement.appendChild(listItem);


                    mealNameElement.addEventListener('click', (e) => {
                        const mealId = e.target.dataset.mealId;

                        // Fetch meal details from API or local data source
                        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
                            .then(response => response.json())
                            .then(mealDetails => {
                                const meal = mealDetails.meals[0];

                                const mealImgElement = document.getElementById('meal-Img');
                                const mealNameElement = document.getElementById('meal-name');
                                const mealOriginElement = document.getElementById('meal-origin');
                                const mealIngredientsElement = document.getElementById('meal-ingredients');
                                const mealInstructionsElement = document.getElementById('meal-instructions');
                                const mealUrlElement = document.getElementById('meal-url');


                                mealImgElement.src = meal.strMealThumb
                                mealNameElement.textContent = meal.strMeal;
                                mealOriginElement.textContent = `Origin: ${meal.strArea}`;
                                mealIngredientsElement.innerHTML = '';


                                for (let i = 1; i <= 20; i++) {
                                    const ingredient = `strIngredient${i}`;
                                    const measure = `strMeasure${i}`;
                                    if (meal[ingredient] && meal[measure]) {
                                        mealIngredientsElement.innerHTML += `<li>${meal[ingredient]} - ${meal[measure]}</li>`;
                                    }
                                }

                                mealInstructionsElement.textContent = meal.strInstructions;
                                mealUrlElement.innerHTML = `<a href="${meal.strYoutube}" target="_blank">View recipe</a>`;



                                const mealDetailActions = document.getElementById('meal-detail-actions');
                                mealDetailActions.innerHTML = '';

                                const favoriteButton = document.createElement('button');
                                favoriteButton.textContent = 'Add to Favorites';
                                favoriteButton.className = 'btn btn-style mt-5';
                                favoriteButton.addEventListener('click', () => {
                                    const favoriteMeals = JSON.parse(localStorage.getItem('favoriteMeals')) || [];
                                    const mealId = meal.idMeal;
                                    const isAlreadyFavorite = favoriteMeals.some((favoriteMeal) => favoriteMeal.idMeal === mealId);

                                    if (!isAlreadyFavorite) {
                                        favoriteMeals.push(meal);
                                        localStorage.setItem('favoriteMeals', JSON.stringify(favoriteMeals));
                                        alert('Meal added to favorites!');
                                    } else {
                                        alert('Meal is already in your favorites!');
                                    }
                                });
                                mealDetailActions.appendChild(favoriteButton);


                                $('#MealListModal').modal('hide');
                                mealDetailActions.scrollIntoView({ behavior: 'smooth' });

                            });
                    });
                });
            });
    });
});