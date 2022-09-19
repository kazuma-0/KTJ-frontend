// An admin page to add events

/**
 * Logic
 * Page should load all the events
 * clicking on edit post will go to the edit page with id passed as the query
 */

import { useCallback, useContext, useEffect, useState } from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Button,
  Flex,
  Grid,
  useToast,
} from '@chakra-ui/react';
import { IconEdit, IconTrash, IconX } from '@tabler/icons';

import HtmlEditor from '../../components/HtmlEditor';
import CSSEditor from '../../components/CSSEditor';
import MdViewer from '../../components/MdViewer';
import { useNavigate, useParams } from 'react-router-dom';
import SupabaseContext from '../../context/SupabaseContext';
import fetchEvents from '../../api/fetch-events';
import deleteEvent from '../../api/delete-event';

function Event() {
  const [markdown, setMarkdown] = useState('');
  const [css, setCss] = useState('');
  const supabase = useContext(SupabaseContext);
  const [events, setEvents] = useState();
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    fetchEvents(supabase)
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        toast({
          title: 'Unable to load events',
          description: error,
          colorScheme: 'red',
          icon: <IconX />,
          variant: 'left-accent',
          position: 'bottom-right',
        });
      });

    console.log(events);
  }, []);

  const handleClick = useCallback((id) => {
    // console.log(e)
    navigate(`/edit/event/${id}`);
  },[]);

  const handleDelete = useCallback((id) => {
    console.log(id)
    deleteEvent(supabase, id).then(finish=>{
      if(finish){
        fetchEvents(supabase)
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        toast({
          title: 'Unable to load events',
          description: error,
          colorScheme: 'red',
          icon: <IconX />,
          variant: 'left-accent',
          position: 'bottom-right',
        });
      });
      }
    }).catch()
  },[]);

  return (
    <div className='max-w-3xl h-[80vh] mx-auto '>
      <div className='text-3xl uppercase text-center pb-5'>Posts</div>
      {events?.map((event) => {
        return (
          <div
            key={event.id}
            className='w-full p-3 outline outline-gray-700 rounded shadow grid grid-cols-3'
          >
            <img className='h-32 rounded' src={event.image} alt='' />
            <div className='col-span-2 '>
              <h2 className='text-xl'>{event.title}</h2>
              <p className='text-sm py-2 pb-5 text-gray-300'>{event.name}</p>
              <div className={'w-full gap-x-3 grid grid-cols-3'}>
                <Button
                  onClick={() => {
                    handleClick(event.id);
                  }}
                  leftIcon={<IconEdit />}
                  variant={'solid'}
                  colorScheme={'messenger'}
                >
                  Edit post
                </Button>
                <Button onClick={()=>{handleDelete(event.id)}} leftIcon={<IconTrash />} colorScheme={'red'}>
                  Delete post
                </Button>
              </div>
            </div>
          </div>
        );
      })}
      {/* grid grid-cols-2 gap-x-5 */}
      {/* <Tabs>
            <TabList>
                <Tab>Markdown</Tab>
                <Tab>Styles</Tab>
                <Tab>Preview</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <HtmlEditor onChange={(e) => {
                        setMarkdown(e);
                        console.log(e)
                    }} />
                </TabPanel>
                <TabPanel>
                    <CSSEditor onChange={(e) => {
                        setCss(e);
                        console.log(e)
                    }} />
                </TabPanel>
                <TabPanel>
                    <MdViewer markdown={markdown} css={css} />
                </TabPanel>
            </TabPanels>
        </Tabs> */}
      {/* 
         <ReactMarkDown children={markdown}></ReactMarkDown> 
        <div className="unreset" dangerouslySetInnerHTML={{__html: marked(markdown)}}></div> */}
    </div>
  );
}

export default Event;
