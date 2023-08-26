import React, { useState } from 'react';
import { TouchableOpacity, ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import SearchBar from './SearchBar';
import axios from 'axios'; // Import the axios library
import {Linking} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AudioBook from './Audiobook';

const HomeScreen = () => {
  const [bookList, setBookList] = useState([]);

  const navigation = useNavigation();

  const handleSearch = async searchText => {
    try {
      const response = await axios.get(`http://192.168.1.74:5000/api/search?name=${searchText}`);
      setBookList(response.data); // Update the bookList state with the response data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const navigationHandler = () => {
    navigation.navigate("AudioBook")
  }


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SearchBar onSearch={handleSearch} /><Text>{"\n"}</Text>
      <ScrollView style={styles.bookList}>
        <Text style = {{fontStyle : 'italic', fontSize : 15}}>Results:</Text><Text>{"\n"}</Text>
        {bookList.map((book, index) => (
          <View key={index} style={styles.bookItem}>
            <TouchableOpacity onPress={navigationHandler}> 
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
    borderRadius : 10,
    alignSelf : 'center',
    width: 150, // Adjust the width as needed
    height: 200, // Adjust the height as needed
    resizeMode: 'cover', // Image resizing mode
    marginBottom: 10, // Adjust margin as needed
  },
});

export default HomeScreen;
