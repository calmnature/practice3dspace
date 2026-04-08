/// <amd-module name="DS/DELTimeManagerV1/subcomponents/DensityLine"/>
define("DS/DELTimeManagerV1/subcomponents/DensityLine", ["require", "exports", "DS/React18Loader/React"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const DensityLine = ({ children, id }) => {
        return (React.createElement("g", { id: id + '-density', className: "pr-none" }, children));
    };
    exports.default = DensityLine;
});
