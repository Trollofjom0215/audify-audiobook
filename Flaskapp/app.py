import requests 
from bs4 import BeautifulSoup
import urllib.parse
import re
from flask import Flask, request, jsonify

app= Flask(__name__)


def siteParser(searchbookname):
    base_url = 'https://findaudiobook.net/'
    print(searchbookname)
    encoded_searchbookname = urllib.parse.quote(searchbookname)
    print(encoded_searchbookname)
    search_url = f'{base_url}?s={encoded_searchbookname}' 
    searchresponse = requests.get(search_url)
    soup = BeautifulSoup(searchresponse.content, 'html.parser')
    return soup #returns soup object in context of the search query 

def scrape_audiobook(soup):
    
    pattern = r'<h2 class="entry-title post-title"><a href="([^"]+)" rel="bookmark">([^<]+)</a></h2>'
    h2tag = soup.find_all('h2', class_='entry-title post-title')

    href_list = []
    title_list = []
    src_list = []

    imgtags = soup.find_all('div', {'class' : 'wp-caption aligncenter'})


    for imgtag in imgtags:
        img = imgtag.find('img')
        src = img.get('src')
        src_list.append(src)

    for bookinfo in h2tag:
        html_content = str(bookinfo)
        matches = re.search(pattern, html_content)
        if matches:
            title = matches.group(1)
            href = matches.group(2)
            title_list.append(title)
            href_list.append(href)

    searchresult = []
    for index,(href,title,src) in enumerate(zip(title_list,href_list,src_list), start=1):
    	searchresult.append((title,href,src))
    print(searchresult)
    return searchresult


@app.route('/api/search', methods=['GET'])
def search_audiobook():
    audiobook_name = request.args.get('name')
    soup = siteParser(audiobook_name)
    audiobook_list = scrape_audiobook(soup)
    return jsonify(audiobook_list)

if __name__ =='__main__':
	app.run(debug=True,host="0.0.0.0")

