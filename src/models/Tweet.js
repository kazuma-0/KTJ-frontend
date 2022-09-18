import { Text, Badge } from '@chakra-ui/react';
import { IconTrash } from '@tabler/icons';
import dayjs from 'dayjs';
class Tweet {
  constructor(pubKey, tweet) {
    this.author = tweet.author;
    this.timestamp = dayjs.unix(tweet.timestamp.toString()).fromNow();
    this.topic = tweet.topic;
    this.content = tweet.content;
    this.tag = tweet.tag;
    this.publicKey = pubKey;
  }

  getPublicKey() {
    return this.publicKey.toBase58();
  }
  getTime() {
    dayjs.unix(this.timestamp).fromNow();
  }

  generateTweetCard(user, deleteTweet) {
    return (
      <div className='py-5 bg-[#2c313d] rounded shadow px-5 mt-5 relative'>
        {this.author.toBase58() === user?.toBase58() ? (
          <div className='absolute bottom-2 right-2'>
            <IconTrash
              onClick={() => {
                deleteTweet(this.publicKey);
              }}
              className='cursor-pointer'
              size={15}
              color='#b92e34'
            ></IconTrash>
          </div>
        ) : (
          <></>
        )}
        <div className='flex justify-between'>
          <h3 className='text-2xl'>{this.topic}</h3>
          <h6 className='text-gray-500 text-sm'>{this.timestamp}</h6>
        </div>
        <h6 className='text-sm text-gray-300 pb-3'>{this.author.toBase58()}</h6>
        <Text noOfLines={5}>{this.content}</Text>
        <Badge
          className='rounded'
          colorScheme={'green'}
          rounded={true}
          variant={'subtle'}
        >
          {this.tag}
        </Badge>
      </div>
    );
  }
}

export default Tweet;
