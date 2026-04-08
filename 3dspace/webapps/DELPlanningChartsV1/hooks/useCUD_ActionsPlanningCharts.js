/// <amd-module name="DS/DELPlanningChartsV1/hooks/useCUD_ActionsPlanningCharts"/>
define("DS/DELPlanningChartsV1/hooks/useCUD_ActionsPlanningCharts", ["require", "exports", "DS/React18Loader/React", "DS/DELGanttProvidersV1/DELSerializedOperationsToNodesProvider", "DS/DELGanttProvidersV1/DELSerializedOperationsToEntriesProvider", "DS/DELGanttProvidersV1/DELWorkOrdersToEntriesProvider", "DS/DELGanttProvidersV1/DELWorkOrdersToNodesProvider", "DS/DELGanttProvidersV1/DELSerializedResourcesToEntriesProvider", "DS/DELGanttProvidersV1/DELTimeConstraintsToLinksProvider", "DS/DELPlanningChartsV1/utils/DELPlanningChartsUtils"], function (require, exports, React_1, DELSerializedOperationsToNodesProvider_1, DELSerializedOperationsToEntriesProvider_1, DELWorkOrdersToEntriesProvider_1, DELWorkOrdersToNodesProvider_1, DELSerializedResourcesToEntriesProvider_1, DELTimeConstraintsToLinksProvider_1, DELPlanningChartsUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * CUD_Actions Reducer
     * @param { CUD_Actions } state State
     * @param { ActionsReducer } action Action's name + payload
     * @returns { CUD_Actions }
     */
    function CUD_ActionsReducer(state, { type, payload }) {
        switch (type) {
            case "CREATE_LINK":
                return {
                    ...state,
                    link: { ...state.link, created: payload }
                };
            case "UPDATE_LINK":
                return {
                    ...state,
                    link: { ...state.link, updated: payload }
                };
            case "DELETE_LINK":
                return {
                    ...state,
                    link: { ...state.link, deleted: payload }
                };
            case "CREATE_NODE":
                return {
                    ...state,
                    node: { ...state.node, created: payload }
                };
            case "UPDATE_NODE":
                return {
                    ...state,
                    node: { ...state.node, updated: payload }
                };
            case "DELETE_NODE":
                return {
                    ...state,
                    node: { ...state.node, deleted: payload }
                };
            case "CREATE_SUBENTRIES_ROW":
                return {
                    ...state,
                    subEntries_row: { ...state.subEntries_row, created: payload }
                };
            case "CREATE_ROW":
                return {
                    ...state,
                    row: { ...state.row, created: payload }
                };
            case "UPDATE_ROW":
                return {
                    ...state,
                    row: { ...state.row, updated: payload }
                };
            case "DELETE_ROW":
                const deletedPayload = [];
                //@ts-ignore
                payload.forEach((row) => {
                    deletedPayload.push(row, row + "_mode");
                });
                return {
                    ...state,
                    row: { ...state.row, deleted: deletedPayload }
                };
            default:
                return state;
        }
    }
    /**
     * Converts a CUD_Events object into a CUD_Actions object understandable for the Gantt
     * @param { CUD_Events } CUD_EventsSOP CUD of serialized operations
     * @param { CUD_Events } CUD_EventsSR CUD of serialized resources
     * @param { CUD_Events } CUD_EventsWO CUD of work orders
     * @param { CUD_Events } CUD_EventsTC CUD of Time Constraintes
     * @param { UpdateOperationsColor[] } updateOperationsColor
     * @param { Mode } mode
     * @param { Node[] } operationsToNodes
     * @param { SerializedOperationsConvertWithProp } serializedOperationsConvertWith
     * @returns { CUD_Actions }
     */
    const useCUD_ActionsPlanningCharts = (serializedOperations, CUD_EventsSOP, CUD_EventsSR, CUD_EventsWO, CUD_EventsTC, updateOperationsColor, mode, operationsToNodes, serializedOperationsConvertWith, isDraggable, isExtendable) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const [CUD_Actions, dispatch] = (0, React_1.useReducer)(CUD_ActionsReducer, { node: {}, row: {}, link: {} });
        if (typeof mode == 'undefined')
            mode = "Planned";
        if (typeof serializedOperationsConvertWith == 'undefined')
            serializedOperationsConvertWith = "id";
        (0, React_1.useEffect)(() => {
            if (updateOperationsColor && Object.keys(updateOperationsColor).length > 0) {
                //dispatch({ type: "UPDATE_NODE", payload: serializedOperationsToNodesProvider(updateOperationsColor, mode)});
                dispatch({ type: "UPDATE_NODE", payload: updateOperationsColor });
            }
        }, [updateOperationsColor]);
        (0, React_1.useEffect)(() => {
            var _a, _b;
            if (((_a = CUD_EventsTC === null || CUD_EventsTC === void 0 ? void 0 : CUD_EventsTC.timeConstraintes) === null || _a === void 0 ? void 0 : _a.updated) && Object.keys((_b = CUD_EventsTC === null || CUD_EventsTC === void 0 ? void 0 : CUD_EventsTC.timeConstraintes) === null || _b === void 0 ? void 0 : _b.updated).length > 0) {
                //@ts-ignore
                dispatch({ type: "UPDATE_LINK", payload: (0, DELTimeConstraintsToLinksProvider_1.timeConstraintsToLinksProvider)(CUD_EventsTC.timeConstraintes.updated, mode) });
            }
        }, [(_a = CUD_EventsTC === null || CUD_EventsTC === void 0 ? void 0 : CUD_EventsTC.timeConstraintes) === null || _a === void 0 ? void 0 : _a.updated]);
        (0, React_1.useEffect)(() => {
            var _a, _b;
            if (((_a = CUD_EventsTC === null || CUD_EventsTC === void 0 ? void 0 : CUD_EventsTC.timeConstraintes) === null || _a === void 0 ? void 0 : _a.deleted) && Object.keys((_b = CUD_EventsTC === null || CUD_EventsTC === void 0 ? void 0 : CUD_EventsTC.timeConstraintes) === null || _b === void 0 ? void 0 : _b.deleted).length > 0) {
                dispatch({ type: "DELETE_LINK", payload: CUD_EventsTC.timeConstraintes.deleted });
            }
        }, [(_b = CUD_EventsTC === null || CUD_EventsTC === void 0 ? void 0 : CUD_EventsTC.timeConstraintes) === null || _b === void 0 ? void 0 : _b.deleted]);
        (0, React_1.useEffect)(() => {
            var _a, _b;
            if (((_a = CUD_EventsTC === null || CUD_EventsTC === void 0 ? void 0 : CUD_EventsTC.timeConstraintes) === null || _a === void 0 ? void 0 : _a.created) && Object.keys((_b = CUD_EventsTC === null || CUD_EventsTC === void 0 ? void 0 : CUD_EventsTC.timeConstraintes) === null || _b === void 0 ? void 0 : _b.created).length > 0) {
                //@ts-ignore
                dispatch({ type: "CREATE_LINK", payload: (0, DELTimeConstraintsToLinksProvider_1.timeConstraintsToLinksProvider)(CUD_EventsTC.timeConstraintes.created, mode) });
            }
        }, [(_c = CUD_EventsTC === null || CUD_EventsTC === void 0 ? void 0 : CUD_EventsTC.timeConstraintes) === null || _c === void 0 ? void 0 : _c.created]);
        (0, React_1.useEffect)(() => {
            var _a;
            if (((_a = CUD_EventsSOP === null || CUD_EventsSOP === void 0 ? void 0 : CUD_EventsSOP.serializedOperations) === null || _a === void 0 ? void 0 : _a.updated) && Object.keys(CUD_EventsSOP.serializedOperations.updated).length > 0) {
                if (serializedOperationsConvertWith == "id") { // If Gantt WO
                    dispatch({ type: "UPDATE_ROW", payload: (0, DELSerializedOperationsToEntriesProvider_1.default)(CUD_EventsSOP.serializedOperations.updated, mode) });
                    //@ts-ignore
                    dispatch({ type: "UPDATE_NODE", payload: (0, DELSerializedOperationsToNodesProvider_1.serializedOperationsToNodesProvider)(CUD_EventsSOP.serializedOperations.updated, mode, serializedOperationsConvertWith, isDraggable, isExtendable) });
                }
                else {
                    //@ts-ignore
                    dispatch({ type: "UPDATE_NODE", payload: (0, DELSerializedOperationsToNodesProvider_1.serializedOperationsToNodesProvider)(CUD_EventsSOP.serializedOperations.updated, mode, serializedOperationsConvertWith, isDraggable, isExtendable) });
                }
            }
        }, [(_d = CUD_EventsSOP === null || CUD_EventsSOP === void 0 ? void 0 : CUD_EventsSOP.serializedOperations) === null || _d === void 0 ? void 0 : _d.updated]);
        (0, React_1.useEffect)(() => {
            var _a;
            if (((_a = CUD_EventsSOP === null || CUD_EventsSOP === void 0 ? void 0 : CUD_EventsSOP.serializedOperations) === null || _a === void 0 ? void 0 : _a.deleted) && Object.keys(CUD_EventsSOP.serializedOperations.deleted).length > 0) {
                if (serializedOperationsConvertWith == "id") { // If Gantt WO
                    dispatch({ type: "DELETE_ROW", payload: CUD_EventsSOP.serializedOperations.deleted });
                    dispatch({ type: "DELETE_NODE", payload: (0, DELPlanningChartsUtils_1.findAllNodesIds)(CUD_EventsSOP.serializedOperations.deleted) });
                }
                else {
                    dispatch({ type: "DELETE_NODE", payload: CUD_EventsSOP.serializedOperations.deleted });
                }
            }
        }, [(_e = CUD_EventsSOP === null || CUD_EventsSOP === void 0 ? void 0 : CUD_EventsSOP.serializedOperations) === null || _e === void 0 ? void 0 : _e.deleted]);
        (0, React_1.useEffect)(() => {
            var _a;
            if (((_a = CUD_EventsSOP === null || CUD_EventsSOP === void 0 ? void 0 : CUD_EventsSOP.serializedOperations) === null || _a === void 0 ? void 0 : _a.created) && Object.keys(CUD_EventsSOP.serializedOperations.created).length > 0) {
                if (serializedOperationsConvertWith == "id") { // If Gantt WO
                    dispatch({ type: "CREATE_SUBENTRIES_ROW", payload: (0, DELSerializedOperationsToEntriesProvider_1.default)(CUD_EventsSOP.serializedOperations.created, mode) });
                    //@ts-ignore
                    dispatch({ type: "CREATE_NODE", payload: (0, DELSerializedOperationsToNodesProvider_1.serializedOperationsToNodesProvider)(CUD_EventsSOP.serializedOperations.created, mode, serializedOperationsConvertWith, isDraggable, isExtendable) });
                }
                else {
                    //@ts-ignore
                    dispatch({ type: "CREATE_NODE", payload: (0, DELSerializedOperationsToNodesProvider_1.serializedOperationsToNodesProvider)(CUD_EventsSOP.serializedOperations.created, mode, serializedOperationsConvertWith, isDraggable, isExtendable) });
                }
            }
        }, [(_f = CUD_EventsSOP === null || CUD_EventsSOP === void 0 ? void 0 : CUD_EventsSOP.serializedOperations) === null || _f === void 0 ? void 0 : _f.created]);
        (0, React_1.useEffect)(() => {
            var _a;
            if (((_a = CUD_EventsWO === null || CUD_EventsWO === void 0 ? void 0 : CUD_EventsWO.workOrders) === null || _a === void 0 ? void 0 : _a.updated) && Object.keys(CUD_EventsWO.workOrders.updated).length > 0) {
                if (serializedOperationsConvertWith == "id") { // If Gantt WO
                    dispatch({ type: "UPDATE_ROW", payload: (0, DELWorkOrdersToEntriesProvider_1.workOrdersToEntriesProvider)(CUD_EventsWO.workOrders.updated, serializedOperations, mode) });
                    dispatch({ type: "UPDATE_NODE", payload: (0, DELWorkOrdersToNodesProvider_1.workOrdersToNodesProvider)(CUD_EventsWO.workOrders.updated, mode) });
                }
                else {
                    dispatch({ type: "UPDATE_ROW", payload: (0, DELWorkOrdersToEntriesProvider_1.workOrdersToEntriesProvider)(CUD_EventsWO.workOrders.updated, serializedOperations, mode) });
                }
            }
        }, [(_g = CUD_EventsWO === null || CUD_EventsWO === void 0 ? void 0 : CUD_EventsWO.workOrders) === null || _g === void 0 ? void 0 : _g.updated]);
        (0, React_1.useEffect)(() => {
            var _a;
            if (((_a = CUD_EventsWO === null || CUD_EventsWO === void 0 ? void 0 : CUD_EventsWO.workOrders) === null || _a === void 0 ? void 0 : _a.deleted) && Object.keys(CUD_EventsWO.workOrders.deleted).length > 0) {
                if (serializedOperationsConvertWith == "id") { // If Gantt WO
                    dispatch({ type: "DELETE_ROW", payload: CUD_EventsWO.workOrders.deleted });
                    dispatch({ type: "DELETE_NODE", payload: (0, DELPlanningChartsUtils_1.findAllNodesIds)(CUD_EventsWO.workOrders.deleted) });
                }
                else {
                    dispatch({ type: "DELETE_ROW", payload: CUD_EventsWO.workOrders.deleted });
                }
            }
        }, [(_h = CUD_EventsWO === null || CUD_EventsWO === void 0 ? void 0 : CUD_EventsWO.workOrders) === null || _h === void 0 ? void 0 : _h.deleted]);
        (0, React_1.useEffect)(() => {
            var _a;
            if (((_a = CUD_EventsWO === null || CUD_EventsWO === void 0 ? void 0 : CUD_EventsWO.workOrders) === null || _a === void 0 ? void 0 : _a.created) && Object.keys(CUD_EventsWO.workOrders.created).length > 0) {
                //@ts-ignore
                dispatch({ type: "CREATE_ROW", payload: (0, DELWorkOrdersToEntriesProvider_1.workOrdersToEntriesProvider)(CUD_EventsWO.workOrders.created, serializedOperations, mode) });
            }
        }, [(_j = CUD_EventsWO === null || CUD_EventsWO === void 0 ? void 0 : CUD_EventsWO.workOrders) === null || _j === void 0 ? void 0 : _j.created]);
        (0, React_1.useEffect)(() => {
            var _a;
            if (((_a = CUD_EventsSR === null || CUD_EventsSR === void 0 ? void 0 : CUD_EventsSR.serializedResources) === null || _a === void 0 ? void 0 : _a.updated) && Object.keys(CUD_EventsSR.serializedResources.updated).length > 0) {
                dispatch({ type: "UPDATE_ROW", payload: (0, DELSerializedResourcesToEntriesProvider_1.serializedResourcesToEntriesProvider)(CUD_EventsSR.serializedResources.updated, mode) });
            }
        }, [(_k = CUD_EventsSR === null || CUD_EventsSR === void 0 ? void 0 : CUD_EventsSR.serializedResources) === null || _k === void 0 ? void 0 : _k.updated]);
        (0, React_1.useEffect)(() => {
            var _a;
            if (((_a = CUD_EventsSR === null || CUD_EventsSR === void 0 ? void 0 : CUD_EventsSR.serializedResources) === null || _a === void 0 ? void 0 : _a.deleted) && Object.keys(CUD_EventsSR.serializedResources.deleted).length > 0) {
                dispatch({ type: "DELETE_ROW", payload: CUD_EventsSR.serializedResources.deleted });
            }
        }, [(_l = CUD_EventsSR === null || CUD_EventsSR === void 0 ? void 0 : CUD_EventsSR.serializedResources) === null || _l === void 0 ? void 0 : _l.deleted]);
        (0, React_1.useEffect)(() => {
            var _a;
            if (((_a = CUD_EventsSR === null || CUD_EventsSR === void 0 ? void 0 : CUD_EventsSR.serializedResources) === null || _a === void 0 ? void 0 : _a.created) && Object.keys(CUD_EventsSR.serializedResources.created).length > 0) {
                dispatch({ type: "CREATE_ROW", payload: (0, DELSerializedResourcesToEntriesProvider_1.serializedResourcesToEntriesProvider)(CUD_EventsSR.serializedResources.created, mode) });
            }
        }, [(_m = CUD_EventsSR === null || CUD_EventsSR === void 0 ? void 0 : CUD_EventsSR.serializedResources) === null || _m === void 0 ? void 0 : _m.created]);
        (0, React_1.useEffect)(() => {
            var _a, _b;
            if (((_a = CUD_EventsWO === null || CUD_EventsWO === void 0 ? void 0 : CUD_EventsWO.workOrders) === null || _a === void 0 ? void 0 : _a.created) && Object.keys(CUD_EventsWO.workOrders.created).length > 0 && serializedOperationsConvertWith == "id" && operationsToNodes) {
                //@ts-ignore
                dispatch({ type: "UPDATE_ROW", payload: (0, DELWorkOrdersToEntriesProvider_1.workOrdersToEntriesProvider)(CUD_EventsWO.workOrders.created, serializedOperations, mode) });
                dispatch({ type: "UPDATE_NODE", payload: operationsToNodes });
            }
            else if (((_b = CUD_EventsSR === null || CUD_EventsSR === void 0 ? void 0 : CUD_EventsSR.serializedResources) === null || _b === void 0 ? void 0 : _b.created) && operationsToNodes && Object.keys(CUD_EventsSR.serializedResources.created).length > 0 && serializedOperationsConvertWith == "rscAssignment") {
                //@ts-ignore
                dispatch({ type: "UPDATE_ROW", payload: (0, DELSerializedResourcesToEntriesProvider_1.serializedResourcesToEntriesProvider)(CUD_EventsSR.serializedResources.created, mode) });
                dispatch({ type: "UPDATE_NODE", payload: operationsToNodes });
            }
        }, [operationsToNodes]);
        return CUD_Actions;
    };
    exports.default = useCUD_ActionsPlanningCharts;
});
