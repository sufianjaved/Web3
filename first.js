console.log(Web3);

const rpcURL = "http://127.0.0.1:7545";

let web3 = new Web3(rpcURL);

//console.log("web3 instance = ", web3);

let address = "0xc9fe0F537133530e9B12941D0C49F0142666111b"; //Ganache address

web3.eth.getBalance(address, (err, wei)=>{
    console.log("Wei ", wei);
    let balance = web3.utils.fromWei(wei, "ether");
    console.log("Balance ", balance);

});
