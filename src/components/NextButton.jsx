import React from "react";

const NextButton = (props) => {
  return (
    <>
      <button
        className="btn btn-ui"
        onClick={() => props.dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    </>
  );
};

export default NextButton;
