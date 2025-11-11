import {useState, useEffect, useDebugValue} from "react";

export function usePizzaOfTheDay() {
    const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);
    useDebugValue(pizzaOfTheDay ? `${pizzaOfTheDay.name} : ${pizzaOfTheDay.description} : ${pizzaOfTheDay.id}` : "Loading...");
    useEffect(() => {
        async function fetchPizzaOfTheDay() {
            const res = await fetch("/api/pizza-of-the-day");
            const pizzaData = await res.json();
            setPizzaOfTheDay(pizzaData);
        }
        fetchPizzaOfTheDay();
}, []) 

return pizzaOfTheDay;

}