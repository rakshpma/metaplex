import React from 'react';
import { Layout } from 'antd';

import { AppBar } from '../AppBar';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Footer } from '../Footer';

const { Header, Content } = Layout;

export const AppLayout = React.memo(function AppLayoutImpl(props: any) {
  return (
    <>
      <html lang="en">
        <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>
            Metamall is the world's first virtual reality (VR) experience on the
            blockchain | Shop, Meet, Play, Win
          </title>
          <meta
            name="description"
            content="virtual reality game, blockchain, play to earn, vr games ido, vr game tokens, vr games ico"
          />
          <meta
            name="keywords"
            content="Metamallers can have their own high street, lounges and game zones. Users can organise, host and win competitions on the Metamall as well as shop, meet and engage with friends."
          />
          <link
            rel="shortcut icon"
            href="./imgg/metafav.png"
            type="image/x-icon"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          {/* <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Philosopher:wght@400;700&display=swap" rel="stylesheet"/> */}
          <link rel="stylesheet" href="loco.css" />
          <link rel="stylesheet" href="yeah.css" />
          <script
            type="text/javascript"
            src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"
          ></script>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.css"
          />
          <title>METAMALL</title>
        </head>

        <body id="marketplace">
          <div className="container">
            <div
              className="nav"
              data-scroll
              data-scroll-sticky
              data-scroll-target="body"
            >
              <div className="left no-mobile">
                {/* <p><a href="https://drive.google.com/file/d/1cpx76F_F9buWIr_3L8jrEXZfyhTs5PlY/view" target="_blank" style="color:white;text-decoration: none;">WHITEPAPER</a></p> */}
                <p>TEAM</p>
                {/* <p><a href="landsale.html" target="_blank" style="color:white;text-decoration: none;">LAND SALE</a></p>
            <p><a href="marketplace.html" target="_blank" style="color:white;text-decoration: none;">MARKETPLACE</a></p> */}
              </div>
              <div className="logo">
                <img src="./images/logo.png" alt="" />
              </div>
              <div className="right no-mobile">
                <img src="./imgg/twitter.svg" alt="" />
                <img src="./imgg/instagram.svg" alt="" />
                <img src="./imgg/telegram.svg" alt="" />
              </div>
            </div>
            <div
              className="burger mobile"
              data-scroll
              data-scroll-sticky
              data-scroll-target="body"
            >
              <div className="nline"></div>
              <div className="nline"></div>
            </div>
            <div
              className="mob-nav mobile grid"
              data-scroll
              data-scroll-sticky
              data-scroll-target="body"
            >
              <div className="links">
                {/* <button onclick="document.querySelector('.without').scrollIntoView({behavior: 'smooth'})">HOME</button>
                    <button onclick="document.querySelector('#team').scrollIntoView({behavior: 'smooth'})">TEAM</button>
                    <button onclick="window.location.href='landsale.html';">LAND SALE</button> */}
                <button>MARKETPLACE</button>
                <button>WHITEPAPER</button>
                <button>CONTACT US</button>
              </div>
              <div className="socials">
                <img src="./imgg/twitter.svg" alt="" />
                <img src="./imgg/instagram.svg" alt="" />
                <img src="./imgg/telegram.svg" alt="" />
              </div>
            </div>
            <section
              className="without"
              data-scroll
              data-scroll-speed="-10"
              style={{ height: '50vh' }}
            >
              <div className="video parallax">
                <div className="overlay top"></div>

                <div className="center top-center">
                  <div className="top-center">
                    <img src="./images/mainlogo.png" alt="" />
                    <p>
                      NFT LAND <span>Marketplace</span>
                    </p>
                  </div>
                </div>
                <img
                  src="./imgg/marketplace-bg.png"
                  alt=""
                  width="100%"
                  height="100%"
                />
              </div>
            </section>

            <div className="yeah">
              <div className="left-line liner">
                <div className="block left-block"></div>
              </div>
              <div className="content-container">
                <section className="tabs-section">
                  <div className="centered">
                    <div className="tab">
                      <button className="tablinks active">Items</button>
                      <button className="tablinks">Activity</button>
                    </div>
                  </div>
                  {/* <Layout id={'main-layout'}>
        <span id={'main-bg'}></span>
        <span id={'bg-gradient'}></span>
        <span id={'static-header-gradient'}></span>
        <span id={'static-end-gradient'}></span> */}
                  {/* <Header className="App-Bar">
          <AppBar />
        </Header> */}
                  {/* <Layout id={'width-layout'}> */}
                  <Content
                  // style={{
                  //   overflow: 'scroll',
                  //   padding: '30px 48px ',
                  // }}
                  >
                    {props.children}
                  </Content>
                  {/* </Layout> */}
                  {/*<Footer />*/}
                  {/* </Layout> */}

                  <div id="Activity" className="tabcontent"></div>
                </section>
              </div>
            </div>
          </div>
        </body>
      </html>
    </>
  );
});
