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

  _insertANY() {
    firebase
      .database()
      .ref("users/" + "Miguel")
      .set({
        name: "Miguel",
        address: "Paraiso"
      });
    ToastAndroid.show("Insertado", ToastAndroid.SHORT);
  }

  _insert() {
    firebase
      .database()
      .ref("users/" + this.state.displayName)
      .set({
        name: this.state.displayName
      });
    ToastAndroid.show("Insertado", ToastAndroid.SHORT);
  }

  _get() {
    setTimeout(() => {
      firebase
        .database()
        .ref("users/")
        .limitToLast(2)
        .on("value", data => {
          console.log(data.toJSON());
          ToastAndroid.show(JSON.stringify(data.toJSON()), ToastAndroid.SHORT);
        });
    }, 5000);
  }

  _update() {
    firebase
      .database()
      .ref("users/" + this.state.displayName)
      .update({
        name: "pablo"
      });
    ToastAndroid.show("Actualizado", ToastAndroid.SHORT);
  }

  _delete() {
    firebase
      .database()
      .ref("users/" + this.state.displayName)
      .remove();
    ToastAndroid.show("Insertado", ToastAndroid.SHORT);
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

        <TouchableOpacity
          style={{ marginTop: 32 }}
          onPress={() => this._update()}
        >
          <Text>UPDATE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: 32 }}
          onPress={() => this._delete()}
        >
          <Text>DELETE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: 32 }}
          onPress={() => this._insertANY()}
        >
          <Text>ANY</Text>
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
