import React, { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import "./AddMeal.css";
/*
TODO: 
- Call Meals API to display all meals
- Currently timestamps are displayed as numbers
- Test entries API
*/

function AddEntry() {
  const [date, setDate] = useState(Date.now());
  const [mealID, setMealID] = useState("");

  const [validSubmit, setValidSubmit] = useState(true);
  const [submitInProgress, setSubmitInProgress] = useState(false);

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
        date,
        meal_id: mealID,
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
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label for="meals">Choose a meal:</label>
          <select id="meals" name="meals">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="fiat">Fiat</option>
            <option value="audi">Audi</option>
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
