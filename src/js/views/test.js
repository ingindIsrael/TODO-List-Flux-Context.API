import React from "react";
import { useContext, createContext } from "react";


export function Test(props) {
	// Use the Provider to make a value available to all
	// children and grandchildren
	// const value = useContext(Context);
  const value = useContext(Context);

  return <div>The answer is {value}.</div>;
  }
