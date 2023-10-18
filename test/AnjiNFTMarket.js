const {ethers} = require('hardhat');
const {expect} = require('chai');

describe("Anji NFT Market",async()=>{
    it("Deploy,mint,list and sell Anji NFTs",async()=>{
        const Market = await ethers.getContractFactory("NFTMarket");
        const market = await Market.deploy();
        await market.deployed();

        const marketaddr = await market.address;

        const NFT = await ethers.getContractFactory("NFT");
        const nft = await NFT.deploy(marketaddr);
        await nft.deployed();

        const nftaddr = await nft.address;

        let listingPrice = await market.getListingPrice();
        listingPrice = listingPrice.toString();
        let sellingPrice = ethers.utils.parseEther("5");

        await nft.CreateNFT("https://www.naveen.com");
        await nft.CreateNFT("https://www.vamsi.com");
        await nft.CreateNFT("https://www.sai.com");
        await nft.CreateNFT("https://www.anji.com");

        await market.CreateMarketItem(nftaddr,1,sellingPrice,{value:listingPrice});
        await market.CreateMarketItem(nftaddr,2,sellingPrice,{value:listingPrice});
        await market.CreateMarketItem(nftaddr,3,sellingPrice,{value:listingPrice});
        await market.CreateMarketItem(nftaddr,4,sellingPrice,{value:listingPrice});

        const [_,buyeraddr] = await ethers.getSigners();
        await market.connect(buyeraddr).CreateMarketSale(nftaddr,1,{value:sellingPrice});

        let items=await market.FetchAllNFTs();
        items=await Promise.all(items.map(async i =>{
            const tokenURI=await nft.tokenURI(i.tokenId);
            let item={
                price:i.price.toString(),
                tokenId:i.tokenId.toString(),
                seller:i.seller,
                owner:i.owner,
                tokenURI
            }
            return item
        }))
    console.log('items:',items);
    })
})