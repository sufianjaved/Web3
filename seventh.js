var Tx = require('ethereumjs-tx');

const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/8c972e5e101b4e41826605caf00380a8');

const account1 = "0x62043Ae376Ea710b7ECB3F6D233326679BABaE58"; //Account2 in my MetaMask (Ropsten Test Network)
const privateKey1 ="D0FBF42F6A370BB90992A183FA9130EA0BC7CCE9370E1B4C52AB3D96AA7AAA93"; //Account2 privateKey
const privateKey1Buffer = Buffer.from(privateKey1, 'hex');


let abi = [
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
	},
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
	}
]

//console.log("Buffer 1 = ", privateKey1Buffer);

web3.eth.getTransactionCount(account1, (err, txCount) => {
    const data ="0x608060405234801561001057600080fd5b5061019b806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063303b519214610046578063967e6e65146100c9578063d5dcf127146100e7575b600080fd5b61004e610115565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561008e578082015181840152602081019050610073565b50505050905090810190601f1680156100bb5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6100d1610152565b6040518082815260200191505060405180910390f35b610113600480360360208110156100fd57600080fd5b810190808035906020019092919050505061015b565b005b60606040518060400160405280601781526020017f446f20536f6d6520576f726b2046726f6d2048756d616e000000000000000000815250905090565b60008054905090565b806000819055505056fea2646970667358221220360c623b2e838382639ae3529397b29cf763ee849c58d526e883edbf309d660a64736f6c63430006060033"

    const txObject = {
        nonce:    web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(800000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        data: data
      }

      const tx = new Tx.Transaction(txObject, {chain: 'ropsten', hardfork: 'petersburg'});
      tx.sign(privateKey1Buffer);

        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');

       // console.log("tx = ", tx);
       // console.log("serializedTx = ", serializedTx);
       // console.log("raw = ", raw);

       web3.eth.sendSignedTransaction(raw, (err, txHash) => {
           console.log('err: ', err);
           console.log('txHash: ', txHash);
       });

});

