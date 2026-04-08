/// <amd-module name="DS/DELHooks/usePrevious"/>
define("DS/DELHooks/usePrevious", ["require", "exports", "DS/React18Loader/React"], function (require, exports, React_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Returns previous value of the passed parameter
     * @param { any } value Value to store
     * @returns Previous value of the passed parameter
     * @see {@link https://delpxpdocs.dsone.3ds.com/webinfra/componentTools/reactComponentTools/usePrevious}
     */
    const usePrevious = (value) => {
        const ref = (0, React_1.useRef)();
        (0, React_1.useEffect)(() => {
            ref.current = value;
        });
        return ref.current;
    };
    exports.default = usePrevious;
});
