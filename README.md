# audify-audiobook
This is a Python script that searches for audiobooks on a website and retrieves relevant information such as the book title and link.

Dependencies
Make sure you have the following Python libraries installed:

requests
beautifulsoup4 (BS4)
tkinter
pygame
You can install these dependencies using pip:

'''bash
pip install requests beautifulsoup4 tkinter pygame
Usage
Run the script using a Python interpreter.

Enter the name of the audiobook you're looking for when prompted.

The script will fetch data from the website `https://findaudiobook.net/`, search for the provided audiobook name, and display the relevant book titles and links.

Code Explanation
The script does the following:

Imports required libraries:

requests for sending HTTP requests
beautifulsoup4 (BS4) for parsing HTML content
tkinter for creating a GUI input prompt
pygame for game development-related functionality
urllib.parse for URL encoding
re for regular expressions
Retrieves the user-entered audiobook name and encodes it for URL representation.

Constructs a search URL by appending the encoded audiobook name to the base URL.

Sends an HTTP GET request to the search URL and creates a BeautifulSoup object to parse the HTML content.

Defines a regular expression pattern to extract relevant URLs and book names.

Finds all `<h2>` tags with the class entry-title post-title in the parsed HTML content.

Loops through each found `<h2>` tag, converts it to a string, and searches for matches using the regex pattern.

If matches are found, the script extracts the URL and title, and prints them.

Note
Make sure you have an active internet connection to fetch data from the website.
This script assumes the structure of the website's HTML remains consistent. If the website's structure changes, the regex pattern may need adjustment.