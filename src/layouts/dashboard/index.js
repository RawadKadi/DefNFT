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

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReactDOM from 'react-dom'; 

import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import {NFTCard} from "layouts/dashboard/components/Nft_cards";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";

import NFT3 from "../../assets/images/NFT's/nft3.jpg";
import NFT2 from "../../assets/images/NFT's/nft2.jpg";
import NFT4 from "../../assets/images/NFT's/nft4.jpg";
import NFTList from "../dashboard/components/Nft_cards/index"
function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const cards = [
    {
      id:1,
      image: NFT3,
      title: "Agent1- Morphing NFTs- Mint Now",
      description: "About Lady Lips Drop I’m Lady Lips, a very rich and charming woman. I made a fortune at a young age and can buy half",
      date: "Dec 26, 2022 – Jan 02, 2023"
    },
    {
      id:2,
      image: NFT2,
      title: "CapyMagi NFT Free Mint",
      description: "From the NFT collection to metaverse avatars to real-world items and cartoons available to children worldwide. We want to introduce the metaverse to the world and show its advantages. We...",
      date: "Dec 26, 2022 – Jan 02, 2023"
    },
    {
      id:3,
      image: NFT4,
      title: "Fat Hamster Club - Free Mint",
      description: "Chinis is a collection of 22,222 NFT's, accelerating Web3 Trough IP utilizataion and community empowerment.Embodying love, empathy, & compassion, the Chinis are a beacon of good & positivity for...",
      date: "Dec 26, 2022 – Jan 02, 2023"
    }
    // Add more cards here
  ];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              
              <NFTList cards={cards}/>
              
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <h1>News and stories</h1>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <BuildByDevelopers />
            </Grid>
            <Grid item xs={12} lg={5}>
              <WorkWithTheRockets />
            </Grid>
          </Grid>
        </SoftBox>
        {/* <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="active users"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Sales Overview"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      4% more{" "}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="15.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid>
        </SoftBox> */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
