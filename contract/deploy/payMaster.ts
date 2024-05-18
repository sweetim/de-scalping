import { deployContract, getWallet, getProvider } from "./utils";
import * as ethers from "ethers";

export default async function () {
  // const erc20 = await deployContract("MyERC20Token", ["USDT", "USDT"]);
  const usdCAddress = "0xAe045DE5638162fa134807Cb558E15A3F5A7F853";
  const paymaster = await deployContract("ApprovalPaymaster", [erc20Address]);

  const paymasterAddress = await paymaster.getAddress();

  // Supplying paymaster with ETH
  console.log("Funding paymaster with ETH...");
  const wallet = getWallet();
  await (
    await wallet.sendTransaction({
      to: paymasterAddress,
      value: ethers.parseEther("100"),
    })
  ).wait();

  const provider = getProvider();
  const paymasterBalance = await provider.getBalance(paymasterAddress);
  console.log(`Paymaster ETH balance is now ${paymasterBalance.toString()}`);

  console.log("Minted 3 tokens for the wallet");
  console.log(`Done!`);
}
