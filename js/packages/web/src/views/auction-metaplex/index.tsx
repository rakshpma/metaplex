import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Carousel, Col, Row, Skeleton } from 'antd';
import { Connection } from '@solana/web3.js';
import { AuctionViewItem } from '@oyster/common/dist/lib/models/metaplex/index';
import {
  AuctionView as Auction,
  useArt,
  useAuction,
  useBidsForAuction,
  useCreators,
  useExtendedArt,
} from '../../hooks';
import { ArtContent } from '../../components/ArtContent';

import { format } from 'timeago.js';

import {
  AuctionState,
  formatTokenAmount,
  Identicon,
  MetaplexModal,
  shortenAddress,
  StringPublicKey,
  toPublicKey,
  useConnection,
  useConnectionConfig,
  useMint,
  useMeta,
  BidStateType,
} from '@oyster/common';
import { useWallet } from '@solana/wallet-adapter-react';
import { MintInfo } from '@solana/spl-token';
import { getHandleAndRegistryKey } from '@solana/spl-name-service';
import useWindowDimensions from '../../utils/layout';
import { CheckOutlined } from '@ant-design/icons';
import { ArtType } from '../../types';
import { MetaAvatar, MetaAvatarDetailed } from '../../components/MetaAvatar';
import { AmountLabel } from '../../components/AmountLabel';
import { ClickToCopy } from '../../components/ClickToCopy';
import { useTokenList } from '../../contexts/tokenList';
import { AuctionCardMetaplex } from '../../components/AuctionCardMetaplex';

export const AuctionItem = ({
  item,
  index,
  size,
  active,
}: {
  item: AuctionViewItem;
  index: number;
  size: number;
  active?: boolean;
}) => {
  const id = item.metadata.pubkey;
  const style: React.CSSProperties = {
    transform:
      index === 0
        ? ''
        : `translate(${index * 15}px, ${-40 * index}px) scale(${Math.max(
            1 - 0.2 * index,
            0,
          )})`,
    transformOrigin: 'right bottom',
    position: index !== 0 ? 'absolute' : 'static',
    zIndex: -1 * index,
    marginLeft: size > 1 && index === 0 ? '0px' : 'auto',
    background: 'black',
    boxShadow: 'rgb(0 0 0 / 10%) 12px 2px 20px 14px',
    aspectRatio: '1/1',
  };
  return (
    <ArtContent
      pubkey={id}
      className="artwork-image stack-item"
      style={style}
      active={active}
      allowMeshRender={true}
    />
  );
};

export const AuctionViewMetaplex = () => {
  const { width } = useWindowDimensions();
  const { id } = useParams<{ id: string }>();
  const { endpoint } = useConnectionConfig();
  const auction = useAuction(id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const art = useArt(auction?.thumbnail.metadata.pubkey);
  const { ref, data } = useExtendedArt(auction?.thumbnail.metadata.pubkey);
  const creators = useCreators(auction);
  const { pullAuctionPage } = useMeta();
  useEffect(() => {
    pullAuctionPage(id);
  }, []);

  let edition = '';
  if (art.type === ArtType.NFT) {
    edition = 'Unique';
  } else if (art.type === ArtType.Master) {
    edition = 'NFT 0';
  } else if (art.type === ArtType.Print) {
    edition = `${art.edition} of ${art.supply}`;
  }
  const nftCount = auction?.items.flat().length;
  const winnerCount = auction?.items.length;
  const isOpen =
    auction?.auction.info.bidState.type === BidStateType.OpenEdition;
  const hasDescription = data === undefined || data.description === undefined;
  const description = data?.description;
  const attributes = data?.attributes;
  console.log('description', { description });
  const tokenInfo = useTokenList()?.subscribedTokens.filter(
    m => m.address == auction?.auction.info.tokenMint,
  )[0];

  const items = [
    ...(auction?.items
      .flat()
      .reduce((agg, item) => {
        agg.set(item.metadata.pubkey, item);
        return agg;
      }, new Map<string, AuctionViewItem>())
      .values() || []),
    auction?.participationItem,
  ].map((item, index, arr) => {
    if (!item || !item?.metadata || !item.metadata?.pubkey) {
      return null;
    }

    return (
      <AuctionItem
        key={item.metadata.pubkey}
        item={item}
        index={index}
        size={arr.length}
        active={index === currentIndex}
      />
    );
  });

  return (
    <div ref={ref}>
      <div className="left-line liner">
        <div className="block left-block"></div>
      </div>
      <div className="yeah-overlay1"></div>
      <div className="content-container">
        <section className="checkout-section">
          <div className="checkout-content">
            <div className="dudes">
              <Link to={`../`} key="explore">
                <button type="button" className="backbtn">
                  <img src="./imgg/backbtn.png" alt="" />
                </button>
              </Link>
              <div className="checkout-head">
                <p>
                  NFT <span>CHECKOUT</span>
                </p>
              </div>
            </div>
          </div>
          <div className="checkout-box">
            <div className="dudes">
              <div className="checkout-img line">
                <Carousel
                  autoplay={false}
                  afterChange={index => setCurrentIndex(index)}
                >
                  {items}
                </Carousel>

                <div className="checkout-details">
                  <h1>{art.title || <Skeleton paragraph={{ rows: 0 }} />}</h1>
                  <ul>
                    {attributes &&
                      attributes.map((attribute, index) => (
                        <li>
                          {attribute.trait_type} : {attribute.value}
                        </li>
                      ))}
                  </ul>
                  <p>
                    {description ||
                      (winnerCount !== undefined && (
                        <div style={{ fontStyle: 'italic' }}>
                          No description provided.
                        </div>
                      ))}
                  </p>
                  <p className="pb0"></p>
                  <AuctionBids auctionView={auction} />
                </div>
              </div>
              <div className="checkout-details">
                <div className="token-claim-dude">
                  {!auction && <Skeleton paragraph={{ rows: 6 }} />}
                  {auction && (
                    <AuctionCardMetaplex
                      auctionView={auction}
                      hideDefaultAction={false}
                    />
                  )}

                  <div>
                    <button className="watch-video">
                      <img src="imgg/video.png" />
                      &nbsp;<span>Watch Video</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="right-line liner">
        <div className="block right-block"></div>
      </div>
    </div>
  );
};

const BidLine = (props: {
  bid: any;
  index: number;
  mint?: MintInfo;
  isCancelled?: boolean;
  isActive?: boolean;
  mintKey: string;
}) => {
  const { bid, mint, isCancelled, mintKey } = props;
  const { publicKey } = useWallet();
  const bidder = bid.info.bidderPubkey;
  const isme = publicKey?.toBase58() === bidder;
  const tokenInfo = useTokenList().subscribedTokens.filter(
    m => m.address == mintKey,
  )[0];

  // Get Twitter Handle from address
  const connection = useConnection();
  const [bidderTwitterHandle, setBidderTwitterHandle] = useState('');
  useEffect(() => {
    const getTwitterHandle = async (
      connection: Connection,
      bidder: StringPublicKey,
    ): Promise<string | undefined> => {
      try {
        const [twitterHandle] = await getHandleAndRegistryKey(
          connection,
          toPublicKey(bidder),
        );
        setBidderTwitterHandle(twitterHandle);
      } catch (err) {
        console.warn(`err`);
        return undefined;
      }
    };
    getTwitterHandle(connection, bidder);
  }, [bidderTwitterHandle]);
  const { width } = useWindowDimensions();
  if (width < 768) {
    return (
      <Row className="mobile-bid-history">
        <div className="bid-info-container">
          <div className="bidder-info-container">
            <Identicon
              style={{
                width: 24,
                height: 24,
                marginRight: 10,
                marginTop: 2,
              }}
              address={bidder}
            />
            {bidderTwitterHandle ? (
              <a
                target="_blank"
                title={shortenAddress(bidder)}
                href={`https://twitter.com/${bidderTwitterHandle}`}
                rel="noreferrer"
              >{`@${bidderTwitterHandle}`}</a>
            ) : (
              shortenAddress(bidder)
            )}
          </div>
          <div>
            {!isCancelled && (
              <div className={'flex '}>
                {isme && (
                  <>
                    <CheckOutlined />
                    &nbsp;
                  </>
                )}
                <AmountLabel
                  style={{ marginBottom: 0, fontSize: '16px' }}
                  containerStyle={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  displaySymbol={tokenInfo?.symbol || 'CUSTOM'}
                  iconSize={24}
                  amount={formatTokenAmount(bid.info.lastBid, mint)}
                />
              </div>
            )}
          </div>
        </div>
        <div className="bid-info-container">
          {format(bid.info.lastBidTimestamp.toNumber() * 1000)}
        </div>
      </Row>
    );
  } else {
    return (
      <>
        <Row className={'bid-history'}>
          {isCancelled && (
            <div
              style={{
                position: 'absolute',
                left: 0,
                width: '100%',
                height: 1,
                background: 'grey',
                top: 'calc(50% - 1px)',
                zIndex: 2,
              }}
            />
          )}
          <Col span={10}>
            {!isCancelled && (
              <div className={'flex '}>
                {isme && (
                  <>
                    <CheckOutlined />
                    &nbsp;
                  </>
                )}
                <AmountLabel
                  style={{ marginBottom: 0, fontSize: '16px' }}
                  containerStyle={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  displaySymbol={tokenInfo?.symbol || 'CUSTOM'}
                  tokenInfo={tokenInfo}
                  iconSize={24}
                  amount={formatTokenAmount(bid.info.lastBid, mint)}
                />
              </div>
            )}
          </Col>
          <Col span={6} style={{ opacity: 0.7 }}>
            {/* uses milliseconds */}
            {format(bid.info.lastBidTimestamp.toNumber() * 1000)}
          </Col>
          <Col span={8}>
            <div className={'flex-right'}>
              <Identicon
                style={{
                  width: 16,
                  height: 16,
                  marginRight: 4,
                  marginTop: 2,
                }}
                address={bidder}
              />{' '}
              <span style={{ opacity: 0.7 }}>
                {bidderTwitterHandle ? (
                  <Row className="pubkey-row">
                    <a
                      target="_blank"
                      title={shortenAddress(bidder)}
                      href={`https://twitter.com/${bidderTwitterHandle}`}
                      rel="noreferrer"
                    >{`@${bidderTwitterHandle}`}</a>
                    <ClickToCopy
                      className="copy-pubkey"
                      copyText={bidder as string}
                    />
                  </Row>
                ) : (
                  <Row className="pubkey-row">
                    {shortenAddress(bidder)}
                    <ClickToCopy
                      className="copy-pubkey"
                      copyText={bidder as string}
                    />
                  </Row>
                )}
              </span>
            </div>
          </Col>
        </Row>
      </>
    );
  }
};

export const AuctionBids = ({
  auctionView,
}: {
  auctionView?: Auction | null;
}) => {
  const bids = useBidsForAuction(auctionView?.auction.pubkey || '');

  const mint = useMint(auctionView?.auction.info.tokenMint);
  const { width } = useWindowDimensions();

  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);

  const winnersCount = auctionView?.auction.info.bidState.max.toNumber() || 0;
  const activeBids = auctionView?.auction.info.bidState.bids || [];
  const activeBidders = useMemo(() => {
    return new Set(activeBids.map(b => b.key));
  }, [activeBids]);
  const auctionState = auctionView
    ? auctionView.auction.info.state
    : AuctionState.Created;
  const bidLines = useMemo(() => {
    let activeBidIndex = 0;
    return bids.map((bid, index) => {
      const isCancelled =
        (index < winnersCount && !!bid.info.cancelled) ||
        (auctionState !== AuctionState.Ended && !!bid.info.cancelled);

      const line = (
        <BidLine
          bid={bid}
          index={activeBidIndex}
          key={index}
          mint={mint}
          isCancelled={isCancelled}
          isActive={!bid.info.cancelled}
          mintKey={auctionView?.auction.info.tokenMint || ''}
        />
      );

      if (!isCancelled) {
        activeBidIndex++;
      }

      return line;
    });
  }, [auctionState, bids, activeBidders]);

  if (!auctionView || bids.length < 1) return null;

  return (
    <>
      <Row>
        <Col className="bids-lists">
          <h6 className={'info-title'}>
            {auctionView.isInstantSale ? 'Sale' : 'Bid'} History
          </h6>
          {bidLines.slice(0, 10)}
          {bids.length > 10 && (
            <div
              className="full-history"
              onClick={() => setShowHistoryModal(true)}
              style={{
                cursor: 'pointer',
              }}
            >
              View full history
            </div>
          )}
          <MetaplexModal
            visible={showHistoryModal}
            onCancel={() => setShowHistoryModal(false)}
            title="Bid history"
            bodyStyle={{
              background: 'unset',
              boxShadow: 'unset',
              borderRadius: 0,
            }}
            centered
            width={width < 768 ? width - 10 : 600}
          >
            <div
              style={{
                maxHeight: 600,
                overflowY: 'scroll',
                width: '100%',
              }}
            >
              {bidLines}
            </div>
          </MetaplexModal>
        </Col>
      </Row>
    </>
  );
};
