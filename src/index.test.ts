import * as Assert from 'assert'
import { Localize, StaticLocalize } from './index'

describe('StaticLocalize', function () {
  describe('#constructor', function () {
    it('should throw an error if the locales option is not an object', function () {
      const locales = 'i am not an object'
      const localeConstructorCall = () => { return new StaticLocalize({ locales }) }

      Assert.throws(localeConstructorCall, Error, 'Langs is not an object')
    })
  })

  describe('#locale', function () {
    it('should throw if the locale being set is not supported', function () {
      const locales = { fr: { 'Hello!': 'Bonjour!' } }
      const localize = new StaticLocalize({ locales })
      const setLocale = () => localize.locale = 'pt'

      Assert.throws(setLocale, Error, 'Locale unsupported [pt]')
    })
  })

  describe('#isLocaleSupported', function () {
    it('should return true if the locale is supported', function () {
      const locales = { fr: { 'Hello!': 'Bonjour!' } }
      const supportedLocale = 'fr'
      const localize = new StaticLocalize({ locales })
      
      Assert.ok(localize.isLocaleSupported(supportedLocale))
    })

    it('should return false if the locale is unsupported', function () {
      const locales = { fr: { 'Hello!': 'Bonjour!' } }
      const supportedLocale = 'pt'
      const localize = new StaticLocalize({ locales })
      
      Assert.ok(!localize.isLocaleSupported(supportedLocale))
    })
  })

  describe('#lookupString', function () {
    it('should return the string when the key is found', function () {
      const locales = { fr: { 'Hello!': 'Bonjour!' } }
      const localize = new StaticLocalize({ locales, nativeLocale: 'fr' })

      Assert.strictEqual(localize.lookupString('Hello!'), 'Bonjour!')
    })

    it('should return the key whfr the key is not found', function () {
      const locales = { fr: { 'Hello!': 'Bonjour!' } }
      const localize = new StaticLocalize({ locales, nativeLocale: 'fr' })

      Assert.strictEqual(localize.lookupString('Ola!'), 'Ola!')
    })
  })

  describe('#lc', function () {
    it('should interpolate string', function () {
      const locales = { fr: { 'Hello #{message}!': 'Bonjour #{message}!' } }
      const localize = new StaticLocalize({ locales, nativeLocale: 'fr' })
      const message = 'Poutine'

      Assert.strictEqual(localize.lc('Hello #{message}!', { message }), `Bonjour ${message}!`)
    })

    it('should throw if a token in the string (i.e. #{key}) references a key that is not present in the context', function () {
      const locales = { fr: { 'Hello #{message}!': 'Bonjour #{message}!' } }
      const localize = new StaticLocalize({ locales, nativeLocale: 'fr' })
      const iAmNotMessage = 'Tortiere'
      const lcCall = () => { return localize.lc('Hello #{message}!', { iAmNotMessage }) }

      Assert.throws(lcCall, Error, 'Context key not found')
    })
  })
})
