import time
import datetime
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver import ActionChains

chromedriver = "/Applications/Google Chrome 2.app/Contents/MacOS/chromedriver" 
# browser = webdriver.Chrome(chromedriver)

chrome_options = Options()
chrome_options.add_argument('--headless')
# chrome_options.add_argument('--disable-gpu')
browser = webdriver.Chrome(chromedriver)
browser.get("https://map.baidu.com")
# browser.find_element_by_id("platform").text
# print(browser.title)
element = browser.find_element_by_id("platform")
actions = ActionChains(browser)

screenshot_times = 10
# 连续截图
for i in range(screenshot_times):
	actions.drag_and_drop_by_offset(element, 200,10).perform()
	now_time = datetime.datetime.now()
	time_str = now_time.strftime('%Y-%m-%d-%H-%M-%S')
	browser.save_screenshot(time_str+'.png')
	time.sleep(4)
	# actions.drag_and_drop_by_offset(element, 200,10).perform()

browser.close()

