import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import RoomSlots from './components/RoomSlots.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import router from './helpers/router.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>,
)
