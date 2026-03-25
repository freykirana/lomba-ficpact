const fs = require('fs');
const Jimp = require('jimp');

Jimp.read('c:/Kuliah/lomba-ficpact/frontend/public/logo-eduplay.png')
  .then(image => {
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      
      // If the pixel is white or very close to white
      if (red > 230 && green > 230 && blue > 230) {
        this.bitmap.data[idx + 3] = 0; // Set alpha to 0 (transparent)
      }
    });
    return image.writeAsync('c:/Kuliah/lomba-ficpact/frontend/public/logo-eduplay.png');
  })
  .then(() => {
    console.log("Transparency processing complete.");
  })
  .catch(err => {
    console.error("Error:", err);
  });
