import React from 'react'
import {
    Box,Button,Center, Heading,Text
  } from "@chakra-ui/react"
import { withRouter } from "react-router-dom";

const Error = ({err,history})=> {

    return (
<Center py={6}>
      <Box 
          maxW={"2xl"}
          w={"full"}
          borderRadius={"lg"}
          overflow="hidden"
          boxShadow={"1xl"}
          borderWidth={"2px"}
          p={8}>
        <Heading color={"red"}>Error</Heading>
        <Text pt={4}>{err}</Text>
        <Button mt={8} colorScheme={"teal"} onClick={()=>{history.push("/")}}>Go home</Button>
      </Box>
</Center>
    )
}


export default withRouter(Error) ;