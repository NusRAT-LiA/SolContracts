let myTokenContract = artifacts.require("./MyToken.sol");

module.exports = function(deployer){
  
    deployer.deploy(myTokenContract);
}