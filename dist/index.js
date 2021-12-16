!(function(e, o) {
  'object' == typeof exports && 'undefined' != typeof module
    ? o(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], o)
    : o(
        ((e =
          'undefined' != typeof globalThis
            ? globalThis
            : e || self).boundle = {})
      )
})(this, function(e) {
  'use strict'
  ;(e.a = () => {
    aaa: 1
  }),
    Object.defineProperty(e, '__esModule', { value: !0 })
})
