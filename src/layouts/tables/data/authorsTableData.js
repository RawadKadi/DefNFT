/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import Style from "../../tables/data/style.css"
// Images
import opensea from "assets/images/marketplaces/opensea.png"
import Rarible from "assets/images/marketplaces/Rarible.png"
import mintable from "assets/images/marketplaces/mintable.png"
import solsea from "assets/images/marketplaces/solsea.png"
import niftygateway from "assets/images/marketplaces/niftygateway.png"
import gamma from "assets/images/marketplaces/gamma.jpg"
import magicEden from "assets/images/marketplaces/magicEden.jpg"



import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { color } from "@mui/system";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  author: {
    cursor: "pointer",
    transition:"0.5s",
    borderRadius:"20px",

    '&:hover': {
      backgroundColor: "#1b1774",
      color: "white",
      borderRadius:"20px",
      transition:"0.2s"
    },
  },
});
function Author({ image, name, email,link }) {
  const classes = useStyles();
  const handleClick = () => {
    window.open(link, "_blank");
  };
  return (
    <SoftBox
      display="flex"
      alignItems="center"
      px={1}
      py={0.5}
      className={classes.author}
      onClick={handleClick}
      wdith="150vw"
    >
      <SoftBox mr={2}>
        <SoftAvatar
          src={image}
          alt={name}
          size="lg"
          variant="rounded"
          style={{ width: 80, height: 80 }}
        />
      </SoftBox>
      <div>
        <div className="author-name" style={{ fontSize: "25px", fontWeight: "10px" }}>
          {name}
        </div>
        <div className="author-email" style={{ fontSize: "caption", color: "secondary" }}>
          {email}
        </div>
      </div>
    </SoftBox>
  );
}

function Function({ job, org }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {job}
      </SoftTypography>
      <SoftTypography variant="caption" color="secondary">
        {org}
      </SoftTypography>
    </SoftBox>
  );
}

const authorsTableData = {
  columns: [
    { name: "Marketplaces", align: "left" },

    { name: "Site", align: "center" },
  ],

  rows: [
    {
      Marketplaces: <Author image={opensea} name="OpenSea" link="https://opensea.io/" />,

      Site: (
        <SoftTypography
          component="a"
          href="https://opensea.io/"
          variant="caption"
          color="secondary"
          fontWeight="medium"
          className={Style.events}
        >
          Visit OpenSea Marketplace →
        </SoftTypography>
      ),
    },
    {
      Marketplaces: <Author image={Rarible} name="Rarible" link="https://rarible.com/" />,

      Site: (
        <SoftTypography
          component="a"
          href="https://rarible.com/"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Visit Rarible Marketplace →
        </SoftTypography>
      ),
    },
    {
      Marketplaces: (
        <Author image={mintable} name="Mintable" link="https://mintable.app/" />
      ),

      Site: (
        <SoftTypography
          component="a"
          href="https://mintable.app/"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Visit Mintable Marketplace →
        </SoftTypography>
      ),
    },
    {
      Marketplaces: <Author image={solsea} name="Solsea" link="https://solsea.io/" />,

      Site: (
        <SoftTypography
          component="a"
          href="https://solsea.io/"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Visit Solsea Marketplace →
        </SoftTypography>
      ),
    },
    {
      Marketplaces: <Author image={niftygateway} name="NiftyGateway" link="https://www.niftygateway.com/" />,

      Site: (
        <SoftTypography
          component="a"
          href="https://www.niftygateway.com/"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Visit NiftyGateway Marketplace →
        </SoftTypography>
      ),
    },
    {
      Marketplaces: <Author image={gamma} name="Gamma" link="https://gamma.io/marketplace" />,

      Site: (
        <SoftTypography
          component="a"
          href="https://gamma.io/marketplace"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Visit Gamma Marketplace →
        </SoftTypography>
      ),
    },
    {
      Marketplaces: <Author image={magicEden} name="Magic Eden" link="https://magiceden.io/"/>,

      Site: (
        <SoftTypography
          component="a"
          href="https://magiceden.io/"
          variant="caption"
          color="secondary"
          fontWeight="medium"
          className=""
        >
          Visit Magic Eden Marketplace →
        </SoftTypography>
      ),
    },
  ],
};

export default authorsTableData;
