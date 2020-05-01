import requests
 
url = "https://api.covid19api.com/countries"
r = requests.get(url)
myjson = r.json()
countries = []
for i in range(0, len(myjson)):
	countries.append(myjson[i]['Slug'])

file = open('output.txt','w');

file.write(str(countries)+",");

file.close();