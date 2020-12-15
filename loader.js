const loadSitesBidders = (path) => {
  try {
    const { sites, bidders } = require(path);
    return { sites, bidders };
  } catch (error) {
    console.log(`loadSitesBidders - Not able to load data at path: ${path}`);
    throw error;
  }
};

const loadInput = (path) => {
  try {
    const data = require(path);
    return data;
  } catch (error) {
    console.log(`loadInput - Not able to load input at path: ${path}`);
    throw error;
  }
};

export default { loadSitesBidders, loadInput };
