import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProductContextProvider } from "./context/ProductContext";
import { FilterContextProvider } from "./context/FilterContext";
import { CartContextProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import "react-toastify/dist/ReactToastify.css";
import { AdminUserProvider } from "./context/AdminUsersContext";
import { AdminProductsProvider } from "./context/AdminProductsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ProductContextProvider>
      <AdminProductsProvider>
        <AuthProvider>
          <AdminUserProvider>
            <AdminAuthProvider>
              <FilterContextProvider>
                <CartContextProvider>
                  <App />
                  <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    bodyClassName="toastClass"
                  />
                </CartContextProvider>
              </FilterContextProvider>
            </AdminAuthProvider>
          </AdminUserProvider>
        </AuthProvider>
      </AdminProductsProvider>
    </ProductContextProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
