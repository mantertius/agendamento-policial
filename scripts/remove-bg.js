const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, '../public/logo.jpg');
const outputPath = path.join(__dirname, '../public/logo.png');

async function removeWhiteBackground() {
  try {
    // Ler a imagem
    const image = sharp(inputPath);
    const { width, height } = await image.metadata();
    
    // Extrair os pixels raw
    const { data, info } = await image
      .raw()
      .toBuffer({ resolveWithObject: true });
    
    // Criar buffer com canal alpha
    const pixels = new Uint8Array(width * height * 4);
    
    for (let i = 0; i < width * height; i++) {
      const r = data[i * 3];
      const g = data[i * 3 + 1];
      const b = data[i * 3 + 2];
      
      pixels[i * 4] = r;
      pixels[i * 4 + 1] = g;
      pixels[i * 4 + 2] = b;
      
      // Se o pixel for branco ou quase branco, tornar transparente
      // Usando um threshold para pegar tons de branco
      if (r > 240 && g > 240 && b > 240) {
        pixels[i * 4 + 3] = 0; // Transparente
      } else {
        pixels[i * 4 + 3] = 255; // Opaco
      }
    }
    
    // Salvar como PNG com transparência
    await sharp(Buffer.from(pixels), {
      raw: {
        width: width,
        height: height,
        channels: 4
      }
    })
    .png()
    .toFile(outputPath);
    
    console.log('✅ Fundo branco removido! Arquivo salvo como logo.png');
  } catch (error) {
    console.error('Erro:', error);
  }
}

removeWhiteBackground();
