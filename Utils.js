

exports.create_buff = function (size) {
  let buff = '';
  let tmp_size = size;
  while (tmp_size > 0) {
    buff += '\t';
    tmp_size -= 1;
  }
  return buff;
}
