/// <amd-module name="DS/DELGanttProvidersV1/DELSerializedOperationsToEntriesProvider"/>
define("DS/DELGanttProvidersV1/DELSerializedOperationsToEntriesProvider", ["require", "exports", "DS/WebappsUtils/WebappsUtils"], function (require, exports, WebappsUtils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const getDisplayName = (serializedOperations, sopId) => {
        var _a;
        return (_a = Object.values(serializedOperations).find((sop) => sop.id === sopId)) === null || _a === void 0 ? void 0 : _a.displayName;
    };
    const getIcon = (serializedOperations, sopId) => {
        var _a;
        return (_a = Object.values(serializedOperations).find((sop) => sop.id === sopId)) === null || _a === void 0 ? void 0 : _a.icon;
    };
    const applySubEntries = (serializedOperations, serializedOperation, isProcessOP, mode, parentEntrie) => {
        var _a;
        let child = [];
        // If serialized operations is type of Process
        if (isProcessOP) {
            (_a = serializedOperation.childrenOperations) === null || _a === void 0 ? void 0 : _a.forEach((sopId) => {
                child.push({
                    calendarId: [''],
                    id: sopId,
                    parent: serializedOperation.id,
                    values: {
                        col0: {
                            image: WebappsUtils.getWebappsAssetUrl('DELGanttWorkOrderV1', 'icons/32/' + getIcon(serializedOperations, sopId)),
                            text: getDisplayName(serializedOperations, sopId)
                        }
                    },
                    subEntries: [{
                            calendarId: [''],
                            id: `${sopId}_mode`,
                            parent: sopId,
                            values: {
                                col0: {
                                    image: null,
                                    text: mode
                                }
                            }
                        }]
                });
            });
            return child;
        }
        else {
            return [{
                    calendarId: [''],
                    id: `${serializedOperation.id}_mode`,
                    parent: serializedOperation.id,
                    values: {
                        col0: {
                            image: null,
                            text: mode
                        }
                    }
                }];
        }
    };
    /**
     * Add an icon + tooltip to the right of SOP in Gantt datatable if SOp need to be updated.
     * @param { SerializedOperationProp } serializedOperation
     * @returns
     */
    const applyRightIcon = (serializedOperation) => {
        if (serializedOperation === null || serializedOperation === void 0 ? void 0 : serializedOperation.updateSOPFromScheduling) {
            return {
                image: WebappsUtils.getWebappsAssetUrl('DELPlanningChartsV1', 'img/updateOperations.png'),
                tooltip: serializedOperation.updateSOPFromScheduling.tooltip
            };
        }
        else {
            return undefined;
        }
    };
    const serializedOperationsToEntriesProvider = (serializedOperations, mode) => {
        const childrenOperationsProcess = new Map();
        let modeValue = (mode === "Planned") ? "Realized" : "Planned";
        return serializedOperations.map((serializedOperation) => {
            let parentEntrie = '';
            const isProcess = (serializedOperation === null || serializedOperation === void 0 ? void 0 : serializedOperation.type) === "SOp_Type_Process";
            if ((serializedOperation === null || serializedOperation === void 0 ? void 0 : serializedOperation.childrenOperations) && serializedOperation.childrenOperations.length > 0 && isProcess) {
                serializedOperation.childrenOperations.forEach((sopId) => {
                    childrenOperationsProcess.set(sopId, serializedOperation.id);
                });
            }
            if (childrenOperationsProcess.size > 0 && childrenOperationsProcess.has(serializedOperation.id)) {
                //parentEntrie = childrenOperationsProcess.get(serializedOperation.id) as string;
                childrenOperationsProcess.delete(serializedOperation.id);
                return undefined;
            }
            else {
                parentEntrie = serializedOperation.woOwner;
            }
            return {
                calendarId: [''],
                id: serializedOperation.id,
                parent: parentEntrie,
                values: {
                    col0: {
                        image: WebappsUtils.getWebappsAssetUrl('DELGanttWorkOrderV1', 'icons/32/' + serializedOperation.icon),
                        text: serializedOperation === null || serializedOperation === void 0 ? void 0 : serializedOperation.displayName
                    },
                    rightIcon: applyRightIcon(serializedOperation)
                },
                subEntries: applySubEntries(serializedOperations, serializedOperation, isProcess, modeValue, parentEntrie)
            };
        }).filter((entry) => typeof entry !== "undefined");
    };
    exports.default = serializedOperationsToEntriesProvider;
});
