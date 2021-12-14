import * as React from 'react';
import { connect } from 'react-redux';
import Card from '@mui/material/Card';
import { Link, Navigate } from 'react-router-dom';
// Actions
import { loadAdDetails } from '../actions/ad';
// MUI Components
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// Files
import imagePlaceholder from '../images/no-image-icon.png';
import { adArea } from './css/adStyles';
import { secondsToHmsShort } from '../utils/secondsToHms';

function MediaCard(props) {
  const handleCardClick = (e) => {
    props.loadAdDetails(props.ad._id);
  };

  // Auction status based on the ad-details
  const auctionStatus = (ad) => {
    if (ad.auctionEnded) {
      return 'Sold';
    } else if (!ad.auctionStarted) {
      return 'Upcoming';
    } else {
      return 'Ongoing';
    }
  };

  return (
    <Link
      onClick={(e) => {
        handleCardClick(e);
      }}
      to={`/ads/${props.ad._id}`}
      style={{ textDecoration: 'none' }}
    >
      <Card style={{ width: 240, height: 330 }}>
        <CardActionArea>
          <CardMedia
            component='img'
            height='180'
            src={props.ad.image ? props.ad.image : imagePlaceholder}
            alt='green iguana'
          />
          <CardContent>
            <Typography gutterBottom variant='h6' component='div'>
              {props.ad.productName}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Price: $ {props.ad.currentPrice.$numberDecimal}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Remaining: {secondsToHmsShort(props.ad.timer)}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Status: {auctionStatus(props.ad)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

const mapStateToProps = (state) => ({
  adDetails: state.ad.adDetails,
});

export default connect(mapStateToProps, { loadAdDetails })(MediaCard);
