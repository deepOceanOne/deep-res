# -*- encoding: utf-8 -*-
from __future__ import print_function, unicode_literals
import json
import requests


url = 'http://apis.map.qq.com/ws/geocoder/v1/?address='
address = '屏东县新埤乡'
key = 'OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77'
resp = requests.get(url+address+'&key='+key)
print(resp)
for item in resp.json():
	for result in item['result']:
		print(''.join(result['location']['lng']))
