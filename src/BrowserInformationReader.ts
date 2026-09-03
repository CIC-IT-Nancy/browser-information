import Logger from './Logger';

import type { BrowserInformationReaderResult } from '../types';

class BrowserInformationReader {
    private readonly userAgent?: string;
    private readonly webdriver?: boolean;
    private readonly screenResolution?: [number, number];
    private readonly innerResolution?: [number, number];
    private readonly deviceMemory?: number;
    private readonly hardwareConcurrency?: number;
    private readonly language?: string;

    private storageEstimate?: StorageEstimate;

    public constructor() {
        if (typeof window === 'undefined') {
            Logger.log('BrowserInformationReader: window is undefined');
            return;
        }

        if (typeof window.navigator !== 'undefined') {
            try {
                this.userAgent = window.navigator.userAgent;
            } catch (e) {
                Logger.log(
                    'BrowserInformationReader: navigator.userAgent is unavailable in this context',
                );
                Logger.log(e);
            }

            try {
                this.webdriver = window.navigator.webdriver;
            } catch (e) {
                Logger.log(
                    'BrowserInformationReader: navigator.webdriver is unavailable in this context',
                );
                Logger.log(e);
            }

            try {
                this.screenResolution = [
                    window.screen.width * window.devicePixelRatio,
                    window.screen.height * window.devicePixelRatio,
                ];
            } catch (e) {
                Logger.log(
                    'BrowserInformationReader: window.screen is unavailable in this context',
                );
                Logger.log(e);
            }

            try {
                this.innerResolution = [window.innerWidth, window.innerHeight];
            } catch (e) {
                Logger.log(
                    'BrowserInformationReader: window.innerWidth and window.innerHeight are unavailable in this context',
                );
                Logger.log(e);
            }

            try {
                // @ts-expect-error
                this.deviceMemory = window.navigator.deviceMemory;
            } catch (e) {
                Logger.log(
                    'BrowserInformationReader: window.navigator.deviceMemory is unavailable in this context',
                );
                Logger.log(e);
            }

            try {
                this.hardwareConcurrency = window.navigator.hardwareConcurrency;
            } catch (e) {
                Logger.log(
                    'BrowserInformationReader: window.navigator.hardwareConcurrency is unavailable in this context',
                );
                Logger.log(e);
            }

            try {
                this.language = window.navigator.language;
            } catch (e) {
                Logger.log(
                    'BrowserInformationReader: window.navigator.language is unavailable in this context',
                );
                Logger.log(e);
            }
        } else {
            Logger.log('BrowserInformationReader: navigator is undefined');
        }
    }

    public async readAsyncData(): Promise<void> {
        if (typeof window === 'undefined') {
            Logger.log('BrowserInformationReader Async: window is undefined');
            return;
        }

        if (typeof window.navigator !== 'undefined') {
            try {
                this.storageEstimate =
                    await window.navigator.storage.estimate();
            } catch (e) {
                Logger.log(
                    'BrowserInformationReader Async: window.navigator.storage.estimate() is unavailable in this context',
                );
                Logger.log(e);
            }
        } else {
            Logger.log(
                'BrowserInformationReader Async: navigator is undefined',
            );
        }
    }

    public getUserAgent(): string | undefined {
        return this.userAgent;
    }

    public getWebdriver(): boolean | undefined {
        return this.webdriver;
    }

    public getScreenResolution(): [number, number] | undefined {
        return this.screenResolution;
    }

    public getInnerResolution(): [number, number] | undefined {
        return this.innerResolution;
    }

    public getStorageEstimate(): StorageEstimate | undefined {
        return this.storageEstimate;
    }

    public getDeviceMemory(): number | undefined {
        return this.deviceMemory;
    }

    public getHardwareConcurrency(): number | undefined {
        return this.hardwareConcurrency;
    }

    public getLanguage(): string | undefined {
        return this.language;
    }

    public toString(): string {
        let str = '';
        if (this.userAgent !== undefined) {
            str += 'UserAgent: ' + this.userAgent + '\n';
        } else {
            str += 'UserAgent: Unsupported\n';
        }
        if (this.webdriver !== undefined) {
            str += 'Webdriver: ' + this.webdriver + '\n';
        } else {
            str += 'Webdriver: Unsupported\n';
        }
        if (this.screenResolution !== undefined) {
            str +=
                'ScreenResolution: ' +
                this.screenResolution[0] +
                'x' +
                this.screenResolution[1] +
                '\n';
        } else {
            str += 'ScreenResolution: Unsupported\n';
        }
        if (this.innerResolution !== undefined) {
            str +=
                'InnerResolution: ' +
                this.innerResolution[0] +
                'x' +
                this.innerResolution[1] +
                '\n';
        } else {
            str += 'InnerResolution: Unsupported\n';
        }
        if (this.deviceMemory !== undefined) {
            str += 'DeviceMemory: ' + this.deviceMemory + '\n';
        } else {
            str += 'DeviceMemory: Unsupported\n';
        }
        if (this.hardwareConcurrency !== undefined) {
            str += 'HardwareConcurrency: ' + this.hardwareConcurrency + '\n';
        } else {
            str += 'HardwareConcurrency: Unsupported\n';
        }
        if (this.language !== undefined) {
            str += 'SystemLanguage: ' + this.language + '\n';
        } else {
            str += 'SystemLanguage: Unsupported\n';
        }
        if (this.storageEstimate !== undefined) {
            str +=
                'StorageEstimate: ' +
                `Quota: ${this.storageEstimate.quota}, Usage: ${this.storageEstimate.usage}` +
                '\n';
        } else {
            str += 'StorageEstimate: Unsupported\n';
        }
        return str;
    }

    public toJson(): BrowserInformationReaderResult {
        const obj: BrowserInformationReaderResult = {};
        if (this.userAgent !== undefined) {
            obj['UserAgent'] = this.userAgent;
        }
        if (this.webdriver !== undefined) {
            obj['Webdriver'] = this.webdriver;
        }
        if (this.screenResolution !== undefined) {
            obj['ScreenResolution'] = this.screenResolution;
        }
        if (this.innerResolution !== undefined) {
            obj['InnerResolution'] = this.innerResolution;
        }
        if (this.deviceMemory !== undefined) {
            obj['DeviceMemory'] = this.deviceMemory;
        }
        if (this.hardwareConcurrency !== undefined) {
            obj['HardwareConcurrency'] = this.hardwareConcurrency;
        }
        if (this.language !== undefined) {
            obj['SystemLanguage'] = this.language;
        }
        if (this.storageEstimate !== undefined) {
            obj['StorageEstimate'] = this.storageEstimate;
        }
        return obj;
    }
}

export default BrowserInformationReader;
