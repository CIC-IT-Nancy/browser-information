// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultLogger = (...data: any[]) => {
    console.debug(...data);
};

let silent = false;
let activeLogger = defaultLogger;

const setSilent = (silentMode: boolean) => {
    silent = silentMode;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setLogger = (logger: (...data: any[]) => void) => {
    activeLogger = logger;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const log = (...data: any[]) => {
    if (!silent) {
        activeLogger(...data);
    }
};

export default {
    setSilent,
    setLogger,
    log,
};
