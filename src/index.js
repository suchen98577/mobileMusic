import React,{Component} from "react";
import ReactDOM from "react-dom";
//全局引入rem.js和清除默认样式
import './assets/css/reset.css'
import './assets/js/remScal'
import "./index.css";
import App from "./App";

//路由模式
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
      <App />
</BrowserRouter>
    ,
  document.getElementById("root")
);
