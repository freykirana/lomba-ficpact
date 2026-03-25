from PIL import Image
import sys

try:
    img = Image.open('c:/Kuliah/lomba-ficpact/frontend/public/logo-eduplay.png').convert("RGBA")
    datas = img.getdata()
    
    newData = []
    for item in datas:
        # If the pixel is white or very close to white
        if item[0] > 230 and item[1] > 230 and item[2] > 230:
            newData.append((255, 255, 255, 0)) # Set alpha to 0 (transparent)
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save('c:/Kuliah/lomba-ficpact/frontend/public/logo-eduplay.png', "PNG")
    print("Success")
except Exception as e:
    print("Error:", e)
    sys.exit(1)
