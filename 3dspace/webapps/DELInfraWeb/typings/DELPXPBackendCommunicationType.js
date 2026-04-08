/// <amd-module name="DS/DELInfraWeb/typings/DELPXPBackendCommunicationType"/>
define("DS/DELInfraWeb/typings/DELPXPBackendCommunicationType", ["require", "exports", "DS/DELPXPFoundations/DELPXPFoundations"], function (require, exports, DELPXPFoundations_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BACKEND_RESP_OK = exports.UNSUBSCRIBE_UPDATE = exports.EMPTY_SLICE = exports.BACKEND_RESPONSE = exports.enDELPXPEndPointType = exports.enDELPXPCRUDAction = exports.enDELPXPEndPointAction = exports.enDELPXPStatus = exports.Transport = void 0;
    Object.defineProperty(exports, "Transport", { enumerable: true, get: function () { return DELPXPFoundations_1.Transport; } });
    var enDELPXPStatus;
    (function (enDELPXPStatus) {
        enDELPXPStatus["error"] = "error";
        enDELPXPStatus["pending"] = "pending";
        enDELPXPStatus["success"] = "success";
        enDELPXPStatus["unknown"] = "unknown";
    })(enDELPXPStatus || (exports.enDELPXPStatus = enDELPXPStatus = {}));
    var enDELPXPEndPointAction;
    (function (enDELPXPEndPointAction) {
        enDELPXPEndPointAction["commandStatus"] = "endpoint_commandStatus";
        enDELPXPEndPointAction["connect"] = "endpoint_connection";
        enDELPXPEndPointAction["connectionStatus"] = "endpoint_connectionStatus";
        enDELPXPEndPointAction["creationStatus"] = "endpoint_creationStatus";
        enDELPXPEndPointAction["creation"] = "endpoint_creation";
        enDELPXPEndPointAction["disconnect"] = "endpoint_disconnection";
        enDELPXPEndPointAction["launchCommand"] = "endpoint_launchCommand";
        enDELPXPEndPointAction["unsubscribe"] = "endpoint_unsubscribe";
        //publish = "endpoint_publish",
    })(enDELPXPEndPointAction || (exports.enDELPXPEndPointAction = enDELPXPEndPointAction = {}));
    var enDELPXPCRUDAction;
    (function (enDELPXPCRUDAction) {
        enDELPXPCRUDAction["create"] = "Create";
        enDELPXPCRUDAction["createUpdate"] = "CreateUpdate";
        enDELPXPCRUDAction["read"] = "Read";
        enDELPXPCRUDAction["query"] = "Query";
        enDELPXPCRUDAction["update"] = "Update";
        enDELPXPCRUDAction["delete"] = "Delete";
    })(enDELPXPCRUDAction || (exports.enDELPXPCRUDAction = enDELPXPCRUDAction = {}));
    var enDELPXPEndPointType;
    (function (enDELPXPEndPointType) {
        enDELPXPEndPointType["Session"] = "EndPoint_Session";
        enDELPXPEndPointType["User"] = "EndPoint_User";
    })(enDELPXPEndPointType || (exports.enDELPXPEndPointType = enDELPXPEndPointType = {}));
    ;
    exports.BACKEND_RESPONSE = "backendResponse";
    exports.EMPTY_SLICE = "emptySlice";
    exports.UNSUBSCRIBE_UPDATE = "Unsubscribe";
    exports.BACKEND_RESP_OK = "OK";
});
