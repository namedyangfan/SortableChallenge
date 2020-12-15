import helper from './helper';
import loader from './loader';
import calcualtePerSite from './index';

const configPath = './auction-challenge/config.json';
const inputPath = './auction-challenge/input.json';

const mockBidders = [
  {
    name: 'AUCT',
    adjustment: -0.0625,
  },
  {
    name: 'BIDD',
    adjustment: 0,
  },
];

describe('helper', () => {
  describe('calcualteAdjustedbid', () => {
    it('should calcualte the adjusted amount', () => {
      const expectedResponse = [
        { bidder: 'AUCT', unit: 'banner', bid: 35, adjustedBid: 32.8125 },
        { bidder: 'BIDD', unit: 'sidebar', bid: 60, adjustedBid: 60 },
        { bidder: 'AUCT', unit: 'sidebar', bid: 55, adjustedBid: 51.5625 },
      ];
      const { sites, bidders } = loader.loadSitesBidders(configPath);
      const inputData = loader.loadInput(inputPath);
      const bids = inputData[0].bids;
      const response = helper.calcualteAdjustedbid(bids, bidders);
      expect(response).toEqual(expectedResponse);
    });
  });

  describe('calcualteHighestBidderPerUnit', () => {
    it('should return the highest bid for each unit', () => {
      const mockAdjustedBids = [
        { bidder: 'AUCT', unit: 'banner', adjustedBid: 32.8125 },
        { bidder: 'MOCK', unit: 'banner', adjustedBid: 100000 },
        { bidder: 'MOCK', unit: 'banner', adjustedBid: null },
        { bidder: 'BIDD', unit: 'sidebar', adjustedBid: 60 },
        { bidder: 'AUCT', unit: 'sidebar', adjustedBid: 51.5625 },
      ];

      const expectResponse = [
        { bidder: 'AUCT', unit: 'banner', adjustedBid: 32.8125 },
        { bidder: 'BIDD', unit: 'sidebar', adjustedBid: 60 },
      ];

      const mockFloor = 10;
      const response = helper.calcualteHighestBidderPerUnit(
        mockAdjustedBids,
        mockBidders,
        mockFloor
      );
      expect(response).toEqual(expectResponse);
    });
  });

  describe('calcualtePerSite', () => {
    it('should return highest bid per unit per site', () => {
      const { sites, bidders } = loader.loadSitesBidders(configPath);

      const mockInput = [
        {
          site: 'houseofcheese.com',
          units: ['banner', 'sidebar'],
          bids: [
            {
              bidder: 'AUCT',
              unit: 'banner',
              bid: 35,
            },
            {
              bidder: 'BIDD',
              unit: 'sidebar',
              bid: 60,
            },
            {
              bidder: 'AUCT',
              unit: 'sidebar',
              bid: 55,
            },
          ],
        },
        {
          site: 'invalidewebsite.com',
          units: ['banner', 'sidebar'],
          bids: [
            {
              bidder: 'AUCT',
              unit: 'banner',
              bid: 35,
            },
            {
              bidder: 'BIDD',
              unit: 'sidebar',
              bid: 60,
            },
            {
              bidder: 'AUCT',
              unit: 'sidebar',
              bid: 55,
            },
          ],
        },
      ];

      const expectedResult = [
        [
          { bidder: 'AUCT', bid: 35, unit: 'banner' },
          { bidder: 'BIDD', bid: 60, unit: 'sidebar' },
        ],
        [],
      ];

      const response = calcualtePerSite(sites, mockInput, mockBidders);
      expect(response).toEqual(expectedResult);
    });
  });
});
