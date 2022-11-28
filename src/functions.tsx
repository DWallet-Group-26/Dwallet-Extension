import Wallet from 'ethereumjs-wallet'
import {toBuffer} from 'ethereumjs-util'
import {ethers} from 'ethers';

const FACTORY_ABI = require('./ABI/MultiSigWalletFactory.json').abi;
const WALLET_ABI = require('./ABI/MultiSigWallet.json').abi;

export const generate_private_key = () => {
    const wallet = Wallet.generate()
    return wallet.getPrivateKeyString()
    }

export const get_address = (private_key) => {
    if (private_key.substring(0, 2) != '0x') {
        private_key = '0x' + private_key
    }
    const privateKeyBuffer = toBuffer(private_key);
    let addressData = Wallet.fromPrivateKey(privateKeyBuffer);
    return addressData.getAddressString();

}

export const get_multi_sig_address = async (mainKey,address) => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_PROVIDER_URL);
    const wallet = new ethers.Wallet(mainKey, provider);
    const factory = new ethers.Contract(process.env.REACT_APP_MULTISIG_FACTORY_ADDRESS, FACTORY_ABI, wallet);
    let multisigaddr = await factory.mainMapping(address);
    console.log(multisigaddr);
    return multisigaddr;
}

export const get_balance = async (address) => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_PROVIDER_URL);
    let balance = await provider.getBalance(address);
    return balance;
}