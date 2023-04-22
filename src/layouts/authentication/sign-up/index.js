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

import { useState } from "react";

// react-router-dom components

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { Link, useNavigate } from "react-router-dom";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
import axios from "axios";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!agreement) {
      setErrorMessage("Please agree to the terms and conditions");
      return;
    }
    try {
      const response = await axios.post("http://localhost:4000/api/users/signup", {
        name,
        email,
        password,
      });
      console.log(response.data);
      navigate.push("/authentication/sign-in");
    } catch (error) {
      console.error(error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleAgreementChange = () => setAgreement(!agreement);

  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Register with
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <Socials />
        </SoftBox>
        <Separator />
        <SoftBox pt={2} pb={3} px={3}>
      <SoftBox component="form" role="form" onSubmit={handleSignUp}>
        <SoftBox mb={2}>
          <SoftInput placeholder="Name" value={name} onChange={handleNameChange} />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftInput type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftInput type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Checkbox checked={agreement} onChange={handleAgreementChange} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleAgreementChange}
            sx={{ cursor: "poiner", userSelect: "none" }}
          >
            &nbsp;&nbsp;I agree the&nbsp;
          </SoftTypography>
          <SoftTypography
            component="a"
            href="#"
            variant="button"
            fontWeight="bold"
            textGradient
          >
            Terms and Conditions
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton type="submit" variant="gradient" color="dark" fullWidth>
            sign up
          </SoftButton>
        </SoftBox>
        {errorMessage && (
          <SoftBox mt={2} mb={1} color="error.main">
            <SoftTypography variant="body2">{errorMessage}</SoftTypography>
          </SoftBox>
        )}
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Already have an account?&nbsp;
            <SoftTypography
              component={Link}
              to="/authentication/sign-in"
              variant="button"
              color="dark"
              fontWeight="bold"
              textGradient
            >
              Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
