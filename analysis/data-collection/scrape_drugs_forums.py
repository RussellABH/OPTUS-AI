import requests, time, json
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
print("Looking at section: " + url)
data = []

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
def parsePage(url: str):
    content = requests.get(url, headers=headers).content
    soup = BeautifulSoup(content, 'html.parser')

    # last table are the rows containing the right posts
    table = soup.find_all('ol', {'class': 'discussionListItems'})[-1]
    for row in table.find_all('li'):
        a_tags = row.find_all('h3')[0].find_all('a')
        # last 'a' tag contains href
        post_url = 'https://drugs-forum.com/' + a_tags[-1]['href']


# extract all comments from the post in all of its pages
def parsePost(url: str) -> list:
    content_ = requests.get(url, headers=headers)
    content_.encoding = 'utf-8'
    content_ = content_.content
    soup = BeautifulSoup(content_, 'html.parser')
    num_pages = getMaxPages(soup)

    # find OP of the post
    OP_usr = soup.find('ol').find('li').find('a', {'class':'username'}).text

    for i in range(1, num_pages + 1):
        page_content = requests.get(url + f'page-{i}').content
        soup = BeautifulSoup(page_content, 'html.parser')
        comments = soup.find('ol').find_all('li', {'class': 'message'})
        post_title_info = soup.find('div', {'titleBar'}).find('h1').text
        post_type = post_title_info.split(' ', 1)[0].strip()
        post_title = post_title_info.split(' ', 1)[1].strip()
        for comment in comments:
            data.append(parseComments(comment, post_type, post_title))

# parse a singular comment in a forum post
def parseComments(soup: BeautifulSoup, post_type, post_title) -> list:
    try:
        date = soup.find('span', {'class' : 'DateTime'}).text
        username = soup.find('a', {'class': 'username'}).text
        post_content = soup.find('blockquote', {'class': 'messageText SelectQuoteContainer ugc baseHtml'}).text.strip()
        rank = soup.find('em', {'class': 'userBanner bannerHidden wrapped'}).text
        rep_points = soup.find('dl', {'class': 'pairsInline'}).find('strong').text
        messages = soup.find('dl', {'class': 'pairsJustified xbMessages'}).find('a', {'class': 'concealed'}).text
        join_date = soup.find('dl', {'class': 'pairsJustified xbJoinDate'}).find('dd').text
        country_of_origin = soup.find_all('dl', {'class', 'pairsJustified'})[2].text.strip()

        # list of strings return format: [username, post content, rank, rep points, messages, join date, country of origin,
        #                                 date of comment, post name, post type]

        return {"username":username, "post_content":post_content, "rank":rank, "rep_points":rep_points, "messages":messages,
                "join_date":join_date, "country_of_origin":country_of_origin, "date":date, "post_title":post_title,
                "post_type":post_type}

    except Exception as e:
        print(e)
    return []

ex_page = 'https://drugs-forum.com/threads/how-to-start-a-liquid-taper-for-buprenorphine.355158/'
parsePost(ex_page)
with open('test.txt', 'w') as file:
    file.write(json.dumps(data, indent=4))