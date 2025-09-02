const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convertSvgToPng() {
  try {
    const svgPath = path.join(__dirname, 'src', 'img', 'logo.svg');
    const pngPath = path.join(__dirname, 'src', 'img', 'logo.png');
    
    // Read SVG file
    const svgBuffer = fs.readFileSync(svgPath);
    
    // Convert to PNG
    await sharp(svgBuffer)
      .resize(128, 128) // Make it larger for better quality
      .png()
      .toFile(pngPath);
    
    console.log('✅ Logo converted successfully!');
    console.log(`📁 PNG saved to: ${pngPath}`);
    
    // Clean up the temporary script
    fs.unlinkSync(__filename);
    console.log('🧹 Cleaned up conversion script');
    
  } catch (error) {
    console.error('❌ Error converting logo:', error.message);
  }
}

convertSvgToPng();
