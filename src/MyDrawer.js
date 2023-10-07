import 'react-native-gesture-handler';
import React, { useEffect } from "react";
import {
  Text,
  HStack,
  Center,
  VStack,
  Box,
  Icon,
  Pressable,
  Divider,
  useToast
} from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { DrawerContentScrollView, createDrawerNavigator } from "@react-navigation/drawer";
import { BackHandler, Share } from 'react-native';

const Drawer = createDrawerNavigator();
function Component(props) {
    
  switch (props.route.name) {
    case "About app":
      return (
        <Center><Text px="2" textAlign={"justify"} mt="12" fontSize="18">
    Our Farmers Milk Recording App is a user-friendly and efficient tool designed to streamline the milk recording process for dairy farmers. With this app, farmers can easily record and track critical data related to their herd's milk production, such as individual cow yields, milk quality, and health metrics. The app provides real-time insights and analytics, helping farmers make informed decisions to optimize their herd's performance and overall dairy operations. Whether on the farm or on the go, our Farmers Milk Recording App empowers dairy farmers to manage their herd with precision and ease, ultimately enhancing productivity and profitability in the dairy industry.
    </Text>
    <Text mt="12" fontSize="18">
    Be sure to make a donation.
  </Text>
    </Center>);
    default:
      return (
        <Center><Text mt="12" fontSize="18">
    This is {props.route.name} page.
  </Text></Center>);
  }
      
}

const getIcon = (screenName) => {
  switch (screenName) {
    case "Dashboard":
      return "view-dashboard-variant";
    case "Calculator":
      return "calculator";
    case "Farmers Tips":
      return "lightbulb-on";
    case "Donations":
      return "currency-usd";
    case "Settings":
      return "cog";
    case "About app":
      return "information-variant";
    default:
      return undefined;
  }
};
const shareApp = async () => {
    try {
        await Share.share({
            message: "Download this app from \n"+
            "https://play.google.com/store/apps/details?id=com.openai.chatgpt&pcampaignid=web_share",
            title: 'Share App',
        })
    } catch (error) {
        console.log("ERROR SHARING:" + error)
    }
}

export default function MyDrawer({navigation}) {
function CustomDrawerContent(props) {
    const toast=useToast();const exitId='toast.exit';
  return (
    <DrawerContentScrollView {...props} safeArea>
      <VStack space="6" my="2" mx="1">
        <Box px="4">
          <Text fontSize="14" bold color="gray.700">
            Twaweza Farmers Dairy Society
          </Text>
          <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
            Pamoja tuinue uchumi kwa maziwa
          </Text>
        </Box>
        <VStack divider={<Divider />} space="4">
          <VStack space="3">
            {props.state.routeNames.map((name, index) => (
              <Pressable
              key={index}
                px="5"
                py="3"
                rounded="md"
                bg={
                  index === props.state.index
                    ? "rgba(6, 182, 212, 0.1)"
                    : "transparent"
                }
                onPress={(event) => {
                  props.navigation.navigate(name);
                }}
              >
                <HStack space="7" alignItems="center">
                  <Icon
                    color={
                      index === props.state.index ? "primary.500" : "gray.500"
                    }
                    size="5" as={<MaterialCommunityIcons name={getIcon(name)} />}
                  />
                  <Text
                    fontWeight="500"
                    color={
                      index === props.state.index ? "primary.500" : "gray.700"
                    }
                  >
                    {name}
                  </Text>
                </HStack>
              </Pressable>
            ))}
          </VStack>
          <VStack space="5">
            
            <VStack space="3">
              <Pressable px="5" py="3" onPress={()=>navigation.navigate('signin')}>
                <HStack space="7" alignItems="center">
                  <Icon
                    color="gray.500"
                    size="5"
                    as={<MaterialCommunityIcons name="account" />}
                  />
                  <Text color="gray.700" fontWeight="500">
                    Sign in
                  </Text>
                </HStack>
              </Pressable>
              <Pressable px="5" py="2" onPress={shareApp}>
                <HStack space="7" alignItems="center">
                  <Icon
                    color="gray.500"
                    size="5"
                    as={<MaterialCommunityIcons name="share-variant" />}
                  />
                  <Text color="gray.700" fontWeight="500">
                    Share
                  </Text>
                </HStack>
              </Pressable>
              <Pressable px="5" py="3" onPress={()=>{
              toast.isActive(exitId)?null:toast.show({exitId,title:'Good bye for now'})
                ;BackHandler.exitApp();}}>
                <HStack space="7" alignItems="center">
                  <Icon
                    color="gray.500"
                    size="5"
                    as={<MaterialCommunityIcons name="power" />}
                  />
                  <Text fontWeight="500" color="gray.700">
                    Exit
                  </Text>
                </HStack>
              </Pressable>
            </VStack>
            <HStack marginLeft={16} space="1" alignItems="center">
                  <Icon
                    color="gray.500"
                    size="4"
                    as={<MaterialCommunityIcons name="copyright" />}
                  />
            <Text fontWeight="500" fontSize="14" px="2" color="gray.500">
              Copyright 2023
            </Text>
                </HStack>
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
}

  return (
    <Box safeArea flex={1}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Dashboard" component={Component} />
        <Drawer.Screen name="Calculator" component={Component} />
        <Drawer.Screen name="Farmers Tips" component={Component} />
        <Drawer.Screen name="Donations" component={Component} />
        <Drawer.Screen name="Settings" component={Component} />
        <Drawer.Screen name="About app" component={Component} />
      </Drawer.Navigator>
    </Box>
  );
}