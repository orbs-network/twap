
```console

🌐 network ETH blocknumber 14908980 🌐



  Errors
    ✓ cancel only from maker (491ms)
    ✓ prune only invalid orders (4287ms)
    ✓ bid params (14ms)
    order
      ✓ invalid id (9ms)
      ✓ insufficient maker allowance (17ms)
      ✓ insufficient maker balance (453ms)
      invalid params
        ✓ srcToken zero (7ms)
        ✓ same tokens (5ms)
        ✓ srcAmount zero (5ms)
        ✓ srcBidAmount zero (7ms)
        ✓ srcBidAmount>srcAmount (10ms)
        ✓ dstMinAmount zero (8ms)
        ✓ expired (7ms)
        ✓ bid delay lower than minimum (6ms)
        ✓ weth to native (6ms)
        ✓ same tokens native (7ms)
    verify bid
      ✓ expired (66ms)
      ✓ invalid exchange (1435ms)
      ✓ low bid (92ms)
      ✓ recently filled (125ms)
      ✓ recently filled custom fill delay (122ms)
      ✓ insufficient amount out (39ms)
      ✓ insufficient amount out with excess fee (38ms)
      ✓ fee underflow protection (38ms)
      ✓ insufficient amount out when last partial fill (125ms)
      ✓ insufficient user allowance (45ms)
      ✓ insufficient user balance (49ms)
    perform fill
      ✓ expired (48ms)
      ✓ invalid taker when no existing bid (27ms)
      ✓ invalid taker when not the winning taker (55ms)
      ✓ pending bid when still in bidding window of bid delay (49ms)
      ✓ pending bid with custom delay (101ms)
      ✓ insufficient out (828ms)
      ✓ insufficient out with excess fee (84ms)
      ✓ fee subtracted from dstAmountOut underflow protection (78ms)

  IExchange implementations
    UniswapV2Exchange
      ✓ swap (285ms)
    ParaswapExchange
      ✓ getAmountOut using pure encoded data from offchain (7ms)
      ✓ swap with data from paraswap (8938ms)

  FeeOnTransfer tokens
    ✓ TWAP supports FOT tokens (96ms)
    UniswapV2Exchange supports FOT tokens
      ✓ throws on normal swap (28ms)
      ✓ sell tokens with FOT (36ms)

  Lens
    taker biddable orders
      ✓ filters valid bid orders for taker, by status, paginated (87ms)
      ✓ filled orders (104ms)
      ✓ canceled orderes (35ms)
      ✓ recently filled, after asked delay (119ms)
      ✓ different taker, or stale bid (61ms)
      ✓ insufficient maker allowance and balance (519ms)
    taker fillable orders
      ✓ filter valid fillable orders for taker, paginated, not expired (153ms)
      ✓ taker won the bid after pending bid window (64ms)
      ✓ filled (108ms)
      ✓ expired (70ms)
      ✓ canceled (81ms)
      ✓ maker allowance and balance (110ms)
    maker orders
      ✓ returns all maker orders (15ms)

  TWAPLib with production config
    SpiritSwap on 250
      - constructed with config
      - allowance and approval
      - validate tokens
      - submitOrder validations
      with order
        - submit order, getOrder
        - cancel order
        - status opened, canceled
        - status expired
        - status completed
        - getAllOrders
      helper functions
        - isNativeToken
        - isWrappedToken
        - isValidNetwork
        - maker balance
        - wrap native
        - unwrap to native
        - waitForConfirmation
      calculations helpers
        - orderProgress
        - isMarketOrder
        - market price dstAmount = srcAmount * (srcUsd/dstUsd)
        - limit price dstAmount = srcAmount * limitPrice
        - percent above/below market
        - max possible chunk count
        - srcChunkAmount
        - totalChunks
        - fillDelayMillis for evenly distributed trades over maxDuration
        - dstMinAmountOut
    SpookySwap on 250
      - constructed with config
      - allowance and approval
      - validate tokens
      - submitOrder validations
      with order
        - submit order, getOrder
        - cancel order
        - status opened, canceled
        - status expired
        - status completed
        - getAllOrders
      helper functions
        - isNativeToken
        - isWrappedToken
        - isValidNetwork
        - maker balance
        - wrap native
        - unwrap to native
        - waitForConfirmation
      calculations helpers
        - orderProgress
        - isMarketOrder
        - market price dstAmount = srcAmount * (srcUsd/dstUsd)
        - limit price dstAmount = srcAmount * limitPrice
        - percent above/below market
        - max possible chunk count
        - srcChunkAmount
        - totalChunks
        - fillDelayMillis for evenly distributed trades over maxDuration
        - dstMinAmountOut

  maxgas: special test: large order history, paginated reads
⚠️ gasUsed 13658457
    ✓ taker biddable orders (35336ms)

  Paraswap
    Ethereum
      ✓ priceUsd (816ms)
      ✓ priceUsd for native token uses wToken (647ms)
      ✓ gas prices (266ms)
    Fantom
      - priceUsd
      - priceUsd for native token uses wToken
      - gas prices
    Polygon
      - priceUsd
      - priceUsd for native token uses wToken
      - gas prices

  Sanity
    ✓ version (5ms)
    ✓ maker creates ask order, emits event (24ms)
    ✓ bid sets Bid fields, emits event (40ms)
    ✓ fill sets Fill fields and clears the Bid, emits event (86ms)
    ✓ cancel order, emits event (40ms)
    ✓ order fully filled, emits event (168ms)
    History
      ✓ find orders for maker (277ms)
      ✓ makerOrders has mapping of order ids by maker address, to avoid relying on events (2ms)

  Taker
    ✓ sanity (4ms)
    ✓ onlyOwners (35ms)
    ✓ bid & fill, gas rebate as dstToken without swapping (86ms)
    ✓ gas rebate when dstToken == nativeToken, unwrap with or without swapping to native (84ms)
    rescue
      ✓ sends native token balance to caller (13ms)
      ✓ sends ERC20 token balance to owner (462ms)

  TWAP
    ✓ single chunk (94ms)
    ✓ mutiple chunks (299ms)
    ✓ last chunk may be partial amount (229ms)
    ✓ outbid current bid within pending period (101ms)
    ✓ outbid current bid within pending period same path and amount but lower fee (70ms)
    ✓ enforce bids 1% better than previous (85ms)
    ✓ clears stale unfilled bid after max bidding window = bidDelay * STALE_BID_DELAY_MUL (86ms)
    ✓ supports market orders, english auction incentivizes best competitive price (139ms)
    ✓ prevent winning the bid by manipulating exchange price (98ms)
    ✓ slippage percent allows price slippage (155ms)
    ✓ slippage percent at bid time is part of the bidding war (112ms)
    ✓ native token output support (88ms)
    prune stale invalid order
      ✓ when no approval (38ms)
      ✓ when no balance (43ms)

·--------------------------------------------|---------------------------|-------------|-----------------------------·
|            Solc version: 0.8.16            ·  Optimizer enabled: true  ·  Runs: 200  ·  Block limit: 15000000 gas  │
·············································|···························|·············|······························
|  Methods                                   ·               11 gwei/gas               ·       1161.30 usd/eth       │
··························|··················|·············|·············|·············|···············|··············
|  Contract               ·  Method          ·  Min        ·  Max        ·  Avg        ·  # calls      ·  usd (avg)  │
··························|··················|·············|·············|·············|···············|··············
|  ERC20                  ·  approve         ·      38027  ·      60311  ·      55949  ·           89  ·       0.71  │
··························|··················|·············|·············|·············|···············|··············
|  ERC20                  ·  transfer        ·      51618  ·      65625  ·      63896  ·          103  ·       0.82  │
··························|··················|·············|·············|·············|···············|··············
|  MockDeflationaryToken  ·  approve         ·      46260  ·      46572  ·      46370  ·            6  ·       0.59  │
··························|··················|·············|·············|·············|···············|··············
|  MockExchange           ·  setMockAmounts  ·      32144  ·      69156  ·      51531  ·           21  ·       0.66  │
··························|··················|·············|·············|·············|···············|··············
|  ParaswapExchange       ·  swap            ·          -  ·          -  ·     299128  ·            1  ·       3.82  │
··························|··················|·············|·············|·············|···············|··············
|  Taker                  ·  bid             ·          -  ·          -  ·     306419  ·            3  ·       3.91  │
··························|··················|·············|·············|·············|···············|··············
|  Taker                  ·  fill            ·     379115  ·     380241  ·     379678  ·            2  ·       4.85  │
··························|··················|·············|·············|·············|···············|··············
|  Taker                  ·  rescue          ·      39446  ·      79269  ·      59358  ·            2  ·       0.76  │
··························|··················|·············|·············|·············|···············|··············
|  TWAP                   ·  ask             ·     270218  ·     355878  ·     297216  ·         5079  ·       3.80  │
··························|··················|·············|·············|·············|···············|··············
|  TWAP                   ·  bid             ·     118205  ·     300272  ·     268624  ·           59  ·       3.43  │
··························|··················|·············|·············|·············|···············|··············
|  TWAP                   ·  cancel          ·      75989  ·      87970  ·      77718  ·            7  ·       0.99  │
··························|··················|·············|·············|·············|···············|··············
|  TWAP                   ·  fill            ·     276714  ·     356811  ·     333353  ·           24  ·       4.26  │
··························|··················|·············|·············|·············|···············|··············
|  TWAP                   ·  prune           ·      89241  ·      93197  ·      91219  ·            2  ·       1.17  │
··························|··················|·············|·············|·············|···············|··············
|  UniswapV2Exchange      ·  swap            ·     165841  ·     185775  ·     175808  ·            2  ·       2.25  │
··························|··················|·············|·············|·············|···············|··············
|  Deployments                               ·                                         ·  % of limit   ·             │
·············································|·············|·············|·············|···············|··············
|  Lens                                      ·          -  ·          -  ·    1299068  ·        8.7 %  ·      16.59  │
·············································|·············|·············|·············|···············|··············
|  MockDeflationaryToken                     ·          -  ·          -  ·     711309  ·        4.7 %  ·       9.09  │
·············································|·············|·············|·············|···············|··············
|  MockExchange                              ·          -  ·          -  ·     508251  ·        3.4 %  ·       6.49  │
·············································|·············|·············|·············|···············|··············
|  ParaswapExchange                          ·          -  ·          -  ·     624766  ·        4.2 %  ·       7.98  │
·············································|·············|·············|·············|···············|··············
|  Taker                                     ·          -  ·          -  ·    1275489  ·        8.5 %  ·      16.29  │
·············································|·············|·············|·············|···············|··············
|  TWAP                                      ·          -  ·          -  ·    3034281  ·       20.2 %  ·      38.76  │
·············································|·············|·············|·············|···············|··············
|  UniswapV2Exchange                         ·          -  ·          -  ·     722009  ·        4.8 %  ·       9.22  │
·--------------------------------------------|-------------|-------------|-------------|---------------|-------------·

  86 passing (4m)
  60 pending


🌐 network FTM blocknumber 39838819 🌐



  Errors
    ✓ cancel only from maker (56ms)
    ✓ prune only invalid orders (160ms)
    ✓ bid params (15ms)
    order
      ✓ invalid id (8ms)
      ✓ insufficient maker allowance (19ms)
      ✓ insufficient maker balance (28ms)
      invalid params
        ✓ srcToken zero (6ms)
        ✓ same tokens (6ms)
        ✓ srcAmount zero (8ms)
        ✓ srcBidAmount zero (8ms)
        ✓ srcBidAmount>srcAmount (8ms)
        ✓ dstMinAmount zero (8ms)
        ✓ expired (7ms)
        ✓ bid delay lower than minimum (8ms)
        ✓ weth to native (7ms)
        ✓ same tokens native (7ms)
    verify bid
      ✓ expired (73ms)
      ✓ invalid exchange (69ms)
      ✓ low bid (102ms)
      ✓ recently filled (138ms)
      ✓ recently filled custom fill delay (141ms)
      ✓ insufficient amount out (37ms)
      ✓ insufficient amount out with excess fee (40ms)
      ✓ fee underflow protection (47ms)
      ✓ insufficient amount out when last partial fill (137ms)
      ✓ insufficient user allowance (46ms)
      ✓ insufficient user balance (54ms)
    perform fill
      ✓ expired (61ms)
      ✓ invalid taker when no existing bid (28ms)
      ✓ invalid taker when not the winning taker (52ms)
      ✓ pending bid when still in bidding window of bid delay (47ms)
      ✓ pending bid with custom delay (125ms)
      ✓ insufficient out (80ms)
      ✓ insufficient out with excess fee (79ms)
      ✓ fee subtracted from dstAmountOut underflow protection (84ms)

  IExchange implementations
    UniswapV2Exchange
      ✓ swap (52ms)
    ParaswapExchange
      ✓ getAmountOut using pure encoded data from offchain (7ms)
      ✓ swap with data from paraswap (24202ms)

  FeeOnTransfer tokens
    ✓ TWAP supports FOT tokens (73ms)
    UniswapV2Exchange supports FOT tokens
      ✓ throws on normal swap (26ms)
      ✓ sell tokens with FOT (37ms)

  Lens
    taker biddable orders
      ✓ filters valid bid orders for taker, by status, paginated (75ms)
      ✓ filled orders (109ms)
      ✓ canceled orderes (30ms)
      ✓ recently filled, after asked delay (118ms)
      ✓ different taker, or stale bid (66ms)
      ✓ insufficient maker allowance and balance (68ms)
    taker fillable orders
      ✓ filter valid fillable orders for taker, paginated, not expired (134ms)
      ✓ taker won the bid after pending bid window (68ms)
      ✓ filled (107ms)
      ✓ expired (45ms)
      ✓ canceled (59ms)
      ✓ maker allowance and balance (95ms)
    maker orders
      ✓ returns all maker orders (15ms)

  TWAPLib with production config
    SpiritSwap on 250
      ✓ constructed with config (0ms)
      ✓ allowance and approval (332ms)
      ✓ validate tokens (3ms)
      ✓ submitOrder validations (10ms)
      with order
        ✓ submit order, getOrder (16ms)
        ✓ cancel order (37ms)
        ✓ status opened, canceled (36ms)
        ✓ status expired (8ms)
        ✓ status completed (25441ms)
        ✓ getAllOrders (349ms)
      helper functions
        ✓ isNativeToken (2ms)
        ✓ isWrappedToken (0ms)
        ✓ isValidNetwork (0ms)
        ✓ maker balance (484ms)
        ✓ wrap native (898ms)
        ✓ unwrap to native (756ms)
        ✓ waitForConfirmation (619ms)
      calculations helpers
        ✓ orderProgress (3ms)
        ✓ isMarketOrder (1ms)
        ✓ market price dstAmount = srcAmount * (srcUsd/dstUsd) (1ms)
        ✓ limit price dstAmount = srcAmount * limitPrice (1ms)
        ✓ percent above/below market (0ms)
        ✓ max possible chunk count (2ms)
        ✓ srcChunkAmount (1ms)
        ✓ totalChunks (1ms)
        ✓ fillDelayMillis for evenly distributed trades over maxDuration (2ms)
        ✓ dstMinAmountOut (1ms)
    SpookySwap on 250
      ✓ constructed with config (1ms)
      ✓ allowance and approval (334ms)
      ✓ validate tokens (1ms)
      ✓ submitOrder validations (4ms)
      with order
        ✓ submit order, getOrder (15ms)
        ✓ cancel order (34ms)
        ✓ status opened, canceled (31ms)
        ✓ status expired (11ms)
        ✓ status completed (5837ms)
        ✓ getAllOrders (288ms)
      helper functions
        ✓ isNativeToken (1ms)
        ✓ isWrappedToken (1ms)
        ✓ isValidNetwork (1ms)
        ✓ maker balance (581ms)
        ✓ wrap native (595ms)
        ✓ unwrap to native (759ms)
        ✓ waitForConfirmation (738ms)
      calculations helpers
        ✓ orderProgress (2ms)
        ✓ isMarketOrder (1ms)
        ✓ market price dstAmount = srcAmount * (srcUsd/dstUsd) (2ms)
        ✓ limit price dstAmount = srcAmount * limitPrice (1ms)
        ✓ percent above/below market (1ms)
        ✓ max possible chunk count (1ms)
        ✓ srcChunkAmount (1ms)
        ✓ totalChunks (1ms)
        ✓ fillDelayMillis for evenly distributed trades over maxDuration (1ms)
        ✓ dstMinAmountOut (1ms)

  maxgas: special test: large order history, paginated reads
⚠️ gasUsed 13658457
    ✓ taker biddable orders (35359ms)

  Paraswap
    Ethereum
      - priceUsd
      - priceUsd for native token uses wToken
      - gas prices
    Fantom
      ✓ priceUsd (775ms)
      ✓ priceUsd for native token uses wToken (665ms)
      ✓ gas prices (418ms)
    Polygon
      - priceUsd
      - priceUsd for native token uses wToken
      - gas prices

  Sanity
    ✓ version (3ms)
    ✓ maker creates ask order, emits event (24ms)
    ✓ bid sets Bid fields, emits event (43ms)
    ✓ fill sets Fill fields and clears the Bid, emits event (92ms)
    ✓ cancel order, emits event (40ms)
    ✓ order fully filled, emits event (189ms)
    History
      ✓ find orders for maker (14ms)
      ✓ makerOrders has mapping of order ids by maker address, to avoid relying on events (2ms)

  Taker
    ✓ sanity (4ms)
    ✓ onlyOwners (37ms)
    ✓ bid & fill, gas rebate as dstToken without swapping (93ms)
    ✓ gas rebate when dstToken == nativeToken, unwrap with or without swapping to native (118ms)
    rescue
      ✓ sends native token balance to caller (12ms)
      ✓ sends ERC20 token balance to owner (50ms)

  TWAP
    ✓ single chunk (100ms)
    ✓ mutiple chunks (318ms)
    ✓ last chunk may be partial amount (231ms)
    ✓ outbid current bid within pending period (99ms)
    ✓ outbid current bid within pending period same path and amount but lower fee (68ms)
    ✓ enforce bids 1% better than previous (84ms)
    ✓ clears stale unfilled bid after max bidding window = bidDelay * STALE_BID_DELAY_MUL (101ms)
    ✓ supports market orders, english auction incentivizes best competitive price (150ms)
    ✓ prevent winning the bid by manipulating exchange price (81ms)
    ✓ slippage percent allows price slippage (143ms)
    ✓ slippage percent at bid time is part of the bidding war (109ms)
    ✓ native token output support (111ms)
    prune stale invalid order
      ✓ when no approval (35ms)
      ✓ when no balance (36ms)

·--------------------------------------------|---------------------------|-------------|-----------------------------·
|            Solc version: 0.8.16            ·  Optimizer enabled: true  ·  Runs: 200  ·  Block limit: 15000000 gas  │
·············································|···························|·············|······························
|  Methods                                                                                                           │
··························|··················|·············|·············|·············|···············|··············
|  Contract               ·  Method          ·  Min        ·  Max        ·  Avg        ·  # calls      ·  usd (avg)  │
··························|··················|·············|·············|·············|···············|··············
|  ERC20                  ·  approve         ·      24299  ·      46583  ·      42767  ·          103  ·          -  │
··························|··················|·············|·············|·············|···············|··············
|  ERC20                  ·  transfer        ·      46731  ·      52345  ·      51435  ·          157  ·          -  │
··························|··················|·············|·············|·············|···············|··············
|  MockDeflationaryToken  ·  approve         ·      46260  ·      46572  ·      46370  ·            6  ·          -  │
··························|··················|·············|·············|·············|···············|··············
|  MockExchange           ·  setMockAmounts  ·      32144  ·      69156  ·      51531  ·           21  ·          -  │
··························|··················|·············|·············|·············|···············|··············
|  ParaswapExchange       ·  swap            ·          -  ·          -  ·     909784  ·            1  ·          -  │
··························|··················|·············|·············|·············|···············|··············
|  Taker                  ·  bid             ·          -  ·          -  ·     331031  ·            3  ·          -  │
··························|··················|·············|·············|·············|···············|··············
|  Taker                  ·  fill            ·     430860  ·     547765  ·     489313  ·            2  ·          -  │
··························|··················|·············|·············|·············|···············|··············
|  Taker                  ·  rescue          ·      39400  ·      63693  ·      51547  ·            2  ·          -  │
··························|··················|·············|·············|·············|···············|··············
|  TWAP                   ·  ask             ·     262410  ·     348070  ·     289474  ·         5091  ·          -  │
··························|··················|·············|·············|·············|···············|··············
|  TWAP                   ·  bid             ·     113439  ·    1945902  ·     339862  ·           63  ·          -  │
··························|··················|·············|·············|·············|···············|··············
|  TWAP                   ·  cancel          ·      75989  ·      90308  ·      77325  ·           11  ·          -  │
··························|··················|·············|·············|·············|···············|··············
|  TWAP                   ·  fill            ·     269304  ·    1046680  ·     415194  ·           28  ·          -  │
··························|··················|·············|·············|·············|···············|··············
|  TWAP                   ·  prune           ·      82151  ·      85389  ·      83770  ·            2  ·          -  │
··························|··················|·············|·············|·············|···············|··············
|  UniswapV2Exchange      ·  swap            ·     193117  ·     207346  ·     200232  ·            2  ·          -  │
··························|··················|·············|·············|·············|···············|··············
|  Deployments                               ·                                         ·  % of limit   ·             │
·············································|·············|·············|·············|···············|··············
|  Lens                                      ·          -  ·          -  ·    1299068  ·        8.7 %  ·          -  │
·············································|·············|·············|·············|···············|··············
|  MockDeflationaryToken                     ·          -  ·          -  ·     711309  ·        4.7 %  ·          -  │
·············································|·············|·············|·············|···············|··············
|  MockExchange                              ·          -  ·          -  ·     508251  ·        3.4 %  ·          -  │
·············································|·············|·············|·············|···············|··············
|  ParaswapExchange                          ·          -  ·          -  ·     624766  ·        4.2 %  ·          -  │
·············································|·············|·············|·············|···············|··············
|  Taker                                     ·          -  ·          -  ·    1275489  ·        8.5 %  ·          -  │
·············································|·············|·············|·············|···············|··············
|  TWAP                                      ·          -  ·          -  ·    3034281  ·       20.2 %  ·          -  │
·············································|·············|·············|·············|···············|··············
|  UniswapV2Exchange                         ·          -  ·          -  ·     722009  ·        4.8 %  ·          -  │
·--------------------------------------------|-------------|-------------|-------------|---------------|-------------·

  140 passing (8m)
  6 pending

```
