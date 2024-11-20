import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Loader from "./common/Loader";
import PageTitle from "./components/PageTitle";
import DefaultLayout from "./layout/DefaultLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Calendar from "./pages/Dashboard/Calendar";
import Profile from "./pages/Dashboard/Profile";
import Tables from "./pages/Dashboard/Tables";
import Settings from "./pages/Dashboard/Settings";
import TermsAndCondition from "./pages/Dashboard/TermsAndCondition";
import PrivacyAndPolicy from "./pages/Dashboard/PrivacyAndPolicy";
import LoginForm from "./pages/Authentication/LoginForm";

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

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PageTitle title="ECommerce Dashboard" />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile" />
              <Profile />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings" />
              <Settings />
            </>
          }
        />
        <Route
          path="/settings/termsAndConditions"
          element={
            <>
              <PageTitle title="Terms and Conditions" />
              <TermsAndCondition />
            </>
          }
        />
        <Route
          path="/settings/privacyAndPolicy"
          element={
            <>
              <PageTitle title="Privacy And Policy" />
              <PrivacyAndPolicy />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Sign In" />
              <LoginForm />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default Routers;
