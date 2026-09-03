# Browser Information

A lightweight, universal browser information reader for JavaScript and TypeScript applications.

`@cic-it-nancy/browser-information` provides a safe and structured way to retrieve client-side environment data, screen
metrics, hardware capabilities, and storage estimates, with built-in fallbacks when running in unsupported environments
or during server-side rendering (SSR).

---

## Features

- **Safe Extraction**: Gracefully handles missing browser APIs without throwing unhandled exceptions.
- **Hardware & Environment Insights**: Collects device memory, CPU core concurrency, screen resolution (accounting for
  a device pixel ratio), and viewport dimensions.
- **Asynchronous Storage Metrics**: Supports retrieval of storage quota and usage estimates via
  `navigator.storage.estimate()`.
- **Customisable Logging**: Built-in logger with options to silence output or plug in custom logging handlers.
- **TypeScript First**: Full type definitions included out of the box.
- **Multi-Format Distribution**: Supports ESM, CommonJS, and standalone browser bundles (`browser.js` /
  `browser.min.js`).

---

## Installation

Install the package using your preferred package manager:

```bash
# Using npm
npm install @cic-it-nancy/browser-information

# Using pnpm
pnpm add @cic-it-nancy/browser-information

# Using Yarn
yarn add @cic-it-nancy/browser-information
```

---

## Quick Start

### Basic Synchronous Usage

Synchronous metrics (screen resolution, user agent, hardware concurrency, etc.) are gathered upon instantiation:

```typescript
import {BrowserInformationReader} from '@cic-it-nancy/browser-information';

const reader = new BrowserInformationReader();

// Access individual properties
console.log('User Agent:', reader.getUserAgent());
console.log('Hardware Concurrency:', reader.getHardwareConcurrency());
console.log('Screen Resolution:', reader.getScreenResolution()); // [width, height]

// Export as a plain JavaScript object
const info = reader.toJson();
console.log(info);

// Format as a human-readable string
console.log(reader.toString());
```

### Collecting Asynchronous Data

Some browser metrics, such as storage quota estimates, require an asynchronous call:

```typescript
import {BrowserInformationReader} from '@cic-it-nancy/browser-information';

async function collectBrowserDetails() {
    const reader = new BrowserInformationReader();

    // Fetch asynchronous metrics (e.g., storage estimation)
    await reader.readAsyncData();

    const storage = reader.getStorageEstimate();
    if (storage) {
        console.log(`Quota: ${storage.quota} bytes`);
        console.log(`Usage: ${storage.usage} bytes`);
    }

    console.log(reader.toJson());
}

collectBrowserDetails();
```

---

## Logger Configuration

The library includes a configurable logging utility to help diagnose issues when APIs are inaccessible.

### Silencing Logs

To suppress all debug logs emitted by the reader:

```typescript
import {Logger} from '@cic-it-nancy/browser-information';

Logger.setSilent(true);
```

### Custom Logger Function

You can route log messages through your own logging infrastructure (e.g. Winston, Pino, or a custom wrapper):

```typescript
import {Logger} from '@cic-it-nancy/browser-information';

Logger.setLogger((...args: unknown[]) => {
    // Custom log dispatching logic
    console.info('[BrowserInfo]', ...args);
});
```

---

## API Reference

### `BrowserInformationReader`

#### Methods

| Method                     | Return Type                      | Description                                                                           |
|:---------------------------|:---------------------------------|:--------------------------------------------------------------------------------------|
| `constructor()`            | `BrowserInformationReader`       | Initialises the reader and gathers all available synchronous data.                    |
| `readAsyncData()`          | `Promise<void>`                  | Gathers asynchronous data (such as storage quota and usage).                          |
| `getUserAgent()`           | `string \| undefined`            | Returns the `navigator.userAgent` string.                                             |
| `getWebdriver()`           | `boolean \| undefined`           | Indicates whether the browser is controlled by automation (e.g. Selenium, Puppeteer). |
| `getScreenResolution()`    | `[number, number] \| undefined`  | Physical screen resolution `[width, height]`, adjusted for `devicePixelRatio`.        |
| `getInnerResolution()`     | `[number, number] \| undefined`  | Viewport dimensions `[innerWidth, innerHeight]`.                                      |
| `getDeviceMemory()`        | `number \| undefined`            | Approximate device RAM in gigabytes (where supported).                                |
| `getHardwareConcurrency()` | `number \| undefined`            | Number of logical processor cores available.                                          |
| `getLanguage()`            | `string \| undefined`            | User's preferred browser language (e.g. `'en-GB'`).                                   |
| `getStorageEstimate()`     | `StorageEstimate \| undefined`   | Estimated quota and usage details (available after `readAsyncData()`).                |
| `toJson()`                 | `BrowserInformationReaderResult` | Returns a key-value object containing only defined values.                            |
| `toString()`               | `string`                         | Formats all gathered data into a multi-line human-readable string.                    |

---

### `BrowserInformationReaderResult` (TypeScript Interface)

```typescript
interface BrowserInformationReaderResult {
    UserAgent?: string;
    Webdriver?: boolean;
    ScreenResolution?: [number, number];
    InnerResolution?: [number, number];
    DeviceMemory?: number;
    HardwareConcurrency?: number;
    SystemLanguage?: string;
    StorageEstimate?: StorageEstimate;
}
```

---

### `Logger`

| Method                  | Parameters                 | Description                                                               |
|:------------------------|:---------------------------|:--------------------------------------------------------------------------|
| `log(...data)`          | `...any[]`                 | Dispatches log arguments to the active logger if silent mode is disabled. |
| `setSilent(silentMode)` | `boolean`                  | Enables or disables library log output.                                   |
| `setLogger(logger)`     | `(...data: any[]) => void` | Replaces the default `console.debug` logger with a custom function.       |

---

## Browser Standalone Usage

Pre-bundled versions are available under the `lib/` directory for direct script inclusion:

```html

<script src="node_modules/@cic-it-nancy/browser-information/lib/browser.min.js"></script>
```

---

## Authors & Contributors

- **CIC-IT Nancy** — Author
- **Pierre 'AlasDiablo' M** ([GitHub](https://github.com/AlasDiablo)) — Contributor

---

## Licence

GNU Lesser General Public License v3.0 (LGPL-3.0).
