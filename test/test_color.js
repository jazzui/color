
var expect = require('expect.js')
  , Color = require('../')

describe('Color should handle', function () {
  var res = 'hsla(340, 100%, 60%, 1)'
  describe('hsl input in the form of', function () {
    it('an array', function () {
      expect(new Color([340/360, 1, .6]).toString()).to.equal(res)
    })
    it('an array w/ alpha', function () {
      expect(new Color([340/360, 1, .6, 1]).toString()).to.equal(res)
    })
    it('an object', function () {
      expect(new Color({h: 340/360, s: 1, l: .6}).toString()).to.equal(res)
    })
    it('an object with alpha', function () {
      expect(new Color({h: 340/360, s: 1, l: .6, a: 1}).toString()).to.equal(res)
    })
  })

  it('an rgb array', function () {
    expect(new Color().set([255, 51, 119], 'rgb').toString()).to.equal(res)
  })
})

describe('set through rgb', function () {
  it('should work', function () {
    expect(new Color().rgb(255, 51, 119).rgb().toList()).to.eql([255, 51, 119])
  })
})

describe('Color should nicely output', function () {
  var color, rc
  beforeEach(function () {
    color = new Color([.5, 1, .2, .1])
    rc = new Color({r: 255, g: 51, b: 119, a: .4})
  })
  it('hsl()', function () {
    expect(color.hsl().toString()).to.equal('hsl(180, 100%, 20%)')
  })
  it('hsla()', function () {
    expect(color.hsla().toString()).to.equal('hsla(180, 100%, 20%, 0.1)')
  })
  it('rgb()', function () {
    expect(rc.rgb().toString()).to.equal('rgb(255, 51, 119)')
  })
  it('rgba()', function () {
    expect(rc.rgba().toString()).to.equal('rgba(255, 51, 119, 0.4)')
  })
  it('hex6', function () {
    expect(rc.rgb().toHex()).to.equal('#ff3377')
  })
  it('hex8', function () {
    expect(rc.rgba().toHex()).to.equal('#ff337766')
  })
})

