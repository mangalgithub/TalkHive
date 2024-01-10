import React, { useEffect } from "react";
import { Container, Box, Heading, FormLabel } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, TabPanel, Tab } from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
function HomePage (){
   const history=useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) history.push("/");  //temporary changes done here it should be /chats
  }, [history]);
  return (
    <Container maxW="container.sm" centerContent mt={10}>
      <Box p={8} borderWidth={1} borderRadius="lg" boxShadow="lg">
        <Heading as="h2" size="lg" mb={4}>
          TALKING-NINJAS
        </Heading>
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Center>
                <FormLabel>Login</FormLabel>
              </Center>
              <Login />
            </TabPanel>
            <TabPanel>
              <Center>
                <FormLabel>SignUp</FormLabel>
              </Center>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};
export default HomePage;
