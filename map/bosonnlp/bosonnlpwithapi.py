# -*- encoding: utf-8 -*-
from bosonnlp import BosonNLP
import os 

#reference from http://bosonnlp-py.readthedocs.io/#bosonnlp-py

nlp = BosonNLP('bosonnlp的API')
# or nlp = BosonNLP(os.environ['BOSON_API_TOKEN'])
nlp.ner('你好啊', sensitivity=2)
nlp.ner(['成都商报记者 姚永忠', '微软XP操作系统今日正式退休'])
result = nlp.tag('成都商报记者 姚永忠')
format_tag_result(result[0])
result = nlp.tag(['亚投行意向创始成员国确定为57个', '“流量贵”频被吐槽'], oov_level=0)
result = nlp.tag("成都商报记者 姚永忠", space_mode=2)
