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
    const [new_username, setNewUsername] = React.useState('')
    const [new_phone, setNewPhone] = React.useState('')
    const [new_password1, setNewPassword1] = React.useState('')
    const [new_password2, setNewPassword2] = React.useState('')

    const submitSignup = async () => {
      const formdata = {};
      formdata.username = new_username.trim().replace(/[^a-zA-Z ]/g, "");
      formdata.phone = new_phone.trim();
      formdata.password = new_password2.trim();
      console.log(formdata)
      var response = await fetch('http://192.168.100.13:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata)
      }).catch(err => {
        console.err(err)
      })
      const data = await response.json();
      console.log(data)
    }
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
            {/* <Input value={new_username} onChangeText={(text)=>setNewUsername(text)} /> */}
            <Input onChangeText={(text) => setNewUsername(text)} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Phone</FormControl.Label>
            <Input onChangeText={(text) => setNewPhone(text)} maxLength={9} placeholder="e.g 0758..." keyboardType="phone-pad" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input onChangeText={(text) => setNewPassword1(text)} type="password" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input onChangeText={(text) => setNewPassword2(text)} type="password" />
          </FormControl>
          {(new_password1.length < 16 || new_password1 === new_password2) ?
            <Button type="submit" onPress={() => submitSignup()} mt="2" colorScheme="primary">Sign up
            </Button>
            : <Button type="submit" isDisabled mt="2" colorScheme="primary">Sign up
            </Button>
          }

        </VStack>
      </Box>
    </Center>;
  };
  const [username, setUsername] = React.useState('')
  const SignIn = () => {
    const [password, setPassword] = React.useState('')
    const submitSignin = async () => {
      const formdata = {};
      formdata.username = username.trim().replace(/[^a-zA-Z ]/g, "");
      formdata.password = password.trim();
      console.log(formdata)
      var response = await fetch('http://192.168.100.13:8000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata)
      }).catch(err => {
        console.err(err)
      })
      const data = await response.json();
      console.log(data)
    }
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
              <Input onChangeText={(text) => setUsername(text)} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" onChangeText={(text) => setPassword(text)} />
              <Link _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "#356290"
              }} alignSelf="flex-end" mt="1" onPress={() => setModalVisible(!modalVisible)}>
                Forgot Password?
              </Link>
            </FormControl>
            <Button onPress={() => { submitSignin();}} mt="2" colorScheme="primary">
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
              }} onPress={() => setIndex(1)}>
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
  const [fUsername, setfUsername] = React.useState('')
  const [fPhone, setfPhone] = React.useState('')
  const [fPassword, setfPassword] = React.useState('')
  const submitForgot = async () => {
    const formdata = {};
    formdata.username = fUsername.trim().replace(/[^a-zA-Z ]/g, "");
    formdata.phone = fPhone.trim();
    formdata.password = fPassword.trim();
    console.log(formdata)
    var response= await fetch('http://192.168.100.13:8000/signup', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formdata)
    }).catch(err => {
      console.err(err)
    })
    const data = await response.json();
    console.log(data)
}
  return <>
    <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} avoidKeyboard justifyContent="center" bottom="4" size="lg">
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Forgot Password?</Modal.Header>
        <Modal.Body>
          Enter your phone number and we'll send a code to use as your temporary password.
          <FormControl mt="3">
            <FormControl.Label>Username</FormControl.Label>
            <Input defaultValue={username} onChangeText={(text) => setfUsername(text)} />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Phone</FormControl.Label>
            <Input keyboardType="phone-pad" onChangeText={(text) => setfPhone(text)} />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>New Password</FormControl.Label>
            <Input type="password" onChangeText={(text) => setfPassword(text)} />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button flex="1" onPress={() => {
            setModalVisible(false);submitForgot();
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
      marginTop: 0
      // StatusBar.currentHeight
    }} /></>;
};