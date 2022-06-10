import React from 'react';
import { Col } from 'react-bootstrap';

import classes from './NounInfoCard.module.css';

import _AddressIcon from '../../assets/icons/Address.svg';
import _BidsIcon from '../../assets/icons/Bids.svg';

import NounInfoRowBirthday from '../NounInfoRowBirthday';
import NounInfoRowHolder from '../NounInfoRowHolder';
import NounInfoRowButton from '../NounInfoRowButton';
import { useAppSelector } from '../../hooks';

import config from '../../config';
import { buildEtherscanAddressLink } from '../../utils/etherscan';
import { Trans } from '@lingui/macro';

interface NounInfoCardProps {
  sportsManagerId: number;
  bidHistoryOnClickHandler: () => void;
}

const NounInfoCard: React.FC<NounInfoCardProps> = props => {
  const { sportsManagerId, bidHistoryOnClickHandler } = props;

  const etherscanBaseURL = buildEtherscanAddressLink(config.addresses.sportsManagerToken);

  const etherscanButtonClickHandler = () => window.open(`${etherscanBaseURL}/${sportsManagerId}`, '_blank');

  const lastAuctionNounId = useAppSelector(state => state.onDisplayAuction.lastAuctionNounId);

  return (
    <>
      <Col lg={12} className={classes.nounInfoRow}>
        <NounInfoRowBirthday sportsManagerId={sportsManagerId} />
      </Col>
      <Col lg={12} className={classes.nounInfoRow}>
        <NounInfoRowHolder sportsManagerId={sportsManagerId} />
      </Col>
      <Col lg={12} className={classes.nounInfoRow}>
        <NounInfoRowButton
          iconImgSource={_BidsIcon}
          btnText={lastAuctionNounId === sportsManagerId ? <Trans>Bids</Trans> : <Trans>Bid history</Trans>}
          onClickHandler={bidHistoryOnClickHandler}
        />
        <NounInfoRowButton
          iconImgSource={_AddressIcon}
          btnText={<Trans>Etherscan</Trans>}
          onClickHandler={etherscanButtonClickHandler}
        />
      </Col>
    </>
  );
};

export default NounInfoCard;