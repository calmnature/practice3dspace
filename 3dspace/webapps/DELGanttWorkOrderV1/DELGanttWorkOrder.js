/// <amd-module name="DS/DELGanttWorkOrderV1/DELGanttWorkOrder"/>
define("DS/DELGanttWorkOrderV1/DELGanttWorkOrder", ["require", "exports", "DS/React18Loader/React", "DS/DELGanttCommonV1/DELGanttCommonV1", "DS/DELGanttProvidersV1/DELWorkOrdersToEntriesProvider", "DS/DELGanttProvidersV1/DELTimeConstraintsToLinksProvider", "DS/DELGanttProvidersV1/DELWorkOrdersToNodesProvider", "DS/React18Loader/React", "react"], function (require, exports, React, DELGanttCommonV1_1, DELWorkOrdersToEntriesProvider_1, DELTimeConstraintsToLinksProvider_1, DELWorkOrdersToNodesProvider_1, React_1, react_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
    const DELGanttWorkOrder = (0, React_1.memo)(({ centerDate, children = null, CUD_EventsSOP, CUD_EventsWO, CUD_EventsTC, dataTableTitles = ["Process"], dynamicUsableRows, height = 300, onDynamicTooltip, onTimescaleChanged, onTimescaleClicked, id = "DELGanttWorkOrder", isNodeDraggable = false, isNodeExtendable = false, lang = "en", playerStatus, onDteContextualMenu, workOrders, selectedWorkOrders, mode = { mode: "Planned", setMode: () => { } }, onNodeContextualMenu, isInit, serializedOperations, selectedSerializedOperations, serializedOperationTimeConstraints, timescale, onChunckLoad, onSelection, width = 600 }) => {
        const workOrdersToEntries = (0, React_1.useMemo)(() => (0, DELWorkOrdersToEntriesProvider_1.workOrdersToEntriesProvider)(workOrders, serializedOperations, mode === null || mode === void 0 ? void 0 : mode.mode), [workOrders, serializedOperations, mode === null || mode === void 0 ? void 0 : mode.mode]);
        const workOrdersToNodes = (0, React_1.useMemo)(() => (0, DELWorkOrdersToNodesProvider_1.workOrdersToNodesProvider)(workOrders, mode === null || mode === void 0 ? void 0 : mode.mode), [workOrders, mode === null || mode === void 0 ? void 0 : mode.mode]);
        const serializedOperationTimeConstraintsToLinks = (0, React_1.useMemo)(() => serializedOperationTimeConstraints ? (0, DELTimeConstraintsToLinksProvider_1.timeConstraintsToLinksProvider)(serializedOperationTimeConstraints, mode === null || mode === void 0 ? void 0 : mode.mode) : [], [serializedOperationTimeConstraints]);
        const handleOnSelection = (0, react_1.useCallback)((event) => {
            if (onSelection)
                onSelection(event);
        }, []);
        return (React.createElement(React.Fragment, null,
            React.createElement(DELGanttCommonV1_1.default, { dataTableTitles: dataTableTitles, id: id, serializedOperations: serializedOperations, entries: workOrdersToEntries, nodes: workOrdersToNodes, CUD_EventsSOP: CUD_EventsSOP, CUD_EventsWO: CUD_EventsWO, CUD_EventsTC: CUD_EventsTC, isInit: isInit, links: serializedOperationTimeConstraintsToLinks, onSelection: handleOnSelection, onChunckLoad: onChunckLoad, onTimescaleChanged: onTimescaleChanged, onTimescaleClicked: onTimescaleClicked, onDynamicTooltip: onDynamicTooltip, dteContextualMenu: onDteContextualMenu, nodeContextualMenu: onNodeContextualMenu, dynamicUsableRows: dynamicUsableRows, serializedOperationsConvertWith: "id", selectedSerializedOperations: selectedSerializedOperations, timescale: timescale, entriesToSelect: selectedWorkOrders, width: width, height: height, mode: mode, sortByCol: { colIndex: 0, sortOrder: 'up' }, playerStatus: playerStatus, lang: lang, isNodeDraggable: isNodeDraggable, isNodeExtendable: isNodeExtendable, centerDate: centerDate }, children)));
    });
    DELGanttWorkOrder.displayName = "DELGanttWorkOrder";
    exports.default = DELGanttWorkOrder;
});
