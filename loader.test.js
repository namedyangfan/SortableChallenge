import loader from './loader';

const configPath = './config.json';
const inputPath = './input.json';
const expectedSites = [
  {
    name: 'houseofcheese.com',
    bidders: ['AUCT', 'BIDD'],
    floor: 32,
  },
];

const expectedBidders = [
  {
    name: 'AUCT',
    adjustment: -0.0625,
  },
  {
    name: 'BIDD',
    adjustment: 0,
  },
];

const expectedData = [
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
];

describe('loadSitesBidders', () => {
  it('should return sites and bidders', () => {
    const { sites, bidders } = loader.loadSitesBidders(configPath);
    expect(sites).toEqual(expectedSites);
    expect(bidders).toEqual(expectedBidders);
  });

  it('should return input data', () => {
    const data = loader.loadInput(inputPath);
    expect(data).toEqual(expectedData);
  });
});
