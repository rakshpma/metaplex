import { useWallet } from '@solana/wallet-adapter-react';
import { Col, Layout, Row, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import React, { useMemo, useState } from 'react';

import { useMeta } from '../../../../contexts';
import { CardLoader } from '../../../../components/MyLoader';
import { Banner } from '../../../../components/Banner';
import { HowToBuyModal } from '../../../../components/HowToBuyModal';

import { useAuctionsList } from './hooks/useAuctionsList';
import { AuctionRenderCard } from '../../../../components/AuctionRenderCard';
import { BannerMetaplex } from '../../../../components/BannerMetaplex';

const { TabPane } = Tabs;
const { Content } = Layout;

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
  const { connected } = useWallet();
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
      {/* <Layout>
        <Content style={{ display: 'flex', flexWrap: 'wrap' }}>
          {false ? (
            <Col style={{ width: '100%', marginTop: 32 }}>
              <Row>
                <Tabs
                  activeKey={activeKey}
                  onTabClick={key => setActiveKey(key as LiveAuctionViewState)}
                >
                  <TabPane
                    tab={
                      <>
                        <span className="live"></span> Live
                      </>
                    }
                    key={LiveAuctionViewState.All}
                  ></TabPane>
                  {hasResaleAuctions && (
                    <TabPane
                      tab="Secondary Marketplace"
                      key={LiveAuctionViewState.Resale}
                    ></TabPane>
                  )}
                  <TabPane
                    tab="Ended"
                    key={LiveAuctionViewState.Ended}
                  ></TabPane>
                  {connected && (
                    <TabPane
                      tab="Participated"
                      key={LiveAuctionViewState.Participated}
                    ></TabPane>
                  )}
                  {connected && (
                    <TabPane
                      tab="My Live Auctions"
                      key={LiveAuctionViewState.Own}
                    ></TabPane>
                  )}
                </Tabs>
              </Row>
              <Row>
                <div className="artwork-grid"></div>
              </Row>
            </Col>
          ) : (
            ''
          )}
        </Content>
      </Layout> */}
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
              to={`/auction/${auction.auction.pubkey}`}
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
