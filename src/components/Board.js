import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import openSocket from 'socket.io-client';
// Styling
import './css/board.css';
// Actions
import { loadAds, adPostedByOther, updateAdInList } from '../actions/ad';
import { setAlert, clearAlerts } from '../actions/alert';
// Components
import Spinner from './Spinner';
import Card from './Card';

const Board = (props) => {
  useEffect(() => {
    if (props.passedUser) {
      props.loadAds(props.passedUser);
    } else {
      props.loadAds();
      const socket = openSocket(process.env.REACT_APP_API_BASE_URL);
      // when new ad is added
      socket.on('addAd', (data) => {
        console.log('add ad');
        if (data.ad.owner.toString() !== props.user._id.toString()) {
          props.clearAlerts();
          props.setAlert('New ads available', 'info');
        }
      });
      // when auction starts/ends
      socket.on('auctionStarted', (res) => {
        props.updateAdInList(res.data);
      });
      socket.on('auctionEnded', (res) => {
        props.updateAdInList(res.data);
      });
    }
  }, []);

  // Check if user is logged
  if (!props.isAuth) {
    return <Navigate to='/login' />;
  }

  return props.loading ? (
    <Spinner />
  ) : (
    <div className='ad__board'>
      {props.passedUser
        ? props.ads.map((ad) => {
            return (
              <div className='ad__container' key={ad._id}>
                <Card ad={ad} key={ad._id} />
              </div>
            );
          })
        : props.ads.map((ad) => {
            return ad.auctionEnded ? null : (
              <div className='ad__container' key={ad._id}>
                <Card ad={ad} key={ad._id} />
              </div>
            );
          })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ads: state.ad.ads,
  loading: state.auth.loading,
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  loadAds,
  adPostedByOther,
  setAlert,
  updateAdInList,
  clearAlerts,
})(Board);
