/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import Style from "../../tables/data/style.css"
// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { color } from "@mui/system";

function Author({ image, name, email }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="lg" variant="rounded" />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography>
      </SoftBox>
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

    { name: "action", align: "center" },
  ],

  rows: [
    {
      Marketplaces: <Author image={team2} name="OpenSea" />,

      action: (
        <SoftTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
          className={Style.events}
        >
          23839 events →
        </SoftTypography>
      ),
    },
    {
      Marketplaces: <Author image={team3} name="Rarible" />,

      action: (
        <SoftTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          912 events →
        </SoftTypography>
      ),
    },
    {
      Marketplaces: (
        <Author image={team4} name="Mintable" />
      ),

      action: (
        <SoftTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          905 events →
        </SoftTypography>
      ),
    },
    {
      Marketplaces: <Author image={team3} name="Solsea"  />,

      action: (
        <SoftTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
        362 events →
        </SoftTypography>
      ),
    },
    {
      Marketplaces: <Author image={team2} name="NiftyGateway" />,

      action: (
        <SoftTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          339 events →
        </SoftTypography>
      ),
    },
    {
      Marketplaces: <Author image={team4} name="MakersPlace"/>,

      action: (
        <SoftTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          271 events →
        </SoftTypography>
      ),
    },
  ],
};

export default authorsTableData;
