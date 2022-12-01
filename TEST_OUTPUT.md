
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
  
  
🌐 network AVAX blocknumber 15609313 🌐



  Errors
    ✓ cancel only from maker (51ms)
    ✓ prune only invalid orders (203ms)
    ✓ bid params (14ms)
    order
      ✓ invalid id (8ms)
      ✓ insufficient maker allowance (22ms)
      ✓ insufficient maker balance (30ms)
      invalid params
        ✓ srcToken zero (7ms)
        ✓ same tokens (8ms)
        ✓ srcAmount zero (7ms)
        ✓ srcBidAmount zero (7ms)
        ✓ srcBidAmount>srcAmount (7ms)
        ✓ dstMinAmount zero (7ms)
        ✓ expired (6ms)
        ✓ bid delay lower than minimum (7ms)
        ✓ weth to native (8ms)
        ✓ same tokens native (8ms)
    verify bid
      ✓ expired (78ms)
      ✓ invalid exchange (73ms)
      ✓ low bid (110ms)
      ✓ recently filled (148ms)
      ✓ recently filled custom fill delay (153ms)
      ✓ insufficient amount out (39ms)
      ✓ insufficient amount out with excess fee (42ms)
      ✓ fee underflow protection (41ms)
      ✓ insufficient amount out when last partial fill (144ms)
      ✓ insufficient user allowance (47ms)
      ✓ insufficient user balance (50ms)
    perform fill
      ✓ expired (54ms)
      ✓ invalid taker when no existing bid (27ms)
      ✓ invalid taker when not the winning taker (52ms)
      ✓ pending bid when still in bidding window of bid delay (51ms)
      ✓ pending bid with custom delay (110ms)
      ✓ insufficient out (88ms)
      ✓ insufficient out with excess fee (85ms)
      ✓ fee subtracted from dstAmountOut underflow protection (85ms)

  IExchange implementations
    UniswapV2Exchange
      ✓ swap (59ms)
    ParaswapExchange
      ✓ getAmountOut using pure encoded data from offchain (3ms)
      ✓ swap with data from paraswap (24523ms)

  FeeOnTransfer tokens
    ✓ TWAP supports FOT tokens (85ms)
    UniswapV2Exchange supports FOT tokens
      ✓ throws on normal swap (31ms)
      ✓ sell tokens with FOT (41ms)

  Lens
    taker biddable orders
      ✓ filters valid bid orders for taker, by status, paginated (91ms)
      ✓ filled orders (131ms)
      ✓ canceled orderes (37ms)
      ✓ recently filled, after asked delay (151ms)
      ✓ different taker, or stale bid (76ms)
      ✓ insufficient maker allowance and balance (84ms)
    taker fillable orders
      ✓ filter valid fillable orders for taker, paginated, not expired (151ms)
      ✓ taker won the bid after pending bid window (69ms)
      ✓ filled (116ms)
      ✓ expired (50ms)
      ✓ canceled (62ms)
      ✓ maker allowance and balance (107ms)
    maker orders
      ✓ returns all maker orders (15ms)

  TWAPLib with production config
    SpiritSwap on 250
      - constructed with config
      - allowance and approval
      - native token allowance
      - validate tokens
      - submitOrder validations
      - parseOrder
      - orderProgress
      - isMarketOrder
      - market price dstAmount = srcAmount * (srcUsd/dstUsd)
      - limit price dstAmount = srcAmount * limitPrice
      - dst price with limit or market
      - percent above/below market
      - max possible chunk count
      - srcChunkAmount
      - totalChunks
      - fillDelayMillis for evenly distributed trades over maxDuration, with buffer of bid and extra buffer
      - dstMinAmountOut
      with order
        - submit order, getOrder
        - cancel order
        - status opened, canceled
        - status expired
        - status completed
        - getAllOrders
      helper functions
        - getToken
        - isNativeToken
        - isWrappedToken
        - isValidNetwork
        - maker balance
        - wrap native
        - unwrap to native
    SpookySwap on 250
      - constructed with config
      - allowance and approval
      - native token allowance
      - validate tokens
      - submitOrder validations
      - parseOrder
      - orderProgress
      - isMarketOrder
      - market price dstAmount = srcAmount * (srcUsd/dstUsd)
      - limit price dstAmount = srcAmount * limitPrice
      - dst price with limit or market
      - percent above/below market
      - max possible chunk count
      - srcChunkAmount
      - totalChunks
      - fillDelayMillis for evenly distributed trades over maxDuration, with buffer of bid and extra buffer
      - dstMinAmountOut
      with order
        - submit order, getOrder
        - cancel order
        - status opened, canceled
        - status expired
        - status completed
        - getAllOrders
      helper functions
        - getToken
        - isNativeToken
        - isWrappedToken
        - isValidNetwork
        - maker balance
        - wrap native
        - unwrap to native
    Pangolin on 43114
      ✓ constructed with config (0ms)
      ✓ allowance and approval (358ms)
      ✓ native token allowance (2ms)
      ✓ validate tokens (190ms)
      ✓ submitOrder validations (153ms)
      ✓ parseOrder (3ms)
      ✓ orderProgress (1ms)
      ✓ isMarketOrder (1ms)
      ✓ market price dstAmount = srcAmount * (srcUsd/dstUsd) (153ms)
      ✓ limit price dstAmount = srcAmount * limitPrice (149ms)
      ✓ dst price with limit or market (195ms)
      ✓ percent above/below market (2ms)
      ✓ max possible chunk count (102ms)
      ✓ srcChunkAmount (0ms)
      ✓ totalChunks (2ms)
      ✓ fillDelayMillis for evenly distributed trades over maxDuration, with buffer of bid and extra buffer (1ms)
      ✓ dstMinAmountOut (192ms)
      with order
        ✓ submit order, getOrder (7ms)
        ✓ cancel order (67ms)
        ✓ status opened, canceled (71ms)
        ✓ status expired (3ms)
        ✓ status completed (3557ms)
        ✓ getAllOrders (71ms)
      helper functions
        ✓ getToken (81ms)
        ✓ isNativeToken (72ms)
        ✓ isWrappedToken (77ms)
        ✓ isValidNetwork (0ms)
        ✓ maker balance (310ms)
        ✓ wrap native (176ms)
        ✓ unwrap to native (204ms)
    QuickSwap on 137
      - constructed with config
      - allowance and approval
      - native token allowance
      - validate tokens
      - submitOrder validations
      - parseOrder
      - orderProgress
      - isMarketOrder
      - market price dstAmount = srcAmount * (srcUsd/dstUsd)
      - limit price dstAmount = srcAmount * limitPrice
      - dst price with limit or market
      - percent above/below market
      - max possible chunk count
      - srcChunkAmount
      - totalChunks
      - fillDelayMillis for evenly distributed trades over maxDuration, with buffer of bid and extra buffer
      - dstMinAmountOut
      with order
        - submit order, getOrder
        - cancel order
        - status opened, canceled
        - status expired
        - status completed
        - getAllOrders
      helper functions
        - getToken
        - isNativeToken
        - isWrappedToken
        - isValidNetwork
        - maker balance
        - wrap native
        - unwrap to native

  maxgas: special test: large order history, paginated reads
⚠️ gasUsed 13658457
    ✓ taker biddable orders (115735ms)

  Paraswap
    SpiritSwap on 250
      - priceUsd
      - priceUsd for native token uses wToken
      - gas prices
      - find route with other exchanges
      - direct path for univ2 exchanges
      - direct path might be invalid
    SpookySwap on 250
      - priceUsd
      - priceUsd for native token uses wToken
      - gas prices
      - find route with other exchanges
      - direct path for univ2 exchanges
      - direct path might be invalid
    Pangolin on 43114
      ✓ priceUsd (578ms)
      ✓ priceUsd for native token uses wToken (1027ms)
      ✓ gas prices (184ms)
      ✓ find route with other exchanges (519ms)
      ✓ direct path for univ2 exchanges (926ms)
      ✓ direct path might be invalid (659ms)
    QuickSwap on 137
      - priceUsd
      - priceUsd for native token uses wToken
      - gas prices
      - find route with other exchanges
      - direct path for univ2 exchanges
      - direct path might be invalid

  Sanity
    ✓ version (2ms)
    ✓ maker creates ask order, emits event (27ms)
    ✓ bid sets Bid fields, emits event (56ms)
    ✓ fill sets Fill fields and clears the Bid, emits event (108ms)
    ✓ cancel order, emits event (45ms)
    ✓ order fully filled, emits event (306ms)
    History
      ✓ find orders for maker (15ms)
      ✓ makerOrders has mapping of order ids by maker address, to avoid relying on events (2ms)

  Taker
    ✓ sanity (6ms)
    ✓ onlyOwners (63ms)
    ✓ bid & fill, gas rebate as dstToken without swapping (135ms)
    ✓ gas rebate when dstToken == nativeToken, unwrap with or without swapping to native (122ms)
    rescue
      ✓ sends native token balance to caller (12ms)
      ✓ sends ERC20 token balance to owner (52ms)

  TWAP
    ✓ single chunk (139ms)
    ✓ mutiple chunks (384ms)
    ✓ last chunk may be partial amount (257ms)
    ✓ outbid current bid within pending period (113ms)
    ✓ outbid current bid within pending period same path and amount but lower fee (71ms)
    ✓ enforce bids 1% better than previous (87ms)
    ✓ clears stale unfilled bid after max bidding window = bidDelay * STALE_BID_DELAY_MUL (86ms)
    ✓ supports market orders, english auction incentivizes best competitive price (167ms)
    ✓ prevent winning the bid by manipulating exchange price (91ms)
    ✓ slippage percent allows price slippage (150ms)
    ✓ slippage percent at bid time is part of the bidding war (117ms)
    ✓ native token output support (89ms)
    prune stale invalid order
      ✓ when no approval (39ms)
      ✓ when no balance (78ms)

·--------------------------------------------|---------------------------|-------------|-----------------------------·
|            Solc version: 0.8.16            ·  Optimizer enabled: true  ·  Runs: 200  ·  Block limit: 15000000 gas  │
·············································|···························|·············|······························
|  Methods                                   ·               25 gwei/gas               ·       13.04 usd/avax        │
··························|··················|·············|·············|·············|···············|··············
|  Contract               ·  Method          ·  Min        ·  Max        ·  Avg        ·  # calls      ·  usd (avg)  │
··························|··················|·············|·············|·············|···············|··············
|  ERC20                  ·  approve         ·      37906  ·      60190  ·      56121  ·           96  ·       0.02  │
··························|··················|·············|·············|·············|···············|··············
|  ERC20                  ·  transfer        ·      52503  ·      65536  ·      64277  ·          133  ·       0.02  │
··························|··················|·············|·············|·············|···············|··············
|  MockDeflationaryToken  ·  approve         ·      46260  ·      46572  ·      46370  ·            6  ·       0.02  │
··························|··················|·············|·············|·············|···············|··············
|  MockExchange           ·  setMockAmounts  ·      32144  ·      69156  ·      51531  ·           21  ·       0.02  │
··························|··················|·············|·············|·············|···············|··············
|  ParaswapExchange       ·  swap            ·          -  ·          -  ·    1633467  ·            1  ·       0.53  │
··························|··················|·············|·············|·············|···············|··············
|  Taker                  ·  bid             ·          -  ·          -  ·     337959  ·            3  ·       0.11  │
··························|··················|·············|·············|·············|···············|··············
|  Taker                  ·  fill            ·     445854  ·     558807  ·     502331  ·            2  ·       0.16  │
··························|··················|·············|·············|·············|···············|··············
|  Taker                  ·  rescue          ·      39403  ·      78947  ·      59175  ·            2  ·       0.02  │
··························|··················|·············|·············|·············|···············|··············
|  TWAP                   ·  ask             ·     270028  ·     355688  ·     297095  ·         5085  ·       0.10  │
··························|··················|·············|·············|·············|···············|··············
|  TWAP                   ·  bid             ·     121057  ·     331811  ·     294894  ·           61  ·       0.10  │
··························|··················|·············|·············|·············|···············|··············
|  TWAP                   ·  cancel          ·      75989  ·      90308  ·      77594  ·            9  ·       0.03  │
··························|··················|·············|·············|·············|···············|··············
|  TWAP                   ·  fill            ·     282822  ·     413704  ·     381403  ·           26  ·       0.12  │
··························|··················|·············|·············|·············|···············|··············
|  TWAP                   ·  prune           ·      89152  ·      93019  ·      91086  ·            2  ·       0.03  │
··························|··················|·············|·············|·············|···············|··············
|  UniswapV2Exchange      ·  swap            ·     187869  ·     226491  ·     207180  ·            2  ·       0.07  │
··························|··················|·············|·············|·············|···············|··············
|  Deployments                               ·                                         ·  % of limit   ·             │
·············································|·············|·············|·············|···············|··············
|  Lens                                      ·          -  ·          -  ·    1299068  ·        8.7 %  ·       0.42  │
·············································|·············|·············|·············|···············|··············
|  MockDeflationaryToken                     ·          -  ·          -  ·     711309  ·        4.7 %  ·       0.23  │
·············································|·············|·············|·············|···············|··············
|  MockExchange                              ·          -  ·          -  ·     508251  ·        3.4 %  ·       0.17  │
·············································|·············|·············|·············|···············|··············
|  ParaswapExchange                          ·          -  ·          -  ·     624766  ·        4.2 %  ·       0.20  │
·············································|·············|·············|·············|···············|··············
|  Taker                                     ·          -  ·          -  ·    1275489  ·        8.5 %  ·       0.42  │
·············································|·············|·············|·············|···············|··············
|  TWAP                                      ·          -  ·          -  ·    3034281  ·       20.2 %  ·       0.99  │
·············································|·············|·············|·············|···············|··············
|  UniswapV2Exchange                         ·          -  ·          -  ·     722009  ·        4.8 %  ·       0.24  │
·--------------------------------------------|-------------|-------------|-------------|---------------|-------------·

  119 passing (6m)
  108 pending


  
🌐 network POLY blocknumber 29174252 🌐



  Errors
    ✓ cancel only from maker (496ms)
    ✓ prune only invalid orders (4303ms)
    ✓ bid params (13ms)
    order
      ✓ invalid id (8ms)
      ✓ insufficient maker allowance (20ms)
      ✓ insufficient maker balance (422ms)
      invalid params
        ✓ srcToken zero (8ms)
        ✓ same tokens (6ms)
        ✓ srcAmount zero (7ms)
        ✓ srcBidAmount zero (6ms)
        ✓ srcBidAmount>srcAmount (7ms)
        ✓ dstMinAmount zero (6ms)
        ✓ expired (7ms)
        ✓ bid delay lower than minimum (9ms)
        ✓ weth to native (7ms)
        ✓ same tokens native (6ms)
    verify bid
      ✓ expired (69ms)
      ✓ invalid exchange (1214ms)
      ✓ low bid (105ms)
      ✓ recently filled (122ms)
      ✓ recently filled custom fill delay (130ms)
      ✓ insufficient amount out (42ms)
      ✓ insufficient amount out with excess fee (41ms)
      ✓ fee underflow protection (37ms)
      ✓ insufficient amount out when last partial fill (132ms)
      ✓ insufficient user allowance (43ms)
      ✓ insufficient user balance (50ms)
    perform fill
      ✓ expired (51ms)
      ✓ invalid taker when no existing bid (28ms)
      ✓ invalid taker when not the winning taker (53ms)
      ✓ pending bid when still in bidding window of bid delay (49ms)
      ✓ pending bid with custom delay (96ms)
      ✓ insufficient out (705ms)
      ✓ insufficient out with excess fee (91ms)
      ✓ fee subtracted from dstAmountOut underflow protection (90ms)

  IExchange implementations
    UniswapV2Exchange
      ✓ swap (246ms)
    ParaswapExchange
      ✓ getAmountOut using pure encoded data from offchain (6ms)
      ✓ swap with data from paraswap (24694ms)

  FeeOnTransfer tokens
    ✓ TWAP supports FOT tokens (694ms)
    UniswapV2Exchange supports FOT tokens
      ✓ throws on normal swap (26ms)
      ✓ sell tokens with FOT (43ms)

  Lens
    taker biddable orders
      ✓ filters valid bid orders for taker, by status, paginated (88ms)
      ✓ filled orders (112ms)
      ✓ canceled orderes (36ms)
      ✓ recently filled, after asked delay (126ms)
      ✓ different taker, or stale bid (65ms)
      ✓ insufficient maker allowance and balance (519ms)
    taker fillable orders
      ✓ filter valid fillable orders for taker, paginated, not expired (139ms)
      ✓ taker won the bid after pending bid window (65ms)
      ✓ filled (96ms)
      ✓ expired (47ms)
      ✓ canceled (57ms)
      ✓ maker allowance and balance (103ms)
    maker orders
      ✓ returns all maker orders (16ms)

  TWAPLib with production config
    SpiritSwap on 250
      - constructed with config
      - allowance and approval
      - native token allowance
      - validate tokens
      - submitOrder validations
      - parseOrder
      - orderProgress
      - isMarketOrder
      - market price dstAmount = srcAmount * (srcUsd/dstUsd)
      - limit price dstAmount = srcAmount * limitPrice
      - dst price with limit or market
      - percent above/below market
      - max possible chunk count
      - srcChunkAmount
      - totalChunks
      - fillDelayMillis for evenly distributed trades over maxDuration, with buffer of bid and extra buffer
      - dstMinAmountOut
      with order
        - submit order, getOrder
        - cancel order
        - status opened, canceled
        - status expired
        - status completed
        - getAllOrders
      helper functions
        - getToken
        - isNativeToken
        - isWrappedToken
        - isValidNetwork
        - maker balance
        - wrap native
        - unwrap to native
    SpookySwap on 250
      - constructed with config
      - allowance and approval
      - native token allowance
      - validate tokens
      - submitOrder validations
      - parseOrder
      - orderProgress
      - isMarketOrder
      - market price dstAmount = srcAmount * (srcUsd/dstUsd)
      - limit price dstAmount = srcAmount * limitPrice
      - dst price with limit or market
      - percent above/below market
      - max possible chunk count
      - srcChunkAmount
      - totalChunks
      - fillDelayMillis for evenly distributed trades over maxDuration, with buffer of bid and extra buffer
      - dstMinAmountOut
      with order
        - submit order, getOrder
        - cancel order
        - status opened, canceled
        - status expired
        - status completed
        - getAllOrders
      helper functions
        - getToken
        - isNativeToken
        - isWrappedToken
        - isValidNetwork
        - maker balance
        - wrap native
        - unwrap to native
    Pangolin on 43114
      - constructed with config
      - allowance and approval
      - native token allowance
      - validate tokens
      - submitOrder validations
      - parseOrder
      - orderProgress
      - isMarketOrder
      - market price dstAmount = srcAmount * (srcUsd/dstUsd)
      - limit price dstAmount = srcAmount * limitPrice
      - dst price with limit or market
      - percent above/below market
      - max possible chunk count
      - srcChunkAmount
      - totalChunks
      - fillDelayMillis for evenly distributed trades over maxDuration, with buffer of bid and extra buffer
      - dstMinAmountOut
      with order
        - submit order, getOrder
        - cancel order
        - status opened, canceled
        - status expired
        - status completed
        - getAllOrders
      helper functions
        - getToken
        - isNativeToken
        - isWrappedToken
        - isValidNetwork
        - maker balance
        - wrap native
        - unwrap to native
    QuickSwap on 137
      ✓ constructed with config (0ms)
      ✓ allowance and approval (612ms)
      ✓ native token allowance (0ms)
      ✓ validate tokens (426ms)
      ✓ submitOrder validations (360ms)
      ✓ parseOrder (3ms)
      ✓ orderProgress (2ms)
      ✓ isMarketOrder (1ms)
      ✓ market price dstAmount = srcAmount * (srcUsd/dstUsd) (374ms)
      ✓ limit price dstAmount = srcAmount * limitPrice (359ms)
      ✓ dst price with limit or market (368ms)
      ✓ percent above/below market (2ms)
      ✓ max possible chunk count (225ms)
      ✓ srcChunkAmount (2ms)
      ✓ totalChunks (1ms)
      ✓ fillDelayMillis for evenly distributed trades over maxDuration, with buffer of bid and extra buffer (1ms)
      ✓ dstMinAmountOut (401ms)
      with order
        ✓ submit order, getOrder (8ms)
        ✓ cancel order (67ms)
        ✓ status opened, canceled (72ms)
        ✓ status expired (4ms)
        ✓ status completed (5297ms)
        ✓ getAllOrders (195ms)
      helper functions
        ✓ getToken (184ms)
        ✓ isNativeToken (184ms)
        ✓ isWrappedToken (193ms)
        ✓ isValidNetwork (0ms)
        ✓ maker balance (740ms)
        ✓ wrap native (388ms)
        ✓ unwrap to native (430ms)

  maxgas: special test: large order history, paginated reads
⚠️ gasUsed 13658457
    ✓ taker biddable orders (39539ms)

  Paraswap
    SpiritSwap on 250
      - priceUsd
      - priceUsd for native token uses wToken
      - gas prices
      - find route with other exchanges
      - direct path for univ2 exchanges
      - direct path might be invalid
    SpookySwap on 250
      - priceUsd
      - priceUsd for native token uses wToken
      - gas prices
      - find route with other exchanges
      - direct path for univ2 exchanges
      - direct path might be invalid
    Pangolin on 43114
      - priceUsd
      - priceUsd for native token uses wToken
      - gas prices
      - find route with other exchanges
      - direct path for univ2 exchanges
      - direct path might be invalid
    QuickSwap on 137
      ✓ priceUsd (3965ms)
      ✓ priceUsd for native token uses wToken (903ms)
      ✓ gas prices (464ms)
      ✓ find route with other exchanges (1242ms)
      ✓ direct path for univ2 exchanges (435ms)
      ✓ direct path might be invalid (2009ms)

  Sanity
    ✓ version (4ms)
    ✓ maker creates ask order, emits event (51ms)
    ✓ bid sets Bid fields, emits event (49ms)
    ✓ fill sets Fill fields and clears the Bid, emits event (95ms)
    ✓ cancel order, emits event (44ms)
    ✓ order fully filled, emits event (166ms)
    History
      ✓ find orders for maker (242ms)
      ✓ makerOrders has mapping of order ids by maker address, to avoid relying on events (2ms)

  Taker
    ✓ sanity (6ms)
    ✓ onlyOwners (35ms)
    ✓ bid & fill, gas rebate as dstToken without swapping (87ms)
    ✓ gas rebate when dstToken == nativeToken, unwrap with or without swapping to native (2709ms)
    rescue
      ✓ sends native token balance to caller (11ms)
      ✓ sends ERC20 token balance to owner (459ms)

  TWAP
    ✓ single chunk (93ms)
    ✓ mutiple chunks (314ms)
    ✓ last chunk may be partial amount (218ms)
    ✓ outbid current bid within pending period (117ms)
    ✓ outbid current bid within pending period same path and amount but lower fee (100ms)
    ✓ enforce bids 1% better than previous (84ms)
    ✓ clears stale unfilled bid after max bidding window = bidDelay * STALE_BID_DELAY_MUL (84ms)
    ✓ supports market orders, english auction incentivizes best competitive price (177ms)
    ✓ prevent winning the bid by manipulating exchange price (137ms)
    ✓ slippage percent allows price slippage (182ms)
    ✓ slippage percent at bid time is part of the bidding war (112ms)
    ✓ native token output support (2087ms)
    prune stale invalid order
      ✓ when no approval (38ms)
      ✓ when no balance (41ms)

·--------------------------------------------|---------------------------|-------------|-----------------------------·
|            Solc version: 0.8.16            ·  Optimizer enabled: true  ·  Runs: 200  ·  Block limit: 15000000 gas  │
·············································|···························|·············|······························
|  Methods                                   ·               30 gwei/gas               ·       0.92 usd/matic        │
··························|··················|·············|·············|·············|···············|··············
|  Contract               ·  Method          ·  Min        ·  Max        ·  Avg        ·  # calls      ·  usd (avg)  │
··························|··················|·············|·············|·············|···············|··············
|  ERC20                  ·  approve         ·      36162  ·      58446  ·      54377  ·           96  ·       0.00  │
··························|··················|·············|·············|·············|···············|··············
|  ERC20                  ·  transfer        ·      51994  ·      63552  ·      62415  ·          133  ·       0.00  │
··························|··················|·············|·············|·············|···············|··············
|  MockDeflationaryToken  ·  approve         ·      46260  ·      46572  ·      46370  ·            6  ·       0.00  │
··························|··················|·············|·············|·············|···············|··············
|  MockExchange           ·  setMockAmounts  ·      32144  ·      69156  ·      51531  ·           21  ·       0.00  │
··························|··················|·············|·············|·············|···············|··············
|  ParaswapExchange       ·  swap            ·          -  ·          -  ·     803462  ·            1  ·       0.02  │
··························|··················|·············|·············|·············|···············|··············
|  Taker                  ·  bid             ·          -  ·          -  ·     304188  ·            3  ·       0.01  │
··························|··················|·············|·············|·············|···············|··············
|  Taker                  ·  fill            ·     393720  ·     528198  ·     460959  ·            2  ·       0.01  │
··························|··················|·············|·············|·············|···············|··············
|  Taker                  ·  rescue          ·      39476  ·      77040  ·      58258  ·            2  ·       0.00  │
··························|··················|·············|·············|·············|···············|··············
|  TWAP                   ·  ask             ·     267987  ·     353647  ·     295055  ·         5085  ·       0.01  │
··························|··················|·············|·············|·············|···············|··············
|  TWAP                   ·  bid             ·     115974  ·     298071  ·     267467  ·           61  ·       0.01  │
··························|··················|·············|·············|·············|···············|··············
|  TWAP                   ·  cancel          ·      75989  ·      87970  ·      77334  ·            9  ·       0.00  │
··························|··················|·············|·············|·············|···············|··············
|  TWAP                   ·  fill            ·     278906  ·     360364  ·     335952  ·           26  ·       0.01  │
··························|··················|·············|·············|·············|···············|··············
|  TWAP                   ·  prune           ·      87103  ·      90966  ·      89035  ·            2  ·       0.00  │
··························|··················|·············|·············|·············|···············|··············
|  UniswapV2Exchange      ·  swap            ·     167357  ·     185913  ·     176635  ·            2  ·       0.00  │
··························|··················|·············|·············|·············|···············|··············
|  Deployments                               ·                                         ·  % of limit   ·             │
·············································|·············|·············|·············|···············|··············
|  Lens                                      ·          -  ·          -  ·    1299068  ·        8.7 %  ·       0.04  │
·············································|·············|·············|·············|···············|··············
|  MockDeflationaryToken                     ·          -  ·          -  ·     711309  ·        4.7 %  ·       0.02  │
·············································|·············|·············|·············|···············|··············
|  MockExchange                              ·          -  ·          -  ·     508251  ·        3.4 %  ·       0.01  │
·············································|·············|·············|·············|···············|··············
|  ParaswapExchange                          ·          -  ·          -  ·     624766  ·        4.2 %  ·       0.02  │
·············································|·············|·············|·············|···············|··············
|  Taker                                     ·          -  ·          -  ·    1275489  ·        8.5 %  ·       0.04  │
·············································|·············|·············|·············|···············|··············
|  TWAP                                      ·          -  ·          -  ·    3034281  ·       20.2 %  ·       0.08  │
·············································|·············|·············|·············|···············|··············
|  UniswapV2Exchange                         ·          -  ·          -  ·     722009  ·        4.8 %  ·       0.02  │
·--------------------------------------------|-------------|-------------|-------------|---------------|-------------·

  119 passing (6m)
  108 pending

```
