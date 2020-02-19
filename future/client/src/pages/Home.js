import React from 'react';
import Header from './components/Header';
import HomeComponent from './components/HomeComponent';
import Footer from './components/Footer';

function Home() {
  return (
    <div className="Home">
      <Header />
      <HomeComponent />
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
