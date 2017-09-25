module.exports = function zeros(expression) {
  let strToArr = expression.split('*');
  let arrOfFact = [];
  let amOfNulls = 0;

  for (let x = 0; x < strToArr.length; x++) {
    let n = parseInt(strToArr[x]);
    let regEx = /\d!{2}/;
    let count = n;

    if (regEx.test(strToArr[x])) {
      if (n % 2 !== 1) {
        while (count !== 2) {
          arrOfFact.push(n);
          n = count - 2;
          count -= 2;
        }
      } else {
        while (count !== 1) {
          arrOfFact.push(n);
          n = count - 2;
          count -= 2;
        }
      }
    }
    else {
      while (count !== 1) {
        arrOfFact.push(n);
        n = count - 1;
        count--;
      }
    }
    arrOfFact.push(n);
  }

  let mulArray = arrOfFact.reduce(function multiply(a, b) {
    let first = a.toString();
    let second = b.toString();
    let result = [];

    for (let i = 0; i < first.length; i++) {
      for (let j = 0; j < second.length; j++) {
        let lenF = first.length;
        let lenS = second.length;
        let prevEl = (lenF - i) + (lenS - j);
        let lastEl = prevEl + 1;
        let mul = first[(lenF - 1) - i] * second[(lenS - 1) - j];
        let sum = mul + (result[lastEl] || 0);

        result[prevEl] = (result[prevEl] || 0) + Math.floor(sum / 10); //
        result[lastEl] = sum % 10;
      }
    }
    result = result.slice(2);
    if (result[0] === 0) {
      result = result.slice(1);
    }
    return result.join('');
  });

  for (let y = 1; y < mulArray.length; y++) {
    if (mulArray[mulArray.length - y] === '0') {
      amOfNulls += 1;
    } else break;
  }
  return amOfNulls;
}