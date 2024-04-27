
document.addEventListener('DOMContentLoaded', function () {
    const mealInfo = document.getElementById('mealInfo');
    const mealImage = document.getElementById('mealImage');
    const mealName = document.getElementById('mealName');
    const mealsList = document.getElementById('mealsList');
    const searchInput = document.getElementById('searchInput');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    const ingredientsList = document.getElementById('ingredientsList');
  
    // Fetch random meal
    fetchRandomMeal();
  
    function fetchRandomMeal() {
      fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
          const meal = data.meals[0];
          displayMeal(meal);
        })
        .catch(error => console.log(error));
    }
  
    // Display meal
    function displayMeal(meal) {
      mealImage.src = meal.strMealThumb;
      mealImage.alt = meal.strMeal;
      mealName.textContent = meal.strMeal;
  
      mealInfo.addEventListener('click', function () {
        displayIngredients(meal);
      });
    }
  
    // Display ingredients modal
    function displayIngredients(meal) {
      modal.style.display = 'block';
      ingredientsList.innerHTML = '';
  
      for (let i = 1; i <= 10; i++) {
        if (meal[`strIngredient${i}`]) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          const listItem = document.createElement('li');
          listItem.textContent = `${ingredient} - ${measure}`;
          ingredientsList.appendChild(listItem);
        } else {
          break;
        }
      }
    }
  
    // Close modal
    closeBtn.addEventListener('click', function () {
      modal.style.display = 'none';
    });
  
    // Search for meals
    searchInput.addEventListener('input', function () {
      const searchQuery = searchInput.value;
      if (searchQuery.trim() !== '') {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchQuery}`)
          .then(response => response.json())
          .then(data => {
            const meals = data.meals;
            displaySearchedMeals(meals);
          })
          .catch(error => console.log(error));
      } else {
        mealsList.innerHTML = '';
        document.getElementById('searchedMeals').style.display = 'none';
        fetchRandomMeal();
      }
    });
  
    // Display searched meals
    function displaySearchedMeals(meals) {
      mealsList.innerHTML = '';
  
      if (meals) {
        meals.forEach(meal => {
          const mealItem = document.createElement('div');
          mealItem.classList.add('meal-item');
          mealItem.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
          `;
          mealItem.addEventListener('click', function () {
            displayIngredients(meal);
          });
          mealsList.appendChild(mealItem);
        });
        document.getElementById('searchedMeals').style.display = 'block';
      } else {
        mealsList.innerHTML = '<p>No meals found.</p>';
      }
    }
  });
  