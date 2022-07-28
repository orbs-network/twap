
```console
> dotc@0.0.1 test
> BLOCK=14850000 DEBUG=web3-candies hardhat test --logs

🌐 network ETH blocknumber 14850000 🌐

  DOTC
  web3-candies resetNetworkFork to 14850000 +0ms
  web3-candies now block 14850000 +3s
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +6ms
CALL USDC.transfer(to=[user], amount=1000000000000)
   USDC.Transfer(from=[srcTokenWhale], to=[user], value=1000000000000)
  web3-candies deploying UniswapV2Exchange +88ms
CREATE UniswapV2Exchange.constructor(_uniswap=0xf164fC0Ec4E93095b804a4795bBe1e041497b92a) => (0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE)
  web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +25ms
  web3-candies deploying Quoter +0ms
CREATE Quoter.constructor(_exchange=[UniswapV2Exchange]) => (0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E)
  web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +21ms
  web3-candies deploying DOTC +0ms
CREATE DOTC.constructor() => (0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f)
  web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +30ms
CALL USDC.approve(spender=[DOTC], amount=2000000000)
   USDC.Approval(owner=[user], spender=[DOTC], value=2000000000)
CALL DOTC.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1653597527)
   DOTC.OrderCreated(id=0, maker=[user])
CALL DOTC.bid(id=0, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +117ms
  web3-candies was: block 14850007 timestamp 2022-05-26T20:22:10.000Z now: block 14850008 timestamp 2022-05-26T20:22:20.000Z +2ms
CALL DOTC.fill(id=0)
   USDC.Transfer(from=[user], to=[DOTC], value=2000000000)
   USDC.Approval(owner=[DOTC], spender=[UniswapV2Exchange], value=2000000000)
   USDC.Transfer(from=[DOTC], to=[UniswapV2Exchange], value=2000000000)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xf164fC0Ec4E93095b804a4795bBe1e041497b92a, value=2000000000)
   USDC.Transfer(from=[UniswapV2Exchange], to=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, value=2000000000)
   WETH.Transfer(from=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, to=[DOTC], value=1099456688927504907)
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000046b34134ad5a0000000000000000000000000000000000000000000009137fef21c5a768f542, [0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1])
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x0000000000000000000000000000000000000000000000000000000077359400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f420e088d737a0b, [0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822, 0x000000000000000000000000f164fc0ec4e93095b804a4795bbe1e041497b92a, 0x000000000000000000000000a3f9ec5040702105b1be6ff6f583a74d0b8d9c9f])
   WETH.Transfer(from=[DOTC], to=[taker], value=10000000000000000)
   WETH.Transfer(from=[DOTC], to=[user], value=1089456688927504907)
   DOTC.OrderFilled(id=0, taker=[taker], srcAmountIn=2000000000, dstAmountOut=1089456688927504907, fee=10000000000000000)
    ✓ single chunk (307ms)
  web3-candies resetNetworkFork to 14850000 +189ms
  web3-candies now block 14850000 +935ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +3ms
  web3-candies deploying UniswapV2Exchange +27ms
  web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +12ms
  web3-candies deploying Quoter +0ms
  web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +9ms
  web3-candies deploying DOTC +0ms
  web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +11ms
CALL USDC.approve(spender=[DOTC], amount=10000000000)
   USDC.Approval(owner=[user], spender=[DOTC], value=10000000000)
CALL DOTC.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=10000000000, srcBidAmount=2500000000, dstMinAmount=1250000000000000000, deadline=1653597527)
   DOTC.OrderCreated(id=0, maker=[user])
CALL DOTC.bid(id=0, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +108ms
  web3-candies was: block 14850007 timestamp 2022-05-26T20:22:10.000Z now: block 14850008 timestamp 2022-05-26T20:22:20.000Z +2ms
CALL DOTC.fill(id=0)
   USDC.Transfer(from=[user], to=[DOTC], value=2500000000)
   USDC.Approval(owner=[DOTC], spender=[UniswapV2Exchange], value=2500000000)
   USDC.Transfer(from=[DOTC], to=[UniswapV2Exchange], value=2500000000)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xf164fC0Ec4E93095b804a4795bBe1e041497b92a, value=2500000000)
   USDC.Transfer(from=[UniswapV2Exchange], to=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, value=2500000000)
   WETH.Transfer(from=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, to=[DOTC], value=1374312048033023637)
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000046b35f02125a0000000000000000000000000000000000000000000009137c1ea6477b5028b8, [0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1])
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000000009502f9000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000013128986b98c4695, [0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822, 0x000000000000000000000000f164fc0ec4e93095b804a4795bbe1e041497b92a, 0x000000000000000000000000a3f9ec5040702105b1be6ff6f583a74d0b8d9c9f])
   WETH.Transfer(from=[DOTC], to=[taker], value=10000000000000000)
   WETH.Transfer(from=[DOTC], to=[user], value=1364312048033023637)
   DOTC.OrderFilled(id=0, taker=[taker], srcAmountIn=2500000000, dstAmountOut=1364312048033023637, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 60 seconds +176ms
  web3-candies was: block 14850009 timestamp 2022-05-26T20:22:21.000Z now: block 14850010 timestamp 2022-05-26T20:23:22.000Z +2ms
CALL DOTC.bid(id=0, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +43ms
  web3-candies was: block 14850011 timestamp 2022-05-26T20:23:23.000Z now: block 14850012 timestamp 2022-05-26T20:23:33.000Z +1ms
CALL DOTC.fill(id=0)
   USDC.Transfer(from=[user], to=[DOTC], value=2500000000)
   USDC.Approval(owner=[DOTC], spender=[UniswapV2Exchange], value=2500000000)
   USDC.Transfer(from=[DOTC], to=[UniswapV2Exchange], value=2500000000)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xf164fC0Ec4E93095b804a4795bBe1e041497b92a, value=2500000000)
   USDC.Transfer(from=[UniswapV2Exchange], to=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, value=2500000000)
   WETH.Transfer(from=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, to=[DOTC], value=1374223787579240659)
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000046b3f4050b5a000000000000000000000000000000000000000000000913690c6d067ec2b7e5, [0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1])
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000000009502f9000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000013123940fc8d70d3, [0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822, 0x000000000000000000000000f164fc0ec4e93095b804a4795bbe1e041497b92a, 0x000000000000000000000000a3f9ec5040702105b1be6ff6f583a74d0b8d9c9f])
   WETH.Transfer(from=[DOTC], to=[taker], value=10000000000000000)
   WETH.Transfer(from=[DOTC], to=[user], value=1364223787579240659)
   DOTC.OrderFilled(id=0, taker=[taker], srcAmountIn=2500000000, dstAmountOut=1364223787579240659, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 60 seconds +173ms
  web3-candies was: block 14850013 timestamp 2022-05-26T20:23:34.000Z now: block 14850014 timestamp 2022-05-26T20:24:34.000Z +1ms
CALL DOTC.bid(id=0, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +43ms
  web3-candies was: block 14850015 timestamp 2022-05-26T20:24:35.000Z now: block 14850016 timestamp 2022-05-26T20:24:45.000Z +1ms
CALL DOTC.fill(id=0)
   USDC.Transfer(from=[user], to=[DOTC], value=2500000000)
   USDC.Approval(owner=[DOTC], spender=[UniswapV2Exchange], value=2500000000)
   USDC.Transfer(from=[DOTC], to=[UniswapV2Exchange], value=2500000000)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xf164fC0Ec4E93095b804a4795bBe1e041497b92a, value=2500000000)
   USDC.Transfer(from=[UniswapV2Exchange], to=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, value=2500000000)
   WETH.Transfer(from=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, to=[DOTC], value=1374135535631776772)
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000046b48908045a00000000000000000000000000000000000000000000091355fa8409442ffbe1, [0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1])
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000000009502f900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001311e8fd3a92bc04, [0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822, 0x000000000000000000000000f164fc0ec4e93095b804a4795bbe1e041497b92a, 0x000000000000000000000000a3f9ec5040702105b1be6ff6f583a74d0b8d9c9f])
   WETH.Transfer(from=[DOTC], to=[taker], value=10000000000000000)
   WETH.Transfer(from=[DOTC], to=[user], value=1364135535631776772)
   DOTC.OrderFilled(id=0, taker=[taker], srcAmountIn=2500000000, dstAmountOut=1364135535631776772, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 60 seconds +159ms
  web3-candies was: block 14850017 timestamp 2022-05-26T20:24:46.000Z now: block 14850018 timestamp 2022-05-26T20:25:46.000Z +1ms
CALL DOTC.bid(id=0, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +42ms
  web3-candies was: block 14850019 timestamp 2022-05-26T20:25:47.000Z now: block 14850020 timestamp 2022-05-26T20:25:57.000Z +1ms
CALL DOTC.fill(id=0)
   USDC.Transfer(from=[user], to=[DOTC], value=2500000000)
   USDC.Approval(owner=[DOTC], spender=[UniswapV2Exchange], value=2500000000)
   USDC.Transfer(from=[DOTC], to=[UniswapV2Exchange], value=2500000000)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xf164fC0Ec4E93095b804a4795bBe1e041497b92a, value=2500000000)
   USDC.Transfer(from=[UniswapV2Exchange], to=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, value=2500000000)
   WETH.Transfer(from=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, to=[DOTC], value=1374047292189538647)
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000046b51e0afd5a00000000000000000000000000000000000000000000091342e8eb4dd0a4828a, [0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1])
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000000009502f90000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000131198bb738b7957, [0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822, 0x000000000000000000000000f164fc0ec4e93095b804a4795bbe1e041497b92a, 0x000000000000000000000000a3f9ec5040702105b1be6ff6f583a74d0b8d9c9f])
   WETH.Transfer(from=[DOTC], to=[taker], value=10000000000000000)
   WETH.Transfer(from=[DOTC], to=[user], value=1364047292189538647)
   DOTC.OrderFilled(id=0, taker=[taker], srcAmountIn=2500000000, dstAmountOut=1364047292189538647, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 60 seconds +166ms
  web3-candies was: block 14850021 timestamp 2022-05-26T20:25:58.000Z now: block 14850022 timestamp 2022-05-26T20:26:58.000Z +1ms
    ✓ mutiple chunks (930ms)
  web3-candies resetNetworkFork to 14850000 +10ms
  web3-candies now block 14850000 +914ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +3ms
  web3-candies deploying UniswapV2Exchange +24ms
  web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +9ms
  web3-candies deploying Quoter +1ms
  web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +6ms
  web3-candies deploying DOTC +0ms
  web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +8ms
CALL DOTC.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=10000000000, srcBidAmount=4000000000, dstMinAmount=2000000000000000000, deadline=1653597527)
   DOTC.OrderCreated(id=0, maker=[user])
  web3-candies mining 1 block and advancing time by 10 seconds +76ms
  web3-candies was: block 14850007 timestamp 2022-05-26T20:22:10.000Z now: block 14850008 timestamp 2022-05-26T20:22:20.000Z +1ms
  web3-candies mining 1 block and advancing time by 60 seconds +106ms
  web3-candies was: block 14850009 timestamp 2022-05-26T20:22:21.000Z now: block 14850010 timestamp 2022-05-26T20:23:21.000Z +1ms
  web3-candies mining 1 block and advancing time by 10 seconds +38ms
  web3-candies was: block 14850011 timestamp 2022-05-26T20:23:22.000Z now: block 14850012 timestamp 2022-05-26T20:23:32.000Z +1ms
  web3-candies mining 1 block and advancing time by 60 seconds +105ms
  web3-candies was: block 14850013 timestamp 2022-05-26T20:23:33.000Z now: block 14850014 timestamp 2022-05-26T20:24:33.000Z +1ms
  web3-candies mining 1 block and advancing time by 10 seconds +52ms
  web3-candies was: block 14850015 timestamp 2022-05-26T20:24:34.000Z now: block 14850016 timestamp 2022-05-26T20:24:44.000Z +3ms
CALL DOTC.fill(id=0)
   USDC.Transfer(from=[user], to=[DOTC], value=2000000000)
   USDC.Approval(owner=[DOTC], spender=[UniswapV2Exchange], value=2000000000)
   USDC.Transfer(from=[DOTC], to=[UniswapV2Exchange], value=2000000000)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xf164fC0Ec4E93095b804a4795bBe1e041497b92a, value=2000000000)
   USDC.Transfer(from=[UniswapV2Exchange], to=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, value=2000000000)
   WETH.Transfer(from=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, to=[DOTC], value=1099230763940968507)
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000046b51e0afd5a00000000000000000000000000000000000000000000091342e8eb32a7190a1a, [0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1])
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x0000000000000000000000000000000000000000000000000000000077359400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f41408e4ae1f83b, [0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822, 0x000000000000000000000000f164fc0ec4e93095b804a4795bbe1e041497b92a, 0x000000000000000000000000a3f9ec5040702105b1be6ff6f583a74d0b8d9c9f])
   WETH.Transfer(from=[DOTC], to=[taker], value=10000000000000000)
   WETH.Transfer(from=[DOTC], to=[user], value=1089230763940968507)
   DOTC.OrderFilled(id=0, taker=[taker], srcAmountIn=2000000000, dstAmountOut=1089230763940968507, fee=10000000000000000)
    ✓ last chunk may be partial amount (630ms)
  web3-candies resetNetworkFork to 14850000 +247ms
  web3-candies now block 14850000 +1s
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +2ms
  web3-candies deploying UniswapV2Exchange +21ms
  web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +8ms
  web3-candies deploying Quoter +0ms
  web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +8ms
  web3-candies deploying DOTC +0ms
  web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +8ms
CALL DOTC.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=1000000000, dstMinAmount=500000000000000000, deadline=1653597527)
   DOTC.OrderCreated(id=0, maker=[user])
  web3-candies mining 1 block and advancing time by 1 seconds +75ms
  web3-candies was: block 14850007 timestamp 2022-05-26T20:22:10.000Z now: block 14850008 timestamp 2022-05-26T20:22:11.000Z +1ms
  web3-candies deploying MockExchange +0ms
CREATE MockExchange.constructor() => (0x982F57da8A70ea4f8309AAaa8673400072cEd26B)
  web3-candies deployed MockExchange 0x982F57da8A70ea4f8309AAaa8673400072cEd26B deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +15ms
CALL UnknownContractAndFunction(to=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, input=0xd0e30db0, ret=0x)
   <UnknownContract [WETH]>.UnknownEvent(0x00000000000000000000000000000000000000000000d3c21bcecceda1000000, [0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c, 0x00000000000000000000000023545493dfd3279d725abcb183a25f20013cf56b])
CALL WETH.transfer(to=[MockExchange], amount=1000000000000000000000000)
   WETH.Transfer(from=[deployer], to=[MockExchange], value=1000000000000000000000000)
CALL MockExchange.setMockAmounts(_amounts=[0, 600000000000000000])
CALL DOTC.bid(id=0, exchange=[MockExchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +91ms
  web3-candies was: block 14850013 timestamp 2022-05-26T20:22:16.000Z now: block 14850014 timestamp 2022-05-26T20:22:26.000Z +1ms
CALL DOTC.fill(id=0)
   USDC.Transfer(from=[user], to=[DOTC], value=1000000000)
   USDC.Approval(owner=[DOTC], spender=[MockExchange], value=1000000000)
   USDC.Transfer(from=[DOTC], to=[MockExchange], value=1000000000)
   WETH.Transfer(from=[MockExchange], to=[DOTC], value=600000000000000000)
   WETH.Transfer(from=[DOTC], to=[taker], value=10000000000000000)
   WETH.Transfer(from=[DOTC], to=[user], value=590000000000000000)
   DOTC.OrderFilled(id=0, taker=[taker], srcAmountIn=1000000000, dstAmountOut=590000000000000000, fee=10000000000000000)
    ✓ outbid current bid within pending period (291ms)
  web3-candies resetNetworkFork to 14850000 +108ms
  web3-candies now block 14850000 +978ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +2ms
  web3-candies deploying UniswapV2Exchange +23ms
  web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +9ms
  web3-candies deploying Quoter +0ms
  web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +7ms
  web3-candies deploying DOTC +0ms
  web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +9ms
  web3-candies mining 1 block and advancing time by 1 seconds +70ms
  web3-candies was: block 14850007 timestamp 2022-05-26T20:22:10.000Z now: block 14850008 timestamp 2022-05-26T20:22:11.000Z +1ms
CALL DOTC.bid(id=0, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=1000000000000000)
    ✓ outbid current bid within pending period same path and amount but lower fee (128ms)

  Errors
    order
  web3-candies resetNetworkFork to 14850000 +58ms
  web3-candies now block 14850000 +997ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +2ms
  web3-candies deploying UniswapV2Exchange +22ms
  web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +8ms
  web3-candies deploying Quoter +1ms
  web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +7ms
  web3-candies deploying DOTC +0ms
  web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +9ms
      ✓ invalid id (13ms)
    verify bid
  web3-candies resetNetworkFork to 14850000 +15ms
  web3-candies now block 14850000 +972ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +3ms
  web3-candies deploying UniswapV2Exchange +26ms
  web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +8ms
  web3-candies deploying Quoter +0ms
  web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +8ms
  web3-candies deploying DOTC +1ms
  web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +7ms
CALL DOTC.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1653596526)
   DOTC.OrderCreated(id=0, maker=[user])
CALL USDC.approve(spender=[DOTC], amount=2000000000)
   USDC.Approval(owner=[user], spender=[DOTC], value=2000000000)
CALL DOTC.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1653596540)
   DOTC.OrderCreated(id=1, maker=[user])
CALL DOTC.bid(id=1, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
      ✓ expired (139ms)
  web3-candies resetNetworkFork to 14850000 +140ms
  web3-candies now block 14850000 +2s
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +2ms
  web3-candies deploying UniswapV2Exchange +21ms
  web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +10ms
  web3-candies deploying Quoter +0ms
  web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +9ms
  web3-candies deploying DOTC +0ms
  web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +8ms
CALL DOTC.bid(id=0, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
CALL USDC.approve(spender=[DOTC], amount=2000000000)
   USDC.Approval(owner=[user], spender=[DOTC], value=2000000000)
CALL DOTC.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1653597531)
   DOTC.OrderCreated(id=1, maker=[user])
CALL DOTC.bid(id=1, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
      ✓ low bid (185ms)
  web3-candies resetNetworkFork to 14850000 +186ms
  web3-candies now block 14850000 +1s
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +3ms
  web3-candies deploying UniswapV2Exchange +25ms
  web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +9ms
  web3-candies deploying Quoter +0ms
  web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +7ms
  web3-candies deploying DOTC +0ms
  web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +8ms
  web3-candies mining 1 block and advancing time by 30 seconds +58ms
  web3-candies was: block 14850007 timestamp 2022-05-26T20:22:10.000Z now: block 14850008 timestamp 2022-05-26T20:22:40.000Z +1ms
CALL DOTC.fill(id=0)
   USDC.Transfer(from=[user], to=[DOTC], value=1000000000)
   USDC.Approval(owner=[DOTC], spender=[UniswapV2Exchange], value=1000000000)
   USDC.Transfer(from=[DOTC], to=[UniswapV2Exchange], value=1000000000)
   USDC.Approval(owner=[UniswapV2Exchange], spender=0xf164fC0Ec4E93095b804a4795bBe1e041497b92a, value=1000000000)
   USDC.Transfer(from=[UniswapV2Exchange], to=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, value=1000000000)
   WETH.Transfer(from=0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc, to=[DOTC], value=549735395100479598)
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000046b30599e35a0000000000000000000000000000000000000000000009138790226053701edf, [0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1])
   <UnknownContract 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc>.UnknownEvent(0x000000000000000000000000000000000000000000000000000000003b9aca000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007a10d6de16c506e, [0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822, 0x000000000000000000000000f164fc0ec4e93095b804a4795bbe1e041497b92a, 0x000000000000000000000000a3f9ec5040702105b1be6ff6f583a74d0b8d9c9f])
   WETH.Transfer(from=[DOTC], to=[taker], value=10000000000000000)
   WETH.Transfer(from=[DOTC], to=[user], value=539735395100479598)
   DOTC.OrderFilled(id=0, taker=[taker], srcAmountIn=1000000000, dstAmountOut=539735395100479598, fee=10000000000000000)
CALL DOTC.bid(id=0, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 60 seconds +171ms
  web3-candies was: block 14850010 timestamp 2022-05-26T20:22:42.000Z now: block 14850011 timestamp 2022-05-26T20:23:42.000Z +2ms
CALL DOTC.bid(id=0, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
      ✓ recently filled (275ms)
  web3-candies resetNetworkFork to 14850000 +44ms
  web3-candies now block 14850000 +1s
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +2ms
  web3-candies deploying UniswapV2Exchange +25ms
  web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +10ms
  web3-candies deploying Quoter +0ms
  web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +8ms
  web3-candies deploying DOTC +0ms
  web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +7ms
CALL DOTC.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=1000000000, dstMinAmount=2000000000000000000, deadline=1653597527)
   DOTC.OrderCreated(id=0, maker=[user])
      ✓ insufficient amount out (61ms)
  web3-candies resetNetworkFork to 14850000 +62ms
  web3-candies now block 14850000 +961ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +2ms
  web3-candies deploying UniswapV2Exchange +22ms
  web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +9ms
  web3-candies deploying Quoter +0ms
  web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +7ms
  web3-candies deploying DOTC +0ms
  web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +8ms
CALL DOTC.bid(id=0, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=100000000000000000)
      ✓ insufficient amount out with excess fee (61ms)
  web3-candies resetNetworkFork to 14850000 +62ms
  web3-candies now block 14850000 +1s
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +2ms
  web3-candies deploying UniswapV2Exchange +45ms
  web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +22ms
  web3-candies deploying Quoter +4ms
  web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +8ms
  web3-candies deploying DOTC +0ms
  web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +10ms
CALL DOTC.bid(id=0, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=1000000000000000000)
      ✓ fee underflow protection (61ms)
  web3-candies resetNetworkFork to 14850000 +62ms
  web3-candies now block 14850000 +1s
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +2ms
  web3-candies deploying UniswapV2Exchange +20ms
  web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +8ms
  web3-candies deploying Quoter +0ms
  web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +7ms
  web3-candies deploying DOTC +0ms
  web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +7ms
CALL DOTC.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=1500000000, dstMinAmount=750000000000000000, deadline=1653597527)
   DOTC.OrderCreated(id=0, maker=[user])
  web3-candies mining 1 block and advancing time by 10 seconds +70ms
  web3-candies was: block 14850007 timestamp 2022-05-26T20:22:10.000Z now: block 14850008 timestamp 2022-05-26T20:22:20.000Z +1ms
  web3-candies mining 1 block and advancing time by 60 seconds +104ms
  web3-candies was: block 14850009 timestamp 2022-05-26T20:22:21.000Z now: block 14850010 timestamp 2022-05-26T20:23:21.000Z +1ms
  web3-candies deploying MockExchange +0ms
CREATE MockExchange.constructor() => ([MockExchange])
  web3-candies deployed MockExchange 0x982F57da8A70ea4f8309AAaa8673400072cEd26B deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +14ms
CALL UnknownContractAndFunction(to=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, input=0xd0e30db0, ret=0x)
   <UnknownContract [WETH]>.UnknownEvent(0x00000000000000000000000000000000000000000000d3c21bcecceda1000000, [0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c, 0x00000000000000000000000023545493dfd3279d725abcb183a25f20013cf56b])
CALL WETH.transfer(to=[MockExchange], amount=1000000000000000000000000)
   WETH.Transfer(from=[deployer], to=[MockExchange], value=1000000000000000000000000)
CALL MockExchange.setMockAmounts(_amounts=[0, 100000000000000000])
CALL DOTC.bid(id=0, exchange=[MockExchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
      ✓ insufficient amount out when last partial fill (264ms)
  web3-candies resetNetworkFork to 14850000 +75ms
  web3-candies now block 14850000 +943ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +2ms
  web3-candies deploying UniswapV2Exchange +22ms
  web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +8ms
  web3-candies deploying Quoter +0ms
  web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +6ms
  web3-candies deploying DOTC +1ms
  web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +7ms
CALL USDC.approve(spender=[DOTC], amount=0)
   USDC.Approval(owner=[user], spender=[DOTC], value=0)
CALL DOTC.bid(id=0, exchange=[UniswapV2Exchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
      ✓ insufficient user allowance (82ms)
  web3-candies resetNetworkFork to 14850000 +83ms
  web3-candies now block 14850000 +1s
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +2ms
  web3-candies deploying UniswapV2Exchange +20ms
  web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +9ms
  web3-candies deploying Quoter +0ms
  web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +6ms
  web3-candies deploying DOTC +0ms
  web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +8ms
CALL USDC.transfer(to=[taker], amount=1000000000000)
   USDC.Transfer(from=[user], to=[taker], value=1000000000000)
      ✓ insufficient user balance (78ms)
    perform fill
  web3-candies resetNetworkFork to 14850000 +78ms
  web3-candies now block 14850000 +976ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +2ms
  web3-candies deploying UniswapV2Exchange +21ms
  web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +9ms
  web3-candies deploying Quoter +0ms
  web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +6ms
  web3-candies deploying DOTC +0ms
  web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +7ms
  web3-candies mining 1 block and advancing time by 10000 seconds +58ms
  web3-candies was: block 14850007 timestamp 2022-05-26T20:22:10.000Z now: block 14850008 timestamp 2022-05-26T23:08:50.000Z +2ms
      ✓ expired (72ms)
  web3-candies resetNetworkFork to 14850000 +12ms
  web3-candies now block 14850000 +971ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +3ms
  web3-candies deploying UniswapV2Exchange +22ms
  web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +9ms
  web3-candies deploying Quoter +0ms
  web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +6ms
  web3-candies deploying DOTC +1ms
  web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +7ms
CALL DOTC.fill(id=0)
      ✓ invalid taker when no existing bid (39ms)
  web3-candies resetNetworkFork to 14850000 +40ms
  web3-candies now block 14850000 +1s
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +2ms
  web3-candies deploying UniswapV2Exchange +20ms
  web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +9ms
  web3-candies deploying Quoter +0ms
  web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +7ms
  web3-candies deploying DOTC +0ms
  web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +8ms
CALL DOTC.fill(id=0)
      ✓ invalid taker when not the winning taker (76ms)
  web3-candies resetNetworkFork to 14850000 +76ms
  web3-candies now block 14850000 +924ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +3ms
  web3-candies deploying UniswapV2Exchange +43ms
  web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +17ms
  web3-candies deploying Quoter +0ms
  web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +21ms
  web3-candies deploying DOTC +0ms
  web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +10ms
CALL DOTC.fill(id=0)
      ✓ pending bid when still in bidding window (87ms)
  web3-candies resetNetworkFork to 14850000 +88ms
  web3-candies now block 14850000 +945ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +2ms
  web3-candies deploying UniswapV2Exchange +24ms
  web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +10ms
  web3-candies deploying Quoter +0ms
  web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +7ms
  web3-candies deploying DOTC +0ms
  web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +9ms
  web3-candies deploying MockExchange +26ms
CREATE MockExchange.constructor() => ([MockExchange])
  web3-candies deployed MockExchange 0x982F57da8A70ea4f8309AAaa8673400072cEd26B deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +14ms
CALL UnknownContractAndFunction(to=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, input=0xd0e30db0, ret=0x)
   <UnknownContract [WETH]>.UnknownEvent(0x00000000000000000000000000000000000000000000d3c21bcecceda1000000, [0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c, 0x00000000000000000000000023545493dfd3279d725abcb183a25f20013cf56b])
CALL WETH.transfer(to=[MockExchange], amount=1000000000000000000000000)
   WETH.Transfer(from=[deployer], to=[MockExchange], value=1000000000000000000000000)
CALL MockExchange.setMockAmounts(_amounts=[0, 1000000000000000000])
CALL DOTC.bid(id=0, exchange=[MockExchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=10000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +96ms
  web3-candies was: block 14850011 timestamp 2022-05-26T20:22:14.000Z now: block 14850012 timestamp 2022-05-26T20:22:24.000Z +2ms
CALL MockExchange.setMockAmounts(_amounts=[0, 100000000000000000])
CALL DOTC.fill(id=0)
      ✓ insufficient out (221ms)
  web3-candies resetNetworkFork to 14850000 +83ms
  web3-candies now block 14850000 +976ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +4ms
  web3-candies deploying UniswapV2Exchange +26ms
  web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +9ms
  web3-candies deploying Quoter +0ms
  web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +7ms
  web3-candies deploying DOTC +0ms
  web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +9ms
  web3-candies deploying MockExchange +23ms
  web3-candies deployed MockExchange 0x982F57da8A70ea4f8309AAaa8673400072cEd26B deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +6ms
CALL DOTC.bid(id=0, exchange=[MockExchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=100000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +50ms
  web3-candies was: block 14850011 timestamp 2022-05-26T20:22:14.000Z now: block 14850012 timestamp 2022-05-26T20:22:24.000Z +1ms
CALL MockExchange.setMockAmounts(_amounts=[0, 500000000000000000])
CALL DOTC.fill(id=0)
      ✓ insufficient out with excess fee (166ms)
  web3-candies resetNetworkFork to 14850000 +86ms
  web3-candies now block 14850000 +941ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +2ms
  web3-candies deploying UniswapV2Exchange +24ms
  web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +7ms
  web3-candies deploying Quoter +1ms
  web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +9ms
  web3-candies deploying DOTC +0ms
  web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +8ms
  web3-candies deploying MockExchange +25ms
  web3-candies deployed MockExchange 0x982F57da8A70ea4f8309AAaa8673400072cEd26B deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +7ms
CALL MockExchange.setMockAmounts(_amounts=[0, 10000000000000000000])
CALL DOTC.bid(id=0, exchange=[MockExchange], data=0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, fee=1000000000000000000)
  web3-candies mining 1 block and advancing time by 10 seconds +58ms
  web3-candies was: block 14850011 timestamp 2022-05-26T20:22:14.000Z now: block 14850012 timestamp 2022-05-26T20:22:24.000Z +1ms
      ✓ fee subtracted from dstAmountOut underflow protection (144ms)
  web3-candies resetNetworkFork to 14850000 +54ms
  web3-candies now block 14850000 +1s
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +2ms
  web3-candies deploying UniswapV2Exchange +24ms
  web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +9ms
  web3-candies deploying Quoter +0ms
  web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +7ms
  web3-candies deploying DOTC +0ms
  web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +9ms
CALL USDC.approve(spender=[DOTC], amount=1000000)
   USDC.Approval(owner=[user], spender=[DOTC], value=1000000)
CALL DOTC.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=1000000, srcBidAmount=1000000, dstMinAmount=1000000000000000000, deadline=1653597527)
   DOTC.OrderCreated(id=0, maker=[user])
CALL DOTC.cancel(id=0)
      ✓ cancel only from maker (65ms)

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
  web3-candies resetNetworkFork to 14850000 +67ms
  web3-candies now block 14850000 +987ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +2ms
  web3-candies deploying UniswapV2Exchange +21ms
  web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +9ms
  web3-candies deploying Quoter +0ms
  web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +7ms
  web3-candies deploying DOTC +0ms
  web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +7ms
CALL USDC.approve(spender=[DOTC], amount=3000000)
   USDC.Approval(owner=[user], spender=[DOTC], value=3000000)
CALL DOTC.ask(exchange=0x0000000000000000000000000000000000000000, srcToken=[USDC], dstToken=[WETH], srcAmount=3000000, srcBidAmount=2000000, dstMinAmount=1000000000000000000, deadline=1653596627)
   DOTC.OrderCreated(id=0, maker=[user])
    ✓ maker creates ask order, emits event (56ms)
  web3-candies resetNetworkFork to 14850000 +58ms
  web3-candies now block 14850000 +1s
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +2ms
  web3-candies deploying UniswapV2Exchange +20ms
  web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +9ms
  web3-candies deploying Quoter +0ms
  web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +8ms
  web3-candies deploying DOTC +0ms
  web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +8ms
    ✓ bid sets Bid fields (69ms)
  web3-candies resetNetworkFork to 14850000 +69ms
  web3-candies now block 14850000 +1s
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +2ms
  web3-candies deploying UniswapV2Exchange +66ms
  web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +10ms
  web3-candies deploying Quoter +0ms
  web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +7ms
  web3-candies deploying DOTC +0ms
  web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +8ms
  web3-candies mining 1 block and advancing time by 30 seconds +65ms
  web3-candies was: block 14850007 timestamp 2022-05-26T20:22:10.000Z now: block 14850008 timestamp 2022-05-26T20:22:40.000Z +1ms
    ✓ fill sets Fill fields and clears the Bid, emits event (177ms)
  web3-candies resetNetworkFork to 14850000 +112ms
  web3-candies now block 14850000 +981ms
  web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +3ms
  web3-candies deploying UniswapV2Exchange +20ms
  web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +9ms
  web3-candies deploying Quoter +1ms
  web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +7ms
  web3-candies deploying DOTC +0ms
  web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +8ms
CALL DOTC.cancel(id=0)
    ✓ cancel order (62ms)

  user is vault
    - callback on each fill

·-----------------------------------|---------------------------|-------------|-----------------------------·
|       Solc version: 0.8.10        ·  Optimizer enabled: true  ·  Runs: 200  ·  Block limit: 10000000 gas  │
····································|···························|·············|······························
|  Methods                          ·               7 gwei/gas                ·       1621.84 usd/eth       │
·················|··················|·············|·············|·············|···············|··············
|  Contract      ·  Method          ·  Min        ·  Max        ·  Avg        ·  # calls      ·  usd (avg)  │
·················|··················|·············|·············|·············|···············|··············
|  DOTC          ·  ask             ·     250958  ·     253758  ·     251159  ·           28  ·       2.85  │
·················|··················|·············|·············|·············|···············|··············
|  DOTC          ·  bid             ·     116644  ·     316550  ·     300513  ·           26  ·       3.41  │
·················|··················|·············|·············|·············|···············|··············
|  DOTC          ·  cancel          ·          -  ·          -  ·      67590  ·            1  ·       0.77  │
·················|··················|·············|·············|·············|···············|··············
|  DOTC          ·  fill            ·     293620  ·     363867  ·     335197  ·           12  ·       3.81  │
·················|··················|·············|·············|·············|···············|··············
|  ERC20         ·  approve         ·      38027  ·      59975  ·      57835  ·           29  ·       0.66  │
·················|··················|·············|·············|·············|···············|··············
|  ERC20         ·  transfer        ·      46794  ·      65625  ·      62626  ·           33  ·       0.71  │
·················|··················|·············|·············|·············|···············|··············
|  MockExchange  ·  setMockAmounts  ·      32211  ·      69211  ·      55336  ·            8  ·       0.63  │
·················|··················|·············|·············|·············|···············|··············
|  Deployments                      ·                                         ·  % of limit   ·             │
····································|·············|·············|·············|···············|··············
|  DOTC                             ·          -  ·          -  ·    1891250  ·       18.9 %  ·      21.47  │
····································|·············|·············|·············|···············|··············
|  MockExchange                     ·          -  ·          -  ·     587430  ·        5.9 %  ·       6.67  │
····································|·············|·············|·············|···············|··············
|  Quoter                           ·          -  ·          -  ·     419731  ·        4.2 %  ·       4.77  │
····································|·············|·············|·············|···············|··············
|  UniswapV2Exchange                ·          -  ·          -  ·     678632  ·        6.8 %  ·       7.70  │
·-----------------------------------|-------------|-------------|-------------|---------------|-------------·

  27 passing (36s)
  13 pending
```
