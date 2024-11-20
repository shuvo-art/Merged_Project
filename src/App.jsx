import { useEffect, useState } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";

import Loader from "./common/Loader";
import PageTitle from "./components/PageTitle";
import DefaultLayout from "./layout/DefaultLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Dashboard/Profile";
import TermsAndCondition from "./pages/Dashboard/TermsAndCondition";
import PrivacyAndPolicy from "./pages/Dashboard/PrivacyAndPolicy";
import SignIn from "./pages/Authentication/SignIn";
import PrivateRoute from "./Private/PrivateRoutes";
import OrderManagement from "./pages/Dashboard/OrderManagement";
import AddQuestionnaire from "./pages/Dashboard/AddQuestionnaire";
import MakeAdmin from "./pages/Dashboard/MakeAdmin";
import Subscription from "./pages/Authentication/Subscription";

function Routers() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer); // Cleanup the timeout on unmount
  }, []);

  if (loading) return <Loader />;

  return (
    <Routes>
      {/* Public Route */}
      <Route path="/auth/signin" element={<SignIn />} />

      {/* Private Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DefaultLayout />
          </PrivateRoute>
        }
      >
        <Route
          index
          element={
            <>
              <PageTitle title={"alwways | Dashboard"} />
              <Dashboard />
            </>
          }
        />
        <Route
          path="orderManagement"
          element={
            <>
              <PageTitle title="alwways | Order Management" />
              <OrderManagement />
            </>
          }
        />
        <Route
          path="profile"
          element={
            <>
              <PageTitle title="alwways | Profile" />
              <Profile />
            </>
          }
        />
        <Route
          path="addQuestionnaire"
          element={
            <>
              <PageTitle title="alwways | Add Questionnaire" />
              <AddQuestionnaire />
            </>
          }
        />
        <Route
          path="makeAdmin"
          element={
            <>
              <PageTitle title="alwways | Make Admin" />
              <MakeAdmin />
            </>
          }
        />
        <Route
          path="subscription"
          element={
            <>
              <PageTitle title="alwways | Subscription" />
              <Subscription />
            </>
          }
        />
        <Route
          path="settings/termsAndConditions"
          element={
            <>
              <PageTitle title="Terms and Conditions" />
              <TermsAndCondition />
            </>
          }
        />
        <Route
          path="settings/privacyAndPolicy"
          element={
            <>
              <PageTitle title="Privacy And Policy" />
              <PrivacyAndPolicy />
            </>
          }
        />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/auth/signin" />} />
    </Routes>
  );
}

export default Routers;
