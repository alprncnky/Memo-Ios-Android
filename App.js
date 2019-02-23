import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import {
  createSwitchNavigator,
  createAppContainer, 
  createDrawerNavigator, 
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import CustomDrawerContent from './src/components/CustomDrawer';
import WelcomeScreen from './src/components/screens/WelcomeScreen';
import Feed from './src/components/screens/Feed';
import Question from './src/components/screens/Question';
import Settings from './src/components/screens/Settings';
import List from './src/components/screens/List';
import Test from './src/components/screens/Test';


class App extends Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}

export default App;

// ************* SCREENS IMPORTED. *************
//**********************************************/

const SettingsStack = createStackNavigator({
  Settings: { screen: Settings,
      navigationOptions:  ({navigation}) => {
        return {
          headerTitle: 'Memo',
          headerLeft: <Icon color='#858585' style={{paddingLeft: 18}} name='md-menu' size={30} onPress={ ()=> navigation.openDrawer() } /> ,
          headerTitleStyle: {
            alignSelf: 'center',
            textAlign: "center",
            justifyContent: 'center',
            flex: 1,
            fontWeight: 'bold',
            fontSize: 25,
            textAlignVertical: 'center'
        },
        headerRight: <Text></Text>
        }
      }
   }
})

const TestStack = createStackNavigator({
  Test: { screen: Test,
      navigationOptions:  ({navigation}) => {
        return {
          headerTitle: 'Memo',
          headerLeft: <Icon color='#858585' style={{paddingLeft: 18}} name='md-menu' size={30} onPress={ ()=> navigation.openDrawer() } /> ,
          headerTitleStyle: {
            alignSelf: 'center',
            textAlign: "center",
            justifyContent: 'center',
            flex: 1,
            fontWeight: 'bold',
            fontSize: 25,
            textAlignVertical: 'center'
        },
        headerRight: <Text></Text>
        }
      }
   },
   Question: { screen: Question,
    navigationOptions:  ({navigation}) => {
      return {
        headerTitle: 'Memo',
        headerTitleStyle: {
            alignSelf: 'center',
            textAlign: "center",
            justifyContent: 'center',
            flex: 1,
            fontWeight: 'bold',
            fontSize: 25,
            textAlignVertical: 'center'
        },
        headerRight: <Text></Text>
      }
    }
   }

})

const FeedStack = createStackNavigator({
  Feed: { screen: Feed,
      navigationOptions:  ({navigation}) => {
        return {
          headerTitle: 'Memo',
          headerLeft: <Icon color='#858585' style={{marginLeft: 18 }} name='md-menu' size={30} onPress={ ()=> navigation.openDrawer() } /> ,
          headerTitleStyle: {
              alignSelf: 'center',
              textAlign: "center",
              justifyContent: 'center',
              flex: 1,
              fontWeight: 'bold',
              fontSize: 25,
              textAlignVertical: 'center'
          },
          headerRight: <Text></Text>
        }
      }
   },
  List: { screen: List,
    navigationOptions:  ({navigation}) => {
      return {
        headerTitle: 'Memo',
        headerTitleStyle: {
            alignSelf: 'center',
            textAlign: "center",
            justifyContent: 'center',
            flex: 1,
            fontWeight: 'bold',
            fontSize: 25,
            textAlignVertical: 'center'
        },
        headerRight: <Text></Text>
      }
    }
   }
})

const DashboardTabNavigator = createBottomTabNavigator({
  FeedStack: {
    screen: FeedStack,
    navigationOptions: {
      tabBarLabel: 'Lists',
      tabBarIcon: ({tintColor}) => (<Icon name='md-list' size={tintColor == '#33bbff'? 35 : 30} color={tintColor} />)
    }
  },
  TestStack: {
    screen: TestStack,
    navigationOptions: {
      tabBarLabel: 'Test',
      tabBarIcon: ({tintColor}) => (<Icon name='md-create' size={tintColor == '#33bbff'? 35 : 30} color={tintColor} />)
    }
  },
  SettingsStack: {
    screen: SettingsStack,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({tintColor}) => (<Icon name='md-settings' size={tintColor == '#33bbff'? 35 : 30} color={tintColor} />)
    }
  }
},
{
  navigationOptions: {
    header:null
  },
  tabBarOptions: {
    activeTintColor: "#33bbff",
    inactiveTintColor: "#858585",
      style: {
        height: 60,
        paddingVertical: 5,
        backgroundColor: "#fff"
      }
  }
})



const DashboardStackNavigator = createStackNavigator({
  DashboardTabNavigator: DashboardTabNavigator
})

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: { screen: DashboardStackNavigator }    // 2)  DashboardScreen => DashboardTabNavigator      3)  => DashboardStackNavigator
},{
  contentComponent: CustomDrawerContent
})

const AppSwicthNavigator = createSwitchNavigator({
  Welcome: { screen: WelcomeScreen },
  Dashboard: { screen: AppDrawerNavigator }      // 1)  DashboardScreen => AppDrawerNavigator 
})

const AppContainer = createAppContainer(AppSwicthNavigator);