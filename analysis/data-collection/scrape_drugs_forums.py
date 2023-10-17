import requests, time, json, random
from bs4 import BeautifulSoup

#
# Calling function parseOpioids creates a file for every given section, which contains all comments of all posts in that
# section, outputted as json data
#

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:12.0) Gecko/20100101 Firefox/12.0.'
}

data = [] # master list for data collection

# parse section for each opoiod (Main function to call)
def parseOpioids():
    opoiods = ['buprenorphine.406/','codeine.161/','heroin.123/','hydrocodone.396/','hydromorphone.403/',
               'methadone.397/','morphine.124/','opium-poppy.162/','oxycodone.398/','oxymorphone.404/','tramadol.399/']
    for opoiod in opoiods:
        url = 'https://drugs-forum.com/forums/' + opoiod
        parseSection(url, url.split('.')[0] + '.txt')
        data.clear()

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
# filename is the file you want to add data to
def parseSection(url: str, filename: str) -> None:
    content = requests.get(url, headers=headers).content
    soup = BeautifulSoup(content,'html.parser')
    max_pages = getMaxPages(soup)
    print(f"Pages in this section: {max_pages}")
    for i in range(1, max_pages):
        print(f"Page {i}")
        page_url = url + "page-" + str(i)
        parsePage(page_url)  # parse each page
        # write data to file after every page
        with open(filename, 'w') as file:
            print(f'Writing data to {filename}')
            file.write(json.dumps(data, indent=4))


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
        print(post_url)
        parsePost(post_url)

        time.sleep(random.uniform(1, 3)) # wait 1-3s before looking at each post


# extract all comments from the post in all of its pages
def parsePost(url: str) -> None:
    content_ = requests.get(url, headers=headers)
    content_.encoding = 'utf-8'
    content_ = content_.content
    soup = BeautifulSoup(content_, 'html.parser')
    num_pages = getMaxPages(soup)

    for i in range(1, num_pages + 1):
        page_content = requests.get(url + f'page-{i}').content
        soup = BeautifulSoup(page_content, 'html.parser')
        comments = soup.find('ol').find_all('li', {'class': 'message'})
        post_title_info = soup.find('div', {'titleBar'}).find('h1').text
        post_type = post_title_info.split(' ', 1)[0].strip()
        post_title = post_title_info.split(' ', 1)[1].strip()
        for comment in comments:
            data.append(parseComments(comment, post_type, post_title))
        time.sleep(random.random()) # wait a random amount 0-1s


# parse a singular comment in a forum post
def parseComments(soup: BeautifulSoup, post_type, post_title) -> dict:
    try:
        date = soup.find('span', {'class': 'DateTime'}).text
        username = soup.find('a', {'class': 'username'}).text
        post_content = soup.find('blockquote', {'class': 'messageText SelectQuoteContainer ugc baseHtml'})
        try:
            soup.find('div', {'class': 'bbCodeBlock bbCodeQuote'}).decompose()
            soup.find('div', {'class': 'messageTextEndMarker'}).decompose()
        except Exception as e:
            pass
        post_content = post_content.text.strip()
        rank = None
        try:
            rank = soup.find('em', {'class': 'userBanner bannerHidden wrapped'}).text
        except Exception as e:
            print("No rank for this comment")
        rep_points = soup.find('dl', {'class': 'pairsInline'}).find('strong').text
        messages = soup.find('dl', {'class': 'pairsJustified xbMessages'}).find('a', {'class': 'concealed'}).text
        join_date = soup.find('dl', {'class': 'pairsJustified xbJoinDate'}).find('dd').text
        country_of_origin = None
        try:
            country_of_origin = soup.find_all('dl', {'class', 'pairsJustified'})[2].text.strip()
        except Exception as e:
            print("No country of origin")
        # list of strings return format: [username, post content, rank, rep points, messages, join date, country of origin,
        #                                 date of comment, post name, post type]

        return {"username": username, "post_content": post_content, "rank": rank, "rep_points": rep_points,
                "messages": messages,
                "join_date": join_date, "country_of_origin": country_of_origin, "date": date, "post_title": post_title,
                "post_type": post_type}

    except Exception as e:
        print(e)
    return []


ex_page = 'https://drugs-forum.com/forums/buprenorphine.406/'
parseOpioids()
