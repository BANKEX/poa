pragma solidity ^0.4.21;
import "../token/ERC20/ERC20DividendsToken.sol";

contract VendingToken is ERC20DividendsToken {
  uint constant DECIMAL_MULTIPLIER = 10 ** 18;
  string public name = "Vending Token";
  string public symbol = "VEND";
  uint8 public decimals = 18;

  function VendingToken() public {
    totalSupply_ = 100**DECIMAL_MULTIPLIER;
    balances[owner] = totalSupply_;
    emit Transfer(address(0), owner, totalSupply_);
  }
}