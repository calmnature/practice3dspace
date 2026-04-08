/// <amd-module name="DS/DELWebTools/DELWebUtils"/>
define("DS/DELWebTools/DELWebUtils", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.removeMilliSeconds = exports.throttle = exports.debounce = void 0;
    /**
     * Delays the execution of the function until a specified time to avoid unnecessary CPU cycles, and API calls and improve performance.
     * @param { Function | any } callback
     * @param { number } delay
     * @returns
     */
    const debounce = (callback, delay = 200) => {
        var time;
        return (...args) => {
            clearTimeout(time);
            time = setTimeout(() => {
                callback(...args);
            }, delay);
        };
    };
    exports.debounce = debounce;
    /**
     * Throttling is used to call a function after a particular interval of time only the first click is executed immediately.
     * @param { Function | any } callback
     * @param { number } delay
     * @returns
     */
    const throttle = (callback, delay = 200) => {
        let shouldWait = false;
        return (...args) => {
            if (shouldWait)
                return;
            callback(...args);
            shouldWait = true;
            setTimeout(() => {
                shouldWait = false;
            }, delay);
        };
    };
    exports.throttle = throttle;
    const removeMilliSeconds = (dateISOStr) => {
        let oResult = dateISOStr;
        // ISO String: "2022-02-02T18:54:56.088Z"
        if (dateISOStr && dateISOStr !== "") {
            // Split at '.' -> ["2022-02-02T18:54:56", "088Z"]
            const arrSplitDate = dateISOStr.split('.');
            if (arrSplitDate && arrSplitDate.length > 1) {
                oResult = arrSplitDate[0] + "Z";
            }
        }
        return oResult;
    };
    exports.removeMilliSeconds = removeMilliSeconds;
});
