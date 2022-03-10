import { Link } from 'react-router-dom';
import React, { useMemo, useState } from 'react';

import { useMeta } from '../../../../contexts';
import { CardLoader } from '../../../../components/MyLoader';

import { useAuctionsList } from './hooks/useAuctionsList';
import { AuctionRenderCard } from '../../../../components/AuctionRenderCard';

export enum LiveAuctionViewState {
  All = '0',
  Participated = '1',
  Ended = '2',
  Resale = '3',
  Own = '4',
}

export const SalesListView = (props: { collectionMintFilter?: string }) => {
  const [activeKey, setActiveKey] = useState(LiveAuctionViewState.All);
  const { isLoading } = useMeta();
  const { auctions, hasResaleAuctions } = useAuctionsList(activeKey);

  const filteredAuctions = useMemo(() => {
    if (props.collectionMintFilter) {
      return auctions.filter(
        auction =>
          auction.thumbnail.metadata.info.collection?.key ===
          props.collectionMintFilter,
      );
    }
    return auctions;
  }, [auctions, props.collectionMintFilter]);

  return (
    <>
      <div id="Items" className="tabcontent">
        <div className="dudes">
          <button type="button" className="refreshbtn">
            <img src="./imgg/rotate-cw.png" alt="" />
          </button>
          <input
            className="nosubmit"
            type="search"
            placeholder="Search for NFTs..."
          />
          <div className="custom-select">
            <select>
              <option value="0">Recent</option>
              <option value="1">Sort by abc</option>
              <option value="2">High to low</option>
              <option value="3">Low to high</option>
            </select>
          </div>
        </div>
        {isLoading && [...Array(10)].map((_, idx) => <CardLoader key={idx} />)}
        {!isLoading &&
          filteredAuctions.map(auction => (
            <Link
              key={auction.auction.pubkey}
              to={`/auctionMetaplex/${auction.auction.pubkey}`}
            >
              <div className="nft-list">
                <AuctionRenderCard auctionView={auction} />
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};
