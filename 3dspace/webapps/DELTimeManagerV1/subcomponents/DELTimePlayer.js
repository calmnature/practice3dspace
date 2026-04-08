/// <amd-module name="DS/DELTimeManagerV1/subcomponents/DELTimePlayer"/>
define("DS/DELTimeManagerV1/subcomponents/DELTimePlayer", ["require", "exports", "DS/React18Loader/React", "DS/DELWebTools/DELWebUtils", "DS/DELPlanningChartsV1/DELPlanningCharts", "DS/DELTimeManagerV1/subcomponents/RedLine", "DS/DELTimeManagerV1/subcomponents/NowDate", "DS/DELTimeManagerV1/subcomponents/Restriction", "DS/DELTimeManagerV1/subcomponents/Context", "DS/DELTimeManagerV1/subcomponents/Period", "DS/DELTimeManagerV1/subcomponents/Line", "DS/DELTimeManagerV1/subcomponents/DensityLine", "DS/React18Loader/React", "DS/DELHooks/usePrevious", "DS/DELContext/PlayerStatusContext", "DS/DELContext/LockUnlockContext", "css!../assets/css/DELTimeManager.css"], function (require, exports, React, DELWebUtils_1, DELPlanningCharts_1, RedLine_1, NowDate_1, Restriction_1, Context_1, Period_1, Line_1, DensityLine_1, React_1, usePrevious_1, PlayerStatusContext_1, LockUnlockContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const DELTimePlayer = (0, React_1.memo)(({ children = null, customNodes, densityRow, id, isMinified = false, lang = "en", height, period, gapLeft = 0, context, currentDate, mode, nowDate, onClickNowDate, offsetDocking = { left: 20, right: document.body.clientWidth - 40 }, onRestrictionsChanged, restriction, width = document.body.clientWidth }) => {
        var _a, _b;
        // Gap between two docked elements
        const gapQueue = 28;
        const dteTM = [{
                id: "low__Severity",
                values: [],
                defaultOrder: 4
            },
            {
                id: "medium__Severity",
                values: [],
                defaultOrder: 3
            },
            {
                id: "high__Severity",
                values: [],
                defaultOrder: 2
            },
            {
                id: "urgent__Severity",
                values: [],
                defaultOrder: 1
            },
            {
                id: "default",
                values: [],
                defaultOrder: 0
            }
        ];
        //@ts-ignore
        const { statusValue, setStatusValue } = (0, React_1.useContext)(PlayerStatusContext_1.PlayerStatusContext);
        const statusValueRef = (0, React_1.useRef)("");
        const { lockUnlockValue, setLockUnlockValue } = (0, React_1.useContext)(LockUnlockContext_1.LockUnlockContext);
        const lockUnlockValueRef = (0, React_1.useRef)("lock");
        const { restrictionStart, restrictionEnd } = (restriction === null || restriction === void 0 ? void 0 : restriction.restriction) || {};
        const { startPeriod, endPeriod } = period || {};
        const { date: nowDateTime, setDate: setNowDate, nowDateText, tooltip: tooltipNowDate } = nowDate;
        const { date, dateText, setDate, tooltip: tooltipCurrentDateProp } = currentDate;
        const { startContext, endContext } = (context === null || context === void 0 ? void 0 : context.context) || {};
        const [disableEvent, setDisableEvent] = (0, React_1.useState)(false);
        const svgRef = (0, React_1.useRef)(null);
        const isDragginggantt = (0, React_1.useRef)(false);
        const timeInformationsRefWidth = (0, React_1.useRef)(gapLeft !== null && gapLeft !== void 0 ? gapLeft : 0);
        const isRestrictionStartActivated = (0, React_1.useRef)(false);
        const isRestrictionEndActivated = (0, React_1.useRef)(false);
        const offsetXRedLine = (0, React_1.useRef)(0);
        const offsetXRestrictionStart = (0, React_1.useRef)(0);
        const offsetXRestrictionEnd = (0, React_1.useRef)(0);
        const dataTableWidth = (0, React_1.useRef)(0);
        const queue = (0, React_1.useRef)({ left: new Map(), right: new Map() });
        const dateRef = (0, React_1.useRef)(date);
        const dateTextRef = (0, React_1.useRef)(dateText);
        const nowDateRef = (0, React_1.useRef)(nowDateTime);
        const liveForward = (0, React_1.useRef)(null);
        /*if (width) {
            offsetDocking.right = width;
        }*/
        const offsetDockingRef = (0, React_1.useRef)(offsetDocking);
        const nbGapRedLineLeft = (0, React_1.useRef)((typeof queue.current.left.get('redLine') === 'undefined') ? 0 : queue.current.left.get('redLine'));
        const nbGapRedLineRight = (0, React_1.useRef)((typeof queue.current.right.get('redLine') === 'undefined') ? 0 : queue.current.right.get('redLine'));
        const nbGapNowDateLeft = (0, React_1.useRef)((typeof queue.current.left.get('nowDate') === 'undefined') ? 0 : queue.current.left.get('nowDate'));
        const nbGapNowDateRight = (0, React_1.useRef)((typeof queue.current.right.get('nowDate') === 'undefined') ? 0 : queue.current.right.get('nowDate'));
        const [isGanttInit, setIsGanttInit] = (0, React_1.useState)(false);
        const chartOptions = {
            localCode: lang,
            calendars: {
                columnLines: {
                    primary: { style: "dashed" },
                    secondary: { style: "dashed" }
                }
            },
            timescale: {
                highlightNow: false,
                fontSize: 12,
                singleLine: false,
                backgroundColor: '#fff',
                textColor: '#242424',
                startDate: startContext,
                endDate: endContext,
                borders: {
                    primary: { color: '#fff', width: 0 },
                    secondary: { color: '#fff', width: 0 },
                    horizontal: { color: '#fff', width: 0 }
                },
            },
            datatable: {
                line: {
                    height: 50,
                    borderBottomWidth: 0,
                }
            },
            node: {
                groupingMin: 1000,
                relativeHeight: 0.9
            },
            tooltip: {
                style: {
                    backgroundColor: '#00568699',
                    color: 'white',
                    padding: '4px',
                    border: '1px solid #005686',
                    maxWidth: '600px',
                }
            },
            selection: {
                node: {
                    color: '#00C8C8',
                }
            },
            scrollbar: {
                width: 0
            },
            headHeight: 30,
            display: ['calendar'],
            height: 111,
            localization: {
                timescaleQuarter: 'Quarter',
                timescaleAbbreviatedWeek: 'W',
            }
        };
        const allowDraggablesRedLine = [id, "DELGanttWorkOrderMainTopCanvas", "ganttInTMMainTopCanvas", "redLine-" + id, "redRect-redLine-" + id, "gantt-" + id + "MainTopCanvas", "hourToolTip-redLine-" + id, "myGanttContainerMainTopCanvas", "app", ""];
        const allowDraggablesRestrictionsEnd = [id, "DELGanttWorkOrderMainTopCanvas", "ganttInTMMainTopCanvas", "handler-restrictionR-" + id, "app", "", "handlerLineA-restrictionR-" + id, "handlerLineB-restrictionR-" + id, "handlerLineC-restrictionR-" + id, "gantt-" + id + "MainTopCanvas", "line-" + id, "border-restrictionR-" + id, "rect-restrictionR-" + id];
        const allowDraggablesRestrictionsStart = [id, "DELGanttWorkOrderMainTopCanvas", "ganttInTMMainTopCanvas", "handler-restrictionL-" + id, "app", "", "handlerLineA-restrictionL-" + id, "handlerLineB-restrictionL-" + id, "handlerLineC-restrictionL-" + id, "gantt-" + id + "MainTopCanvas", "line-" + id, "border-restrictionL-" + id, "rect-restrictionL-" + id];
        const [redLineState, setRedLineState] = (0, React_1.useState)({
            x: 780,
            y: 1,
            height: 91,
            isDown: false,
            text: dateText,
            isDocked: false,
            isMinified: false,
            offset: 0
        });
        const redLineStateRef = (0, React_1.useRef)(redLineState);
        const [nowDateState, setNowDateState] = (0, React_1.useState)({
            x: 0,
            y: 1,
            text: nowDateText,
            isDocked: false,
            offset: 0
        });
        const nowDateStateRef = (0, React_1.useRef)(nowDateState);
        const [restrictionStartState, setRestrictionStartState] = (0, React_1.useState)({
            date: restrictionStart,
            x: 0,
            y: 18,
            width: 0,
            height: 93,
            isDown: false,
            isMinified: false,
        });
        const restrictionStartRef = (0, React_1.useRef)(restrictionStartState);
        const [restrictionEndState, setRestrictionEndState] = (0, React_1.useState)({
            date: restrictionEnd,
            x: 0,
            y: 18,
            width: 0,
            height: 93,
            isDown: false,
            isMinified: false,
        });
        const restrictionEndRef = (0, React_1.useRef)(restrictionEndState);
        const [contextState, setContextState] = (0, React_1.useState)({
            x: 100,
            y: 106,
            width: 0,
            height: height,
            isMinified: false,
        });
        const contextStateRef = (0, React_1.useRef)(contextState);
        const [periodState, setPeriodState] = (0, React_1.useState)({
            x: 100,
            y: 106,
            width: 0,
            height: 93,
            isMinified: false,
        });
        const [densityState, setDensityState] = (0, React_1.useState)([]);
        const densityRowRef = (0, React_1.useRef)(densityRow);
        const periodStateRef = (0, React_1.useRef)(periodState);
        const dateToPixels = (0, React_1.useRef)();
        const pixelsToDate = (0, React_1.useRef)();
        const goToDate = (0, React_1.useRef)();
        const centerDate = (0, React_1.useRef)();
        const resize = (0, React_1.useRef)();
        const getBirdviewNodesF = (0, React_1.useRef)();
        const previousRestrictionStartWidth = (0, usePrevious_1.default)(restrictionStartState.width);
        const previousRestrictionEndX = (0, usePrevious_1.default)(restrictionEndState.x);
        const getBirdviewNodesModel = (0, React_1.useCallback)((densityRow) => {
            if (getBirdviewNodesF && getBirdviewNodesF.current) {
                //@ts-ignore
                return getBirdviewNodesF.current({ method: 'sum' }, densityRow, [""]).map((node) => { return { ...node, end: dateToPixels.current(node.end), start: dateToPixels.current(node.start) }; });
            }
        }, [getBirdviewNodesF === null || getBirdviewNodesF === void 0 ? void 0 : getBirdviewNodesF.current]);
        /*const birdViewNodesModel = useMemo(() => {
            if (densityRow && getBirdviewNodesF && getBirdviewNodesF.current && dateToPixels && dateToPixels.current) {
                return getBirdviewNodesModel(densityRow);
            } else {
                return [];
            }
        }, [densityRow, getBirdviewNodesF?.current, mode]);*/
        (0, React_1.useEffect)(() => {
            if (densityRow && densityRow.length > 0) {
                densityRowRef.current = densityRow;
            }
        }, [densityRow]);
        (0, React_1.useEffect)(() => {
            lockUnlockValueRef.current = lockUnlockValue;
        }, [lockUnlockValue]);
        (0, React_1.useEffect)(() => {
            if (svgRef.current) {
                setRedLineState({ ...redLineState, isMinified });
                setRestrictionStartState({ ...restrictionStartState, isMinified });
                setRestrictionEndState({ ...restrictionEndState, isMinified });
                setPeriodState({ ...periodState, isMinified });
                setContextState({ ...contextState, isMinified });
                redLineStateRef.current = { ...redLineState, isMinified };
                restrictionStartRef.current = { ...restrictionStartState, isMinified };
                restrictionEndRef.current = { ...restrictionEndState, isMinified };
                contextStateRef.current = { ...contextState, isMinified };
                periodStateRef.current = { ...periodState, isMinified };
                //@ts-ignore
                svgRef.current.style.setProperty('height', isMinified ? "50px" : height + "px");
            }
        }, [isMinified, height]);
        (0, React_1.useEffect)(() => {
            if (context && dateToPixels.current && isGanttInit) {
                const startPixels = dateToPixels.current(startContext);
                const endPixels = dateToPixels.current(endContext);
                const diff = (endPixels - startPixels);
                setContextState({
                    ...contextStateRef.current,
                    width: diff,
                    x: startPixels
                });
                contextStateRef.current = { ...contextStateRef.current, width: diff, x: startPixels };
            }
        }, [context === null || context === void 0 ? void 0 : context.context, dateToPixels, isGanttInit]);
        (0, React_1.useEffect)(() => {
            if (period && dateToPixels.current && isGanttInit) {
                setPeriodState({
                    ...periodStateRef.current,
                    x: dateToPixels.current(startPeriod),
                    width: dateToPixels.current(endPeriod) - dateToPixels.current(startPeriod)
                });
                periodStateRef.current = { ...periodStateRef.current, x: dateToPixels.current(startPeriod), width: dateToPixels.current(endPeriod) - dateToPixels.current(startPeriod) };
            }
        }, [period, dateToPixels, isGanttInit]);
        (0, React_1.useEffect)(() => {
            if (isGanttInit && restrictionEnd && dateToPixels.current && svgRef.current) {
                setRestrictionEndState({
                    ...restrictionEndRef.current,
                    x: dateToPixels.current(restrictionEnd),
                    //@ts-ignore
                    width: svgRef.current.width.baseVal.value - dateToPixels.current(restrictionEnd),
                    date: restrictionEnd
                });
                //@ts-ignore
                restrictionEndRef.current = { ...restrictionEndState, x: dateToPixels.current(restrictionEnd), width: svgRef.current.width.baseVal.value - dateToPixels.current(restrictionEnd), date: restrictionEnd };
            }
        }, [restrictionEnd, isGanttInit, dateToPixels]);
        (0, React_1.useEffect)(() => {
            if (isGanttInit && restrictionStart && dateToPixels.current) {
                setRestrictionStartState({
                    ...restrictionStartRef.current,
                    width: dateToPixels.current(restrictionStart),
                    date: restrictionStart
                });
                restrictionStartRef.current = { ...restrictionStartRef.current, width: dateToPixels.current(restrictionStart), date: restrictionStart };
            }
        }, [restrictionStart, isGanttInit, dateToPixels]);
        (0, React_1.useEffect)(() => {
            if (isGanttInit && dateText && dateToPixels.current && pixelsToDate.current && dateRef.current && id) {
                /*let offsetRedLine: number | undefined;
                nbGapRedLineLeft.current = (typeof queue.current.left.get('redLine') === 'undefined') ? 0 : queue.current.left.get('redLine') as number;
                nbGapRedLineRight.current = (typeof queue.current.right.get('redLine') === 'undefined') ? 0 : queue.current.right.get('redLine') as number;
                let offsetNowDate: number | undefined;
                nbGapNowDateLeft.current = (typeof queue.current.left.get('nowDate') === 'undefined') ? 0 : queue.current.left.get('nowDate') as number;
                nbGapNowDateRight.current = (typeof queue.current.right.get('nowDate') === 'undefined') ? 0 : queue.current.right.get('nowDate') as number;
                const redLineDockLeft: boolean = dateToPixels.current(date) <= offsetDocking?.left + (gapQueue * nbGapRedLineLeft.current);
                const redLineDockRight: boolean = dateToPixels.current(date) >= offsetDocking?.right - dataTableWidth.current - (gapQueue * nbGapRedLineRight.current);
                const nowDateDockLeft: boolean = dateToPixels.current(nowDateTime) <= offsetDocking?.left + dataTableWidth.current + (gapQueue * nbGapNowDateLeft.current);
                const nowDateDockRight: boolean = dateToPixels.current(nowDateTime) >= offsetDocking?.right - dataTableWidth.current - (gapQueue * nbGapNowDateRight.current);
                
            
                if (redLineDockLeft) { // If redLine is docked left
                    if (nowDateDockLeft) { // If nowDate is also docked left
                        if (date >= nowDateTime) {
                            offsetRedLine = offsetDockingRef.current.left + dataTableWidth.current + (gapQueue * nbGapRedLineLeft.current) //offsetDocking?.left + dataTableWidth.current + gapQueue
                        } else if (date <= nowDateTime) {
                            offsetRedLine = offsetDockingRef.current.left + dataTableWidth.current
                        }
                    } else {
                        offsetRedLine = offsetDockingRef.current.left + dataTableWidth.current
                    }
    
                    if (typeof queue.current.left.get('redLine') === 'undefined') {
                        queue.current.left.set('redLine', queue.current.left.size);
                    }
                } else {
                    queue.current.left.delete('redLine');
                }
    
                if (redLineDockRight) { // If redline is docked right
                    if (date >= nowDateTime) {
                        offsetRedLine = offsetDocking?.right
                    } else if (date <= nowDateTime) {
                        offsetRedLine = offsetDockingRef.current.right - (gapQueue * nbGapRedLineRight.current) //offsetDocking?.right - gapQueue
                    }
    
                    if (typeof queue.current.right.get('redLine') === 'undefined') {
                        queue.current.right.set('redLine', queue.current.right.size);
                    }
    
                } else {
                    queue.current.right.delete('redLine');
                }
                            
                setRedLineState({
                    ...redLineState,
                    x: (lockUnlockValue === "lock") ? dateToPixels.current(date) + dataTableWidth.current : redLineState.x,
                    text: dateText,
                    isDocked: redLineDockLeft || redLineDockRight,
                    offset: offsetRedLine ?? 0
                });
                redLineStateRef.current = { ...redLineState, x: (lockUnlockValue === "lock") ? dateToPixels.current(date) + dataTableWidth.current : redLineStateRef.current.x, text: dateText };
                dateRef.current = date;
    
                if (nowDateDockLeft) { // If nowDate is docked left
                    if (date >= nowDateTime) {
                        offsetNowDate = offsetDocking?.left + dataTableWidth.current;
                    } else if (date <= nowDateTime) {
                        offsetNowDate = offsetDockingRef.current.left + dataTableWidth.current + (gapQueue * nbGapNowDateLeft.current) //offsetDocking?.left + dataTableWidth.current + gapQueue;
                    }
    
                    if (typeof queue.current.left.get('nowDate') === 'undefined') {
                        queue.current.left.set('nowDate', queue.current.left.size);
                    }
                } else {
                    queue.current.left.delete('nowDate');
                }
    
                if (nowDateDockRight) { // If nowDate is docked right
                    if (redLineDockRight) { // If redLine is also docked right
                        if (date >= nowDateTime) {
                            offsetNowDate = offsetDockingRef.current.right - (gapQueue * nbGapNowDateRight.current) //offsetDocking?.right - gapQueue;
                        } else if (date <= nowDateTime) {
                            offsetNowDate = offsetDocking?.right;
                        }
                    } else {
                        offsetNowDate = offsetDocking?.right
                    }
                    
                    if (typeof queue.current.right.get('nowDate') === 'undefined') {
                        queue.current.right.set('nowDate', queue.current.right.size);
                    }
                } else {
                    queue.current.right.delete('nowDate');
                }
    
                setNowDateState({
                    ...nowDateState,
                    x: dateToPixels.current(nowDateTime) + dataTableWidth.current,
                    isDocked: nowDateDockLeft || nowDateDockRight,
                    offset: offsetNowDate ?? 0
                });
    
                nowDateStateRef.current = { ...nowDateState, x: dateToPixels.current(nowDateTime) + dataTableWidth.current };
                nowDateRef.current = nowDateTime;*/
                dateTextRef.current = dateText;
                dateRef.current = date;
                checkDockingElements();
            }
            // TODO: Check avec Guillaume pour savoir quand timescale.changed est trigger par une fonction. --> Attribut 'zoom' retourné par l'event timescale.changed à tester
            if (lockUnlockValue !== "lock" && !isDragginggantt.current && centerDate && centerDate.current) { // If lock then also move timescale with centerDate()
                centerDate.current(date);
            }
            isDragginggantt.current = false;
        }, [date, dateText, nowDateTime, dateToPixels, pixelsToDate, isGanttInit]);
        (0, React_1.useEffect)(() => {
            var _a, _b;
            if (((_a = context === null || context === void 0 ? void 0 : context.context) === null || _a === void 0 ? void 0 : _a.startContext) && restrictionStart) {
                isRestrictionStartActivated.current = (restrictionStart > ((_b = context === null || context === void 0 ? void 0 : context.context) === null || _b === void 0 ? void 0 : _b.startContext));
            }
        }, [restrictionStart, (_a = context === null || context === void 0 ? void 0 : context.context) === null || _a === void 0 ? void 0 : _a.startContext]);
        (0, React_1.useEffect)(() => {
            var _a, _b;
            if (((_a = context === null || context === void 0 ? void 0 : context.context) === null || _a === void 0 ? void 0 : _a.endContext) && restrictionEnd) {
                isRestrictionEndActivated.current = (restrictionEnd < ((_b = context === null || context === void 0 ? void 0 : context.context) === null || _b === void 0 ? void 0 : _b.endContext));
            }
        }, [restrictionEnd, (_b = context === null || context === void 0 ? void 0 : context.context) === null || _b === void 0 ? void 0 : _b.endContext]);
        (0, React_1.useEffect)(() => {
            if (offsetDocking) {
                offsetDockingRef.current = offsetDocking;
            }
        }, [offsetDocking]);
        const convertDateToPixels = (getPixels) => {
            dateToPixels.current = getPixels;
        };
        const convertPixelsToDate = (getDate) => {
            pixelsToDate.current = getDate;
        };
        const goToDateFunction = (myGoToDate) => {
            goToDate.current = myGoToDate;
        };
        const centerDateFunction = (myCenterDate) => {
            centerDate.current = myCenterDate;
        };
        const resizeFunction = (myResize) => {
            resize.current = myResize;
        };
        const getBirdviewNodesFunction = (myGetBirdviewNodes) => {
            getBirdviewNodesF.current = myGetBirdviewNodes;
        };
        const onDteResized = (info) => {
            dataTableWidth.current = info.width;
            if (dateToPixels.current && pixelsToDate.current) {
                //RedLine
                if (dateToPixels.current(dateRef.current) <= (offsetDocking === null || offsetDocking === void 0 ? void 0 : offsetDocking.left) + dataTableWidth.current + (gapQueue * nbGapRedLineLeft.current)) {
                    if (typeof queue.current.left.get('redLine') === 'undefined') {
                        queue.current.left.set('redLine', queue.current.left.size);
                    }
                }
                else if (dateToPixels.current(dateRef.current) >= (offsetDocking === null || offsetDocking === void 0 ? void 0 : offsetDocking.right) - (gapQueue * nbGapRedLineRight.current)) {
                    if (typeof queue.current.right.get('redLine') === 'undefined') {
                        queue.current.right.set('redLine', queue.current.right.size);
                    }
                }
                else {
                    queue.current.right.delete('redLine');
                    queue.current.left.delete('redLine');
                }
                //NowDate
                if (dateToPixels.current(nowDateRef.current) <= (offsetDocking === null || offsetDocking === void 0 ? void 0 : offsetDocking.left) + dataTableWidth.current + (gapQueue * nbGapNowDateLeft.current)) {
                    if (typeof queue.current.left.get('nowDate') === 'undefined') {
                        queue.current.left.set('nowDate', queue.current.left.size);
                    }
                }
                else if (dateToPixels.current(nowDateRef.current) >= (offsetDocking === null || offsetDocking === void 0 ? void 0 : offsetDocking.right) - (gapQueue * nbGapNowDateRight.current)) {
                    if (typeof queue.current.right.get('nowDate') === 'undefined') {
                        queue.current.right.set('nowDate', queue.current.right.size);
                    }
                }
                else {
                    queue.current.right.delete('nowDate');
                    queue.current.left.delete('nowDate');
                }
                checkDockingElements();
            }
        };
        const dockNowDate = () => {
            var _a, _b;
            if (dateToPixels.current && pixelsToDate.current && offsetDockingRef.current) {
                nbGapRedLineLeft.current = (_a = queue.current.left.get('redLine')) !== null && _a !== void 0 ? _a : 0;
                nbGapRedLineRight.current = (_b = queue.current.right.get('redLine')) !== null && _b !== void 0 ? _b : 0;
                // nowDate
                if (dateToPixels.current(nowDateRef.current) <= offsetDockingRef.current.left + (gapQueue * nbGapRedLineLeft.current)) {
                    setNowDateState({
                        ...nowDateStateRef.current,
                        x: offsetDockingRef.current.left + (gapQueue * nbGapRedLineLeft.current),
                        isDocked: true,
                        offset: offsetDockingRef.current.left + dataTableWidth.current + (gapQueue * nbGapRedLineLeft.current)
                    });
                    if (typeof queue.current.left.get('nowDate') === 'undefined') {
                        queue.current.left.set('nowDate', queue.current.left.size);
                    }
                }
                else if (dateToPixels.current(nowDateRef.current) >= offsetDockingRef.current.right - dataTableWidth.current - (gapQueue * nbGapRedLineRight.current)) {
                    setNowDateState({
                        ...nowDateStateRef.current,
                        x: offsetDockingRef.current.right - (gapQueue * nbGapRedLineRight.current),
                        isDocked: true,
                        offset: offsetDockingRef.current.right - (gapQueue * nbGapRedLineRight.current)
                    });
                    if (typeof queue.current.right.get('nowDate') === 'undefined') {
                        queue.current.right.set('nowDate', queue.current.right.size);
                    }
                }
                else {
                    setNowDateState({
                        ...nowDateStateRef.current,
                        x: dateToPixels.current(nowDateRef.current) + dataTableWidth.current,
                        isDocked: false
                    });
                    nowDateStateRef.current = { ...nowDateStateRef.current, x: dateToPixels.current(nowDateRef.current), isDocked: false };
                    queue.current.right.delete('nowDate');
                    queue.current.left.delete('nowDate');
                }
            }
        };
        const dockRedLine = () => {
            var _a, _b;
            if (dateToPixels.current && pixelsToDate.current && offsetDockingRef.current) {
                nbGapNowDateLeft.current = (_a = queue.current.left.get('nowDate')) !== null && _a !== void 0 ? _a : 0;
                nbGapNowDateRight.current = (_b = queue.current.right.get('nowDate')) !== null && _b !== void 0 ? _b : 0;
                // redline
                if (dateToPixels.current(dateRef.current) <= offsetDockingRef.current.left + (gapQueue * nbGapNowDateLeft.current)) {
                    setRedLineState({
                        ...redLineStateRef.current,
                        x: dateToPixels.current(dateRef.current),
                        isDocked: true,
                        offset: offsetDockingRef.current.left + dataTableWidth.current + (gapQueue * nbGapNowDateLeft.current)
                    });
                    if (typeof queue.current.left.get('redLine') === 'undefined') {
                        queue.current.left.set('redLine', queue.current.left.size);
                    }
                }
                else if (dateToPixels.current(dateRef.current) >= offsetDockingRef.current.right - dataTableWidth.current - (gapQueue * nbGapNowDateRight.current)) {
                    setRedLineState({
                        ...redLineStateRef.current,
                        x: offsetDockingRef.current.right - (gapQueue * nbGapNowDateRight.current),
                        isDocked: true,
                        offset: offsetDockingRef.current.right - (gapQueue * nbGapNowDateRight.current)
                    });
                    if (typeof queue.current.right.get('redLine') === 'undefined') {
                        queue.current.right.set('redLine', queue.current.right.size);
                    }
                }
                else { // If not docked
                    if (lockUnlockValueRef.current !== "lock" && centerDate && centerDate.current) { // If lock then also move timescale with centerDate()                     
                        setDate(new Date(pixelsToDate.current(redLineStateRef.current.x + dataTableWidth.current)));
                    }
                    else {
                        setRedLineState({
                            ...redLineStateRef.current,
                            text: dateTextRef.current,
                            x: dateToPixels.current(dateRef.current) + dataTableWidth.current,
                            isDocked: false
                        });
                    }
                    redLineStateRef.current = { ...redLineStateRef.current, x: dateToPixels.current(dateRef.current) + dataTableWidth.current, isDocked: false }; // Duplicated state in order to have access to it in onTimescaleChanged() 
                    queue.current.right.delete('redLine');
                    queue.current.left.delete('redLine');
                }
            }
        };
        /**
         * Manage docking SVG elements in Time Manager / Gantt
         */
        const checkDockingElements = (0, React_1.useCallback)(() => {
            if (dateToPixels.current && pixelsToDate.current && offsetDockingRef.current) {
                dockNowDate();
                dockRedLine();
                /*nbGapRedLineLeft.current = queue.current.left.get('redLine') ?? 0 as number;
                nbGapRedLineRight.current = queue.current.right.get('redLine') ?? 0 as number;
                nbGapNowDateLeft.current = queue.current.left.get('nowDate') ?? 0 as number;
                nbGapNowDateRight.current = queue.current.right.get('nowDate') ?? 0 as number;
    
                //redline
                if (dateToPixels.current(dateRef.current) <= offsetDockingRef.current.left + (gapQueue * nbGapRedLineLeft.current)) {
                    setRedLineState({
                        ...redLineStateRef.current,
                        x: dateToPixels.current(dateRef.current),
                        isDocked: true,
                        offset: offsetDockingRef.current.left  + dataTableWidth.current + (gapQueue * nbGapRedLineLeft.current)
                    });
    
                    if (typeof queue.current.left.get('redLine') === 'undefined') {
                        queue.current.left.set('redLine', queue.current.left.size);
                    }
                    
                } else if (dateToPixels.current(dateRef.current) >= offsetDockingRef.current.right - dataTableWidth.current - (gapQueue * nbGapRedLineRight.current)) {
                    setRedLineState({
                        ...redLineStateRef.current,
                        x: offsetDockingRef.current.right - (gapQueue * nbGapRedLineRight.current),
                        isDocked: true,
                        offset: offsetDockingRef.current.right - (gapQueue * nbGapRedLineRight.current)
                    });
    
                    if (typeof queue.current.right.get('redLine') === 'undefined') {
                        queue.current.right.set('redLine', queue.current.right.size);
                    }
                } else { // If not docked
    
                    if (lockUnlockValueRef.current !== "lock" && centerDate && centerDate.current) { // If lock then also move timescale with centerDate()
                        setDate(new Date(pixelsToDate.current(redLineStateRef.current.x + dataTableWidth.current)));
                    } else {
                        setRedLineState({
                            ...redLineStateRef.current,
                            text: dateTextRef.current,
                            x: dateToPixels.current(dateRef.current) + dataTableWidth.current,
                            isDocked: false
                        });
                    }
                    
                    redLineStateRef.current = { ...redLineStateRef.current, x: dateToPixels.current(dateRef.current) + dataTableWidth.current, isDocked: false }; // Duplicated state in order to have access to it in onTimescaleChanged()
                    queue.current.right.delete('redLine');
                    queue.current.left.delete('redLine');
                }
                
                // nowDate
                if (dateToPixels.current(nowDateRef.current) <= offsetDockingRef.current.left + (gapQueue * nbGapNowDateLeft.current)) {
                    setNowDateState({
                        ...nowDateStateRef.current,
                        x: offsetDockingRef.current.left + (gapQueue * nbGapNowDateLeft.current),
                        isDocked: true,
                        offset: offsetDockingRef.current.left + dataTableWidth.current + (gapQueue * nbGapNowDateLeft.current)
                    });
    
                    if (typeof queue.current.left.get('nowDate') === 'undefined') {
                        queue.current.left.set('nowDate', queue.current.left.size);
                    }
                    
                } else if (dateToPixels.current(nowDateRef.current) >= offsetDockingRef.current.right - dataTableWidth.current - (gapQueue * nbGapNowDateRight.current)) {
                    setNowDateState({
                        ...nowDateStateRef.current,
                        x: offsetDockingRef.current.right - (gapQueue * nbGapNowDateRight.current),
                        isDocked: true,
                        offset: offsetDockingRef.current.right - (gapQueue * nbGapNowDateRight.current)
                    });
    
                    if (typeof queue.current.right.get('nowDate') === 'undefined') {
                        queue.current.right.set('nowDate', queue.current.right.size);
                    }
                } else {
                    setNowDateState({
                        ...nowDateStateRef.current,
                        x: dateToPixels.current(nowDateRef.current) + dataTableWidth.current,
                        isDocked: false
                    });
                    nowDateStateRef.current = { ...nowDateStateRef.current, x: dateToPixels.current(nowDateRef.current), isDocked: false };
                    queue.current.right.delete('nowDate');
                    queue.current.left.delete('nowDate');
                }*/
            }
        }, [dateText]);
        (0, React_1.useEffect)(() => {
            statusValueRef.current = statusValue;
        }, [statusValue]);
        const onEmptyClick = (0, React_1.useCallback)((event) => {
            if (pixelsToDate.current && dateToPixels.current) {
                if (setStatusValue && statusValueRef.current !== "Play_Status_Pause")
                    setStatusValue("Play_Status_Pause");
                if (setDate)
                    setDate(new Date(event.date));
            }
        }, [statusValue]);
        const onTimescaleClicked = (0, React_1.useCallback)((event) => {
            if (pixelsToDate.current && dateToPixels.current) {
                if (setStatusValue && statusValueRef.current !== "Play_Status_Pause")
                    setStatusValue("Play_Status_Pause");
                if (setDate)
                    setDate(new Date(event.start));
            }
        }, [statusValue]);
        const onTimescaleChanged = (0, React_1.useCallback)((eventTimescale) => {
            isDragginggantt.current = true;
            if (dateToPixels.current && pixelsToDate.current) {
                checkDockingElements();
                if (restrictionStart) {
                    setRestrictionStartState({
                        ...restrictionStartRef.current,
                        width: dateToPixels.current(restrictionStartRef.current.date)
                    });
                    restrictionStartRef.current = { ...restrictionStartRef.current, width: dateToPixels.current(restrictionStartRef.current.date) };
                }
                if (restrictionEnd) {
                    setRestrictionEndState({
                        ...restrictionEndRef.current,
                        x: dateToPixels.current(restrictionEndRef.current.date),
                        width: (dateToPixels.current(eventTimescale.end) - dateToPixels.current(eventTimescale.start)) - dateToPixels.current(restrictionEndRef.current.date)
                    });
                    restrictionEndRef.current = { ...restrictionEndRef.current, x: dateToPixels.current(restrictionEndRef.current.date), width: (dateToPixels.current(eventTimescale.end) - dateToPixels.current(eventTimescale.start)) - dateToPixels.current(restrictionEnd) };
                }
                if (period) {
                    setPeriodState({
                        ...periodStateRef.current,
                        x: dateToPixels.current(period === null || period === void 0 ? void 0 : period.startPeriod),
                        width: dateToPixels.current(period === null || period === void 0 ? void 0 : period.endPeriod) - dateToPixels.current(period === null || period === void 0 ? void 0 : period.startPeriod)
                    });
                    periodStateRef.current = { ...periodStateRef.current, x: dateToPixels.current(period === null || period === void 0 ? void 0 : period.startPeriod), width: dateToPixels.current(period === null || period === void 0 ? void 0 : period.endPeriod) - dateToPixels.current(period === null || period === void 0 ? void 0 : period.startPeriod) };
                }
                if (context) {
                    setContextState({
                        ...contextStateRef.current,
                        x: dateToPixels.current(startContext),
                        width: dateToPixels.current(endContext) - dateToPixels.current(startContext)
                    });
                    contextStateRef.current = { ...contextStateRef.current, x: dateToPixels.current(startContext), width: dateToPixels.current(endContext) - dateToPixels.current(startContext) };
                }
                if (densityRowRef.current) {
                    setDensityState(getBirdviewNodesModel(densityRowRef.current));
                }
            }
        }, [densityRow, dateText]);
        /**
         * Keep restriction end inside context
         * @param e
         * @param pixelsToDate
         */
        const keepInContextRestrictionEnd = (e, pixelsToDate) => {
            var _a, _b, _c, _d;
            if (restriction && previousRestrictionEndX) {
                // true if restriction is getting dragged to the left
                const getDirection = (previousRestrictionEndX <= e.clientX - gapLeft);
                if ((restrictionEndState.x < contextState.width + contextState.x) || (e.clientX - gapLeft < contextState.width + contextState.x)) {
                    // Stop when restrictionEnd is close to restrictionStart
                    if ((restrictionStartState.width > restrictionEndState.x - 4 && getDirection) || (e.clientX - gapLeft < restrictionStartState.width)) {
                        restriction.setRestriction({
                            ...restriction.restriction,
                            restrictionEnd: new Date(pixelsToDate(restrictionStartState.width + gapLeft + 4 - offsetXRestrictionEnd.current)),
                        });
                        setDate(new Date(pixelsToDate(restrictionStartState.width + gapLeft + 3 - offsetXRestrictionEnd.current)));
                        return;
                    }
                    restriction.setRestriction({
                        ...restriction.restriction,
                        restrictionEnd: new Date(pixelsToDate(e.clientX - offsetXRestrictionEnd.current))
                    });
                    if (onRestrictionsChanged && restriction.restriction && restriction.restriction.restrictionStart)
                        onRestrictionsChanged({
                            restrictionStart: restriction.restriction.restrictionStart,
                            restrictionEnd: new Date(pixelsToDate(e.clientX - offsetXRestrictionEnd.current)),
                            isStartActive: false,
                            isEndActive: true
                        });
                    // Push redLine when restriction End is close to it
                    if (restrictionEndState.x - 2 <= redLineState.x && getDirection === false) {
                        setDate(new Date(pixelsToDate(e.clientX - 3 - offsetXRestrictionEnd.current)));
                    }
                }
                else {
                    restriction.setRestriction({
                        ...restriction.restriction,
                        restrictionEnd: (_a = context === null || context === void 0 ? void 0 : context.context) === null || _a === void 0 ? void 0 : _a.endContext
                    });
                    if (onRestrictionsChanged && ((_b = context === null || context === void 0 ? void 0 : context.context) === null || _b === void 0 ? void 0 : _b.endContext) && ((_c = restriction === null || restriction === void 0 ? void 0 : restriction.restriction) === null || _c === void 0 ? void 0 : _c.restrictionStart))
                        onRestrictionsChanged({
                            restrictionStart: restriction.restriction.restrictionStart,
                            restrictionEnd: (_d = context === null || context === void 0 ? void 0 : context.context) === null || _d === void 0 ? void 0 : _d.endContext,
                            isStartActive: false,
                            isEndActive: false
                        });
                }
            }
        };
        /**
         * Keep restriction start inside context
         * @param e
         * @param pixelsToDate
         */
        const keepInContextRestrictionStart = (e, pixelsToDate) => {
            var _a, _b, _c, _d;
            if (restriction && previousRestrictionStartWidth) {
                // true if restriction is getting dragged to the right
                const getDirection = (previousRestrictionStartWidth <= e.clientX);
                if ((restrictionStartState.width > contextState.x) || (e.clientX - gapLeft > contextState.x)) {
                    if (restrictionStartState.width + 4 > restrictionEndState.x && getDirection || (e.clientX - gapLeft > restrictionEndState.x)) {
                        restriction.setRestriction({
                            ...restriction.restriction,
                            restrictionStart: new Date(pixelsToDate(restrictionEndState.x + gapLeft - offsetXRestrictionStart.current))
                        });
                        setDate(new Date(pixelsToDate(restrictionEndState.x - 2)));
                        return;
                    }
                    restriction.setRestriction({
                        ...restriction.restriction,
                        restrictionStart: new Date(pixelsToDate(e.clientX - offsetXRestrictionStart.current))
                    });
                    if (onRestrictionsChanged && restriction.restriction && restriction.restriction.restrictionEnd)
                        onRestrictionsChanged({
                            restrictionStart: new Date(pixelsToDate(e.clientX - offsetXRestrictionStart.current)),
                            restrictionEnd: restriction.restriction.restrictionEnd,
                            isStartActive: true,
                            isEndActive: false
                        });
                    if (restrictionStartState.width + 2 >= redLineState.x && getDirection) {
                        setDate(new Date(pixelsToDate(e.clientX + 3 - offsetXRestrictionStart.current)));
                    }
                }
                else {
                    restriction.setRestriction({
                        ...restriction.restriction,
                        restrictionStart: (_a = context === null || context === void 0 ? void 0 : context.context) === null || _a === void 0 ? void 0 : _a.startContext
                    });
                    if (onRestrictionsChanged && ((_b = context === null || context === void 0 ? void 0 : context.context) === null || _b === void 0 ? void 0 : _b.startContext) && ((_c = restriction === null || restriction === void 0 ? void 0 : restriction.restriction) === null || _c === void 0 ? void 0 : _c.restrictionEnd))
                        onRestrictionsChanged({
                            restrictionStart: (_d = context === null || context === void 0 ? void 0 : context.context) === null || _d === void 0 ? void 0 : _d.startContext,
                            restrictionEnd: restriction.restriction.restrictionEnd,
                            isStartActive: false,
                            isEndActive: false
                        });
                }
            }
        };
        const startDrag = (e) => {
            e.preventDefault();
            // RedLine
            if (e.target.classList.contains('tmv1-draggable') && allowDraggablesRedLine.includes(e.target.id) && pixelsToDate.current && lockUnlockValueRef.current === "lock") {
                offsetXRedLine.current = e.clientX - redLineState.x;
                setRedLineState({
                    ...redLineState,
                    isDown: true,
                });
                window.isDownRedline = true;
                if (statusValue === "Play_Status_Live" || statusValue === "Play_Status_Forward")
                    setStatusValue("Play_Status_Pause");
                setDate(new Date(pixelsToDate.current(e.clientX - offsetXRedLine.current - dataTableWidth.current)));
            }
            // Restriction Start
            if (e.target.classList.contains('tmv1-draggable') && allowDraggablesRestrictionsStart.includes(e.target.id) && pixelsToDate.current && restriction) {
                offsetXRestrictionStart.current = e.clientX - restrictionStartState.width;
                setRestrictionStartState({
                    ...restrictionStartRef.current,
                    isDown: true,
                });
                restrictionStartRef.current = { ...restrictionStartRef.current, isDown: true };
                window.isDownRestrictionStart = true;
                keepInContextRestrictionStart(e, pixelsToDate.current);
            }
            // Restriction End
            if (e.target.classList.contains('tmv1-draggable') && allowDraggablesRestrictionsEnd.includes(e.target.id) && pixelsToDate.current && restriction) {
                offsetXRestrictionEnd.current = e.clientX - restrictionEndState.x;
                setRestrictionEndState({
                    ...restrictionEndState,
                    isDown: true,
                });
                restrictionEndRef.current = { ...restrictionEndState, isDown: true };
                window.isDownRestrictionEnd = true;
                keepInContextRestrictionEnd(e, pixelsToDate.current);
            }
        };
        const dragging = (e) => {
            e.preventDefault();
            // RedLine
            if (window.isDownRedline && allowDraggablesRedLine.includes(e.target.id) && (pixelsToDate === null || pixelsToDate === void 0 ? void 0 : pixelsToDate.current) && setDate) {
                (0, DELWebUtils_1.throttle)(setDate(new Date(pixelsToDate.current(e.clientX - offsetXRedLine.current - dataTableWidth.current))));
            }
            // Restriction Start
            if (window.isDownRestrictionStart && allowDraggablesRestrictionsStart.includes(e.target.id) && pixelsToDate.current && restriction && restriction.setRestriction) {
                keepInContextRestrictionStart(e, pixelsToDate.current);
            }
            // Restriction End
            if (window.isDownRestrictionEnd && allowDraggablesRestrictionsEnd.includes(e.target.id) && pixelsToDate.current && restriction && restriction.setRestriction) {
                keepInContextRestrictionEnd(e, pixelsToDate.current);
            }
        };
        const endDrag = (e) => {
            var _a, _b, _c, _d;
            e.preventDefault();
            // RedLine
            if (pixelsToDate.current && allowDraggablesRedLine.includes(e.target.id) && window.isDownRedline) {
                setRedLineState({
                    ...redLineState,
                    isDown: false,
                });
                setDate(new Date(pixelsToDate.current(e.clientX - offsetXRedLine.current - dataTableWidth.current)));
            }
            // Restriction Start
            if (pixelsToDate.current && allowDraggablesRestrictionsStart.includes(e.target.id) && window.isDownRestrictionStart && restriction) {
                setRestrictionStartState({
                    ...restrictionStartRef.current,
                    isDown: false,
                });
                restrictionStartRef.current = { ...restrictionStartRef.current, isDown: false };
                keepInContextRestrictionStart(e, pixelsToDate.current);
                if (onRestrictionsChanged && ((_a = restriction === null || restriction === void 0 ? void 0 : restriction.restriction) === null || _a === void 0 ? void 0 : _a.restrictionStart) && ((_b = restriction === null || restriction === void 0 ? void 0 : restriction.restriction) === null || _b === void 0 ? void 0 : _b.restrictionEnd))
                    onRestrictionsChanged({
                        restrictionStart: restriction.restriction.restrictionStart,
                        restrictionEnd: restriction.restriction.restrictionEnd,
                        isStartActive: false,
                        isEndActive: false
                    });
            }
            // Restriction End
            if (pixelsToDate.current && allowDraggablesRestrictionsEnd.includes(e.target.id) && window.isDownRestrictionEnd && restriction) {
                setRestrictionEndState({
                    ...restrictionEndState,
                    isDown: false,
                });
                restrictionEndRef.current = { ...restrictionEndState, isDown: false };
                keepInContextRestrictionEnd(e, pixelsToDate.current);
                if (onRestrictionsChanged && ((_c = restriction === null || restriction === void 0 ? void 0 : restriction.restriction) === null || _c === void 0 ? void 0 : _c.restrictionStart) && ((_d = restriction === null || restriction === void 0 ? void 0 : restriction.restriction) === null || _d === void 0 ? void 0 : _d.restrictionEnd))
                    onRestrictionsChanged({
                        restrictionStart: restriction.restriction.restrictionStart,
                        restrictionEnd: restriction.restriction.restrictionEnd,
                        isStartActive: false,
                        isEndActive: false
                    });
            }
            window.isDownRedline = false;
            window.isDownRestrictionStart = false;
            window.isDownRestrictionEnd = false;
        };
        const onClickNowDateFunction = (event, isActive, isDocked) => {
            if (isDocked && centerDate && centerDate.current && pixelsToDate && pixelsToDate.current) { // If click on docked now date button
                centerDate.current(new Date(nowDate.date));
            }
            if (onClickNowDate)
                onClickNowDate(event, isActive, isDocked);
        };
        const handleRedLineClick = () => {
            if (currentDate && currentDate.date && centerDate && centerDate.current) {
                centerDate.current(new Date(currentDate.date));
            }
        };
        (0, React_1.useEffect)(() => {
            if (typeof gapLeft !== "undefined" && typeof width !== "undefined" && typeof resize.current !== "undefined" && typeof pixelsToDate.current !== "undefined") {
                timeInformationsRefWidth.current = width - gapLeft;
                //resize.current(width - gapLeft, height);
                onTimescaleChanged({ start: pixelsToDate.current(0), end: pixelsToDate.current(width - gapLeft) });
            }
        }, [gapLeft, width]);
        const handleOnKeyUp = (0, React_1.useCallback)((event) => {
            const isZooming = event.key.includes('Control');
            setDisableEvent(!isZooming);
        }, []);
        const handleOnKeyDown = (0, React_1.useCallback)((event) => {
            const isZooming = event.ctrlKey;
            setDisableEvent(isZooming);
        }, []);
        (0, React_1.useEffect)(() => {
            if (typeof setNowDate !== "undefined") {
                var liveForward = setInterval(() => {
                    if (statusValueRef.current !== "Play_Status_Live") {
                        nowDateRef.current = new Date(nowDateTime.setSeconds(nowDateTime.getSeconds() + 1));
                        setNowDate(nowDateRef.current);
                    }
                }, 1000);
            }
            document.addEventListener('keyup', handleOnKeyUp);
            document.addEventListener('keydown', handleOnKeyDown);
            return () => {
                if (liveForward)
                    clearInterval(liveForward);
                document.removeEventListener('keyup', handleOnKeyUp);
                document.removeEventListener('keydown', handleOnKeyDown);
            };
        }, []);
        return (React.createElement(React.Fragment, null,
            React.createElement("svg", { className: "tmv1-DELTimePlayer tmv1-height-minified", xmlns: "http://www.w3.org/2000/svg", onPointerDown: startDrag, onPointerMove: dragging, onPointerUp: endDrag, ref: svgRef, id: id, width: timeInformationsRefWidth.current, height: height },
                React.createElement("foreignObject", { id: "ganttFO-" + id, width: width, height: height }, (children) ? React.cloneElement(children, { height, width, convertDateToPixels, convertPixelsToDate, onTimescaleChanged, onTimescaleClicked, onDteResized, isInit: setIsGanttInit, goToDate: goToDateFunction, resize: resizeFunction, _centerDate: centerDateFunction }) :
                    React.createElement(DELPlanningCharts_1.default, { id: "gantt-" + id, options: chartOptions, isInit: setIsGanttInit, convertDateToPixels: convertDateToPixels, convertPixelsToDate: convertPixelsToDate, goToDate: goToDateFunction, _centerDate: centerDateFunction, onTimescaleChanged: onTimescaleChanged, onTimescaleClicked: onTimescaleClicked, onEmptyClick: onEmptyClick, resize: resizeFunction, getBirdviewNodes: getBirdviewNodesFunction, nodes: customNodes, entries: dteTM, rowHeight: true, width: width, height: height })),
                (children) ? '' : React.createElement(Line_1.default, { id: id, x: 0, x2: "100%", y: 35 }),
                (densityState && densityState.length > 0 && dateToPixels && dateToPixels.current) ?
                    React.createElement(DensityLine_1.default, { id: id }, //@ts-ignore
                    densityState.filter((density) => density.start > 0 && (density.end - density.start > 0) && density.start < offsetDocking.right + gapLeft).map((density) => React.createElement("rect", { key: density.id, y: "35", height: "10", fill: density.color, x: density.start, width: density.end - density.start }))) : "",
                context && React.createElement(Context_1.default, { id: id, x: contextState.x, y: contextState.y, width: contextState.width, height: contextState.height, isMinified: contextState.isMinified }),
                period && React.createElement(Period_1.default, { id: id, x: periodState.x, y: periodState.y, width: periodState.width, height: periodState.height, isMinified: periodState.isMinified }),
                React.createElement(NowDate_1.default, { id: "nowDate-" + id, disableEvent: disableEvent, x: nowDateState.x, y: nowDateState.y, text: nowDateState.text, isDocked: nowDateState.isDocked, offset: nowDateState.offset, mode: mode, onClick: onClickNowDateFunction, tooltip: tooltipNowDate }),
                React.createElement(RedLine_1.default, { id: "redLine-" + id, disableEvent: disableEvent, x: redLineState.x, y: redLineState.y, height: height, text: redLineState.text, isDocked: redLineState.isDocked, offset: redLineState.offset, isMinified: redLineState.isMinified, onClick: handleRedLineClick, tooltip: tooltipCurrentDateProp }),
                restriction && React.createElement(React.Fragment, null,
                    React.createElement(Restriction_1.default, { id: "restrictionL-" + id, x: restrictionStartState.x, y: restrictionStartState.y, width: restrictionStartState.width, height: restrictionStartState.height, side: "right", isDragged: isRestrictionStartActivated.current, mode: mode, isMinified: restrictionStartState.isMinified }),
                    React.createElement(Restriction_1.default, { id: "restrictionR-" + id, x: restrictionEndState.x, y: restrictionEndState.y, width: restrictionEndState.width, height: restrictionEndState.height, side: "left", isDragged: isRestrictionEndActivated.current, mode: mode, isMinified: restrictionEndState.isMinified })))));
    });
    DELTimePlayer.displayName = "DELTimePlayer";
    exports.default = DELTimePlayer;
});
