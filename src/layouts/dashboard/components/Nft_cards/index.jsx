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
import React, { useState } from "react";
//react-icons/ai
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import Image from "next/image";
import { Link } from 'react-router-dom';
// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Button } from '@material-ui/core';

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useNavigate } from 'react-router-dom';
// Images
import wavesWhite from "assets/images/shapes/waves-white.svg";
import rocketWhite from "assets/images/illustrations/rocket-white.png";
import nft from "assets/images/small-logos/nft-image.jpg";
import Style from "../Nft_cards/NFTCard.module.css";
import NFTCardDetail from "../NFTDetails/NFTCardDetail";
export const NFTList=({ cards }) => {
  
  return (
    <div className="nft-cards">
      {cards.map((card) => (
        <NFTCard key={card} {...card} />
      ))}
    </div>
  );
}
  const NFTCard = (props) => {
  const image = props.image;
  const title = props.title;
  const description = props.description;
  const date = props.date;
  const id = props.id;
  
  const [first, setfirst] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [like, setLike] = useState(0);

  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  function handleReadMoreClick() {
    setShowDetails(true);
    console.log({id})
    navigate(`/${id}`);
  }
  


  const likeNft = () => {
    if (!like) {
      setLike(true);
    } else {
      setLike(false);
    }
  };

  return (

    <div className={Style.NFTCard}>
      {!showDetails && (
        <div className={Style.NFTCard_box} >
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
            <div className={Style.NFTCard_box_update_left}>
              <div className={Style.NFTCard_box_update_left_like} onClick={() => setLike(like===0 ? 1 : 0)}>
                {like===0 ? (
                  <AiOutlineHeart></AiOutlineHeart>
                ) : (
                  <AiFillHeart className={Style.NFTCard_box_update_left_like_icon}></AiFillHeart>
                )}
                {""} {like}
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
            <Button className={Style.readMore_btn} variant="outlined" onClick={handleReadMoreClick}>Read More</Button>
            
          </div>
          
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


