
var convert = require('color-convert')

module.exports = {
  Rgb: Rgb,
  Rgba: Rgba,
  Hsl: Hsl,
  Hsla: Hsla,
  toHsl: toHsl,
  fromHsl: fromHsl
}

function hexDigit(number) {
  var c = '0123456789abcdef'
  return c[parseInt(number/16)] + c[parseInt(number) % 16]
}

function Rgb(r, g, b) {
  return {
    r:r,
    g:g,
    b:b,
    toList: function () {
      return [this.r, this.g, this.b]
    },
    toString: function () {
      return 'rgb(' + parseInt(this.r) + ', ' + parseInt(this.g) + ', ' + parseInt(this.b) + ')'
    },
    toHex: function () {
      return '#' + this.toList().map(hexDigit).join('')
    }
  }
}

function Rgba(r, g, b, a) {
  return {
    r: r,
    g: g,
    b: b,
    a: a,
    toList: function () {
      return [this.r, this.g, this.b, this.a]
    },
    toString: function () {
      var vars = this.toList()
      vars[3] *= 100
      vars = vars.map(parseInt)
      vars[3] /= 100
      return 'rgba(' + parseInt(this.r) + ', ' + parseInt(this.g) + ', ' + parseInt(this.b) + ', ' + parseInt(this.a*100)/100 + ')'
    },
    // the alpha just gets dropped
    toHex: function () {
      var items = this.toList().slice(0, 3)
      return '#' + items.map(hexDigit).join('')
    }
  }
}

function Hsl(h, s, l) {
  return {
    h: h,
    s: s,
    l: l,
    toList: function () {
      return [this.h, this.s, this.l]
    },
    toString: function () {
      return 'hsl(' + parseInt(this.h) + ', ' + parseInt(this.s) + '%, ' + parseInt(this.l) + '%)'
    }
  }
}

function Hsla(h, s, l, a) {
  return {
    h: h,
    s: s,
    l: l,
    a: a,
    toList: function () {
      return [this.h, this.s, this.l, this.a]
    },
    toString: function () {
      return 'hsla(' + parseInt(this.h) + ', ' + parseInt(this.s) + '%, ' + parseInt(this.l) + '%, ' + parseInt(this.a * 100)/100 + ')'
    }
  }
}

function toHsl(color) {
  if (!color) return
  var res
  if (convert.rgb2hsl) {
    res = convert.rgb2hsl(color.r, color.g, color.b)
    res[0] /= 360
    res[1] /= 100
    res[2] /= 100
  } else {
    res = convert.RGBtoHSL(color.r, color.g, color.b)
  }
  return {
    h: res[0],
    s: res[1],
    l: res[2],
    a: color.a
  }
}

function fromHsl(color) {
  var rgb
  if (convert.hsl2rgb) {
    rgb = convert.hsl2rgb(color.h * 360, color.s * 100, color.l * 100)
  } else {
    rgb = convert.HSLtoRGB(color.h, color.s, color.l)
  }
  return {
    r: rgb[0],
    g: rgb[1],
    b: rgb[2],
    a: color.a
  }
}


