# -*- coding:utf8 -*-
import json
import requests
import urllib

url_get_base = "https://api.ltp-cloud.com/analysis/"
content = '本报讯 2016年，长江扬中孢子洲水域黄沙过驳市场有近200艘浮吊同时作业，影响水生态环境的同时，也给附近魏村水源地水质带来安全隐患，周边百姓时有投诉。中央第三环境保护督察组督察时发现问题，并明确要求彻底整改。常州市委、市政府对此高度重视，成立专项整治领导小组，专题研究、部署整改工作。去年'
args = { 
    'api_key' : '语言云的API',
    'text' : content,
    'pattern' : 'ner',
    'format' : 'plain',
    'only_ner': 'true'

}
result = urllib.urlopen(url_get_base, urllib.urlencode(args)) # POST method
content = result.read().strip()
print content
