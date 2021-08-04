import moment from 'moment';
import { Auction } from '../../wrappers/nounsAuction';
import classes from './AuctionTimer.module.css';
import { useState, useEffect, useRef } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import clsx from 'clsx';

const AuctionTimer: React.FC<{
  auction: Auction;
  auctionEnded: boolean;
  setAuctionEnded: (ended: boolean) => void;
}> = props => {
  const { auction, auctionEnded, setAuctionEnded } = props;

  const [auctionTimer, setAuctionTimer] = useState(0);
  const auctionTimerRef = useRef(auctionTimer); // to access within setTimeout
  auctionTimerRef.current = auctionTimer;

  const timerDuration = moment.duration(auctionTimerRef.current, 's');

  // timer logic
  useEffect(() => {
    const timeLeft = (auction && BigNumber.from(auction.endTime).toNumber()) - moment().unix();

    setAuctionTimer(auction && timeLeft);

    if (auction && timeLeft <= 0) {
      setAuctionTimer(0);
      setAuctionEnded(true);
    } else {
      setAuctionEnded(false);
      const timer = setTimeout(() => {
        setAuctionTimer(auctionTimerRef.current - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [auction, auctionTimer, setAuctionEnded]);

  const auctionContent = auctionEnded ? 'Auction ended' : 'Ends in';

  const flooredMinutes = Math.floor(timerDuration.minutes())
  const flooredSeconds = Math.floor(timerDuration.seconds())

  return (
    <>
      <h4 className={classes.title}>{auction && auctionContent}</h4>
      <h2 className={classes.timerWrapper}>
        <div className={classes.timerSection}>
          <span className={classes.time}>{auction && `${Math.floor(timerDuration.hours())}h`}</span>
        </div>
        <div className={classes.timerSection}>
          <span className={clsx(classes.time, classes.staticTime, (
            flooredMinutes < 10 ? classes.singleDigitStaticTime : classes.doubleDigitStaticTime
          ) )}>
            {auction && `${flooredMinutes}m`}
          </span>
        </div>
        <div className={classes.timerSection}>
          <span className={clsx(classes.time, classes.staticTime, (
            flooredSeconds < 10 ? classes.singleDigitStaticTime : classes.doubleDigitStaticTime
          ))}>
            {auction && `${flooredSeconds}s`}
          </span>
        </div>
      </h2>
    </>
  );
};

export default AuctionTimer;
