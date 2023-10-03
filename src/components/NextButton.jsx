import React from "react";

const NextButton = (props) => {
  if (props.index < props.numQuestion - 1) {
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
  }

  if (props.index === props.numQuestion - 1) {
    return (
      <>
        <button
          className="btn btn-ui"
          onClick={() => props.dispatch({ type: "finish" })}
        >
          Finish
        </button>
      </>
    );
  }
};

export default NextButton;
