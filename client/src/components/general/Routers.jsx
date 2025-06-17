import  { useState, createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import { GET } from "./queries";
import Login from "./Login";
import SignUp from "./SignUp";
import DisplayBooks from "./DisplayBooks";
import ManagerHomepage from "../manager/ManagerHomepage";
import Users from "../manager/Users";
import Books from "../manager/Books";
import Lends from "../manager/Lends";
import SubscriberHomepage from "../Subscriber/SubscriberHomepage";
import LendBook from "../subscriber/LendBook";
import LendsHistory from "../subscriber/LendsHistory";
import ReturnBook from "../subscriber/ReturnBook";
import Payment from "../Subscriber/Payment";
import ErrorNotFound from "./ErrorNotFound";
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
                    const currentUser = await GET(`http://localhost:3000/users/${user.id}`);
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
                        path="/subscriber/homepage"
                        element={
                            <SubscriberHomepage />
                        }
                    />
                    <Route
                        path="/subscriber/lendBook"
                        element={
                            <LendBook />
                        }
                    />
                    <Route
                        path="/subscriber/lendsHistory"
                        element={
                            <LendsHistory />
                        }
                    />
                    <Route
                        path="/subscriber/returnBook"
                        element={
                            <ReturnBook />
                        }
                    />
                    <Route
                        path="/subscriber/payment"
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