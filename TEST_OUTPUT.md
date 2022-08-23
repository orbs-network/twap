
```console

> @defi.org/twap@0.0.1 test
> npm run test:eth && npm run test:poly


> @defi.org/twap@0.0.1 test:eth
> BLOCK=14908980 DEBUG=web3-candies hardhat test --logs

🌐 network ETH blocknumber 14908980 🌐

  Errors
    order
  web3-candies resetNetworkFork to 14908980 +0ms
  web3-candies now block 14908980 +2s
  web3-candies deploying UniswapV2Exchange +5ms
CREATE UniswapV2Exchange.constructor(_uniswap=0xf164fC0Ec4E93095b804a4795bBe1e041497b92a) => (0x74652f570B1A95235a9A054994319eeb827c5E17)
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +49ms
  web3-candies deploying TWAP +41ms
CREATE TWAP.constructor() => (0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5)
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +35ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +1ms
CALL USDC.transfer(to=[user], amount=1000000000000)
   USDC.Transfer(from=[srcTokenWhale], to=[user], value=1000000000000)
      ✓ invalid id (17ms)
  web3-candies resetNetworkFork to 14908980 +60ms
  web3-candies now block 14908980 +887ms
  web3-candies deploying UniswapV2Exchange +4ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +19ms
  web3-candies deploying TWAP +26ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +11ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
      ✓ invalid params (43ms)
  web3-candies resetNetworkFork to 14908980 +61ms
  web3-candies now block 14908980 +910ms
  web3-candies deploying UniswapV2Exchange +5ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +15ms
  web3-candies deploying TWAP +24ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +11ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL USDC.approve(spender=[TWAP], amount=5)
   USDC.Approval(owner=[user], spender=[TWAP], value=5)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=100, srcBidAmount=10, dstMinAmount=1, deadline=4294967294, delay=60)
      ✓ insufficient maker allowance (48ms)
  web3-candies resetNetworkFork to 14908980 +63ms
  web3-candies now block 14908980 +871ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +14ms
  web3-candies deploying TWAP +21ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +8ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL USDC.approve(spender=[TWAP], amount=15)
   USDC.Approval(owner=[user], spender=[TWAP], value=15)
CALL USDC.transfer(to=[taker], amount=1000000000000)
   USDC.Transfer(from=[user], to=[taker], value=1000000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=100, srcBidAmount=10, dstMinAmount=1, deadline=4294967294, delay=60)
      ✓ insufficient maker balance (68ms)
    verify bid
  web3-candies resetNetworkFork to 14908980 +79ms
  web3-candies now block 14908980 +863ms
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +13ms
  web3-candies deploying TWAP +22ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL USDC.approve(spender=[TWAP], amount=2000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=2000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1654430416, delay=60)
   TWAP.OrderCreated(maker=[user], id=0, ask=[1654430408, 1654430416, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 2000000000, 2000000000, 1000000000000000000])
  web3-candies mining 1 block and advancing time by 10 seconds +67ms
  web3-candies was: block 14908985 timestamp 2022-06-05T12:00:08.000Z now: block 14908986 timestamp 2022-06-05T12:00:18.000Z +2ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
CALL USDC.approve(spender=[TWAP], amount=2000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=2000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1654430429, delay=60)
   TWAP.OrderCreated(maker=[user], id=1, ask=[1654430421, 1654430429, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 2000000000, 2000000000, 1000000000000000000])
CALL TWAP.bid(id=1, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
   TWAP.OrderBid(taker=[taker], id=1, exchange=[UniswapV2Exchange], dstAmountOut=1107925290738887788, dstFee=10000000000000000)
      ✓ expired (191ms)
  web3-candies resetNetworkFork to 14908980 +133ms
  web3-candies now block 14908980 +886ms
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +15ms
  web3-candies deploying TWAP +20ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +8ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
  web3-candies deploying MockExchange +11ms
CREATE MockExchange.constructor() => (0xA1041132B507466bE2b840b0BdFc78CA333b5861)
  web3-candies deployed MockExchange 0xA1041132B507466bE2b840b0BdFc78CA333b5861 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +13ms
  web3-candies impersonating 0xBA12222222228d8Ba445958a75a0704d566BF2C8 +0ms
CALL WETH.transfer(to=[MockExchange], amount=10000000000000000000000)
   WETH.Transfer(from=[dstTokenWhale], to=[MockExchange], value=10000000000000000000000)
CALL MockExchange.setMockAmounts(_amounts=[0, 1000000000000000000])
  web3-candies deploying MockExchange +37ms
CREATE MockExchange.constructor() => (0xaCda8C6a10353046fC9a1a99AB4488B2f0e900ea)
  web3-candies deployed MockExchange 0xaCda8C6a10353046fC9a1a99AB4488B2f0e900ea deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +13ms
CALL USDC.approve(spender=[TWAP], amount=2000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=2000000000)
CALL TWAP.ask(exchange=[MockExchange], srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1654431410, delay=60)
   TWAP.OrderCreated(maker=[user], id=0, ask=[1654430412, 1654431410, 60, [user], [MockExchange], [USDC], [WETH], 2000000000, 2000000000, 1000000000000000000])
  web3-candies mining 1 block and advancing time by 10 seconds +56ms
  web3-candies was: block 14908989 timestamp 2022-06-05T12:00:12.000Z now: block 14908990 timestamp 2022-06-05T12:00:22.000Z +2ms
      ✓ invalid exchange (155ms)
  web3-candies resetNetworkFork to 14908980 +34ms
  web3-candies now block 14908980 +894ms
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +14ms
  web3-candies deploying TWAP +42ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +17ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +1ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1654431406, delay=60)
   TWAP.OrderCreated(maker=[user], id=0, ask=[1654430408, 1654431406, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 2000000000, 2000000000, 1000000000000000000])
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[UniswapV2Exchange], dstAmountOut=1107925290738887788, dstFee=10000000000000000)
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
CALL USDC.approve(spender=[TWAP], amount=2000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=2000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1654431410, delay=60)
   TWAP.OrderCreated(maker=[user], id=1, ask=[1654430412, 1654431410, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 2000000000, 2000000000, 1000000000000000000])
CALL TWAP.bid(id=1, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
   TWAP.OrderBid(taker=[taker], id=1, exchange=[UniswapV2Exchange], dstAmountOut=1107925290738887788, dstFee=10000000000000000)
      ✓ low bid (242ms)
  web3-candies resetNetworkFork to 14908980 +268ms
  web3-candies now block 14908980 +1s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +15ms
  web3-candies deploying TWAP +21ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +1ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=1000000000, dstMinAmount=500000000000000000, deadline=1654431406, delay=60)
   TWAP.OrderCreated(maker=[user], id=0, ask=[1654430408, 1654431406, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 2000000000, 1000000000, 500000000000000000])
  web3-candies mining 1 block and advancing time by 30 seconds +96ms
  web3-candies was: block 14908986 timestamp 2022-06-05T12:00:09.000Z now: block 14908987 timestamp 2022-06-05T12:00:39.000Z +2ms
CALL TWAP.fill(id=0)
   USDC.Transfer(from=[user], to=[TWAP], value=1000000000)
   USDC.Approval(owner=[TWAP], spender=[UniswapV2Exchange], value=1000000000)
   USDC.Transfer(from=[TWAP], to=[UniswapV2Exchange], value=1000000000)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xf164fC0Ec4E93095b804a4795bBe1e041497b92a, value=1000000000)
   USDC.Transfer(from=[UniswapV2Exchange], to=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, value=1000000000)
   WETH.Transfer(from=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, to=[TWAP], value=558969740337624487)
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000047700f75c6f70000000000000000000000000000000000000000000009533c7970e6983c7768, [0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1])
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000000003b9aca000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007c1dc046d0435a7, [0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822, 0x000000000000000000000000f164fc0ec4e93095b804a4795bbe1e041497b92a, 0x000000000000000000000000ce5c12eea2772efc7a665e7aa26c059d6fdc5de5])
   WETH.Transfer(from=[TWAP], to=[taker], value=10000000000000000)
   WETH.Transfer(from=[TWAP], to=[user], value=548969740337624487)
   TWAP.OrderFilled(taker=[taker], id=0, exchange=[UniswapV2Exchange], srcAmountIn=1000000000, dstAmountOut=548969740337624487, dstFee=10000000000000000)
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
  web3-candies mining 1 block and advancing time by 60 seconds +4s
  web3-candies was: block 14908989 timestamp 2022-06-05T12:00:44.000Z now: block 14908990 timestamp 2022-06-05T12:01:44.000Z +2ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[UniswapV2Exchange], dstAmountOut=548955529052854682, dstFee=10000000000000000)
      ✓ recently filled (3953ms)
  web3-candies resetNetworkFork to 14908980 +51ms
  web3-candies now block 14908980 +1s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +14ms
  web3-candies deploying TWAP +20ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +8ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=1000000000, dstMinAmount=500000000000000000, deadline=1654431406, delay=600)
   TWAP.OrderCreated(maker=[user], id=0, ask=[1654430408, 1654431406, 600, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 2000000000, 1000000000, 500000000000000000])
  web3-candies mining 1 block and advancing time by 30 seconds +92ms
  web3-candies was: block 14908986 timestamp 2022-06-05T12:00:09.000Z now: block 14908987 timestamp 2022-06-05T12:00:39.000Z +1ms
CALL TWAP.fill(id=0)
   USDC.Transfer(from=[user], to=[TWAP], value=1000000000)
   USDC.Approval(owner=[TWAP], spender=[UniswapV2Exchange], value=1000000000)
   USDC.Transfer(from=[TWAP], to=[UniswapV2Exchange], value=1000000000)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xf164fC0Ec4E93095b804a4795bBe1e041497b92a, value=1000000000)
   USDC.Transfer(from=[UniswapV2Exchange], to=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, value=1000000000)
   WETH.Transfer(from=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, to=[TWAP], value=558969740337624487)
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000047700f75c6f70000000000000000000000000000000000000000000009533c7970e6983c7768, [0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1])
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000000003b9aca000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007c1dc046d0435a7, [0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822, 0x000000000000000000000000f164fc0ec4e93095b804a4795bbe1e041497b92a, 0x000000000000000000000000ce5c12eea2772efc7a665e7aa26c059d6fdc5de5])
   WETH.Transfer(from=[TWAP], to=[taker], value=10000000000000000)
   WETH.Transfer(from=[TWAP], to=[user], value=548969740337624487)
   TWAP.OrderFilled(taker=[taker], id=0, exchange=[UniswapV2Exchange], srcAmountIn=1000000000, dstAmountOut=548969740337624487, dstFee=10000000000000000)
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
  web3-candies mining 1 block and advancing time by 60 seconds +163ms
  web3-candies was: block 14908989 timestamp 2022-06-05T12:00:41.000Z now: block 14908990 timestamp 2022-06-05T12:01:41.000Z +1ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
  web3-candies mining 1 block and advancing time by 600 seconds +18ms
  web3-candies was: block 14908991 timestamp 2022-06-05T12:01:42.000Z now: block 14908992 timestamp 2022-06-05T12:11:42.000Z +1ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[UniswapV2Exchange], dstAmountOut=548955529052854682, dstFee=10000000000000000)
      ✓ recently filled custom delay (309ms)
  web3-candies resetNetworkFork to 14908980 +46ms
  web3-candies now block 14908980 +855ms
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +17ms
  web3-candies deploying TWAP +22ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=1000000000, dstMinAmount=2000000000000000000, deadline=1654431406, delay=60)
   TWAP.OrderCreated(maker=[user], id=0, ask=[1654430408, 1654431406, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 2000000000, 1000000000, 2000000000000000000])
      ✓ insufficient amount out (76ms)
  web3-candies resetNetworkFork to 14908980 +92ms
  web3-candies now block 14908980 +901ms
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +13ms
  web3-candies deploying TWAP +33ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +18ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=100000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
      ✓ insufficient amount out with excess fee (70ms)
  web3-candies resetNetworkFork to 14908980 +109ms
  web3-candies now block 14908980 +899ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +15ms
  web3-candies deploying TWAP +23ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=1000000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
      ✓ fee underflow protection (65ms)
  web3-candies resetNetworkFork to 14908980 +76ms
  web3-candies now block 14908980 +908ms
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +16ms
  web3-candies deploying TWAP +21ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +1ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=1500000000, dstMinAmount=750000000000000000, deadline=1654431406, delay=60)
   TWAP.OrderCreated(maker=[user], id=0, ask=[1654430408, 1654431406, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 2000000000, 1500000000, 750000000000000000])
  web3-candies mining 1 block and advancing time by 10 seconds +95ms
  web3-candies was: block 14908986 timestamp 2022-06-05T12:00:09.000Z now: block 14908987 timestamp 2022-06-05T12:00:19.000Z +1ms
  web3-candies mining 1 block and advancing time by 60 seconds +105ms
  web3-candies was: block 14908988 timestamp 2022-06-05T12:00:20.000Z now: block 14908989 timestamp 2022-06-05T12:01:20.000Z +2ms
  web3-candies deploying MockExchange +0ms
CREATE MockExchange.constructor() => ([MockExchange])
  web3-candies deployed MockExchange 0xA1041132B507466bE2b840b0BdFc78CA333b5861 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +13ms
  web3-candies impersonating 0xBA12222222228d8Ba445958a75a0704d566BF2C8 +1ms
CALL WETH.transfer(to=[MockExchange], amount=10000000000000000000000)
   WETH.Transfer(from=[dstTokenWhale], to=[MockExchange], value=10000000000000000000000)
CALL MockExchange.setMockAmounts(_amounts=[0, 100000000000000000])
CALL TWAP.bid(id=0, exchange=[MockExchange], dstFee=10000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
      ✓ insufficient amount out when last partial fill (256ms)
  web3-candies resetNetworkFork to 14908980 +54ms
  web3-candies now block 14908980 +858ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +14ms
  web3-candies deploying TWAP +20ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +1ms
CALL USDC.approve(spender=[TWAP], amount=0)
   USDC.Approval(owner=[user], spender=[TWAP], value=0)
      ✓ insufficient user allowance (101ms)
  web3-candies resetNetworkFork to 14908980 +111ms
  web3-candies now block 14908980 +876ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +11ms
  web3-candies deploying TWAP +22ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +10ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +1ms
CALL USDC.transfer(to=[taker], amount=1000000000000)
   USDC.Transfer(from=[user], to=[taker], value=1000000000000)
      ✓ insufficient user balance (85ms)
    perform fill
  web3-candies resetNetworkFork to 14908980 +97ms
  web3-candies now block 14908980 +910ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +10ms
  web3-candies deploying TWAP +22ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +10ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
  web3-candies mining 1 block and advancing time by 10000 seconds +75ms
  web3-candies was: block 14908986 timestamp 2022-06-05T12:00:09.000Z now: block 14908987 timestamp 2022-06-05T14:46:49.000Z +1ms
      ✓ expired (77ms)
  web3-candies resetNetworkFork to 14908980 +10ms
  web3-candies now block 14908980 +844ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +13ms
  web3-candies deploying TWAP +20ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +8ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL TWAP.fill(id=0)
      ✓ invalid taker when no existing bid (45ms)
  web3-candies resetNetworkFork to 14908980 +57ms
  web3-candies now block 14908980 +894ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +14ms
  web3-candies deploying TWAP +19ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +8ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL TWAP.fill(id=0)
      ✓ invalid taker when not the winning taker (80ms)
  web3-candies resetNetworkFork to 14908980 +90ms
  web3-candies now block 14908980 +856ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +12ms
  web3-candies deploying TWAP +31ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +16ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +1ms
CALL TWAP.fill(id=0)
      ✓ pending bid when still in bidding window (93ms)
  web3-candies resetNetworkFork to 14908980 +129ms
  web3-candies now block 14908980 +932ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +15ms
  web3-candies deploying TWAP +23ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +8ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
  web3-candies deploying MockExchange +43ms
CREATE MockExchange.constructor() => ([MockExchange])
  web3-candies deployed MockExchange 0xA1041132B507466bE2b840b0BdFc78CA333b5861 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +13ms
  web3-candies impersonating 0xBA12222222228d8Ba445958a75a0704d566BF2C8 +0ms
CALL WETH.transfer(to=[MockExchange], amount=10000000000000000000000)
   WETH.Transfer(from=[dstTokenWhale], to=[MockExchange], value=10000000000000000000000)
CALL MockExchange.setMockAmounts(_amounts=[0, 1000000000000000000])
CALL TWAP.bid(id=0, exchange=[MockExchange], dstFee=10000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[MockExchange], dstAmountOut=990000000000000000, dstFee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +75ms
  web3-candies was: block 14908989 timestamp 2022-06-05T12:00:12.000Z now: block 14908990 timestamp 2022-06-05T12:00:22.000Z +1ms
CALL MockExchange.setMockAmounts(_amounts=[0, 100000000000000000])
CALL TWAP.fill(id=0)
      ✓ insufficient out (800ms)
  web3-candies resetNetworkFork to 14908980 +681ms
  web3-candies now block 14908980 +912ms
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +14ms
  web3-candies deploying TWAP +20ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +8ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
  web3-candies deploying MockExchange +41ms
  web3-candies deployed MockExchange 0xA1041132B507466bE2b840b0BdFc78CA333b5861 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +5ms
  web3-candies impersonating 0xBA12222222228d8Ba445958a75a0704d566BF2C8 +0ms
CALL TWAP.bid(id=0, exchange=[MockExchange], dstFee=100000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[MockExchange], dstAmountOut=900000000000000000, dstFee=100000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +87ms
  web3-candies was: block 14908989 timestamp 2022-06-05T12:00:12.000Z now: block 14908990 timestamp 2022-06-05T12:00:22.000Z +1ms
CALL MockExchange.setMockAmounts(_amounts=[0, 500000000000000000])
CALL TWAP.fill(id=0)
      ✓ insufficient out with excess fee (197ms)
  web3-candies resetNetworkFork to 14908980 +73ms
  web3-candies now block 14908980 +1s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +14ms
  web3-candies deploying TWAP +21ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
  web3-candies deploying MockExchange +39ms
  web3-candies deployed MockExchange 0xA1041132B507466bE2b840b0BdFc78CA333b5861 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +7ms
  web3-candies impersonating 0xBA12222222228d8Ba445958a75a0704d566BF2C8 +0ms
CALL MockExchange.setMockAmounts(_amounts=[0, 10000000000000000000])
CALL TWAP.bid(id=0, exchange=[MockExchange], dstFee=1000000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[MockExchange], dstAmountOut=9000000000000000000, dstFee=1000000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +59ms
  web3-candies was: block 14908989 timestamp 2022-06-05T12:00:12.000Z now: block 14908990 timestamp 2022-06-05T12:00:22.000Z +1ms
      ✓ fee subtracted from dstAmountOut underflow protection (155ms)
  web3-candies resetNetworkFork to 14908980 +60ms
  web3-candies now block 14908980 +910ms
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +11ms
  web3-candies deploying TWAP +20ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL USDC.approve(spender=[TWAP], amount=1000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=1000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=1000000, srcBidAmount=1000000, dstMinAmount=1000000000000000000, deadline=1654431406, delay=60)
   TWAP.OrderCreated(maker=[user], id=0, ask=[1654430408, 1654431406, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 1000000, 1000000, 1000000000000000000])
CALL TWAP.cancel(id=0)
      ✓ cancel only from maker (71ms)

  Sanity
  web3-candies resetNetworkFork to 14908980 +80ms
  web3-candies now block 14908980 +895ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +16ms
  web3-candies deploying TWAP +51ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +8ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +1ms
CALL USDC.approve(spender=[TWAP], amount=3000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=3000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=3000000, srcBidAmount=2000000, dstMinAmount=1000000000000000000, deadline=1654430506, delay=60)
   TWAP.OrderCreated(maker=[user], id=0, ask=[1654430408, 1654430506, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 3000000, 2000000, 1000000000000000000])
    ✓ maker creates ask order, emits event (62ms)
  web3-candies resetNetworkFork to 14908980 +74ms
  web3-candies now block 14908980 +873ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +12ms
  web3-candies deploying TWAP +21ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +7ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +1ms
    ✓ bid sets Bid fields (72ms)
  web3-candies resetNetworkFork to 14908980 +80ms
  web3-candies now block 14908980 +926ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +12ms
  web3-candies deploying TWAP +22ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
  web3-candies mining 1 block and advancing time by 30 seconds +74ms
  web3-candies was: block 14908986 timestamp 2022-06-05T12:00:09.000Z now: block 14908987 timestamp 2022-06-05T12:00:39.000Z +1ms
    ✓ fill sets Fill fields and clears the Bid, emits event (175ms)
  web3-candies resetNetworkFork to 14908980 +109ms
  web3-candies now block 14908980 +869ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +17ms
  web3-candies deploying TWAP +51ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +1ms
CALL TWAP.cancel(id=0)
   TWAP.OrderCanceled(sender=[user], id=0)
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
    ✓ cancel order (101ms)
  web3-candies resetNetworkFork to 14908980 +112ms
  web3-candies now block 14908980 +861ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +16ms
  web3-candies deploying TWAP +22ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
  web3-candies mining 1 block and advancing time by 10 seconds +79ms
  web3-candies was: block 14908986 timestamp 2022-06-05T12:00:09.000Z now: block 14908987 timestamp 2022-06-05T12:00:19.000Z +4ms
  web3-candies mining 1 block and advancing time by 60 seconds +102ms
  web3-candies was: block 14908988 timestamp 2022-06-05T12:00:20.000Z now: block 14908989 timestamp 2022-06-05T12:01:20.000Z +1ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[UniswapV2Exchange], dstAmountOut=548955529052854682, dstFee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +46ms
  web3-candies was: block 14908990 timestamp 2022-06-05T12:01:21.000Z now: block 14908991 timestamp 2022-06-05T12:01:31.000Z +1ms
CALL TWAP.fill(id=0)
   USDC.Transfer(from=[user], to=[TWAP], value=1000000000)
   USDC.Approval(owner=[TWAP], spender=[UniswapV2Exchange], value=1000000000)
   USDC.Transfer(from=[TWAP], to=[UniswapV2Exchange], value=1000000000)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xf164fC0Ec4E93095b804a4795bBe1e041497b92a, value=1000000000)
   USDC.Transfer(from=[UniswapV2Exchange], to=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, value=1000000000)
   WETH.Transfer(from=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, to=[TWAP], value=558955529052854682)
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000047704b1090f700000000000000000000000000000000000000000000095334b7a1cefdccddce, [0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1])
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000000003b9aca000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007c1cf179a6f999a, [0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822, 0x000000000000000000000000f164fc0ec4e93095b804a4795bbe1e041497b92a, 0x000000000000000000000000ce5c12eea2772efc7a665e7aa26c059d6fdc5de5])
   WETH.Transfer(from=[TWAP], to=[taker], value=10000000000000000)
   WETH.Transfer(from=[TWAP], to=[user], value=548955529052854682)
   TWAP.OrderFilled(taker=[taker], id=0, exchange=[UniswapV2Exchange], srcAmountIn=1000000000, dstAmountOut=548955529052854682, dstFee=10000000000000000)
   TWAP.OrderCompleted(taker=[taker], id=0)
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
    ✓ order fully filled (394ms)
    History
  web3-candies resetNetworkFork to 14908980 +171ms
  web3-candies now block 14908980 +900ms
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies deploying TWAP +20ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL USDC.approve(spender=[TWAP], amount=4000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=4000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=4000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1654431408, delay=60)
   TWAP.OrderCreated(maker=[user], id=1, ask=[1654430410, 1654431408, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 4000000000, 2000000000, 1000000000000000000])
CALL TWAP.cancel(id=1)
   TWAP.OrderCanceled(sender=[user], id=1)
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +147ms
CALL USDC.transfer(to=0x3Fc0FC5D747B7C4B969B5fF6DAE159b3FE520F59, amount=8000000000)
   USDC.Transfer(from=[srcTokenWhale], to=0x3Fc0FC5D747B7C4B969B5fF6DAE159b3FE520F59, value=8000000000)
CALL USDC.approve(spender=[TWAP], amount=8000000000)
   USDC.Approval(owner=0x3Fc0FC5D747B7C4B969B5fF6DAE159b3FE520F59, spender=[TWAP], value=8000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=8000000000, srcBidAmount=4000000000, dstMinAmount=2000000000000000000, deadline=1654431412, delay=60)
   TWAP.OrderCreated(maker=0x3Fc0FC5D747B7C4B969B5fF6DAE159b3FE520F59, id=2, ask=[1654430414, 1654431412, 60, 0x3Fc0FC5D747B7C4B969B5fF6DAE159b3FE520F59, 0x0000000000000000000000000000000000000000, [USDC], [WETH], 8000000000, 4000000000, 2000000000000000000])
CALL USDC.approve(spender=[TWAP], amount=1000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=1000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=1000000000, srcBidAmount=1000000000, dstMinAmount=500000000000000000, deadline=1654430424, delay=60)
   TWAP.OrderCreated(maker=[user], id=3, ask=[1654430416, 1654430424, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 1000000000, 1000000000, 500000000000000000])
  web3-candies mining 1 block and advancing time by 10 seconds +769ms
  web3-candies was: block 14908993 timestamp 2022-06-05T12:00:16.000Z now: block 14908994 timestamp 2022-06-05T12:00:26.000Z +1ms
      ✓ find orders for maker (230ms)

  TWAP
  web3-candies resetNetworkFork to 14908980 +231ms
  web3-candies now block 14908980 +1s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +13ms
  web3-candies deploying TWAP +20ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +7ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +1ms
  web3-candies mining 1 block and advancing time by 10 seconds +76ms
  web3-candies was: block 14908986 timestamp 2022-06-05T12:00:09.000Z now: block 14908987 timestamp 2022-06-05T12:00:19.000Z +2ms
CALL TWAP.fill(id=0)
   USDC.Transfer(from=[user], to=[TWAP], value=2000000000)
   USDC.Approval(owner=[TWAP], spender=[UniswapV2Exchange], value=2000000000)
   USDC.Transfer(from=[TWAP], to=[UniswapV2Exchange], value=2000000000)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xf164fC0Ec4E93095b804a4795bBe1e041497b92a, value=2000000000)
   USDC.Transfer(from=[UniswapV2Exchange], to=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, value=2000000000)
   WETH.Transfer(from=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, to=[TWAP], value=1117925290738887788)
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000047704b1090f700000000000000000000000000000000000000000000095334b7a1ca055600a3, [0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1])
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x0000000000000000000000000000000000000000000000000000000077359400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f83ab20ffeaac6c, [0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822, 0x000000000000000000000000f164fc0ec4e93095b804a4795bbe1e041497b92a, 0x000000000000000000000000ce5c12eea2772efc7a665e7aa26c059d6fdc5de5])
   WETH.Transfer(from=[TWAP], to=[taker], value=10000000000000000)
   WETH.Transfer(from=[TWAP], to=[user], value=1107925290738887788)
   TWAP.OrderFilled(taker=[taker], id=0, exchange=[UniswapV2Exchange], srcAmountIn=2000000000, dstAmountOut=1107925290738887788, dstFee=10000000000000000)
   TWAP.OrderCompleted(taker=[taker], id=0)
    ✓ single chunk (222ms)
  web3-candies resetNetworkFork to 14908980 +154ms
  web3-candies now block 14908980 +1s
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +12ms
  web3-candies deploying TWAP +20ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL USDC.approve(spender=[TWAP], amount=10000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=10000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=10000000000, srcBidAmount=2500000000, dstMinAmount=1250000000000000000, deadline=1654431406, delay=60)
   TWAP.OrderCreated(maker=[user], id=0, ask=[1654430408, 1654431406, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 10000000000, 2500000000, 1250000000000000000])
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[UniswapV2Exchange], dstAmountOut=1387397744882237904, dstFee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +105ms
  web3-candies was: block 14908986 timestamp 2022-06-05T12:00:09.000Z now: block 14908987 timestamp 2022-06-05T12:00:19.000Z +1ms
CALL TWAP.fill(id=0)
   USDC.Transfer(from=[user], to=[TWAP], value=2500000000)
   USDC.Approval(owner=[TWAP], spender=[UniswapV2Exchange], value=2500000000)
   USDC.Transfer(from=[TWAP], to=[UniswapV2Exchange], value=2500000000)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xf164fC0Ec4E93095b804a4795bBe1e041497b92a, value=2500000000)
   USDC.Transfer(from=[UniswapV2Exchange], to=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, value=2500000000)
   WETH.Transfer(from=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, to=[TWAP], value=1397397744882237904)
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x0000000000000000000000000000000000000000000000000000477068ddf5f700000000000000000000000000000000000000000000095330d6bf12a39d6b3f, [0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1])
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000000009502f9000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000013648dd861a341d0, [0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822, 0x000000000000000000000000f164fc0ec4e93095b804a4795bbe1e041497b92a, 0x000000000000000000000000ce5c12eea2772efc7a665e7aa26c059d6fdc5de5])
   WETH.Transfer(from=[TWAP], to=[taker], value=10000000000000000)
   WETH.Transfer(from=[TWAP], to=[user], value=1387397744882237904)
   TWAP.OrderFilled(taker=[taker], id=0, exchange=[UniswapV2Exchange], srcAmountIn=2500000000, dstAmountOut=1387397744882237904, dstFee=10000000000000000)
  web3-candies mining 1 block and advancing time by 60 seconds +189ms
  web3-candies was: block 14908988 timestamp 2022-06-05T12:00:20.000Z now: block 14908989 timestamp 2022-06-05T12:01:20.000Z +1ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[UniswapV2Exchange], dstAmountOut=1387308929430581229, dstFee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +44ms
  web3-candies was: block 14908990 timestamp 2022-06-05T12:01:21.000Z now: block 14908991 timestamp 2022-06-05T12:01:31.000Z +1ms
CALL TWAP.fill(id=0)
   USDC.Transfer(from=[user], to=[TWAP], value=2500000000)
   USDC.Approval(owner=[TWAP], spender=[UniswapV2Exchange], value=2500000000)
   USDC.Transfer(from=[TWAP], to=[UniswapV2Exchange], value=2500000000)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xf164fC0Ec4E93095b804a4795bBe1e041497b92a, value=2500000000)
   USDC.Transfer(from=[UniswapV2Exchange], to=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, value=2500000000)
   WETH.Transfer(from=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, to=[TWAP], value=1397308929430581229)
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x00000000000000000000000000000000000000000000000000004770fde0eef70000000000000000000000000000000000000000000009531d728201376c7b52, [0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1])
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000000009502f9000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000013643d116c30efed, [0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822, 0x000000000000000000000000f164fc0ec4e93095b804a4795bbe1e041497b92a, 0x000000000000000000000000ce5c12eea2772efc7a665e7aa26c059d6fdc5de5])
   WETH.Transfer(from=[TWAP], to=[taker], value=10000000000000000)
   WETH.Transfer(from=[TWAP], to=[user], value=1387308929430581229)
   TWAP.OrderFilled(taker=[taker], id=0, exchange=[UniswapV2Exchange], srcAmountIn=2500000000, dstAmountOut=1387308929430581229, dstFee=10000000000000000)
  web3-candies mining 1 block and advancing time by 60 seconds +145ms
  web3-candies was: block 14908992 timestamp 2022-06-05T12:01:32.000Z now: block 14908993 timestamp 2022-06-05T12:02:33.000Z +1ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[UniswapV2Exchange], dstAmountOut=1387220122450259929, dstFee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +44ms
  web3-candies was: block 14908994 timestamp 2022-06-05T12:02:34.000Z now: block 14908995 timestamp 2022-06-05T12:02:44.000Z +1ms
CALL TWAP.fill(id=0)
   USDC.Transfer(from=[user], to=[TWAP], value=2500000000)
   USDC.Approval(owner=[TWAP], spender=[UniswapV2Exchange], value=2500000000)
   USDC.Transfer(from=[TWAP], to=[UniswapV2Exchange], value=2500000000)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xf164fC0Ec4E93095b804a4795bBe1e041497b92a, value=2500000000)
   USDC.Transfer(from=[UniswapV2Exchange], to=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, value=2500000000)
   WETH.Transfer(from=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, to=[TWAP], value=1397220122450259929)
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x0000000000000000000000000000000000000000000000000000477192e3e7f70000000000000000000000000000000000000000000009530a0e95b4c7bf8b79, [0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1])
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000000009502f900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001363ec4c6facefd9, [0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822, 0x000000000000000000000000f164fc0ec4e93095b804a4795bbe1e041497b92a, 0x000000000000000000000000ce5c12eea2772efc7a665e7aa26c059d6fdc5de5])
   WETH.Transfer(from=[TWAP], to=[taker], value=10000000000000000)
   WETH.Transfer(from=[TWAP], to=[user], value=1387220122450259929)
   TWAP.OrderFilled(taker=[taker], id=0, exchange=[UniswapV2Exchange], srcAmountIn=2500000000, dstAmountOut=1387220122450259929, dstFee=10000000000000000)
  web3-candies mining 1 block and advancing time by 60 seconds +148ms
  web3-candies was: block 14908996 timestamp 2022-06-05T12:02:45.000Z now: block 14908997 timestamp 2022-06-05T12:03:45.000Z +1ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[UniswapV2Exchange], dstAmountOut=1387131323940196424, dstFee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +43ms
  web3-candies was: block 14908998 timestamp 2022-06-05T12:03:46.000Z now: block 14908999 timestamp 2022-06-05T12:03:56.000Z +1ms
CALL TWAP.fill(id=0)
   USDC.Transfer(from=[user], to=[TWAP], value=2500000000)
   USDC.Approval(owner=[TWAP], spender=[UniswapV2Exchange], value=2500000000)
   USDC.Transfer(from=[TWAP], to=[UniswapV2Exchange], value=2500000000)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xf164fC0Ec4E93095b804a4795bBe1e041497b92a, value=2500000000)
   USDC.Transfer(from=[UniswapV2Exchange], to=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, value=2500000000)
   WETH.Transfer(from=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, to=[TWAP], value=1397131323940196424)
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x0000000000000000000000000000000000000000000000000000477227e6e0f7000000000000000000000000000000000000000000000952f6aafa2b5bb8bb31, [0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1])
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000000009502f9000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000013639b896c06d048, [0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822, 0x000000000000000000000000f164fc0ec4e93095b804a4795bbe1e041497b92a, 0x000000000000000000000000ce5c12eea2772efc7a665e7aa26c059d6fdc5de5])
   WETH.Transfer(from=[TWAP], to=[taker], value=10000000000000000)
   WETH.Transfer(from=[TWAP], to=[user], value=1387131323940196424)
   TWAP.OrderFilled(taker=[taker], id=0, exchange=[UniswapV2Exchange], srcAmountIn=2500000000, dstAmountOut=1387131323940196424, dstFee=10000000000000000)
   TWAP.OrderCompleted(taker=[taker], id=0)
  web3-candies mining 1 block and advancing time by 60 seconds +151ms
  web3-candies was: block 14909000 timestamp 2022-06-05T12:03:57.000Z now: block 14909001 timestamp 2022-06-05T12:04:57.000Z +1ms
    ✓ mutiple chunks (875ms)
  web3-candies resetNetworkFork to 14908980 +9ms
  web3-candies now block 14908980 +890ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +14ms
  web3-candies deploying TWAP +20ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=10000000000, srcBidAmount=4000000000, dstMinAmount=2000000000000000000, deadline=1654431406, delay=60)
   TWAP.OrderCreated(maker=[user], id=0, ask=[1654430408, 1654431406, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 10000000000, 4000000000, 2000000000000000000])
  web3-candies mining 1 block and advancing time by 10 seconds +81ms
  web3-candies was: block 14908986 timestamp 2022-06-05T12:00:09.000Z now: block 14908987 timestamp 2022-06-05T12:00:19.000Z +2ms
  web3-candies mining 1 block and advancing time by 60 seconds +98ms
  web3-candies was: block 14908988 timestamp 2022-06-05T12:00:20.000Z now: block 14908989 timestamp 2022-06-05T12:01:20.000Z +1ms
  web3-candies mining 1 block and advancing time by 10 seconds +36ms
  web3-candies was: block 14908990 timestamp 2022-06-05T12:01:21.000Z now: block 14908991 timestamp 2022-06-05T12:01:31.000Z +1ms
  web3-candies mining 1 block and advancing time by 60 seconds +95ms
  web3-candies was: block 14908992 timestamp 2022-06-05T12:01:32.000Z now: block 14908993 timestamp 2022-06-05T12:02:32.000Z +1ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[UniswapV2Exchange], dstAmountOut=1107697944868251298, dstFee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +83ms
  web3-candies was: block 14908994 timestamp 2022-06-05T12:02:33.000Z now: block 14908995 timestamp 2022-06-05T12:02:43.000Z +1ms
CALL TWAP.fill(id=0)
   USDC.Transfer(from=[user], to=[TWAP], value=2000000000)
   USDC.Approval(owner=[TWAP], spender=[UniswapV2Exchange], value=2000000000)
   USDC.Transfer(from=[TWAP], to=[UniswapV2Exchange], value=2000000000)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xf164fC0Ec4E93095b804a4795bBe1e041497b92a, value=2000000000)
   USDC.Transfer(from=[UniswapV2Exchange], to=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, value=2000000000)
   WETH.Transfer(from=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, to=[TWAP], value=1117697944868251298)
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x0000000000000000000000000000000000000000000000000000477227e6e0f7000000000000000000000000000000000000000000000952f6aafa100670cfbd, [0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1])
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x0000000000000000000000000000000000000000000000000000000077359400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f82dc5bea0e66a2, [0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822, 0x000000000000000000000000f164fc0ec4e93095b804a4795bbe1e041497b92a, 0x000000000000000000000000ce5c12eea2772efc7a665e7aa26c059d6fdc5de5])
   WETH.Transfer(from=[TWAP], to=[taker], value=10000000000000000)
   WETH.Transfer(from=[TWAP], to=[user], value=1107697944868251298)
   TWAP.OrderFilled(taker=[taker], id=0, exchange=[UniswapV2Exchange], srcAmountIn=2000000000, dstAmountOut=1107697944868251298, dstFee=10000000000000000)
   TWAP.OrderCompleted(taker=[taker], id=0)
    ✓ last chunk may be partial amount (564ms)
  web3-candies resetNetworkFork to 14908980 +175ms
  web3-candies now block 14908980 +891ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +11ms
  web3-candies deploying TWAP +22ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
  web3-candies mining 1 block and advancing time by 1 seconds +71ms
  web3-candies was: block 14908986 timestamp 2022-06-05T12:00:09.000Z now: block 14908987 timestamp 2022-06-05T12:00:10.000Z +1ms
  web3-candies deploying MockExchange +0ms
CREATE MockExchange.constructor() => ([MockExchange])
  web3-candies deployed MockExchange 0xA1041132B507466bE2b840b0BdFc78CA333b5861 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +13ms
  web3-candies impersonating 0xBA12222222228d8Ba445958a75a0704d566BF2C8 +0ms
CALL WETH.transfer(to=[MockExchange], amount=10000000000000000000000)
   WETH.Transfer(from=[dstTokenWhale], to=[MockExchange], value=10000000000000000000000)
CALL MockExchange.setMockAmounts(_amounts=[0, 600000000000000000])
CALL TWAP.bid(id=0, exchange=[MockExchange], dstFee=10000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[MockExchange], dstAmountOut=590000000000000000, dstFee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +72ms
  web3-candies was: block 14908991 timestamp 2022-06-05T12:00:14.000Z now: block 14908992 timestamp 2022-06-05T12:00:24.000Z +1ms
CALL TWAP.fill(id=0)
   USDC.Transfer(from=[user], to=[TWAP], value=1000000000)
   USDC.Approval(owner=[TWAP], spender=[MockExchange], value=1000000000)
   USDC.Transfer(from=[TWAP], to=[MockExchange], value=1000000000)
   WETH.Transfer(from=[MockExchange], to=[TWAP], value=600000000000000000)
   WETH.Transfer(from=[TWAP], to=[taker], value=10000000000000000)
   WETH.Transfer(from=[TWAP], to=[user], value=590000000000000000)
   TWAP.OrderFilled(taker=[taker], id=0, exchange=[MockExchange], srcAmountIn=1000000000, dstAmountOut=590000000000000000, dstFee=10000000000000000)
    ✓ outbid current bid within pending period (246ms)
  web3-candies resetNetworkFork to 14908980 +97ms
  web3-candies now block 14908980 +868ms
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +13ms
  web3-candies deploying TWAP +19ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
  web3-candies mining 1 block and advancing time by 1 seconds +77ms
  web3-candies was: block 14908986 timestamp 2022-06-05T12:00:09.000Z now: block 14908987 timestamp 2022-06-05T12:00:10.000Z +1ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=1000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
   TWAP.OrderBid(taker=0x56C037B948a812C5A0Ad9cCc122F5015EF928F27, id=0, exchange=[UniswapV2Exchange], dstAmountOut=557969740337624487, dstFee=1000000000000000)
    ✓ outbid current bid within pending period same path and amount but lower fee (129ms)
  web3-candies resetNetworkFork to 14908980 +61ms
  web3-candies now block 14908980 +938ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +12ms
  web3-candies deploying TWAP +54ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +10ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
  web3-candies mining 1 block and advancing time by 58 seconds +74ms
  web3-candies was: block 14908986 timestamp 2022-06-05T12:00:09.000Z now: block 14908987 timestamp 2022-06-05T12:01:07.000Z +1ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
  web3-candies mining 1 block and advancing time by 1 seconds +33ms
  web3-candies was: block 14908988 timestamp 2022-06-05T12:01:08.000Z now: block 14908989 timestamp 2022-06-05T12:01:09.000Z +2ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[UniswapV2Exchange], dstAmountOut=548969740337624487, dstFee=10000000000000000)
    ✓ clears stale unfilled bid after max bidding window (145ms)
  web3-candies resetNetworkFork to 14908980 +45ms
  web3-candies now block 14908980 +888ms
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +12ms
  web3-candies deploying TWAP +21ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=1000000000, dstMinAmount=1000000000000, deadline=1654431406, delay=60)
   TWAP.OrderCreated(maker=[user], id=0, ask=[1654430408, 1654431406, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 2000000000, 1000000000, 1000000000000])
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=400000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[UniswapV2Exchange], dstAmountOut=158969740337624487, dstFee=400000000000000000)
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=300000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[UniswapV2Exchange], dstAmountOut=258969740337624487, dstFee=300000000000000000)
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=100000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[UniswapV2Exchange], dstAmountOut=458969740337624487, dstFee=100000000000000000)
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[UniswapV2Exchange], dstAmountOut=548969740337624487, dstFee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +225ms
  web3-candies was: block 14908989 timestamp 2022-06-05T12:00:12.000Z now: block 14908990 timestamp 2022-06-05T12:00:22.000Z +1ms
CALL TWAP.fill(id=0)
   USDC.Transfer(from=[user], to=[TWAP], value=1000000000)
   USDC.Approval(owner=[TWAP], spender=[UniswapV2Exchange], value=1000000000)
   USDC.Transfer(from=[TWAP], to=[UniswapV2Exchange], value=1000000000)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xf164fC0Ec4E93095b804a4795bBe1e041497b92a, value=1000000000)
   USDC.Transfer(from=[UniswapV2Exchange], to=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, value=1000000000)
   WETH.Transfer(from=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, to=[TWAP], value=558969740337624487)
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000047700f75c6f70000000000000000000000000000000000000000000009533c7970e6983c7768, [0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1])
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000000003b9aca000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007c1dc046d0435a7, [0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822, 0x000000000000000000000000f164fc0ec4e93095b804a4795bbe1e041497b92a, 0x000000000000000000000000ce5c12eea2772efc7a665e7aa26c059d6fdc5de5])
   WETH.Transfer(from=[TWAP], to=[taker], value=10000000000000000)
   WETH.Transfer(from=[TWAP], to=[user], value=548969740337624487)
   TWAP.OrderFilled(taker=[taker], id=0, exchange=[UniswapV2Exchange], srcAmountIn=1000000000, dstAmountOut=548969740337624487, dstFee=10000000000000000)
    ✓ supports market orders, english auction incentivizes best competitive price (365ms)
    prune stale invalid order
  web3-candies resetNetworkFork to 14908980 +147ms
  web3-candies now block 14908980 +895ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +12ms
  web3-candies deploying TWAP +18ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +10ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL TWAP.prune(id=0)
CALL USDC.approve(spender=[TWAP], amount=0)
   USDC.Approval(owner=[user], spender=[TWAP], value=0)
CALL TWAP.prune(id=0)
   TWAP.OrderCanceled(sender=[deployer], id=0)
      ✓ when no approval (146ms)
  web3-candies resetNetworkFork to 14908980 +156ms
  web3-candies now block 14908980 +1s
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +13ms
  web3-candies deploying TWAP +20ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +1ms
CALL USDC.transfer(to=[deployer], amount=1000000000000)
   USDC.Transfer(from=[user], to=[deployer], value=1000000000000)
CALL TWAP.prune(id=0)
   TWAP.OrderCanceled(sender=[deployer], id=0)
      ✓ when no balance (504ms)

·-----------------------------------|---------------------------|-------------|-----------------------------·
|       Solc version: 0.8.10        ·  Optimizer enabled: true  ·  Runs: 200  ·  Block limit: 10000000 gas  │
····································|···························|·············|······························
|  Methods                          ·               6 gwei/gas                ·       1612.79 usd/eth       │
·················|··················|·············|·············|·············|···············|··············
|  Contract      ·  Method          ·  Min        ·  Max        ·  Avg        ·  # calls      ·  usd (avg)  │
·················|··················|·············|·············|·············|···············|··············
|  ERC20         ·  approve         ·      38027  ·      59975  ·      57222  ·           43  ·       0.55  │
·················|··················|·············|·············|·············|···············|··············
|  ERC20         ·  transfer        ·      51618  ·      65625  ·      63574  ·           48  ·       0.62  │
·················|··················|·············|·············|·············|···············|··············
|  MockExchange  ·  setMockAmounts  ·      32211  ·      69211  ·      56878  ·            9  ·       0.55  │
·················|··················|·············|·············|·············|···············|··············
|  TWAP          ·  ask             ·     236196  ·     287696  ·     264047  ·           39  ·       2.56  │
·················|··················|·············|·············|·············|···············|··············
|  TWAP          ·  bid             ·     114785  ·     294032  ·     264425  ·           36  ·       2.56  │
·················|··················|·············|·············|·············|···············|··············
|  TWAP          ·  cancel          ·      73135  ·      90173  ·      81654  ·            2  ·       0.79  │
·················|··················|·············|·············|·············|···············|··············
|  TWAP          ·  fill            ·     287835  ·     361909  ·     334110  ·           16  ·       3.23  │
·················|··················|·············|·············|·············|···············|··············
|  TWAP          ·  prune           ·      79247  ·     107699  ·      96898  ·            3  ·       0.94  │
·················|··················|·············|·············|·············|···············|··············
|  Deployments                      ·                                         ·  % of limit   ·             │
····································|·············|·············|·············|···············|··············
|  MockExchange                     ·          -  ·          -  ·     543346  ·        5.4 %  ·       5.26  │
····································|·············|·············|·············|···············|··············
|  TWAP                             ·          -  ·          -  ·    2522109  ·       25.2 %  ·      24.41  │
····································|·············|·············|·············|···············|··············
|  UniswapV2Exchange                ·          -  ·          -  ·     646460  ·        6.5 %  ·       6.26  │
·-----------------------------------|-------------|-------------|-------------|---------------|-------------·

  38 passing (52s)


> @defi.org/twap@0.0.1 test:poly
> NETWORK=POLY BLOCK=29194866 DEBUG=web3-candies hardhat test --logs

🌐 network POLY blocknumber 29194866 🌐

  Errors
    order
  web3-candies resetNetworkFork to 29194866 +0ms
  web3-candies now block 29194866 +5s
  web3-candies deploying UniswapV2Exchange +5ms
CREATE UniswapV2Exchange.constructor(_uniswap=0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff) => (0x74652f570B1A95235a9A054994319eeb827c5E17)
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +769ms
  web3-candies deploying TWAP +2s
CREATE TWAP.constructor() => (0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5)
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +257ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL USDC.transfer(to=[user], amount=1000000000000)
   USDC.Transfer(from=[srcTokenWhale], to=[user], value=1000000000000)
      ✓ invalid id (22ms)
  web3-candies resetNetworkFork to 29194866 +1s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +4ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +412ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +217ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
      ✓ invalid params (59ms)
  web3-candies resetNetworkFork to 29194866 +1s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +4ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +435ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +258ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +0ms
CALL USDC.approve(spender=[TWAP], amount=5)
   USDC.Approval(owner=[user], spender=[TWAP], value=5)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=100, srcBidAmount=10, dstMinAmount=1, deadline=4294967294, delay=60)
      ✓ insufficient maker allowance (476ms)
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +4ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +461ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +204ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL USDC.approve(spender=[TWAP], amount=15)
   USDC.Approval(owner=[user], spender=[TWAP], value=15)
CALL USDC.transfer(to=[taker], amount=1000000000000)
   USDC.Transfer(from=[user], to=[taker], value=1000000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=100, srcBidAmount=10, dstMinAmount=1, deadline=4294967294, delay=60)
      ✓ insufficient maker balance (885ms)
    verify bid
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +1s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +446ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +239ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL USDC.approve(spender=[TWAP], amount=2000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=2000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1654430414, delay=60)
   TWAP.OrderCreated(maker=[user], id=0, ask=[1654430409, 1654430414, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 2000000000, 2000000000, 1000000000000000000])
  web3-candies mining 1 block and advancing time by 10 seconds +4s
  web3-candies was: block 29194871 timestamp 2022-06-05T12:00:09.000Z now: block 29194872 timestamp 2022-06-05T12:00:19.000Z +2ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619)
CALL USDC.approve(spender=[TWAP], amount=2000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=2000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1654430430, delay=60)
   TWAP.OrderCreated(maker=[user], id=1, ask=[1654430422, 1654430430, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 2000000000, 2000000000, 1000000000000000000])
CALL TWAP.bid(id=1, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619)
   TWAP.OrderBid(taker=[taker], id=1, exchange=[UniswapV2Exchange], dstAmountOut=1108103577899766128, dstFee=10000000000000000)
      ✓ expired (604ms)
  web3-candies resetNetworkFork to 29194866 +128ms
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +424ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +277ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +0ms
  web3-candies deploying MockExchange +1s
CREATE MockExchange.constructor() => (0xA1041132B507466bE2b840b0BdFc78CA333b5861)
  web3-candies deployed MockExchange 0xA1041132B507466bE2b840b0BdFc78CA333b5861 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +236ms
  web3-candies impersonating 0x72A53cDBBcc1b9efa39c834A540550e23463AAcB +0ms
CALL WETH.transfer(to=[MockExchange], amount=10000000000000000000000)
   WETH.Transfer(from=[dstTokenWhale], to=[MockExchange], value=10000000000000000000000)
CALL MockExchange.setMockAmounts(_amounts=[0, 1000000000000000000])
  web3-candies deploying MockExchange +757ms
CREATE MockExchange.constructor() => (0xaCda8C6a10353046fC9a1a99AB4488B2f0e900ea)
  web3-candies deployed MockExchange 0xaCda8C6a10353046fC9a1a99AB4488B2f0e900ea deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +240ms
CALL USDC.approve(spender=[TWAP], amount=2000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=2000000000)
CALL TWAP.ask(exchange=[MockExchange], srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1654431408, delay=60)
   TWAP.OrderCreated(maker=[user], id=0, ask=[1654430410, 1654431408, 60, [user], [MockExchange], [USDC], [WETH], 2000000000, 2000000000, 1000000000000000000])
  web3-candies mining 1 block and advancing time by 10 seconds +484ms
  web3-candies was: block 29194875 timestamp 2022-06-05T12:00:10.000Z now: block 29194876 timestamp 2022-06-05T12:00:20.000Z +2ms
      ✓ invalid exchange (1753ms)
  web3-candies resetNetworkFork to 29194866 +34ms
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +439ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +217ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +0ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1654431405, delay=60)
   TWAP.OrderCreated(maker=[user], id=0, ask=[1654430407, 1654431405, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 2000000000, 2000000000, 1000000000000000000])
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[UniswapV2Exchange], dstAmountOut=1108103577899766128, dstFee=10000000000000000)
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619)
CALL USDC.approve(spender=[TWAP], amount=2000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=2000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1654431409, delay=60)
   TWAP.OrderCreated(maker=[user], id=1, ask=[1654430411, 1654431409, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 2000000000, 2000000000, 1000000000000000000])
CALL TWAP.bid(id=1, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619)
   TWAP.OrderBid(taker=[taker], id=1, exchange=[UniswapV2Exchange], dstAmountOut=1108103577899766128, dstFee=10000000000000000)
      ✓ low bid (706ms)
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +9ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +441ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +216ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +0ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=1000000000, dstMinAmount=500000000000000000, deadline=1654431405, delay=60)
   TWAP.OrderCreated(maker=[user], id=0, ask=[1654430407, 1654431405, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 2000000000, 1000000000, 500000000000000000])
  web3-candies mining 1 block and advancing time by 30 seconds +2s
  web3-candies was: block 29194872 timestamp 2022-06-05T12:00:08.000Z now: block 29194873 timestamp 2022-06-05T12:00:38.000Z +2ms
CALL TWAP.fill(id=0)
   USDC.Transfer(from=[user], to=[TWAP], value=1000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=1000000000)
   USDC.Approval(owner=[TWAP], spender=[UniswapV2Exchange], value=1000000000)
   USDC.Transfer(from=[TWAP], to=[UniswapV2Exchange], value=1000000000)
   USDC.Approval(owner=[TWAP], spender=[UniswapV2Exchange], value=0)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff, value=1000000000)
   USDC.Transfer(from=[UniswapV2Exchange], to=0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d, value=1000000000)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff, value=0)
   WETH.Transfer(from=0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d, to=[TWAP], value=559082872850656255)
   <UnknownContract 0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d>.UnknownEvent(0x0000000000000000000000000000000000000000000000000000104ef4b8fa1f00000000000000000000000000000000000000000000022110d10a74d0ef409f, [0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1])
   <UnknownContract 0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d>.UnknownEvent(0x000000000000000000000000000000000000000000000000000000003b9aca000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007c242e92444abff, [0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822, 0x000000000000000000000000a5e0829caced8ffdd4de3c43696c57f7d7a678ff, 0x000000000000000000000000ce5c12eea2772efc7a665e7aa26c059d6fdc5de5])
   WETH.Transfer(from=[TWAP], to=[taker], value=10000000000000000)
   WETH.Transfer(from=[TWAP], to=[user], value=549082872850656255)
   TWAP.OrderFilled(taker=[taker], id=0, exchange=[UniswapV2Exchange], srcAmountIn=1000000000, dstAmountOut=549082872850656255, dstFee=10000000000000000)
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619)
  web3-candies mining 1 block and advancing time by 60 seconds +4s
  web3-candies was: block 29194875 timestamp 2022-06-05T12:00:43.000Z now: block 29194876 timestamp 2022-06-05T12:01:43.000Z +1ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[UniswapV2Exchange], dstAmountOut=549020611527226722, dstFee=10000000000000000)
      ✓ recently filled (4701ms)
  web3-candies resetNetworkFork to 29194866 +45ms
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +400ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +254ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=1000000000, dstMinAmount=500000000000000000, deadline=1654431405, delay=600)
   TWAP.OrderCreated(maker=[user], id=0, ask=[1654430407, 1654431405, 600, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 2000000000, 1000000000, 500000000000000000])
  web3-candies mining 1 block and advancing time by 30 seconds +2s
  web3-candies was: block 29194872 timestamp 2022-06-05T12:00:08.000Z now: block 29194873 timestamp 2022-06-05T12:00:38.000Z +2ms
  web3-candies mining 1 block and advancing time by 60 seconds +4s
  web3-candies was: block 29194875 timestamp 2022-06-05T12:00:42.000Z now: block 29194876 timestamp 2022-06-05T12:01:42.000Z +2ms
  web3-candies mining 1 block and advancing time by 600 seconds +13ms
  web3-candies was: block 29194877 timestamp 2022-06-05T12:01:43.000Z now: block 29194878 timestamp 2022-06-05T12:11:43.000Z +1ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[UniswapV2Exchange], dstAmountOut=549020611527226722, dstFee=10000000000000000)
      ✓ recently filled custom delay (4148ms)
  web3-candies resetNetworkFork to 29194866 +47ms
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +397ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +211ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +0ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=1000000000, dstMinAmount=2000000000000000000, deadline=1654431404, delay=60)
   TWAP.OrderCreated(maker=[user], id=0, ask=[1654430406, 1654431404, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 2000000000, 1000000000, 2000000000000000000])
      ✓ insufficient amount out (449ms)
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +448ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +238ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +0ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=1000000000, dstMinAmount=500000000000000000, deadline=1654431404, delay=60)
   TWAP.OrderCreated(maker=[user], id=0, ask=[1654430407, 1654431404, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 2000000000, 1000000000, 500000000000000000])
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=100000000000000000, data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619)
      ✓ insufficient amount out with excess fee (465ms)
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +712ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +225ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=1000000000000000000, data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619)
      ✓ fee underflow protection (582ms)
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +435ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +254ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +0ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=1500000000, dstMinAmount=750000000000000000, deadline=1654431405, delay=60)
   TWAP.OrderCreated(maker=[user], id=0, ask=[1654430407, 1654431405, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 2000000000, 1500000000, 750000000000000000])
  web3-candies mining 1 block and advancing time by 10 seconds +2s
  web3-candies was: block 29194872 timestamp 2022-06-05T12:00:08.000Z now: block 29194873 timestamp 2022-06-05T12:00:18.000Z +1ms
  web3-candies mining 1 block and advancing time by 60 seconds +5s
  web3-candies was: block 29194874 timestamp 2022-06-05T12:00:19.000Z now: block 29194875 timestamp 2022-06-05T12:01:24.000Z +2ms
  web3-candies deploying MockExchange +0ms
CREATE MockExchange.constructor() => ([MockExchange])
  web3-candies deployed MockExchange 0xA1041132B507466bE2b840b0BdFc78CA333b5861 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +276ms
  web3-candies impersonating 0x72A53cDBBcc1b9efa39c834A540550e23463AAcB +0ms
CALL WETH.transfer(to=[MockExchange], amount=10000000000000000000000)
   WETH.Transfer(from=[dstTokenWhale], to=[MockExchange], value=10000000000000000000000)
CALL MockExchange.setMockAmounts(_amounts=[0, 100000000000000000])
CALL TWAP.bid(id=0, exchange=[MockExchange], dstFee=10000000000000000, data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619)
      ✓ insufficient amount out when last partial fill (6594ms)
  web3-candies resetNetworkFork to 29194866 +1s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +480ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +225ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL USDC.approve(spender=[TWAP], amount=0)
   USDC.Approval(owner=[user], spender=[TWAP], value=0)
      ✓ insufficient user allowance (548ms)
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +433ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +237ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1654431404, delay=60)
   TWAP.OrderCreated(maker=[user], id=0, ask=[1654430406, 1654431404, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 2000000000, 2000000000, 1000000000000000000])
CALL USDC.transfer(to=[taker], amount=1000000000000)
   USDC.Transfer(from=[user], to=[taker], value=1000000000000)
      ✓ insufficient user balance (909ms)
    perform fill
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +7ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +415ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +309ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
  web3-candies mining 1 block and advancing time by 10000 seconds +2s
  web3-candies was: block 29194872 timestamp 2022-06-05T12:00:08.000Z now: block 29194873 timestamp 2022-06-05T14:46:48.000Z +3ms
      ✓ expired (509ms)
  web3-candies resetNetworkFork to 29194866 +25ms
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +390ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +219ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL TWAP.fill(id=0)
      ✓ invalid taker when no existing bid (455ms)
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +393ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +225ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +0ms
CALL TWAP.fill(id=0)
      ✓ invalid taker when not the winning taker (507ms)
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +430ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +224ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL TWAP.fill(id=0)
      ✓ pending bid when still in bidding window (489ms)
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +4ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +524ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +228ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +0ms
  web3-candies deploying MockExchange +2s
CREATE MockExchange.constructor() => ([MockExchange])
  web3-candies deployed MockExchange 0xA1041132B507466bE2b840b0BdFc78CA333b5861 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +229ms
  web3-candies impersonating 0x72A53cDBBcc1b9efa39c834A540550e23463AAcB +1ms
CALL WETH.transfer(to=[MockExchange], amount=10000000000000000000000)
   WETH.Transfer(from=[dstTokenWhale], to=[MockExchange], value=10000000000000000000000)
CALL MockExchange.setMockAmounts(_amounts=[0, 1000000000000000000])
CALL TWAP.bid(id=0, exchange=[MockExchange], dstFee=10000000000000000, data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[MockExchange], dstAmountOut=990000000000000000, dstFee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +926ms
  web3-candies was: block 29194875 timestamp 2022-06-05T12:00:11.000Z now: block 29194876 timestamp 2022-06-05T12:00:21.000Z +2ms
CALL MockExchange.setMockAmounts(_amounts=[0, 100000000000000000])
CALL TWAP.fill(id=0)
      ✓ insufficient out (3408ms)
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +10ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +496ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +342ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
  web3-candies deploying MockExchange +2s
  web3-candies deployed MockExchange 0xA1041132B507466bE2b840b0BdFc78CA333b5861 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +220ms
  web3-candies impersonating 0x72A53cDBBcc1b9efa39c834A540550e23463AAcB +1ms
CALL TWAP.bid(id=0, exchange=[MockExchange], dstFee=100000000000000000, data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[MockExchange], dstAmountOut=900000000000000000, dstFee=100000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +659ms
  web3-candies was: block 29194875 timestamp 2022-06-05T12:00:10.000Z now: block 29194876 timestamp 2022-06-05T12:00:20.000Z +1ms
CALL MockExchange.setMockAmounts(_amounts=[0, 500000000000000000])
      ✓ insufficient out with excess fee (2807ms)
  web3-candies resetNetworkFork to 29194866 +1s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +456ms
  web3-candies deploying TWAP +3s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +276ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +0ms
  web3-candies deploying MockExchange +2s
  web3-candies deployed MockExchange 0xA1041132B507466bE2b840b0BdFc78CA333b5861 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +242ms
  web3-candies impersonating 0x72A53cDBBcc1b9efa39c834A540550e23463AAcB +1ms
CALL MockExchange.setMockAmounts(_amounts=[0, 10000000000000000000])
CALL TWAP.bid(id=0, exchange=[MockExchange], dstFee=1000000000000000000, data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[MockExchange], dstAmountOut=9000000000000000000, dstFee=1000000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +662ms
  web3-candies was: block 29194875 timestamp 2022-06-05T12:00:11.000Z now: block 29194876 timestamp 2022-06-05T12:00:21.000Z +2ms
      ✓ fee subtracted from dstAmountOut underflow protection (2406ms)
  web3-candies resetNetworkFork to 29194866 +1s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +7ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +412ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +211ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL USDC.approve(spender=[TWAP], amount=1000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=1000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=1000000, srcBidAmount=1000000, dstMinAmount=1000000000000000000, deadline=1654431404, delay=60)
   TWAP.OrderCreated(maker=[user], id=0, ask=[1654430406, 1654431404, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 1000000, 1000000, 1000000000000000000])
CALL TWAP.cancel(id=0)
      ✓ cancel only from maker (530ms)

  Sanity
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +4ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +396ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +200ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL USDC.approve(spender=[TWAP], amount=3000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=3000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=3000000, srcBidAmount=2000000, dstMinAmount=1000000000000000000, deadline=1654430504, delay=60)
   TWAP.OrderCreated(maker=[user], id=0, ask=[1654430406, 1654430504, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 3000000, 2000000, 1000000000000000000])
    ✓ maker creates ask order, emits event (453ms)
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +4ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +642ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +222ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
    ✓ bid sets Bid fields (472ms)
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +4ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +401ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +211ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
  web3-candies mining 1 block and advancing time by 30 seconds +2s
  web3-candies was: block 29194872 timestamp 2022-06-05T12:00:08.000Z now: block 29194873 timestamp 2022-06-05T12:00:38.000Z +2ms
    ✓ fill sets Fill fields and clears the Bid, emits event (3907ms)
  web3-candies resetNetworkFork to 29194866 +3s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +401ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +233ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +2ms
CALL TWAP.cancel(id=0)
   TWAP.OrderCanceled(sender=[user], id=0)
    ✓ cancel order (457ms)
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +665ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +225ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
  web3-candies mining 1 block and advancing time by 10 seconds +2s
  web3-candies was: block 29194872 timestamp 2022-06-05T12:00:08.000Z now: block 29194873 timestamp 2022-06-05T12:00:18.000Z +2ms
  web3-candies mining 1 block and advancing time by 60 seconds +3s
  web3-candies was: block 29194874 timestamp 2022-06-05T12:00:19.000Z now: block 29194875 timestamp 2022-06-05T12:01:23.000Z +2ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[UniswapV2Exchange], dstAmountOut=549020611527226722, dstFee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +55ms
  web3-candies was: block 29194876 timestamp 2022-06-05T12:01:24.000Z now: block 29194877 timestamp 2022-06-05T12:01:34.000Z +1ms
CALL TWAP.fill(id=0)
   USDC.Transfer(from=[user], to=[TWAP], value=1000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=0)
   USDC.Approval(owner=[TWAP], spender=[UniswapV2Exchange], value=1000000000)
   USDC.Transfer(from=[TWAP], to=[UniswapV2Exchange], value=1000000000)
   USDC.Approval(owner=[TWAP], spender=[UniswapV2Exchange], value=0)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff, value=1000000000)
   USDC.Transfer(from=[UniswapV2Exchange], to=0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d, value=1000000000)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff, value=0)
   WETH.Transfer(from=0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d, to=[TWAP], value=559020611527226722)
   <UnknownContract 0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d>.UnknownEvent(0x0000000000000000000000000000000000000000000000000000104f3053c41f000000000000000000000000000000000000000000000221090f002c04bb8b3d, [0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1])
   <UnknownContract 0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d>.UnknownEvent(0x000000000000000000000000000000000000000000000000000000003b9aca000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007c20a48cc33b562, [0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822, 0x000000000000000000000000a5e0829caced8ffdd4de3c43696c57f7d7a678ff, 0x000000000000000000000000ce5c12eea2772efc7a665e7aa26c059d6fdc5de5])
   WETH.Transfer(from=[TWAP], to=[taker], value=10000000000000000)
   WETH.Transfer(from=[TWAP], to=[user], value=549020611527226722)
   TWAP.OrderFilled(taker=[taker], id=0, exchange=[UniswapV2Exchange], srcAmountIn=1000000000, dstAmountOut=549020611527226722, dstFee=10000000000000000)
   TWAP.OrderCompleted(taker=[taker], id=0)
    ✓ order fully filled (4165ms)
    History
  web3-candies resetNetworkFork to 29194866 +227ms
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +4ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +378ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +289ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL USDC.approve(spender=[TWAP], amount=4000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=4000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=4000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1654431406, delay=60)
   TWAP.OrderCreated(maker=[user], id=1, ask=[1654430408, 1654431406, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 4000000000, 2000000000, 1000000000000000000])
CALL TWAP.cancel(id=1)
   TWAP.OrderCanceled(sender=[user], id=1)
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +2s
CALL USDC.transfer(to=0x3Fc0FC5D747B7C4B969B5fF6DAE159b3FE520F59, amount=8000000000)
   USDC.Transfer(from=[srcTokenWhale], to=0x3Fc0FC5D747B7C4B969B5fF6DAE159b3FE520F59, value=8000000000)
CALL USDC.approve(spender=[TWAP], amount=8000000000)
   USDC.Approval(owner=0x3Fc0FC5D747B7C4B969B5fF6DAE159b3FE520F59, spender=[TWAP], value=8000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=8000000000, srcBidAmount=4000000000, dstMinAmount=2000000000000000000, deadline=1654431410, delay=60)
   TWAP.OrderCreated(maker=0x3Fc0FC5D747B7C4B969B5fF6DAE159b3FE520F59, id=2, ask=[1654430412, 1654431410, 60, 0x3Fc0FC5D747B7C4B969B5fF6DAE159b3FE520F59, 0x0000000000000000000000000000000000000000, [USDC], [WETH], 8000000000, 4000000000, 2000000000000000000])
CALL USDC.approve(spender=[TWAP], amount=1000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=1000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=1000000000, srcBidAmount=1000000000, dstMinAmount=500000000000000000, deadline=1654430422, delay=60)
   TWAP.OrderCreated(maker=[user], id=3, ask=[1654430414, 1654430422, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 1000000000, 1000000000, 500000000000000000])
  web3-candies mining 1 block and advancing time by 10 seconds +742ms
  web3-candies was: block 29194879 timestamp 2022-06-05T12:00:14.000Z now: block 29194880 timestamp 2022-06-05T12:00:24.000Z +1ms
      ✓ find orders for maker (249ms)

  TWAP
  web3-candies resetNetworkFork to 29194866 +250ms
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +7ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +427ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +227ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
  web3-candies mining 1 block and advancing time by 10 seconds +2s
  web3-candies was: block 29194872 timestamp 2022-06-05T12:00:07.000Z now: block 29194873 timestamp 2022-06-05T12:00:17.000Z +2ms
    ✓ single chunk (3921ms)
  web3-candies resetNetworkFork to 29194866 +3s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +389ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +205ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL USDC.approve(spender=[TWAP], amount=10000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=10000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=10000000000, srcBidAmount=2500000000, dstMinAmount=1250000000000000000, deadline=1654431404, delay=60)
   TWAP.OrderCreated(maker=[user], id=0, ask=[1654430406, 1654431404, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 10000000000, 2500000000, 1250000000000000000])
  web3-candies mining 1 block and advancing time by 10 seconds +2s
  web3-candies was: block 29194872 timestamp 2022-06-05T12:00:07.000Z now: block 29194873 timestamp 2022-06-05T12:00:17.000Z +1ms
  web3-candies mining 1 block and advancing time by 60 seconds +4s
  web3-candies was: block 29194874 timestamp 2022-06-05T12:00:18.000Z now: block 29194875 timestamp 2022-06-05T12:01:22.000Z +1ms
  web3-candies mining 1 block and advancing time by 10 seconds +37ms
  web3-candies was: block 29194876 timestamp 2022-06-05T12:01:23.000Z now: block 29194877 timestamp 2022-06-05T12:01:33.000Z +1ms
  web3-candies mining 1 block and advancing time by 60 seconds +139ms
  web3-candies was: block 29194878 timestamp 2022-06-05T12:01:34.000Z now: block 29194879 timestamp 2022-06-05T12:02:34.000Z +4ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[UniswapV2Exchange], dstAmountOut=1386812711570200244, dstFee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +73ms
  web3-candies was: block 29194880 timestamp 2022-06-05T12:02:35.000Z now: block 29194881 timestamp 2022-06-05T12:02:45.000Z +2ms
CALL TWAP.fill(id=0)
   USDC.Transfer(from=[user], to=[TWAP], value=2500000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=2500000000)
   USDC.Approval(owner=[TWAP], spender=[UniswapV2Exchange], value=2500000000)
   USDC.Transfer(from=[TWAP], to=[UniswapV2Exchange], value=2500000000)
   USDC.Approval(owner=[TWAP], spender=[UniswapV2Exchange], value=0)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff, value=2500000000)
   USDC.Transfer(from=[UniswapV2Exchange], to=0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d, value=2500000000)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff, value=0)
   WETH.Transfer(from=0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d, to=[TWAP], value=1396812711570200244)
   <UnknownContract 0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d>.UnknownEvent(0x0000000000000000000000000000000000000000000000000000105078271b1f000000000000000000000000000000000000000000000220de67bae723d2f07e, [0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1])
   <UnknownContract 0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d>.UnknownEvent(0x000000000000000000000000000000000000000000000000000000009502f90000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000136279c2b2e456b4, [0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822, 0x000000000000000000000000a5e0829caced8ffdd4de3c43696c57f7d7a678ff, 0x000000000000000000000000ce5c12eea2772efc7a665e7aa26c059d6fdc5de5])
   WETH.Transfer(from=[TWAP], to=[taker], value=10000000000000000)
   WETH.Transfer(from=[TWAP], to=[user], value=1386812711570200244)
   TWAP.OrderFilled(taker=[taker], id=0, exchange=[UniswapV2Exchange], srcAmountIn=2500000000, dstAmountOut=1386812711570200244, dstFee=10000000000000000)
  web3-candies mining 1 block and advancing time by 60 seconds +168ms
  web3-candies was: block 29194882 timestamp 2022-06-05T12:02:46.000Z now: block 29194883 timestamp 2022-06-05T12:03:46.000Z +1ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[UniswapV2Exchange], dstAmountOut=1386424000641915228, dstFee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +46ms
  web3-candies was: block 29194884 timestamp 2022-06-05T12:03:47.000Z now: block 29194885 timestamp 2022-06-05T12:03:57.000Z +2ms
CALL TWAP.fill(id=0)
   USDC.Transfer(from=[user], to=[TWAP], value=2500000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=0)
   USDC.Approval(owner=[TWAP], spender=[UniswapV2Exchange], value=2500000000)
   USDC.Transfer(from=[TWAP], to=[UniswapV2Exchange], value=2500000000)
   USDC.Approval(owner=[TWAP], spender=[UniswapV2Exchange], value=0)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff, value=2500000000)
   USDC.Transfer(from=[UniswapV2Exchange], to=0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d, value=2500000000)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff, value=0)
   WETH.Transfer(from=0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d, to=[TWAP], value=1396424000641915228)
   <UnknownContract 0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d>.UnknownEvent(0x000000000000000000000000000000000000000000000000000010510d2a141f000000000000000000000000000000000000000000000220cb06a2ac41bb9722, [0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1])
   <UnknownContract 0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d>.UnknownEvent(0x000000000000000000000000000000000000000000000000000000009502f900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001361183ae217595c, [0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822, 0x000000000000000000000000a5e0829caced8ffdd4de3c43696c57f7d7a678ff, 0x000000000000000000000000ce5c12eea2772efc7a665e7aa26c059d6fdc5de5])
   WETH.Transfer(from=[TWAP], to=[taker], value=10000000000000000)
   WETH.Transfer(from=[TWAP], to=[user], value=1386424000641915228)
   TWAP.OrderFilled(taker=[taker], id=0, exchange=[UniswapV2Exchange], srcAmountIn=2500000000, dstAmountOut=1386424000641915228, dstFee=10000000000000000)
   TWAP.OrderCompleted(taker=[taker], id=0)
  web3-candies mining 1 block and advancing time by 60 seconds +171ms
  web3-candies was: block 29194886 timestamp 2022-06-05T12:03:58.000Z now: block 29194887 timestamp 2022-06-05T12:04:58.000Z +1ms
    ✓ mutiple chunks (4749ms)
  web3-candies resetNetworkFork to 29194866 +10ms
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +453ms
  web3-candies deploying TWAP +3s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +303ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=10000000000, srcBidAmount=4000000000, dstMinAmount=2000000000000000000, deadline=1654431405, delay=60)
   TWAP.OrderCreated(maker=[user], id=0, ask=[1654430407, 1654431405, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 10000000000, 4000000000, 2000000000000000000])
  web3-candies mining 1 block and advancing time by 10 seconds +2s
  web3-candies was: block 29194872 timestamp 2022-06-05T12:00:08.000Z now: block 29194873 timestamp 2022-06-05T12:00:18.000Z +1ms
  web3-candies mining 1 block and advancing time by 60 seconds +4s
  web3-candies was: block 29194874 timestamp 2022-06-05T12:00:19.000Z now: block 29194875 timestamp 2022-06-05T12:01:23.000Z +2ms
  web3-candies mining 1 block and advancing time by 10 seconds +44ms
  web3-candies was: block 29194876 timestamp 2022-06-05T12:01:24.000Z now: block 29194877 timestamp 2022-06-05T12:01:34.000Z +1ms
  web3-candies mining 1 block and advancing time by 60 seconds +103ms
  web3-candies was: block 29194878 timestamp 2022-06-05T12:01:35.000Z now: block 29194879 timestamp 2022-06-05T12:02:35.000Z +1ms
  web3-candies mining 1 block and advancing time by 10 seconds +42ms
  web3-candies was: block 29194880 timestamp 2022-06-05T12:02:36.000Z now: block 29194881 timestamp 2022-06-05T12:02:46.000Z +2ms
    ✓ last chunk may be partial amount (5041ms)
  web3-candies resetNetworkFork to 29194866 +113ms
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +558ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +247ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
  web3-candies mining 1 block and advancing time by 1 seconds +2s
  web3-candies was: block 29194872 timestamp 2022-06-05T12:00:08.000Z now: block 29194873 timestamp 2022-06-05T12:00:09.000Z +1ms
  web3-candies deploying MockExchange +0ms
CREATE MockExchange.constructor() => ([MockExchange])
  web3-candies deployed MockExchange 0xA1041132B507466bE2b840b0BdFc78CA333b5861 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +241ms
  web3-candies impersonating 0x72A53cDBBcc1b9efa39c834A540550e23463AAcB +0ms
CALL WETH.transfer(to=[MockExchange], amount=10000000000000000000000)
   WETH.Transfer(from=[dstTokenWhale], to=[MockExchange], value=10000000000000000000000)
CALL MockExchange.setMockAmounts(_amounts=[0, 600000000000000000])
CALL TWAP.bid(id=0, exchange=[MockExchange], dstFee=10000000000000000, data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[MockExchange], dstAmountOut=590000000000000000, dstFee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +756ms
  web3-candies was: block 29194877 timestamp 2022-06-05T12:00:13.000Z now: block 29194878 timestamp 2022-06-05T12:00:23.000Z +1ms
CALL TWAP.fill(id=0)
   USDC.Transfer(from=[user], to=[TWAP], value=1000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=1000000000)
   USDC.Approval(owner=[TWAP], spender=[MockExchange], value=1000000000)
   USDC.Transfer(from=[TWAP], to=[MockExchange], value=1000000000)
   USDC.Approval(owner=[TWAP], spender=[MockExchange], value=0)
   WETH.Transfer(from=[MockExchange], to=[TWAP], value=600000000000000000)
   WETH.Transfer(from=[TWAP], to=[taker], value=10000000000000000)
   WETH.Transfer(from=[TWAP], to=[user], value=590000000000000000)
   TWAP.OrderFilled(taker=[taker], id=0, exchange=[MockExchange], srcAmountIn=1000000000, dstAmountOut=590000000000000000, dstFee=10000000000000000)
    ✓ outbid current bid within pending period (2991ms)
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +1s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +493ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +258ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
  web3-candies mining 1 block and advancing time by 1 seconds +2s
  web3-candies was: block 29194872 timestamp 2022-06-05T12:00:08.000Z now: block 29194873 timestamp 2022-06-05T12:00:09.000Z +2ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=1000000000000000, data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619)
   TWAP.OrderBid(taker=0x56C037B948a812C5A0Ad9cCc122F5015EF928F27, id=0, exchange=[UniswapV2Exchange], dstAmountOut=558082872850656255, dstFee=1000000000000000)
    ✓ outbid current bid within pending period same path and amount but lower fee (535ms)
  web3-candies resetNetworkFork to 29194866 +70ms
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +411ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +220ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
  web3-candies mining 1 block and advancing time by 58 seconds +2s
  web3-candies was: block 29194872 timestamp 2022-06-05T12:00:07.000Z now: block 29194873 timestamp 2022-06-05T12:01:05.000Z +1ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619)
  web3-candies mining 1 block and advancing time by 1 seconds +36ms
  web3-candies was: block 29194874 timestamp 2022-06-05T12:01:06.000Z now: block 29194875 timestamp 2022-06-05T12:01:07.000Z +2ms
    ✓ clears stale unfilled bid after max bidding window (553ms)
  web3-candies resetNetworkFork to 29194866 +37ms
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +4ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +402ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +224ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +2ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=1000000000, dstMinAmount=1000000000000, deadline=1654431404, delay=60)
   TWAP.OrderCreated(maker=[user], id=0, ask=[1654430406, 1654431404, 60, [user], 0x0000000000000000000000000000000000000000, [USDC], [WETH], 2000000000, 1000000000, 1000000000000])
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=400000000000000000, data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[UniswapV2Exchange], dstAmountOut=159082872850656255, dstFee=400000000000000000)
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=300000000000000000, data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[UniswapV2Exchange], dstAmountOut=259082872850656255, dstFee=300000000000000000)
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=100000000000000000, data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[UniswapV2Exchange], dstAmountOut=459082872850656255, dstFee=100000000000000000)
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], dstFee=10000000000000000, data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619)
   TWAP.OrderBid(taker=[taker], id=0, exchange=[UniswapV2Exchange], dstAmountOut=549082872850656255, dstFee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +2s
  web3-candies was: block 29194875 timestamp 2022-06-05T12:00:10.000Z now: block 29194876 timestamp 2022-06-05T12:00:21.000Z +1ms
CALL TWAP.fill(id=0)
   USDC.Transfer(from=[user], to=[TWAP], value=1000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=1000000000)
   USDC.Approval(owner=[TWAP], spender=[UniswapV2Exchange], value=1000000000)
   USDC.Transfer(from=[TWAP], to=[UniswapV2Exchange], value=1000000000)
   USDC.Approval(owner=[TWAP], spender=[UniswapV2Exchange], value=0)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff, value=1000000000)
   USDC.Transfer(from=[UniswapV2Exchange], to=0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d, value=1000000000)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff, value=0)
   WETH.Transfer(from=0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d, to=[TWAP], value=559082872850656255)
   <UnknownContract 0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d>.UnknownEvent(0x0000000000000000000000000000000000000000000000000000104ef4b8fa1f00000000000000000000000000000000000000000000022110d10a74d0ef409f, [0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1])
   <UnknownContract 0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d>.UnknownEvent(0x000000000000000000000000000000000000000000000000000000003b9aca000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007c242e92444abff, [0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822, 0x000000000000000000000000a5e0829caced8ffdd4de3c43696c57f7d7a678ff, 0x000000000000000000000000ce5c12eea2772efc7a665e7aa26c059d6fdc5de5])
   WETH.Transfer(from=[TWAP], to=[taker], value=10000000000000000)
   WETH.Transfer(from=[TWAP], to=[user], value=549082872850656255)
   TWAP.OrderFilled(taker=[taker], id=0, exchange=[UniswapV2Exchange], srcAmountIn=1000000000, dstAmountOut=549082872850656255, dstFee=10000000000000000)
    ✓ supports market orders, english auction incentivizes best competitive price (4647ms)
    prune stale invalid order
  web3-candies resetNetworkFork to 29194866 +3s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +411ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +242ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +0ms
CALL TWAP.prune(id=0)
CALL USDC.approve(spender=[TWAP], amount=0)
   USDC.Approval(owner=[user], spender=[TWAP], value=0)
CALL TWAP.prune(id=0)
   TWAP.OrderCanceled(sender=[deployer], id=0)
      ✓ when no approval (557ms)
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +6ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +389ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +207ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +0ms
CALL USDC.transfer(to=[deployer], amount=1000000000000)
   USDC.Transfer(from=[user], to=[deployer], value=1000000000000)
CALL TWAP.prune(id=0)
   TWAP.OrderCanceled(sender=[deployer], id=0)
      ✓ when no balance (922ms)

·-----------------------------------|---------------------------|-------------|-----------------------------·
|       Solc version: 0.8.10        ·  Optimizer enabled: true  ·  Runs: 200  ·  Block limit: 10000000 gas  │
····································|···························|·············|······························
|  Methods                          ·               30 gwei/gas               ·       0.81 usd/matic        │
·················|··················|·············|·············|·············|···············|··············
|  Contract      ·  Method          ·  Min        ·  Max        ·  Avg        ·  # calls      ·  usd (avg)  │
·················|··················|·············|·············|·············|···············|··············
|  ERC20         ·  approve         ·      36162  ·      58110  ·      55357  ·           43  ·       0.00  │
·················|··················|·············|·············|·············|···············|··············
|  ERC20         ·  transfer        ·      51994  ·      63552  ·      61807  ·           48  ·       0.00  │
·················|··················|·············|·············|·············|···············|··············
|  MockExchange  ·  setMockAmounts  ·      32211  ·      69211  ·      56878  ·            9  ·       0.00  │
·················|··················|·············|·············|·············|···············|··············
|  TWAP          ·  ask             ·     233965  ·     285465  ·     261816  ·           39  ·       0.01  │
·················|··················|·············|·············|·············|···············|··············
|  TWAP          ·  bid             ·     112554  ·     291823  ·     262214  ·           36  ·       0.01  │
·················|··················|·············|·············|·············|···············|··············
|  TWAP          ·  cancel          ·      73135  ·      90173  ·      81654  ·            2  ·       0.00  │
·················|··················|·············|·············|·············|···············|··············
|  TWAP          ·  fill            ·     290042  ·     365570  ·     337680  ·           16  ·       0.01  │
·················|··················|·············|·············|·············|···············|··············
|  TWAP          ·  prune           ·      77016  ·     105468  ·      94698  ·            3  ·       0.00  │
·················|··················|·············|·············|·············|···············|··············
|  Deployments                      ·                                         ·  % of limit   ·             │
····································|·············|·············|·············|···············|··············
|  MockExchange                     ·          -  ·          -  ·     543346  ·        5.4 %  ·       0.01  │
····································|·············|·············|·············|···············|··············
|  TWAP                             ·          -  ·          -  ·    2522109  ·       25.2 %  ·       0.06  │
····································|·············|·············|·············|···············|··············
|  UniswapV2Exchange                ·          -  ·          -  ·     646460  ·        6.5 %  ·       0.02  │
·-----------------------------------|-------------|-------------|-------------|---------------|-------------·

  38 passing (5m)

```
