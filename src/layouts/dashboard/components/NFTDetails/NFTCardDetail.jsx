import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const NFTCardDetail= ()=> {
  const [nftCard, setNftCard] = useState({});

  useEffect(() => {
    // fetch the details of the NFT card with the specified ID
    axios.get(`/api/nft-cards/${props.id}`)
      .then(response => {
        // log the NFT card details to the console
        console.log(response.data);
        setNftCard(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [props.id]);

  return (
    <div className="nft-card-detail">
      <h2>{nft.title}</h2>
      <p>{nft.description}</p>
      <img src={nft.image} alt={nft.title} />
    </div>
  );
}
export default NFTCardDetail;
