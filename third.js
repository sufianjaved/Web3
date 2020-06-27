console.log(Web3);

const rpcURL = "https://ropsten.infura.io/v3/8c972e5e101b4e41826605caf00380a8";

let web3 = new Web3(rpcURL);

let address = "0xC12805a9Ac577E3bF4eB471C225F778cBBa17E8e";

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

const contract = new web3.eth.Contract(abi, address);

console.log("Contract ", contract);
console.log("Methods ", contract.methods);
console.log("getAge ", contract.methods.getAge);
console.log("doSomeWork ", contract.methods.doSomeWork);

contract.methods.getAge().call(function (err, result)
{
    console.log("Age = ", result);
});

contract.methods.doSomeWork().call(function (err, result){
    console.log("work = ", result);
});
