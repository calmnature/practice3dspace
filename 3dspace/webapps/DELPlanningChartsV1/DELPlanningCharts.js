/// <amd-module name="DS/DELPlanningChartsV1/DELPlanningCharts"/>
define("DS/DELPlanningChartsV1/DELPlanningCharts", ["require", "exports", "DS/React18Loader/React", "DS/DELGanttOrtems/webgantt", "DS/React18Loader/React", "DS/DELPlanningChartsV1/utils/DELPlanningChartsUtils", "DS/Core/WebUXGlobalEnums"], function (require, exports, React, Gantt, React_1, DELPlanningChartsUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const DELPlanningCharts = (0, React_1.memo)(({ convertDateToPixels, convertPixelsToDate, height = 300, options, mode = 0, nodes, nodeContextualMenu, nodesToSelect, entries, entriesToSelect, goToDate, getBirdviewNodes, _centerDate, centerDate, id = "myGanttContainer", links, onDynamicTooltip, onEmptyClick, onChunckLoad, onSelection, onTimescaleChanged, onTimescaleClicked, isZooming, onDteResized, onNodeDblClick, onNodeMove, resize, rowHeight = false, dteContextualMenu, dynamicUsableRows, search, setOptions, CUD_Action, isInit, setMoveMode = { horizontalMove: false, verticalMove: false }, sortByCol = { colIndex: 0, sortOrder: 'up' }, width = 600 }) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const ref = (0, React_1.useRef)(null);
        const gantt = (0, React_1.useRef)(null);
        const _didMount = (0, React_1.useRef)(false);
        const dteSelectedIdRef = (0, React_1.useRef)([]);
        const nodeSelectedIdRef = (0, React_1.useRef)([]);
        const isDraggingGantt = (0, React_1.useRef)(false);
        (0, React_1.useEffect)(() => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            //@ts-ignore
            gantt.current = Gantt.create(id, options);
            if (gantt.current !== null) {
                //@ts-ignore
                if (convertDateToPixels)
                    convertDateToPixels((_b = (_a = gantt.current) === null || _a === void 0 ? void 0 : _a.timescale) === null || _b === void 0 ? void 0 : _b.getPixels);
                //@ts-ignore
                if (convertPixelsToDate)
                    convertPixelsToDate((_d = (_c = gantt.current) === null || _c === void 0 ? void 0 : _c.timescale) === null || _d === void 0 ? void 0 : _d.getDate);
                if (goToDate)
                    goToDate((_f = (_e = gantt.current) === null || _e === void 0 ? void 0 : _e.timescale) === null || _f === void 0 ? void 0 : _f.gotoDate);
                //@ts-ignore
                if (_centerDate)
                    _centerDate((_h = (_g = gantt.current) === null || _g === void 0 ? void 0 : _g.timescale) === null || _h === void 0 ? void 0 : _h.centerDate);
                //@ts-ignore
                if (centerDate)
                    centerDate((_k = (_j = gantt.current) === null || _j === void 0 ? void 0 : _j.timescale) === null || _k === void 0 ? void 0 : _k.centerDate);
                if (resize)
                    resize((_l = gantt.current) === null || _l === void 0 ? void 0 : _l.resize);
                //@ts-ignore
                if (getBirdviewNodes)
                    getBirdviewNodes(Gantt.getBirdviewNodes);
                //@ts-ignore
                const loader = Gantt.createCustomDataLoader({
                    chunkSize: 31540000000,
                    loaderCallbacks: {
                        link: {
                            onInit: (onSuccess, onError) => {
                                try {
                                    if (links) {
                                        onSuccess(links);
                                    }
                                }
                                catch (error) {
                                    onError('Error : ' + error);
                                }
                            }
                        },
                        datatable: {
                            onInit: (onSuccess, onError) => {
                                try {
                                    if (entries) {
                                        onSuccess(entries);
                                        //@ts-ignore
                                        gantt.current.datatable.sortByCol(sortByCol.colIndex, sortByCol.sortOrder);
                                        if (rowHeight) {
                                            //@ts-ignore
                                            gantt.current.datatable.rowHeight = 76 / gantt.current.data.row.list().length;
                                        }
                                    }
                                }
                                catch (error) {
                                    onError('Error : ' + error);
                                }
                            }
                        },
                        nodes: {
                            onInit: (startDate, endDate, onSuccess, onError) => {
                                try {
                                    if (nodes && gantt.current !== null && gantt.current.data.node.list().length === 0) {
                                        onSuccess(nodes);
                                    }
                                }
                                catch (error) {
                                    onError('Error : ' + error);
                                }
                                if (onChunckLoad) {
                                    onChunckLoad({ startDate: new Date(startDate), endDate: new Date(endDate), onSuccess: onSuccess, onError: onError });
                                }
                            },
                            onLoad: (startDate, endDate, onSuccess, onError) => {
                                try {
                                    if (nodes && gantt.current !== null && gantt.current.data.node.list().length === 0) {
                                        onSuccess(nodes);
                                    }
                                }
                                catch (error) {
                                    onError('Error : ' + error);
                                }
                                if (onChunckLoad) {
                                    onChunckLoad({ startDate: new Date(startDate), endDate: new Date(endDate), onSuccess: onSuccess, onError: onError });
                                }
                            }
                        }
                    }
                });
                gantt.current.setDataLoader(loader);
                //@ts-ignore
                if (dynamicUsableRows)
                    gantt.current.node.dynamicUsableRows = dynamicUsableRows;
                //@ts-ignore
                gantt.current.registerEvent('data.initialized', () => {
                    if (isInit)
                        isInit(true);
                });
                //@ts-ignore
                gantt.current.datatable.sortByCol(sortByCol.colIndex, sortByCol.sortOrder);
                _didMount.current = true;
                if (links && links.length > 0) {
                    gantt.current.data.updateDataset({ link: { create: links } });
                }
                if (gantt.current) {
                    gantt.current.registerEvent('dte.select', handleDteSelected);
                    gantt.current.registerEvent('dte.unselect', handleDteUnselected);
                    gantt.current.registerEvent('node.select', handleNodeSelected);
                    gantt.current.registerEvent('node.unselect', handleNodeUnselected);
                    gantt.current.registerEvent('node.dblclick', handleNodeDblclick);
                    gantt.current.registerEvent('timescale.changed', handleTimescaleChanged);
                    gantt.current.registerEvent('datatable.resized', handleDteResized);
                    gantt.current.registerEvent('timescale.click', handleTimescaleClick);
                    gantt.current.registerEvent('empty.click', handleEmptyClick);
                    if (onNodeMove)
                        gantt.current.registerEvent("node.move", onNodeMove);
                    //@ts-ignore
                    if (onDteResized)
                        onDteResized({ width: gantt.current.datatable.width, columns: gantt.current.datatable.columns });
                }
            }
            // Specify how to clean up after this effect:
            return function cleanup() {
                if (gantt.current !== null) {
                    gantt.current.unregisterEvent('dte.select');
                    gantt.current.unregisterEvent('dte.unselect');
                    gantt.current.unregisterEvent('node.select');
                    gantt.current.unregisterEvent('node.unselect');
                    gantt.current.unregisterEvent('node.dblclick');
                    gantt.current.unregisterEvent('timescale.changed');
                    gantt.current.unregisterEvent('datatable.resized');
                    gantt.current.unregisterEvent('timescale.click');
                    gantt.current.unregisterEvent('empty.click');
                    gantt.current.unregisterEvent('node.move');
                }
            };
        }, []);
        (0, React_1.useEffect)(() => {
            if (gantt.current && links) {
                gantt.current.data.updateDataset({ link: { create: links } });
            }
        }, [gantt.current, links]);
        if (gantt.current !== null && onDynamicTooltip) {
            //@ts-ignore
            gantt.current.node.dynamicTooltip = (node) => {
                return onDynamicTooltip(node);
            };
        }
        const handleNodeDblclick = (dblclick) => {
            if (onNodeDblClick)
                onNodeDblClick(dblclick);
        };
        const handleDteResized = () => {
            //@ts-ignore
            if (onDteResized)
                onDteResized({ width: gantt.current.datatable.width, columns: gantt.current.datatable.columns });
        };
        const handleTimescaleChanged = (timescale) => {
            isDraggingGantt.current = true;
            if (isZooming)
                isZooming(timescale.zoom);
            if (onTimescaleChanged)
                onTimescaleChanged({ start: new Date(timescale.start), end: new Date(timescale.end) });
        };
        const handleNodeUnselected = (0, React_1.useCallback)((nodeUnselectedId) => {
            nodeUnselectedId.selected.forEach((unselectedID) => {
                nodeSelectedIdRef.current.splice(nodeSelectedIdRef.current.indexOf(unselectedID), 1);
            });
            if (onSelection)
                onSelection({ nodes: nodeSelectedIdRef.current, entries: dteSelectedIdRef.current });
        }, [nodesToSelect]);
        const handleNodeSelected = (0, React_1.useCallback)(() => {
            var _a;
            if ((_a = gantt.current) === null || _a === void 0 ? void 0 : _a.selection)
                nodeSelectedIdRef.current = gantt.current.selection.nodes.map((node) => (0, DELPlanningChartsUtils_1.getOriginalId)(node.id));
            if (onSelection)
                onSelection({ nodes: nodeSelectedIdRef.current, entries: dteSelectedIdRef.current });
        }, [nodesToSelect]);
        (0, React_1.useEffect)(() => {
            if (gantt.current) {
                gantt.current.unregisterEvent('node.select');
                gantt.current.registerEvent('node.select', handleNodeSelected);
            }
            return () => {
                if (gantt.current) {
                    gantt.current.unregisterEvent('node.select');
                }
            };
        }, [handleNodeSelected]);
        const handleDteSelected = (0, React_1.useCallback)((dteSelectedID) => {
            const dteId = dteSelectedID;
            if (dteSelectedIdRef.current.includes(dteId) === false) {
                dteSelectedIdRef.current.push(dteId);
            }
            if (onSelection)
                onSelection({ nodes: nodeSelectedIdRef.current, entries: dteSelectedIdRef.current });
        }, [nodesToSelect, entriesToSelect]);
        (0, React_1.useEffect)(() => {
            if (gantt.current) {
                gantt.current.unregisterEvent('dte.select');
                gantt.current.registerEvent('dte.select', handleDteSelected);
            }
            return () => {
                if (gantt.current) {
                    gantt.current.unregisterEvent('dte.select');
                }
            };
        }, [handleDteSelected]);
        const handleDteUnselected = (0, React_1.useCallback)((dteUnselected) => {
            dteSelectedIdRef.current.splice(dteSelectedIdRef.current.indexOf(dteUnselected), 1);
            if (onSelection)
                onSelection({ nodes: nodeSelectedIdRef.current, entries: dteSelectedIdRef.current });
        }, [nodesToSelect, entriesToSelect]);
        (0, React_1.useEffect)(() => {
            if (gantt.current) {
                gantt.current.unregisterEvent('dte.unselect');
                gantt.current.registerEvent('dte.unselect', handleDteUnselected);
            }
            return () => {
                if (gantt.current) {
                    gantt.current.unregisterEvent('dte.unselect');
                }
            };
        }, [handleDteUnselected]);
        const handleTimescaleClick = (click) => {
            if (onTimescaleClicked)
                onTimescaleClicked(click);
        };
        const handleEmptyClick = (0, React_1.useCallback)((event) => {
            if (isDraggingGantt.current) { // If 
                isDraggingGantt.current = false;
                return;
            }
            if (onEmptyClick)
                onEmptyClick(event);
            dteSelectedIdRef.current = [];
            nodeSelectedIdRef.current = [];
            if (onSelection)
                onSelection({ nodes: [], entries: [] });
        }, [nodesToSelect, entriesToSelect]);
        (0, React_1.useEffect)(() => {
            if (gantt.current) {
                gantt.current.unregisterEvent('empty.click');
                gantt.current.registerEvent('empty.click', handleEmptyClick);
            }
            return () => {
                if (gantt.current) {
                    gantt.current.unregisterEvent('empty.click');
                }
            };
        }, [handleEmptyClick]);
        (0, React_1.useEffect)(() => {
            if (gantt.current) {
                gantt.current.unregisterEvent('timescale.click');
                gantt.current.registerEvent('timescale.click', handleTimescaleClick);
            }
            return () => {
                if (gantt.current) {
                    gantt.current.unregisterEvent('timescale.click');
                }
            };
        }, [handleTimescaleClick]);
        (0, React_1.useEffect)(() => {
            //@ts-ignore
            if (gantt && gantt.current !== null && gantt.current.datatable && dteContextualMenu) {
                //@ts-ignore
                gantt.current.datatable.contextMenu = dteContextualMenu; // contextMenuAsync
            }
        }, [dteContextualMenu, gantt.current]);
        (0, React_1.useEffect)(() => {
            //@ts-ignore
            if (gantt && gantt.current !== null && gantt.current.datatable && nodeContextualMenu) {
                //@ts-ignore
                gantt.current.node.contextMenu = nodeContextualMenu; // contextMenuAsync
            }
        }, [nodeContextualMenu, gantt.current]);
        (0, React_1.useEffect)(() => {
            if (gantt.current) {
                //@ts-ignore
                gantt.current.node.setMoveMode(setMoveMode.horizontalMove, setMoveMode.verticalMove);
            }
        }, [setMoveMode, gantt.current]);
        (0, React_1.useEffect)(() => {
            if (gantt && gantt.current !== null) {
                gantt.current.resize(width, height);
            }
        }, [width, height, gantt.current]);
        (0, React_1.useEffect)(() => {
            if (search && gantt.current !== null) {
                //@ts-ignore
                gantt.current.search.text(search);
            }
            else if (search === "" && gantt.current !== null) {
                //@ts-ignore
                gantt.current.search.cancel();
            }
        }, [search, gantt.current]);
        (0, React_1.useEffect)(() => {
            var _a, _b;
            if (gantt.current !== null && ((_a = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.row) === null || _a === void 0 ? void 0 : _a.updated) && _didMount.current) {
                /*gantt.current.data.updateDataset({ row : { remove: CUD_Action?.row?.updated.map((entrie: any) => entrie.id) } });
                gantt.current.data.updateDataset({ row : { create: CUD_Action?.row?.updated.map((row: OneColumnEntry) => {  return {...row, level: 1} }) } });*/
                gantt.current.data.updateDataset({ row: { update: (_b = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.row) === null || _b === void 0 ? void 0 : _b.updated.map((row) => { return { ...row, level: 1 }; }) } });
                //@ts-ignore
                gantt.current.datatable.sortByCol(sortByCol.colIndex, sortByCol.sortOrder);
            }
        }, [(_a = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.row) === null || _a === void 0 ? void 0 : _a.updated]);
        (0, React_1.useEffect)(() => {
            var _a, _b;
            if (gantt.current !== null && ((_a = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.row) === null || _a === void 0 ? void 0 : _a.deleted) && _didMount.current) {
                gantt.current.data.updateDataset({ row: { remove: (_b = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.row) === null || _b === void 0 ? void 0 : _b.deleted } });
                //@ts-ignore
                gantt.current.datatable.sortByCol(sortByCol.colIndex, sortByCol.sortOrder);
            }
        }, [(_b = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.row) === null || _b === void 0 ? void 0 : _b.deleted]);
        (0, React_1.useEffect)(() => {
            var _a, _b;
            if (gantt.current !== null && ((_a = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.row) === null || _a === void 0 ? void 0 : _a.created) && _didMount.current) {
                gantt.current.data.updateDataset({ row: { create: (_b = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.row) === null || _b === void 0 ? void 0 : _b.created } });
                //@ts-ignore
                gantt.current.datatable.sortByCol(sortByCol.colIndex, sortByCol.sortOrder);
            }
        }, [(_c = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.row) === null || _c === void 0 ? void 0 : _c.created]);
        (0, React_1.useEffect)(() => {
            var _a, _b, _c;
            if (gantt.current !== null && ((_a = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.subEntries_row) === null || _a === void 0 ? void 0 : _a.created) && CUD_Action.subEntries_row.created.length > 0 && _didMount.current) {
                gantt.current.data.updateDataset({ row: { create: (_b = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.subEntries_row) === null || _b === void 0 ? void 0 : _b.created } });
                gantt.current.data.updateDataset({ row: { update: (_c = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.subEntries_row) === null || _c === void 0 ? void 0 : _c.created.map((row) => { return { ...row, level: 1 }; }) } });
                //@ts-ignore
                gantt.current.datatable.sortByCol(sortByCol.colIndex, sortByCol.sortOrder);
            }
        }, [(_d = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.subEntries_row) === null || _d === void 0 ? void 0 : _d.created]);
        (0, React_1.useEffect)(() => {
            var _a, _b;
            if (gantt.current !== null && ((_a = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.node) === null || _a === void 0 ? void 0 : _a.created) && _didMount.current) {
                gantt.current.data.updateDataset({ node: { create: (_b = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.node) === null || _b === void 0 ? void 0 : _b.created } });
            }
        }, [(_e = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.node) === null || _e === void 0 ? void 0 : _e.created]);
        (0, React_1.useEffect)(() => {
            var _a, _b;
            if (gantt.current !== null && ((_a = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.node) === null || _a === void 0 ? void 0 : _a.deleted) && _didMount.current) {
                gantt.current.data.updateDataset({ node: { remove: (_b = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.node) === null || _b === void 0 ? void 0 : _b.deleted } });
            }
        }, [(_f = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.node) === null || _f === void 0 ? void 0 : _f.deleted]);
        (0, React_1.useEffect)(() => {
            var _a, _b;
            if (gantt.current !== null && ((_a = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.node) === null || _a === void 0 ? void 0 : _a.updated) && _didMount.current) {
                gantt.current.data.updateDataset({ node: { update: (_b = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.node) === null || _b === void 0 ? void 0 : _b.updated } });
            }
        }, [(_g = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.node) === null || _g === void 0 ? void 0 : _g.updated]);
        (0, React_1.useEffect)(() => {
            var _a, _b;
            if (gantt.current !== null && ((_a = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.link) === null || _a === void 0 ? void 0 : _a.created) && _didMount.current) {
                gantt.current.data.updateDataset({ link: { create: (_b = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.link) === null || _b === void 0 ? void 0 : _b.created } });
            }
        }, [(_h = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.link) === null || _h === void 0 ? void 0 : _h.created]);
        (0, React_1.useEffect)(() => {
            var _a, _b;
            if (gantt.current !== null && ((_a = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.link) === null || _a === void 0 ? void 0 : _a.deleted) && _didMount.current) {
                gantt.current.data.updateDataset({ link: { remove: (_b = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.link) === null || _b === void 0 ? void 0 : _b.deleted } });
            }
        }, [(_j = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.link) === null || _j === void 0 ? void 0 : _j.deleted]);
        (0, React_1.useEffect)(() => {
            var _a, _b;
            if (gantt.current !== null && ((_a = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.link) === null || _a === void 0 ? void 0 : _a.updated) && _didMount.current) {
                gantt.current.data.updateDataset({ link: { update: (_b = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.link) === null || _b === void 0 ? void 0 : _b.updated } });
            }
        }, [(_k = CUD_Action === null || CUD_Action === void 0 ? void 0 : CUD_Action.link) === null || _k === void 0 ? void 0 : _k.updated]);
        (0, React_1.useEffect)(() => {
            if (gantt && gantt.current !== null && setOptions) {
                setOptions.forEach((option) => {
                    //@ts-ignore
                    gantt.current.setOptions(option);
                });
            }
        }, [setOptions]);
        (0, React_1.useEffect)(() => {
            if (gantt && gantt.current !== null && nodes && Object.values(nodes).length > 0 && nodesToSelect && nodesToSelect.length !== 0) {
                //@ts-ignore
                //gantt.current.node.cancelHighlight();
                const associedNode = [];
                //const associedNode: string[] = nodesToSelect.map((id: string) => Object.values(nodes).filter((node => getOriginalId(node.id) === id))[0]?.id ).filter((id: string) => typeof id !== "undefined" );
                nodesToSelect.forEach((id) => {
                    //@ts-ignore
                    nodes.filter((node) => node.id.includes(id)).forEach((node) => {
                        associedNode.push(node.id);
                    });
                });
                gantt.current.node.highlight(associedNode, false, true);
            }
            else if (gantt && gantt.current !== null && nodes && nodesToSelect && nodesToSelect.length === 0) {
                gantt.current.node.cancelHighlight();
                //@ts-ignore
                gantt.current.selection.unselectAllNodes(true);
            }
        }, [nodesToSelect, nodes, ref.current]);
        (0, React_1.useEffect)(() => {
            if (gantt && gantt.current !== null && entriesToSelect && entriesToSelect.length !== 0) {
                //@ts-ignore
                gantt.current.datatable.cancelHighlight();
                // Entrie présent dans : window.PlanningCharts.keys.DELGanttWorkOrder.data.row.list()
                // Entrie undefined : chart.model.datatable
                const idsToHighlight = [...new Set((0, DELPlanningChartsUtils_1.findAllEntriesIds)(gantt.current.data.row.list(), entriesToSelect).concat((0, DELPlanningChartsUtils_1.retriveAllNodesIds)(gantt.current.data.row.list(), entriesToSelect)))];
                //@ts-ignore
                gantt.current.datatable.highlightByIdInDatatable(idsToHighlight, gantt.current.datatable.columns);
            }
            else if (gantt && gantt.current !== null && (entriesToSelect === null || entriesToSelect === void 0 ? void 0 : entriesToSelect.length) === 0) {
                //@ts-ignore
                gantt.current.datatable.cancelHighlight();
            }
        }, [entriesToSelect]);
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { id: id, ref: ref })));
    });
    DELPlanningCharts.displayName = "DELPlanningCharts";
    exports.default = DELPlanningCharts;
});
