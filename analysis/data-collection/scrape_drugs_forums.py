import requests, time
from bs4 import BeautifulSoup

base_link = r'https://drugs-forum.com/forums/opiates-opioids.33/'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:12.0) Gecko/20100101 Firefox/12.0.'
}

# content = requests.get(base_link, headers=headers).content
#
# soup = BeautifulSoup(content, 'html.parser')
# # get table containing different drug sections
# table = soup.select_one('ol.nodeList.sectionMain')
# forum_links = []  # store links to start of discussion forums
# for section in table.find_all('li'):
#     forum_links.append(r'https://drugs-forum.com/' + section.find('a')['href'].strip())

url = "https://drugs-forum.com/forums/buprenorphine.406/"
print("Looking at secion: " + url)


# return max amount of pages from Beautiful Soup
def getMaxPages(soup: BeautifulSoup) -> int:
    elements = soup.find_all("span", {"class": 'pageNavHeader'})
    # 1 page if there is no page nav bar
    if len(elements) == 0:
        return 1
    text = elements[1].text  # "Page 1 of X"
    max_pages = int(text.split(" ")[-1])
    return max_pages


# parse a section, gathering data from every post once we know page count
# url is the base url for the site, e.g.
# https://drugs-forum.com/forums/buprenorphine.406/
def parseSection(max_pages: int, url: str):
    data = []
    for i in range(1, 1):
        page_url = url + "page-" + i
        parsePage(page_url, data)  # parse each page


# parse through entire page of posts in a section
# example page - https://drugs-forum.com/forums/buprenorphine.406/page-2
def parsePage(url: str, data: list):
    content = requests.get(url, headers=headers).content
    soup = BeautifulSoup(content, 'html.parser')

    # last table are the rows containing the right posts
    table = soup.find_all('ol', {'class': 'discussionListItems'})[-1]
    for row in table.find_all('li'):
        a_tags = row.find_all('h3')[0].find_all('a')
        # last 'a' tag contains href
        post_url = 'https://drugs-forum.com/' + a_tags[-1]['href']


# extract all comments from the post in all of its pages
# example page - https://drugs-forum.com/threads/how-to-start-a-liquid-taper-for-buprenorphine.355158/
def parsePost(url: str) -> list:
    content = requests.get(url, headers=headers).content
    soup = BeautifulSoup(content, 'html.parser')
    num_pages = getMaxPages(soup)

    # find OP of the post
    OP_usr = soup.find('ol').find('li').find('a', {'class':'username'}).text

    for i in range(1, num_pages + 1):
        page_content = requests.get(url + f'page-{i}').content
        soup = BeautifulSoup(page_content, 'html.parser')
        comments = soup.find('ol').find_all('li', {'class': 'message'})

        for comment in comments:
            data = parseComments(comment)
            # TODO - append feature at end -> if the comment is by the owner 1 else 0

# parse a singular comment in a forum post
def parseComments(soup: BeautifulSoup) -> list:
    print(soup.find('span'))
    return []

# test push
parsePost(r'https://drugs-forum.com/threads/how-to-start-a-liquid-taper-for-buprenorphine.355158/')