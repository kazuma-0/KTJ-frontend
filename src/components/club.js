import { IconX } from '@tabler/icons';
import { AnimatePresence, motion } from 'framer-motion';

function Club(props) {
  console.log(props);
  return (
    <AnimatePresence >
    <motion.div
      layoutId={props.id}
      initial={{scale:0, opacity:0}}
      animate={{opacity:1, scale:1}}
      exit={{scale:0, opacity:0}}
      onClick={props.closeScreen}
      className='top-0 left-0 fixed h-screen w-screen max-w-screen p-0 overflow-x-hidden bg-black/50 z-20'
    >
      <div className='flex w-full h-full items-end'>
        <div className='max-w-6xl bg-[#1a202c] mx-auto h-[80vh] rounded-t-lg w-full'>
          <div className='h-[250px] bg-red-0 rounded-t-lg relative'>
            <IconX
              size={30}
              className='absolute p-1 right-0 m-2 rounded-full  bg-gray-600/40'
              onClick={props.closeScreen}
            ></IconX>
          </div>
        </div>
      </div>
    </motion.div>
    </AnimatePresence>
  );
}

export default Club;
