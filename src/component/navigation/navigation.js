// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { NavigationContainer } from '@react-navigation/native';
// import Accueil from "../Accueil/Accueil";
// import Fontaines from "../Fontaines/Fontaines";

// export default function Navigation(props) {
//     return (
//         <NavigationContainer>
//             {MainStackScreen(props)}
//         </NavigationContainer>
//     );
// };
// const MainStack = createNativeStackNavigator();
// const MainStackScreen = (props) => (
//     <MainStack.Navigator
//         initialRouteName="Accueil"
//         screenOptions={{
//             headerShown: false,

//         }}
//     >
//         <MainStack.Screen
//             name="Accueil"
//             component={Accueil}
//             options={{
//                 header: () => null,
//             }}
//         />

//         <MainStack.Screen
//             name="Fontaines"
//             component={Fontaines}
//             options={{
//                 header: () => null,
//             }}
//         />

//         {/* <MainStack.Screen
//             name="RegisterStep2"
//             component={RegisterStep2}
//             options={{
//                 header: () => null,
//             }}
//         />

//         <MainStack.Screen
//             name="RegisterStep3"
//             component={RegisterStep3}
//             options={{
//                 header: () => null,
//             }}
//         />

//         <MainStack.Screen
//             name="RegisterStep4"
//             component={RegisterStep4}
//             options={{
//                 header: () => null,
//             }}
//         /> */}
//     </MainStack.Navigator>
// );