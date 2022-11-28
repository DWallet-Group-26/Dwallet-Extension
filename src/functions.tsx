import Wallet from 'ethereumjs-wallet'
import {toBuffer} from 'ethereumjs-util'

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