async function main() {
  const GameItems = await ethers.getContractFactory("GameItems");
  const gameItems = await GameItems.deploy();
  console.log("GameItems deployed @ "+ await gameItems.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
