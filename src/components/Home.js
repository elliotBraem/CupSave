import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

const Home = ({todos, addTodo, onNewTodoChange, newTodoText}) => (
  <View style={styles.container}>
    <Text style={styles.header}>Hello</Text>
  </View>
);

export default Home;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    paddingLeft: 15,
    paddingRight: 15,
  },
  header: {
    alignSelf: 'center',
    marginBottom: 50,
  },
});
