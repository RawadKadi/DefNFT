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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";

// Authentication layout components
import Footer from "layouts/authentication/components/Footer";
import logo from "../../../../assets/images/logos/logoStrive.png";
function CoverLayout({ color, header, title, description, image, top, children }) {
  return (
    <PageLayout background="white">
      {/* <DefaultNavbar
        action={{
          type: "external",
          route: "https://creative-tim.com/product/soft-ui-dashboard-react",
          label: "free download",
          color: "dark",
        }}
      /> */}
      <Grid
        container
        justifyContent="center"
        sx={{
          hiehgt: "200px",
          margin: 0,
        }}
      >
        <Grid item xs={11} sm={8} md={5} xl={3}>
          <SoftBox mt={2}>
            <SoftBox pt={3} px={3}>
              {!header ? (
                <>
                  <SoftBox mb={1} mt={20}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={2} sm={3} md={3}>
                        <SoftBox>
                          <img
                            src={logo}
                            style={{ width: "5vw", objectFit: "cover" }}
                            alt="Logo"
                          />
                        </SoftBox>
                      </Grid>
                      <Grid item xs={10} sm={9} md={9}>
                        <SoftBox>
                          <SoftTypography
                            variant="h3"
                            fontWeight="bold"
                            color="#1b1774"
                            textGradient
                          >
                            {title}
                          </SoftTypography>
                        </SoftBox>
                        <SoftBox>
                          <SoftTypography variant="h3" fontWeight="bold" color={color} textGradient>
                            Strive
                          </SoftTypography>
                        </SoftBox>
                      </Grid>
                    </Grid>
                  </SoftBox>
                  <SoftTypography variant="body2" fontWeight="regular" color="text">
                    {description}
                  </SoftTypography>
                </>
              ) : (
                header
              )}
            </SoftBox>
            <SoftBox p={3}>{children}</SoftBox>
          </SoftBox>
        </Grid>
        <Grid item xs={12} md={5}>
          <SoftBox
            height="100%"
            display={{ xs: "none", md: "block" }}
            position="relative"
            right={{ md: "-12rem", xl: "-16rem" }}
            mr={-16}
            sx={{
              transform: "skewX(-10deg)",
              overflow: "hidden",
              borderBottomLeftRadius: ({ borders: { borderRadius } }) => borderRadius.lg,
            }}
          >
            <SoftBox
              ml={-8}
              height="100%"
              sx={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                transform: "skewX(10deg)",
              }}
            />
          </SoftBox>
        </Grid>
      </Grid>
      {/* <Footer /> */}
    </PageLayout>
  );
}

// Setting default values for the props of CoverLayout
CoverLayout.defaultProps = {
  header: "",
  title: "",
  description: "",
  color: "info",
  top: 20,
};

// Typechecking props for the CoverLayout
CoverLayout.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  header: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  top: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default CoverLayout;
