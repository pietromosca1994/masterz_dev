const {BN, constants, expectEvent, expectRevert, time} = require('@openzeppelin/test-helpers');
const {ZERO_ADDRESS} = constants;
const Token = artifacts.require("Token");
const BlackList = artifacts.require("BlackList"); // Assuming you have a BlackList contract

contract('Token', (accounts) => {
  const [deployerAccount, firstAccount, secondAccount] = accounts;
  let tokenInstance;
  let blacklistInstance;

  // beforeEach(async () => {
  //   // Deploy BlackList contract
  //   blacklistInstance = await BlackList.new();
    
  //   // Deploy Token contract and pass the BlackList contract address
  //   tokenInstance = await Token.new('MyToken', 'MT', blacklistInstance.address);
  // });

  it('should deploy with the correct name, symbol, and BlackList contract address', async () => {
    blacklistInstance= await BlackList.deployed();
    tokenInstance = await Token.deployed();

    console.log("blacklistInstance deployed @ "+blacklistInstance.address);
    console.log("Token deployed             @ "+tokenInstance.address);

    console.log('deployerAccount: ' + deployerAccount);
    console.log('firstAccount:    ' + firstAccount);
    console.log('secondAccount:   ' + secondAccount);

    console.log('Token owner:     ' + await tokenInstance.owner());
    console.log('BlackList owner: '+ await blacklistInstance.owner());
  })

  it('should allow blacklist operation for token contract', async () => {
    // Add token to allowedTokens
    await blacklistInstance.allowedToken(tokenInstance.address, {from: deployerAccount});
    assert.equal(await blacklistInstance.getAllowedTokenStatus(tokenInstance.address), true, 'Token not allowed');
  })

  it('should deploy with the correct name, symbol, and BlackList contract address', async () => {
    const name = await tokenInstance.name();
    const symbol = await tokenInstance.symbol();
    const blacklistAddress = await tokenInstance.blacklistcontract();

    assert.equal(name, 'MyToken', 'Incorrect token name');
    assert.equal(symbol, 'MT', 'Incorrect token symbol');
    assert.equal(blacklistAddress, blacklistInstance.address, 'Incorrect BlackList contract address');
  });

  it('should allow the owner to mint tokens', async () => {
    const amount = 1000;
    await tokenInstance.mint(firstAccount, amount, { from: deployerAccount });

    const balance = await tokenInstance.balanceOf(firstAccount);
    assert.equal(balance, amount, 'firstAccount did not receive minted tokens');
  });

  it('should burn tokens', async () => {
    const amount = 1000;
    await tokenInstance.burn(amount, { from: firstAccount });

    const balance = await tokenInstance.balanceOf(firstAccount);
    assert.equal(balance, 0, 'firstAccount could not burn tokens');
  });


  it('should allow the owner to add and remove addresses from the blacklist', async () => {   
    // Add user to the blacklist
    await tokenInstance.insertInBlackList(secondAccount, { from: deployerAccount });
    
    // Check if the user is in the blacklist
    const isBlackListedBefore = await blacklistInstance.getBlackListStatus(secondAccount);
    assert.equal(isBlackListedBefore, true, 'User should be blacklisted');

    // Remove user from the blacklist
    await tokenInstance.removeFromBlackList(secondAccount, { from: deployerAccount });

    // Check if the user is removed from the blacklist
    const isBlackListedAfter = await blacklistInstance.getBlackListStatus(secondAccount);
    assert.equal(isBlackListedAfter, false, 'User should not be blacklisted');
  });

  it('should not allow transfers between blacklisted addresses', async () => {
    // Add both accounts to the blacklist
    await tokenInstance.insertInBlackList(firstAccount, { from: deployerAccount });
    await tokenInstance.insertInBlackList(secondAccount, { from: deployerAccount });

    // Try to transfer from blacklisted address to blacklisted address
    try {
      await tokenInstance.transfer(secondAccount, 100, { from: firstAccount });
      assert.fail('Transfer should have failed');
    } catch (error) {
      assert.include(error.message, 'revert', 'Transfer did not revert');
    }
  });
});