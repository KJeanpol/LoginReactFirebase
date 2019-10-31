import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import * as firebase from "firebase";

export default class HomeScreen extends React.Component {
  state = {
    email: "",
    displayName: "",
    name: ""
  };

  componentDidMount() {
    const { email, displayName } = firebase.auth().currentUser;

    this.setState({ email, displayName });
  }

  signOutUser = () => {
    firebase.auth().signOut();
  };

  _insert() {
    firebase
      .database()
      .ref("users/" + this.state.displayName)
      .set({
        name: this.state.displayName
      });
    ToastAndroid.show("HOLLAAA", ToastAndroid.SHORT);
  }

  _get() {
    setTimeout(() => {
      firebase
        .database()
        .ref("users/")
        .on("value", data => {
          console.log(data.toJSON());
          ToastAndroid.show(JSON.stringify(data.toJSON()), ToastAndroid.SHORT);
        });
    }, 5000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hi {this.state.email}!</Text>

        <TouchableOpacity
          style={{ marginTop: 32 }}
          onPress={() => this._insert()}
        >
          <Text>INSERT</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginTop: 32 }} onPress={() => this._get()}>
          <Text>GET</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginTop: 32 }} onPress={this.signOutUser}>
          <Text>Logout</Text>
        </TouchableOpacity>
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
