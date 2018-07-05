"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The abstract Localize class that describes the main Localize API.
 *
 * When localizing with the `lc()` method the strings will have tokens of the form
 * `#{key}` interpolated where the key will be referenced from the context
 * objected passed to the `lc()` method.
 *
 * @example localize.lc(myKey, { date: '2018/03/20' })
 */
class Localize {
    /** @abstract */
    isLocaleSupported(locale) {
        throw new Error('Unimplmented');
    }
    /**
     * Looks up a string and retreives it.
     *
     * @abstract
     * @param key The key of the string to lookup
     */
    lookupString(key) {
        throw new Error('Unimplmented');
    }
    constructor({ nativeLocale = 'en' } = {}) {
        this._locale = nativeLocale;
        Object.defineProperty(this, 'nativeLocale', {
            get: () => nativeLocale
        });
    }
    get locale() {
        return this._locale;
    }
    set locale(value) {
        if (this.isLocaleSupported(value)) {
            this._locale = value;
        }
        else {
            throw Object.assign(new Error(`Locale unsupported [${value}]`), { code: 'LOCALE_UNSUPPORTED', locale: value });
        }
    }
    lc(key, context = {}) {
        const string = this.lookupString(key);
        if (string) {
            return this.interpolateString(string, context);
        }
        else {
            throw Object.assign(new Error(`String not found with key [${key}]`), { code: 'STRING_NOT_FOUND', key });
        }
    }
    /**
     * Interpolates a string by replacing tokens of the form `#{key}` with the key
     * referenced from the passed in `context`.
     */
    interpolateString(string, context = {}) {
        if (string.indexOf('#{') >= 0) {
            return string.replace(/#\{([^\}]+)\}/, (_, key) => {
                if (key in context) {
                    return context[key].toString();
                }
                else {
                    throw Object.assign(new Error('Context key not found'), { code: 'CONTEXT_KEY_NOT_FOUND', key, context });
                }
            });
        }
        else {
            return string;
        }
    }
}
exports.Localize = Localize;
/**
 * A concrete Localize implementation that reads locales and strings from a
 * static object literal and returns the string key if no string exists for the
 * given key.
 *
 * @example const locales = { fr: { 'Hello World #{message}': 'Hello World FR #{message}' } }
 * const localize = new StaticLocalize({ locales })
 * localize.lang = 'fr'
 * localize.lc('Hello World #{message}', { message: 'Mom!' }) // Hello World FR Mom!
 */
class StaticLocalize extends Localize {
    constructor({ nativeLocale = 'en', locales = null } = {}) {
        super({ nativeLocale });
        if (locales && Object(locales) === locales) {
            this.locales = Object.assign({}, locales);
        }
        else {
            throw Object.assign(new Error('Langs is not an object'), { code: 'LANGS_NOT_AN_OBJECT' });
        }
    }
    isLocaleSupported(locale) {
        const strings = this.locales[locale];
        return Object(strings) === strings;
    }
    lookupString(key, defaultString = key) {
        const strings = this.locales[this.locale];
        return strings[key] || defaultString;
    }
}
exports.StaticLocalize = StaticLocalize;
