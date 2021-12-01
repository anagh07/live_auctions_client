import React, { useEffect, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
// Styling
import './css/home.css';
// Actions
import { loadAds } from '../actions/ad';
// Components
import Nav from './Nav';
import Spinner from './Spinner';
import Card from './Card';

const Home = (props) => {
  useEffect(() => {
    console.log('useeffect');
    props.loadAds();
  }, []);

  // Check if user is logged
  if (!props.isAuth) {
    return <Navigate to='/login' />;
  }

  return props.loading ? (
    <Spinner />
  ) : (
    <div className='home'>
      <div className='nav__display'>
        <Nav />
      </div>
      <div className='ad__board'>
        {props.ads.map((ad) => {
          return ad.auctionEnded ? null : (
            <div className='ad__container'>
              <Card ad={ad} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ads: state.ad.ads,
  loading: state.auth.loading,
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loadAds })(Home);
