// import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import {useConnection, useWallet} from '@solana/wallet-adapter-react';
import {AnchorProvider as Provider, Program} from '@project-serum/anchor';
import {useCallback, useEffect, useState} from 'react';
import idl from '../idl/kaheclub.json';
import {Connection, Keypair, PublicKey} from '@solana/web3.js';
import fetchAllTweets from '../api/fetchAllTweets';
import {Button, Input, Select, Textarea, useToast} from '@chakra-ui/react';
import {IconBrandTelegram, IconCloud, IconHome} from '@tabler/icons';
import {LOCALNET} from '../config';
import newPost from '../api/new-post';
import Tweet from '../models/Tweet';
import delete_tweet from '../api/delete-tweet';

function Tweets() {
    const {connection} = useConnection();
    const wallet = useWallet();
    const tweetWallet = Keypair.generate();
    const [tweets, setTweets] = useState([]);
    const [topic, setTopic] = useState({});
    const [content, setContent] = useState({});
    const [tag, setTag] = useState('');
    const toast = useToast()
    const prefetchTweets = useCallback(() => {
        const connection = new Connection(LOCALNET, 'confirmed');
        const provider = new Provider(connection, tweetWallet);
        const program = new Program(
            idl,
            new PublicKey(idl.metadata.address),
            provider
        );
        fetchAllTweets(program).then((tweetItems) => {
            const mapped = tweetItems.map((twts) => {
                return new Tweet(twts.publicKey, twts.account);
            });

            setTweets(mapped);
        });
    }, []);

    function handleTopicChange(e) {
        let text = e.target.value;
        setTopic({
            text: text,
            count: text.length,
        });
    }

    function handleContentChange(e) {
        let text = e.target.value;
        setContent({
            text: text,
            count: text.length,
        });
    }

    function handleTagChange(e) {
        let text = e.target.value;
        setTag(text);
    }

    useEffect(() => {
        prefetchTweets();
    }, []);

    function sendTweet() {
        if (topic.text !== undefined && content.text !== undefined && tag !== '') {
            const provider = new Provider(connection, wallet, {
                commitment: 'confirmed',
            });
            const program = new Program(
                idl,
                new PublicKey(idl.metadata.address),
                provider
            );
            newPost(program, wallet, topic.text, content.text, tag)
                .then((x) => {
                    fetchAllTweets(program).then((tweetItems) => {
                        const mapped = tweetItems.map((twts) => {

                            return new Tweet(twts.publicKey, twts.account);
                        });
                        toast({
                            title: "Tweet created",
                            status: "success",
                            isClosable: "true",
                            position: "bottom-right",
                            duration: 3e3,
                        })
                        setTweets(mapped.sort());
                        setContent("")
                        setTag("")
                        setTopic("")
                    });
                })
                .catch((e) => {
                    toast({
                        title: "Error creating tweet",
                        // status: e.toString().toString(),
                        isClosable: "true",
                        position: "bottom-right",
                        duration: 3e3,
                    })
                });
            return
        }
        // make a toast asking the user to fill everything
        toast({
            title: "Please fill all the fields",
            status: "error",
            isClosable: "true",
            position: "bottom-right",
            duration: 3e3,
        })

    }

    // sort tweets by timestamp
    async function deleteTweet(pubKey) {
        const provider = new Provider(connection, wallet, {
            commitment: 'confirmed',
        });
        const program = new Program(
            idl,
            new PublicKey(idl.metadata.address),
            provider
        );
        await delete_tweet(program, wallet, pubKey).then(() => {
            fetchAllTweets(program).then((tweetItems) => {
                const mapped = tweetItems.map((twts) => {
                    return new Tweet(twts.publicKey, twts.account);
                });
                toast({
                    title: "Tweet deleted",
                    status: "success",
                    isClosable: "true",
                    position: "bottom-right",
                    duration: 3e3,
                })
                setTweets(mapped.sort((a, b) => {
                    return b.timestamp - a.timestamp;
                }));
            })
        }).catch(e => {
            console.error(e);
        })
    }

    return (
        <div className='mx-auto max-w-[calc(100%_-_500px)] max-h-[calc(100vh_-_110px)] h-[calc(100vh_-_150px)] flex'>
            <div className='p-5 px-10 border-r-2 h-full w-[300px] space-y-5'>
                <Button variant={"outline"} className='w-full py-7 shadow-lg' leftIcon={<IconHome/>}>
                    Home
                </Button>
                <Button className='w-full py-7 shadow-lg' leftIcon={<IconCloud/>}>
                    Topics
                </Button>
            </div>
            <div
                id='style-4'
                className='scroll col-span-2 p-5  w-[calc(100%_-_350px)] overflow-x-auto'
            >
                {!wallet.publicKey ? (
                    <div className='py-5 bg-[#2c313d] text-lg rounded-lg shadow-xl px-5'>
                        Sign-in with your wallet to post new tweet.
                    </div>
                ) : (
                    <div className='py-5 bg-[#2c313d] rounded-lg shadow-xl px-5'>
                        <h1 className='py-2 text-xl uppercase'>Post a new Tweet</h1>
                        <Input
                            isInvalid={topic?.count > 50}
                            onChange={handleTopicChange}
                            placeholder='Topic (Max 50 words)'
                            value={topic.text ?? ''}
                            className='mb-5'
                        ></Input>
                        <Textarea
                            className='scroll'
                            isInvalid={content?.count > 300}
                            onChange={handleContentChange}
                            value={content.text ?? ''}
                            placeholder='Tweet your content! (max '
                        ></Textarea>
                        {/* <Input placeholder='Tag (ex: Help, Info, )' className='my-5'></Input> */}
                        <Select
                            value={tag}
                            onChange={handleTagChange}
                            placeholder='Select tag'
                            my={5}
                        >
                            <option value='Info'>Info</option>
                            <option value='Help'>Help</option>
                            <option value='Tech'>Tech</option>
                        </Select>
                        <div className='flex items-center justify-end'>
                            <Button
                                colorScheme={'linkedin'}
                                rightIcon={<IconBrandTelegram/>}
                                onClick={sendTweet}
                            >
                                Tweet
                            </Button>
                        </div>
                    </div>
                )}
                {tweets?.map((twt, i) => {
                    return twt.generateTweetCard(wallet?.publicKey, deleteTweet);
                })}
            </div>
        </div>
    );
}

export default Tweets;
