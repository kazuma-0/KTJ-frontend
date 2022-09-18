async function delete_tweet(program, wallet, tweetPub) {
  await program.rpc.deleteTweet({
    accounts: {
      author: wallet.publicKey,
      tweet: tweetPub,
    },
  });
}

export default delete_tweet;
