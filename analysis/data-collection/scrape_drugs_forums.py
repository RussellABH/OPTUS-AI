import requests, time
from bs4 import BeautifulSoup

base_link = r'https://drugs-forum.com/forums/opiates-opioids.33/'

headers = {
    'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:12.0) Gecko/20100101 Firefox/12.0.'
}

content = requests.get(base_link,headers=headers).content

soup = BeautifulSoup(content, 'html.parser')
# get table containing different drug sections
table = soup.select_one('ol.nodeList.sectionMain')
forum_links = [] # store links to start of discussion forums
for section in table.find_all('li'):
    forum_links.append(r'https://drugs-forum.com/' + section.find('a')['href'].strip())

url = forum_links[0]
print(url)
page_content = requests.get(url, headers=headers).content
page_soup = BeautifulSoup(page_content, 'html.parser')

# return max amount of pages from Beautiful Soup
def getMaxPages(soup: BeautifulSoup) -> int:
    elements = soup.find_all("span", {"class": 'pageNavHeader'})
    print(len(elements))
    # 1 page if there is no page nav bar
    if len(elements) == 0:
        return 1
    text = elements[1].text # "Page 1 of X"
    print(text)
    max_pages = int(text.split(" ")[-1])
    return max_pages

# parse a section, gathering data from every post once we know page count
# url is the base url for the site, e.g.
# https://drugs-forum.com/forums/buprenorphine.406/
def parseSection(max_pages: int, url: str):
    data = []
    for i in range(1, 1):
        page_url = url + "page-" + i
        parsePage(page_url, data) # parse each page

# parse through entire page of posts in a section
def parsePage(url: str, data: list):
    content = requests.get(url, headers=headers).content
    soup = BeautifulSoup(content, 'html.parser')

    # last table are the rows containing the right posts
    table = soup.find_all('ol', {'class':'discussionListItems'})[-1]
    for row in table.find_all('li'):
        post_url = row.find_all('a')

def parsePost(url: str):
    pass


pages = getMaxPages(page_soup)
print(pages)
