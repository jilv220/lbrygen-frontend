import web3Modal from '@/lib/web3Modal'
import * as Eth from 'web3-eth'
import Logger from '@/utils/Logger';
import userState from '@/stores/UserStore';

import { ec as EC } from 'elliptic';
import { arrayToBase64Url, hexToUint8Array } from '@/utils/ReUtils';
import { IUserPair } from '@/constants/interfaces';
import { useUser } from '@/lib/gun/useUser'

const logger = new Logger('Session')

/**
 * From Iris-messenger [https://github.com/irislib/iris-messenger/blob/master/src/js/Session.js]
 */

 function keyPairFromHash(hash) {
    const ec = new EC('p256');
    const keyPair = ec.keyFromPrivate(new Uint8Array(hash));
  
    let privKey = keyPair.getPrivate().toArray("be", 32);
    let x = keyPair.getPublic().getX().toArray("be", 32);
    let y = keyPair.getPublic().getY().toArray("be", 32);
  
    privKey = arrayToBase64Url(privKey);
    x = arrayToBase64Url(x);
    y = arrayToBase64Url(y);
  
    const kp = { pub: `${x}.${y}`, priv: privKey };
    return kp;
}

async function ethereumConnect() {
  
    web3Modal.on('accountsChanged', (provider) => {
      console.log('connect', provider);
    });
  
    const provider = await web3Modal.connect();

    // Work around, stupid export system
    return new Eth['default'](provider);
}

const user = useUser()
function login(userPair: IUserPair) {

    user.auth(userPair, (ack) => {
        if(ack.err) {
            logger.error('login falied')
        } else {
            userState.status = true
            userState.userpair = userPair
            localStorage.setItem('userPair', JSON.stringify(userPair))
        }
    })
}

async function logout() {
    user.leave()
    await web3Modal.clearCachedProvider();
    userState.actions.resetState()
    localStorage.clear()
}

function recall() {
    const jsonPair = localStorage.getItem('userPair')
    if(!jsonPair) { return }

    const pair = JSON.parse(jsonPair)
    login(pair)
}

async function ethereumLogin() {

    const eth = await ethereumConnect();
    const accounts = await eth.getAccounts();
  
    if (accounts.length > 0) {
      const message = "I'm trusting this application with an irrevocable access key to my Lbrygen account.";
      const signature = await eth.personal.sign(message, accounts[0], '');
      const signatureBytes = hexToUint8Array(signature.substring(2));
      const hash1 = await window.crypto.subtle.digest('SHA-256', signatureBytes);
      const hash2 = await window.crypto.subtle.digest('SHA-256', hash1);
      const signingKey = keyPairFromHash(hash1);
      const encryptionKey = keyPairFromHash(hash2);
      const k = {
        pub: signingKey.pub,
        priv: signingKey.priv,
        epub: encryptionKey.pub,
        epriv: encryptionKey.priv
      };
      login(k);
    }
}

export default { ethereumLogin, logout, recall }