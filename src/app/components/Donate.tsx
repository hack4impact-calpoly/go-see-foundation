import { useState } from "react";

export default function Donate() {
  // holds the user selections
  const [time, setTime] = useState("Once");
  const [amount, setAmount] = useState("$25");

  /* handles changes with the time buttons */
  const timeOnClick = (e: any) => {
    e.preventDefault();
    // check if already selected
    if (e.target.classList.contains("selected")) {
      return;
    }
    // make sure it's the only button selected
    document.querySelectorAll(".timeButton").forEach((b) => {
      b.classList.remove("selected");
    });

    // make it selected for styling
    e.target.classList.add("selected");

    setTime(e.target.innerHTML);
  };

  /* handles changes with the amount button */
  const amountOnClick = (e: any) => {
    e.preventDefault();
    // check if already selected
    if (e.target.classList.contains("selected")) {
      return;
    }

    // make sure it's the only button selected
    document.querySelectorAll(".amountButton").forEach((b) => {
      b.classList.remove("selected");
    });

    e.target.classList.add("selected");

    // make sure it's the only button selected
    setAmount(e.target.innerHTML);
  };

  /* handle changes with the change of the input */
  const amountInput = (e: any) => {
    /* user has decided to entire stuff in remove the selected from buttons */
    document.querySelectorAll(".amountButton").forEach((b) => {
      b.classList.remove("selected");
    });
    /* make that inputted value the new amount value */
    setAmount(`$${e.target.value}`);
  };

  /* for submitting the form */
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // handle the form submission here
    console.log(time, amount);
  };

  return (
    <div className="donateComponent">
      <h1>Your Donation will help us GO See More</h1>
      <form className="donateForm" onSubmit={handleSubmit}>
        <div className="donateTime">
          <button className="timeButton selected" onClick={timeOnClick}>
            Once
          </button>
          <button className="timeButton" onClick={timeOnClick}>
            Monthly
          </button>
        </div>
        <div className="donateAmount">
          <button className="amountButton selected" onClick={amountOnClick}>
            $25
          </button>
          <button className="amountButton" onClick={amountOnClick}>
            $50
          </button>
          <button className="amountButton" onClick={amountOnClick}>
            $100
          </button>
          <button className="amountButton" onClick={amountOnClick}>
            $250
          </button>
          <p>Input your own Donation amount below:</p>
          <input
            type="number"
            className="customInput"
            min="0"
            onChange={amountInput}
          ></input>
        </div>
        <button type="submit">Donate</button>
      </form>
    </div>
  );
}
