import { useState } from "react";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import logo from "../../../assets/images/logos/logoStrive.png";
// react-router-dom components
// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUserId } from "user/currentUser.js";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
import axios from "axios";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import "../../authentication/sign-up/style.css";
// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

import { firestore } from "../../../firebase/config.js";
const db = getFirestore();
function SignUp() {
  const TermsAndConditionsText = `
  Welcome to Strive. If you continue to browse and use Strive, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern our relationship with you regarding this website. If you disagree with any part of these terms and conditions, please do not use our website.

  The term 'us' or 'we' refers to the owner of the website. The term 'you' refers to the user or viewer of our website.

  - The content of the pages of Strive is for your general information and use only. It is subject to change without notice.
  - Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness, or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors, and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
  - Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services, or information available through this website meet your specific requirements.
  - This website contains material that is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
  - All trademarks reproduced in this website, which is not the property of, or licensed to the operator, are acknowledged on the website.
  - Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.
  - From time to time, this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).
  - Your use of this website and any dispute arising out of such use of the website is subject to the laws of [Your Country/Region].

  By using our website, you signify your acceptance of these terms and conditions. If you have any questions about these terms and conditions, please contact us.
`;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const navigate = useNavigate();
  const auth = getAuth();
  const createUserDocument = async (userId, userData) => {
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, userData);
  };
  const isStrongPassword = (password) => {
    // Add your custom strong password validation logic here
    // Example: Minimum 7 characters with at least one special character
    const strongPasswordRegex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])\S{7,}$/;
    return strongPasswordRegex.test(password);
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!agreement) {
      setErrorMessage("Please agree to the terms and conditions");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    if (password.length < 7) {
      setErrorMessage("Password should be at least 7 characters long");
      return;
    }
    if (!isStrongPassword(password)) {
      const symbolList = "!@#$%^&*()_+-=[]{};:'\"\\|,.<>/?";
      const requiredSymbols = symbolList.split("").join(", ");
      setErrorMessage(`Please use one of these symbols: ${requiredSymbols}`);
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await updateProfile(user, { displayName: name }); // Set the user's displayName

      // Create the user document in Firestore
      const userData = {
        name,
        jobApplications: [],
        postedJobs: [],
        receivedApplications: [],
      };
      await createUserDocument(user.uid, userData);

      // const userDocRef = doc(db, "users", user.uid);
      // await setDoc(userDocRef, userData);

      navigate("/authentication/sign-in");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleAgreementChange = () => setAgreement(!agreement);
  const ConfirmPasswordInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-root": {
      borderColor: password !== confirmPassword ? theme.palette.error.main : "",
    },
  }));
  return (
    <BasicLayout
      title="Welcome to Strive!"
      description="Discover, Search and Apply"
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1}>
          <SoftBox display="flex" justifyContent="center" alignItems="center">
            <SoftBox sx={{ marginRight: "10px",marginTop:"3px" }} justifyContent="center">
              <img
                src={logo}
                style={{
                  width: "3vw",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></img>
            </SoftBox>
            <SoftBox >
              <SoftTypography variant="h3" fontWeight="medium">
                Register
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
        {/* <SoftBox mb={2}>
          <Socials />
        </SoftBox> */}
        {/* <Separator /> */}
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form" onSubmit={handleSignUp}>
            <SoftBox mb={2}>
              <SoftInput placeholder="Name" value={name} onChange={handleNameChange} />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={password !== confirmPassword ? "errorInput" : ""}
              />
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
              <Typography
                variant="h6"
                onClick={handleOpen}
                style={{ fontWeight: "bold", cursor: "pointer" }}
              >
                Terms and Conditions
              </Typography>
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
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle style={{ backgroundColor: "#0E023E", color: "#FFFFFF" }}>
                Terms and Conditions
              </DialogTitle>
              <DialogContent style={{ padding: "30px" }}>
                <DialogContentText>{TermsAndConditionsText}</DialogContentText>
              </DialogContent>
              <DialogActions style={{ backgroundColor: "#0E023E" }}>
                <Box display="flex" mb={1} mt={1}>
                  <Box display="flex" alignItems="center">
                    <Checkbox checked={agreement} onChange={handleAgreementChange} />
                    <Typography
                      variant="caption"
                      sx={{ color: "#FFFFFF" }}
                      fontWeight="bold"
                      textGradient
                    >
                      I Accept the Terms and Conditions
                    </Typography>
                  </Box>
                  <Box alignItems="center" ml={5} mr={3} display="flex">
                    <Button
                      onClick={handleClose}
                      style={{ color: "#000000", backgroundColor: "#FFFFFF" }}
                    >
                      Close
                    </Button>
                  </Box>
                </Box>
              </DialogActions>
            </Dialog>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
