import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Sound from 'react-sound';
import popSound from './popSound.mp3'; // replace this with your sound file path

//react-icons/ai
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import Image from "next/image";
import { Link } from "react-router-dom";
// @mui material components
import TwitterIcon from "@material-ui/icons/Twitter";
import LanguageIcon from "@material-ui/icons/Language";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Divider from "@material-ui/core/Divider";
import { Button } from "@material-ui/core";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  updateDoc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useNavigate } from "react-router-dom";
// Images
import wavesWhite from "assets/images/shapes/waves-white.svg";
import rocketWhite from "assets/images/illustrations/rocket-white.png";
import nft from "assets/images/small-logos/nft-image.jpg";
import Style from "../Nft_cards/NFTCard.module.css";
import NFTCardDetail from "../NFTDetails/NFTCardDetail";
import { Typography } from "@mui/material";
import { getCurrentUserId } from "../../../../user/currentUser.js";

import Drawer from "@mui/material/Drawer";

export const NFTList = ({ cards }) => {
  return (
    <div className="nft-cards">
      {cards.map((card) => (
        <NFTCard key={card.id} {...card} />
      ))}
    </div>
  );
};
const NFTCard = (props) => {
  const image = props.image;
  const db = getFirestore();

  const title = props.title;
  const description = props.description;
  const fullDescription = props.fullDescription;
  const date = props.date;
  const website = props.website;
  const twitter = props.twitter;
  const discord = props.discord;
  const marketplace = props.marketplace;
  const blockchain = props.blockchain;
  const userId = getCurrentUserId();
  const id = props.id;
  const [like, setLike] = useState(false);
  
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "likes", String(id)), (doc) => {
      if (doc.exists()) {
        console.log("Current like data: ", doc.data());
        setLike(doc.data().liked ? 1 : 0);
      } else {
        console.log("No such document!");
      }
    });

    // Clean up the listener when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, [db, id]);
  const [playStatus, setPlayStatus] = useState(Sound.status.STOPPED);
  const likeNft = async () => {
  try {
    const docRef = doc(db, "likes", String(id));
    const docSnapshot = await getDoc(docRef);
    if (!like) {
      setPlayStatus(Sound.status.PLAYING);
    }

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      await updateDoc(docRef, { liked: !data.liked });
      setLike(!data.liked);

      // Update the user's liked field in the users collection
      const userDocRef = doc(db, "users", userId); // Replace 'userId' with the actual user ID
      await updateDoc(userDocRef, { liked: !data.liked });
    } else {
      await setDoc(docRef, { liked: true });
      setLike(true);

      // Update the user's liked field in the users collection
      const userDocRef = doc(db, "users", userId); // Replace 'userId' with the actual user ID
      await updateDoc(userDocRef, { liked: true });
    }
    
  } catch (error) {
    console.error("Error updating like status:", error);
  }
};
  // ...
  const [first, setfirst] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleReadMoreClick = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const useStyles = makeStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",

      border: "2px solid #eee",
      borderRadius: 5,
      padding: 10,
      width: "auto",
    },
    layout: {
      border: "1px solid #1b1774",
      width: "40%",
      marginRight: "10px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 6,
      borderRadius: 5,
      marginTop: "20px",
    },

    layout2: {
      border: "1px solid #1b1774",
      padding: 10,

      width: "100%",
      borderRadius: 5,
      marginTop: "20px",
      marginRight: "40px",
    },
    logoButton: {
      padding: 7,
      paddingLeft: "20px",
      paddingRight: "20px",
      marginRight: 5,
      color: "black",
      backgroundColor: "transparent",
      border: "0.5px solid #1b1774",
      borderRadius: 5,
      color: "#000",
      "&:hover": {
        background: "#1b1774",
        color: "white",
        "& $icon": {
          color: "white",
        },
      },
    },
    icon: {
      fontSize: 30,
      color: "#1b1774", // Twitter blue
      marginRight: "5px",
    },
  });
  const classes = useStyles();
  return (
    <div className={Style.NFTCard}>
      <Sound
        url={popSound}
        playStatus={playStatus}
        onFinishedPlaying={() => setPlayStatus(Sound.status.STOPPED)}
      />
      {!showDetails && (
        <div className={Style.NFTCard_box}>
          {/* <div className={Style.NFTCard_box_description}>
            <p>hello how are you</p>
          </div> */}
          <div className={Style.NFTCard_box_img}>
            <img
              src={image}
              alt={title}
              width={600}
              height={600}
              className={Style.NFTCard_box_img_img}
            />
            <div className={Style.NFTCard_box_update}>
              <div className={Style.NFTCard_box_update_left} onClick={likeNft}>
                <div className={Style.NFTCard_box_update_left_like} >
                  {like === false ? (
                    <AiOutlineHeart></AiOutlineHeart>
                  ) : (
                    <AiFillHeart className={Style.NFTCard_box_update_left_like_icon}></AiFillHeart>
                  )}
                </div>
              </div>
              <div className={Style.NFTCard_box_update_right}>
                <div className={Style.NFTCard_box_update_right_info}>
                  <h4>{title}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className={Style.NFTCard_box_content}>
            <h3 className={Style.NFTCard_box_content_date}>{date}</h3>
            <p className={Style.NFTCard_box_content_description}>{description}</p>
            <Button className={Style.readMore_btn} variant="outlined" onClick={handleReadMoreClick}>
              Read More
            </Button>
          </div>
          <Drawer
            PaperProps={{
              style: { width: "62vw" },
            }}
            anchor="left"
            open={drawerOpen}
            onClose={handleDrawerClose}
          >
            <div>
              <div className={Style.drawerContent} style={{ width: "100%", padding: "30px" }}>
                <Grid container style={{ height: "30%" }}>
                  <Grid item xs={6}>
                    <div style={{display:"flex",flexDirection:"column"}}>
                    <img
                      src={image}
                      alt={title}
                      width={460}
                      height={460}
                      className={Style.NFTCard_box_img_img}
                    />
                    <div style={{ width:"18%"}}>
                    
                    <div className={Style.NFTCard_box_update_left} onClick={likeNft}>
                      <div className={Style.NFTCard_box_update_left_like} >
                        {like === false ? (
                          <AiOutlineHeart></AiOutlineHeart>
                        ) : (
                          <AiFillHeart
                            className={Style.NFTCard_box_update_left_like_icon}
                          ></AiFillHeart>
                        )}
                      </div>
                    </div>
                    </div>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className={classes.layout2}>
                      <div style={{ marginBottom: "30px" }}>
                        <Typography variant="h4" component="h2" gutterBottom>
                          {title}
                        </Typography>
                      </div>
                      <Typography variant="subtitle1" gutterBottom>
                        {date}
                      </Typography>
                      <Divider style={{ marginTop: "10px" }} />
                      <div style={{ marginTop: "20px" }}>
                        <Button className={classes.logoButton} href={website} target="_blank">
                          <LanguageIcon className={classes.icon} />
                          Website
                        </Button>
                        <Button className={classes.logoButton} href={twitter} target="_blank">
                          <TwitterIcon className={classes.icon} />
                          Twitter
                        </Button>
                        <Button className={classes.logoButton} href={discord} target="_blank">
                          {" "}
                          <FontAwesomeIcon icon={faDiscord} className={classes.icon} />
                          Discord
                        </Button>
                      </div>{" "}
                    </div>
                    <div style={{ display: "flex",cursor:"not-allowed" }} >
                      <div className={classes.layout}>
                        <Typography variant="h6" gutterBottom>
                          Marketplace:{" "}
                        </Typography>
                        <Button className={classes.logoButton}  target="_blank" style={{cursor:"not-allowed"}}>
                          {" "}
                          {marketplace}
                        </Button>
                      </div>
                      <div className={classes.layout}>
                        <Typography variant="h6" gutterBottom>
                          Blockchain:{" "}
                        </Typography>
                        <Button className={classes.logoButton}  target="_blank" style={{cursor:"not-allowed"}}>
                          {" "}
                          {blockchain}
                        </Button>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>
              <Divider />
              <Grid container>
                <Grid item xs={12}>
                  <div style={{ padding: 25 }}>
                    <p
                      className={
                        Style.NFTCard_box_content_description + " " + Style.drawer_description
                      }
                    >
                      {fullDescription}
                    </p>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Drawer>
        </div>
      )}

      {showDetails && (
        <div className="nft-card-details">
          <p>{title}</p>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};
export default NFTList;
