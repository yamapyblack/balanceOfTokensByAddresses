//const tokenAddress = "0x67cBBb366a51FFf9ad869d027E496Ba49f5f6D55"; //for example Cryptospells Token
const tokenAddress = "";
//const walletAddresses = ["0x.....","0x....."];
const walletAddresses = require('./addresses.json');

// ERC721 minimum ABI
const ERC721ABI = [
  // balanceOf
  {
    "constant":true,
    "inputs":[{"name":"_owner","type":"address"}],
    "name":"balanceOf",
    "outputs":[{"name":"balance","type":"uint256"}],
    "type":"function"
  },
];

// get contract from ABI and Contract Address(ERC721)
const Web3 = require('web3');
const secretsJson = require('./secrets.json');
const provider = new Web3.providers.HttpProvider(secretsJson.provider, {timeout: 5000});
const web3 = new Web3(provider);
const contract = new web3.eth.Contract(ERC721ABI, tokenAddress);

//main
(async() => {
    let sumBalance = 0;
    for(let address of walletAddresses)
    {
        //balance
        let balance = await contract.methods.balanceOf(address).call();
        console.log(address, balance);
        sumBalance += (balance - 0);
    }
    console.log('sumBalance', sumBalance);

})();

