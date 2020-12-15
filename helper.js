const calcualteBid = (bid, adjutmentRate) => bid * (1 + adjutmentRate);

const getBidderAdjustmentRate = (bidderName, bidders) => {
  const result = bidders.find((bidder) => bidder.name == bidderName);
  return result ? result.adjustment : null;
};

const calcualteAdjustedbid = (bids, bidders) => {
  const adjustedBids = bids.map((bidItem) => {
    const { bidder, bid, unit } = bidItem;
    const adjutmentRate = getBidderAdjustmentRate(bidder, bidders);
    const adjustedBid = calcualteBid(bid, adjutmentRate);
    return { bidder, unit, bid, adjustedBid };
  });
  return adjustedBids;
};

const isBiddingValid = ({
  valideBidderList,
  bidderName,
  floor,
  adjuestedBid,
}) => {
  const matchBidder = valideBidderList.find(
    (valideBidder) => valideBidder.name == bidderName
  );
  if (matchBidder && adjuestedBid > floor) {
    return true;
  }
  return false;
};

const calcualteHighestBidderPerUnit = (
  adjustedBids,
  valideBidderList,
  floor
) => {
  const highestBidderUnit = adjustedBids.reduce((acc, bidItem) => {
    const validateParams = {
      valideBidderList,
      bidderName: bidItem.bidder,
      floor,
      adjuestedBid: bidItem.adjustedBid,
    };

    if (isBiddingValid(validateParams)) {
      if (acc[bidItem.unit]) {
        if (bidItem.adjustedBid > acc[bidItem.unit].adjustedBid) {
          acc[bidItem.unit] = bidItem;
        }
      } else {
        acc[bidItem.unit] = bidItem;
      }
    }
    return acc;
  }, {});

  const highestBidderUnitFlat = Object.entries(highestBidderUnit).map(
    (item) => item[1]
  );
  return highestBidderUnitFlat;
};

export default {
  calcualteBid,
  getBidderAdjustmentRate,
  calcualteAdjustedbid,
  isBiddingValid,
  calcualteHighestBidderPerUnit,
};
