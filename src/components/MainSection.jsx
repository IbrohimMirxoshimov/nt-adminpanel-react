import { Route, Routes } from "react-router";
import ProductsPage from "../pages/ProductsPage";
import HomePage from "../pages/HomePage";
import RentsPage from "../pages/RentsPage";
import UsersPage from "../pages/UsersPage";
import StocksPage from "../pages/StocksPage";

export function MainSection() {
  return (
    <main className="bg-slate-300 w-full p-2">
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/products"
          element={<ProductsPage />}
        />
        <Route
          path="/rents"
          element={<RentsPage />}
        />
        <Route
          path="/users"
          element={<UsersPage />}
        />
        <Route
          path="/stocks"
          element={<StocksPage />}
        />
      </Routes>
    </main>
  );
}
