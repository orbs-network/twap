import { expect } from "chai";
import { ask, orderbook, user } from "./base.test";
import { parseEvents } from "@defi.org/web3-candies";

describe("DOTC sanity", () => {
  it("maker creates ask order", async () => {
    expect(await orderbook.methods.length().call()).bignumber.zero;

    const tx = await ask(1, 1, 1);

    const events = parseEvents(tx, orderbook);
    expect(events[0].event).eq("OrderCreated");
    expect(events[0].returnValues.maker).eq(user);
    expect(events[0].returnValues.id).eq("0");
    console.log(await orderbook.methods.order(0).call());
    expect(await orderbook.methods.length().call()).bignumber.eq("1");
  });
});
