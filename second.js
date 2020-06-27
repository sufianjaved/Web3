


console.log(Web3);

const rpcURL = "https://ropsten.infura.io/v3/8c972e5e101b4e41826605caf00380a8";

let web3 = new Web3(rpcURL);

//console.log("web3 instance = ", web3);

let address = "0xefFA3C0484A636647BD408313a3BC1463d29ec13";

web3.eth.getBalance(address, (err, wei)=>{
    console.log("Wei ", wei);
    let balance = web3.utils.fromWei(wei, "ether");
    console.log("Balance", balance);

});
