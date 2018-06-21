#encoding = utf-8
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

def getsinanews(pages):
    global newsbag
    newsbag = []
    for page in range(1, pages + 1):
        raw_url = 'http://api.roll.news.sina.com.cn/zt_list?channel=news&cat_1=gnxw&cat_' \
                  '2==gdxw1||=gatxw||=zs-pl||=mtjj&level==1||=2&show_ext=1&show_all=10&show_num=100' \
                  '&tag=1&format=json&page={}&callback=newsloadercallback&_=1487824946231'
        url = raw_url.format(page)
        res = requests.get(url)
        jd = json.loads(res.text.lstrip(' newsloadercallback(').rstrip(');'))
        diclist = jd['result']['data']
        for ent in diclist:
            # print ent
            # newsbag.append(ent['title'])
            newsbag.append(ent['url'])
            # print (ent['url'])
            handlesinanews(ent['url'])
        continue
    return newsbag

def handlesinanews(url):
    #response = scrapy.Request(url, callback=self.parse) Scrapy seems not to be a good choice here.#
    body = requests.get(url).text
    title = Selector(text=body).xpath('//head/title/text()').extract()[0]
    #content need to be dealed with carefully
    # content = Selector(text=body).xpath('//div[@class="article"]//p/text()').extract()[0].encode('ISO 8859-1')
    #for selector in Selector(text=body).xpath('//div[@class="article"]//p'):
    #    content = content + selector.xpath("/text()").extract[0].encode('ISO 8859-1')
    # carefully deal with encoding problems 
    html = Selector(text=body).xpath('//div[@class="article"]')
    content = html[0].xpath('string(.)').extract()[0]
    links = Selector(text=body).xpath('//a/@href').extract()[0]
    NER_URL = 'http://api.bosonnlp.com/ner/analysis'
    # f = open('json/data.txt', 'a',encoding='utf-8')
    # f.write(content)
    # make a classify 
    CLASSIFY_URL = 'http://api.bosonnlp.com/classify/analysis'
    data = json.dumps(title)
    headers = {'X-Token': os.environ['BOSON_API']}
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
                        print('新闻标题:): '.join(title),'"')
                        print(''.join(item['word'][entity[0]:entity[1]]),'"')
                        print(''.join(url),'"')


def get163news():
    global newsbag
    newsbag = []
    raw_url = 'http://news.163.com/shehui/'
    res = requests.get(raw_url)
    jd = json.loads(res.text.lstrip(' newsloadercallback(').rstrip(');'))


def handle163news(url):
    with open('json/news.json') as file_object:
        content = file_object.read()
    NER_URL = 'http://api.bosonnlp.com/ner/analysis'
    # f = open('json/data.txt', 'a',encoding='utf-8')
    # f.write(content)
    data = json.dumps(content,ensure_ascii=False)
    headers = {'X-Token': 'bosonnlp API'}
    resp = requests.post(NER_URL, headers=headers, data=data)
    for item in resp.json():
        if type(item) == type({}):   # check if successfully return value
            for entity in item['entity']:
                if entity[2] == "location" :
                    print(''.join(item['word'][entity[0]:entity[1]]), entity[2])    

# pages = int(input("want to query : "))
pages = 9
getsinanews(pages)



