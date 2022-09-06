import {motion} from 'framer-motion'
function Loader() {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
      <motion.div
        className="h-52 w-52 -500 rounded-full"
        initial={{
          scale: 0,
          border: "0px dotted white",
          rotate: 0,
        }}
        transition={{
          duration: 2,
        //   type: "spring",
          damping:true,
          repeat: "10",
        }}
        animate={{
          scale: 9,
          // boxShadow:"0 0 10px white",
          border: "1px solid white",
          rotate: 360,
        }}
        exit={{
          scale: 1,
        }}
      ></motion.div>
    </div>
  );
}

export default Loader