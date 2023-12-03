async function main() {
  const ERC721ProxyV1 = await ethers.getContractFactory("ERC721ProxyV1");
  const erc721ProxyV1 = await ERC721ProxyV1.deploy();
  console.log("erc721ProxyV1 deployed @ "+ await erc721ProxyV1.address);

  const ERC721ProxyV2 = await ethers.getContractFactory("ERC721ProxyV2");
  const erc721ProxyV2 = await ERC721ProxyV2.deploy();
  console.log("erc721ProxyV2 deployed @ "+ await erc721ProxyV1.address);

  const CloneTokenFactory = await ethers.getContractFactory("CloneTokenFactory");
  const cloneTokenFactory = await CloneTokenFactory.deploy(erc721ProxyV1.address);
  console.log("CloneTokenFactory deployed @ "+ await cloneTokenFactory.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
