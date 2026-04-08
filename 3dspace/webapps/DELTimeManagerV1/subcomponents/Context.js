/// <amd-module name="DS/DELTimeManagerV1/subcomponents/Context"/>
define("DS/DELTimeManagerV1/subcomponents/Context", ["require", "exports", "DS/React18Loader/React", "DS/React18Loader/React"], function (require, exports, React, React_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Context = ({ id, isMinified, x, y, width }) => {
        const contextRectRef = (0, React_1.useRef)(null);
        (0, React_1.useEffect)(() => {
            if (contextRectRef.current) {
                if (isMinified) {
                    contextRectRef.current.style.setProperty('opacity', "0");
                }
                else if (!isMinified) {
                    contextRectRef.current.style.setProperty('opacity', "1");
                }
            }
        }, [isMinified]);
        return (React.createElement(React.Fragment, null,
            React.createElement("rect", { ref: contextRectRef, id: "context-" + id, x: x, y: y, width: width, height: "5", fill: "#78BEFA", style: { opacity: 1 }, className: "tmv1-opacity" })));
    };
    exports.default = Context;
});
