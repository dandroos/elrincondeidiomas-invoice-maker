module.exports = length => {
  const arr = [];
  for (let i = 1; i <= length; i++) {
    let number = Math.floor(Math.random() * 10);
    arr.push(number);
  }
  return arr.join("");
};
