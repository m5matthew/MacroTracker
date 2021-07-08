import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
import MealsTable from "./MealsTable";
import "./Home.css";

// TODO: Try a different pie chart like https://sschannak.medium.com/creating-a-progress-chart-with-victorypie-in-react-20514c92775

function Home() {
  const [meals, setMeals] = useState([]);

  // need toggleRenderer to trigger useEffect when we delete a meal
  const [toggleRerender, setToggleRerender] = useState(false);

  useEffect(() => {
    fetch(`/entries/get_by_date?timestamp=${Math.round(Date.now() / 1000)}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log("Got meals", data);

        // multiply macros by the quantity of the meal
        const dataRecalculatedWithQuantity = [];
        for (let i = 0; i < data.length; i++) {
          let { meal_id, quantity, id, name, protein, fat, carbs, date } =
            data[i];
          let calculatedMeal = {
            meal_id,
            id,
            date,
            name: name + "(" + quantity + ")",
            carbs: parseFloat(carbs) * parseFloat(quantity),
            protein: parseFloat(protein) * parseFloat(quantity),
            fat: parseFloat(fat) * parseFloat(quantity),
          };
          dataRecalculatedWithQuantity.push(calculatedMeal);
        }

        setMeals(dataRecalculatedWithQuantity);
      });
  }, [toggleRerender]);

  // Sums up across one key for a list of objects
  // Ex. reducebyObject({a: '2', a:'3'}, 'a') = 5
  const reduceByObjectKey = (array, key) => {
    if (array.length === 0) {
      return 0;
    }
    const total = array.reduce((acc, o) => {
      return {
        [key]: acc[key] + o[key],
      };
    })[key];
    return total;
  };

  // Documentation: https://react-google-charts.com/pie-chart

  let proteinGoal = 100,
    carbsGoal = 100,
    fatsGoal = 100;

  let carbsEaten = reduceByObjectKey(meals, "carbs");
  let proteinEaten = reduceByObjectKey(meals, "protein");
  let fatsEaten = reduceByObjectKey(meals, "fat");

  let carbsData = [
      ["Carbs", "Grams"],
      ["Eaten", carbsEaten],
      ["Left", Math.max(0, carbsGoal - carbsEaten)],
    ],
    proteinData = [
      ["Protein", "Grams"],
      ["Eaten", proteinEaten],
      ["Left", Math.max(0, proteinGoal - proteinEaten)],
    ],
    fatsData = [
      ["Fats", "Grams"],
      ["Eaten", fatsEaten],
      ["Left", Math.max(0, fatsGoal - fatsEaten)],
    ];

  // piechart configs
  const width = "500px";
  const height = "300px";
  const loader = <div>Loading Chart</div>;

  return (
    <div>
      <h1>Welcome, Matthew!</h1>
      <div className="pie-chart-container">
        <Chart
          width={width}
          height={height}
          chartType="PieChart"
          loader={loader}
          data={carbsData}
          options={{
            title: "Carbs Intake",
            slices: {
              0: { color: "blue" },
              1: { color: "gray" },
            },
          }}
        />
        <Chart
          width={width}
          height={height}
          chartType="PieChart"
          loader={loader}
          data={proteinData}
          options={{
            title: "Protein Intake",
            slices: {
              0: { color: "purple" },
              1: { color: "gray" },
            },
          }}
        />
        <Chart
          width={width}
          height={height}
          chartType="PieChart"
          loader={loader}
          data={fatsData}
          options={{
            title: "Fat Intake",
            slices: {
              0: { color: "green" },
              1: { color: "gray" },
            },
          }}
        />
      </div>
      <MealsTable
        data={meals}
        onDelete={() => setToggleRerender(!toggleRerender)}
      />
    </div>
  );
}

export default Home;
