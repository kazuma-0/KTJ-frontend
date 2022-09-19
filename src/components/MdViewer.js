import { marked } from 'marked';
function MdViewer(props) {
  return (
    // <TabPanel>
    <div
      className='unreset'
      dangerouslySetInnerHTML={{
        __html: `${props.markdown} <style>${props.css}</style>`,
      }}
    ></div>
    // </TabPanel>
  );
}

export default MdViewer;
