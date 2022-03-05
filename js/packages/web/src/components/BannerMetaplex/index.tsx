import React from 'react';
import { useEffect } from 'react';

export const BannerMetaplex = (props: {
  src: string;
  useBannerBg: boolean;
  headingText: string;
  subHeadingText: string;
  actionComponent?: JSX.Element;
  children?: React.ReactNode;
}) => {
  useEffect(() => {
    const mainBg = document.getElementById('main-bg');
    const gradient = document.getElementById('bg-gradient');
    if (mainBg && props.useBannerBg) {
      mainBg.style.backgroundImage = `url(${props.src})`;
      mainBg.style.display = 'inline-block';
      if (gradient) {
        gradient.style.display = 'inline-block';
      }
    }

    return () => {
      const mainBg = document.getElementById('main-bg');
      const gradient = document.getElementById('bg-gradient');
      if (mainBg && props.useBannerBg) {
        mainBg.style.backgroundImage = '';
        mainBg.style.display = 'none';
      }
      if (gradient) gradient.style.display = 'none';
    };
  }, [props.src, props.useBannerBg]);
  return (
    <>
      <section className="without" data-scroll data-scroll-speed="-10">
        <div className="video parallax">
          <div className="overlay top"></div>
          <div className="center top-center">
            <div className="top-center">
              <img src="/images/mainlogo.png" alt="" />
              <p>
                NFT LAND <span>Marketplace</span>
              </p>
            </div>
          </div>
          <img
            src="/imgg/marketplace-bg.png"
            alt=""
            width="100%"
            height="100%"
          />
        </div>
      </section>
    </>
  );
};
