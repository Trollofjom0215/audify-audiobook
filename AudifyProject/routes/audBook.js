import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TextPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Text Page</Text>
      <Text style={styles.description}>
        This is an example of a React Native page that displays some text.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default TextPage;
