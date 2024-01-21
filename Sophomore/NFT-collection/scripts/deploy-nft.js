const { ethers, run } = require("hardhat");
require("dotenv").config();

const WHITELIST_CONTRACT_ADDRESS = process.env.WHITELIST_CONTRACT_ADDRESS;

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const main = async () => {
  const contract = await ethers.deployContract("CryptoDevs", [
    WHITELIST_CONTRACT_ADDRESS,
  ]);
  console.log("Deploying contract...");

  await contract.waitForDeployment();

  const contractAddress = contract.target;

  console.log("CryptoDevs contract address:", contractAddress);

  await sleep(30 * 1000);
  console.log("Contract deployed successfully.");

  await run("verify:verify", {
    address: contractAddress,
    constructorArguments: [WHITELIST_CONTRACT_ADDRESS],
  });
  console.log("Contract verified on etherscan.");
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
