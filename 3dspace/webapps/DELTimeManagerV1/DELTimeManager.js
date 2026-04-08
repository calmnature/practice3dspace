/// <amd-module name="DS/DELTimeManagerV1/DELTimeManager"/>
define("DS/DELTimeManagerV1/DELTimeManager", ["require", "exports", "DS/React18Loader/React", "DS/DELTimeManagerV1/subcomponents/DELTimePlayer", "DS/DELTimeManagerV1/subcomponents/DELTimeCommands", "DS/DELExpanderV1/DELExpanderV1", "DS/React18Loader/React", "DS/DELGanttProvidersV1/DELIssuesToNodesProvider", "DS/DELGanttProvidersV1/DELSerializedOperationsToNodesProvider", "DS/DELContext/PlayerStatusContext", "DS/DELContext/LockUnlockContext", "css!./assets/css/DELTimeManager.css"], function (require, exports, React, DELTimePlayer_1, DELTimeCommands_1, DELExpanderV1_1, React_1, DELIssuesToNodesProvider_1, DELSerializedOperationsToNodesProvider_1, PlayerStatusContext_1, LockUnlockContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const DELTimeManager = ({ onCommands, id = "DELTimeManagerV1", issues, lang = "en", lock, minifyAnimation = true, height = 111, period, playerStatus, context, currentDate, mode, nowDate, onClickExpander, onClickNowDate, restriction, serializedOperations, timeCommands = { time: currentDate.dateText, date: currentDate.dateText } }) => {
        const timeInformationsRef = (0, React_1.useRef)(null);
        const timeInformationsRefWidth = (0, React_1.useRef)(0);
        const timemanagerContainerRef = (0, React_1.useRef)(null);
        const DELPXPExpanderProperties = (0, React_1.useRef)({ height: 24, width: 35, paddingTop: 18 });
        const [isGanttInit, setIsGanttInit] = (0, React_1.useState)(false);
        const [offsetDockingTM, setOffsetDockingTM] = (0, React_1.useState)({ left: 20, right: document.body.clientWidth - 75 });
        const [width, setWidth] = (0, React_1.useState)(document.body.clientWidth);
        const [isMinified, setIsMinified] = (0, React_1.useState)(false);
        const [restrictionsTimeCommands, setRestrictionsTimeCommands] = (0, React_1.useState)({
            restrictionStart: (restriction) ? restriction.restriction.restrictionStart : new Date(),
            restrictionEnd: (restriction) ? restriction.restriction.restrictionEnd : new Date(),
            isStartActive: false,
            isEndActive: false
        });
        const DELPXPBtnHideShowWidth = DELPXPExpanderProperties.current.width;
        const issuesToNodes = (0, React_1.useMemo)(() => {
            if (issues) {
                if ((mode === null || mode === void 0 ? void 0 : mode.mode) === "Planned") {
                    return (0, DELIssuesToNodesProvider_1.scheduleIssuesToNodes)(issues);
                }
                else {
                    return (0, DELIssuesToNodesProvider_1.actualIssuesToNodes)(issues);
                }
            }
            else {
                return [];
            }
        }, [issues, mode === null || mode === void 0 ? void 0 : mode.mode]);
        const operationsToNodes = (0, React_1.useMemo)(() => {
            if (serializedOperations && mode && mode.mode && Object.keys(serializedOperations).length > 0) {
                return (0, DELSerializedOperationsToNodesProvider_1.serializedOperationsToNodesProvider)(serializedOperations, mode === null || mode === void 0 ? void 0 : mode.mode, 'id', false, false);
            }
            else {
                return undefined;
            }
        }, [serializedOperations, mode]);
        const onRestrictionsDrag = (restriction) => {
            setRestrictionsTimeCommands(restriction);
        };
        const resizeObserver = new ResizeObserver((entries) => {
            var _a;
            if (timeInformationsRef.current !== null && typeof entries[0] !== "undefined") {
                setOffsetDockingTM({ ...offsetDockingTM, right: entries[0].target.clientWidth - ((_a = timeInformationsRef.current) === null || _a === void 0 ? void 0 : _a.clientWidth) - 40 - DELPXPBtnHideShowWidth });
                setWidth(entries[0].target.clientWidth);
            }
            else if (typeof entries[0] !== "undefined") {
                setOffsetDockingTM({ ...offsetDockingTM, right: entries[0].target.clientWidth - 40 - DELPXPBtnHideShowWidth });
                setWidth(entries[0].target.clientWidth);
            }
        });
        const onClickHideShowFunction = (e, isActive) => {
            if (onClickExpander)
                onClickExpander(e, isActive);
            if (minifyAnimation)
                setIsMinified(isActive);
        };
        (0, React_1.useEffect)(() => {
            if (timemanagerContainerRef.current !== null) {
                resizeObserver.observe(timemanagerContainerRef.current);
            }
            return function cleanup() {
                if (timemanagerContainerRef.current !== null) {
                    resizeObserver.unobserve(timemanagerContainerRef.current);
                }
            };
        }, []);
        (0, React_1.useEffect)(() => {
            var _a, _b;
            if (timeInformationsRef.current) {
                timeInformationsRefWidth.current = document.body.clientWidth - ((_a = timeInformationsRef.current) === null || _a === void 0 ? void 0 : _a.clientWidth);
                setOffsetDockingTM({ ...offsetDockingTM, right: document.body.clientWidth - ((_b = timeInformationsRef.current) === null || _b === void 0 ? void 0 : _b.clientWidth) - 40 - DELPXPBtnHideShowWidth });
            }
        }, [timeInformationsRef.current]);
        return (React.createElement("div", { id: id, className: "tmv1-timeManager-container", ref: timemanagerContainerRef, style: { width: '100%' } },
            React.createElement(LockUnlockContext_1.LockUnlockContext.Provider, { value: lock !== null && lock !== void 0 ? lock : { lockUnlockValue: "lock", setLockUnlockValue: () => { } } },
                React.createElement(PlayerStatusContext_1.PlayerStatusContext.Provider, { value: playerStatus !== null && playerStatus !== void 0 ? playerStatus : { statusValue: "Play_Status_Pause", setStatusValue: () => { } } },
                    React.createElement(DELTimeCommands_1.default, { ref: timeInformationsRef, restriction: restrictionsTimeCommands, mode: mode, height: height, date: timeCommands === null || timeCommands === void 0 ? void 0 : timeCommands.time, onCommands: onCommands, isMinified: isMinified }),
                    React.createElement(DELExpanderV1_1.default, { key: "BtnHideShow" + id, onClick: onClickHideShowFunction, backgroundColor: ((mode === null || mode === void 0 ? void 0 : mode.mode) === 'Realized') ? "#026399" : "#898989", height: DELPXPExpanderProperties.current.height, width: DELPXPExpanderProperties.current.width, paddingTop: DELPXPExpanderProperties.current.paddingTop }),
                    React.createElement(DELTimePlayer_1.default, { key: "TimePlayer" + id, currentDate: currentDate, height: height, id: id, isMinified: isMinified, lang: lang, nowDate: nowDate, gapLeft: 250, offsetDocking: offsetDockingTM, period: period, context: context, restriction: restriction, width: width, mode: mode === null || mode === void 0 ? void 0 : mode.mode, onClickNowDate: onClickNowDate, onRestrictionsChanged: onRestrictionsDrag, densityRow: operationsToNodes, customNodes: issuesToNodes })))));
    };
    exports.default = DELTimeManager;
});
