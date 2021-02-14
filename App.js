import React from 'react';

import {
    View,
    Text,
    Button,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<HeaderStack />
		</NavigationContainer>
	)
}

const HomeScreen = () => {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Home</Text>
		</View>
	)
}

const HomeStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
		</Stack.Navigator>
	)
}

const TVScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>TV Pampa!</Text>
			<Button 
				title="set fullscreen" 
				onPress={() => {
					navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({ headerShown: false })
					navigation.setOptions({ tabBarVisible: false })
				}}
			/>
		</View>
    )
}

const RadiosScreen = ({ navigation }) => {
	React.useEffect(() => {
		navigation.setOptions({ tabBarVisible: false })
		navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({ headerLeft: () => <Text>drawer e voltar</Text>, headerRight: () => <Text>coracao</Text>, headerTitle: () => <Text>search bar</Text> });
	})

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Radios!</Text>
		</View>
    )
}

const JornalScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Jornal!</Text>
		</View>
    )
}

const PDFScreen = () => {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>PDF!</Text>
		</View>
	)
}

const JornalStack = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen name="WebView" component={JornalScreen} />
			<Tab.Screen name="Flip" component={PDFScreen} />
			<Tab.Screen name="Baixar PDF" component={PDFScreen} />
		</Tab.Navigator>
	)
}

const TabStack = () => {
    return (
        <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
			<Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Radios" component={RadiosScreen} />
            <Tab.Screen name="TV" component={TVScreen} />
            <Tab.Screen name="Jornal" component={JornalStack} />
        </Tab.Navigator>
    )
}

const DrawerStack = () => {
	return (
		<Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
			<Drawer.Screen name="Tab" component={TabStack} />
		</Drawer.Navigator>
	)
}

const HeaderStack = () => {
	return (
		<Stack.Navigator screenOptions={{
			headerStyle: {
			  backgroundColor: '#f4511e',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
			  fontWeight: 'bold',
			},
			title: 'Header'
		  }}>
			<Stack.Screen name="Drawer" component={DrawerStack} />
		</Stack.Navigator>
	)
}

const CustomTabBar = ({ state, descriptors, navigation }) => {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

	if (focusedOptions.tabBarVisible === false) {
		return null;
	}

	return (
		<SafeAreaView>
			<View style={{ flexDirection: 'row' }}>
				{state.routes.map((route, index) => {
					const { options } = descriptors[route.key];
					const label =
						options.tabBarLabel !== undefined
							? options.tabBarLabel
							: options.title !== undefined
								? options.title
								: route.name;

					const isFocused = state.index === index;

					const onPress = () => {
						const event = navigation.emit({
							type: 'tabPress',
							target: route.key,
							canPreventDefault: true,
						});

						if (!isFocused && !event.defaultPrevented) {
							navigation.navigate(route.name);
						}
					};

					const onLongPress = () => {
						navigation.emit({
							type: 'tabLongPress',
							target: route.key,
						});
					};

					if (label !== 'Home') {
						return (
							<TouchableOpacity
								accessibilityRole="button"
								accessibilityState={isFocused ? { selected: true } : {}}
								accessibilityLabel={options.tabBarAccessibilityLabel}
								testID={options.tabBarTestID}
								onPress={onPress}
								onLongPress={onLongPress}
								style={{ flex: 1 }}
								key={index}
							>
								<Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
									{label}
								</Text>
							</TouchableOpacity>
						);
					}
				})}
			</View>
		</SafeAreaView>
	);
}

const CustomDrawer = (props) => {
    return (
        <DrawerContentScrollView {...props} >

        </DrawerContentScrollView>
    )
}

export default App;