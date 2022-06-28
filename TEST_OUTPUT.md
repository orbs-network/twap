
```console
> dotc@0.0.1 test
> BLOCK=14850000 DEBUG=web3-candies hardhat test --logs

🌐 network ETH blocknumber 14850000 🌐

DOTC
web3-candies resetNetworkFork to 14850000 +0ms
web3-candies now block 14850000 +4s
web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +9ms
CALL USDC.transfer(to=[user], amount=1000000000000)
USDC.Transfer(from=[srcTokenWhale], to=[user], value=1000000000000)
web3-candies deploying UniswapV2Exchange +186ms
CREATE UniswapV2Exchange.constructor(_uniswap=0xf164fC0Ec4E93095b804a4795bBe1e041497b92a) => (0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE)
web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +54ms
web3-candies deploying Quoter +1ms
CREATE Quoter.constructor(_exchange=[UniswapV2Exchange]) => (0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E)
web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +46ms
web3-candies deploying DOTC +1ms
CREATE DOTC.constructor() => (0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f)
web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +60ms
CALL USDC.approve(spender=[DOTC], amount=2000000000)
USDC.Approval(owner=[user], spender=[DOTC], value=2000000000)
CALL DOTC.ask(srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1653597527)
DOTC.OrderCreated(id=0, maker=[user])
CALL DOTC.bid(id=0, exchange=[UniswapV2Exchange], path=[[USDC], [WETH]], fee=10000000000000000)
web3-candies mining 1 block and advancing time by 10 seconds +276ms
web3-candies was: block 14850007 timestamp 2022-05-26T20:22:10.000Z now: block 14850008 timestamp 2022-05-26T20:22:20.000Z +6ms
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
✓ single chunk (702ms)
web3-candies resetNetworkFork to 14850000 +421ms
web3-candies now block 14850000 +2s
web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +14ms
web3-candies deploying UniswapV2Exchange +63ms
web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +21ms
web3-candies deploying Quoter +1ms
web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +14ms
web3-candies deploying DOTC +1ms
web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +18ms
CALL USDC.approve(spender=[DOTC], amount=10000000000)
USDC.Approval(owner=[user], spender=[DOTC], value=10000000000)
CALL DOTC.ask(srcToken=[USDC], dstToken=[WETH], srcAmount=10000000000, srcBidAmount=2500000000, dstMinAmount=1250000000000000000, deadline=1653597527)
DOTC.OrderCreated(id=0, maker=[user])
CALL DOTC.bid(id=0, exchange=[UniswapV2Exchange], path=[[USDC], [WETH]], fee=10000000000000000)
web3-candies mining 1 block and advancing time by 10 seconds +221ms
web3-candies was: block 14850007 timestamp 2022-05-26T20:22:10.000Z now: block 14850008 timestamp 2022-05-26T20:22:20.000Z +4ms
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
web3-candies mining 1 block and advancing time by 60 seconds +366ms
web3-candies was: block 14850009 timestamp 2022-05-26T20:22:21.000Z now: block 14850010 timestamp 2022-05-26T20:23:21.000Z +3ms
CALL DOTC.bid(id=0, exchange=[UniswapV2Exchange], path=[[USDC], [WETH]], fee=10000000000000000)
web3-candies mining 1 block and advancing time by 10 seconds +89ms
web3-candies was: block 14850011 timestamp 2022-05-26T20:23:22.000Z now: block 14850012 timestamp 2022-05-26T20:23:32.000Z +3ms
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
web3-candies mining 1 block and advancing time by 60 seconds +339ms
web3-candies was: block 14850013 timestamp 2022-05-26T20:23:33.000Z now: block 14850014 timestamp 2022-05-26T20:24:34.000Z +3ms
CALL DOTC.bid(id=0, exchange=[UniswapV2Exchange], path=[[USDC], [WETH]], fee=10000000000000000)
web3-candies mining 1 block and advancing time by 10 seconds +88ms
web3-candies was: block 14850015 timestamp 2022-05-26T20:24:35.000Z now: block 14850016 timestamp 2022-05-26T20:24:45.000Z +2ms
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
web3-candies mining 1 block and advancing time by 60 seconds +507ms
web3-candies was: block 14850017 timestamp 2022-05-26T20:24:46.000Z now: block 14850018 timestamp 2022-05-26T20:25:46.000Z +4ms
CALL DOTC.bid(id=0, exchange=[UniswapV2Exchange], path=[[USDC], [WETH]], fee=10000000000000000)
web3-candies mining 1 block and advancing time by 10 seconds +84ms
web3-candies was: block 14850019 timestamp 2022-05-26T20:25:47.000Z now: block 14850020 timestamp 2022-05-26T20:25:57.000Z +3ms
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
web3-candies mining 1 block and advancing time by 60 seconds +369ms
web3-candies was: block 14850021 timestamp 2022-05-26T20:25:58.000Z now: block 14850022 timestamp 2022-05-26T20:26:59.000Z +3ms
✓ mutiple chunks (2110ms)
web3-candies resetNetworkFork to 14850000 +23ms
web3-candies now block 14850000 +2s
web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +13ms
web3-candies deploying UniswapV2Exchange +52ms
web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +19ms
web3-candies deploying Quoter +1ms
web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +19ms
web3-candies deploying DOTC +0ms
web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +16ms
CALL DOTC.ask(srcToken=[USDC], dstToken=[WETH], srcAmount=10000000000, srcBidAmount=4000000000, dstMinAmount=2000000000000000000, deadline=1653597527)
DOTC.OrderCreated(id=0, maker=[user])
web3-candies mining 1 block and advancing time by 10 seconds +156ms
web3-candies was: block 14850007 timestamp 2022-05-26T20:22:10.000Z now: block 14850008 timestamp 2022-05-26T20:22:20.000Z +2ms
web3-candies mining 1 block and advancing time by 60 seconds +235ms
web3-candies was: block 14850009 timestamp 2022-05-26T20:22:21.000Z now: block 14850010 timestamp 2022-05-26T20:23:21.000Z +2ms
web3-candies mining 1 block and advancing time by 10 seconds +72ms
web3-candies was: block 14850011 timestamp 2022-05-26T20:23:22.000Z now: block 14850012 timestamp 2022-05-26T20:23:32.000Z +3ms
web3-candies mining 1 block and advancing time by 60 seconds +210ms
web3-candies was: block 14850013 timestamp 2022-05-26T20:23:33.000Z now: block 14850014 timestamp 2022-05-26T20:24:33.000Z +3ms
web3-candies mining 1 block and advancing time by 10 seconds +92ms
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
✓ last chunk may be partial amount (1085ms)
web3-candies resetNetworkFork to 14850000 +309ms
web3-candies now block 14850000 +2s
web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +4ms
web3-candies deploying UniswapV2Exchange +132ms
web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +94ms
web3-candies deploying Quoter +1ms
web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +38ms
web3-candies deploying DOTC +0ms
web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +17ms
CALL DOTC.ask(srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=1000000000, dstMinAmount=500000000000000000, deadline=1653597527)
DOTC.OrderCreated(id=0, maker=[user])
web3-candies mining 1 block and advancing time by 1 seconds +139ms
web3-candies was: block 14850007 timestamp 2022-05-26T20:22:10.000Z now: block 14850008 timestamp 2022-05-26T20:22:11.000Z +3ms
web3-candies deploying MockExchange +0ms
CREATE MockExchange.constructor() => (0x982F57da8A70ea4f8309AAaa8673400072cEd26B)
web3-candies deployed MockExchange 0x982F57da8A70ea4f8309AAaa8673400072cEd26B deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +26ms
CALL UnknownContractAndFunction(to=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, input=0xd0e30db0, ret=0x)
<UnknownContract [WETH]>.UnknownEvent(0x00000000000000000000000000000000000000000000d3c21bcecceda1000000, [0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c, 0x00000000000000000000000023545493dfd3279d725abcb183a25f20013cf56b])
CALL WETH.transfer(to=[MockExchange], amount=1000000000000000000000000)
WETH.Transfer(from=[deployer], to=[MockExchange], value=1000000000000000000000000)
CALL MockExchange.setMockAmounts(_amounts=[0, 600000000000000000])
CALL DOTC.bid(id=0, exchange=[MockExchange], path=[[USDC], [WETH]], fee=10000000000000000)
web3-candies mining 1 block and advancing time by 10 seconds +160ms
web3-candies was: block 14850013 timestamp 2022-05-26T20:22:16.000Z now: block 14850014 timestamp 2022-05-26T20:22:26.000Z +3ms
CALL DOTC.fill(id=0)
USDC.Transfer(from=[user], to=[DOTC], value=1000000000)
USDC.Approval(owner=[DOTC], spender=[MockExchange], value=1000000000)
USDC.Transfer(from=[DOTC], to=[MockExchange], value=1000000000)
WETH.Transfer(from=[MockExchange], to=[DOTC], value=600000000000000000)
WETH.Transfer(from=[DOTC], to=[taker], value=10000000000000000)
WETH.Transfer(from=[DOTC], to=[user], value=590000000000000000)
DOTC.OrderFilled(id=0, taker=[taker], srcAmountIn=1000000000, dstAmountOut=590000000000000000, fee=10000000000000000)
✓ outbid current bid within pending period (533ms)
web3-candies resetNetworkFork to 14850000 +204ms
web3-candies now block 14850000 +2s
web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +4ms
web3-candies deploying UniswapV2Exchange +42ms
web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +15ms
web3-candies deploying Quoter +1ms
web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +13ms
web3-candies deploying DOTC +1ms
web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +15ms
web3-candies mining 1 block and advancing time by 1 seconds +124ms
web3-candies was: block 14850007 timestamp 2022-05-26T20:22:10.000Z now: block 14850008 timestamp 2022-05-26T20:22:11.000Z +2ms
CALL DOTC.bid(id=0, exchange=[UniswapV2Exchange], path=[[USDC], [WETH]], fee=1000000000000000)
✓ outbid current bid within pending period same path and amount but lower fee (227ms)

Errors
order
web3-candies resetNetworkFork to 14850000 +102ms
web3-candies now block 14850000 +2s
web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +4ms
web3-candies deploying UniswapV2Exchange +42ms
web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +16ms
web3-candies deploying Quoter +0ms
web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +13ms
web3-candies deploying DOTC +1ms
web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +15ms
✓ invalid id (30ms)
verify bid
web3-candies resetNetworkFork to 14850000 +31ms
web3-candies now block 14850000 +2s
web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +13ms
web3-candies deploying UniswapV2Exchange +48ms
web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +14ms
web3-candies deploying Quoter +0ms
web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +16ms
web3-candies deploying DOTC +1ms
web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +16ms
CALL DOTC.ask(srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1653596526)
DOTC.OrderCreated(id=0, maker=[user])
CALL USDC.approve(spender=[DOTC], amount=2000000000)
USDC.Approval(owner=[user], spender=[DOTC], value=2000000000)
CALL DOTC.ask(srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1653596540)
DOTC.OrderCreated(id=1, maker=[user])
CALL DOTC.bid(id=1, exchange=[UniswapV2Exchange], path=[[USDC], [WETH]], fee=10000000000000000)
✓ expired (433ms)
web3-candies resetNetworkFork to 14850000 +434ms
web3-candies now block 14850000 +2s
web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +4ms
web3-candies deploying UniswapV2Exchange +43ms
web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +17ms
web3-candies deploying Quoter +0ms
web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +13ms
web3-candies deploying DOTC +1ms
web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +17ms
CALL DOTC.bid(id=0, exchange=[UniswapV2Exchange], path=[[USDC], [WETH]], fee=10000000000000000)
CALL USDC.approve(spender=[DOTC], amount=2000000000)
USDC.Approval(owner=[user], spender=[DOTC], value=2000000000)
CALL DOTC.ask(srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=2000000000, dstMinAmount=1000000000000000000, deadline=1653597531)
DOTC.OrderCreated(id=1, maker=[user])
CALL DOTC.bid(id=1, exchange=[UniswapV2Exchange], path=[[USDC], [WETH]], fee=10000000000000000)
✓ low bid (373ms)
web3-candies resetNetworkFork to 14850000 +375ms
web3-candies now block 14850000 +2s
web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +13ms
web3-candies deploying UniswapV2Exchange +45ms
web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +15ms
web3-candies deploying Quoter +0ms
web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +15ms
web3-candies deploying DOTC +0ms
web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +15ms
web3-candies mining 1 block and advancing time by 30 seconds +111ms
web3-candies was: block 14850007 timestamp 2022-05-26T20:22:10.000Z now: block 14850008 timestamp 2022-05-26T20:22:40.000Z +4ms
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
CALL DOTC.bid(id=0, exchange=[UniswapV2Exchange], path=[[USDC], [WETH]], fee=10000000000000000)
web3-candies mining 1 block and advancing time by 60 seconds +322ms
web3-candies was: block 14850010 timestamp 2022-05-26T20:22:42.000Z now: block 14850011 timestamp 2022-05-26T20:23:42.000Z +3ms
CALL DOTC.bid(id=0, exchange=[UniswapV2Exchange], path=[[USDC], [WETH]], fee=10000000000000000)
✓ recently filled (522ms)
web3-candies resetNetworkFork to 14850000 +82ms
web3-candies now block 14850000 +2s
web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +13ms
web3-candies deploying UniswapV2Exchange +43ms
web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +16ms
web3-candies deploying Quoter +0ms
web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +13ms
web3-candies deploying DOTC +0ms
web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +15ms
CALL DOTC.ask(srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=1000000000, dstMinAmount=2000000000000000000, deadline=1653597527)
DOTC.OrderCreated(id=0, maker=[user])
✓ insufficient amount out (109ms)
web3-candies resetNetworkFork to 14850000 +109ms
web3-candies now block 14850000 +2s
web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +31ms
web3-candies deploying UniswapV2Exchange +125ms
web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +22ms
web3-candies deploying Quoter +1ms
web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +18ms
web3-candies deploying DOTC +1ms
web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +26ms
CALL DOTC.bid(id=0, exchange=[UniswapV2Exchange], path=[[USDC], [WETH]], fee=100000000000000000)
✓ insufficient amount out with excess fee (132ms)
web3-candies resetNetworkFork to 14850000 +133ms
web3-candies now block 14850000 +2s
web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +5ms
web3-candies deploying UniswapV2Exchange +164ms
web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +41ms
web3-candies deploying Quoter +2ms
web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +57ms
web3-candies deploying DOTC +1ms
web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +26ms
CALL DOTC.bid(id=0, exchange=[UniswapV2Exchange], path=[[USDC], [WETH]], fee=1000000000000000000)
✓ fee underflow protection (127ms)
web3-candies resetNetworkFork to 14850000 +128ms
web3-candies now block 14850000 +2s
web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +5ms
web3-candies deploying UniswapV2Exchange +57ms
web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +22ms
web3-candies deploying Quoter +0ms
web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +16ms
web3-candies deploying DOTC +1ms
web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +18ms
CALL DOTC.ask(srcToken=[USDC], dstToken=[WETH], srcAmount=2000000000, srcBidAmount=1500000000, dstMinAmount=750000000000000000, deadline=1653597527)
DOTC.OrderCreated(id=0, maker=[user])
web3-candies mining 1 block and advancing time by 10 seconds +155ms
web3-candies was: block 14850007 timestamp 2022-05-26T20:22:10.000Z now: block 14850008 timestamp 2022-05-26T20:22:20.000Z +3ms
web3-candies mining 1 block and advancing time by 60 seconds +208ms
web3-candies was: block 14850009 timestamp 2022-05-26T20:22:21.000Z now: block 14850010 timestamp 2022-05-26T20:23:21.000Z +2ms
web3-candies deploying MockExchange +1ms
CREATE MockExchange.constructor() => ([MockExchange])
web3-candies deployed MockExchange 0x982F57da8A70ea4f8309AAaa8673400072cEd26B deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +28ms
CALL UnknownContractAndFunction(to=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, input=0xd0e30db0, ret=0x)
<UnknownContract [WETH]>.UnknownEvent(0x00000000000000000000000000000000000000000000d3c21bcecceda1000000, [0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c, 0x00000000000000000000000023545493dfd3279d725abcb183a25f20013cf56b])
CALL WETH.transfer(to=[MockExchange], amount=1000000000000000000000000)
WETH.Transfer(from=[deployer], to=[MockExchange], value=1000000000000000000000000)
CALL MockExchange.setMockAmounts(_amounts=[0, 100000000000000000])
CALL DOTC.bid(id=0, exchange=[MockExchange], path=[[USDC], [WETH]], fee=10000000000000000)
✓ insufficient amount out when last partial fill (554ms)
web3-candies resetNetworkFork to 14850000 +157ms
web3-candies now block 14850000 +2s
web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +4ms
web3-candies deploying UniswapV2Exchange +98ms
web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +72ms
web3-candies deploying Quoter +1ms
web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +60ms
web3-candies deploying DOTC +0ms
web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +31ms
CALL USDC.approve(spender=[DOTC], amount=0)
USDC.Approval(owner=[user], spender=[DOTC], value=0)
CALL DOTC.bid(id=0, exchange=[UniswapV2Exchange], path=[[USDC], [WETH]], fee=10000000000000000)
✓ insufficient user allowance (155ms)
web3-candies resetNetworkFork to 14850000 +155ms
web3-candies now block 14850000 +2s
web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +11ms
web3-candies deploying UniswapV2Exchange +38ms
web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +22ms
web3-candies deploying Quoter +0ms
web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +22ms
web3-candies deploying DOTC +1ms
web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +17ms
CALL USDC.transfer(to=[taker], amount=1000000000000)
USDC.Transfer(from=[user], to=[taker], value=1000000000000)
✓ insufficient user balance (160ms)
perform fill
web3-candies resetNetworkFork to 14850000 +160ms
web3-candies now block 14850000 +2s
web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +4ms
web3-candies deploying UniswapV2Exchange +44ms
web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +15ms
web3-candies deploying Quoter +0ms
web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +13ms
web3-candies deploying DOTC +1ms
web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +15ms
web3-candies mining 1 block and advancing time by 10000 seconds +115ms
web3-candies was: block 14850007 timestamp 2022-05-26T20:22:10.000Z now: block 14850008 timestamp 2022-05-26T23:08:50.000Z +8ms
✓ expired (195ms)
web3-candies resetNetworkFork to 14850000 +77ms
web3-candies now block 14850000 +2s
web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +4ms
web3-candies deploying UniswapV2Exchange +45ms
web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +17ms
web3-candies deploying Quoter +1ms
web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +12ms
web3-candies deploying DOTC +1ms
web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +15ms
CALL DOTC.fill(id=0)
✓ invalid taker when no existing bid (77ms)
web3-candies resetNetworkFork to 14850000 +77ms
web3-candies now block 14850000 +2s
web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +10ms
web3-candies deploying UniswapV2Exchange +39ms
web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +14ms
web3-candies deploying Quoter +0ms
web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +14ms
web3-candies deploying DOTC +0ms
web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +15ms
CALL DOTC.fill(id=0)
✓ invalid taker when not the winning taker (140ms)
web3-candies resetNetworkFork to 14850000 +143ms
web3-candies now block 14850000 +2s
web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +4ms
web3-candies deploying UniswapV2Exchange +42ms
web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +17ms
web3-candies deploying Quoter +0ms
web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +13ms
web3-candies deploying DOTC +1ms
web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +14ms
CALL DOTC.fill(id=0)
✓ pending bid when still in bidding window (145ms)
web3-candies resetNetworkFork to 14850000 +146ms
web3-candies now block 14850000 +2s
web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +11ms
web3-candies deploying UniswapV2Exchange +42ms
web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +15ms
web3-candies deploying Quoter +1ms
web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +15ms
web3-candies deploying DOTC +0ms
web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +15ms
web3-candies deploying MockExchange +41ms
CREATE MockExchange.constructor() => ([MockExchange])
web3-candies deployed MockExchange 0x982F57da8A70ea4f8309AAaa8673400072cEd26B deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +25ms
CALL UnknownContractAndFunction(to=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, input=0xd0e30db0, ret=0x)
<UnknownContract [WETH]>.UnknownEvent(0x00000000000000000000000000000000000000000000d3c21bcecceda1000000, [0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c, 0x00000000000000000000000023545493dfd3279d725abcb183a25f20013cf56b])
CALL WETH.transfer(to=[MockExchange], amount=1000000000000000000000000)
WETH.Transfer(from=[deployer], to=[MockExchange], value=1000000000000000000000000)
CALL MockExchange.setMockAmounts(_amounts=[0, 1000000000000000000])
CALL DOTC.bid(id=0, exchange=[MockExchange], path=[[USDC], [WETH]], fee=10000000000000000)
web3-candies mining 1 block and advancing time by 10 seconds +168ms
web3-candies was: block 14850011 timestamp 2022-05-26T20:22:14.000Z now: block 14850012 timestamp 2022-05-26T20:22:24.000Z +3ms
CALL MockExchange.setMockAmounts(_amounts=[0, 100000000000000000])
CALL DOTC.fill(id=0)
✓ insufficient out (398ms)
web3-candies resetNetworkFork to 14850000 +162ms
web3-candies now block 14850000 +2s
web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +5ms
web3-candies deploying UniswapV2Exchange +125ms
web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +91ms
web3-candies deploying Quoter +1ms
web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +66ms
web3-candies deploying DOTC +0ms
web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +20ms
web3-candies deploying MockExchange +53ms
web3-candies deployed MockExchange 0x982F57da8A70ea4f8309AAaa8673400072cEd26B deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +13ms
CALL DOTC.bid(id=0, exchange=[MockExchange], path=[[USDC], [WETH]], fee=100000000000000000)
web3-candies mining 1 block and advancing time by 10 seconds +116ms
web3-candies was: block 14850011 timestamp 2022-05-26T20:22:14.000Z now: block 14850012 timestamp 2022-05-26T20:22:24.000Z +3ms
CALL MockExchange.setMockAmounts(_amounts=[0, 500000000000000000])
CALL DOTC.fill(id=0)
✓ insufficient out with excess fee (370ms)
web3-candies resetNetworkFork to 14850000 +185ms
web3-candies now block 14850000 +2s
web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +16ms
web3-candies deploying UniswapV2Exchange +43ms
web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +16ms
web3-candies deploying Quoter +0ms
web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +14ms
web3-candies deploying DOTC +1ms
web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +15ms
web3-candies deploying MockExchange +51ms
web3-candies deployed MockExchange 0x982F57da8A70ea4f8309AAaa8673400072cEd26B deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +12ms
CALL MockExchange.setMockAmounts(_amounts=[0, 10000000000000000000])
CALL DOTC.bid(id=0, exchange=[MockExchange], path=[[USDC], [WETH]], fee=1000000000000000000)
web3-candies mining 1 block and advancing time by 10 seconds +118ms
web3-candies was: block 14850011 timestamp 2022-05-26T20:22:14.000Z now: block 14850012 timestamp 2022-05-26T20:22:24.000Z +3ms
✓ fee subtracted from dstAmountOut underflow protection (317ms)

Incentives
- staking
- maker callback on each fill
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
web3-candies resetNetworkFork to 14850000 +134ms
web3-candies now block 14850000 +2s
web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +13ms
web3-candies deploying UniswapV2Exchange +43ms
web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +16ms
web3-candies deploying Quoter +1ms
web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +14ms
web3-candies deploying DOTC +1ms
web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +15ms
CALL USDC.approve(spender=[DOTC], amount=3000000)
USDC.Approval(owner=[user], spender=[DOTC], value=3000000)
CALL DOTC.ask(srcToken=[USDC], dstToken=[WETH], srcAmount=3000000, srcBidAmount=2000000, dstMinAmount=1000000000000000000, deadline=1653596627)
DOTC.OrderCreated(id=0, maker=[user])
✓ maker creates ask order, emits event (112ms)
web3-candies resetNetworkFork to 14850000 +113ms
web3-candies now block 14850000 +2s
web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +13ms
web3-candies deploying UniswapV2Exchange +38ms
web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +19ms
web3-candies deploying Quoter +0ms
web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +14ms
web3-candies deploying DOTC +0ms
web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +19ms
✓ bid sets Bid fields (131ms)
web3-candies resetNetworkFork to 14850000 +133ms
web3-candies now block 14850000 +2s
web3-candies impersonating 0x55fe002aeff02f77364de339a1292923a15844b8 +12ms
web3-candies deploying UniswapV2Exchange +44ms
web3-candies deployed UniswapV2Exchange 0x37B18d51dB2CD8CfD95BD142cFa48474B0C830AE deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +15ms
web3-candies deploying Quoter +0ms
web3-candies deployed Quoter 0xA57d742426ad8f24C0dBC4C4B4f349fF9E5cfc2E deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +14ms
web3-candies deploying DOTC +0ms
web3-candies deployed DOTC 0xA3F9ec5040702105b1BE6FF6f583A74D0b8D9c9f deployer 0x23545493dfd3279d725abcb183a25f20013cf56b +15ms
web3-candies mining 1 block and advancing time by 30 seconds +124ms
web3-candies was: block 14850007 timestamp 2022-05-26T20:22:10.000Z now: block 14850008 timestamp 2022-05-26T20:22:40.000Z +6ms
✓ fill sets Fill fields and clears the Bid, emits event (577ms)

·-----------------------------------|---------------------------|-------------|-----------------------------·
|       Solc version: 0.8.10        ·  Optimizer enabled: true  ·  Runs: 200  ·  Block limit: 10000000 gas  │
····································|···························|·············|······························
|  Methods                          ·               23 gwei/gas               ·       1220.66 usd/eth       │
·················|··················|·············|·············|·············|···············|··············
|  Contract      ·  Method          ·  Min        ·  Max        ·  Avg        ·  # calls      ·  usd (avg)  │
·················|··················|·············|·············|·············|···············|··············
|  DOTC          ·  ask             ·     248180  ·     250980  ·     248396  ·           26  ·       6.97  │
·················|··················|·············|·············|·············|···············|··············
|  DOTC          ·  bid             ·     109435  ·     268037  ·     255283  ·           26  ·       7.17  │
·················|··················|·············|·············|·············|···············|··············
|  DOTC          ·  fill            ·     282587  ·     352759  ·     324095  ·           12  ·       9.10  │
·················|··················|·············|·············|·············|···············|··············
|  ERC20         ·  approve         ·      38027  ·      59975  ·      57677  ·           27  ·       1.62  │
·················|··················|·············|·············|·············|···············|··············
|  ERC20         ·  transfer        ·      46794  ·      65625  ·      62433  ·           31  ·       1.75  │
·················|··················|·············|·············|·············|···············|··············
|  MockExchange  ·  setMockAmounts  ·      32144  ·      69144  ·      55269  ·            8  ·       1.55  │
·················|··················|·············|·············|·············|···············|··············
|  Deployments                      ·                                         ·  % of limit   ·             │
····································|·············|·············|·············|···············|··············
|  DOTC                             ·          -  ·          -  ·    1716271  ·       17.2 %  ·      48.18  │
····································|·············|·············|·············|···············|··············
|  MockExchange                     ·          -  ·          -  ·     556571  ·        5.6 %  ·      15.63  │
····································|·············|·············|·············|···············|··············
|  Quoter                           ·          -  ·          -  ·     394208  ·        3.9 %  ·      11.07  │
····································|·············|·············|·············|···············|··············
|  UniswapV2Exchange                ·          -  ·          -  ·     620747  ·        6.2 %  ·      17.43  │
·-----------------------------------|-------------|-------------|-------------|---------------|-------------·

25 passing (58s)
13 pending
```
