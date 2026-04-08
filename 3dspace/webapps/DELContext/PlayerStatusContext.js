/// <amd-module name="DS/DELContext/PlayerStatusContext"/>
define("DS/DELContext/PlayerStatusContext", ["require", "exports", "DS/React18Loader/React"], function (require, exports, React_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PlayerStatusContext = void 0;
    exports.PlayerStatusContext = (0, React_1.createContext)({ statusValue: "Play_Status_Pause", setStatusValue: () => { } });
});
