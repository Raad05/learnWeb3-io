const { ethers, run } = require("hardhat");

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const main = async () => {
  const contract = await ethers.deployContract("Whitelist", [10]);
  console.log("Deploying contract...");

  // wait for deployment
  await contract.waitForDeployment();

  const contractAddress = contract.target;

  console.log("Whitelist contract address:", contractAddress);

  // Sleep for 30 seconds while Etherscan indexes the new contract deployment
  await sleep(30 * 1000);
  console.log("Contract deployed successfully.");

  //   Verify the contract on etherscan
  await run("verify:verify", {
    address: contractAddress,
    constructorArguments: [10],
  });
  console.log("Contract verified on etherscan.");
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
