`use strict`;

function generateURL(calories = 0, carbs = 0, fat = 0, protein = 0) {
  return `https://api.spoonacular.com/recipes/findByNutrients?apiKey=43a4dc69a4194fc9ae128504366e5e35&maxCalories=${calories}&maxCarbs=${carbs}&maxFat=${fat}&maxProtein=${protein}`;
}

const testURL = generateURL(100, 40, 20, 40);

fetch(testURL)
  .then((res) => res.json())
  .then((data) => {
    const meal = {
      title: data[0].title,
      imageURL: data[0].image,
      calories: data[0].calories,
      protein: data[0].protein,
      fat: data[0].fat,
      carbs: data[0].carbs,
    };
    console.log(meal);
  });
