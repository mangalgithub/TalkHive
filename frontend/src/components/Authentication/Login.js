import React, { useState } from "react";
import { InputGroup, InputRightElement, useToast } from "@chakra-ui/react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../context/ChatProvider";
const Login = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [loading, setloading] = useState(false);
  const toast = useToast();
  const history = useHistory();
  const { setUser } = ChatState();

  const handleLogin = async () => {
    setloading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        " http://localhost:3000/api/user/login",
        { email, password },
        config
      );
      console.log("data is ",data);
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));

      setloading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
    }
  };
  return (
    <div>
      <form>
        <FormControl id="email" mb={4} mt={3}>
          <FormLabel>Email address</FormLabel>
          <Input
            value={email}
            type="email"
            placeholder="Enter your email"
            autoComplete="off"
            onChange={(e) => setemail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" mb={4}>
          <FormLabel>Password</FormLabel>
          <InputGroup size={"md"}>
            <Input
              value={password}
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              onChange={(e) => setpassword(e.target.value)}
            />
            <InputRightElement width={"4.5rem"}>
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          colorScheme="teal"
          type="submit"
          width="full"
          onClick={handleLogin}
          isLoading={loading}
        >
          Login
        </Button>
        <Button
          variant="solid"
          colorScheme="red"
          width="100%"
          mt={4}
          onClick={() => {
            setemail("guest123@gmail.com");
            setpassword("1234");
          }}
        >
          Get Guest User Credentials
        </Button>
      </form>
    </div>
  );
};
export default Login;
