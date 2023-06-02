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
import ReactDOM from "react-dom";
import nft from "../../assets/images/NFT's/nft1.jpg";



import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import { NFTCard } from "layouts/dashboard/components/Nft_cards";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";

import NFT3 from "../../assets/images/NFT's/nft3.jpg";
import NFT2 from "../../assets/images/NFT's/nft2.jpg";
import NFT4 from "../../assets/images/NFT's/nft4.jpg";
import NFTList from "../dashboard/components/Nft_cards/index";
function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const cards = [
    {
      id: 1,
      image: `https://nftcalendar.io/storage/uploads/events/2023/4/AFHYjN9hJJOXPtLxycuFho5S9hpxWiw7c7O8Thdq.jpg`,
      title: "Laugh Out Labs: Itsjustajoke",
      date: "May 15, 2023 – May 15, 2023",

      description: `Get ready to chuckle, chortle, and guffaw as Laugh Out Labs LLC brings the funny to the blockchain with "It's Just a Joke," the first-ever NFT joke card collection, set to drop on May 15th, 2023. This rib-tickling collection combines the worlds of comedy and cryptocurrency, proving that...`,
      fullDescription: `Get ready to chuckle, chortle, and guffaw as Laugh Out Labs LLC brings the funny to the blockchain with "It's Just a Joke," the first-ever NFT joke card collection, set to drop on May 15th, 2023. This rib-tickling collection combines the worlds of comedy and cryptocurrency, proving that laughter truly is the best (digital) currency.

      In a world where "cryptocurrency" sounds like something Batman would use, 52 joke cards await to make comedy enthusiasts and NFT collectors giggle with glee. Each card showcases the comedic stylings of top comedians who have worked on Emmy Award-winning shows across networks like HBO, Comedy Central, ABC, MTV, truTV, Showtime, FX, BET, Adult Swim, and FOX. We're not joking when we say this lineup is seriously funny.
      
      But why stop at laughter? Laugh Out Labs LLC is putting the "fun" in fundraising, as a portion of the proceeds from the 'Special Purpose' cards in the collection will be donated to charities and organizations that support causes such as mental health, environmental conservation, and social justice.`,
      website: "https://www.nftsareajoke.com/",
      twitter: "https://twitter.com/laughoutlabs",
      discord: "https://discord.com/invite/laughoutlabs",
      marketplace: "OpenSea",
      blockchain: "Etherium",
    },
    {
      id: 2,
      image: `https://nftcalendar.io/storage/uploads/events/2023/5/zkbaNgs5i4nHtTdcj9sDEMZDZe8C3ecpADt9hgY4.png`,
      title: "Addicted Monkeys",
      date: "May 10, 2023 – May 17, 2023",

      description: `From the dope brain of SpaghettiPunk, here are 10,000 randomly generated Addicted Monkeys who will stay on Bitcoin forever.`,
      fullDescription: `From the dope brain of SpaghettiPunk, here are 10,000 randomly generated Addicted Monkeys who will stay on Bitcoin forever.
      Aliens, Zombies, Ancient Golden Apes, Gorillas, Orangutans and many more, are here to exorcise every temptation and every human addiction and find redemption within the mainnet.
      Don't face your addictions alone: find your monkey, and be free.
      Be Spaghetto, Stay Punk!`,
      website: "https://spaghettipunk.com/",
      twitter: "https://twitter.com/spaghetti_punk",
      discord: "https://twitter.com/spaghetti_punk",
      marketplace: "Gamma",
      blockchain: "Bitcoin Ordinals",
    },
    {
      id: 3 ,
      image: `https://nftcalendar.io/storage/uploads/2023/05/02/z00tz-anchor-club-pu_5AUtQdQw2eiJggO5.jpg`,
      title: "z00tz Anchor Club",
      date: "May 11, 2023 – May 18, 2023",

      description: `Offering a public remint of 1249 z00tz Anchor Club...`,
      fullDescription: `Offering a public remint of 1249 z00tz Anchor Club.      `,
      website: "https://z00tzanchor.club/",
      twitter: "https://twitter.com/z00tzAnchorClub",
      discord: "https://discord.com/invite/z00tz",
      marketplace: "OpenSea",
      blockchain: "Etherium",
    },
    {
      id: 4 ,
      image: `https://nftcalendar.io/storage/uploads/events/2023/4/0N0KY6eMozZ3HXCiyPx10cyqJDuuWnMP0XZ9S6jv.webp`,
      title: "Aenigma Shards",
      date: "May 11, 2023 – May 18, 2023",

      description: `Aenigma Shards are mnemonic NFT puzzle pieces in geometric cryptograms. The objective is to tile a cryptogram, or Aenigma, while connecting a path that traverses the entire shape...`,
      fullDescription: `Aenigma Shards are mnemonic NFT puzzle pieces in geometric cryptograms. The objective is to tile a cryptogram, or Aenigma, while connecting a path that traverses the entire shape. Deciphering an Aenigma unlocks a digital wallet holding an NFT reward. Visit our website to learn more.`,
      website: "https://www.aenigmashards.com/",
      twitter: "https://twitter.com/AenigmaShards",
      discord: "https://discord.com/invite/n88JmHQGEs",
      marketplace: "NaN",
      blockchain: "Etherium",
    },
    {
      id: 5 ,
      image: `https://nftcalendar.io/storage/uploads/2023/04/20/sparkadia-ascended_UbbWA4vAp3fDvbLJ.gif`,
      title: "Sparkadia: Ascended Kana",
      date: "May 11, 2023 – May 18, 2023",

      description: `Sparkball is like League of Legends, Rocket League, and Super Smash Bros fusion danced while watching a Quidditch Match. It’s madcap mayhem with depth, strategy, and team spirit...`,
      fullDescription: `Sparkball

      Sparkball is like League of Legends, Rocket League, and Super Smash Bros fusion danced while watching a Quidditch Match. It’s madcap mayhem with depth, strategy, and team spirit... and a chicken wizard named Roostandor! It sees two teams square off in our Dunktown arena, where they’ll chase, capture, and pass a mysterious... Totally unnamed ball with the hopes of scoring the final goal!
      
      SPARKBALL! Say it out loud a couple times. You’re in an Arena surrounded by fans, chanting your name. You’re cooking up dishes, dropping toilet bombs, and using magic spray-paint to dip and dodge through the enemy team as you dash toward the goal. Sparkball!
      
      Sparkadia
      
      Sparkball is part of a larger universe called ‘Sparkadia’, an ecosystem of interconnected games all linked to the ‘Sparkadia’ IP, supported by transmedia elements such as books, anime, movies, and more. Our cozy-cosmic, optimistic world is ripe with incredibly fun characters you’re sure to love, and our first book, ‘GloKat and the Art of Timing’ is already out on Amazon!
      
      Ascended Kana Utility
      
      Ascended Kana is a ‘skin’, similar to your favorite League of Legends, Overwatch or Fortnite skins. As a ‘Cosmic’ tier skin, owning Ascended Kana will allow you to use the skin in-game, complete with new animations and VFX.
      
      Additionally, ownership of Ascended Kana will grant you one Early Access key for our upcoming EA weekend in late June. Details for how to redeem can be found at https://www.sparkadia.gg/
      
      (Note: Ascended Kana will not be available to use during Early Access weekend)`,
      website: "https://www.sparkadia.gg/",
      twitter: "https://twitter.com/SparkadiaGG",
      discord: "https://discord.com/invite/sparkadiagg",
      marketplace: "Magic Eden",
      blockchain: "Etherium",
    },
    {
      id: 6 ,
      image: `https://nftcalendar.io/storage/uploads/events/2023/5/NdLzKu46jYOrq06EkK0rrKtxx4OS7PqFlEfvkDL5.webp`,
      title: "YOTR Mint",
      date: "May 12, 2023 – May 19, 2023",

      description: `The Year of the Rabbit mint features some of the best art in the Solana space in a truly unique comic collector card style that serves to further the Knuckle Bunny lore. In addition, the collection contains numerous "Easter Eggs" which...`,
      fullDescription: `The Year of the Rabbit mint features some of the best art in the Solana space in a truly unique comic collector card style that serves to further the Knuckle Bunny lore. In addition, the collection contains numerous "Easter Eggs" which entitle the minter to a variety of potential additional prizes ranging from merch to NFTs as well as Solana prizes.

      The mint process will also be gamified even further, with secret hints hidden in the traits that will be part of a "Safe Cracker" mission - collect the clues, and be the first to crack the safe to win the entire contents of the safe. The Safe prize pool will be added to at various mint milestones as the mint progresses and will contain a minimum of 33 SOL worth of prizes in addition to the Easter Egg prizes!
      
      By holding a Year of the Rabbit NFT, you'll be part of an exclusive community focused on elevating art in the Solana space and building a unique entertainment franchise, unlike anything currently in web3. KBDS is more than just an NFT project. In addition to the NFT collections, holder airdrops, and comics, they also have a full merch line and brand that is being actively marketed to web2 and is supported by a full-service art studio offering art, design, and development services to the web3 space, with a portion of studio proceeds going to fund the community wallet.`,
      website: "https://knucklebunnydeathsquad.com/",
      twitter: "https://twitter.com/knucklebunnyds",
      discord: "https://discord.com/invite/kbds",
      marketplace: "Magic Eden",
      blockchain: "Solana",
    },
    {
      id: 7 ,
      image: `https://nftcalendar.io/storage/uploads/2023/05/04/project-thuggiez_61leBS5AfzqS9JZr.gif`,
      title: "Project Thuggiez",
      date: "May 12, 2023 – May 19, 2023",

      description: `Holding a Thuggie acts as your membership pass to the Thuggiez gang. Thuggiez can expect exclusive access to the Thuggiez indicators &...`,
      fullDescription: `Holding a Thuggie acts as your membership pass to the Thuggiez gang. Thuggiez can expect exclusive access to the Thuggiez indicators & future Thuggie sh*t!`,
      website: "https://thuggiez.io/",
      twitter: "https://twitter.com/ProjectThuggiez",
      discord: "https://discord.com/invite/RRHfu8ErwP",
      marketplace: "Magic Eden",
      blockchain: "Solana",
    },
    {
      id: 8 ,
      image: `https://nftcalendar.io/storage/uploads/events/2023/5/kylK4vXtnoeEY5EOMiPpgvFbygueH0MPeP9z5OV4.webp`,
      title: "House of Skulls",
      date: "May 13, 2023 – May 20, 2023",

      description: `The House of Skulls is a collection of 5,353 unique NFTs raised from the dead and is now living on the Polygon blockchain. Holders...`,
      fullDescription: `The House of Skulls is a collection of 5,353 unique NFTs raised from the dead and is now living on the Polygon blockchain. Holders will receive back 50% of the secondary market royalties and unlock access to exclusive games.`,
      website: "https://hos-nft.com/",
      twitter: "https://twitter.com/House_of_skull",
      discord: "https://discord.com/invite/7R7pkVwGQs",
      marketplace: "Opensea",
      blockchain: "polygon",
    },
    {
      id: 9 ,
      image: `https://nftcalendar.io/storage/uploads/events/2023/5/pjJUkqhcnPATRyj8xvxxJt0aMcHMWoWHd3cthanJ.gif`,
      title: "ApesOrigami",
      date: "May 13, 2023 – May 20, 2023",

      description: `Apes orgami is a species that is in danger of extinction. our task as a team committed to nature is nothing more and nothing less than saving them. our first ...`,
      fullDescription: `Apes orgami is a species that is in danger of extinction. our task as a team committed to nature is nothing more and nothing less than saving them. our first collection is intended to save the males of the species, then it will be the females and babies!!! It depends on this whole community that this beautiful species does not become extinct.

      Our brand wil be characterized mainly by benefiting its community, our vision is long-term and built on the Values of truth, tust and transparency. In our roadmap we will show all the benefits that our holders will have. We will not be the typical project that lies about staking system, liquidity pool, etc. We are not hypocrites, and wh think that the real value of our art will be given by its community and that will undoubtedly raise the price. If you what to be fooled for x number time by false roadmap don't mint our nfts. ApesOrigami is exclusive and unique, and its main characteristic wil be the TRUTH.`,
      website: "https://apesorigami.xyz/",
      twitter: "https://twitter.com/ApesOrigami",
      discord: "https://discord.com/invite/WVcE4WrATn",
      marketplace: "opensea",
      blockchain: "etherium",
    },
    {
      id: 10 ,
      image: `https://nftcalendar.io/storage/uploads/2023/05/07/legends-of-steady-st_rfOGNtADODZngAZm.gif`,
      title: "Legends of Steady Stack",
      date: "May 17, 2023 – May 24, 2023",

      description: `Leading lifestyle brand and innovator in technology is steady stack. Legends is a global network of the top businesspeople, investors, and builders...`,
      fullDescription: `Leading lifestyle brand and innovator in technology is steady stack. Legends is a global network of the top businesspeople, investors, and builders.`,
      website: "https://www.launchmynft.io/collections/8N9gLsAit5GGubuKMHTBtKh4GTCFfFKUBjUYJGaogZVt/oonsSohfVUwpcrPE3YmV",
      twitter: "https://twitter.com/Legends_Steady",
      discord: "https://discord.com/invite/jdfsifi03rfs",
      marketplace: "magic eden",
      blockchain: "solana",
    },
    // Add more cards here
  ];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <NFTList cards={cards} />
            </Grid>
          </Grid>
        </SoftBox>
        {/* <SoftBox mb={3}>
          <h1>News and stories</h1>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <BuildByDevelopers image={nft} />
            </Grid>
            <Grid item xs={12} lg={5}>
              <WorkWithTheRockets />
            </Grid>
          </Grid>
        </SoftBox> */}

        {/* <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid>
        </Grid> */}
      </SoftBox>
    </DashboardLayout>
  );
}

export default Dashboard;
