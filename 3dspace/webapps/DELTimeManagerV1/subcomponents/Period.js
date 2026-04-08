/// <amd-module name="DS/DELTimeManagerV1/subcomponents/Period"/>
define("DS/DELTimeManagerV1/subcomponents/Period", ["require", "exports", "DS/React18Loader/React", "DS/React18Loader/React"], function (require, exports, React, React_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Period = ({ id, isMinified, x, y, width }) => {
        const periodRectRef = (0, React_1.useRef)(null);
        (0, React_1.useEffect)(() => {
            if (periodRectRef.current) {
                if (isMinified) {
                    periodRectRef.current.style.setProperty('opacity', "0");
                }
                else if (!isMinified) {
                    periodRectRef.current.style.setProperty('opacity', "1");
                }
            }
        }, [isMinified]);
        return (React.createElement(React.Fragment, null,
            React.createElement("rect", { ref: periodRectRef, id: "period-" + id, x: x, y: y, width: width, height: "5", fill: "#368EC4", style: { opacity: 1 }, className: "tmv1-opacity" })));
    };
    exports.default = Period;
});
