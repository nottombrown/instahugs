import json

with open('huglist.json', 'r') as f:    
    jsonobjs = json.loads(f.read())

pagination = jsonobjs["pagination"]
print pagination["next_max_tag_id"]   

    
for obj in jsonobjs["data"]:
    link = obj["link"]    
    print link.split("/")[-2]
        