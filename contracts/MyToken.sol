// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract MyToken {
    uint256 public totalSupply = 1000;
    mapping(address => uint256) public balances;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event AdditionalBalanceEarned(address indexed participant, uint256 value);

    constructor() {
        // Initialize anyone interacting with the contract with a balance of 5 tokens
        balances[msg.sender] = 5;
    }

    function earnAdditionalBalance(uint256 _value) external {
        balances[msg.sender] += _value;
        emit AdditionalBalanceEarned(msg.sender, _value);
    }

    function transfer(address _to, uint256 _value) external returns (bool) {
        require(_to != address(0), "Invalid address");
        require(balances[msg.sender] >= _value, "Insufficient balance");

        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function balanceOf(address _owner) external view returns (uint256) {
        return balances[_owner];
    }
}
