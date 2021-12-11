import React, { useEffect, useState } from 'react';
import { useSelector, connect } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
// Actions
import { loadAdDetails } from '../actions/ad';
import Alert from './Alert';
// MUI Components
import { Paper, Box, Typography, Divider, TextField, Button } from '@mui/material';
// Project components
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

  useEffect(async () => {
    await props.loadAdDetails(params.adId);
  }, []);

  const handleBidPriceChange = (e) => {
    setBidPrice(e.target.value);
    setBidPrice((bidPrice) => {
      updateBidButtonStatus(bidPrice);
    });
  };

  const handleSubmitBid = (e) => {
    // place bid action
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

  // Bid button status
  const updateBidButtonStatus = (updatedPrice) => {
    if (
      updatedPrice >= Number(props.adDetails.currentPrice.$numberDecimal) &&
      props.adDetails.auctionStarted &&
      !props.adDetails.auctionEnded
    ) {
      setBidButton(false);
    }
  };

  if (props.authLoading) {
    return <Spinner />;
  }

  // Check if user is logged
  if (!props.isAuth) {
    return <Navigate to='/login' />;
  }

  return props.loading ? (
    <Spinner />
  ) : (
    <div className='ad__page'>
      <div className='nav__display'>
        <Nav />
      </div>
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
});

export default connect(mapStateToProps, { loadAdDetails })(Ad);
