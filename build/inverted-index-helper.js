(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var invertedIndexHelper = function () {
  function invertedIndexHelper() {
    _classCallCheck(this, invertedIndexHelper);
  }

  _createClass(invertedIndexHelper, null, [{
    key: 'getToken',
    value: function getToken(words) {
      var filterDuplicate = [];
      var formattedWords = words.toLowerCase().replace(/[^A-Z0-9\s]/gi, '').split(' ').sort();
      for (var x in formattedWords) {
        if (filterDuplicate.indexOf(formattedWords[x]) === -1) {
          filterDuplicate.push(formattedWords[x]);
        }
      }
      return filterDuplicate;
    }
  }, {
    key: 'readBookData',
    value: function readBookData(file) {
      if (file.length < 1) {
        return false;
      } else if (!Array.isArray(file)) {
        return false;
      }
      return true;
    }
  }]);

  return invertedIndexHelper;
}();

window.invertedIndexHelper = invertedIndexHelper;
},{}]},{},[1])