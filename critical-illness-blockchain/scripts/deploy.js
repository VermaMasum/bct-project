// const hre = require("hardhat");

// async function main() {
//     console.log("Deploying CriticalIllness smart contract...");

//     // Get the contract factory
//     const CriticalIllness = await hre.ethers.getContractFactory("CriticalIllness");

//     // Deploy the contract
//     const criticalIllness = await CriticalIllness.deploy();
//     await criticalIllness.deployed();

//     console.log(`CriticalIllness contract deployed at: ${criticalIllness.address}`);
// }

// // Run the deployment script
// main()
//     .then(() => process.exit(0))
//     .catch(error => {
//         console.error(error);
//         process.exit(1);
//     });
/////////////////////////////////////////////
// const hre = require("hardhat");

// async function main() {
//   const ContractName = await hre.ethers.getContractFactory("CriticalIllness"); // Replace with your contract name
//   const contract = await ContractName.deploy(); // Deploy contract

//   await contract.deployed(); // Wait for deployment
//   console.log(`Contract deployed at: ${contract.address}`);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
////////////////////////////////

// const hre = require("hardhat");

// async function main() {
//   const ContractName = await hre.ethers.getContractFactory("Criticalillness"); // ✅ Use contract name, NOT file name
//   const contract = await ContractName.deploy(); // Deploy contract

//   await contract.deployed(); // Wait for deployment
//   console.log(`Contract deployed at: ${contract.address}`);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

//main one......as it compiled successfully
const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const ContractFactory = await hre.ethers.getContractFactory(
    "CriticalIllness"
  ); // ✅ Ensure correct contract name

  // Deploy the contract
  const contract = await ContractFactory.deploy(); // ✅ Deploy contract properly

  // Wait until the contract is mined
  await contract.waitForDeployment(); // ✅ Correct function instead of deployed()

  console.log(`Contract deployed at: ${await contract.getAddress()}`); // ✅ Corrected address fetching
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/////////////////////////////////////
// const hre = require("hardhat");

// async function main() {
//   // Compile the contract
//   await hre.run("compile");

//   // Get the contract factory
//   const ContractFactory = await hre.ethers.getContractFactory(
//     "CriticalIllness"
//   );

//   // Deploy the contract
//   const contract = await ContractFactory.deploy();

//   // Wait until the contract is mined
//   await contract.waitForDeployment();

//   console.log(`Contract deployed at: ${await contract.getAddress()}`);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
