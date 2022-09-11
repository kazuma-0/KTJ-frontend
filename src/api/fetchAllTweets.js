async function fetchAllTweets(program){
    return await program.account.tweet.all()
}

export default fetchAllTweets