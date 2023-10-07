# Farmers Dairy Coop Society App

An app to record farmers milk sales


## Errors I faced and how I overcame

React native navigation drawer was not working

It kept showing errors such as 
- Reanimated 2 failed to create a worklet, maybe you forgot to add Reanimated's babel plugin?
- TypeError: _ReanimatedModule.default.configureProps is not a function
- Mismatch between JavaScript part and native part of Reanimated 3.5.2 and 3.3.0

I struggled with the error for a whole day and finally what worked for me was
after adding _plugins: ["react-native-reanimated/plugin"],_ to babel.config.js
running 
    _npx expo install --fix_
    then _npx expo start -c_
  and it worked

  then add _import 'react-native-gesture-handler';_ at the top of App.js