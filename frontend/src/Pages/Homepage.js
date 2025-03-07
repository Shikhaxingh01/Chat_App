import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

function Homepage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="black" // Black background for consistency with your theme
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        borderColor="gray.700" // Dark gray border for subtle contrast
      >
        <Text fontSize="4xl" fontFamily="Work sans" color="yellow.400"> {/* Yellow highlight text */}
         Collage Space Chat
        </Text>
      </Box>
      <Box bg="black" w="100%" p={4} borderRadius="lg" borderWidth="1px" borderColor="gray.700"> {/* Black background */}
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab
              _selected={{
                bg: "gray.800", // Darker gray for selected tab
                color: "yellow.400", // Yellow text for selected tab
              }}
              color="white" // White color for unselected tabs
            >
              Login
            </Tab>
            <Tab
              _selected={{
                bg: "gray.800", // Darker gray for selected tab
                color: "yellow.400", // Yellow text for selected tab
              }}
              color="white" // White color for unselected tabs
            >
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;
