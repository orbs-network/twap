
```console
> @defi.org/twap@0.0.1 test
> npm run test:eth && npm run test:poly


> @defi.org/twap@0.0.1 test:eth
> BLOCK=14908980 DEBUG=web3-candies hardhat test --logs

🌐 network ETH blocknumber 14908980 🌐

  Bidder
  web3-candies resetNetworkFork to 14908980 +0ms
  web3-candies now block 14908980 +4s
  web3-candies deploying UniswapV2Exchange +4ms
CREATE UniswapV2Exchange.constructor(_uniswap=0xf164fC0Ec4E93095b804a4795bBe1e041497b92a) => (0x74652f570B1A95235a9A054994319eeb827c5E17)
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +483ms
  web3-candies deploying TWAP +2s
CREATE TWAP.constructor() => (0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5)
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +281ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL USDC.transfer(to=[user], amount=1000000000000)
   USDC.Transfer(from=[srcTokenWhale], to=[user], value=1000000000000)
  web3-candies deploying Bidder +1s
CREATE Bidder.constructor(_twap=[TWAP], _weth=[WETH]) => (0x55daE1942cCa181D38F1E9b85C36eC741CC61568)
   Bidder.OwnershipTransferred(previousOwner=0x0000000000000000000000000000000000000000, newOwner=[taker])
  web3-candies deployed Bidder 0x55daE1942cCa181D38F1E9b85C36eC741CC61568 deployer 0x9ec8b20c7b0c8cf594e871b13c89a80eb472e4d0 +269ms
CALL USDC.approve(spender=[TWAP], amount=2000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=2000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=1000000000, dstMinAmount=500000000000000000, deadline=1654431409)
   TWAP.OrderCreated(id=0, maker=[user])
    ✓ sanity (6ms)
  web3-candies resetNetworkFork to 14908980 +703ms
  web3-candies now block 14908980 +893ms
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +20ms
  web3-candies deploying TWAP +54ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +15ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
  web3-candies deploying Bidder +19ms
  web3-candies deployed Bidder 0x55daE1942cCa181D38F1E9b85C36eC741CC61568 deployer 0x9ec8b20c7b0c8cf594e871b13c89a80eb472e4d0 +11ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=1000000000, dstMinAmount=500000000000000000, deadline=1654431407)
   TWAP.OrderCreated(id=0, maker=[user])
CALL Bidder.bid(id=0, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +93ms
  web3-candies was: block 14908987 timestamp 2022-06-05T12:00:10.000Z now: block 14908988 timestamp 2022-06-05T12:00:20.000Z +2ms
^[CALL Bidder.fill(id=0, feeExchange=0x0000000000000000000000000000000000000000, feeMinAmountOut=0, feeData=0x)
   USDC.Transfer(from=[user], to=[TWAP], value=1000000000)
   USDC.Approval(owner=[TWAP], spender=[UniswapV2Exchange], value=1000000000)
   USDC.Transfer(from=[TWAP], to=[UniswapV2Exchange], value=1000000000)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xf164fC0Ec4E93095b804a4795bBe1e041497b92a, value=1000000000)
   USDC.Transfer(from=[UniswapV2Exchange], to=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, value=1000000000)
   WETH.Transfer(from=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, to=[TWAP], value=558969740337624487)
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000047700f75c6f70000000000000000000000000000000000000000000009533c7970e6983c7768, [0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1])
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000000003b9aca000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007c1dc046d0435a7, [0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822, 0x000000000000000000000000f164fc0ec4e93095b804a4795bbe1e041497b92a, 0x000000000000000000000000ce5c12eea2772efc7a665e7aa26c059d6fdc5de5])
   WETH.Transfer(from=[TWAP], to=[Bidder], value=10000000000000000)
   WETH.Transfer(from=[TWAP], to=[user], value=548969740337624487)
   TWAP.OrderFilled(id=0, taker=[Bidder], srcAmountIn=1000000000, dstAmountOut=548969740337624487, fee=10000000000000000)
   <UnknownContract [WETH]>.UnknownEvent(0x000000000000000000000000000000000000000000000000002386f26fc10000, [0x7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65, 0x00000000000000000000000055dae1942cca181d38f1e9b85c36ec741cc61568])
    ✓ bid & fill, gas rebate as dstToken without swapping (3801ms)
  web3-candies resetNetworkFork to 14908980 +4s
  web3-candies now block 14908980 +1s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +15ms
  web3-candies deploying TWAP +52ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +8ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +1ms
  web3-candies deploying Bidder +11ms
  web3-candies deployed Bidder 0x55daE1942cCa181D38F1E9b85C36eC741CC61568 deployer 0x9ec8b20c7b0c8cf594e871b13c89a80eb472e4d0 +9ms
  web3-candies mining 1 block and advancing time by 10 seconds +67ms
  web3-candies was: block 14908987 timestamp 2022-06-05T12:00:10.000Z now: block 14908988 timestamp 2022-06-05T12:00:20.000Z +1ms
CALL Bidder.fill(id=0, feeExchange=0x0000000000000000000000000000000000000000, feeMinAmountOut=0, feeData=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
   USDC.Transfer(from=[user], to=[TWAP], value=1000000000)
   USDC.Approval(owner=[TWAP], spender=[UniswapV2Exchange], value=1000000000)
   USDC.Transfer(from=[TWAP], to=[UniswapV2Exchange], value=1000000000)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xf164fC0Ec4E93095b804a4795bBe1e041497b92a, value=1000000000)
   USDC.Transfer(from=[UniswapV2Exchange], to=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, value=1000000000)
   WETH.Transfer(from=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, to=[TWAP], value=558969740337624487)
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000047700f75c6f70000000000000000000000000000000000000000000009533c7970e6983c7768, [0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1])
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000000003b9aca000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007c1dc046d0435a7, [0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822, 0x000000000000000000000000f164fc0ec4e93095b804a4795bbe1e041497b92a, 0x000000000000000000000000ce5c12eea2772efc7a665e7aa26c059d6fdc5de5])
   WETH.Transfer(from=[TWAP], to=[Bidder], value=10000000000000000)
   WETH.Transfer(from=[TWAP], to=[user], value=548969740337624487)
   TWAP.OrderFilled(id=0, taker=[Bidder], srcAmountIn=1000000000, dstAmountOut=548969740337624487, fee=10000000000000000)
   <UnknownContract [WETH]>.UnknownEvent(0x000000000000000000000000000000000000000000000000002386f26fc10000, [0x7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65, 0x00000000000000000000000055dae1942cca181d38f1e9b85c36ec741cc61568])
    ✓ gas rebate when dstToken == nativeToken, unwrap (248ms)
  web3-candies resetNetworkFork to 14908980 +206ms
  web3-candies now block 14908980 +913ms
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +11ms
  web3-candies deploying TWAP +22ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +7ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +1ms
  web3-candies deploying Bidder +10ms
  web3-candies deployed Bidder 0x55daE1942cCa181D38F1E9b85C36eC741CC61568 deployer 0x9ec8b20c7b0c8cf594e871b13c89a80eb472e4d0 +9ms
    - gas rebate swapping to native token

  Errors
    order
  web3-candies resetNetworkFork to 14908980 +25ms
  web3-candies now block 14908980 +780ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +12ms
  web3-candies deploying TWAP +55ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +10ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
      ✓ invalid id (13ms)
    verify bid
  web3-candies resetNetworkFork to 14908980 +25ms
  web3-candies now block 14908980 +779ms
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +12ms
  web3-candies deploying TWAP +24ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +8ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL USDC.approve(spender=[TWAP], amount=2000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=2000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1654430405)
   TWAP.OrderCreated(id=0, maker=[user])
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
CALL USDC.approve(spender=[TWAP], amount=2000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=2000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1654430419)
   TWAP.OrderCreated(id=1, maker=[user])
CALL TWAP.bid(id=1, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
      ✓ expired (158ms)
  web3-candies resetNetworkFork to 14908980 +168ms
  web3-candies now block 14908980 +716ms
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +11ms
  web3-candies deploying TWAP +22ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1654431406)
   TWAP.OrderCreated(id=0, maker=[user])
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
CALL USDC.approve(spender=[TWAP], amount=2000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=2000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1654431410)
   TWAP.OrderCreated(id=1, maker=[user])
CALL TWAP.bid(id=1, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
      ✓ low bid (194ms)
  web3-candies resetNetworkFork to 14908980 +205ms
  web3-candies now block 14908980 +765ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +11ms
  web3-candies deploying TWAP +24ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +7ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +1ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=1000000000, dstMinAmount=500000000000000000, deadline=1654431406)
   TWAP.OrderCreated(id=0, maker=[user])
  web3-candies mining 1 block and advancing time by 30 seconds +81ms
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
   TWAP.OrderFilled(id=0, taker=[taker], srcAmountIn=1000000000, dstAmountOut=548969740337624487, fee=10000000000000000)
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 60 seconds +172ms
  web3-candies was: block 14908989 timestamp 2022-06-05T12:00:41.000Z now: block 14908990 timestamp 2022-06-05T12:01:41.000Z +1ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
      ✓ recently filled (287ms)
  web3-candies resetNetworkFork to 14908980 +42ms
  web3-candies now block 14908980 +911ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +11ms
  web3-candies deploying TWAP +24ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +8ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=1000000000, dstMinAmount=2000000000000000000, deadline=1654431406)
   TWAP.OrderCreated(id=0, maker=[user])
      ✓ insufficient amount out (59ms)
  web3-candies resetNetworkFork to 14908980 +69ms
  web3-candies now block 14908980 +877ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +11ms
  web3-candies deploying TWAP +24ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +8ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=100000000000000000)
      ✓ insufficient amount out with excess fee (54ms)
  web3-candies resetNetworkFork to 14908980 +65ms
  web3-candies now block 14908980 +864ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +14ms
  web3-candies deploying TWAP +21ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +10ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=1000000000000000000)
      ✓ fee underflow protection (56ms)
  web3-candies resetNetworkFork to 14908980 +66ms
  web3-candies now block 14908980 +808ms
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +10ms
  web3-candies deploying TWAP +23ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +7ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=1500000000, dstMinAmount=750000000000000000, deadline=1654431406)
   TWAP.OrderCreated(id=0, maker=[user])
  web3-candies mining 1 block and advancing time by 10 seconds +79ms
  web3-candies was: block 14908986 timestamp 2022-06-05T12:00:09.000Z now: block 14908987 timestamp 2022-06-05T12:00:19.000Z +1ms
  web3-candies mining 1 block and advancing time by 60 seconds +114ms
  web3-candies was: block 14908988 timestamp 2022-06-05T12:00:20.000Z now: block 14908989 timestamp 2022-06-05T12:01:20.000Z +1ms
  web3-candies deploying MockExchange +0ms
CREATE MockExchange.constructor() => (0xA1041132B507466bE2b840b0BdFc78CA333b5861)
  web3-candies deployed MockExchange 0xA1041132B507466bE2b840b0BdFc78CA333b5861 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +210ms
  web3-candies impersonating 0xBA12222222228d8Ba445958a75a0704d566BF2C8 +0ms
CALL WETH.transfer(to=[MockExchange], amount=10000000000000000000000)
   WETH.Transfer(from=[dstTokenWhale], to=[MockExchange], value=10000000000000000000000)
CALL MockExchange.setMockAmounts(_amounts=[0, 100000000000000000])
CALL TWAP.bid(id=0, exchange=[MockExchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
      ✓ insufficient amount out when last partial fill (1142ms)
  web3-candies resetNetworkFork to 14908980 +747ms
  web3-candies now block 14908980 +791ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +19ms
  web3-candies deploying TWAP +55ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL USDC.approve(spender=[TWAP], amount=0)
   USDC.Approval(owner=[user], spender=[TWAP], value=0)
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
      ✓ insufficient user allowance (82ms)
  web3-candies resetNetworkFork to 14908980 +98ms
  web3-candies now block 14908980 +705ms
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +13ms
  web3-candies deploying TWAP +23ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +10ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL USDC.transfer(to=[taker], amount=1000000000000)
   USDC.Transfer(from=[user], to=[taker], value=1000000000000)
      ✓ insufficient user balance (486ms)
    perform fill
  web3-candies resetNetworkFork to 14908980 +498ms
  web3-candies now block 14908980 +860ms
  web3-candies deploying UniswapV2Exchange +4ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +13ms
  web3-candies deploying TWAP +29ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
  web3-candies mining 1 block and advancing time by 10000 seconds +74ms
  web3-candies was: block 14908986 timestamp 2022-06-05T12:00:09.000Z now: block 14908987 timestamp 2022-06-05T14:46:49.000Z +1ms
      ✓ expired (74ms)
  web3-candies resetNetworkFork to 14908980 +11ms
  web3-candies now block 14908980 +819ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +15ms
  web3-candies deploying TWAP +22ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +10ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL TWAP.fill(id=0)
      ✓ invalid taker when no existing bid (39ms)
  web3-candies resetNetworkFork to 14908980 +48ms
  web3-candies now block 14908980 +754ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +13ms
  web3-candies deploying TWAP +23ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL TWAP.fill(id=0)
      ✓ invalid taker when not the winning taker (78ms)
  web3-candies resetNetworkFork to 14908980 +88ms
  web3-candies now block 14908980 +698ms
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +10ms
  web3-candies deploying TWAP +23ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL TWAP.fill(id=0)
      ✓ pending bid when still in bidding window (76ms)
  web3-candies resetNetworkFork to 14908980 +85ms
  web3-candies now block 14908980 +753ms
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +10ms
  web3-candies deploying TWAP +23ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +8ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
  web3-candies deploying MockExchange +31ms
CREATE MockExchange.constructor() => ([MockExchange])
  web3-candies deployed MockExchange 0xA1041132B507466bE2b840b0BdFc78CA333b5861 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +13ms
  web3-candies impersonating 0xBA12222222228d8Ba445958a75a0704d566BF2C8 +0ms
CALL WETH.transfer(to=[MockExchange], amount=10000000000000000000000)
   WETH.Transfer(from=[dstTokenWhale], to=[MockExchange], value=10000000000000000000000)
CALL MockExchange.setMockAmounts(_amounts=[0, 1000000000000000000])
CALL TWAP.bid(id=0, exchange=[MockExchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +69ms
  web3-candies was: block 14908989 timestamp 2022-06-05T12:00:12.000Z now: block 14908990 timestamp 2022-06-05T12:00:22.000Z +2ms
CALL MockExchange.setMockAmounts(_amounts=[0, 100000000000000000])
CALL TWAP.fill(id=0)
      ✓ insufficient out (840ms)
  web3-candies resetNetworkFork to 14908980 +735ms
  web3-candies now block 14908980 +678ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +11ms
  web3-candies deploying TWAP +23ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +8ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +1ms
  web3-candies deploying MockExchange +32ms
  web3-candies deployed MockExchange 0xA1041132B507466bE2b840b0BdFc78CA333b5861 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +6ms
  web3-candies impersonating 0xBA12222222228d8Ba445958a75a0704d566BF2C8 +1ms
CALL TWAP.bid(id=0, exchange=[MockExchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=100000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +45ms
  web3-candies was: block 14908989 timestamp 2022-06-05T12:00:12.000Z now: block 14908990 timestamp 2022-06-05T12:00:22.000Z +2ms
CALL MockExchange.setMockAmounts(_amounts=[0, 500000000000000000])
CALL TWAP.fill(id=0)
      ✓ insufficient out with excess fee (154ms)
  web3-candies resetNetworkFork to 14908980 +78ms
  web3-candies now block 14908980 +887ms
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +18ms
  web3-candies deploying TWAP +68ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +11ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
  web3-candies deploying MockExchange +33ms
  web3-candies deployed MockExchange 0xA1041132B507466bE2b840b0BdFc78CA333b5861 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +7ms
  web3-candies impersonating 0xBA12222222228d8Ba445958a75a0704d566BF2C8 +0ms
CALL MockExchange.setMockAmounts(_amounts=[0, 10000000000000000000])
CALL TWAP.bid(id=0, exchange=[MockExchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=1000000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +64ms
  web3-candies was: block 14908989 timestamp 2022-06-05T12:00:12.000Z now: block 14908990 timestamp 2022-06-05T12:00:22.000Z +2ms
      ✓ fee subtracted from dstAmountOut underflow protection (150ms)
  web3-candies resetNetworkFork to 14908980 +57ms
  web3-candies now block 14908980 +821ms
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +12ms
  web3-candies deploying TWAP +23ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL USDC.approve(spender=[TWAP], amount=1000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=1000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=1000000, srcBidAmount=1000000, dstMinAmount=1000000000000000000, deadline=1654431406)
   TWAP.OrderCreated(id=0, maker=[user])
CALL TWAP.cancel(id=0)
      ✓ cancel only from maker (68ms)

  Incentives
    - staking
    - taker does not fill winning bid
    - maker callback draining gas
    - taker manipulates price on fill
    - taker DoS of specific maker
    - taker reimbursed for bidding and filling gas
    - maker asks specific exchange
    - path verification
    - stop loss
    - winning bid must be different path?
    - bid is valid within pending bid if more than fill delay from last fill?

  Quoter
    - gas

  Sanity
  web3-candies resetNetworkFork to 14908980 +79ms
  web3-candies now block 14908980 +1s
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +15ms
  web3-candies deploying TWAP +55ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL USDC.approve(spender=[TWAP], amount=3000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=3000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=3000000, srcBidAmount=2000000, dstMinAmount=1000000000000000000, deadline=1654430506)
   TWAP.OrderCreated(id=0, maker=[user])
    ✓ maker creates ask order, emits event (57ms)
  web3-candies resetNetworkFork to 14908980 +71ms
  web3-candies now block 14908980 +1s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +11ms
  web3-candies deploying TWAP +23ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
    ✓ bid sets Bid fields (65ms)
  web3-candies resetNetworkFork to 14908980 +74ms
  web3-candies now block 14908980 +781ms
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +13ms
  web3-candies deploying TWAP +41ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +19ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
  web3-candies mining 1 block and advancing time by 30 seconds +72ms
  web3-candies was: block 14908986 timestamp 2022-06-05T12:00:09.000Z now: block 14908987 timestamp 2022-06-05T12:00:39.000Z +1ms
    ✓ fill sets Fill fields and clears the Bid, emits event (170ms)
  web3-candies resetNetworkFork to 14908980 +109ms
  web3-candies now block 14908980 +1s
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +13ms
  web3-candies deploying TWAP +21ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +10ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL TWAP.cancel(id=0)
    ✓ cancel order (58ms)
    History
  web3-candies resetNetworkFork to 14908980 +67ms
  web3-candies now block 14908980 +767ms
  web3-candies deploying UniswapV2Exchange +6ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +17ms
  web3-candies deploying TWAP +21ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL USDC.approve(spender=[TWAP], amount=4000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=4000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=4000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1654431408)
   TWAP.OrderCreated(id=1, maker=[user])
CALL TWAP.cancel(id=1)
CALL USDC.approve(spender=[TWAP], amount=8000000000)
   USDC.Approval(owner=0x3Fc0FC5D747B7C4B969B5fF6DAE159b3FE520F59, spender=[TWAP], value=8000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=8000000000, srcBidAmount=4000000000, dstMinAmount=2000000000000000000, deadline=1654431411)
   TWAP.OrderCreated(id=2, maker=0x3Fc0FC5D747B7C4B969B5fF6DAE159b3FE520F59)
CALL USDC.approve(spender=[TWAP], amount=1000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=1000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=1000000000, srcBidAmount=1000000000, dstMinAmount=500000000000000000, deadline=1234)
   TWAP.OrderCreated(id=3, maker=[user])
      ✓ find orders for maker (428ms)

  TWAP
  web3-candies resetNetworkFork to 14908980 +1s
  web3-candies now block 14908980 +764ms
  web3-candies deploying UniswapV2Exchange +7ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +18ms
  web3-candies deploying TWAP +20ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +10ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
  web3-candies mining 1 block and advancing time by 10 seconds +66ms
  web3-candies was: block 14908986 timestamp 2022-06-05T12:00:09.000Z now: block 14908987 timestamp 2022-06-05T12:00:19.000Z +1ms
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
   TWAP.OrderFilled(id=0, taker=[taker], srcAmountIn=2000000000, dstAmountOut=1107925290738887788, fee=10000000000000000)
    ✓ single chunk (214ms)
  web3-candies resetNetworkFork to 14908980 +158ms
  web3-candies now block 14908980 +1s
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +9ms
  web3-candies deploying TWAP +37ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +15ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +1ms
CALL USDC.approve(spender=[TWAP], amount=10000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=10000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=10000000000, srcBidAmount=2500000000, dstMinAmount=1250000000000000000, deadline=1654431406)
   TWAP.OrderCreated(id=0, maker=[user])
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +111ms
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
   TWAP.OrderFilled(id=0, taker=[taker], srcAmountIn=2500000000, dstAmountOut=1387397744882237904, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 60 seconds +155ms
  web3-candies was: block 14908988 timestamp 2022-06-05T12:00:20.000Z now: block 14908989 timestamp 2022-06-05T12:01:20.000Z +1ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +44ms
  web3-candies was: block 14908990 timestamp 2022-06-05T12:01:21.000Z now: block 14908991 timestamp 2022-06-05T12:01:31.000Z +2ms
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
   TWAP.OrderFilled(id=0, taker=[taker], srcAmountIn=2500000000, dstAmountOut=1387308929430581229, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 60 seconds +152ms
  web3-candies was: block 14908992 timestamp 2022-06-05T12:01:32.000Z now: block 14908993 timestamp 2022-06-05T12:02:32.000Z +1ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +42ms
  web3-candies was: block 14908994 timestamp 2022-06-05T12:02:33.000Z now: block 14908995 timestamp 2022-06-05T12:02:43.000Z +1ms
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
   TWAP.OrderFilled(id=0, taker=[taker], srcAmountIn=2500000000, dstAmountOut=1387220122450259929, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 60 seconds +153ms
  web3-candies was: block 14908996 timestamp 2022-06-05T12:02:44.000Z now: block 14908997 timestamp 2022-06-05T12:03:44.000Z +1ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +41ms
  web3-candies was: block 14908998 timestamp 2022-06-05T12:03:45.000Z now: block 14908999 timestamp 2022-06-05T12:03:55.000Z +1ms
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
   TWAP.OrderFilled(id=0, taker=[taker], srcAmountIn=2500000000, dstAmountOut=1387131323940196424, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 60 seconds +156ms
  web3-candies was: block 14909000 timestamp 2022-06-05T12:03:56.000Z now: block 14909001 timestamp 2022-06-05T12:04:56.000Z +1ms
    ✓ mutiple chunks (849ms)
  web3-candies resetNetworkFork to 14908980 +9ms
  web3-candies now block 14908980 +869ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +11ms
  web3-candies deploying TWAP +21ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +8ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=10000000000, srcBidAmount=4000000000, dstMinAmount=2000000000000000000, deadline=1654431406)
   TWAP.OrderCreated(id=0, maker=[user])
  web3-candies mining 1 block and advancing time by 10 seconds +78ms
  web3-candies was: block 14908986 timestamp 2022-06-05T12:00:09.000Z now: block 14908987 timestamp 2022-06-05T12:00:19.000Z +1ms
  web3-candies mining 1 block and advancing time by 60 seconds +145ms
  web3-candies was: block 14908988 timestamp 2022-06-05T12:00:20.000Z now: block 14908989 timestamp 2022-06-05T12:01:21.000Z +1ms
  web3-candies mining 1 block and advancing time by 10 seconds +35ms
  web3-candies was: block 14908990 timestamp 2022-06-05T12:01:22.000Z now: block 14908991 timestamp 2022-06-05T12:01:32.000Z +1ms
  web3-candies mining 1 block and advancing time by 60 seconds +96ms
  web3-candies was: block 14908992 timestamp 2022-06-05T12:01:33.000Z now: block 14908993 timestamp 2022-06-05T12:02:33.000Z +1ms
  web3-candies mining 1 block and advancing time by 10 seconds +43ms
  web3-candies was: block 14908994 timestamp 2022-06-05T12:02:34.000Z now: block 14908995 timestamp 2022-06-05T12:02:44.000Z +1ms
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
   TWAP.OrderFilled(id=0, taker=[taker], srcAmountIn=2000000000, dstAmountOut=1107697944868251298, fee=10000000000000000)
    ✓ last chunk may be partial amount (545ms)
  web3-candies resetNetworkFork to 14908980 +153ms
  web3-candies now block 14908980 +795ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +11ms
  web3-candies deploying TWAP +23ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +7ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
  web3-candies mining 1 block and advancing time by 1 seconds +66ms
  web3-candies was: block 14908986 timestamp 2022-06-05T12:00:09.000Z now: block 14908987 timestamp 2022-06-05T12:00:10.000Z +1ms
  web3-candies deploying MockExchange +0ms
CREATE MockExchange.constructor() => ([MockExchange])
  web3-candies deployed MockExchange 0xA1041132B507466bE2b840b0BdFc78CA333b5861 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +13ms
  web3-candies impersonating 0xBA12222222228d8Ba445958a75a0704d566BF2C8 +0ms
CALL WETH.transfer(to=[MockExchange], amount=10000000000000000000000)
   WETH.Transfer(from=[dstTokenWhale], to=[MockExchange], value=10000000000000000000000)
CALL MockExchange.setMockAmounts(_amounts=[0, 600000000000000000])
CALL TWAP.bid(id=0, exchange=[MockExchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +65ms
  web3-candies was: block 14908991 timestamp 2022-06-05T12:00:14.000Z now: block 14908992 timestamp 2022-06-05T12:00:24.000Z +1ms
CALL TWAP.fill(id=0)
   USDC.Transfer(from=[user], to=[TWAP], value=1000000000)
   USDC.Approval(owner=[TWAP], spender=[MockExchange], value=1000000000)
   USDC.Transfer(from=[TWAP], to=[MockExchange], value=1000000000)
   WETH.Transfer(from=[MockExchange], to=[TWAP], value=600000000000000000)
   WETH.Transfer(from=[TWAP], to=[taker], value=10000000000000000)
   WETH.Transfer(from=[TWAP], to=[user], value=590000000000000000)
   TWAP.OrderFilled(id=0, taker=[taker], srcAmountIn=1000000000, dstAmountOut=590000000000000000, fee=10000000000000000)
    ✓ outbid current bid within pending period (236ms)
  web3-candies resetNetworkFork to 14908980 +100ms
  web3-candies now block 14908980 +668ms
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +14ms
  web3-candies deploying TWAP +52ms
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +10ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +0ms
  web3-candies mining 1 block and advancing time by 1 seconds +72ms
  web3-candies was: block 14908986 timestamp 2022-06-05T12:00:09.000Z now: block 14908987 timestamp 2022-06-05T12:00:10.000Z +1ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=1000000000000000)
    ✓ outbid current bid within pending period same path and amount but lower fee (120ms)

  user is vault
    - callback on each fill

·-----------------------------------|---------------------------|-------------|-----------------------------·
|       Solc version: 0.8.10        ·  Optimizer enabled: true  ·  Runs: 200  ·  Block limit: 10000000 gas  │
····································|···························|·············|······························
|  Methods                          ·               7 gwei/gas                ·       1899.09 usd/eth       │
·················|··················|·············|·············|·············|···············|··············
|  Contract      ·  Method          ·  Min        ·  Max        ·  Avg        ·  # calls      ·  usd (avg)  │
·················|··················|·············|·············|·············|···············|··············
|  Bidder        ·  bid             ·          -  ·          -  ·     322479  ·            2  ·       4.29  │
·················|··················|·············|·············|·············|···············|··············
|  Bidder        ·  fill            ·     391658  ·     392480  ·     392069  ·            2  ·       5.21  │
·················|··················|·············|·············|·············|···············|··············
|  ERC20         ·  approve         ·      38027  ·      59975  ·      57371  ·           37  ·       0.76  │
·················|··················|·············|·············|·············|···············|··············
|  ERC20         ·  transfer        ·      51618  ·      65625  ·      63656  ·           38  ·       0.85  │
·················|··················|·············|·············|·············|···············|··············
|  MockExchange  ·  setMockAmounts  ·      32211  ·      69211  ·      55336  ·            8  ·       0.74  │
·················|··················|·············|·············|·············|···············|··············
|  TWAP          ·  ask             ·     250958  ·     253770  ·     251347  ·           36  ·       3.34  │
·················|··················|·············|·············|·············|···············|··············
|  TWAP          ·  bid             ·     116656  ·     316550  ·     300515  ·           26  ·       3.99  │
·················|··················|·············|·············|·············|···············|··············
|  TWAP          ·  cancel          ·      67590  ·      67602  ·      67596  ·            2  ·       0.90  │
·················|··················|·············|·············|·············|···············|··············
|  TWAP          ·  fill            ·     293620  ·     363867  ·     335197  ·           12  ·       4.46  │
·················|··················|·············|·············|·············|···············|··············
|  Deployments                      ·                                         ·  % of limit   ·             │
····································|·············|·············|·············|···············|··············
|  Bidder                           ·          -  ·          -  ·    1082387  ·       10.8 %  ·      14.39  │
····································|·············|·············|·············|···············|··············
|  MockExchange                     ·          -  ·          -  ·     587430  ·        5.9 %  ·       7.81  │
····································|·············|·············|·············|···············|··············
|  TWAP                             ·          -  ·          -  ·    1891238  ·       18.9 %  ·      25.14  │
····································|·············|·············|·············|···············|··············
|  UniswapV2Exchange                ·          -  ·          -  ·     678632  ·        6.8 %  ·       9.02  │
·-----------------------------------|-------------|-------------|-------------|---------------|-------------·

  31 passing (49s)
  14 pending


> @defi.org/twap@0.0.1 test:poly
> NETWORK=POLY BLOCK=29194866 DEBUG=web3-candies hardhat test --logs

🌐 network POLY blocknumber 29194866 🌐

  Bidder
  web3-candies resetNetworkFork to 29194866 +0ms
  web3-candies now block 29194866 +5s
  web3-candies deploying UniswapV2Exchange +6ms
CREATE UniswapV2Exchange.constructor(_uniswap=0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff) => (0x74652f570B1A95235a9A054994319eeb827c5E17)
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +500ms
  web3-candies deploying TWAP +2s
CREATE TWAP.constructor() => (0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5)
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +264ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL USDC.transfer(to=[user], amount=1000000000000)
   USDC.Transfer(from=[srcTokenWhale], to=[user], value=1000000000000)
  web3-candies deploying Bidder +1s
CREATE Bidder.constructor(_twap=[TWAP], _weth=[WMATIC]) => (0x55daE1942cCa181D38F1E9b85C36eC741CC61568)
   Bidder.OwnershipTransferred(previousOwner=0x0000000000000000000000000000000000000000, newOwner=[taker])
  web3-candies deployed Bidder 0x55daE1942cCa181D38F1E9b85C36eC741CC61568 deployer 0x9ec8b20c7b0c8cf594e871b13c89a80eb472e4d0 +277ms
CALL USDC.approve(spender=[TWAP], amount=2000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=2000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=1000000000, dstMinAmount=500000000000000000, deadline=1654431406)
   TWAP.OrderCreated(id=0, maker=[user])
    ✓ sanity (6ms)
  web3-candies resetNetworkFork to 29194866 +1s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +5ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +437ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +243ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
  web3-candies deploying Bidder +1s
  web3-candies deployed Bidder 0x55daE1942cCa181D38F1E9b85C36eC741CC61568 deployer 0x9ec8b20c7b0c8cf594e871b13c89a80eb472e4d0 +230ms
CALL Bidder.bid(id=0, exchange=[UniswapV2Exchange], data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +502ms
  web3-candies was: block 29194873 timestamp 2022-06-05T12:00:09.000Z now: block 29194874 timestamp 2022-06-05T12:00:19.000Z +3ms
CALL Bidder.fill(id=0, feeExchange=0x0000000000000000000000000000000000000000, feeMinAmountOut=0, feeData=0x)
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
   WETH.Transfer(from=[TWAP], to=[Bidder], value=10000000000000000)
   WETH.Transfer(from=[TWAP], to=[user], value=549082872850656255)
   TWAP.OrderFilled(id=0, taker=[Bidder], srcAmountIn=1000000000, dstAmountOut=549082872850656255, fee=10000000000000000)
   WETH.Transfer(from=[Bidder], to=[taker], value=10000000000000000)
    ✓ bid & fill, gas rebate as dstToken without swapping (4713ms)
  web3-candies resetNetworkFork to 29194866 +5s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +434ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +235ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +0ms
  web3-candies deploying Bidder +1s
  web3-candies deployed Bidder 0x55daE1942cCa181D38F1E9b85C36eC741CC61568 deployer 0x9ec8b20c7b0c8cf594e871b13c89a80eb472e4d0 +242ms
    - gas rebate when dstToken == nativeToken, unwrap
  web3-candies resetNetworkFork to 29194866 +1s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +404ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +254ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
  web3-candies deploying Bidder +1s
  web3-candies deployed Bidder 0x55daE1942cCa181D38F1E9b85C36eC741CC61568 deployer 0x9ec8b20c7b0c8cf594e871b13c89a80eb472e4d0 +260ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=1000000000, dstMinAmount=500000000000000000, deadline=1654431405)
   TWAP.OrderCreated(id=0, maker=[user])
  web3-candies mining 1 block and advancing time by 10 seconds +497ms
  web3-candies was: block 29194873 timestamp 2022-06-05T12:00:08.000Z now: block 29194874 timestamp 2022-06-05T12:00:18.000Z +2ms
CALL Bidder.fill(id=0, feeExchange=[UniswapV2Exchange], feeMinAmountOut=0, feeData=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f6190000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf1270)
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
   WETH.Transfer(from=[TWAP], to=[Bidder], value=10000000000000000)
   WETH.Transfer(from=[TWAP], to=[user], value=549082872850656255)
   TWAP.OrderFilled(id=0, taker=[Bidder], srcAmountIn=1000000000, dstAmountOut=549082872850656255, fee=10000000000000000)
   WETH.Approval(owner=[Bidder], spender=[UniswapV2Exchange], value=10000000000000000)
   WETH.Transfer(from=[Bidder], to=[UniswapV2Exchange], value=10000000000000000)
   WETH.Approval(owner=[Bidder], spender=[UniswapV2Exchange], value=0)
   WETH.Approval(owner=[UniswapV2Exchange], spender=0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff, value=10000000000000000)
   WETH.Transfer(from=[UniswapV2Exchange], to=0xadbF1854e5883eB8aa7BAf50705338739e558E5b, value=10000000000000000)
   WETH.Approval(owner=[UniswapV2Exchange], spender=0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff, value=0)
   WMATIC.Transfer(from=0xadbF1854e5883eB8aa7BAf50705338739e558E5b, to=[Bidder], value=30197117375549789391)
   <UnknownContract 0xadbF1854e5883eB8aa7BAf50705338739e558E5b>.UnknownEvent(0x0000000000000000000000000000000000000000000c57776a3c2ab3917031a600000000000000000000000000000000000000000000010b0b7dc1fcf1a4cc6d, [0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1])
   <UnknownContract 0xadbF1854e5883eB8aa7BAf50705338739e558E5b>.UnknownEvent(0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002386f26fc10000000000000000000000000000000000000000000000000001a311b6430a6bd4cf0000000000000000000000000000000000000000000000000000000000000000, [0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822, 0x000000000000000000000000a5e0829caced8ffdd4de3c43696c57f7d7a678ff, 0x00000000000000000000000055dae1942cca181d38f1e9b85c36ec741cc61568])
   <UnknownContract [WMATIC]>.UnknownEvent(0x000000000000000000000000000000000000000000000001a311b6430a6bd4cf, [0x7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65, 0x00000000000000000000000055dae1942cca181d38f1e9b85c36ec741cc61568])
    ✓ gas rebate swapping to native token (7492ms)

  Errors
    order
  web3-candies resetNetworkFork to 29194866 +7s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +459ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +235ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
      ✓ invalid id (27ms)
    verify bid
  web3-candies resetNetworkFork to 29194866 +1s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +405ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +245ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL USDC.approve(spender=[TWAP], amount=2000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=2000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1654430403)
   TWAP.OrderCreated(id=0, maker=[user])
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619, fee=10000000000000000)
CALL USDC.approve(spender=[TWAP], amount=2000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=2000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1654430417)
   TWAP.OrderCreated(id=1, maker=[user])
CALL TWAP.bid(id=1, exchange=[UniswapV2Exchange], data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619, fee=10000000000000000)
      ✓ expired (578ms)
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +4ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +450ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +233ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1654431404)
   TWAP.OrderCreated(id=0, maker=[user])
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619, fee=10000000000000000)
CALL USDC.approve(spender=[TWAP], amount=2000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=2000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1654431408)
   TWAP.OrderCreated(id=1, maker=[user])
CALL TWAP.bid(id=1, exchange=[UniswapV2Exchange], data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619, fee=10000000000000000)
      ✓ low bid (668ms)
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +5ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +404ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +223ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +0ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=1000000000, dstMinAmount=500000000000000000, deadline=1654431404)
   TWAP.OrderCreated(id=0, maker=[user])
  web3-candies mining 1 block and advancing time by 30 seconds +2s
  web3-candies was: block 29194872 timestamp 2022-06-05T12:00:07.000Z now: block 29194873 timestamp 2022-06-05T12:00:37.000Z +2ms
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
   TWAP.OrderFilled(id=0, taker=[taker], srcAmountIn=1000000000, dstAmountOut=549082872850656255, fee=10000000000000000)
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 60 seconds +4s
  web3-candies was: block 29194875 timestamp 2022-06-05T12:00:42.000Z now: block 29194876 timestamp 2022-06-05T12:01:42.000Z +1ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619, fee=10000000000000000)
      ✓ recently filled (4341ms)
  web3-candies resetNetworkFork to 29194866 +43ms
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +409ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +234ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=1000000000, dstMinAmount=2000000000000000000, deadline=1654431404)
   TWAP.OrderCreated(id=0, maker=[user])
      ✓ insufficient amount out (479ms)
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +434ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +228ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619, fee=100000000000000000)
      ✓ insufficient amount out with excess fee (467ms)
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +7s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +533ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +232ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619, fee=1000000000000000000)
      ✓ fee underflow protection (463ms)
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +4ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +401ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +236ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +0ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=1500000000, dstMinAmount=750000000000000000, deadline=1654431404)
   TWAP.OrderCreated(id=0, maker=[user])
  web3-candies mining 1 block and advancing time by 10 seconds +2s
  web3-candies was: block 29194872 timestamp 2022-06-05T12:00:07.000Z now: block 29194873 timestamp 2022-06-05T12:00:17.000Z +2ms
  web3-candies mining 1 block and advancing time by 60 seconds +4s
  web3-candies was: block 29194874 timestamp 2022-06-05T12:00:18.000Z now: block 29194875 timestamp 2022-06-05T12:01:22.000Z +2ms
  web3-candies deploying MockExchange +1ms
CREATE MockExchange.constructor() => (0xA1041132B507466bE2b840b0BdFc78CA333b5861)
  web3-candies deployed MockExchange 0xA1041132B507466bE2b840b0BdFc78CA333b5861 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +265ms
  web3-candies impersonating 0x72A53cDBBcc1b9efa39c834A540550e23463AAcB +1ms
CALL WETH.transfer(to=[MockExchange], amount=10000000000000000000000)
   WETH.Transfer(from=[dstTokenWhale], to=[MockExchange], value=10000000000000000000000)
CALL MockExchange.setMockAmounts(_amounts=[0, 100000000000000000])
CALL TWAP.bid(id=0, exchange=[MockExchange], data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619, fee=10000000000000000)
      ✓ insufficient amount out when last partial fill (5027ms)
  web3-candies resetNetworkFork to 29194866 +712ms
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +401ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +235ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL USDC.approve(spender=[TWAP], amount=0)
   USDC.Approval(owner=[user], spender=[TWAP], value=0)
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619, fee=10000000000000000)
      ✓ insufficient user allowance (474ms)
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +4ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +396ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +242ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL USDC.transfer(to=[taker], amount=1000000000000)
   USDC.Transfer(from=[user], to=[taker], value=1000000000000)
      ✓ insufficient user balance (935ms)
    perform fill
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +402ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +242ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
  web3-candies mining 1 block and advancing time by 10000 seconds +2s
  web3-candies was: block 29194872 timestamp 2022-06-05T12:00:07.000Z now: block 29194873 timestamp 2022-06-05T14:46:47.000Z +1ms
      ✓ expired (493ms)
  web3-candies resetNetworkFork to 29194866 +13ms
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +5ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +431ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +233ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL TWAP.fill(id=0)
      ✓ invalid taker when no existing bid (443ms)
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +396ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +242ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +2ms
CALL TWAP.fill(id=0)
      ✓ invalid taker when not the winning taker (493ms)
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +4ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +410ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +247ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=1000000000, dstMinAmount=500000000000000000, deadline=1654431405)
   TWAP.OrderCreated(id=0, maker=[user])
CALL TWAP.fill(id=0)
      ✓ pending bid when still in bidding window (487ms)
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +5ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +396ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +232ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
  web3-candies deploying MockExchange +2s
CREATE MockExchange.constructor() => ([MockExchange])
  web3-candies deployed MockExchange 0xA1041132B507466bE2b840b0BdFc78CA333b5861 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +267ms
  web3-candies impersonating 0x72A53cDBBcc1b9efa39c834A540550e23463AAcB +1ms
CALL WETH.transfer(to=[MockExchange], amount=10000000000000000000000)
   WETH.Transfer(from=[dstTokenWhale], to=[MockExchange], value=10000000000000000000000)
CALL MockExchange.setMockAmounts(_amounts=[0, 1000000000000000000])
CALL TWAP.bid(id=0, exchange=[MockExchange], data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +675ms
  web3-candies was: block 29194875 timestamp 2022-06-05T12:00:11.000Z now: block 29194876 timestamp 2022-06-05T12:00:21.000Z +1ms
CALL MockExchange.setMockAmounts(_amounts=[0, 100000000000000000])
CALL TWAP.fill(id=0)
      ✓ insufficient out (2886ms)
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +400ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +233ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +0ms
  web3-candies deploying MockExchange +2s
  web3-candies deployed MockExchange 0xA1041132B507466bE2b840b0BdFc78CA333b5861 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +213ms
  web3-candies impersonating 0x72A53cDBBcc1b9efa39c834A540550e23463AAcB +1ms
CALL TWAP.bid(id=0, exchange=[MockExchange], data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619, fee=100000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +666ms
  web3-candies was: block 29194875 timestamp 2022-06-05T12:00:10.000Z now: block 29194876 timestamp 2022-06-05T12:00:21.000Z +2ms
CALL MockExchange.setMockAmounts(_amounts=[0, 500000000000000000])
      ✓ insufficient out with excess fee (2757ms)
  web3-candies resetNetworkFork to 29194866 +1s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +403ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +234ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
  web3-candies deploying MockExchange +2s
  web3-candies deployed MockExchange 0xA1041132B507466bE2b840b0BdFc78CA333b5861 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +235ms
  web3-candies impersonating 0x72A53cDBBcc1b9efa39c834A540550e23463AAcB +1ms
CALL MockExchange.setMockAmounts(_amounts=[0, 10000000000000000000])
CALL TWAP.bid(id=0, exchange=[MockExchange], data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619, fee=1000000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +690ms
  web3-candies was: block 29194875 timestamp 2022-06-05T12:00:10.000Z now: block 29194876 timestamp 2022-06-05T12:00:20.000Z +1ms
      ✓ fee subtracted from dstAmountOut underflow protection (2420ms)
  web3-candies resetNetworkFork to 29194866 +1s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +430ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +239ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL USDC.approve(spender=[TWAP], amount=1000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=1000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=1000000, srcBidAmount=1000000, dstMinAmount=1000000000000000000, deadline=1654431405)
   TWAP.OrderCreated(id=0, maker=[user])
CALL TWAP.cancel(id=0)
      ✓ cancel only from maker (457ms)

  Incentives
    - staking
    - taker does not fill winning bid
    - maker callback draining gas
    - taker manipulates price on fill
    - taker DoS of specific maker
    - taker reimbursed for bidding and filling gas
    - maker asks specific exchange
    - path verification
    - stop loss
    - winning bid must be different path?
    - bid is valid within pending bid if more than fill delay from last fill?

  Quoter
    - gas

  Sanity
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +398ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +231ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL USDC.approve(spender=[TWAP], amount=3000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=3000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=3000000, srcBidAmount=2000000, dstMinAmount=1000000000000000000, deadline=1654430504)
   TWAP.OrderCreated(id=0, maker=[user])
    ✓ maker creates ask order, emits event (450ms)
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +1s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +399ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +236ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +0ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1654431405)
   TWAP.OrderCreated(id=0, maker=[user])
    ✓ bid sets Bid fields (479ms)
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +410ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +244ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
  web3-candies mining 1 block and advancing time by 30 seconds +2s
  web3-candies was: block 29194872 timestamp 2022-06-05T12:00:07.000Z now: block 29194873 timestamp 2022-06-05T12:00:37.000Z +1ms
    ✓ fill sets Fill fields and clears the Bid, emits event (4462ms)
  web3-candies resetNetworkFork to 29194866 +4s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +407ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +236ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL TWAP.cancel(id=0)
    ✓ cancel order (473ms)
    History
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +393ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +218ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL USDC.approve(spender=[TWAP], amount=4000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=4000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=4000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1654431407)
   TWAP.OrderCreated(id=1, maker=[user])
CALL TWAP.cancel(id=1)
CALL USDC.approve(spender=[TWAP], amount=8000000000)
   USDC.Approval(owner=0x3Fc0FC5D747B7C4B969B5fF6DAE159b3FE520F59, spender=[TWAP], value=8000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=8000000000, srcBidAmount=4000000000, dstMinAmount=2000000000000000000, deadline=1654431410)
   TWAP.OrderCreated(id=2, maker=0x3Fc0FC5D747B7C4B969B5fF6DAE159b3FE520F59)
CALL USDC.approve(spender=[TWAP], amount=1000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=1000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=1000000000, srcBidAmount=1000000000, dstMinAmount=500000000000000000, deadline=1234)
   TWAP.OrderCreated(id=3, maker=[user])
      ✓ find orders for maker (281ms)

  TWAP
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +422ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +233ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
  web3-candies mining 1 block and advancing time by 10 seconds +2s
  web3-candies was: block 29194872 timestamp 2022-06-05T12:00:07.000Z now: block 29194873 timestamp 2022-06-05T12:00:17.000Z +1ms
    ✓ single chunk (4000ms)
  web3-candies resetNetworkFork to 29194866 +4s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +408ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +224ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL USDC.approve(spender=[TWAP], amount=10000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=10000000000)
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=10000000000, srcBidAmount=2500000000, dstMinAmount=1250000000000000000, deadline=1654431405)
   TWAP.OrderCreated(id=0, maker=[user])
  web3-candies mining 1 block and advancing time by 10 seconds +2s
  web3-candies was: block 29194872 timestamp 2022-06-05T12:00:08.000Z now: block 29194873 timestamp 2022-06-05T12:00:18.000Z +2ms
  web3-candies mining 1 block and advancing time by 60 seconds +3s
  web3-candies was: block 29194874 timestamp 2022-06-05T12:00:19.000Z now: block 29194875 timestamp 2022-06-05T12:01:22.000Z +2ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +50ms
  web3-candies was: block 29194876 timestamp 2022-06-05T12:01:23.000Z now: block 29194877 timestamp 2022-06-05T12:01:33.000Z +1ms
CALL TWAP.fill(id=0)
   USDC.Transfer(from=[user], to=[TWAP], value=2500000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=5000000000)
   USDC.Approval(owner=[TWAP], spender=[UniswapV2Exchange], value=2500000000)
   USDC.Transfer(from=[TWAP], to=[UniswapV2Exchange], value=2500000000)
   USDC.Approval(owner=[TWAP], spender=[UniswapV2Exchange], value=0)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff, value=2500000000)
   USDC.Transfer(from=[UniswapV2Exchange], to=0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d, value=2500000000)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff, value=0)
   WETH.Transfer(from=0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d, to=[TWAP], value=1397201584905736267)
   <UnknownContract 0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d>.UnknownEvent(0x0000000000000000000000000000000000000000000000000000104fe324221f000000000000000000000000000000000000000000000220f1ca34a9d6b74732, [0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1])
   <UnknownContract 0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d>.UnknownEvent(0x000000000000000000000000000000000000000000000000000000009502f900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001363db7053eb504b, [0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822, 0x000000000000000000000000a5e0829caced8ffdd4de3c43696c57f7d7a678ff, 0x000000000000000000000000ce5c12eea2772efc7a665e7aa26c059d6fdc5de5])
   WETH.Transfer(from=[TWAP], to=[taker], value=10000000000000000)
   WETH.Transfer(from=[TWAP], to=[user], value=1387201584905736267)
   TWAP.OrderFilled(id=0, taker=[taker], srcAmountIn=2500000000, dstAmountOut=1387201584905736267, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 60 seconds +170ms
  web3-candies was: block 29194878 timestamp 2022-06-05T12:01:34.000Z now: block 29194879 timestamp 2022-06-05T12:02:34.000Z +2ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +41ms
  web3-candies was: block 29194880 timestamp 2022-06-05T12:02:35.000Z now: block 29194881 timestamp 2022-06-05T12:02:45.000Z +1ms
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
   TWAP.OrderFilled(id=0, taker=[taker], srcAmountIn=2500000000, dstAmountOut=1386812711570200244, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 60 seconds +173ms
  web3-candies was: block 29194882 timestamp 2022-06-05T12:02:46.000Z now: block 29194883 timestamp 2022-06-05T12:03:46.000Z +1ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +44ms
  web3-candies was: block 29194884 timestamp 2022-06-05T12:03:47.000Z now: block 29194885 timestamp 2022-06-05T12:03:57.000Z +1ms
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
   TWAP.OrderFilled(id=0, taker=[taker], srcAmountIn=2500000000, dstAmountOut=1386424000641915228, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 60 seconds +172ms
  web3-candies was: block 29194886 timestamp 2022-06-05T12:03:58.000Z now: block 29194887 timestamp 2022-06-05T12:04:59.000Z +2ms
    ✓ mutiple chunks (4566ms)
  web3-candies resetNetworkFork to 29194866 +9ms
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +406ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +251ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
CALL TWAP.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=10000000000, srcBidAmount=4000000000, dstMinAmount=2000000000000000000, deadline=1654431405)
   TWAP.OrderCreated(id=0, maker=[user])
  web3-candies mining 1 block and advancing time by 10 seconds +2s
  web3-candies was: block 29194872 timestamp 2022-06-05T12:00:08.000Z now: block 29194873 timestamp 2022-06-05T12:00:18.000Z +1ms
  web3-candies mining 1 block and advancing time by 60 seconds +3s
  web3-candies was: block 29194874 timestamp 2022-06-05T12:00:19.000Z now: block 29194875 timestamp 2022-06-05T12:01:23.000Z +3ms
  web3-candies mining 1 block and advancing time by 10 seconds +47ms
  web3-candies was: block 29194876 timestamp 2022-06-05T12:01:24.000Z now: block 29194877 timestamp 2022-06-05T12:01:34.000Z +1ms
  web3-candies mining 1 block and advancing time by 60 seconds +102ms
  web3-candies was: block 29194878 timestamp 2022-06-05T12:01:35.000Z now: block 29194879 timestamp 2022-06-05T12:02:35.000Z +1ms
  web3-candies mining 1 block and advancing time by 10 seconds +43ms
  web3-candies was: block 29194880 timestamp 2022-06-05T12:02:36.000Z now: block 29194881 timestamp 2022-06-05T12:02:46.000Z +1ms
    ✓ last chunk may be partial amount (4174ms)
  web3-candies resetNetworkFork to 29194866 +110ms
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +2ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +411ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +240ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
  web3-candies mining 1 block and advancing time by 1 seconds +2s
  web3-candies was: block 29194872 timestamp 2022-06-05T12:00:07.000Z now: block 29194873 timestamp 2022-06-05T12:00:08.000Z +1ms
  web3-candies deploying MockExchange +0ms
CREATE MockExchange.constructor() => ([MockExchange])
  web3-candies deployed MockExchange 0xA1041132B507466bE2b840b0BdFc78CA333b5861 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +240ms
  web3-candies impersonating 0x72A53cDBBcc1b9efa39c834A540550e23463AAcB +1ms
CALL WETH.transfer(to=[MockExchange], amount=10000000000000000000000)
   WETH.Transfer(from=[dstTokenWhale], to=[MockExchange], value=10000000000000000000000)
CALL MockExchange.setMockAmounts(_amounts=[0, 600000000000000000])
CALL TWAP.bid(id=0, exchange=[MockExchange], data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +717ms
  web3-candies was: block 29194877 timestamp 2022-06-05T12:00:12.000Z now: block 29194878 timestamp 2022-06-05T12:00:22.000Z +2ms
CALL TWAP.fill(id=0)
   USDC.Transfer(from=[user], to=[TWAP], value=1000000000)
   USDC.Approval(owner=[user], spender=[TWAP], value=1000000000)
   USDC.Approval(owner=[TWAP], spender=[MockExchange], value=1000000000)
   USDC.Transfer(from=[TWAP], to=[MockExchange], value=1000000000)
   USDC.Approval(owner=[TWAP], spender=[MockExchange], value=0)
   WETH.Transfer(from=[MockExchange], to=[TWAP], value=600000000000000000)
   WETH.Transfer(from=[TWAP], to=[taker], value=10000000000000000)
   WETH.Transfer(from=[TWAP], to=[user], value=590000000000000000)
   TWAP.OrderFilled(id=0, taker=[taker], srcAmountIn=1000000000, dstAmountOut=590000000000000000, fee=10000000000000000)
    ✓ outbid current bid within pending period (3140ms)
  web3-candies resetNetworkFork to 29194866 +2s
  web3-candies now block 29194866 +2s
  web3-candies deploying UniswapV2Exchange +3ms
  web3-candies deployed UniswapV2Exchange 0x74652f570B1A95235a9A054994319eeb827c5E17 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +422ms
  web3-candies deploying TWAP +2s
  web3-candies deployed TWAP 0xCE5c12eEA2772EFc7A665E7aA26c059D6fDC5de5 deployer 0x040a92b0eb92c573a1594d032b139524bc6618f4 +229ms
  web3-candies impersonating 0xF977814e90dA44bFA03b6295A0616a897441aceC +1ms
  web3-candies mining 1 block and advancing time by 1 seconds +2s
  web3-candies was: block 29194872 timestamp 2022-06-05T12:00:08.000Z now: block 29194873 timestamp 2022-06-05T12:00:09.000Z +1ms
CALL TWAP.bid(id=0, exchange=[UniswapV2Exchange], data=0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619, fee=1000000000000000)
    ✓ outbid current bid within pending period same path and amount but lower fee (557ms)

  user is vault
    - callback on each fill

·-----------------------------------|---------------------------|-------------|-----------------------------·
|       Solc version: 0.8.10        ·  Optimizer enabled: true  ·  Runs: 200  ·  Block limit: 10000000 gas  │
····································|···························|·············|······························
|  Methods                          ·              191 gwei/gas               ·       0.96 usd/matic        │
·················|··················|·············|·············|·············|···············|··············
|  Contract      ·  Method          ·  Min        ·  Max        ·  Avg        ·  # calls      ·  usd (avg)  │
·················|··················|·············|·············|·············|···············|··············
|  Bidder        ·  bid             ·          -  ·          -  ·     320270  ·            2  ·       0.06  │
·················|··················|·············|·············|·············|···············|··············
|  Bidder        ·  fill            ·     406778  ·     538575  ·     472677  ·            2  ·       0.09  │
·················|··················|·············|·············|·············|···············|··············
|  ERC20         ·  approve         ·      36162  ·      58110  ·      55506  ·           37  ·       0.01  │
·················|··················|·············|·············|·············|···············|··············
|  ERC20         ·  transfer        ·      51994  ·      63552  ·      61905  ·           38  ·       0.01  │
·················|··················|·············|·············|·············|···············|··············
|  MockExchange  ·  setMockAmounts  ·      32211  ·      69211  ·      55336  ·            8  ·       0.01  │
·················|··················|·············|·············|·············|···············|··············
|  TWAP          ·  ask             ·     250958  ·     253770  ·     251347  ·           36  ·       0.05  │
·················|··················|·············|·············|·············|···············|··············
|  TWAP          ·  bid             ·     114425  ·     314341  ·     298303  ·           26  ·       0.05  │
·················|··················|·············|·············|·············|···············|··············
|  TWAP          ·  cancel          ·      67590  ·      67602  ·      67596  ·            2  ·       0.01  │
·················|··················|·············|·············|·············|···············|··············
|  TWAP          ·  fill            ·     295828  ·     367528  ·     338737  ·           12  ·       0.06  │
·················|··················|·············|·············|·············|···············|··············
|  Deployments                      ·                                         ·  % of limit   ·             │
····································|·············|·············|·············|···············|··············
|  Bidder                           ·          -  ·          -  ·    1082387  ·       10.8 %  ·       0.20  │
····································|·············|·············|·············|···············|··············
|  MockExchange                     ·          -  ·          -  ·     587430  ·        5.9 %  ·       0.11  │
····································|·············|·············|·············|···············|··············
|  TWAP                             ·          -  ·          -  ·    1891238  ·       18.9 %  ·       0.35  │
····································|·············|·············|·············|···············|··············
|  UniswapV2Exchange                ·          -  ·          -  ·     678632  ·        6.8 %  ·       0.12  │
·-----------------------------------|-------------|-------------|-------------|---------------|-------------·

  31 passing (4m)
  14 pending

```
