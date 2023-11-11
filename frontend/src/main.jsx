import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import router from './router.jsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store.js'
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer/>
    </Provider>
  </React.StrictMode>,
)
