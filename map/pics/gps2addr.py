import exifread
import re
import json
import requests
import os 





def find_address_from_GPS(lat,lng):
    """
    使用Geocoding API把经纬度坐标转换为结构化地址。
    :param GPS:
    :return:
    """
    secret_key = "327GGLm6A62GfdvGy3L48b6P1clK2QRe"
    baidu_map_api = "http://api.map.baidu.com/geocoder/v2/?ak={0}&callback=renderReverse&location={1},{2}s&output=json&pois=0".format(
        secret_key, lat, lng)
    response = requests.get(baidu_map_api)
    content = response.text.replace("renderReverse&&renderReverse(", "")[:-1]
    baidu_map_address = json.loads(content)
    formatted_address = baidu_map_address["result"]["formatted_address"]
    # province = baidu_map_address["result"]["addressComponent"]["province"]
    # city = baidu_map_address["result"]["addressComponent"]["city"]
    # district = baidu_map_address["result"]["addressComponent"]["district"]
    # upload the image then 
    return formatted_address




lat = 31.001660705424285
lng = 104.23045911163943
address = find_address_from_GPS(lat,lng) 
print(address)


