import os 

f_after = open("data", "w",encoding="utf-8")  # 打开文件
f_before = open("../pics.json", "r", encoding="utf-8")
link_buffer = []
f_after.write(  "var locarray = [" )
for line in f_before:
	if line.startswith('http'):
		# do nothing 
		link_buffer.append(line)
	else:
		f_after.write('"')
		f_after.write(line)  # do nothing 
		#f_after.write('"')
		f_after.write(',')
f_after.write(" ] ")
f_after.write(" \n ")
f_after.write(" var picsarray = [ ")
for line in link_buffer:
	f_after.write('"')
	f_after.write(line)
	f_after.write(',')
		
f_after.write(" ] ")
f_after.close()
f_before.close()
