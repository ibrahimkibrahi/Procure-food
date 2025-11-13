import { createRoot } from "react-dom/client";
import { StrictMode } from "react"; 
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import { useState, useEffect } from "react";

// const [pizza, setpizza] = useState([])

//  useEffect(() =>{
//   const res = async() =>{
//     try{
//           const response = await fetch("/public/pizza")
//     const responseData = response.json();
//     setpizza(responseData)
//     }catch(error){
//       console.log(error);
//     }
//   }
//   res();
// }
//  )

const router = createRouter({ routeTree });
const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
         <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
    </BrowserRouter>
    
  );
}; 
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App/>); 
