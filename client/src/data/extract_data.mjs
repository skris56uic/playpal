import fs from "fs";

const raw_data = fs.readFileSync("../../../../countries_states_cities.json");
// const json_data = JSON.parse(raw_data);
const countries = JSON.parse(raw_data);

const data = [];
// let country_object, state_object, city_object;

// for (let i = 0; i < json_data.length; i++) {
//   country_object = json_data[i];
//   console.log("country_number: ", i + 1);
//   console.log(country_object.name);

//   if (country_object.name === "United States") {
//     let states = [];

//     for (let j = 0; j < country_object.states.length; j++) {
//       state_object = country_object.states[j];

//       let cities = [];

//       for (let k = 0; k < state_object.cities.length; k++) {
//         city_object = state_object.cities[k];
//         cities.push({
//           name: city_object.name,
//           latitude: city_object.latitude,
//           longitude: city_object.longitude,
//         });
//       }

//       states.push({
//         name: state_object.name,
//         latitude: state_object.latitude,
//         longitude: state_object.longitude,
//         cities: cities,
//       });
//     }

//     data.push({
//       name: country_object.name,
//       latitude: country_object.latitude,
//       longitude: country_object.longitude,
//       states: states,
//     });
//   }
// }

for (const country_object of countries) {
  const states = [];

  for (const state_object of country_object.states) {
    const cities = [];

    for (const city_object of state_object.cities) {
      if (city_object.latitude && city_object.longitude) {
        cities.push({
          name: city_object.name,
          latitude: city_object.latitude,
          longitude: city_object.longitude,
        });
      }
    }

    if (cities.length > 0) {
      states.push({
        name: state_object.name,
        cities: cities,
      });
    }
  }

  if (states.length > 0) {
    data.push({
      name: country_object.name,
      states: states,
    });
  }
}

console.log(data.length);

fs.writeFileSync("all.json", JSON.stringify(data, null, 2));
console.log("Data saved to all.json");
