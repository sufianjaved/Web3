var Tx = require('ethereumjs-tx');

const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/8c972e5e101b4e41826605caf00380a8');

const account1 = "0x62043Ae376Ea710b7ECB3F6D233326679BABaE58"; //Account2 in my MetaMask (Ropsten Test Network)
const account2 = "0xefFA3C0484A636647BD408313a3BC1463d29ec13"; //Account1 in my MetaMask (Ropsten Test Network)

const privateKey1 ="D0FBF42F6A370BB90992A183FA9130EA0BC7CCE9370E1B4C52AB3D96AA7AAA93"; //Account2 privateKey
const privateKey2 = "535AA01D1FE3AE4F3D3ED1A20AE10A3804F7B319BA0D67A49F8248708BD513CF";//Account1 privateKey

const privateKey1Buffer = Buffer.from(privateKey1, 'hex');
const privateKey2Buffer = Buffer.from(privateKey2, 'hex');

console.log("Buffer 1 = ", privateKey1Buffer);
console.log("Buffer 2 = ", privateKey2Buffer);

web3.eth.getTransactionCount(account1, (err, txCount) => {
    const txObject = {
        nonce:    web3.utils.toHex(txCount),
        to:       account2,
        value:    web3.utils.toHex(web3.utils.toWei('0.4', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
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



