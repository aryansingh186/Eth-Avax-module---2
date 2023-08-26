const { ethers } = require("hardhat");

async function main() {
  const premium = 100; // Replace with the desired premium amount
  const coverageAmount = 1000; // Replace with the desired coverage amount

  const BusTicketBooking = await ethers.getContractFactory("BusTicketBooking");
  const contract = await BusTicketBooking.deploy(premium, coverageAmount);
  await contract.deployed();
  console.log("Contract deployed to address:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
