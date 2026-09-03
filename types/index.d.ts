declare namespace BrowserInformation {
    /**
     * Represents the browser information collected by {@link BrowserInformationReader}.
     *
     * All properties are optional because some browser APIs may be unavailable,
     * restricted by permissions, unsupported by the current runtime, or absent in
     * non-browser environments.
     */
    export interface BrowserInformationReaderResult {
        /**
         * The browser user agent string.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent
         */
        UserAgent?: string;

        /**
         * Indicates whether automation controls the browser.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/webdriver
         */
        Webdriver?: boolean;

        /**
         * The physical screen resolution, expressed as `[width, height]`.
         *
         * The values are based on the screen dimensions and the device pixel ratio.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Screen/width
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Screen/height
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
         */
        ScreenResolution?: [number, number];

        /**
         * The browser viewport resolution, expressed as `[width, height]`.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight
         */
        InnerResolution?: [number, number];

        /**
         * The approximate amount of device memory, in gigabytes, when available.
         *
         * This value is browser-dependent and may be rounded for privacy reasons.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/deviceMemory
         */
        DeviceMemory?: number;

        /**
         * The number of logical CPU cores available to the browser.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/hardwareConcurrency
         */
        HardwareConcurrency?: number;

        /**
         * The preferred language of the user's browser.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language
         */
        SystemLanguage?: string;

        /**
         * The estimated storage quota and current storage usage for the origin.
         *
         * This value is populated after calling {@link BrowserInformationReader.readAsyncData}.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/estimate
         */
        StorageEstimate?: StorageEstimate;
    }

    /**
     * Reads information exposed by browser APIs.
     *
     * The constructor collects synchronous browser information immediately.
     * Asynchronous information, such as storage estimates, must be collected by
     * calling {@link readAsyncData}.
     *
     * The reader is designed to fail gracefully when APIs are unavailable.
     */
    export class BrowserInformationReader {
        /**
         * Creates a new browser information reader and collects all available
         * synchronous information.
         */
        public constructor();

        /**
         * Reads asynchronous browser information.
         *
         * This currently includes the storage estimate returned by
         * `navigator.storage.estimate()`.
         *
         * @returns A promise that resolves once asynchronous data collection has completed.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/estimate
         */
        public async readAsyncData(): Promise<void>;

        /**
         * Gets the browser user agent string.
         *
         * @returns The user agent string, or `undefined` when unavailable.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent
         */
        public getUserAgent(): string | undefined;

        /**
         * Gets whether automation controls the browser.
         *
         * @returns `true` or `false` when available, otherwise `undefined`.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/webdriver
         */
        public getWebdriver(): boolean | undefined;

        /**
         * Gets the physical screen resolution.
         *
         * @returns The screen resolution as `[width, height]`, or `undefined` when unavailable.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Screen/width
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Screen/height
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
         */
        public getScreenResolution(): [number, number] | undefined;

        /**
         * Gets the browser viewport resolution.
         *
         * @returns The viewport resolution as `[width, height]`, or `undefined` when unavailable.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight
         */
        public getInnerResolution(): [number, number] | undefined;

        /**
         * Gets the storage estimate for the current origin.
         *
         * This value is only available after {@link readAsyncData} has completed
         * successfully.
         *
         * @returns The storage estimate, or `undefined` when unavailable.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/estimate
         */
        public getStorageEstimate(): StorageEstimate | undefined;

        /**
         * Gets the approximate amount of device memory, in gigabytes.
         *
         * @returns The device memory value, or `undefined` when unavailable.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/deviceMemory
         */
        public getDeviceMemory(): number | undefined;

        /**
         * Gets the number of logical CPU cores available to the browser.
         *
         * @returns The hardware concurrency value, or `undefined` when unavailable.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/hardwareConcurrency
         */
        public getHardwareConcurrency(): number | undefined;

        /**
         * Gets the preferred language of the user's browser.
         *
         * @returns The browser language, or `undefined` when unavailable.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language
         */
        public getLanguage(): string | undefined;

        /**
         * Formats the collected browser information as a human-readable string.
         *
         * @returns A string representation of the collected information.
         */
        public toString(): string;

        /**
         * Converts the collected browser information to a plain object.
         *
         * Only available values are included in the returned object.
         *
         * @returns The collected browser information.
         */
        public toJson(): BrowserInformationReaderResult;
    }

    /**
     * Logging utility used by the browser information reader.
     */
    export const Logger: {
        /**
         * Logs data using the active logger unless silent mode is enabled.
         *
         * @param data - The values to log.
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        log: (...data: any[]) => void;

        /**
         * Enables or disables silent mode.
         *
         * When silent mode is enabled, log messages are ignored.
         *
         * @param silentMode - `true` to disable logging, `false` to enable it.
         */
        setSilent: (silentMode: boolean) => void;

        /**
         * Replaces the active logger function.
         *
         * @param logger - The logger function to use.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/console/debug_static
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setLogger: (logger: (...data: any[]) => void) => void;
    };

    const _default: {
        Logger: typeof Logger;
        BrowserInformationReader: typeof BrowserInformationReader;
    };

    export default _default;
}

export = BrowserInformation;
