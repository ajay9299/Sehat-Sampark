/* eslint-disable prettier/prettier */
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDInputRoot from "components/MDInput/MDInputRoot";

function Patient() {
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={4} pb={10} px={10}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="Enter Patient Id" fullWidth />
            </MDBox>

            <MDBox mt={4} mb={1} >
              <MDButton variant="gradient" color="info">
                Submit
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
        <Footer />
      </DashboardLayout>
      {/* <h1>Hello</h1> */}
    </>
  );
}

export default Patient;
