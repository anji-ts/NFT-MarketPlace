const {ethers} = require("hardhat");

async function main() {
 
  const Market = await ethers.getContractFactory("NFTMarket");
  const market = await Market.deploy();
  await market.deployed();

  console.log("nft market deployed to:", market.address);

  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(market.address);
  await nft.deployed();

  console.log("nft deployed to :",nft.address)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
