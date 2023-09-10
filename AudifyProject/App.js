import React, { useState } from 'react';
import { TouchableOpacity, ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import SearchBar from './SearchBar';
import axios from 'axios'; // Import the axios library
import {Linking} from 'react-native';

const App = ({ navigation }) => {
  const [bookList, setBookList] = useState([]);

  const handleSearch = async searchText => {
    try {
      const response = await axios.get(`http://[IP ADDR]:[PORT]/api/search?name=${searchText}`);
      setBookList(response.data); // Update the bookList state with the response data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Audify</Text>
      <SearchBar onSearch={handleSearch} /><Text>{"\n"}</Text>
      <ScrollView style={styles.bookList}>
        <Text style = {{fontStyle : 'italic', fontSize : 15}}>Results:</Text><Text>{"\n"}</Text>
        {bookList.map((book, index) => (
          <View key={index} style={styles.bookItem}>
            <TouchableOpacity onPress={() => Linking.openURL(book[1])}> 
              <Image
                source = {{ uri: book[2] }}
                style = {styles.bookImage}
              />
            </TouchableOpacity>
            <Text>
              <TouchableOpacity onPress={ () => Linking.openURL(book[1])}>
                <Text style={styles.bookTitle}>{book[0]}</Text>
              </TouchableOpacity>
            </Text>
            <Text>{"\n"}</Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container:  {
    flex: 1, // Take up all available space
    padding: 20, // Add padding around the content
    backgroundColor: '#040404', // Set a background color
  },
  title: {
    color : '#f0f0f0',
    textAlign : 'center',
    marginTop : 30,
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  bookList: {
    marginLeft : 5,
    marginTop: 20,
  },
  bookItem: {
    marginBottom: 10,
  },
  bookTitle: {
    color : '#f0f0f0',
    alignSelf : 'center',
    fontSize : 20,
    fontWeight: 'bold',
  },
  bookLink: {
    color: 'blue',
  },
  bookImage: {
    bordorRadius : 10,
    alignSelf : 'center',
    width: 150, // Adjust the width as needed
    height: 200, // Adjust the height as needed
    resizeMode: 'cover', // Image resizing mode
    marginBottom: 10, // Adjust margin as needed
  },
});

export default App;
