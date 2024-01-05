import { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const config = {};

export default function Meals() {
  const {
    data: meals,
    isFetching,
    error,
    sendReq,
  } = useHttp("http://localhost:3000/meals", config, []);

  if (isFetching) {
    return <p className="center">Fetching Data...</p>;
  }
  if (error) {
    return <Error title="Failed to fetch data" message={error} />;
  }
  return (
    <ul id="meals">
      {meals.map((meal: any) => {
        return <MealItem key={meal.id} meal={meal} />;
      })}
    </ul>
  );
}
