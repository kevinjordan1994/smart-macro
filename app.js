`use strict`;

//Config Variables
import { BASE_URL, API_KEY } from "./config.js";
let meals = [];

//DOM Elements
const ingredientsInput = document.querySelector(`.ingredients-input`);
const caloriesInput = document.querySelector(`.calories-input`);
const proteinInput = document.querySelector(`.protein-input`);
const fatInput = document.querySelector(`.fat-input`);
const carbsInput = document.querySelector(`.carbs-input`);
// const caloriesInputMin = document.querySelector(`.calories-input-min`);
// const proteinInputMin = document.querySelector(`.protein-input-min`);
// const fatInputMin = document.querySelector(`.fat-input-min`);
// const carbsInputMin = document.querySelector(`.carbs-input-min`);
const findMealsBtn = document.querySelector(`.find-meals-btn`);
const mealsContainer = document.querySelector(`.meals-container`);

function generateURL(
  // minCalories = 0,
  calories = 0,
  // minCarbs = 0,
  carbs = 0,
  // minFat = 0,
  fat = 0,
  // minProtein = 0,
  protein = 0,
  ingredients = ``
) {
  return (
    BASE_URL +
    API_KEY +
    // `&minCalories=${minCalories}&minCarbs=${minCarbs}&minFat=${minFat}&minProtein=${minProtein}` +
    `&maxCalories=${calories}&maxCarbs=${carbs}&maxFat=${fat}&maxProtein=${protein}&includeIngredients=${ingredients}&addRecipeInformation=true`
  );
}

function clearMeals() {
  meals = [];
  mealsContainer.innerHTML = ``;
}

function generateMealHTML(meal) {
  return `<div class="meal">
  <h2 class="title">${meal.title}</h2>
  <img
    src=${meal.imageURL}
    alt=${meal.title}
  />
  <ul class="nutrition">
    <li class="calories">${meal.calories} cal</li>
    <li class="protein">${meal.protein}g protein</li>
    <li class="fat">${meal.fat}g fat</li>
    <li class="carbs">${meal.carbs}g carbs</li>
  </ul>
  <a
    href=${meal.sourceURL}
    target="_blank"
    >Recipe</a
  >
</div>`;
}

function formatUserString(str) {
  const strLower = str.toLowerCase();
  return strLower.split(` `).join(`,`);
}

//TODO: Figure out how to get min calories to work
//TODO: Make this an async function
function findMeals() {
  clearMeals();
  const resultsURL = generateURL(
    // +caloriesInputMin.value,
    +caloriesInput.value,
    // +carbsInputMin.value,
    +carbsInput.value,
    // +fatInputMin.value,
    +fatInput.value,
    // +proteinInputMin.value,
    +proteinInput.value,
    formatUserString(ingredientsInput.value)
  );
  console.log(resultsURL);
  fetch(resultsURL)
    .then((res) => res.json())
    .then((data) => {
      const rawMealsData = data.results;
      rawMealsData.forEach((meal) =>
        meals.push({
          title: meal.title,
          imageURL: meal.image,
          sourceURL: meal.sourceUrl,
          calories: Math.round(meal.nutrition.nutrients[0].amount),
          protein: Math.round(meal.nutrition.nutrients[1].amount),
          fat: Math.round(meal.nutrition.nutrients[2].amount),
          carbs: Math.round(meal.nutrition.nutrients[3].amount),
        })
      );
      meals.forEach((meal) => {
        let html = generateMealHTML(meal);
        mealsContainer.insertAdjacentHTML(`beforeend`, html);
      });
      console.log(meals);
    });
}

findMealsBtn.addEventListener(`click`, function (e) {
  e.preventDefault();
  findMeals();
});
