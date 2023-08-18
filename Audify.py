import requests 
from bs4 import BeautifulSoup
import tkinter as tk
import pygame
import urllib.parse
import re
#fetching the website
base_url = 'https://findaudiobook.net/'
searchbookname = input("Enter name of Audiobook: ")

#encoding the user entered name into URL representation 
encoded_searchbookname = urllib.parse.quote(searchbookname)
#print(encoded_audbookname)

search_url = f'{base_url}?s={encoded_searchbookname}' 
#print (search_url)

searchresponse = requests.get(search_url)
soup = BeautifulSoup(searchresponse.content, 'html.parser') #creating bs4 object that contains parsed content of the response.content (raw html content of the url)

#regex pattern to retrieve relevant url and book names
pattern =r'<h2 class="entry-title post-title"><a href="([^"]+)" rel="bookmark">([^<]+)</a></h2>'

h2tag = soup.find_all ('h2', class_='entry-title post-title')

for bookinfo in h2tag:
	html_content=str(bookinfo) #convert each bookinfo line in the h2tag to string to match the pattern 
	matches = re.search(pattern, html_content)
	if matches:
		href = matches.group(1)
		title = matches.group(2)
		print("Title of the Book: ", title)
		print("link: ", href)

