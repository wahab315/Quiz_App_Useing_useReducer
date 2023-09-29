import React from "react";

const StartScreen = (props) => {
  return (
    <>
      <div className="start">
        <h2>Welcome to The React Quiz!</h2>
        <h3>{props.totalQuestion} questions to test your React mastery</h3>
        <button
          className="btn btn-ui"
          // onClick={() => dispatch({ type: "start" })}
          onClick={props.onClick}
        >
          Let's start
        </button>
      </div>
    </>
  );
};

export default StartScreen;
