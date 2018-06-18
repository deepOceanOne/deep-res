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
import sys  
reload(sys)  
sys.setdefaultencoding('utf-8') 

# reference from https://github.com/Google1234/Information_retrieva_Projectl-/blob/master/crawl/spiders/netease_spider.py

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
            handlenews(ent['url'])
        continue
    return newsbag

def handlenews(url):
    #response = scrapy.Request(url, callback=self.parse) Scrapy seems not to be a good choice here.#
    body = requests.get(url).text
    title = Selector(text=body).xpath('//head/title/text()').extract()[0].encode('ISO 8859-1')
    #content need to be dealed with carefully
    # content = Selector(text=body).xpath('//div[@class="article"]//p/text()').extract()[0].encode('ISO 8859-1')
    #for selector in Selector(text=body).xpath('//div[@class="article"]//p'):
    #    content = content + selector.xpath("/text()").extract[0].encode('ISO 8859-1')
    content = Selector(text=body).xpath('//div[@class="article"]')
    html = content[0].xpath('string(.)').extract()[0].encode('ISO 8859-1')
    links = Selector(text=body).xpath('//a/@href').extract()[0].encode('ISO 8859-1')
    print html




# pages = int(input("want to query : "))
pages = 1
getsinanews(pages)
for i in newsbag:
    # print(i) 
    j = i+1

