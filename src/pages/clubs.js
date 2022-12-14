import { Badge, Box, Image, Text } from '@chakra-ui/react';
import webdev from '../assets/web-dev.png';
import programming from '../assets/programming.png';
import blockchain from '../assets/blockchain.png';
import cybersecurity from '../assets/cybersecurity.png';
import ai from '../assets/ai.png';
import { AnimatePresence, motion } from 'framer-motion';
import Club from '../components/club';
import { useState } from 'react';
const clubs = [
  {
    name: 'Programming club',
    image: programming,
    description:
      "Matrix is a great way to get involved with coding and computer science on campus! It's a great way to meet other students who are interested in the same things, and to learn more about what coding can do. The club meets regularly to work on projects and discuss new ideas, and members often have the opportunity to present their work at conferences and other events.",
    club_name: 'Matrix',
    bgColor: '#3498db',
  },
  {
    name: 'Web Development club',
    image: webdev,
    description:
      'Root is a student-run club that helps students learn about and improve their skills in web development. The club offers workshops, guest speakers, and other resources to help members grow as developers. The club also hosts events where members can showcase their work',
    club_name: 'Root',
    bgColor: '#f1c40f',
  },
  {
    name: 'Blockchain club',
    image: blockchain,
    description:
      'Hash blocks is a college club that focuses on the study and development of blockchain technology. The club members learn about different aspects of blockchain technology and how it can be used in various industries. They also work on projects related to blockchain development. The club provides an opportunity for students to gain hands',
    club_name: 'Hashblock',
    bgColor: '#e74c3c',
  },
  {
    name: 'Cybersecurity club',
    image: cybersecurity,
    description:
      'Cyberbloom is a college club that focuses on educating students about the importance of cybersecurity and how to protect themselves online. The club also works to raise awareness about the latest cybersecurity threats and trends.',
    club_name: 'Cyberbloom',
    bgColor: '#2ecc71',
  },
  {
    name: 'AI/DS club',
    image: ai,
    description:
      'Alphabots club in college is a great way to get involved in the latest and greatest technology. The club meets regularly to discuss new advancements in the field, and members have access to exclusive resources and events. The club is also a great way to network with other students who are interested in AI/ML.',
    club_name: 'Alphabots',
    bgColor: '#9b59b6',
  },
];
function Clubs() {
  function closeScreen(){
    setSelected(null)
  }
  console.log(clubs)
  const [selected, setSelected] = useState(null);
  return (
    <AnimatePresence type="crossfade" mode="wait">
      <motion.div className='container mx-auto px-5 lg:p-2 lg:max-w-[calc(100vw_-_210px)] overflow-x-hidden' >
        <div className='grid grid-cols1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10'>
          {clubs.map((club, index) => (
            <motion.div
              key={index+1}
              layoutId={index+1}
              onClick={() => setSelected(index+1)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              // exit={{opacity:0}}
              // viewport={{ margin:"-100px" }}
              className='p-3 ring-1 rounded-lg overflow-hidden hover:scale-[101%] border-white hover:ring-1 dark:ring-white/30 ring-black hover:ring-offset-2 transition-all'
            >
              {console.log(index)}
              <Image
                src={club.image}
                alt={'img'}
                className='rounded-lg shadow-lg mb-5'
              ></Image>
              <Box
                display='flex'
                flexDirection={'column'}
                alignItems={'baseline'}
              >
                <Text fontSize={'xl'} className={'uppercase font-bold'}>
                  {club.name}
                </Text>
                <Badge backgroundColor={club.bgColor} mt={2} color={'black'}>
                  {club.club_name}
                </Badge>
                <Text p={3}>{club.description}</Text>
              </Box>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {selected && <Club closeScreen={closeScreen} id={selected} />}
    </AnimatePresence>
  );
}

export default Clubs;
