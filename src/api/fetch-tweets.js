async function fetchTweets(program) {
  return await program.account.tweet.all();
}

export default fetchTweets;
