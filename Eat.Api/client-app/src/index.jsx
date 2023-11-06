import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Sellers from './components/admin/index';
import App from './App';
import Seller from './components/seller/seller';
import SellerPage from './components/page';
import Home from './components/home';
import ProfileInfo from './components/admin/profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
        <Route path="/" Component={Home}>
          <Route path="/:id" Component={SellerPage} />
          <Route path="/profile/:id" Component={ProfileInfo} />
          <Route path="/admin" Component={App}>
            <Route path="/admin/sellers" Component={Sellers} />
            <Route path="/admin/seller/:id" Component={Seller} />
          </Route>
        </Route>
    </Routes>
  </BrowserRouter>
);
reportWebVitals();
