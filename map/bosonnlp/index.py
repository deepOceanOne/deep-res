# -*- encoding: utf-8 -*-
from __future__ import print_function, unicode_literals
import json
import requests


NER_URL = 'http://api.bosonnlp.com/ner/analysis'
s=['据台“中时电子报”6日报道，屏东县新埤乡5日的产地收购价格为A级蕉1公斤4元新台币、B级蕉1公斤1元新台币。屏东赖姓盘商表示，现在很多集货场根本不收1公斤1元新台币的香蕉，但这群农民跟他长期往来彼此都有感情，所以才愿以这价格收购 摧毁跨省制贩毒通道:认真核查 网友：去国民党吧']
data = json.dumps(s)
headers = {'X-Token': 'bosonnlp的API'}
resp = requests.post(NER_URL, headers=headers, data=data.encode('utf-8'))


for item in resp.json():
    for entity in item['entity']:
    	if entity[2] == "location":
        	print(''.join(item['word'][entity[0]:entity[1]]), entity[2])