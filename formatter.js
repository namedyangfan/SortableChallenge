const outputFormatter = (highestBidPerSitePerUnit) =>
  highestBidPerSitePerUnit.map((siteResult) =>
    siteResult.map((unitResult) => ({
      bidder: unitResult.bidder,
      bid: unitResult.bid,
      unit: unitResult.unit,
    }))
  );

export default { outputFormatter };
