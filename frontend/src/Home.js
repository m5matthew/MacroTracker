import React, { useState, useEffect } from "react";
import MealsTable from "./MealsTable";

function Home() {

  const [meals, setMeals] = useState([]);

    useEffect(() => {
      fetch(`/entries/get_by_date?timestamp=${Math.round(Date.now()/1000)}`)
        .then((resp) => resp.json())
        .then((data) => {
          console.log("Got meals", data);
          setMeals(data);
        });
    }, []);


  return <MealsTable data={meals} />;
}

export default Home;
