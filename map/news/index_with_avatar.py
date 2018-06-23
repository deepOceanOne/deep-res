#coding=utf-8
import  requests
import  json
# for handle with news regex and labels 
#import scrapy
import re
#from HTMLParser import HTMLParser
# bs 
#from bs4 import BeautifulSoup
from scrapy.selector import Selector
from scrapy.http import HtmlResponse
import os 



# reference from https://github.com/Google1234/Information_retrieva_Projectl-/blob/master/crawl/spiders/netease_spider.py
#using python3 

#filter data make 
CLASSIFY_URL = 'http://api.bosonnlp.com/classify/analysis'
headers = {'X-Token': os.environ['BOSON_API']}
datafilter = json.dumps("去年中央三公经费支出43.6亿元 公车支出减少")
# datafilter = json.dumps("特朗普下月访英或见女王 美国大使:这是他的工作")
newsfilter = requests.post(CLASSIFY_URL, headers=headers, data=datafilter.encode('utf-8'))
# end of filter data make 

def getavatarnews(pages):
    global newsbag
    newsbag = []
    key = os.environ['AVATAR_API']
    for page in range(1, pages + 1):
        raw_url = 'http://api.avatardata.cn/TravelNews/Query?'\
                  'key={}&page={}&rows=10'
        url = raw_url.format(key,page)
        res = requests.get(url)
        jd = json.loads(res.text)
        print(jd)
        diclist = jd['result']
        for ent in diclist:
            # print ent
            # newsbag.append(ent['title'])
            newsbag.append(ent['url'])
            # print (ent['url'])
            handleavatarnews(ent['url'],ent['title'])
        continue
    return newsbag

def handleavatarnews(url,title):
    #response = scrapy.Request(url, callback=self.parse) Scrapy seems not to be a good choice here.#
    body = requests.get(url).text
    title = title
    html = Selector(text=body).xpath('//div[@class="article"]')
    content = html[0].xpath('string(.)').extract()[0]
    NER_URL = 'http://api.bosonnlp.com/ner/analysis'
    # f = open('json/data.txt', 'a',encoding='utf-8')
    # f.write(content)
    # make a classify 
    CLASSIFY_URL = 'http://api.bosonnlp.com/classify/analysis'
    data = json.dumps(title)
    # print(data.encode('utf-8'))
    # headers = {'X-Token': os.environ['BOSON_API']}
    resp = requests.post(CLASSIFY_URL, headers=headers, data=data.encode('utf-8'))
    #print(resp.text)
    #print(url)
    # only get news inside country
    if resp.text == newsfilter.text :
        # print("pass")
        # extract the location out from the news content
        data = json.dumps(content,ensure_ascii=False)
        headers = {'X-Token': os.environ['BOSON_API']}
        resp = requests.post(NER_URL, headers=headers, data=data)
        for item in resp.json():
            if type(item) == type({}):   # check if successfully return value
                for entity in item['entity']:
                    if entity[2] == "location" and (entity[1]-entity[0]) > 5:
                        print(''.join("新闻标题:): "+title),'"')
                        print(''.join(item['word'][entity[0]:entity[1]]),'"')
                        print(''.join(url),'"')


# pages = int(input("want to query : "))
pages = 1
getavatarnews(pages)



