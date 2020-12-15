import helper from './helper';
import formatter from './formatter';
import loader from './loader';

const getSiteConfig = (siteURL, valideSiteList) =>
  valideSiteList.find((site) => site.name == siteURL);

const calcualtePerSite = (valideSiteList, inputData, valideBidderList) => {
  const highestBidPerSitePerUnit = inputData.map((siteItem) => {
    const { site: siteURL, bids } = siteItem;
    const siteConfig = getSiteConfig(siteURL, valideSiteList);

    if (siteConfig) {
      const adjustedBids = helper.calcualteAdjustedbid(bids, valideBidderList);
      const highestBidPerUnit = helper.calcualteHighestBidderPerUnit(
        adjustedBids,
        valideBidderList,
        siteConfig.floor
      );

      return highestBidPerUnit;
    }
    return [];
  });

  const formattedResult = formatter.outputFormatter(highestBidPerSitePerUnit);
  return formattedResult;
};

const main = () => {
  try {
    const { sites, bidders } = loader.loadSitesBidders('/auction/config.json');
    const inputData = loader.loadInput('/auction/input.json');
    const result = calcualtePerSite(sites, inputData, bidders);
    console.log(result);
    return result
  } catch (error) {
    console.log('Unable to process data with Error', error);
  }
};

main();
export default calcualtePerSite;
