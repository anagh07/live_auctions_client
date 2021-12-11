import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
// Styling
import './css/board.css';
// Actions
import { loadAds } from '../actions/ad';
// Components
import Spinner from './Spinner';
import Card from './Card';

const Board = (props) => {
  useEffect(() => {
    props.loadAds();
  }, []);

  // Check if user is logged
  if (!props.isAuth) {
    return <Navigate to='/login' />;
  }

  return props.loading ? (
    <Spinner />
  ) : (
    <div className='ad__board'>
      {props.ads.map((ad) => {
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
});

export default connect(mapStateToProps, { loadAds })(Board);
