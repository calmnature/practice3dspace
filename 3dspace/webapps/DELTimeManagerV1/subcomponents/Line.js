/// <amd-module name="DS/DELTimeManagerV1/subcomponents/Line"/>
define("DS/DELTimeManagerV1/subcomponents/Line", ["require", "exports", "DS/React18Loader/React"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Line = ({ id, x, x2, y }) => {
        return (React.createElement(React.Fragment, null,
            React.createElement("line", { id: "line-" + id, x1: x, x2: x2, y1: y, y2: y, stroke: "#4F4F4F", className: "" })));
    };
    exports.default = Line;
});
