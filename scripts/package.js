const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const BUILDS_DIR = path.join(__dirname, '../builds');
const DIST_BASE_DIR = path.join(__dirname, '../dist');

// Tạo folder builds nếu chưa có
if (!fs.existsSync(BUILDS_DIR)) {
  fs.mkdirSync(BUILDS_DIR, { recursive: true });
}

const browsers = ['chrome', 'firefox', 'edge'];
const version = require('../package.json').version;

async function createZip(browser) {
  return new Promise((resolve, reject) => {
    const distDir = path.join(DIST_BASE_DIR, browser);

    // Kiểm tra dist folder của browser
    if (!fs.existsSync(distDir)) {
      console.error(`❌ [${browser}] dist/${browser} folder not found!`);
      console.error(`   Run "npm run build:${browser}" first.`);
      reject(new Error(`dist/${browser} not found`));
      return;
    }

    const outputPath = path.join(BUILDS_DIR, `clarity-${browser}-v${version}.zip`);
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      const sizeInKB = (archive.pointer() / 1024).toFixed(2);
      console.log(`✅ [${browser}] ${sizeInKB} KB - ${path.basename(outputPath)}`);
      resolve();
    });

    archive.on('error', (err) => {
      console.error(`❌ [${browser}] Error:`, err.message);
      reject(err);
    });

    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        console.warn(`⚠️  [${browser}] Warning:`, err);
      } else {
        reject(err);
      }
    });

    archive.pipe(output);

    // Thêm tất cả files từ dist/${browser}
    archive.directory(distDir, false);

    archive.finalize();
  });
}

async function packageAll() {
  console.log('====================================');
  console.log('📦 Packaging extensions...');
  console.log('====================================\n');

  const browsersToPackage = [];

  // Kiểm tra browser nào đã build
  for (const browser of browsers) {
    const distDir = path.join(DIST_BASE_DIR, browser);
    if (fs.existsSync(distDir)) {
      browsersToPackage.push(browser);
    } else {
      console.log(`⏭️  Skipping ${browser} (not built yet)`);
    }
  }

  if (browsersToPackage.length === 0) {
    console.error('\n❌ No builds found!');
    console.error('   Run "npm run build:all" first.\n');
    process.exit(1);
  }

  try {
    for (let i = 0; i < browsersToPackage.length; i++) {
      const browser = browsersToPackage[i];
      console.log(`[${i + 1}/${browsersToPackage.length}] Packaging ${browser}...`);
      await createZip(browser);
    }

    console.log('\n====================================');
    console.log('✅ All packages created successfully!');
    console.log('====================================\n');

    // List all created files with sizes
    const files = fs
      .readdirSync(BUILDS_DIR)
      .filter((file) => file.endsWith('.zip'))
      .sort();

    if (files.length > 0) {
      console.log('Created files:');
      files.forEach((file) => {
        const stats = fs.statSync(path.join(BUILDS_DIR, file));
        const sizeInKB = (stats.size / 1024).toFixed(2);
        console.log(`  📦 ${file} - ${sizeInKB} KB`);
      });
      console.log('');
    }
  } catch (err) {
    console.error('\n❌ Packaging failed:', err.message);
    process.exit(1);
  }
}

packageAll();
