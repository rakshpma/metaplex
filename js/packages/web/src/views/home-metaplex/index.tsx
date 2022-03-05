import { Layout } from 'antd';
import React, { useMemo, useState } from 'react';
import { useStore } from '@oyster/common';
import { useMeta } from '../../contexts';
import { LiveAuctionViewState, SalesListView } from './components/SalesList';
import { SetupView } from './setup';
import { AuctionRenderCard } from '../../components/AuctionRenderCard';
import { useWallet } from '@solana/wallet-adapter-react';
import { Link } from 'react-router-dom';
import { CardLoader } from '../../components/MyLoader';
import { useAuctionsList } from '../home/components/SalesList/hooks/useAuctionsList';

export const HomeViewMetaplex = (props: { collectionMintFilter?: string }) => {
  const { isLoading, store } = useMeta();
  const { isConfigured } = useStore();

  const showAuctions = (store && isConfigured) || isLoading;
  const [activeKey, setActiveKey] = useState(LiveAuctionViewState.All);
  const { connected } = useWallet();
  const { auctions, hasResaleAuctions } = useAuctionsList(activeKey);
  const filteredAuctions = auctions;
  useMemo(() => {
    if (props.collectionMintFilter) {
      return auctions.filter(
        auction =>
          auction.thumbnail.metadata.info.collection?.key ===
          props.collectionMintFilter,
      );
    }
    return auctions;
  }, [auctions, props.collectionMintFilter]);

  return <SalesListView />;
};
