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
import random

# get picture from meizu forum

proxy = {
  'http':'27.40.146.97:61234'
}

def handlemeizupics():
    #response = scrapy.Request(url, callback=self.parse) Scrapy seems not to be a good choice here.#
    headers = {'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
               'Accept - Encoding':'gzip, deflate, br',
               'Accept-Language':'zh-CN,zh;q=0.9,en;q=0.8',
               'Connection':'Keep-Alive',
               'Host':'bbs.meizu.cn',
               'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36'}
    for number in range(72,90):
        url='http://bbs.meizu.cn/forum-84-{}.html'.format(number)
        body = requests.get(url,headers=headers).text
        html = Selector(text=body).xpath('//img/@src').extract()
        for link in html :
            if '.webp' in link:
                file = 'links.txt'
                with open(file, 'a+') as f:
                    f.write(link)
                    f.write('\n')

raw_url = 'http://bbs.meizu.cn/forum-84-2.html'
handlemeizupics()