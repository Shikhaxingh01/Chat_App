import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack, Box } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState("");  // initial value as empty string
  const [password, setPassword] = useState(""); // initial value as empty string
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { setUser } = ChatState();

  const submitHandler = async () => {
    setLoading(true);
    
    // Validate the form fields
    if (!email || !password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Make the POST request to login
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats"); // Redirect to chats page
    } catch (error) {
      console.error("Login Error: ", error); // Log error for debugging

      toast({
        title: "Error Occurred!",
        description: error?.response?.data?.message || "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setLoading(false);
    }
  };

  return (
    <Box bg="#121212" color="#fff" minH="100vh" d="flex" justifyContent="center" alignItems="center">
      <VStack spacing="20px" w={{ base: "90%", sm: "80%", md: "60%" }} p={5} borderRadius="lg" bg="#1A1A1A">
        <FormControl id="email" isRequired>
          <FormLabel color="yellow.400">Email Address</FormLabel>
          <Input
            value={email}
            type="email"
            placeholder="Enter Your Email Address"
            onChange={(e) => setEmail(e.target.value)}
            bg="#2E2E2E"
            color="#fff"
            borderColor="#555"
            _hover={{ borderColor: "#ff9800" }}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel color="yellow.400">Password</FormLabel>
          <InputGroup size="md">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={show ? "text" : "password"}
              placeholder="Enter password"
              bg="#2E2E2E"
              color="#fff"
              borderColor="#555"
              _hover={{ borderColor: "#ff9800" }}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick} color="yellow.400" _hover={{ bg: "yellow.500" }}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          colorScheme="yellow"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          isLoading={loading}
          bg="#ff9800"
          _hover={{ bg: "#ff5722" }}
        >
          Login
        </Button>
        <Button
          variant="solid"
          colorScheme="red"
          width="100%"
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("123456");
          }}
          bg="#d32f2f"
          _hover={{ bg: "#c62828" }}
        >
          Get Guest User Credentials
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;
