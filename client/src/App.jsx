import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import SingleProduct from "./pages/SingleProduct";
import Error from "./pages/Error";
import UserLayout from "./components/UserLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import AdminLayout from "./components/admin/AdminLayout";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminDeshbord from "./pages/admin/AdminDeshbord";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminContects from "./pages/admin/AdminContects";
import AdminLogout from "./pages/admin/AdminLogout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminUsers from "./pages/admin/AdminUsers";
import ProfileUpdate from "./components/admin/ProfileUpdate";
import AdminProfile from "./pages/admin/AdminProfile";
import UserProfileUpdate from "./pages/UserProfileUpdate";
import UserProfilePage from "./pages/UserProfilePage";
import CreateProduct from "./pages/admin/CreateProduct";
import UpdateProduct from "./pages/admin/UpdateProduct";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/update_profile" element={<UserProfileUpdate />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Error />} />
          </Route>
          <Route path="/admin">
            <Route element={<AdminLayout />}>
              <Route path="deshbord" element={<AdminDeshbord />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="product/:id" element={<UpdateProduct />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="contects" element={<AdminContects />} />
              <Route path="create_product" element={<CreateProduct />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="update_profile" element={<ProfileUpdate />} />
              <Route path="logout" element={<AdminLogout />} />
            </Route>
            <Route path="login" element={<AdminLogin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
