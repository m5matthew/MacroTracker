import React, { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import "./AddMeal.css";

function AddMeal() {
  const [name, setName] = useState("");
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);
  const [carbs, setCarbs] = useState(0);

  // These states are only updated when the user attempts to create a new meal
  const [validName, setValidName] = useState(true);
  const [validProtein, setValidProtein] = useState(true);
  const [validFat, setValidFat] = useState(true);
  const [validCarbs, setValidCarbs] = useState(true);
  const [validSubmit, setValidSubmit] = useState(true);

  const [submitInProgress, setSubmitInProgress] = useState(false);

  const resetState = (_) => {
    setName("");
    setProtein(0);
    setFat(0);
    setCarbs(0);
    setValidName(true);
    setValidProtein(true);
    setValidFat(true);
    setValidCarbs(true);
  };

  const handleSubmit = (e) => {
    setSubmitInProgress(true);
    // prevent HTML form default behavior
    // https://stackoverflow.com/questions/3350247/how-to-prevent-form-from-being-submitted
    e.preventDefault();

    setValidSubmit(true);
    setValidName(name.trim() !== "");
    setValidProtein(!isNaN(protein));
    setValidFat(!isNaN(fat));
    setValidCarbs(!isNaN(carbs));

    const validMeal =
      name.trim() !== "" && !isNaN(protein) && !isNaN(fat) && !isNaN(carbs);
    if (validMeal) {
      console.log(
        `Adding meal ${name} with ${protein} protein, ${fat} fat, and ${carbs} carbs.`
      );
      fetch("/meals/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          protein,
          fat,
          carbs,
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
    }
  };

  return (
    <div style={{ textAlign: "left" }}>
      {!validSubmit && (
        <ErrorMessage msg="Error submitting meal to database. Please ensure meal names are unique." />
      )}
      {!validName && <ErrorMessage msg="Meal name cannot be empty." />}
      {!validProtein && <ErrorMessage msg="Protein must be a valid number." />}
      {!validFat && <ErrorMessage msg="Fat must be a valid number." />}
      {!validCarbs && <ErrorMessage msg="Carbs must be a valid number." />}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Meal Name</label>
          <input
            type="text"
            className={
              "form-control " + (validName ? "" : "AddMeal-invalidInput")
            }
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter meal name"
          />
        </div>
        <div className="row">
          <div className="form-group col">
            <label htmlFor="protein"> Protein </label>
            <input
              type="text"
              className={
                "form-control " + (validProtein ? "" : "AddMeal-invalidInput")
              }
              id="protein"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
            />
          </div>
          <div className="form-group col">
            <label htmlFor="fat"> Fat </label>
            <input
              type="text"
              className={
                "form-control " + (validFat ? "" : "AddMeal-invalidInput")
              }
              id="fat"
              value={fat}
              onChange={(e) => setFat(e.target.value)}
            />
          </div>
          <div className="form-group col">
            <label htmlFor="carbs"> Carbs </label>
            <input
              type="text"
              className={
                "form-control " + (validCarbs ? "" : "AddMeal-invalidInput")
              }
              id="carbs"
              value={carbs}
              onChange={(e) => setCarbs(e.target.value)}
            />
          </div>
        </div>

        {submitInProgress ? (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"> Loading... </span>
          </div>
        ) : (
          <button type="submit" className="btn btn-primary">
            Add Meal
          </button>
        )}
      </form>
    </div>
  );
}

export default AddMeal;
