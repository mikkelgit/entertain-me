import React from "react";
import { StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client/react"
import client from "./src/graphql/index"

import MainTab from './src/navigation/MainTab'

export default function App() {
    return (
        <ApolloProvider client={client} >
            <StatusBar/>
            <NavigationContainer>
                <MainTab />
            </NavigationContainer>
        </ApolloProvider>
    );
}