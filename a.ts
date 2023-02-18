// import bcrypt from 'bcrypt';
const bcrypt = require('bcrypt');

const a = async () => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash('abc', salt);
  console.log(password);
};
a();
