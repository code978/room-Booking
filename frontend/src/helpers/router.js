import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RoomSlots from "../components/RoomSlots";

const router = createBrowserRouter([
    {
        path: "/",
        element: React.createElement(App),
    },
    {
        path: 'roomslots/:id',
        element: React.createElement(RoomSlots)
    }
]);


export default router;