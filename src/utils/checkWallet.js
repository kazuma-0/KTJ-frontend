function checkWallet(){
    const {solana} = window

    if(solana && solana.isPhantom){
        return true
    }
    return false
}

export default checkWallet