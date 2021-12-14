import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
// Actions
import { loadAdDetails, loadHighestBid, placeBid, startAuction } from '../actions/ad';
import { setAlert } from '../actions/alert';
// MUI Components
import { Paper, Box, Typography, Divider, TextField, Button } from '@mui/material';
// Project components
import Alert from './Alert';
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
  bidButtonStyle,
} from './css/adStyles.js';
import { secondsToHms } from '../utils/secondsToHms';

const Ad = (props) => {
  const params = useParams();
  const [bidPrice, setBidPrice] = useState(0);
  const [bidButton, setBidButton] = useState(true);
  const [ownerAd, setOwnerAd] = useState(false);
  const [startButton, setStartButton] = useState(true);
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

  // Check if current user is the owner of ad
  useEffect(() => {
    if (props.adDetails.owner && props.auth.user) {
      if (props.adDetails.owner._id === props.auth.user._id) setOwnerAd(true);
      else setOwnerAd(false);
    }
    // Check start button
    if (!props.adDetails.auctionStarted && !props.adDetails.auctionEnded) {
      setStartButton(true);
    } else {
      setStartButton(false);
    }
  }, [
    props.adDetails.owner,
    props.auth.user,
    props.adDetails.auctionStarted,
    props.adDetails.auctionEnded,
  ]);

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

  const handleStartAuction = (e) => {
    e.preventDefault();
    props.startAuction(props.adDetails._id);
    props.setAlert('Auction started', 'success');
  };

  const getTimeRemaining = () => {
    return secondsToHms(props.adDetails.timer);
  };

  // Auction status based on the ad-details
  const auctionStatus = () => {
    if (props.adDetails.auctionEnded) {
      return 'Sold';
    } else if (!props.adDetails.auctionStarted) {
      return 'Upcoming';
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
                <Typography variant='body2'>{props.adDetails.description}</Typography>
                <Divider variant='middle' sx={{ margin: '.5rem' }} />

                <Typography variant='h6'>Auction</Typography>
                <Typography variant='body1'>
                  Seller: {props.adDetails.owner.username}
                </Typography>
                <Typography variant='body1'>
                  Base price: {props.adDetails.basePrice.$numberDecimal}
                </Typography>
                <Typography variant='body1'>
                  Bids: {props.adDetails.bids.length}
                </Typography>
                <Typography variant='body1'>Status: {auctionStatus()}</Typography>
                <Divider variant='middle' sx={{ margin: '.5rem' }} />

                <Typography variant='body1'>
                  Time remaining: {getTimeRemaining()}
                </Typography>
                <Typography variant='body1'>
                  Current price: ${props.adDetails.currentPrice.$numberDecimal}
                </Typography>
                <Typography variant='body1'>
                  Current bidder: {props.highestBid && props.highestBid.user.username}
                </Typography>
                <Divider variant='middle' sx={{ margin: '.5rem' }} />

                {!ownerAd && (
                  <Box sx={bidContainer}>
                    <TextField
                      label='$'
                      id='bid-price'
                      size='small'
                      onChange={(e) => {
                        handleBidPriceChange(e);
                      }}
                    />
                    <Box sx={{ height: 'auto' }}>
                      <Button
                        variant='contained'
                        disabled={bidButton}
                        onClick={(e) => handleSubmitBid(e)}
                        sx={bidButtonStyle}
                      >
                        Place bid
                      </Button>
                    </Box>
                  </Box>
                )}

                {ownerAd && (
                  <Box sx={bidContainer}>
                    <Box sx={{ height: 'auto' }}>
                      <Button
                        variant='contained'
                        disabled={!startButton}
                        onClick={(e) => handleStartAuction(e)}
                        sx={bidButtonStyle}
                      >
                        Start Auction
                      </Button>
                    </Box>
                  </Box>
                )}
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
  auth: state.auth,
});

export default connect(mapStateToProps, {
  loadAdDetails,
  loadHighestBid,
  placeBid,
  startAuction,
  setAlert,
})(Ad);
