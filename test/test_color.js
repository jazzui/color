
var expect = require('expect.js')
  , Color = require('../')

describe('Color should handle', function () {
  var res = 'hsla(340, 100%, 60%, 1)'
  it('an array', function () {
    expect(new Color([340/360, 1, .6]).toString()).to.equal(res)
  })
  it('an array w/ alpha', function () {
    expect(new Color([340/360, 1, .6, 1]).toString()).to.equal(res)
  })
  it('an rgb array', function () {
    expect(new Color().set([255, 51, 119], 'rgb').toString()).to.equal(res)
  })
})

