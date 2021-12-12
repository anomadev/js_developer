const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = 'admin123';
  const hash = '$2b$10$3fBBL9spwwvWs1xgg8ZYlO4mVFE0fEklBw/GxH6HpXYCUJM3bQDLe';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();
