export function isEmpty(s) {

  return (s == null || s.length < 1)
}


String.format = function() {
  let s = arguments[0]
  for (let i = 0; i < arguments.length - 1; i++) {
    let reg = new RegExp('\\{' + i + '\\}', 'gm')
    s = s.toString().replace(reg, arguments[i + 1])
  }
  return s
}



