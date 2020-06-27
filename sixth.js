var Tx = require('ethereumjs-tx');

const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/8c972e5e101b4e41826605caf00380a8');

const account1 = "0x62043Ae376Ea710b7ECB3F6D233326679BABaE58"; //Account2 in my MetaMask (Ropsten Test Network)

const privateKey1 ="D0FBF42F6A370BB90992A183FA9130EA0BC7CCE9370E1B4C52AB3D96AA7AAA93"; //Account2 privateKey

const privateKey1Buffer = Buffer.from(privateKey1, 'hex');

const contractAddress = "0xf23ffb9ff9a9612d839edae8f1a0d1e8849edc46";


let abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			}
		],
		"name": "setAge",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "doSomeWork",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAge",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]


console.log("Buffer 1 = ", privateKey1Buffer);

web3.eth.getTransactionCount(account1, (err, txCount) => {
	
    const txObject = {
        nonce:    web3.utils.toHex(txCount),
        to:       contractAddress,
        //value:    web3.utils.toHex(web3.utils.toWei('0.4', 'ether')),
        gasLimit: web3.utils.toHex(800000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        data: contract.methods.setAge(89).encodeABI()
      }

      const tx = new Tx.Transaction(txObject, {chain: 'ropsten', hardfork: 'petersburg'});
      tx.sign(privateKey1Buffer);

        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');

       // console.log("tx = ", tx);
       // console.log("serializedTx = ", serializedTx);
       // console.log("raw = ", raw);

       web3.eth.sendSignedTransaction(raw, (err, txHash) => {
           console.log('txHash: ', txHash)
       });

});

contract.methods.getAge().call(function (err, result)
{
	console.log("Age = ", result);
});

