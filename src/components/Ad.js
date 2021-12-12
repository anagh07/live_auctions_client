import React, { useEffect, useState } from 'react';
import { useSelector, connect } from 'react-redux';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
// Actions
import { loadAdDetails, loadHighestBid, placeBid } from '../actions/ad';
import { setAlert } from '../actions/alert';
// MUI Components
import { Paper, Box, Typography, Divider, TextField, Button } from '@mui/material';
// Project components
import Alert from './Alert';
import Nav from './Nav';
import Spinner from './Spinner';
import imagePlaceholder from '../images/no-image-icon.png';

import {
  boxStyle,
  adArea,
  imageStyle,
  paperStyle,
  descriptionArea,
  imageContainer,
  bidContainer,
} from './css/adStyles.js';

const Ad = (props) => {
  const params = useParams();
  const [bidPrice, setBidPrice] = useState(0);
  const [bidButton, setBidButton] = useState(true);
  const navigate = useNavigate();

  // Bid button status
  const updateBidButtonStatus = (updatedPrice) => {
    if (
      updatedPrice > Number(props.adDetails.currentPrice.$numberDecimal) &&
      props.adDetails.auctionStarted &&
      !props.adDetails.auctionEnded
    ) {
      setBidButton(false);
    } else {
      setBidButton(true);
    }
  };

  useEffect(() => {
    props.loadAdDetails(params.adId);
  }, [params.adId]);

  useEffect(() => {
    props.loadHighestBid(params.adId);
  }, []);

  useEffect(() => {
    updateBidButtonStatus(bidPrice);
  }, [bidPrice]);

  if (props.authLoading) {
    return <Spinner />;
  }

  // Check if user is logged
  if (!props.isAuth) {
    navigate('/login');
  }

  if (props.loading || props.loadingHighestBid) {
    console.log('loading');
    return <Spinner />;
  }

  const handleBidPriceChange = (e) => {
    setBidPrice(e.target.value);
  };

  const handleSubmitBid = (e) => {
    e.preventDefault();
    // Place bid
    props.placeBid(props.adDetails._id, bidPrice);
  };

  // Auction status based on the ad-details
  const auctionStatus = () => {
    if (props.adDetails.auctionEnded) {
      return 'Sold';
    } else if (!props.adDetails.auctionStarted) {
      return 'Pending';
    } else {
      return 'Ongoing';
    }
  };

  return props.loading ? (
    <Spinner />
  ) : (
    <div className='ad__page'>
      {/* <div className='nav__display'>
        <Nav />
      </div> */}
      <Alert />
      {!props.adDetails.owner ? (
        <Spinner />
      ) : (
        <Box sx={boxStyle}>
          <Paper sx={paperStyle}>
            <Typography variant='h4'>{props.adDetails.productName}</Typography>
            <Box sx={adArea}>
              <Box sx={imageContainer}>
                <img
                  src={props.adDetails.image ? props.adDetails.image : imagePlaceholder}
                  alt={props.adDetails.productName}
                  style={imageStyle}
                />
              </Box>
              <Box sx={descriptionArea}>
                <Typography variant='h6'>Description</Typography>
                <Typography variant='body2'>
                  Product description text goes here.
                </Typography>
                <Divider variant='middle' sx={{ margin: '.5rem' }} />

                <Typography variant='h6'>Auction</Typography>
                <Typography variant='body2'>
                  Seller: {props.adDetails.owner.username}
                </Typography>
                <Typography variant='body2'>
                  Base price: {props.adDetails.basePrice.$numberDecimal}
                </Typography>
                <Typography variant='body2'>
                  Bids: {props.adDetails.bids.length}
                </Typography>
                <Typography variant='body2'>Status: {auctionStatus()}</Typography>
                <Divider variant='middle' sx={{ margin: '.5rem' }} />

                <Typography variant='body1'>
                  Time remaining: {props.adDetails.timer}
                </Typography>
                <Typography variant='body1'>
                  Current price: ${props.adDetails.currentPrice.$numberDecimal}
                </Typography>
                <Typography variant='body1'>
                  Current bidder: {props.highestBid && props.highestBid.user.username}
                </Typography>
                <Divider variant='middle' sx={{ margin: '.5rem' }} />

                <Box sx={bidContainer}>
                  <TextField
                    label='$'
                    id='bid-price'
                    size='small'
                    onChange={(e) => {
                      handleBidPriceChange(e);
                    }}
                  />
                  <Button
                    variant='contained'
                    disabled={bidButton}
                    onClick={(e) => handleSubmitBid(e)}
                  >
                    Place bid
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  adDetails: state.ad.adDetails,
  loading: state.ad.loading,
  authLoading: state.auth.loading,
  isAuth: state.auth.isAuthenticated,
  alerts: state.alert,
  highestBid: state.ad.highestBid,
  loadingBid: state.ad.loadingHighestBid,
});

export default connect(mapStateToProps, { loadAdDetails, loadHighestBid, placeBid })(Ad);
