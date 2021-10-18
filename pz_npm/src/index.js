const messages = [
  "Oscar",
  "Ana",
  "Pablo",
  "Arturo",
  "Gerardo"
];

const randomMsg = () => {
  const message = messages[Math.floor(Math.random() * messages.length)];
  console.log(message);
}

module.exports = { randomMsg };