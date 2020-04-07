// 判断对象类型
function __getClass(object){
  return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
};

// 判断对象属性是否为空
function __objectPropertyIsEmpty(o){
  var a = Object.keys(o);
  return a.length === 0;
}

module.exports = {
  __objectPropertyIsEmpty: __objectPropertyIsEmpty,
}