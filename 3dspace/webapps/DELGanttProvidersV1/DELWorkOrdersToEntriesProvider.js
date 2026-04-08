/// <amd-module name="DS/DELGanttProvidersV1/DELWorkOrdersToEntriesProvider"/>
define("DS/DELGanttProvidersV1/DELWorkOrdersToEntriesProvider", ["require", "exports", "DS/WebappsUtils/WebappsUtils", "DS/DELGanttProvidersV1/DELSerializedOperationsToEntriesProvider"], function (require, exports, WebappsUtils, DELSerializedOperationsToEntriesProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.workOrdersToEntriesProvider = workOrdersToEntriesProvider;
    /**
     * Convert Work Order to entries understood by Gantt
     * @param { WorkOrderProp[] } workOrders Collection of Work Order
     * @param { SerializedOperationProp[] } serializedOperations Collection of Serialized Operations
     * @param { Mode } mode
     * @returns { OneColumnEntry[] } Collection of Entries
     */
    function workOrdersToEntriesProvider(workOrders, serializedOperations, mode) {
        if (typeof workOrders === 'undefined')
            return [];
        return Object.values(workOrders).map((workOrder) => {
            const serializedOperationsForWorkOrder = Object.values(serializedOperations).filter((serializedOperation) => (serializedOperation === null || serializedOperation === void 0 ? void 0 : serializedOperation.woOwner) === workOrder.id && ((serializedOperation === null || serializedOperation === void 0 ? void 0 : serializedOperation.type) === 'SOp_Type_Header' || (serializedOperation === null || serializedOperation === void 0 ? void 0 : serializedOperation.type) === 'SOp_Type_Process' || (serializedOperation === null || serializedOperation === void 0 ? void 0 : serializedOperation.type) === 'SOp_Type_Step'));
            return {
                calendarId: [''],
                id: workOrder === null || workOrder === void 0 ? void 0 : workOrder.id,
                parent: null,
                values: {
                    col0: {
                        image: WebappsUtils.getWebappsAssetUrl('DELGanttWorkOrderV1', 'icons/32/' + workOrder.icon),
                        text: workOrder === null || workOrder === void 0 ? void 0 : workOrder.displayName
                    }
                },
                subEntries: (0, DELSerializedOperationsToEntriesProvider_1.default)(serializedOperationsForWorkOrder, mode)
            };
        });
    }
    ;
});
