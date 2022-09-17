// An admin page to add events
import {useState} from "react";
import {Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid, Button, Flex, Grid} from '@chakra-ui/react'
import Editor from "@monaco-editor/react";
import {marked} from "marked";
import * as PropTypes from "prop-types";
import {IconTrash} from "@tabler/icons";

function HtmlEditor(props) {
    return <TabPanel>
        <Editor className="h-[70vh]" options={{
            minimap: {
                enabled: false
            },
        }} onChange={props.onChange} theme="vs-dark" defaultLanguage="markdown" keepCurrentModel
                language="markdown"></Editor>
    </TabPanel>;
}

HtmlEditor.propTypes = {onChange: PropTypes.func};

function CSSEditor(props) {
    return <TabPanel>
        <Editor className="h-[70vh]" options={{
            minimap: {
                enabled: false
            },
        }} onChange={props.onChange} theme="vs-dark" defaultLanguage="css" keepCurrentModel
                language="markdown"></Editor>
    </TabPanel>;
}

CSSEditor.propTypes = {onChange: PropTypes.func};

function MdViewer(props) {
    return <TabPanel>
        <div className="unreset"
             dangerouslySetInnerHTML={{__html: marked(`${props.markdown} <style>${props.css}</style>`)}}></div>

    </TabPanel>;
}

MdViewer.propTypes = {
    markdown: PropTypes.string,
    css: PropTypes.string
};

function AddEvent() {
    const [markdown, setMarkdown] = useState("");
    const [css, setCss] = useState("");
    return <div className="max-w-3xl h-[80vh] mx-auto ">
        <div className="text-3xl uppercase text-center pb-5">Posts</div>
        <div className="w-full p-3 outline outline-gray-700 rounded shadow grid grid-cols-3">
            <img className="h-32 rounded" src="https://elghncvgxvslfojupbdi.supabase.co/storage/v1/object/public/images/public/workshop-image-1.jpg" alt=""/>
            <div className="col-span-2 ">
                <h2 className="text-xl">Title</h2>
                <p className="text-sm py-2 text-gray-300">Author</p>
                <div  className={"w-full gap-x-3 grid grid-cols-3"}>
                    <Button variant={"outline"} colorScheme={"facebook"}>Edit post</Button>
                    <Button leftIcon={<IconTrash/>} colorScheme={"red"}>Delete post</Button>
                </div>

            </div>
        </div>
        {/*grid grid-cols-2 gap-x-5*/}
        {/*<Tabs>*/}
        {/*    <TabList>*/}
        {/*        <Tab>Markdown</Tab>*/}
        {/*        <Tab>Styles</Tab>*/}
        {/*        <Tab>Preview</Tab>*/}
        {/*    </TabList>*/}
        {/*    <TabPanels>*/}
        {/*        <HtmlEditor onChange={(e) => {*/}
        {/*            setMarkdown(e);*/}
        {/*            console.log(e)*/}
        {/*        }}/>*/}
        {/*        <CSSEditor onChange={(e) => {*/}
        {/*            setCss(e);*/}
        {/*            console.log(e)*/}
        {/*        }}/>*/}
        {/*        <MdViewer markdown={markdown} css={css}/>*/}
        {/*    </TabPanels>*/}
        {/*</Tabs>*/}

        {/* <ReactMarkDown children={markdown}></ReactMarkDown> */}
        {/*<div className="unreset" dangerouslySetInnerHTML={{__html: marked(markdown)}}></div>*/}
    </div>;
}

export default AddEvent;