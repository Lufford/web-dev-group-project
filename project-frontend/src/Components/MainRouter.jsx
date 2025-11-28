import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../Pages/Home';
import Login from '../Pages/Login';
import ItemReview from '../Pages/ItemReview';
import CustomerReviews from '../Pages/CustomerReviews';
import AddItem from '../Pages/AddItem';




export default function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/itemreview" element={<ItemReview />} />
      <Route path="/customerreviews" element={<CustomerReviews />} />
      <Route path="/additem" element={<AddItem />} />


    </Routes>
  );
}