# balanceOfTokensByAddresses
balanceOf Tokens(ERC20) by Addresses

You can get the balance of ERC20 tokens by addresses.  
If big amount of addresses, you should use it.  
Before execute, you need to set the contract address of ERC20 token.

## Usage

### Addresses
You should set addresses on `addresses.json`.

### Contract address (ERC20 token's)
You should set the contract addresses on `index.json`.
```
const tokenAddress = "0xD69F306549e9d96f183B1AecA30B8f4353c2ECC3"; //for example MCH Coin
```

### Execute
```
node index.js
```
