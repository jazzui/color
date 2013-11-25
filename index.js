
var parser = require('color-parser')

  , colors = require('./colors')

module.exports = Color

// Color(color) where color is one of
//  [h,s,l]
//  [h,s,l,a]
//  'rgb(r,g,b)'
//  'rgba(r,g,b,a)'
//  'hsl(h,s,l)'
//  'hsla(h,s,l,a)'
//  '#ABC'
//  '#ABACAD'
//  '#ABACADAE' (rgba)
// Color(h, s, l[, a]) where h, s, l, and a are between 0 and 1
function Color(color) {
  this.h = 0
  this.s = 0
  this.l = 0
  this.a = 1
  if (arguments.length > 1) {
    this.rgb.apply(this, arguments)
  } else if (color) {
    this.set(color)
  }
}

Color.prototype = {
  // set([h,s,l[,a]])
  // set([r,g,b[,a]], 'rgb')
  // set('rgb(r,g,b)')
  // set('rgba(r,g,b,a)')
  // set({r:, g:, b:})
  // set({r:, g:, b:, a:})
  // set('hsl(h,s,l)')
  // set('hsla(h,s,l,a)')
  // set({h:, s:, l:})
  // set({h:, s:, l:, a:})
  set: function (color, type) {
    type = type || 'hsl'
    if (Array.isArray(color)) {
      if (type === 'hsl') {
        this.h = color[0]
        this.s = color[1]
        this.l = color[2]
        this.a = color.length === 4 ? color[3] : 1
      } else {
        this.fromRgb(color)
      }
    } else if ('string' !== typeof color) {
      if ('undefined' !== typeof color.r) {
        color.a = 'undefined' === typeof color.a ? 1 : color.a
        this.fromRgb(color)
      } else if ('undefined' !== typeof color.h) {
        this.h = color.h
        this.s = color.s
        this.l = color.l
        this.a = 'undefined' !== typeof color.a ? color.a : 1
      } else {
        throw new Error("Invalid color set: " + color)
      }
    } else {
      color = color.toLowerCase()
      var parsed = parser.hsl(color)
      if (!parsed) throw new Error('Unrecognized color ' + color)
      this.h = parsed.h
      this.s = parsed.s
      this.l = parsed.l
      this.a = 'undefined' !== typeof parsed.a ? parsed.a : this.a
    }
    return this
  },
  fromRgb: function (items) {
    if (Array.isArray(items)) {
      items = {
        r: items[0],
        g: items[1],
        b: items[2],
        a: items.length === 4 ? items[3] : 1
      }
    }
    var hsl = colors.toHsl(items)
    this.h = hsl.h
    this.s = hsl.s
    this.l = hsl.l
    this.a = hsl.a
  },
  rgb: function (color) {
    if (arguments.length === 0) {
      var rgb = colors.fromHsl(this)
      return colors.Rgb(rgb.r, rgb.g, rgb.b)
    }
    if (arguments.length >= 3) {
      this.set([].slice.call(arguments), 'rgb')
    } else {
      this.set(color, 'rgb')
    }
    return this
  },
  rgba: function (color) {
    if (arguments.length !== 0) {
      return this.rgb.apply(this, arguments)
    }
    var rgb = colors.fromHsl(this)
    return colors.Rgba(rgb.r, rgb.g, rgb.b, this.a)
  },
  hsl: function (color) {
    if (arguments.length === 0) {
      return colors.Hsl(this.h * 360, this.s * 100, this.l * 100)
    }
    if (arguments.length >= 3) {
      this.set([].slice.call(arguments), 'hsl')
    } else {
      this.set(color, 'hsl')
    }
    return this
  },
  hsla: function (color) {
    if (arguments.length !== 0) {
      return this.hsl.apply(this, arguments)
    }
    return colors.Hsla(this.h * 360, this.s * 100, this.l * 100, this.a)
  },
  toString: function () {
    return this.hsla().toString()
  }
}

