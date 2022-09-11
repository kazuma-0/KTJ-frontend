import { Keypair, SystemProgram } from "@solana/web3.js";

async function newPost(program, wallet, title, content, tag){
    const tweet = Keypair.generate()
    await program.rpc.sendTweet(title, content, tag, {
        accounts:{
            author: wallet.publicKey,
            tweet: tweet.publicKey,
            systemProgram: SystemProgram.programId,
        },
        signers: [tweet]
    })

    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey)
    return tweetAccount;
}

export default newPost;