module.exports = function zeros(expression) {
  var strToArr = expression.split('*');
  var arrOfFact = [];
  var amOfNulls = 0;

  for (var x = 0; x < strToArr.length; x++) {
    var n = parseInt(strToArr[x]);
    var regEx = /\d!{2}/;
    var count = n;

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

  var mulArray = arrOfFact.reduce(function multiply(a, b) {
    var first = a.toString();
    var second = b.toString();
    var result = [];

    for (var i = 0; i < first.length; i++) {
      for (var j = 0; j < second.length; j++) {
        var lenF = first.length;
        var lenS = second.length;
        var prevEl = (lenF - i) + (lenS - j);
        var lastEl = prevEl + 1;
        var mul = first[(lenF - 1) - i] * second[(lenS - 1) - j];
        var sum = mul + (result[lastEl] || 0);

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

  for (var y = 1; y < mulArray.length; y++) {
    if (mulArray[mulArray.length - y] === '0') {
      amOfNulls += 1;
    } else break;
  }

  return amOfNulls;
}