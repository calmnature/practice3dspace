/// <amd-module name="DS/DELModalLoader/ModalLoader"/>
define("DS/DELModalLoader/ModalLoader", ["require", "exports", "DS/React18Loader/React", "DS/React18Loader/React", "DS/Controls/ModalLoader"], function (require, exports, React, React_1, WUXModalLoader) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ModalLoader = ({ children, className = undefined, id = undefined, isVisible = true, options = undefined }) => {
        const ref = (0, React_1.useRef)();
        const setVisibility = () => {
            if (isVisible) {
                WUXModalLoader.displayModalLoader(ref.current, options === null || options === void 0 ? void 0 : options.message, options === null || options === void 0 ? void 0 : options.callback);
            }
            else {
                WUXModalLoader.removeModalLoader(ref.current, options === null || options === void 0 ? void 0 : options.message);
            }
        };
        (0, React_1.useEffect)(() => {
            setVisibility();
        }, [isVisible]);
        return React.createElement("div", { className: className, id: id, ref: ref }, children);
    };
    exports.default = ModalLoader;
});
