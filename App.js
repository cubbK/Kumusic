import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import SongListPage from "./pages/SongListPage";
import PlayerPage from "./pages/PlayerPage";
import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator(
  {
    SongListPage: SongListPage,
    PlayerPage: PlayerPage
  },
  {
    initialRouteName: "SongListPage",
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#222"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const Routes = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar backgroundColor="#222" barStyle="light-content" />
          <Routes />
        </PersistGate>
      </Provider>
    );
  }
}
