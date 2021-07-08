import React, { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";
import "./AddMeal.css";

// TODO: Add breakfast/lunch/dinner ?

function AddEntry() {
  const [date, setDate] = useState(Date.now());
  const [mealID, setMealID] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [allMeals, setAllMeals] = useState([]);

  const [validSubmit, setValidSubmit] = useState(true);
  const [submitInProgress, setSubmitInProgress] = useState(false);

  // effectively same thing as componentDidMount()
  useEffect(() => {
    fetch("/meals/get")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.length > 0) {
          setMealID(data[0].id);
        }
        setAllMeals(data);
      });
  }, []);

  const resetState = (_) => {
    setMealID("");
    setDate(Date.now());
  };

  const handleSubmit = (e) => {
    setSubmitInProgress(true);
    e.preventDefault();

    setValidSubmit(true);
    fetch("/entries/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: Math.round(date / 1000), // Date.now() returns milliseconds so we convert to seconds
        meal_id: mealID,
        quantity,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
      })
      .then(resetState)
      .catch((error) => {
        console.log(error);
        setValidSubmit(false);
      })
      .finally(() => setSubmitInProgress(false));
  };

  return (
    <div style={{ textAlign: "left" }}>
      {!validSubmit && (
        <ErrorMessage msg="Error submitting entry to database." />
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="text"
            className="form-control"
            id="date"
            value={new Date(date)}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="text"
            className="form-control"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label for="meals">Choose a meal:</label>
          <select
            id="meals"
            name="meals"
            onChange={(e) => setMealID(e.target.value)}
          >
            {allMeals.map((meal) => (
              <option value={meal.id}>{meal.name}</option>
            ))}
          </select>
        </div>

        {submitInProgress ? (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"> Loading... </span>
          </div>
        ) : (
          <button type="submit" className="btn btn-primary">
            Add Entry
          </button>
        )}
      </form>
    </div>
  );
}

export default AddEntry;
