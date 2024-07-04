const favoriteMeals = JSON.parse(localStorage.getItem('favoriteMeals')) || [];

favoriteMeals.forEach((meal, index) => {
    const mealCard = document.createElement('div');
    mealCard.className = 'price-box btn-layout bt6';

    const mealImg = document.createElement('img');
    mealImg.src = meal.strMealThumb;
    mealImg.width = 600;
    mealImg.alt = meal.strMeal;

    const mealName = document.createElement('h6');
    mealName.textContent = meal.strMeal;

    const mealOrigin = document.createElement('p');
    mealOrigin.textContent = `Origin: ${meal.strArea}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'btn btn-danger';
    deleteButton.addEventListener('click', () => {
        const index = favoriteMeals.indexOf(meal);
        if (index !== -1) {
            favoriteMeals.splice(index, 1);
            localStorage.setItem('favoriteMeals', JSON.stringify(favoriteMeals));
            mealCard.remove();
        }
    });

    const accordion = document.createElement('div');
    accordion.className = 'accordion';

    
    const ingredientsAccordionItem = document.createElement('div');
    ingredientsAccordionItem.className = 'accordion-item';

    const ingredientsButton = document.createElement('button');
    ingredientsButton.className = 'accordion-button';
    ingredientsButton.textContent = 'Ingredients';
    ingredientsButton.dataset.bsToggle = 'collapse';
    ingredientsButton.dataset.bsTarget = `#collapseIngredients-${index}`;

    const ingredientsCollapse = document.createElement('div');
    ingredientsCollapse.className = 'accordion-collapse collapse';
    ingredientsCollapse.id = `collapseIngredients-${index}`;

    const ingredientsBody = document.createElement('div');
    ingredientsBody.className = 'accordion-body';

    const ingredientsList = document.createElement('ul');
    for (let i = 1; i <= 20; i++) {
        const ingredient = `strIngredient${i}`;
        const measure = `strMeasure${i}`;
        if (meal[ingredient] && meal[measure]) {
            ingredientsList.innerHTML += `<li>${meal[ingredient]} - ${meal[measure]}</li>`;
        }
    }


    ingredientsBody.appendChild(ingredientsList);
    ingredientsCollapse.appendChild(ingredientsBody);
    ingredientsAccordionItem.appendChild(ingredientsButton);
    ingredientsAccordionItem.appendChild(ingredientsCollapse);
    accordion.appendChild(ingredientsAccordionItem);

    const instructionsAccordionItem = document.createElement('div');
    instructionsAccordionItem.className = 'accordion-item';

    const instructionsButton = document.createElement('button');
    instructionsButton.className = 'accordion-button';
    instructionsButton.textContent = 'Instructions';
    instructionsButton.dataset.bsToggle = 'collapse';
    instructionsButton.dataset.bsTarget = `#collapseInstructions-${index}`;

    const instructionsCollapse = document.createElement('div');
    instructionsCollapse.className = 'accordion-collapse collapse';
    instructionsCollapse.id = `collapseInstructions-${index}`;
    const instructionsBody = document.createElement('div');
    instructionsBody.className = 'accordion-body';

    const instructionsText = document.createElement('p');
    instructionsText.textContent = meal.strInstructions;


    instructionsBody.appendChild(instructionsText);
    instructionsCollapse.appendChild(instructionsBody);
    instructionsAccordionItem.appendChild(instructionsButton);
    instructionsAccordionItem.appendChild(instructionsCollapse);
    accordion.appendChild(instructionsAccordionItem);

    const videoAccordionItem = document.createElement('div');
    videoAccordionItem.className = 'accordion-item';

    const videoButton = document.createElement('button');
    videoButton.className = 'accordion-button';
    videoButton.textContent = 'Video';
    videoButton.dataset.bsToggle = 'collapse';
    videoButton.dataset.bsTarget = `#collapseVideo-${index}`;

    const videoCollapse = document.createElement('div');
    videoCollapse.className = 'accordion-collapse collapse';
    videoCollapse.id = `collapseVideo-${index}`;

    const videoBody = document.createElement('div');
    videoBody.className = 'accordion-body';

    const videoLink = document.createElement('p');
    videoLink.innerHTML = meal.strYoutube ? `<a href="${meal.strYoutube}" target="_blank">Watch Video</a>` : '';

    videoBody.appendChild(videoLink);
    videoCollapse.appendChild(videoBody);
    videoAccordionItem.appendChild(videoButton);
    videoAccordionItem.appendChild(videoCollapse);
    accordion.appendChild(videoAccordionItem);

    const commentsAccordionItem = document.createElement('div');
    commentsAccordionItem.className = 'accordion-item';

    const commentsButton = document.createElement('button');
    commentsButton.className = 'accordion-button';
    commentsButton.textContent = 'Comments';
    commentsButton.dataset.bsToggle = 'collapse';
    commentsButton.dataset.bsTarget = `#collapseComments-${index}`;

    const commentsCollapse = document.createElement('div');
    commentsCollapse.className = 'accordion-collapse collapse';
    commentsCollapse.id = `collapseComments-${index}`;

    const commentsBody = document.createElement('div');
    commentsBody.className = 'accordion-body';

    const commentsTextarea = document.createElement('textarea');
    commentsTextarea.placeholder = 'Add your comments or remarks about the recipe';
    commentsTextarea.className = 'comment-textarea';
    commentsBody.appendChild(commentsTextarea);

    const saveCommentButton = document.createElement('button');
    saveCommentButton.textContent = 'Save Comment';
    saveCommentButton.className = 'btn btn-primary save-comment-btn';
    commentsBody.appendChild(saveCommentButton);

    saveCommentButton.addEventListener('click', () => {
        const comment = commentsTextarea.value.trim();
        if (comment) {
            if (meal.comments) {
                meal.comments[0] = comment;
            } else {
                meal.comments = [comment]; 
            }
            localStorage.setItem('favoriteMeals', JSON.stringify(favoriteMeals));
            commentsTextarea.value = '';
        }
    });

    commentsBody.appendChild(commentsTextarea);
    commentsBody.appendChild(saveCommentButton);

    const commentsList = document.createElement('p');
    if (meal.comments) {
        commentsList.textContent = meal.comments[0]; 
    } else {
        commentsList.textContent = ''; 
    }

    commentsBody.appendChild(commentsList);
    commentsCollapse.appendChild(commentsBody);
    commentsAccordionItem.appendChild(commentsButton);
    commentsAccordionItem.appendChild(commentsCollapse);
    accordion.appendChild(commentsAccordionItem);

    mealCard.appendChild(mealImg);
    mealCard.appendChild(mealName);
    mealCard.appendChild(mealOrigin);
    mealCard.appendChild(deleteButton);
    mealCard.appendChild(accordion);


    document.querySelector('.grid').appendChild(mealCard);
});