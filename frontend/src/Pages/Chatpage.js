import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        d="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
        bg="black" // Dark background for the entire page
        color="white" // White text color for contrast
      >
        {user && (
          <MyChats
            fetchAgain={fetchAgain}
            bg="gray.800" // Dark gray background for MyChats
            borderColor="gray.700" // Subtle border color for MyChats
            borderWidth="1px"
          />
        )}
        {user && (
          <Chatbox
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
            bg="gray.800" // Dark gray background for Chatbox
            borderColor="gray.700" // Subtle border color for Chatbox
            borderWidth="1px"
          />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
