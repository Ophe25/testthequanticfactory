import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import Accueil from "../Accueil/Accueil";
import Fontaines from "../Fontaines/Fontaines";
import Activites from "../Activites/Activites";
import EspacesVerts from "../EspacesVerts/EspacesVerts";


export default function Navigation(props) {
    return (
        <NavigationContainer>
            {MainStackScreen(props)}
        </NavigationContainer>
    );
};
const MainStack = createNativeStackNavigator();
const MainStackScreen = (props) => (
    <MainStack.Navigator
        initialRouteName="Accueil"
        screenOptions={{
            headerShown: false,

        }}
    >
        <MainStack.Screen
            name="Accueil"
            component={Accueil}
            options={{
                header: () => null,
            }}
        />

        <MainStack.Screen
            name="Fontaines"
            component={Fontaines}
            options={{
                header: () => null,
            }}
        />

        <MainStack.Screen
            name="Activites"
            component={Activites}
            options={{
                header: () => null,
            }}
        />

        <MainStack.Screen
            name="EspacesVerts"
            component={EspacesVerts}
            options={{
                header: () => null,
            }}
        />

    </MainStack.Navigator>
);