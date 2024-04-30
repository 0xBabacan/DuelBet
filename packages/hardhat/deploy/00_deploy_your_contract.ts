import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import {Contract } from "ethers";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */

  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  console.log(deployer);
  console.log("\n 📡 Deploying DuelContract...\n");
  
  const deployResult = deploy("DuelContract", {
    from: deployer,
    // Contract constructor arguments
    args: [],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  console.log("\n 🎉 Deployed DuelContract to:", (await deployResult).address);

  // Get the deployed contract to interact with it after deploying.
  const duelContract = await hre.ethers.getContract<Contract>("DuelContract", deployer);

  // console.log(duelContract.interface)

  // Transfer ownership to your front end address
  const owner = "0x4A09Bbe9B6ecfFa414E5788101c5B480bcb76569"
  console.log(`\n 🤹  Sending ownership to frontend address ${owner}\n`);
  const ownerTx = await duelContract.transferOwnership(owner);
  
  console.log("\n       confirming...\n");
  const ownershipResult = await ownerTx.wait();
  if (ownershipResult) {
    console.log("✅ ownership transferred successfully!\n");
  }
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["DuelContract"];
