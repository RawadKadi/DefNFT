/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect, useMemo } from "react";
import { firestore, app } from "../src/firebase/config";
import { ethers } from "ethers";
// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import NFTList from "layouts/dashboard/components/Nft_cards";
import NFTCardDetail from "layouts/dashboard/components/NFTDetails/NFTCardDetail";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Soft UI Dashboard React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Soft UI Dashboard React routes
import routes from "routes";

// Soft UI Dashboard React contexts
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";
import Web3Jobs from "layouts/web3Jobs/index";
import JobCard from "layouts/jobCard/jobCard";
// Images
import brand from "assets/images/logo-ct.png";

import JobsData from "./JobsData";
import { Grid } from "@mui/material";

import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";

import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import VirtualReality from "layouts/virtual-reality";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
const providerOptions = {};


export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const [jobs, setJobs] = useState([]);
  const [Loading, setLoading] = useState(true);

  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

 

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });
    
  const configsButton = (
    <SoftBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </SoftBox>
  );

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      {/* <Switch>
      <Route exact path="/web3-jobs" component={Web3Jobs} />
    </Switch> */}

      <ThemeProvider theme={themeRTL}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={brand}
              brandName="DefNFT"
              routes={[
                {
                  type: "collapse",
                  name: "Today's Drops",
                  key: "dashboard",
                  route: "/dashboard",
                  icon: <Shop size="12px" />,
                  component: <Dashboard />,
                  noCollapse: true,
                },

                {
                  type: "collapse",
                  name: "NFT Marketplaces",
                  key: "tables",
                  route: "/tables",
                  icon: <CreditCard size="12px" />,
                  component: <Tables />,
                  noCollapse: true,
                },

                {
                  type: "collapse",
                  name: "Web3 Jobs",
                  key: "Web3 Jobs",
                  route: "/web3-jobs",
                  icon: <Office size="12px" />,
                  noCollapse: true,
                },
                {
                  type: "collapse",
                  name: "Virtual Reality",
                  key: "virtual-reality",
                  route: "/virtual-reality",
                  icon: <Cube size="12px" />,
                  component: <VirtualReality />,
                  noCollapse: true,
                },
                {
                  type: "collapse",
                  name: "RTL",
                  key: "rtl",
                  route: "/rtl",
                  icon: <Settings size="12px" />,
                  component: <RTL />,
                  noCollapse: true,
                },
                { type: "title", title: "Account Pages", key: "account-pages" },
                {
                  type: "collapse",
                  name: "Profile",
                  key: "profile",
                  route: "/profile",
                  icon: <CustomerSupport size="12px" />,
                  component: <Profile />,
                  noCollapse: true,
                },
                {
                  type: "collapse",
                  name: "Sign In",
                  key: "sign-in",
                  route: "/authentication/sign-in",
                  icon: <Document size="12px" />,
                  component: <SignIn />,
                  noCollapse: true,
                },
                {
                  type: "collapse",
                  name: "Sign Up",
                  key: "sign-up",
                  route: "/authentication/sign-up",
                  icon: <SpaceShip size="12px" />,
                  component: <SignUp />,
                  noCollapse: true,
                },
              ]}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Routes>
          {getRoutes(routes.filter((route) => route.key !== "Web3 Jobs"))}
          <Route path="/web3-jobs" element={<Web3Jobs />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="DefNFT"
            routes={[
              {
                type: "collapse",
                name: "Today's Drops",
                key: "dashboard",
                route: "/dashboard",
                icon: <Shop size="12px" />,
                component: <Dashboard />,
                noCollapse: true,
              },

              {
                type: "collapse",
                name: "NFT Marketplaces",
                key: "tables",
                route: "/tables",
                icon: <CreditCard size="12px" />,
                component: <Tables />,
                noCollapse: true,
              },
              {
                type: "collapse",
                name: "Web3 Jobs",
                key: "Web3 Jobs",
                route: "/web3-jobs",
                icon: <Office size="12px" />,
                noCollapse: true,
              },
              {
                type: "collapse",
                name: "Virtual Reality",
                key: "virtual-reality",
                route: "/virtual-reality",
                icon: <Cube size="12px" />,
                component: <VirtualReality />,
                noCollapse: true,
              },
              {
                type: "collapse",
                name: "RTL",
                key: "rtl",
                route: "/rtl",
                icon: <Settings size="12px" />,
                component: <RTL />,
                noCollapse: true,
              },
              { type: "title", title: "Account Pages", key: "account-pages" },
              {
                type: "collapse",
                name: "Profile",
                key: "profile",
                route: "/profile",
                icon: <CustomerSupport size="12px" />,
                component: <Profile />,
                noCollapse: true,
              },
              {
                type: "collapse",
                name: "Sign In",
                key: "sign-in",
                route: "/authentication/sign-in",
                icon: <Document size="12px" />,
                component: <SignIn />,
                noCollapse: true,
              },
              {
                type: "collapse",
                name: "Sign Up",
                key: "sign-up",
                route: "/authentication/sign-up",
                icon: <SpaceShip size="12px" />,
                component: <SignUp />,
                noCollapse: true,
              },
            ]}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        {getRoutes(routes.filter((route) => route.key !== "Web3 Jobs"))}
        <Route path="/web3-jobs" element={<Web3Jobs />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </ThemeProvider>
  );
}
