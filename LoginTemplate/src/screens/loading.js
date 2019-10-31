import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import * as firebase from "firebase";

export default class LoadingScreen extends React.Component {

    /*Este método solo se ejecuta justo después de que el componente haya sido montado en el DOM. 
    Es el método perfecto para integrar librerias de terceros (plugins jquery), 
    realizar alguna petición ajax ó establecer algún timer de tipo setTimeout ó setInterval*/
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? "App" : "Auth");
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});