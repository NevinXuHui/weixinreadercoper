const PI = Math.PI;

var EinkRead = {};

EinkRead.area = function (r) {
  return PI * r * r;
};

EinkRead.circumference = (r) => 2 * PI * r;

module.exports = EinkRead;