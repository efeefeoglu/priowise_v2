const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../node_modules/pdf-parse/lib/pdf-parse.js');

try {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace all instances of 'new Buffer(' with 'Buffer.from('
    const updatedContent = content.replace(/new Buffer\(/g, 'Buffer.from(');
    
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log('✅ Successfully patched pdf-parse to use Buffer.from()');
    } else {
      console.log('ℹ️ pdf-parse already patched or no changes needed');
    }
  } else {
    console.log('⚠️ pdf-parse file not found, skipping patch');
  }
} catch (error) {
  console.error('❌ Error patching pdf-parse:', error.message);
  // Don't fail the build if patching fails
  process.exit(0);
}
