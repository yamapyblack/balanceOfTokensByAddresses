//const tokenAddress = "0xc12d1c73ee7dc3615ba4e37e4abfdbddfa38907e"; //kick
const tokenAddress = "0xfca59cd816ab1ead66534d82bc21e7515ce441cf"; //rari
//const walletAddresses = ["0x12fA9a179f1db2a97052CcbFD7a4AAAA91Fef780","0xCDF4f278c469Fd3961707D6b4D54B8f244eA5d9E"];
const walletAddresses = require('./addresses.json');


// ERC20 トークンの残高を取得するための最小限のABI
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

