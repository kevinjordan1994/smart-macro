`use strict`;

const express = require(`express`);
const bodyParser = require(`body-parser`);
const https = require(`https`);
const { json } = require("body-parser");
const spoonacular = require(__dirname + `/config.js`);

const app = express();

app.get(`/`, function (req, res) {
  res.send(`Test`);

  // TODO: SOLVE UNEXPECTED END OF JSON INPUT
  https.get(spoonacular.BASE_URL, (response) => {
    response.on(`data`, (data) => {
      const readableData = JSON.parse(data);
      console.log(readableData.results[0].title);
    });
  });
});

app.listen(3000);
