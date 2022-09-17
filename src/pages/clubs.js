import {Badge, Box, Image, Text} from "@chakra-ui/react";

function Clubs(){
    return <div className="container mx-auto max-w-[calc(100vw_-_200px)]">
        <div className="grid lg:grid-cols-4 gap-x-5">
            <Box p={5} borderWidth='1px' borderRadius='lg' overflow='hidden'>
                {/*<Image src={"https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"} alt={"img"}></Image>*/}
                <Box display="flex" flexDirection={"column"} alignItems={"baseline"}>
                    <Text fontSize={"xl"} className={"uppercase font-bold"}>
                      Programming club
                    </Text>
                    <Badge backgroundColor={"#3498db"} mt="3" color={"black"}>Matrix</Badge>
                    <Text p={3}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi culpa deserunt eaque eligendi illo quae rem temporibus vero! Ab, aliquam architecto asperiores commodi cum ea eius magni suscipit velit voluptas.
                    </Text>
                </Box>
            </Box>
            <Box p={5} borderWidth='1px' borderRadius='lg' overflow='hidden'>
                {/*<Image src={"https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"} alt={"img"}></Image>*/}
                <Box display="flex" flexDirection={"column"} alignItems={"baseline"}>
                    <Text fontSize={"xl"} className={"uppercase font-bold"}>
                        Web Development club
                    </Text>
                    <Badge backgroundColor={"#f1c40f"} mt={2} color={"black"}>Root</Badge>
                    <Text p={3}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi culpa deserunt eaque eligendi illo quae rem temporibus vero! Ab, aliquam architecto asperiores commodi cum ea eius magni suscipit velit voluptas.
                    </Text>
                </Box>
            </Box>
        </div>
    </div>
}

export default Clubs