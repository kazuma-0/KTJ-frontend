import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  useStatStyles,
  Button,
} from '@chakra-ui/react';
import { IconPencil } from '@tabler/icons';
import { useEffect, useState } from 'react';
import CSSEditor from './CSSEditor';
import HtmlEditor from './HtmlEditor';
import MdViewer from './MdViewer';
function EditorLayout(props) {
  const [css, setCss] = useState('');
  const [markdown, setMarkdown] = useState('');
  useEffect(() => {
    if (props.markdown !== undefined) {
      console.log(props.css);
      setCss(props.css);
      setMarkdown(props.markdown);
    }
  }, [props]);

  function handleButton() {
    props.passValues(markdown, css);
  }
  return (
    <div className='max-w-7xl mx-auto'>
      <Tabs>
        <TabList>
          <Tab>Markdown</Tab>
          <Tab>Styles</Tab>
          <Tab>Preview</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <HtmlEditor
              onChange={(e) => {
                setMarkdown(e);
              }}
              value={markdown}
            />
          </TabPanel>
          <TabPanel>
            <CSSEditor
              onChange={(e) => {
                setCss(e);
              }}
              value={css}
            />
          </TabPanel>
          <TabPanel>
            <MdViewer markdown={markdown} css={css} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <div className='flex w-full justify-end pr-5 py-5'>
        {markdown ? (
          <Button
            variant='solid'
            leftIcon={<IconPencil />}
            colorScheme={'whatsapp'}
          >
            Submit
          </Button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default EditorLayout;
