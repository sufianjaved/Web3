var Tx = require('ethereumjs-tx');

const Web3 = require('web3');
const web3 = new Web3('http://127.0.0.1:7545');

const account1 = "0xF131BeCdc352C3D0ff45E8c25432c1378972E0C2";
const account2 = "0x952E5bd04Dfbe9EB19F2B6655B3ebBf5A0a6c428";

const privateKey1 ="ab02a18fcf3434079e7a5ae1d78d4b41775650465c7decc30d6274272199239f";
const privateKey2 = "0c3fd1479afcd4acb355f202d20bb8ea0a3124eb99b27c49c510b37914ddf26e";

const privateKey1Buffer = Buffer.from(privateKey1, 'hex');
const privateKey2Buffer = Buffer.from(privateKey2, 'hex');

console.log("Buffer 1 = ", privateKey1Buffer);
console.log("Buffer 2 = ", privateKey2Buffer);

web3.eth.getTransactionCount(account1, (err, txCount) => {
    const txObject = {
        nonce:    web3.utils.toHex(txCount),
        to:       account2,
        value:    web3.utils.toHex(web3.utils.toWei('3', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
      }

      const tx = new Tx.Transaction(txObject);
      tx.sign(privateKey1Buffer);

        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');

       console.log("tx = ", tx);
       console.log("serializedTx = ", serializedTx);
       console.log("raw = ", raw);

       web3.eth.sendSignedTransaction(raw, (err, txHash) => {
           console.log('txHash: ', txHash)
       });

});



