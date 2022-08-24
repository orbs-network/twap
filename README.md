# TWAP

> Time-Weighted Average Price

This contract allows incentivized execution of a [TWAP](https://en.wikipedia.org/wiki/Time-weighted_average_price) order:
[Limit Order](https://en.wikipedia.org/wiki/Order_(exchange)#Limit_order)
or [Market Order](https://en.wikipedia.org/wiki/Order_(exchange)#Market_order)
**on any DEX**, with partial fills, by breaking the order into "chunks" and enabling an [English Auction](https://en.wikipedia.org/wiki/English_auction) bidding war on each 
chunk.

Users (makers) create orders that wait in the contract to be filled.

The winning taker (bidder, anyone willing to find the best path to trade for the next chunk on any DEX) receives a portion of the output tokens for their effort.

1 honest taker (willing to take just enough to cover gas costs) is enough to ensure the entire system functions effectively at spot prices.

The contract works only up to year 2106 (32bit timestamps).

### The `TWAP` contract does not hold any funds, has no owners or other roles and is immutable

## Use Cases
* [Price impact](https://coinmarketcap.com/alexandria/glossary/price-impact) reduction on large orders or long-tail low liquidity token pairs
    * By setting duration to be short (5-20 minutes), and delay to 1-2 minutes, a maker enjoys the benefits of spreading the order over time
    * This lets arbitrageurs close any price discrepencies on the affected pools and bring back the reserves to equilibrium (on par with spot price)
    * A short order duration minimizes risk of market price volatility while still allowing arbitrageurs to close the gap, effectively increasing liquidity on the same pools
    * A consideration should be given to the amount of chunks, as more chunks implies more gas costs on the order, which can add up to more than the benefit given by spreading
      over time
    * Gas costs will eventually be rolled onto the `maker`, as takers will only be willing to bid if it is worth it. 1 honest taker is enough for the entire system to function
      as efficiently as possible, minus the fee that taker is willing to take
    * A limit order (tight `dstMinAmount`) may also be only partially filled if price moves away while order is in flight
* Long term [DCA strategy](https://en.wikipedia.org/wiki/Dollar_cost_averaging)
    * By setting duration to be very long in the future (can be years), setting allowance and holding the entire amount of tokens, a maker can effectively implement an automated DCA
      bot that is resilient to price manipulations and requires no other actions from the maker
    * Assuming there is 1 honest taker, setting a market order (near 0 `dstMinAmount`) and a large delay will create a bidding war on the next chunk once in a while (can be days, 
      weeks or months), while ensuring a price that is very close to spot market price
    * The order will be visible on chain, and as bidding and execution can be predicted, a large enough order may still be interesting enough to manipulate price across all
      markets, just before it is executed, so this is better reserved for large-cap "base" assets not easily prone to entire market cap price manipulations

## Architecture

### Actors

* `maker`: User, the Order creator. Has `srcToken` balance and allowance to be swapped by the `TWAP` contract on a specific (or any) exchange
  * Controls all Order restriction parameters such as limit price, expiration and delay between chunks
* `taker`: Incentivized independant participators that listen to Orders submitted by makers
  * Try to find the best path on relevant chunks and submit bids for those chunks with a fee
  * `fee`: 0 or more of the `dstToken` output to be sent to the taker on chunk fill
  * Spends the effort needed to find the best path, and risks being out-bid in the bidding war by another `taker` with a better path or lower fee

### State diagram and execution flowchart

![TWAP diagram](./TWAP.png)

#### [TWAP](./contracts/TWAP.sol) contract holds the order book, an array of all `Orders`

#### [Order](./contracts/OrderLib.sol) is created by a `maker` with all required parameters and constraints
* `id`: the index in the order book, generated
* `status`: open, canceled, completed
* `filledTime`: last chunk filled timestamp
* `srcFilledAmount`: total filled amount in `srcToken`
* `Ask`: holds the order parameters requested by the maker
  * `time`: order creation timestamp
  * `deadline`: order duration timestamp, required
  * `delay`: minimum delay in seconds between chunks, required, must be `>MIN_FILL_DELAY_SECONDS`
  * `maker`: order creator (`msg.sender`)
  * `exchange`: swap only on this exchange, or zero for any exchange
  * `srcToken`: input token, required
  * `dstToken`: output token, required. Can be higher than market (implies a limit order), or as low as 1 wei 
    (implies a market order)
  * `srcAmount`: input total order amount in `srcToken`, required
  * `srcBidAmount`: input chunk size in `srcToken`, required
  * `dstMinAmount`: minimum output chunk size, in `dstToken`, required
* `Bid`: holds the current winning bid, or empty, set by the `taker`
  * `time`: bid creation timestamp
  * `taker`: the winning bidder
  * `exchange`: execute bid on this exchange, never zero on a valid bid
  * `dstAmount`: output amount for this bid after fees in `dstToken`
  * `dstFee`: requested by `taker` for performing the bid and fill, in `dstToken`, may be `0`
  * `data`: swap data passed to exchange, expected output = `dstAmount` + `dstFee`

* `OrderCreated` event is emitted

#### Once order is created, it waits in the contract to be filled, when viable

#### Every bid checks for the following conditions:
* The order is not canceled, and deadline did not pass
* The maker approved `srcToken` to be swapped by the `TWAP` contract (enough for the next chunk)
* The maker has enough balance of `srcToken` to be swapped (enough for the next chunk)
* The order was not recently filled
  * The `delay` is set by the order maker, minimum `MIN_FILL_DELAY_SECONDS`
* If `exchange` was set by the order maker, only that exchange can be used to swap. If `zero`, any exchange can be used
* The current bid output after fees is higher than previous winning bid
* The current bid output after fees is higher or equal to the minimum set by the order maker
* Any invalid constraint will revert the `bid` transaction, so a succesfull transaction implies a win
* To avoid stale unfilled bids, a bid older than `MAX_BID_WINDOW_SECONDS` will be cleared

#### A winning bid can be filled (executed) only after a minimum delay of `MIN_BID_WINDOW_SECONDS`, to allow for a bidding war on the next chunk
* Each succesfull bid allows for another `MIN_BID_WINDOW_SECONDS` interval to challenge it
* If no other bid is set as the new winner, the current `taker` (winning bidder) can fill the bid by calling `fill(id)`
* The fill performs the same verifications as when bidding, but also performs the actual swap on the requested exchange, transferring tokens from `maker` to the `exchange`, and 
  back to the `maker`
* If `dstFee` is set `>0` it is paid out to the winning `taker` on completion of the order, out of the `dstToken` amount of that swap
* `OrderFilled` event is emitted

#### That means there is an incentive to find a good enough path for the bid such that the fee will be as high as possible
#### But it is also enough there is 1 honest `taker`, willing to take just enough fee for gas, for the order to be filled to as close a price to market as possible

* An order can be canceled any time by the `maker`, effectively setting `deadline` to `0`
* An order can be only partially filled, due to market price volatility (unfilled limit orders), or expiration
* The maker must ensure approval and balance of `srcToken` for each chunk, before each bid on that chunk. It does not have to be the entire amount at order creation


## Build Setup
- create `.env` file with:
```
NETWORK_URL_ETH=<URL>
NETWORK_URL_POLY=<URL>
ETHERSCAN_ETH=<KEY>
ETHERSCAN_POLY=<KEY>
COINMARKETCAP=<KEY>
```

- `npm install`
- `npm run build`
- `npm run test`

[see tests output](./TEST_OUTPUT.md)
