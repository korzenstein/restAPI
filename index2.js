import express from "express";
import { JSDOM } from "jsdom";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOLtSlkvabFQvkeFoBqEPTt6vMDLqXoxE",
  authDomain: "customrest-1cc4c.firebaseapp.com",
  projectId: "customrest-1cc4c",
  storageBucket: "customrest-1cc4c.appspot.com",
  messagingSenderId: "676521491717",
  appId: "1:676521491717:web:3cd3add4fab564ff778b6c",
};

// Initialize Firebase
const fireApp = initializeApp(firebaseConfig);
const database = getDatabase(fireApp);
const dbRef = ref(database);
// Initialize Express
const app = express();
const PORT = 8006;
// Arrays for holding datasets
const eraArray = [];
const pitchersArray = [];
const urlArray = [];


// Scrape MLB Pitchers
async function getBaseball() {
  const url = "https://www.espn.com/mlb/stats/player/_/view/pitching/table/pitching/sort/ERA/dir/asc";
  const { data } = await axios.get(url);
  const dom = new JSDOM(data);

  // ERA for top 6
  // const era = dom.window.document.querySelectorAll(".AnchorLink");
  // era.forEach((item) => {
  //   console.log(eraArray.push(item.textContent));
  // });
  // // const newEraArray = eraArray.slice(5, 11);

  // Names + URLs of top 6
  const pitchers = dom.window.document.querySelectorAll(".AnchorLink");
  pitchers.forEach((item) => {
    // console.log(item.textContent)
    // console.log(item.getAttribute('href'))
  });
  // const newUrlArray = urlArray.slice(1, 7);
  // const newPitchersArray = pitchersArray.slice(0, 6)
  // console.log(newUrlArray);


  // Convert to Objects
  // const pitcherObj = newPitchersArray.map((value) => ({ player: value }));
  // const eraObj = newEraArray.map((value) => ({ era: value }));

  // const result = pitcherObj.map((v, i) => ({
  //   ...eraObj[i],
  //   ...pitcherObj[i],
  // }));

  // console.log(result);

  const userId = "-N3b4ATTrgzjzDZw4E4V";

  const updateFirebase = (profileData) => {
    const childRef = ref(database, `/${userId}`);
    return set(childRef, profileData);
  };

  // updateFirebase(result);
}


// More pitcher details
async function getPitcher(pitcher) {
  const url = `https://www.espn.com/mlb/player/bio/_/id/${pitcher}`;
  const { data } = await axios.get(url);
  const dom = new JSDOM(data);
  
  const country = dom.window.document.querySelectorAll(".dib");
  let counter = 11
  // country.forEach(con => {
  //   counter += 12
  //   console.log(con.textContent)
  // })
  for (let i = 0; i < country.length; i++) {
    
  }
}

const tester = [
  '32151',
  '36480',
  '34848',
  '35241',
  '39671',
  '42436'
]
  
const fetchPitchers = async () => {
            try {
              const res = await Promise.allSettled([
                getPitcher(tester[0]),
                getPitcher(tester[1]),
                getPitcher(tester[2]),
                getPitcher(tester[3]),
                getPitcher(tester[4]),
                getPitcher(tester[5]),
              ]);
              const pitcherData = res.map((res) => {
                // return res.value.data.photos[0];
                // console.log(res)
              });

            } catch {
              throw Error("Promise failed");
            }
          };
  fetchPitchers()







getBaseball();


app.listen(PORT, () =>
  console.log(`Listening to Stephen's server on port: http://localhost:${PORT}`)
);
