import React, { useEffect } from 'react';
import { Card, CardProps } from 'antd';
import { ArtContent } from '../ArtContent';
import {
  AuctionView,
  useArt,
  useAuction,
  useCreators,
  useExtendedArt,
} from '../../hooks';
import { AmountLabel } from '../AmountLabel';

import { useAuctionStatus } from './hooks/useAuctionStatus';
import { useTokenList } from '../../contexts/tokenList';
import { useMeta } from '@oyster/common';

export interface AuctionCard extends CardProps {
  auctionView: AuctionView;
}

export const AuctionRenderCard = (props: AuctionCard) => {
  console.log('AUCTION CARD==============');
  const { auctionView } = props;
  const id = auctionView.thumbnail.metadata.pubkey;
  const art = useArt(id);
  const auction = useAuction(auctionView.auction.pubkey);
  console.log('ID', auctionView.auction.pubkey);
  const { ref, data } = useExtendedArt(auction?.thumbnail.metadata.pubkey);
  const hasDescription = data === undefined || data.description === undefined;
  const description = data?.description;
  console.log('description', { description });
  const creators = useCreators(auctionView);
  const name = art?.title || ' ';
  const { pullAuctionPage } = useMeta();
  useEffect(() => {
    pullAuctionPage(auctionView.auction.pubkey);
  }, []);

  const tokenInfo = useTokenList().subscribedTokens.filter(
    m => m.address == auctionView.auction.info.tokenMint,
  )[0];
  const { status, amount } = useAuctionStatus(auctionView);

  const card = (
    <div className="dudes" ref={ref}>
      <div className="nft-img">
        <ArtContent
          className="auction-image no-events"
          preview={false}
          pubkey={id}
          allowMeshRender={false}
        />
      </div>
      <div className="nft-details">
        <h1>{name}</h1>
        <ul>
          <li>Exhibitions</li>
          <li>Movies</li>
          <li>Events</li>
        </ul>
        <p>
          {description || (
            <div style={{ fontStyle: 'italic' }}>No description provided.</div>
          )}
        </p>
        <div className="dudes">
          <div className="leftDiv no-mobile">
            <AmountLabel
              containerStyle={{ flexDirection: 'row' }}
              title={status}
              amount={amount}
              iconSize={24}
              tokenInfo={tokenInfo}
            />
          </div>
          <div className="leftDiv mobile">
            <AmountLabel
              containerStyle={{ flexDirection: 'row' }}
              title={status}
              amount={amount}
              iconSize={24}
              tokenInfo={tokenInfo}
            />
          </div>
          <div className="leftDiv tab-view">
            <AmountLabel
              containerStyle={{ flexDirection: 'row' }}
              title={status}
              amount={amount}
              iconSize={24}
              tokenInfo={tokenInfo}
            />
          </div>
          <div className="rightDiv">
            {status !== 'Sold Out' ? (
              <button type="submit" className="buy-land">
                BUY LAND
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
    // <Card hoverable={true} className={`auction-render-card`} bordered={false}>
    //   <div className={'card-art-info'}>
    //     <div className="auction-gray-wrapper">
    //       <div className={'card-artist-info'}>
    //         <MetaAvatar
    //           creators={creators.length ? [creators[0]] : undefined}
    //         />
    //         <span className={'artist-name'}>
    //           {creators[0]?.name ||
    //             creators[0]?.address?.substr(0, 6) ||
    //             'Go to auction'}
    //           ...
    //         </span>
    //       </div>
    //       <div className={'art-content-wrapper'}>
    //         <ArtContent
    //           className="auction-image no-events"
    //           preview={false}
    //           pubkey={id}
    //           allowMeshRender={false}
    //         />
    //       </div>
    //       <div className={'art-name'}>{name}</div>
    //       {!auctionView.isInstantSale && (
    //         <div className="auction-info-container">
    //           <div className={'info-message'}>ENDING IN</div>
    //           <AuctionCountdown auctionView={auctionView} labels={false} />
    //         </div>
    //       )}
    //     </div>
    //   </div>
    //   <div className="card-bid-info">
    //     <span className={'text-uppercase info-message'}>{status}</span>
    // <AmountLabel
    //   containerStyle={{ flexDirection: 'row' }}
    //   title={status}
    //   amount={amount}
    //   iconSize={24}
    //   tokenInfo={tokenInfo}
    // />
    //   </div>
    // </Card>
  );

  return card;
};
