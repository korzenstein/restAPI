import express from "express";
import { JSDOM } from "jsdom";
import axios from "axios";

const app = express();
const PORT = 8001;
const eraArray = [];
const pitchersArray = [];

const url = "https://www.mlb.com/stats/pitching?sortState=asc/";

async function getBaseball() {
  const { data } = await axios.get(url);
  const dom = new JSDOM(data);

  // Data for ERA / Earned Run Averages top 25
  const era = dom.window.document.querySelectorAll(".selected-1vxxHvFg");
  era.forEach((item) => {
    eraArray.push(item.textContent);
  });

  const newEraArray = eraArray.slice(5, 30)

  // Data for Pitchers top 25
  const pitchers = dom.window.document.querySelectorAll(
    ".top-wrapper-1NLTqKbE"
  );
  pitchers.forEach((item) => {
    pitchersArray.push(item.textContent);
  });
  const result = [{
      player: pitchersArray, 
      era: newEraArray
}]
//   const result = pitchersArray.reduce(function (result, field, index) {
//     result[eraArray.slice(5, 30)[index]] = field;
//     return result;
//   }, {});
  console.log(result);
}

getBaseball();

app.listen(PORT, () =>
  console.log(`Listening to Stephen's server on port: http://localhost:${PORT}`)
);

