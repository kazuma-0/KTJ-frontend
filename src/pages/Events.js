import { Box, Skeleton, SkeletonText, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import fetchEvents from '../api/fetch-events';
import SupabaseContext from '../context/SupabaseContext';
import dayjs from 'dayjs';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
// import { Router } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function Events() {
  const [events, setEvents] = useState(null);
  const supabase = useContext(SupabaseContext);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    fetchEvents(supabase).then((data) => {
      console.log(data);
      setEvents(data);
    });
  }, []);
  return (
    <div className='container mx-auto space-y-8 lg:max-w-4xl pb-10'>
      {events === null ? (
        <>
          <Skeleton height={'200px'}></Skeleton>
          <SkeletonText mt='4' noOfLines={6} spacing='4' />
        </>
      ) : (
        <></>
      )}
      {/* </Skeleton> */}
      {events?.map((event) => {
        return (
          <motion.div
            key={event.id}
            layoutId={event.id}
            onClick={() => {
              setSelected(event.id)
              setTimeout(() => {
                setSelected(null)
              }, 2e3);
            }}
            className='transition-all hover:scale-[101%] ring-2 rounded shadow ring-white/60'
          >
            <div
              style={{ backgroundImage: `url("${event.image}")` }}
              className='h-56 bg-center rounded-t'
            ></div>
            <div className='px-3 py-2 rounded-b shadow'>
              <div className='flex justify-between items-center'>
                <h1 className='text-2xl'>{event.title}</h1>
                <span className='text-gray-200'>
                  {dayjs
                    .unix(Date.parse(event.created_at) / 1000)
                    .format('lll')}
                </span>
              </div>
              <Text noOfLines={3} className="text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                aperiam unde qui in voluptate, ut accusamus adipisci, laborum et
                eligendi delectus corporis quidem? Pariatur rem, alias esse
                dignissimos eveniet veniam.
              </Text>
            </div>
          </motion.div>
        );
      })}
      {selected && 
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0, transition: 0.25}} className='absolute h-24 w-52 bg-blue-400 top-0 left-0'>
          Test
        </motion.div>
      }
    </div>
  );
}

export default Events;
