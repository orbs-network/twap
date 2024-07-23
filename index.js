const configs = require('./configs.json');
const twapAbi = require('./twap.abi.json');
const lensAbi = require('./lens.abi.json');
const takerAbi = require('./taker.abi.json');

Object.keys(configs).forEach((key) => {
	if (!configs[key].twapAbi) configs[key].twapAbi = twapAbi;
	if (!configs[key].lensAbi) configs[key].lensAbi = lensAbi;
	if (!configs[key].takerAbi) configs[key].takerAbi = takerAbi;
});

module.exports = { configs };
