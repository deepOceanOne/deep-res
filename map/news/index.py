#encoding = utf-8
import  requests
import  json
def getnews(pages):
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
            print ent
            newsbag.append(ent['title'])
        continue
    return newsbag
    
pages = int(input("want to query : "))
getnews(pages)
for i in newsbag:
    print(i)
