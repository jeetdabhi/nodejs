const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; // Using AES encryption
const key = crypto.randomBytes(32); // Generate a 32-byte random key (256 bits)
const iv = crypto.randomBytes(16); // Generate a 16-byte random IV (128 bits)

// Encrypting text
function encrypt(text) {
   let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
   let encrypted = cipher.update(text);
   encrypted = Buffer.concat([encrypted, cipher.final()]);
   return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex'), key: key.toString('hex') }; // Return key and iv
}

// Decrypting text
function decrypt(text) {
   let iv = Buffer.from(text.iv, 'hex');
   let encryptedText = Buffer.from(text.encryptedData, 'hex');
   let key = Buffer.from(text.key, 'hex'); // Use the key from the encrypted object
   let decipher = crypto.createDecipheriv(algorithm, key, iv);
   let decrypted = decipher.update(encryptedText);
   decrypted = Buffer.concat([decrypted, decipher.final()]);
   return decrypted.toString();
}

// Text to encrypt
var hw = encrypt("Hello Jeet");
console.log("Encrypted:", hw);

// Decrypt the same text using the returned values
console.log("Decrypted:", decrypt(hw));
