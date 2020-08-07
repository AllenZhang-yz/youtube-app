import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, processColor } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  Theme,
  useTheme,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider, useSelector } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import VideoPlay from './src/screens/VideoPlay';
import Explore from './src/screens/Explore';
import Subscribe from './src/screens/Subscribe';
import Header from './src/components/Header';
import { dataReducer, IDataState } from './src/reducers/data/dataReducer';
import { themeReducer } from './src/reducers/themeReducer';
import { dataSagas } from './src/reducers/data/dataSagas';

export interface IRootState {
  data: IDataState;
  theme: boolean;
}

export type ModalStackParamList = {
  rootHome: undefined;
  search: undefined;
  videoPlay: {
    videoId: string;
    title: string;
  };
};

type ModalTabParamList = {
  home: undefined;
  explore: undefined;
  subscribe: undefined;
};

export type CustomTheme = Theme & {
  colors: { headerColor: string; iconColor: string; tabIcon: string };
};

const customDarkTheme: CustomTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    headerColor: '#404040',
    iconColor: '#fff',
    tabIcon: '#fff',
  },
};

const customDefaultTheme: CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    headerColor: '#fff',
    iconColor: '#000',
    tabIcon: 'red',
  },
};

const rootReducer = combineReducers({
  data: dataReducer,
  theme: themeReducer,
});

const sagaMiddleware = createSagaMiddleware();

const middlewares = [applyMiddleware(sagaMiddleware)];

const store = createStore(rootReducer, compose(...middlewares));

sagaMiddleware.run(dataSagas);

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans-condensed-bold': require('./assets/fonts/OpenSansCondensed-Bold.ttf'),
    'ubuntu-condensed': require('./assets/fonts/UbuntuCondensed-Regular.ttf'),
  });
};

const Stack = createStackNavigator<ModalStackParamList>();
const Tabs = createBottomTabNavigator<ModalTabParamList>();

export interface IModalStackNavigation
  extends StackNavigationProp<ModalStackParamList> {}

const RootHome = () => {
  const { colors } = useTheme() as CustomTheme;
  return (
    <View style={styles.container}>
      <Header />
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;
            if (route.name === 'home') {
              iconName = 'home';
            } else if (route.name === 'explore') {
              iconName = 'explore';
            } else if (route.name === 'subscribe') {
              iconName = 'subscriptions';
            }
            return (
              <MaterialIcons
                name={iconName as string}
                size={32}
                color={color}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: colors.tabIcon,
          inactiveTintColor: 'gray',
        }}
      >
        <Tabs.Screen
          name="home"
          component={Home}
          options={{ tabBarLabel: 'Home' }}
        />
        <Tabs.Screen
          name="explore"
          component={Explore}
          options={{ tabBarLabel: 'Explore' }}
        />
        <Tabs.Screen
          name="subscribe"
          component={Subscribe}
          options={{ tabBarLabel: 'Subscribe' }}
        />
      </Tabs.Navigator>
    </View>
  );
};

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const myTheme = useSelector<IRootState, boolean>((state) => state.theme);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  return (
    <NavigationContainer theme={myTheme ? customDarkTheme : customDefaultTheme}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="rootHome" component={RootHome} />
        <Stack.Screen name="search" component={Search} />
        <Stack.Screen name="videoPlay" component={VideoPlay} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
