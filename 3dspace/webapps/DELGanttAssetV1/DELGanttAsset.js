/// <amd-module name="DS/DELGanttAssetV1/DELGanttAsset"/>
define("DS/DELGanttAssetV1/DELGanttAsset", ["require", "exports", "DS/React18Loader/React", "DS/DELGanttCommonV1/DELGanttCommonV1", "DS/DELGanttProvidersV1/DELSerializedResourcesToEntriesProvider", "DS/React18Loader/React"], function (require, exports, React, DELGanttCommonV1_1, DELSerializedResourcesToEntriesProvider_1, React_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
    const DELGanttAsset = (0, React_1.memo)(({ children = null, dataTableTitles = ["Resource", "Organization"], height = 300, onDynamicTooltip, onTimescaleChanged, onTimescaleClicked, id = "DELGanttWorkOrder", lang = "en", playerStatus, dteContextualMenu, mode = { mode: "Planned", setMode: () => { } }, isInit, resourceEvent, serializedOperations, serializedResource, selectedSerializedOperations, selectedSerializedResource, timescale, onChunckLoad, CUD_EventsSOP, CUD_EventsSR, onSelection, width = 600 }) => {
        const sResToEntries = (0, React_1.useMemo)(() => (0, DELSerializedResourcesToEntriesProvider_1.serializedResourcesToEntriesProvider)(serializedResource, mode === null || mode === void 0 ? void 0 : mode.mode), [serializedResource, mode === null || mode === void 0 ? void 0 : mode.mode]);
        const handleOnSelection = (0, React_1.useCallback)((event) => {
            if (onSelection)
                onSelection(event);
        }, []);
        return (React.createElement(React.Fragment, null,
            React.createElement(DELGanttCommonV1_1.default, { dataTableTitles: dataTableTitles, id: id, serializedOperations: serializedOperations, resourceEvent: resourceEvent, entries: sResToEntries, CUD_EventsSOP: CUD_EventsSOP, CUD_EventsSR: CUD_EventsSR, isInit: isInit, onSelection: handleOnSelection, onChunckLoad: onChunckLoad, onTimescaleChanged: onTimescaleChanged, onTimescaleClicked: onTimescaleClicked, onDynamicTooltip: onDynamicTooltip, dteContextualMenu: dteContextualMenu, serializedOperationsConvertWith: "rscAssignment", selectedSerializedOperations: selectedSerializedOperations, timescale: timescale, entriesToSelect: selectedSerializedResource, width: width, height: height, mode: mode, playerStatus: playerStatus, sortByCol: { colIndex: 1, sortOrder: 'up' }, lang: lang }, children)));
    });
    DELGanttAsset.displayName = "DELGanttAsset";
    exports.default = DELGanttAsset;
});
