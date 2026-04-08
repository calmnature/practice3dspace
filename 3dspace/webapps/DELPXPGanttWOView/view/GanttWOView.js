/// <amd-module name="DS/DELPXPGanttWOView/view/GanttWOView"/>
define("DS/DELPXPGanttWOView/view/GanttWOView", ["require", "exports", "DS/React18Loader/React", "DS/VENMomentJS-2.23.0/moment-timezone", "DS/DELPXPFoundations/PXPUtils", "DS/DELInfraWeb/typings/DELPXPBackendCommunicationType", "DS/DELGanttWorkOrderV1/DELGanttWorkOrder", "DS/DELTimeManagerV1/subcomponents/DELTimePlayer", "DS/DELGanttAssetV1/DELGanttAsset", "DS/React18Loader/React", "DS/ReactRedux/ReactRedux", "DS/DELPXPGanttWOView/store/hooks", "DS/DELInfraWeb/hooks/useCorpusSliceSelector", "DS/DELHooks/useCUD_Events", "DS/DELInfraWeb/hooks/useEndPointSliceSelector", "DS/DELInfraWeb/hooks/useComputedSelector", "DS/DELInfraWeb/components/DELAppContext", "i18n!../assets/nls/ganttView"], function (require, exports, React, moment, PXPUtils, DELPXPBackendCommunicationType_1, DELGanttWorkOrder_1, DELTimePlayer_1, DELGanttAsset_1, React_1, ReactRedux_1, hooks_1, useCorpusSliceSelector_1, useCUD_Events_1, useEndPointSliceSelector_1, useComputedSelector_1, DELAppContext_1, nls) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const GanttWOView = ({ dataTableTitles = [nls.get('workOrder')], dynamicUsableRows, isCloudContext = false, isNodeDraggable = false, isNodeExtendable = false, lang = (typeof widget !== "undefined") ? widget.lang : "en", onDteContextualMenu, onNodeContextualMenu }) => {
        const dispatch = (0, hooks_1.useAppDispatch)();
        const store = (0, ReactRedux_1.useStore)();
        const [nowDate, setNowDate] = (0, React_1.useState)(new Date());
        const centerDate = (0, React_1.useRef)();
        const { widgetDimension } = (0, DELAppContext_1.useAppCtx)();
        let width = widgetDimension === null || widgetDimension === void 0 ? void 0 : widgetDimension.width;
        let height = widgetDimension === null || widgetDimension === void 0 ? void 0 : widgetDimension.height;
        const centerDateFunction = (myCenterDate) => {
            centerDate.current = myCenterDate;
        };
        const ganttType = (0, React_1.useMemo)(() => {
            return PXPUtils.getUrlParam('subjectType', 'pxp:workOrder');
        }, []);
        const onClickNowDate = (event, isActive, isDocked) => {
            if (isActive) {
                if (actionsPlayer && endPointUser.connected) {
                    dispatch(actionsPlayer.update({ objectsToCreateUpdate: [{ ...player, playStatus: "Play_Status_Live" }] }));
                }
            }
            else {
                if (actionsPlayer && endPointUser.connected) {
                    dispatch(actionsPlayer.update({ objectsToCreateUpdate: [{ ...player, playStatus: "Play_Status_Pause" }] }));
                }
            }
        };
        if (typeof width === "undefined") {
            width = document.body.clientWidth;
        }
        if (typeof height === "undefined") {
            height = document.body.clientHeight;
        }
        //let appConnectionStatus: DELPXPStatusInfo = useKeyValueSliceSelector(store, '/pxpApp/' + enDELPXPEndPointAction.connectionStatus);
        const actionsEndPointUser = (0, React_1.useMemo)(() => store.getEndPointActions(DELPXPBackendCommunicationType_1.enDELPXPEndPointType.User), []);
        const endPointUser = (0, useEndPointSliceSelector_1.default)(store, DELPXPBackendCommunicationType_1.enDELPXPEndPointType.User);
        const actionSelectionFilter = (0, React_1.useMemo)(() => store.getCorpusActions('/Experience/SelectionFilter'), []);
        const selectionFilter = (ganttType === "pxp:asset") ? (0, useCorpusSliceSelector_1.useCorpusEntitiesSelector)(store, '/Experience/SelectionFilter') : [];
        const actionsWO = (0, React_1.useMemo)(() => store.getCorpusActions('/Execution/WorkOrder'), []);
        const workOrders = (ganttType === "pxp:workOrder") ? (0, useCorpusSliceSelector_1.useCorpusEntitiesSelector)(store, '/Execution/WorkOrder') : [];
        const actionsSR = (0, React_1.useMemo)(() => store.getCorpusActions('/Resource/SerializedResource'), []);
        const SerializedResource = (ganttType === "pxp:asset") ? (0, useCorpusSliceSelector_1.useCorpusEntitiesSelector)(store, '/Resource/SerializedResource') : [];
        const computedSerializedResource = (0, useComputedSelector_1.useComputedSelector)(store, '/computedSerializedResource');
        const actionsSOrg = (0, React_1.useMemo)(() => store.getCorpusActions('/Resource/SerializedOrganization'), []);
        const SerializedOrganization = (ganttType === "pxp:asset") ? (0, useCorpusSliceSelector_1.useCorpusEntitiesSelector)(store, '/Resource/SerializedOrganization') : [];
        const actionsResourceEvent = (0, React_1.useMemo)(() => store.getCorpusActions('/Resource/ResourceEvent'), []);
        const resourceEvent = (ganttType === "pxp:asset") ? (0, useCorpusSliceSelector_1.useCorpusEntitiesSelector)(store, '/Resource/ResourceEvent') : [];
        const actionsSOP = (0, React_1.useMemo)(() => store.getCorpusActions('/Execution/SerializedOperation'), []);
        const serializedOp = (0, useCorpusSliceSelector_1.useCorpusEntitiesSelector)(store, '/Execution/SerializedOperation');
        const computedSerializedOp = (0, useComputedSelector_1.useComputedSelector)(store, '/computedSerializedOperation');
        const actionsActiveFltMask = (0, React_1.useMemo)(() => store.getCorpusActions('/Experience/ActiveFiltersMask'), []);
        const activeFltMask = (0, useCorpusSliceSelector_1.useCorpusEntitiesSelector)(store, '/Experience/ActiveFiltersMask');
        const actionsObjectFltMask = (0, React_1.useMemo)(() => store.getCorpusActions('/Experience/ObjectFiltersMask'), []);
        const objectFltMask = (0, useCorpusSliceSelector_1.useCorpusEntitiesSelector)(store, '/Experience/ObjectFiltersMask');
        const actionsBIRule = (0, React_1.useMemo)(() => store.getCorpusActions('/Analytics/BIRule'), []);
        const BIRule = (0, useCorpusSliceSelector_1.useCorpusEntitiesSelector)(store, '/Analytics/BIRule');
        const actionsBIRuleActivated = (0, React_1.useMemo)(() => store.getCorpusActions('/Analytics/BIRuleActivated'), []);
        const BIRuleActivated = (0, useCorpusSliceSelector_1.useCorpusEntitiesSelector)(store, '/Analytics/BIRuleActivated');
        const actionsBIComputeValue = (0, React_1.useMemo)(() => store.getCorpusActions('/Analytics/BIComputeValue'), []);
        const BIComputeValue = (0, useCorpusSliceSelector_1.useCorpusEntitiesSelector)(store, '/Analytics/BIComputeValue');
        const actionsCurrentDisplayMode = (0, React_1.useMemo)(() => store.getCorpusActions('/Playground/CurrentDisplayMode'), []);
        const [currentDisplayModeArray] = (0, useCorpusSliceSelector_1.useCorpusEntitiesSelector)(store, '/Playground/CurrentDisplayMode');
        const { displayMode: currentDisplayMode } = currentDisplayModeArray || {};
        const actionsPlayerTime = (0, React_1.useMemo)(() => store.getCorpusActions('/Playground/PlayerTime'), []);
        const [playerTime] = (0, useCorpusSliceSelector_1.useCorpusEntitiesSelector)(store, '/Playground/PlayerTime');
        const actionsPlayer = (0, React_1.useMemo)(() => store.getCorpusActions('/Playground/Player'), []);
        const [player] = (0, useCorpusSliceSelector_1.useCorpusEntitiesSelector)(store, '/Playground/Player');
        const { playStatus } = player || {};
        const actionsCurrentPeriod = (0, React_1.useMemo)(() => store.getCorpusActions('/Playground/CurrentPeriod'), []);
        const [currentPeriod] = (0, useCorpusSliceSelector_1.useCorpusEntitiesSelector)(store, '/Playground/CurrentPeriod');
        const { periodStart, periodEnd } = currentPeriod || {};
        const actionsTimePeriod = (0, React_1.useMemo)(() => store.getCorpusActions('/Experience/TimePeriod'), []);
        //const timePeriod = useCorpusEntitiesSelector(store, '/Experience/TimePeriod');
        const computedTimePeriod = (0, useComputedSelector_1.useComputedSelector)(store, '/computedTimePeriod');
        const timePeriodFormatDate = (0, React_1.useMemo)(() => {
            var _a;
            if (computedTimePeriod && computedTimePeriod[0] && ((_a = computedTimePeriod[0]) === null || _a === void 0 ? void 0 : _a.bucketFormat)) {
                return computedTimePeriod[0].bucketFormat;
            }
            else {
                return "HH:mm:ss";
            }
        }, [computedTimePeriod, currentPeriod]);
        const timescale = (0, React_1.useMemo)(() => {
            if (periodStart && periodEnd) {
                return { startDate: new Date(periodStart), endDate: new Date(periodEnd) };
            }
            else {
                return undefined;
            }
        }, [periodStart, periodEnd]);
        const mode = (0, React_1.useMemo)(() => {
            if (currentDisplayMode) {
                return (currentDisplayMode === "DisplayMode_Planned") ? "Planned" : "Realized";
            }
            else {
                return undefined;
            }
        }, [currentDisplayMode]);
        const currentDate = (0, React_1.useMemo)(() => {
            if (computedTimePeriod && (playerTime === null || playerTime === void 0 ? void 0 : playerTime.time) && timePeriodFormatDate) {
                //@ts-ignore
                return moment(new Date(playerTime.time)).format(timePeriodFormatDate).toString();
            }
            else {
                return undefined;
            }
        }, [computedTimePeriod, playerTime === null || playerTime === void 0 ? void 0 : playerTime.time, timePeriodFormatDate]);
        (0, React_1.useEffect)(() => {
            //@ts-ignore
            moment.locale(lang);
        }, [lang]);
        const actionsCSO = (0, React_1.useMemo)(() => store.getCorpusActions('/Rendering/CSO'), []);
        const [CSO] = (0, useCorpusSliceSelector_1.useCorpusEntitiesSelector)(store, '/Rendering/CSO');
        const actionsHSO = (0, React_1.useMemo)(() => store.getCorpusActions('/Rendering/HSO'), []);
        const [HSO] = (0, useCorpusSliceSelector_1.useCorpusEntitiesSelector)(store, '/Rendering/HSO');
        const mapTypeIds = (0, React_1.useMemo)(() => {
            var _a;
            return (_a = HSO === null || HSO === void 0 ? void 0 : HSO.mapTypeIds) !== null && _a !== void 0 ? _a : [];
        }, [HSO]); //HSO?.mapTypeIds || [];
        const idsSOPSelected = (0, React_1.useRef)([]);
        const idsWOSelected = (0, React_1.useRef)([]);
        const idsSRSelected = (0, React_1.useRef)([]);
        const onSuccessRef = (0, React_1.useRef)(null);
        const CUD_EventsWO = (0, useCUD_Events_1.default)(workOrders, 'workOrders');
        const CUD_EventsSOP = (0, useCUD_Events_1.default)(computedSerializedOp, 'serializedOperations');
        const CUD_EventsSR = (0, useCUD_Events_1.default)(computedSerializedResource, 'serializedResources');
        (0, React_1.useEffect)(() => {
            if (currentPeriod && currentPeriod.timePeriod && actionsTimePeriod && endPointUser.connected) {
                dispatch(actionsTimePeriod.read({ id: currentPeriod.timePeriod }));
            }
        }, [currentPeriod, actionsTimePeriod]);
        (0, React_1.useEffect)(() => {
            if (mapTypeIds.length > 0) {
                const isSerializedOperation = mapTypeIds.filter((type) => type[0] === "SerializedOperation").length > 0;
                const isWorkOrder = mapTypeIds.filter((type) => type[0] === "WorkOrder").length > 0;
                const isSerializedResource = mapTypeIds.filter((type) => type[0] === "SerializedResource").length > 0;
                mapTypeIds === null || mapTypeIds === void 0 ? void 0 : mapTypeIds.forEach((type) => {
                    if (type[0] === "SerializedOperation") {
                        idsSOPSelected.current = type[1];
                    }
                    else if (!isSerializedOperation) {
                        idsSOPSelected.current = [];
                    }
                    if (type[0] === "WorkOrder") {
                        idsWOSelected.current = type[1];
                    }
                    else if (!isWorkOrder) {
                        idsWOSelected.current = [];
                    }
                    if (type[0] === "SerializedResource") {
                        idsSRSelected.current = type[1];
                    }
                    else if (!isSerializedResource) {
                        idsSRSelected.current = [];
                    }
                });
            }
            else {
                idsSOPSelected.current = [];
                idsWOSelected.current = [];
                idsSRSelected.current = [];
            }
        }, [mapTypeIds]);
        (0, React_1.useEffect)(() => {
            if (actionsEndPointUser && endPointUser && endPointUser.connected === false) {
                dispatch(actionsEndPointUser.connect());
            }
        }, []);
        (0, React_1.useEffect)(() => {
            if (endPointUser && endPointUser.connected && actionsWO && actionsCurrentDisplayMode
                && actionsCSO && actionsPlayerTime && actionsCurrentPeriod && actionsPlayer && actionsHSO && actionsObjectFltMask
                && actionsActiveFltMask && actionsSR && actionsSOrg && actionsResourceEvent) {
                /*dispatch(actionsObjectFltMask.query({ conditions: [{}], subscribeToUpdates: true }));
                dispatch(actionsActiveFltMask.query({ conditions: [{}], subscribeToUpdates: true }));*/
                dispatch(actionsActiveFltMask.query({ conditions: [{}], subscribeToUpdates: true, actionId: 'ActiveFltMask' }));
                dispatch(actionsCSO.query(({ conditions: [{}], subscribeToUpdates: true, actionId: 'CSO' })));
                dispatch(actionsHSO.query(({ conditions: [{}], subscribeToUpdates: true, actionId: 'HSO' })));
                if (ganttType === "pxp:workOrder") {
                    dispatch(actionsWO.read()); // Query check with Eric
                }
                else if (ganttType === "pxp:asset") {
                    dispatch(actionsSOrg.read());
                    dispatch(actionsSR.query({ conditions: [{}], subscribeToUpdates: true }));
                    dispatch(actionsResourceEvent.read());
                }
                dispatch(actionsPlayerTime.query({ conditions: [{}], subscribeToUpdates: true, actionId: 'PlayerTime' })); // Query
                dispatch(actionsCurrentDisplayMode.query({ conditions: [{}], subscribeToUpdates: true })); // Query
                dispatch(actionsCurrentPeriod.read()); // Not query yet
                dispatch(actionsPlayer.read()); // Not query yet
            }
        }, [endPointUser]);
        (0, React_1.useEffect)(() => {
            if (activeFltMask && actionsObjectFltMask && endPointUser.connected) {
                dispatch(actionsObjectFltMask.query({ conditions: serializedOp.map((sop) => sop.id), subscribeToUpdates: true, actionId: 'ObjectFltMaskSOP' }));
            }
            if (actionsSR && actionsObjectFltMask && ganttType === 'pxp:asset' && endPointUser.connected) {
                dispatch(actionsObjectFltMask.query({ conditions: SerializedResource.map((sr) => sr.id), subscribeToUpdates: true, actionId: 'ObjectFltMaskSR' }));
            }
            return () => {
                if (actionsObjectFltMask) {
                    dispatch(actionsObjectFltMask.unsubscribeUpdate({ actionId: 'ObjectFltMaskSOP' }));
                    if (ganttType === 'pxp:asset') {
                        dispatch(actionsObjectFltMask.unsubscribeUpdate({ actionId: 'ObjectFltMaskSR' }));
                    }
                }
            };
        }, [activeFltMask]);
        (0, React_1.useEffect)(() => {
            if (BIRule && BIRule.length > 0 && actionsBIComputeValue && actionsBIRuleActivated && (serializedOp === null || serializedOp === void 0 ? void 0 : serializedOp.length) > 0 && BIRuleActivated[0] && BIRuleActivated[0].biRule !== null && endPointUser.connected) {
                const condition = [
                    {
                        "@class": "QueryCondition",
                        "conditionPredicate": "rule",
                        "conditionObject": {
                            "type": "d",
                            "object": {
                                "type": "p",
                                "data": BIRuleActivated[0].biRule
                            }
                        }
                    },
                    {
                        "@class": "QueryCondition",
                        "conditionPredicate": "subjectPUIDs",
                        "conditionObject": {
                            "type": "d",
                            "object": {
                                "type": "[p]",
                                "data": serializedOp.map((sop) => sop.id).concat(workOrders.map((wo) => wo.id))
                            }
                        }
                    }
                ];
                dispatch(actionsBIComputeValue.empty());
                dispatch(actionsBIComputeValue.query({ conditions: condition, subscribeToUpdates: true }));
            }
        }, [BIRuleActivated, BIRule, serializedOp]);
        (0, React_1.useEffect)(() => {
            /*if (activeFltMask[0]?.id && actionsObjectFltMask) {
                const condition: object[] = [
                    {
                      "@class": "QueryCondition",
                      "conditionPredicate": "subjectPUIDs",
                      "conditionObject": {
                        "type": "d",
                        "object": {
                          "type": "p",
                          "data": activeFltMask[0].id
                        }
                      }
                    }
                ];
    
                dispatch(actionsObjectFltMask.query({ conditions: condition, subscribeToUpdates: true }))
            }
            
    
            if (actionsSR && ganttType === 'pxp:asset') {
                dispatch(actionsSR.query(({ conditions: [{}], subscribeToUpdates: true })));
            }*/
        }, [activeFltMask]);
        (0, React_1.useEffect)(() => {
            if (actionsSR && actionsObjectFltMask && actionsActiveFltMask && endPointUser.connected) {
                /*dispatch(actionsObjectFltMask.query({ conditions: [{}], subscribeToUpdates: true }));
                dispatch(actionsActiveFltMask.query({ conditions: [{}], subscribeToUpdates: true }));*/
                if (actionsSR && ganttType === 'pxp:asset') {
                    dispatch(actionsSR.query({ conditions: [{}], subscribeToUpdates: true }));
                }
            }
        }, [selectionFilter]);
        (0, React_1.useEffect)(() => {
            return () => {
                if (actionsEndPointUser && actionsHSO && actionsCSO && actionsActiveFltMask && endPointUser.connected) {
                    dispatch(actionsEndPointUser.unsubscribe());
                    dispatch(actionsHSO.unsubscribeUpdate({ actionId: 'HSO' }));
                    dispatch(actionsCSO.unsubscribeUpdate({ actionId: 'CSO' }));
                    dispatch(actionsActiveFltMask.unsubscribeUpdate({ actionId: 'ActiveFltMask' }));
                }
            };
        }, []);
        const onChunckLoad = (0, React_1.useCallback)((ganttObject) => {
            if ((onSuccessRef === null || onSuccessRef === void 0 ? void 0 : onSuccessRef.current) === null) {
                onSuccessRef.current = ganttObject.onSuccess;
            }
            const conditionsScheduled = {
                conditions: [
                    {
                        "@class": "QueryCondition",
                        "conditionPredicate": "scheduledEndDate",
                        "conditionObject": {
                            "type": "f",
                            "object": [
                                ">=",
                                {
                                    "type": "d",
                                    "data": new Date(ganttObject.startDate).toJSON()
                                }
                            ]
                        }
                    },
                    {
                        "@class": "QueryCondition",
                        "conditionPredicate": "scheduledStartDate",
                        "conditionObject": {
                            "type": "f",
                            "object": [
                                "<=",
                                {
                                    "type": "d",
                                    "data": new Date(ganttObject.endDate).toJSON()
                                }
                            ]
                        }
                    }
                ],
                subscribeToUpdates: true
            };
            const conditionsActual = {
                conditions: [
                    {
                        "@class": "QueryCondition",
                        "conditionPredicate": "actualEndDate",
                        "conditionObject": {
                            "type": "f",
                            "object": [
                                ">=",
                                {
                                    "type": "d",
                                    "data": new Date(ganttObject.startDate).toJSON()
                                }
                            ]
                        }
                    },
                    {
                        "@class": "QueryCondition",
                        "conditionPredicate": "actualStartDate",
                        "conditionObject": {
                            "type": "f",
                            "object": [
                                "<=",
                                {
                                    "type": "d",
                                    "data": new Date(ganttObject.endDate).toJSON()
                                }
                            ]
                        }
                    }
                ],
                subscribeToUpdates: true
            };
            if (actionsActiveFltMask && actionsObjectFltMask) {
                /*dispatch(actionsActiveFltMask.query({ conditions: [{}], subscribeToUpdates: true }));
                dispatch(actionsObjectFltMask.query({ conditions: [{}], subscribeToUpdates: true }));*/
            }
            if (actionsSOP && endPointUser.connected) {
                dispatch(actionsSOP.query(conditionsScheduled));
                dispatch(actionsSOP.query(conditionsActual));
                //@ts-ignore
                ganttObject.onSuccess([]);
            }
            if (actionsBIRule && actionsBIRuleActivated && endPointUser.connected) {
                dispatch(actionsBIRule.read());
                //@ts-ignore
                dispatch(actionsBIRuleActivated.query({ conditions: [{}], subscribeToUpdates: true, actionId: 'BIRuleActivated' }));
            }
        }, [workOrders]);
        const onSelection = (0, React_1.useCallback)((selected) => {
            var _a, _b;
            const { nodes, entries } = selected;
            if (actionsCSO && ((_a = selected === null || selected === void 0 ? void 0 : selected.nodes) === null || _a === void 0 ? void 0 : _a.length) == 0 || ((_b = selected === null || selected === void 0 ? void 0 : selected.entries) === null || _b === void 0 ? void 0 : _b.length) == 0 && actionsCSO && endPointUser.connected) {
                dispatch(actionsCSO.update({ objectsToCreateUpdate: [{ ...CSO, idsSelected: nodes.concat(entries) }] }));
            }
        }, [CSO]);
        const onChangeStatus = (playerStatus) => {
            if (actionsPlayer && endPointUser.connected) {
                dispatch(actionsPlayer.update({ objectsToCreateUpdate: [{ ...player, playStatus: playerStatus }] }));
            }
        };
        const setCurrentDate = (date) => {
            //setCurrentDateState(new Date(date));
            if (actionsPlayerTime && endPointUser.connected) {
                dispatch(actionsPlayerTime.update({ objectsToCreateUpdate: [{ ...playerTime, time: date.toISOString() }] }));
            }
        };
        const handleDynamicTooltip = (node) => {
            var _a;
            const workOrderTooltip = ((_a = workOrders.find((workOrder) => workOrder.id === node.dteId)) === null || _a === void 0 ? void 0 : _a.displayName) || '';
            return `
            <p class="delpxp-tooltip-property">
                Name: <b>${node.lines[0]}</b>
            </p>
            <p class="delpxp-tooltip-property">
                Status: <b>${node.id.includes("planned") ? "Planned" : "Realized"}
            </b></p>
            <div>
                <p class="delpxp-tooltip-property">
                    Planned Start Date: <b>${
            //@ts-ignore
            moment(new Date(node.start)).format('MMMM DD, YYYY HH:mm:SS')}
                </b></p>
                <p class="delpxp-tooltip-property">
                    Planned End Date: <b>${
            //@ts-ignore
            moment(new Date(node.end)).format('MMMM DD, YYYY HH:mm:SS')}
                </b></p>
            </div>
            <p class="delpxp-tooltip-property">Work Order: <b>${workOrderTooltip}</b></p>
        `;
        };
        const onHideEntry = (entryId) => {
            if (actionsActiveFltMask && actionsObjectFltMask && actionSelectionFilter && actionsSR && endPointUser.connected) {
                dispatch(actionSelectionFilter.create({ objectsToCreateUpdate: [{ "@class": "SelectionFilter~1", concernedPUIDs: [entryId] }] }));
            }
        };
        const onShowSteps = (entryId) => {
            console.log('entryId', entryId);
            if (workOrders && endPointUser.connected) {
                console.log(workOrders.find(workOrd => workOrd.id === entryId));
            }
        };
        const onRowContextualMenu = (cell) => {
            const isWorkOrder = cell.dteId.includes('WorkOrder');
            const isSerializedOperation = cell.dteId.includes('SerializedOperation');
            const isRealized = cell.dteId.includes('_mode');
            cell = { ...cell, dteId: cell.dteId.replace('_mode', '') };
            const contextualMenu = [];
            const goToInGanttMenu = {
                label: nls.get('goToInGantt'),
                iconName: 'wux-ui-3ds wux-ui-3ds-calendar-day-move-to',
                fontIconFamily: WUXManagedFontIcons.Font3DS,
                action: function () {
                    var _a, _b, _c, _d;
                    var goTo = '';
                    if (isSerializedOperation && centerDate && centerDate.current && serializedOp) {
                        if (isRealized) {
                            goTo = (_a = serializedOp.find((sop) => sop.id === cell.dteId)) === null || _a === void 0 ? void 0 : _a.actualStartDate;
                        }
                        else if (!isRealized) {
                            goTo = (_b = serializedOp.find((sop) => sop.id === cell.dteId)) === null || _b === void 0 ? void 0 : _b.scheduledStartDate;
                        }
                        if (goTo)
                            centerDate.current(new Date(goTo));
                    }
                    else if (isWorkOrder && centerDate && centerDate.current && workOrders) {
                        if (isRealized) {
                            goTo = (_c = workOrders.find((wo) => wo.id === cell.dteId)) === null || _c === void 0 ? void 0 : _c.actualStartDate;
                        }
                        else if (!isRealized) {
                            goTo = (_d = workOrders.find((wo) => wo.id === cell.dteId)) === null || _d === void 0 ? void 0 : _d.scheduledStartDate;
                        }
                        if (goTo)
                            centerDate.current(new Date(goTo));
                    }
                }
            };
            const hideAsset = {
                label: nls.get('hideAsset'),
                iconName: 'wux-button-icon-fi wux-ui-genereatedicon-fi wux-ui-3ds wux-ui-3ds-eye-off',
                action: () => onHideEntry(cell.dteId)
            };
            const showSteps = {
                label: 'Show Detail',
                iconName: 'wux-button-icon-fi wux-ui-genereatedicon-fi wux-ui-3ds wux-ui-3ds-table-row-eye',
                action: () => onShowSteps(cell.dteId)
            };
            if (ganttType === 'pxp:workOrder') {
                contextualMenu.push(goToInGanttMenu, showSteps);
            }
            else if (ganttType === 'pxp:asset') {
                contextualMenu.push(hideAsset);
            }
            else {
                contextualMenu.push(goToInGanttMenu, hideAsset);
            }
            return contextualMenu;
        };
        const onNodeContextualMenuCallback = (cell) => {
            return [
                {
                    label: nls.get('hideAsset'),
                    iconName: 'wux-button-icon-fi wux-ui-genereatedicon-fi wux-ui-3ds wux-ui-3ds-eye-off ',
                    action: () => onHideEntry(cell.dteId)
                }
            ];
        };
        const displayTimePlayer = () => {
            return ((currentDate && height && width) ? React.createElement(DELTimePlayer_1.default, { key: "timePlayer-workOrder", id: "timePlayer-workOrder", currentDate: { date: (playerTime === null || playerTime === void 0 ? void 0 : playerTime.time) ? new Date(playerTime.time) : new Date(), dateText: (playerTime === null || playerTime === void 0 ? void 0 : playerTime.time) ? currentDate : new Date().toLocaleString('en-US'), setDate: setCurrentDate, tooltip: nls.get('titleRedLine') }, nowDate: { date: nowDate, setDate: setNowDate, nowDateText: nls.get("live").toUpperCase(), tooltip: nls.get('titleLive') }, onClickNowDate: onClickNowDate, height: height, width: width, offsetDocking: { left: 10, right: width - 60 } })
                :
                    '');
        };
        const displayDELGanttWorkOrder = () => {
            return (React.createElement(React.Fragment, null,
                React.createElement(DELGanttWorkOrder_1.default, { key: "DELGanttWorkOrder-c2", dataTableTitles: dataTableTitles, serializedOperations: computedSerializedOp, workOrders: workOrders, CUD_EventsWO: CUD_EventsWO, CUD_EventsSOP: CUD_EventsSOP, onChunckLoad: onChunckLoad, onDynamicTooltip: handleDynamicTooltip, timescale: timescale, mode: { mode }, playerStatus: { statusValue: playStatus, setStatusValue: onChangeStatus }, onSelection: onSelection, selectedSerializedOperations: idsSOPSelected.current, selectedWorkOrders: idsWOSelected.current.concat(idsSOPSelected.current).filter((value) => value !== ""), height: height, width: width, lang: lang, isNodeDraggable: isNodeDraggable, isNodeExtendable: isNodeExtendable, onDteContextualMenu: onDteContextualMenu !== null && onDteContextualMenu !== void 0 ? onDteContextualMenu : onRowContextualMenu, onNodeContextualMenu: onNodeContextualMenu !== null && onNodeContextualMenu !== void 0 ? onNodeContextualMenu : onNodeContextualMenuCallback, centerDate: centerDateFunction, dynamicUsableRows: dynamicUsableRows }, displayTimePlayer())));
        };
        const displayDELGanttAsset = () => {
            return (React.createElement(DELGanttAsset_1.default, { key: "DELGanttAsset-c3", serializedOperations: serializedOp, serializedResource: SerializedResource, selectedSerializedResource: idsSRSelected.current, resourceEvent: resourceEvent, CUD_EventsSOP: CUD_EventsSOP, CUD_EventsSR: CUD_EventsSR, onChunckLoad: onChunckLoad, onDynamicTooltip: handleDynamicTooltip, timescale: timescale, mode: { mode }, playerStatus: { statusValue: playStatus, setStatusValue: onChangeStatus }, onSelection: onSelection, selectedSerializedOperations: idsSOPSelected.current, dteContextualMenu: onRowContextualMenu, height: height, width: width, lang: lang }, displayTimePlayer()));
        };
        return (React.createElement("div", { style: { height: height, width: '100%' } }, (timescale) ? (ganttType === "pxp:workOrder") ? displayDELGanttWorkOrder() : displayDELGanttAsset() : ''));
    };
    GanttWOView.displayName = "GanttWOView";
    exports.default = GanttWOView;
});
