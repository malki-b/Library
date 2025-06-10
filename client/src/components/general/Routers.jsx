import  { useState, createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./Home";//
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import { GET } from "./queries";
import Login from "./Login";
import SignUp from "./SignUp";
import DisplayBooks from "./DisplayBooks";
import ManagerHomepage from "../manager/ManagerHomepage";
import Users from "../manager/Users";
import Books from "../manager/Books";
import Lends from "../manager/Lends";
import SubscriptionHomepage from "../subscription/SubscriptionHomepage";
import LendBook from "../subscription/LendBook";
import LendsHistory from "../subscription/LendsHistory";
import ReturnBook from "../subscription/ReturnBook";
import Payment from "../subscription/Payment";
import ErrorNotFound from "./ErrorNotFound";
// import { BrowserRouter, Routes, Route } from "react-router-dom";



// // import Home from "./Home";
// import Todos from "./Todos";
// import Posts from "./Posts";
// import Info from "./Info";

export const Context = createContext();

export default function Routers() {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("currentUser")) || null
    );
    useEffect(() => {
        const fetchData = async () => {
            const user = JSON.parse(localStorage.getItem("currentUser"));
            if (user) {
                try {
                    const currentUser = await GET(`http://localhost:3000/users/1`);
                    if (currentUser.length > 0) {
                        setCurrentUser(currentUser[0]);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
        fetchData();
    }, []);

    return (
        <Context.Provider value={[currentUser, setCurrentUser]}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route
                        path="/home"
                        element={
                            <Homepage />
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <Homepage />
                        }
                    />
                    <Route
                        path="/displaybooks"
                        element={
                            <DisplayBooks />
                        }
                    />
                    <Route
                        path="/manager/homepage"
                        element={
                            <ManagerHomepage />
                        }
                    />
                    <Route
                        path="/manager/users"
                        element={
                            <Users />
                        }
                    />
                    <Route
                        path="/manager/books"
                        element={
                            <Books />
                        }
                    />
                    <Route
                        path="/manager/lends"
                        element={
                            <Lends />
                        }   
                    />  
                    <Route
                        path="/subscription/homepage"
                        element={
                            <SubscriptionHomepage />
                        }
                    />
                    <Route
                        path="/subscription/lendBook"
                        element={
                            <LendBook />
                        }
                    />
                    <Route
                        path="/subscription/lendsHistory"
                        element={
                            <LendsHistory />
                        }
                    />
                    <Route
                        path="/subscription/returnBook"
                        element={
                            <ReturnBook />
                        }
                    />
                    <Route
                        path="/subscription/payment"
                        element={
                            <Payment />
                        }
                    />

                    <Route path="*" element={<ErrorNotFound />} />
                </Routes>
            </BrowserRouter>
        </Context.Provider>
    );
}