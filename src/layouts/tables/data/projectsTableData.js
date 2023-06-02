/* eslint-disable react/prop-types */
// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftProgress from "components/SoftProgress";
import opensea from "assets/images/marketplaces/opensea.png";
import Rarible from "assets/images/marketplaces/Rarible.png"
import niftygateway from "assets/images/marketplaces/niftygateway.png"
import magicEden from "assets/images/marketplaces/magicEden.jpg"

// Images
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoWebDev from "assets/images/small-logos/logo-webdev.svg";
import logoXD from "assets/images/small-logos/logo-xd.svg";

function Completion({ value, color }) {
  return (
    <SoftBox display="flex" alignItems="center">
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {value}%&nbsp;
      </SoftTypography>
      <SoftBox width="8rem">
        <SoftProgress value={value} color={color} variant="gradient" label={false} />
      </SoftBox>
    </SoftBox>
  );
}

const action = (
  <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
    more_vert
  </Icon>
);

const projectsTableData = {
  columns: [
    { name: "Marketplace", align: "left" },
    { name: "Trading_Volume", align: "left" },
    { name: "Total_NFT_Sales", align: "center" },
  ],

  rows: [
    {
      Marketplace: [opensea, "OpenSea"],
      Trading_Volume: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          $107 million
        </SoftTypography>
      ),

      Total_NFT_Sales: <Completion value={ 73.8} color="info" />,
    },
    {
      Marketplace: [Rarible, "Rarible"],
      Trading_Volume: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          $19.28{" "}
        </SoftTypography>
      ),

      Total_NFT_Sales: <Completion value={0.41} color="red" />,
    },
    {
      Marketplace: [niftygateway, "NiftyGateway"],
      Trading_Volume: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          $8.95 million
        </SoftTypography>
      ),
      
      Total_NFT_Sales: <Completion value={117} color="success" />,
      action,
    },
    {
      Marketplace: [magicEden, "Magic Eden"],
      Trading_Volume: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          104,820 SOL
        </SoftTypography>
      ),
      
      Total_NFT_Sales: <Completion value={69} color="medium" />,
      action,
    },
    
  ],
};

export default projectsTableData;
