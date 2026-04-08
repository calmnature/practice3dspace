/// <amd-module name="DS/DELInfraWeb/typings/DELSliceType"/>
define("DS/DELInfraWeb/typings/DELSliceType", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PXPBACKEND = exports.enDELLoadingInfo = exports.enDELStatus = exports.STATUS_SENDSTATUS_ACTION = void 0;
    exports.STATUS_SENDSTATUS_ACTION = 'sendStatus';
    var enDELStatus;
    (function (enDELStatus) {
        enDELStatus[enDELStatus["critical"] = 0] = "critical";
        enDELStatus[enDELStatus["error"] = 1] = "error";
        enDELStatus[enDELStatus["loading"] = 2] = "loading";
        enDELStatus[enDELStatus["success"] = 3] = "success";
        enDELStatus[enDELStatus["warning"] = 4] = "warning";
    })(enDELStatus || (exports.enDELStatus = enDELStatus = {}));
    var enDELLoadingInfo;
    (function (enDELLoadingInfo) {
        enDELLoadingInfo[enDELLoadingInfo["start"] = 0] = "start";
        enDELLoadingInfo[enDELLoadingInfo["stop"] = 1] = "stop";
    })(enDELLoadingInfo || (exports.enDELLoadingInfo = enDELLoadingInfo = {}));
    exports.PXPBACKEND = "PXPBackend";
});
