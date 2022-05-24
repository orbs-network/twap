import { bn8, erc20s } from "@defi.org/web3-candies";
import { Quoter } from "../typechain-hardhat/Quoter";
import { deployer, quoter } from "./base.test";

xdescribe("Quoter", () => {
  it("gas", async () => {
    const wbtc = erc20s.poly.WBTC().address;
    const usdc = erc20s.poly.USDC().address;
    const dai = erc20s.poly.DAI().address;
    const eth = erc20s.poly.WETH().address;
    const usdt = erc20s.poly.USDT().address;

    const paths = [
      [wbtc, usdc],

      [wbtc, dai, usdc],
      [wbtc, eth, usdc],
      [wbtc, usdt, usdc],

      [wbtc, dai, eth, usdc],
      [wbtc, eth, dai, usdc],

      [wbtc, dai, usdt, usdc],
      [wbtc, usdt, dai, usdc],

      [wbtc, eth, usdt, usdc],
      [wbtc, usdt, eth, usdc],
    ];

    const amountIn = bn8(1);

    while (paths.length) {
      await quoter.methods.prepare(paths).send({ from: deployer });
      console.log("✨", paths.length, await quoter.methods.bestPath(amountIn).estimateGas());
      console.log(await quoter.methods.bestPath(amountIn).call());
      paths.pop();
    }
  });
});
