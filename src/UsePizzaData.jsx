import { useState, useEffect } from "react";

export function UsePizzaData  () {
    const [pizzaData, setPizzaData] = useState([])
    
    useEffect(()=> {
        async function usedata () {
         await new Promise((resolve) => setTimeout(resolve, 10000));
         const res = await fetch("/api/pizzas")
         const data = await res.json();
         setPizzaData(data);
        } 
        usedata();
    },[])
    return pizzaData;
}