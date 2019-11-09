const create_buff = function (size) {
  let buff = '';
  let tmp_size = size;
  while (tmp_size > 0) {
    buff += '\t';
    tmp_size -= 1;
  }
  return buff;
};

const flip_coin = function (prob = 0.5) {
  return Math.random() > prob;
};

const random_int = function (min = 0, max = 10) {
  return Math.random() * (max - min) + min;
};

exports = { create_buff, flip_coin, random_int };