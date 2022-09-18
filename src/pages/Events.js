import { Box, Skeleton, SkeletonText, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import fetchEvents from '../api/fetch-events';
import SupabaseContext from '../context/SupabaseContext';
import dayjs from 'dayjs';
function Events() {
  const [events, setEvents] = useState(null);
  const supabase = useContext(SupabaseContext);
  useEffect(() => {
    fetchEvents(supabase).then((data) => {
      console.log(data);
      setEvents(data);
    });
  }, []);
  return (
    <div className='container mx-auto space-y-16 lg:max-w-5xl'>
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
          <div key={event.id} className='transition-all hover:scale-105'>
            <div
              style={{ backgroundImage: `url("${event.image}")` }}
              className='h-64 bg-center rounded-t'
            ></div>
            <div className='px-3 py-2 bg-[#2f2f2f] rounded-b shadow'>
              <div className='flex justify-between items-center'>
                <h1 className='text-3xl'>{event.title}</h1>
                <span className='text-gray-200'>
                  {dayjs
                    .unix(Date.parse(event.created_at) / 1000)
                    .format('lll')}
                </span>
              </div>
              <Text noOfLines={3}></Text>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Events;
