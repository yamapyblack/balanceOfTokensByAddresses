//const tokenAddress = "0xD69F306549e9d96f183B1AecA30B8f4353c2ECC3"; //for example MCH Coin
const tokenAddress = ""; //rari
//const walletAddresses = ["0x.....","0x....."];
const walletAddresses = require('./addresses.json');

// ERC20 minimum ABI
const ERC20ABI = [
  // balanceOf
  {
    "constant":true,
    "inputs":[{"name":"_owner","type":"address"}],
    "name":"balanceOf",
    "outputs":[{"name":"balance","type":"uint256"}],
    "type":"function"
  },
  // decimals
  {
    "constant":true,
    "inputs":[],
    "name":"decimals",
    "outputs":[{"name":"","type":"uint8"}],
    "type":"function"
  }
];

// get contract from ABI and Contract Address(ERC20)
const Web3 = require('web3');
const secretsJson = require('./secrets.json');
const provider = new Web3.providers.HttpProvider(secretsJson.provider, {timeout: 5000});
const web3 = new Web3(provider);
const contract = new web3.eth.Contract(ERC20ABI, tokenAddress);

//main
(async() => {
    //decimals
    const decimals = await contract.methods.decimals().call();
    console.log('decimals',decimals);

    let sumBalance = 0;
    for(let address of walletAddresses)
    {
        //balance
        let balance = await contract.methods.balanceOf(address).call();
        console.log(address, balance, (balance - 0) / (10**decimals));
        sumBalance += (balance - 0);
    }
    console.log('sumBalance', sumBalance, (sumBalance - 0) / (10**decimals));

})();

