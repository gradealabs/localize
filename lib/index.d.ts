/**
 * The abstract Localize class that describes the main Localize API.
 *
 * When localizing with the `lc()` method the strings will have tokens of the form
 * `#{key}` interpolated where the key will be referenced from the context
 * objected passed to the `lc()` method.
 *
 * @example localize.lc(myKey, { date: '2018/03/20' })
 */
export declare class Localize {
    readonly nativeLocale: string;
    private _locale;
    /** @abstract */
    isLocaleSupported(locale: string): boolean;
    /**
     * Looks up a string and retreives it.
     *
     * @abstract
     * @param key The key of the string to lookup
     */
    lookupString(key: string): string;
    constructor({ nativeLocale }?: {
        nativeLocale?: string;
    });
    locale: string;
    lc(key: any, context?: {}): string;
    /**
     * Interpolates a string by replacing tokens of the form `#{key}` with the key
     * referenced from the passed in `context`.
     */
    interpolateString(string: string, context?: {}): string;
}
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
export declare class StaticLocalize extends Localize {
    private locales;
    constructor({ nativeLocale, locales }?: {
        nativeLocale?: string;
        locales?: any;
    });
    isLocaleSupported(locale: string): boolean;
    lookupString(key: string, defaultString?: string): string;
}
