/// <amd-module name="DS/DELGanttCommonV1/DELGanttCommonV1"/>
define("DS/DELGanttCommonV1/DELGanttCommonV1", ["require", "exports", "DS/React18Loader/React", "DS/DELPlanningChartsV1/DELPlanningCharts", "DS/DELToolbarSearchV1/DELToolbarSearch", "DS/DELGanttProvidersV1/DELSerializedOperationsToNodesProvider", "DS/DELGanttProvidersV1/DELResourceEventToNodesProvider", "DS/DELPlanningChartsV1/hooks/useCUD_ActionsPlanningCharts", "DS/React18Loader/React", "DS/DELContext/PlayerStatusContext", "css!./assets/css/DELGanttCommonV1.css"], function (require, exports, React, DELPlanningCharts_1, DELToolbarSearch_1, DELSerializedOperationsToNodesProvider_1, DELResourceEventToNodesProvider_1, useCUD_ActionsPlanningCharts_1, React_1, PlayerStatusContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
    const DELGanttCommonV1 = (0, React_1.memo)(({ children = null, CUD_EventsSOP, CUD_EventsSR, CUD_EventsWO, CUD_EventsTC, centerDate, convertDateToPixels, convertPixelsToDate, dataTableTitles, dynamicUsableRows, height = 300, goToDate, onDynamicTooltip, onDteResized, onTimescaleChanged, onTimescaleClicked, id = "DELGanttWorkOrder", isNodeDraggable = false, isNodeExtendable = false, lang = "en", links, playerStatus, dteContextualMenu, entries, entriesToSelect, mode = { mode: "Planned", setMode: () => { } }, nodes, nodeContextualMenu, resize, isInit, resourceEvent, serializedOperations, serializedOperationsConvertWith = 'id', selectedSerializedOperations, timescale, onChunckLoad, onSelection, sortByCol = { colIndex: 0, sortOrder: 'up' }, width = 600 }) => {
        /*const pxpToolbar = useRef<any>(null);
        const pxpToolbarContainer = useRef<HTMLDivElement>(null);*/
        const [isClickedHideShowHeight, setIsClickedHideShowHeight] = (0, React_1.useState)(false);
        const [searchText, setSearchText] = (0, React_1.useState)("");
        const switchRowByMode = (0, React_1.useCallback)((node) => {
            if (mode.mode === "Realized") {
                let newId = "";
                if (node.dteId.includes("_mode")) {
                    newId = node.dteId.split("_mode").shift();
                }
                else {
                    newId = node.dteId + "_mode";
                }
                return { ...node, dteId: newId };
            }
            else {
                return node;
            }
        }, [mode === null || mode === void 0 ? void 0 : mode.mode]);
        const operationsToNodes = (0, React_1.useMemo)(() => {
            return (0, DELSerializedOperationsToNodesProvider_1.serializedOperationsToNodesProvider)(serializedOperations, mode === null || mode === void 0 ? void 0 : mode.mode, serializedOperationsConvertWith, isNodeDraggable, isNodeExtendable).map(switchRowByMode);
        }, [serializedOperations, mode === null || mode === void 0 ? void 0 : mode.mode, isNodeDraggable, isNodeExtendable]);
        const resourceEventToNodes = (0, React_1.useMemo)(() => {
            if (resourceEvent) {
                return (0, DELResourceEventToNodesProvider_1.resourceEventToNodesProvider)(resourceEvent, mode === null || mode === void 0 ? void 0 : mode.mode).map(switchRowByMode);
            }
            else {
                return [];
            }
        }, [resourceEvent, mode === null || mode === void 0 ? void 0 : mode.mode]);
        const allNodes = (0, React_1.useMemo)(() => {
            if (nodes) {
                return operationsToNodes.concat(resourceEventToNodes).concat(nodes);
            }
            else {
                return operationsToNodes.concat(resourceEventToNodes);
            }
        }, [operationsToNodes, resourceEventToNodes, nodes, mode === null || mode === void 0 ? void 0 : mode.mode]);
        const chartOptions = (0, React_1.useMemo)(() => {
            return {
                localCode: lang,
                //autoResize: true,
                calendars: {
                    defaultPointer: 'default',
                    columnLines: {
                        primary: { style: 'dashed' },
                        secondary: { style: 'dashed' },
                    },
                    exceptions: {
                        fontSize: 18,
                        editable: false
                    }
                },
                timescale: {
                    highlightNow: false,
                    fontSize: 12,
                    singleLine: false,
                    backgroundColor: '#3D3D3D',
                    selectedBackgroundColor: '#3D3D3D',
                    textColor: '#fff',
                    borderColor: '#fff',
                    startDate: timescale.startDate,
                    endDate: timescale.endDate,
                },
                datatable: {
                    useCheckbox: false,
                    width: 250,
                    header: {
                        backgroundColor: '#3D3D3D',
                        textColor: '#fff',
                        padding: 20,
                    },
                    line: {
                        borderBottomWidth: 0,
                        height: 30,
                        selectedBackgroundColor: '#00C8C8',
                        highlightedTextColor: '#00C8C8',
                        highlightedBackgroundColor: '#00C8C8',
                    },
                    columns: dataTableTitles.map((title, index) => {
                        return {
                            title: title,
                            width: 1,
                            // sortable: (dataTableTitles.length == 1) ? undefined : 'default',
                            sortable: 'default',
                            dataType: (dataTableTitles.length == 1) ? 'Image' : undefined,
                            style: (dataTableTitles.length == 1) ? { padding: 3 } : undefined,
                            dteProperty: 'col' + index,
                        };
                    }),
                    rightFixedColumns: [
                        {
                            size: 32,
                            dteProperty: 'rightIcon',
                            dataType: 'Image'
                        }
                    ],
                    multilevelGrouping: {
                        textBold: false,
                        textTab: true,
                        alternateSubEntriesColors: false,
                        symbol: 'plus',
                    },
                    showLinesExpander: false,
                    applyFilterOnEmptyResult: true,
                    expandSubEntriesOnFilter: false,
                    autoResizeOnDoubleClick: false,
                },
                node: {
                    unHighlightedTransparency: true,
                    groupingMin: 1000,
                    relativeHeight: 0.9,
                    extendable: (isNodeExtendable) ? true : false,
                    extendingNodeActivationWidth: (isNodeExtendable) ? 5 : undefined,
                    draggingValidationTimer: (isNodeDraggable) ? 300 : undefined,
                    summaryBar: {
                        showNodes: false,
                    },
                    load: {
                        alertLevel: {
                            'low': "#477738",
                            'medium': "#00B8DE",
                            'high': "#E87B00",
                            'urgent': "#EA4F37"
                        }
                    },
                    borderColor: '#B4B6BA',
                    borderWidth: 1,
                    highlightedBorderColor: '#00C8C8',
                    highlightedBorderWidth: 2,
                    nodeGroupShape: 'summaryBar'
                },
                features: {
                    highlightUsableResources: true,
                    calendarNavigation: true
                },
                tags: {
                    margin: 4,
                },
                tooltip: {
                    style: {
                        backgroundColor: '#005686', // #00568699
                        color: 'white',
                        padding: '4px',
                        border: '1px solid #005686',
                        maxWidth: '600px',
                    },
                },
                selection: {
                    node: {
                        color: '#00C8C8',
                        multiselect: 'ctrl'
                    },
                    row: {
                        multiselect: 'ctrl'
                    },
                    sameObjectType: true,
                },
                scrollbar: {
                    background: {
                        color: {
                            default: '#FFF',
                            hover: '#FFF',
                        },
                    },
                    buttons: {
                        color: {
                            default: '#3D3D3D',
                            hover: '#3D3D3D99',
                        },
                        chevron: '#FFF',
                    },
                    bar: {
                        color: {
                            default: '#3D3D3D',
                            hover: '#3D3D3D99',
                        },
                    },
                },
                headHeight: 40,
                localization: {
                    timescaleQuarter: 'Quarter',
                    timescaleAbbreviatedWeek: 'W',
                }
            };
        }, [lang, dataTableTitles]);
        const CUD_Actions = (0, useCUD_ActionsPlanningCharts_1.default)(serializedOperations, CUD_EventsSOP, CUD_EventsSR, CUD_EventsWO, CUD_EventsTC, [], mode === null || mode === void 0 ? void 0 : mode.mode, allNodes, serializedOperationsConvertWith, isNodeDraggable, isNodeExtendable);
        const setOptions = (0, React_1.useMemo)(() => {
            let color = "#005686";
            let colorLighten = "#00568699";
            if (mode && (mode === null || mode === void 0 ? void 0 : mode.mode) === "Planned" || typeof (mode === null || mode === void 0 ? void 0 : mode.mode) === "undefined") {
                color = "#3D3D3D";
                colorLighten = "#3d3d3d99";
            }
            else if (mode && (mode === null || mode === void 0 ? void 0 : mode.mode) === "Realized") {
                color = "#005686";
                colorLighten = "#00568699";
            }
            return [
                { 'timescale.backgroundColor': color },
                { 'timescale.selectedBackgroundColor': color },
                { 'datatable.header.backgroundColor': color },
                { 'scrollbar.buttons.color.default': color },
                { 'scrollbar.buttons.color.hover': colorLighten },
                { 'scrollbar.bar.color.default': color },
                { 'scrollbar.bar.color.hover': colorLighten },
            ];
        }, [mode === null || mode === void 0 ? void 0 : mode.mode]);
        const handleOnClickExpander = (0, React_1.useCallback)(() => {
            setIsClickedHideShowHeight(true);
        }, [height]);
        const handleOnClickIconButton = (0, React_1.useCallback)(() => {
            setIsClickedHideShowHeight(false);
            setSearchText("");
        }, []);
        const handleOnEditorChange = (0, React_1.useCallback)((value) => {
            setSearchText(value);
        }, []);
        const handleOnSelection = (0, React_1.useCallback)((event) => {
            if (onSelection)
                onSelection(event);
        }, []);
        return (React.createElement("div", { "data-testid": "gantt-" + id, style: { overflow: "hidden" } },
            React.createElement(DELToolbarSearch_1.default, { id: id, onClickExpander: handleOnClickExpander, onClickHideBtn: handleOnClickIconButton, onEditorChange: handleOnEditorChange, expanderBackgroundColor: (mode === null || mode === void 0 ? void 0 : mode.mode) == "Realized" ? "#66bcec" : "#B4B6BA", expanderHeight: 48 }),
            React.createElement(PlayerStatusContext_1.PlayerStatusContext.Provider, { value: playerStatus !== null && playerStatus !== void 0 ? playerStatus : { statusValue: "Play_Status_Pause", setStatusValue: () => { } } }, children ? React.cloneElement(children, { children: // Add a children to playerTime children (Gantt)
                React.createElement(DELPlanningCharts_1.default, { id: id, options: chartOptions, nodes: allNodes, entries: entries, links: links, CUD_Action: CUD_Actions, isInit: isInit, onSelection: handleOnSelection, onChunckLoad: onChunckLoad, convertDateToPixels: convertDateToPixels, convertPixelsToDate: convertPixelsToDate, onDteResized: onDteResized, onTimescaleChanged: onTimescaleChanged, onTimescaleClicked: onTimescaleClicked, dteContextualMenu: dteContextualMenu, nodeContextualMenu: nodeContextualMenu, setOptions: setOptions, goToDate: goToDate, centerDate: centerDate, resize: resize, nodesToSelect: entriesToSelect ? [...new Set(entriesToSelect === null || entriesToSelect === void 0 ? void 0 : entriesToSelect.concat(selectedSerializedOperations !== null && selectedSerializedOperations !== void 0 ? selectedSerializedOperations : []))] : selectedSerializedOperations === null || selectedSerializedOperations === void 0 ? void 0 : selectedSerializedOperations.concat(entriesToSelect !== null && entriesToSelect !== void 0 ? entriesToSelect : []), entriesToSelect: selectedSerializedOperations ? [...new Set(selectedSerializedOperations === null || selectedSerializedOperations === void 0 ? void 0 : selectedSerializedOperations.concat(entriesToSelect !== null && entriesToSelect !== void 0 ? entriesToSelect : []))] : entriesToSelect === null || entriesToSelect === void 0 ? void 0 : entriesToSelect.concat(selectedSerializedOperations !== null && selectedSerializedOperations !== void 0 ? selectedSerializedOperations : []), width: width, height: isClickedHideShowHeight ? height - 27 : height, search: searchText, sortByCol: sortByCol, onDynamicTooltip: onDynamicTooltip, setMoveMode: { horizontalMove: isNodeDraggable, verticalMove: isNodeDraggable } }), mode: mode === null || mode === void 0 ? void 0 : mode.mode, width: width, height: isClickedHideShowHeight ? height - 27 : height, search: searchText })
                :
                    React.createElement(DELPlanningCharts_1.default, { id: id, options: chartOptions, nodes: allNodes, entries: entries, links: links, CUD_Action: CUD_Actions, isInit: isInit, onNodeMove: dynamicUsableRows === null || dynamicUsableRows === void 0 ? void 0 : dynamicUsableRows.onNodeMove, dynamicUsableRows: dynamicUsableRows === null || dynamicUsableRows === void 0 ? void 0 : dynamicUsableRows.dynamicUsableRows, onSelection: handleOnSelection, onChunckLoad: onChunckLoad, convertDateToPixels: convertDateToPixels, convertPixelsToDate: convertPixelsToDate, onDteResized: onDteResized, onTimescaleChanged: onTimescaleChanged, onTimescaleClicked: onTimescaleClicked, dteContextualMenu: dteContextualMenu, nodeContextualMenu: nodeContextualMenu, setOptions: setOptions, goToDate: goToDate, centerDate: centerDate, resize: resize, nodesToSelect: entriesToSelect ? [...new Set(entriesToSelect === null || entriesToSelect === void 0 ? void 0 : entriesToSelect.concat(selectedSerializedOperations !== null && selectedSerializedOperations !== void 0 ? selectedSerializedOperations : []))] : selectedSerializedOperations === null || selectedSerializedOperations === void 0 ? void 0 : selectedSerializedOperations.concat(entriesToSelect !== null && entriesToSelect !== void 0 ? entriesToSelect : []), entriesToSelect: selectedSerializedOperations ? [...new Set(selectedSerializedOperations === null || selectedSerializedOperations === void 0 ? void 0 : selectedSerializedOperations.concat(entriesToSelect !== null && entriesToSelect !== void 0 ? entriesToSelect : []))] : entriesToSelect === null || entriesToSelect === void 0 ? void 0 : entriesToSelect.concat(selectedSerializedOperations !== null && selectedSerializedOperations !== void 0 ? selectedSerializedOperations : []), width: width, height: height, search: searchText, sortByCol: sortByCol, onDynamicTooltip: onDynamicTooltip, setMoveMode: { horizontalMove: isNodeDraggable, verticalMove: isNodeDraggable } }))));
    });
    DELGanttCommonV1.displayName = "DELGantt";
    exports.default = DELGanttCommonV1;
});
