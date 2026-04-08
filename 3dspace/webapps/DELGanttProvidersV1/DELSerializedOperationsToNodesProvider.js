/// <amd-module name="DS/DELGanttProvidersV1/DELSerializedOperationsToNodesProvider"/>
define("DS/DELGanttProvidersV1/DELSerializedOperationsToNodesProvider", ["require", "exports", "DS/DELGanttProvidersV1/utils/utilsProviders"], function (require, exports, utilsProviders_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSerializedOperationsById = exports.getNodesById = void 0;
    exports.serializedOperationsToNodesProvider = serializedOperationsToNodesProvider;
    /**
     * Convert Serialized Operations to nodes understood by Gantt
     * @param { SerializedOperationProp[] | SerializedOperation } serializedOperations Collection of Serialized Operations
     * @param { Mode } mode
     * @param { serializedOperationsConvertWithProp } serializedOperationsConvertWith
     * @returns { Node[] } Collection of Nodes
     */
    function serializedOperationsToNodesProvider(serializedOperations, mode, serializedOperationsConvertWith = "id", isDraggable = false, isExtendable = false) {
        /**
         * Convert Serialized Operations into Nodes for Gantt
         * If childrenOperations is not empty = Work Order Header ==> not needed
         * @param { SerializedOperationProp } serializedOperations
         * @returns { INode } Returns Actual Node
         */
        const getNodesProviderActual = (serializedOperations, serializedOperationsConvertWith) => {
            if (typeof serializedOperations === 'undefined' || serializedOperations === null || Object.keys(serializedOperations).length === 0)
                return [];
            //@ts-ignore
            return Object.values(serializedOperations).filter((serializedOperation) => { var _a; return typeof serializedOperation !== "undefined" && (((_a = serializedOperation === null || serializedOperation === void 0 ? void 0 : serializedOperation.childrenOperations) === null || _a === void 0 ? void 0 : _a.length) === 0 || serializedOperation.childrenOperations == undefined) && serializedOperation.scheduledStartDate !== "" && serializedOperation.scheduledEndDate !== ""; }).map((node) => convert(node, "Planned", serializedOperationsConvertWith, isDraggable, isExtendable)).filter((node) => typeof node !== 'undefined');
        };
        /**
         * Convert Serialized Operations into Nodes for Gantt
         * @param { SerializedOperationProp } serializedOperations
         * @returns { INode } Returns Scheduled Node
         */
        const getNodesProviderScheduled = (serializedOperations, serializedOperationsConvertWith) => {
            if (typeof serializedOperations === 'undefined' || serializedOperations === null || Object.keys(serializedOperations).length === 0)
                return [];
            if (serializedOperationsConvertWith === 'id') { // Process Gantt
                //@ts-ignore
                return Object.values(serializedOperations).filter((serializedOperation) => typeof serializedOperation !== "undefined").map((node) => convert(node, "Realized", serializedOperationsConvertWith, isDraggable, isExtendable)).filter((node) => typeof node !== 'undefined');
            }
            else { // Asset Gantt
                //@ts-ignore
                return Object.values(serializedOperations).filter((serializedOperation) => { var _a; return typeof serializedOperation !== "undefined" && (((_a = serializedOperation === null || serializedOperation === void 0 ? void 0 : serializedOperation.childrenOperations) === null || _a === void 0 ? void 0 : _a.length) === 0 || serializedOperation.childrenOperations == undefined) && serializedOperation.actualStartDate !== "" && serializedOperation.actualEndDate !== ""; }).map((node) => convert(node, "Realized", serializedOperationsConvertWith, isDraggable, isExtendable)).filter((node) => typeof node !== 'undefined');
            }
        };
        if (typeof serializedOperations === 'undefined' || serializedOperations === null || Object.keys(serializedOperations).length === 0)
            return [];
        if (Object.keys(serializedOperations).length > 0) {
            return [...getNodesProviderActual(serializedOperations, serializedOperationsConvertWith), ...getNodesProviderScheduled(serializedOperations, serializedOperationsConvertWith)];
        }
        else {
            return [convert(serializedOperations, "Planned", serializedOperationsConvertWith, isDraggable, isExtendable), convert(serializedOperations, "Realized", serializedOperationsConvertWith, isDraggable, isExtendable)];
        }
    }
    const convert = (serializedOperations, mode, serializedOperationsConvertWith = "id", isDraggable, isExtendable) => {
        if (serializedOperationsConvertWith === "id") {
            return convertWithId(serializedOperations, mode, isDraggable, isExtendable);
        }
        else if (serializedOperationsConvertWith === "rscAssignment") {
            return convertWithRscAssignment(serializedOperations, mode);
        }
        else {
            return convertWithId(serializedOperations, mode, isDraggable, isExtendable);
        }
    };
    /**
     * Convert one Serialized Operations into one node for Gantt
     * @param { SerializedOperationProp } serializedOperations
     * @param { Mode } mode
     * @returns { Node }
     */
    const convertWithId = (serializedOperations, mode, isDraggable, isExtendable) => {
        return {
            id: (mode === "Realized") ? serializedOperations.id + "_realized" : serializedOperations.id + "_planned",
            draggable: (serializedOperations.type === "SOp_Type_Header" || !isDraggable) ? false : true,
            extendable: (serializedOperations.type === "SOp_Type_Header" || !isExtendable) ? false : true,
            successors: [],
            pxpType: serializedOperations.type,
            color: (0, utilsProviders_1.applyColorSOP)(serializedOperations),
            start: new Date((mode === "Realized") ? serializedOperations.actualStartDate : serializedOperations.scheduledStartDate).getTime(), // scheduled --> actual
            end: new Date((mode === "Realized") ? serializedOperations.actualEndDate : serializedOperations.scheduledEndDate).getTime(),
            dteId: (mode === "Realized") ? serializedOperations.id + "_mode" : serializedOperations.id,
            lines: [serializedOperations.displayName],
            status: serializedOperations.status,
            type: (serializedOperations.type === "SOp_Type_Process") ? 'nodeGroup' : ''
        };
    };
    /**
     * Convert one Serialized Operations into one node for Gantt
     * @param { SerializedOperationProp } serializedOperations
     * @param { Mode } mode
     * @returns { Node }
     */
    const convertWithRscAssignment = (serializedOperations, mode) => {
        return {
            id: (mode === "Realized") ? serializedOperations.id + "_realized" : serializedOperations.id + "_planned",
            color: (0, utilsProviders_1.applyColorSOP)(serializedOperations),
            start: new Date((mode === "Realized") ? serializedOperations.actualStartDate : serializedOperations.scheduledStartDate).getTime(),
            end: new Date((mode === "Realized") ? serializedOperations.actualEndDate : serializedOperations.scheduledEndDate).getTime(),
            dteId: (mode === "Realized") ? serializedOperations._actualRscAssignment[0].assignedSRsc + "_mode" : serializedOperations._scheduledRscAssignment[0].assignedSRsc,
            lines: [serializedOperations.displayName],
            status: serializedOperations.status,
        };
    };
    /**
     * Get Nodes from their id
     * @param { SerializedOperationProp[] } serializedOperations Collection of serialized operations
     * @param { string[] } arrId List of serialized operations's id
     * @param { Mode } mode
     * @returns { Node[] } Returns a collection of Nodes
     */
    const getNodesById = (serializedOperations, arrId, mode, serializedOperationsConvertWith = "id", isDraggable, isExtendable) => {
        if (Object.keys(serializedOperations).length === 0)
            return;
        return Object.values(serializedOperations).filter((operation) => arrId.includes(operation.id)).map((operation) => convert(operation, mode, serializedOperationsConvertWith, isDraggable, isExtendable));
    };
    exports.getNodesById = getNodesById;
    /**
     * Get Serialized Operations from their id
     * @param { SerializedOperationProp[] } serializedOperations Collection of serialized operations
     * @param { string[] } arrId List of serialized operations's id
     * @returns { SerializedOperationProp[] } Returns a collection of SerializedOperation
     */
    const getSerializedOperationsById = (serializedOperations, arrId) => {
        if (!serializedOperations || Object.keys(serializedOperations).length === 0 || !arrId || arrId.length === 0)
            return;
        return ((serializedOperations) ? Object.values(serializedOperations).filter((operation) => arrId.includes(operation.id)) : undefined);
    };
    exports.getSerializedOperationsById = getSerializedOperationsById;
});
