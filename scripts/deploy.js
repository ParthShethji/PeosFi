const { ethers } = require("hardhat");

async function deployContracts() {
  // Compile all the contracts
  const Contract1 = await ethers.getContractFactory("ZeroFiSocialPool");
  const Contract2 = await ethers.getContractFactory("ZeroFiSocialPool");
  
  // Deploy each contract
  console.log("Deploying Contract1...");
  const contract1 = await Contract1.deploy();
  await contract1.deployed();
  console.log("Contract1 deployed to:", contract1.address);

  console.log("Deploying Contract2...");
  const contract2 = await Contract2.deploy();
  await contract2.deployed();
  console.log("Contract2 deployed to:", contract2.address);
  
  // Deploy more contracts as needed
  }

deployContracts()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
