import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'nachos-ui';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 20,
    marginLeft: 20,
  },
  button: {
    marginRight: 20,
  },
});

class ConsumeButton extends Component {
  state = {consumeCount: 0};

  consumeDrink = () => {
    this.setState(prevState => ({
      consumeCount: prevState.consumeCount + 1,
    }));
  };

  render() {
    const {consumeCount} = this.state;
    return (
      <View style={styles.container}>
        <Button onPress={() => this.consumeDrink()} style={styles.button}>
          Save a Cup
        </Button>
        <Text>{consumeCount}</Text>
      </View>
    );
  }
}

export default ConsumeButton;
