import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fact: null,
      error: null,
    };
  }

  componentDidMount() {
    // Fetch a cat fact when the component mounts
    this.fetchCatFact();
  }

  // Function to fetch a random cat fact
  fetchCatFact = () => {
    fetch('https://cat-fact.herokuapp.com/facts/random')
      .then(response => {
        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        this.setState({ fact: data.text, error: null });  // Note the change here from data.fact to data.text
      })
      .catch(error => {
        // Handle errors, like network issues
        this.setState({ error: error.toString() });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.fact}>
          {this.state.fact ? this.state.fact : 'Fetching...'}
        </Text>
        {this.state.error && <Text style={styles.error}>Error: {this.state.error}</Text>}
        <Button title="Fetch another fact!" onPress={this.fetchCatFact} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  fact: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});
