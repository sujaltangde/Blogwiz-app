import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import profileReducer from './Slice.jsx'

const store = configureStore({
    reducer:{
      profile: profileReducer,
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
    <Router>
    <App />
    </Router>
    </Provider>
  </React.StrictMode>,
)
