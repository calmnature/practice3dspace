/// <amd-module name="DS/DELPXPGanttWOView/store/services/convertBICommputeValue"/>
define("DS/DELPXPGanttWOView/store/services/convertBICommputeValue", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.convertBICommputeValue = void 0;
    const convertBICommputeValue = (backendEntities) => {
        //const oConvertedEntities:any[] = [];
        if (!backendEntities || !backendEntities.hasOwnProperty('objectIds') || !Array.isArray(backendEntities.objectIds) ||
            backendEntities.objectIds.length === 0 || !backendEntities.hasOwnProperty('value') || !backendEntities.hasOwnProperty('ruleId'))
            return [];
        return backendEntities.objectIds.filter((objId) => !objId.includes('WIP')).map((objId) => {
            return {
                id: objId,
                objectId: objId,
                ruleId: backendEntities.ruleId,
                value: backendEntities.value
            };
        });
    };
    exports.convertBICommputeValue = convertBICommputeValue;
});
