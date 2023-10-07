import React from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  VStack,
  Box,
  FormControl,
  Input,
  Pressable,
  useColorModeValue,
  Button,
  Modal
} from "native-base";
import { Animated, Dimensions, StatusBar } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";

export default function SignInUp() {
  const SignUp = () => {
    return <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading size="lg" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }} fontWeight="semibold">
          Welcome
        </Heading>
        <Heading mt="1" color="coolGray.600" _dark={{
          color: "warmGray.200"
        }} fontWeight="medium" size="xs">
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Username</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Phone</FormControl.Label>
            <Input keyboardType="phone-pad" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input type="password" />
          </FormControl>
          <Button onPress={()=>setIndex(0)} mt="2" colorScheme="primary">
            Sign up
          </Button>
        </VStack>
      </Box>
    </Center>;
  };
  const SignIn = () => {
    return (
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
            color: "warmGray.50"
          }}>
            Welcome
          </Heading>
          <Heading mt="1" _dark={{
            color: "warmGray.200"
          }} color="coolGray.600" fontWeight="medium" size="xs">
            Sign in to continue!
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Username</FormControl.Label>
              <Input onChangeText={(text)=>setusername(text)}/>
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" />
              <Link _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "#356290"
              }} alignSelf="flex-end" mt="1" onPress={()=>setModalVisible(!modalVisible)}>
                Forgot Password?
              </Link>
            </FormControl>
            <Button onPress={()=>{}} mt="2" colorScheme="primary">
              Sign in
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text fontSize="sm" color="coolGray.600" _dark={{
                color: "warmGray.200"
              }}>
                I'm a new user.{" "}
              </Text>
              <Link _text={{
                color: "#356290",
                fontWeight: "medium",
                fontSize: "sm"
              }} onPress={()=>setIndex(1)}>
                Sign Up
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    );
  };
  //
  const initialLayout = {
    width: Dimensions.get('window').width
  };
  const renderScene = SceneMap({
    first: SignIn,
    second: SignUp
  });
  const [modalVisible, setModalVisible] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([{
    key: 'first',
    title: 'Sign in'
  }, {
    key: 'second',
    title: 'Sign up'
  }]);

  const renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return <Box flexDirection="row">
      {props.navigationState.routes.map((route, i) => {
        const opacity = props.position.interpolate({
          inputRange,
          outputRange: inputRange.map(inputIndex => inputIndex === i ? 1 : 0.5)
        });
        const color = index === i ? useColorModeValue('#000', '#e5e5e5') : useColorModeValue('#1f2937', '#a1a1aa');
        const borderColor = index === i ? 'cyan.500' : useColorModeValue('coolGray.200', 'gray.400');
        return <Box key={i} borderBottomWidth="3" borderColor={borderColor} flex={1} alignItems="center" p="3" cursor="pointer">
          <Pressable onPress={() => {
            console.log(i);
            setIndex(i);
          }}>
            <Animated.Text style={{
              color
            }}>{route.title}</Animated.Text>
          </Pressable>
        </Box>;
      })}
    </Box>;
  };

  /*
     
  */
  const [username, setusername] = React.useState('')
  return <>
  <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} avoidKeyboard justifyContent="center" bottom="4" size="lg">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Forgot Password?</Modal.Header>
          <Modal.Body>
            Enter your phone number and we'll send a code to use as your temporary password.
            <FormControl mt="3">
              <FormControl.Label>Username</FormControl.Label>
              <Input defaultValue={username} onChangeText={(text)=>setusername(text)} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Phone</FormControl.Label>
              <Input keyboardType="phone-pad" />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button flex="1" onPress={() => {
            setModalVisible(false);
          }}>
              Proceed
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
  <TabView navigationState={{
    index,
    routes
  }} renderScene={renderScene} renderTabBar={renderTabBar} onIndexChange={setIndex} initialLayout={initialLayout} style={{
    marginTop:0 
    // StatusBar.currentHeight
  }} /></>;
};