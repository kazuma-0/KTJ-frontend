import {decode} from "bs58";
import {BN} from 'bn.js'

function getKey(key){
    const hex = decode(key).toString('hex')
    const n = new BN(hex, 16)
    return n
}

export default getKey