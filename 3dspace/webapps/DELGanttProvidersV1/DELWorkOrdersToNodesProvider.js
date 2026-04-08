/// <amd-module name="DS/DELGanttProvidersV1/DELWorkOrdersToNodesProvider"/>
define("DS/DELGanttProvidersV1/DELWorkOrdersToNodesProvider", ["require", "exports", "DS/DELGanttProvidersV1/utils/utilsProviders"], function (require, exports, utilsProviders_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.workOrdersToNodesProvider = workOrdersToNodesProvider;
    function workOrdersToNodesProvider(workOrders, mode) {
        return Object.values(workOrders).map((workOrder) => {
            return {
                id: (mode === "Realized") ? workOrder.id + "_realized" : workOrder.id + "_planned",
                draggable: false,
                extendable: false,
                color: (0, utilsProviders_1.applyColorWO)(workOrder),
                start: new Date((mode === "Realized") ? workOrder.actualStartDate : workOrder.scheduledStartDate).getTime(), // scheduled --> actual
                end: new Date((mode === "Realized") ? workOrder.actualEndDate : workOrder.scheduledEndDate).getTime(),
                dteId: workOrder.id,
                lines: [workOrder.displayName],
                status: workOrder.status,
                type: 'nodeGroup'
            };
        });
    }
    ;
});
