/// <amd-module name="DS/DELLoader/Loader"/>
define("DS/DELLoader/Loader", ["require", "exports", "DS/React18Loader/React", "DS/React18Loader/React", "DS/Controls/Loader"], function (require, exports, React, React_1, WUXLoader) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LoaderShape = void 0;
    var LoaderShape;
    (function (LoaderShape) {
        LoaderShape["Circular"] = "circular";
        LoaderShape["Spinner"] = "spinner";
    })(LoaderShape || (exports.LoaderShape = LoaderShape = {}));
    const Loader = ({ className = undefined, id = undefined, isVisible = true, options = { allowUnsafeHTMLText: false, fadeDuration: 1000, height: 20, text: '', showButtonFlag: false, shape: LoaderShape.Circular } }) => {
        const divContainerRef = (0, React_1.useRef)();
        const wuxLoaderRef = (0, React_1.useRef)();
        (0, React_1.useEffect)(() => {
            if (divContainerRef.current) {
                wuxLoaderRef.current = new WUXLoader();
                wuxLoaderRef.current.inject(divContainerRef.current);
            }
            return () => {
                if (wuxLoaderRef && wuxLoaderRef.current) {
                    wuxLoaderRef.current.destroy();
                    wuxLoaderRef.current = undefined;
                }
            };
        }, []);
        // Visible Flag
        (0, React_1.useEffect)(() => {
            if (wuxLoaderRef.current) {
                wuxLoaderRef.current.visibleFlag = isVisible;
            }
        }, [isVisible]);
        // Loader Properties
        (0, React_1.useEffect)(() => {
            if (wuxLoaderRef.current && options) {
                //@ts-ignore Missing typing 24xFD01
                wuxLoaderRef.current.allowUnsafeHTMLText = options.allowUnsafeHTMLText || false;
                wuxLoaderRef.current.fadeDuration = options.fadeDuration || 1000;
                //@ts-ignore Missing typing 24xFD01
                wuxLoaderRef.current.height = options.height || 20;
                //@ts-ignore Missing typing 24xFD01
                wuxLoaderRef.current.shape = options.shape;
                wuxLoaderRef.current.showButtonFlag = options.showButtonFlag || false;
                wuxLoaderRef.current.text = options.text || '';
            }
        }, [options]);
        return (React.createElement("div", { className: className, id: id, ref: divContainerRef }));
    };
    exports.default = Loader;
});
