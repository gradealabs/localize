"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Assert = require("assert");
describe('StaticLocalize', function () {
    describe('#constructor', function () {
        it('should throw an error if the locales option is not an object', function () {
            Assert.fail('Missing test');
        });
    });
    describe('#locale', function () {
        it('should throw if the locale being set is not supported', function () {
            Assert.fail('Missing test');
        });
    });
    describe('#isSupportsLocale', function () {
        it('should return true if the locale is supported', function () {
            Assert.fail('Missing test');
        });
        it('should return false if the locale is unsupported', function () {
            Assert.fail('Missing test');
        });
    });
    describe('#lookupString', function () {
        it('should return the string when the key is found', function () {
            Assert.fail('Missing test');
        });
        it('should return the key when the key is not found', function () {
            Assert.fail('Missing test');
        });
    });
    describe('#lc', function () {
        it('should interpolate string', function () {
            Assert.fail('Missing test');
        });
        it('should throw if a token in the string (i.e. #{key}) references a key that is not present in the context', function () {
            Assert.fail('Missing test');
        });
    });
});
