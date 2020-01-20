
import time
# import selenium webdriver module
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.proxy import Proxy
# from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
# from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
# import os
from conf import CHROME_LOCATION

class Browser:
	def __init__(self):
		pass

	@staticmethod
	def openWebBrowser():
		options = webdriver.ChromeOptions()
		options.binary_location = CHROME_LOCATION[0]
		options.add_argument('headless')
		options.add_argument('--no-sandbox')
		options.add_argument('window-size=1200x600') # set the window size
		return webdriver.Chrome(chrome_options=options) # initialize the driver
		#return webdriver.Firefox()

class Operations:
	def __init__(self, src):
		self.driver = None
		self.driver2 = None
		self.source = src
		self.driver = Browser.openWebBrowser()
		self.driver.get(self.source)
		self.injectScript()

	def injectScript(self):
		self.driver.execute_script("""window.scrollTo(0, document.body.scrollHeight);""")
		self.driver.execute_script("""var head = document.getElementsByTagName('head')[0]; var custom_script=document.createElement('script');custom_script.src='https://gl.githack.com/renarration/sss-renderer/raw/sss-renderer-v3b/src/js_lib/custom_script.js';head.appendChild(custom_script);var rel_abs_script = document.createElement('script'); rel_abs_script.src = 'https://gl.githack.com/renarration/sss-renderer/raw/sss-renderer-v3b/src/js_lib/relative_to_absolute.js'; head.appendChild(rel_abs_script);""")
		time.sleep(3)
		#BIN[0]
		return

	def addNode(self, seq = "1", text = None, xpath = None, pattern = None):
		"""
		Add a new span elment node  
		"""
		self.driver.execute_script('''addNode("{}", "{}", "{}", "{}")'''.format(seq, text.encode('utf-8'), xpath, pattern))		
		return

	def addNode_img(self, seq = "1", image_src = None, xpath = None, pattern = None):
		"""
		Add a new span elment node 
		"""
		self.driver.execute_script('''addNode_img("{}", "{}", "{}", "{}")'''.format(seq, image_src, xpath, pattern))		
		return
	def addNode_yt(self, seq = "1", video_id = None, xpath = None, pattern = None):
		"""
		Add a new span elment node 
		"""	
		self.driver.execute_script('''addNode_yt("{}", "{}", "{}", "{}")'''.format(seq, video_id, xpath, pattern))
		return

	def addNode_note(self, seq = "1", note = None, xpath = None, pattern = None):
		"""
		Add a new span elment node  
		"""	
		self.driver.execute_script('''addNode_note("{}", "{}", "{}", "{}")'''.format(seq, note, xpath, pattern))
		return

	def addNode_link(self, seq = "1", url=None, text = None, xpath=None,  pattern = None):
		"""
		Add a new span elment node 
		"""	
		self.driver.execute_script('''addNode_link("{}", "{}", "{}", "{}")'''.format(seq, url, text.encode('utf-8'), xpath, pattern))
		return

	def getNewPageSource(self):
		"""
		Returns html source of present open webpage in browser.
		"""
		return self.driver.page_source

	def close(self):
		self.driver.close()
		return

	def runAll(self, pgxform):
		for pgxform_obj in pgxform:
			for loc_obj in pgxform_obj['loc']['node']:
				xpath = loc_obj['xpath']
				pattern = loc_obj['data']
				#pattern_count = loc_obj['pattern_count']
				for acpair_obj in pgxform_obj['ac_pair']:
					if 'addtxt' in acpair_obj:
						#seq = acpair_obj['addtxt']['id']
						text = acpair_obj['addtxt']['srcloc']
						self.addNode(text = text, xpath = xpath, pattern = pattern)
					if 'addimg' in acpair_obj:
						#seq = acpair_obj['addimg']['id']
						image_src = acpair_obj['addimg']['srcloc']
						self.addNode_img(image_src = image_src, xpath = xpath, pattern = pattern)						
					if 'addyt' in acpair_obj:
						#seq = acpair_obj['addnote']['id']
						video_id = acpair_obj['addnote']['srcloc']
						self.addNode_yt(video_id = video_id, xpath = xpath, pattern = pattern)
					if 'addnote' in acpair_obj:
						#seq = acpair_obj['addnote']['id']
						new_note = acpair_obj['addnote']['srcloc']
						self.addNode_note(note = new_note, xpath = xpath, pattern = pattern)
					if 'addlink' in acpair_obj:
						#seq = acpair_obj['addlink']['id']
						url = acpair_obj['addlink']['srcloc']
						text = acpair_obj['addlink']['text']
						self.addNode_link(url = url, text = text, xpath = xpath, pattern = pattern)
		return
