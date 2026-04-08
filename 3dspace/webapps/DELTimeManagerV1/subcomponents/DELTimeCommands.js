/// <amd-module name="DS/DELTimeManagerV1/subcomponents/DELTimeCommands"/>
define("DS/DELTimeManagerV1/subcomponents/DELTimeCommands", ["require", "exports", "DS/React18Loader/React", "DS/WebappsUtils/WebappsUtils", "DS/DELReactControls/Controls/Button", "DS/React18Loader/React", "DS/DELContext/PlayerStatusContext", "DS/DELContext/LockUnlockContext"], function (require, exports, React, WebappsUtils, Button_1, React_1, PlayerStatusContext_1, LockUnlockContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function commandsReducer(state, action) {
        switch (action.type) {
            case "updateOne": {
                return state.map((item, index) => {
                    if (index !== action.payload.index) {
                        return item;
                    }
                    return {
                        ...item,
                        ...action.payload.payload
                    };
                });
            }
            default:
                return state;
        }
    }
    const DELTimeCommands = (0, React_1.forwardRef)(({ date, height, onCommands, mode = { mode: 'Planned', setMode: () => { } }, isMinified, restriction }, ref) => {
        const plannedImg = WebappsUtils.getWebappsAssetUrl('DELTimeManagerV1', 'img/I_MXP_Virtual_normal.svg');
        const plannedImgOver = WebappsUtils.getWebappsAssetUrl('DELTimeManagerV1', 'img/I_MXP_Virtual_activeOver.svg');
        const realizedImg = WebappsUtils.getWebappsAssetUrl('DELTimeManagerV1', 'img/I_MXP_Real_normal.svg');
        const realizedImgOver = WebappsUtils.getWebappsAssetUrl('DELTimeManagerV1', 'img/I_MXP_Real_activeOver.svg');
        //@ts-ignore
        const { statusValue, setStatusValue } = (0, React_1.useContext)(PlayerStatusContext_1.PlayerStatusContext);
        const stateValueRef = (0, React_1.useRef)(statusValue);
        const { lockUnlockValue, setLockUnlockValue } = (0, React_1.useContext)(LockUnlockContext_1.LockUnlockContext);
        const lockUnlockValueRef = (0, React_1.useRef)(lockUnlockValue);
        const { mode: modeValue, setMode } = mode;
        const [bgColor, setGetbgColor] = (0, React_1.useState)('');
        const [img, setImg] = (0, React_1.useState)(plannedImg);
        const timeContainerRef = (0, React_1.useRef)(null);
        const dateContainerRef = (0, React_1.useRef)(null);
        const switchModeContainerRef = (0, React_1.useRef)(null);
        const commandContainerRef = (0, React_1.useRef)(null);
        const imgRef = (0, React_1.useRef)(null);
        const isPointerOver = (0, React_1.useRef)(false);
        const containerHeightRef = (0, React_1.useRef)(50);
        (0, React_1.useEffect)(() => {
            lockUnlockValueRef.current = lockUnlockValue;
        }, [lockUnlockValue]);
        (0, React_1.useEffect)(() => {
            stateValueRef.current = statusValue;
        }, [statusValue]);
        //@ts-ignore
        const [commands, dispatch] = (0, React_1.useReducer)(commandsReducer, [
            {
                tooltip: "Settings",
                buttonProperties: {
                    displayStyle: "icon",
                    label: "cog",
                    domId: "tmv1-btnTimeInformationsSettings",
                    touchMode: false,
                    icon: {
                        iconName: "cog",
                        fontIconFamily: 1
                    },
                    showLabelFlag: false
                },
                onButtonClick: (e) => {
                    var _a;
                    if (onCommands && onCommands[0] && onCommands[0].onButtonClick) {
                        (_a = onCommands[0]) === null || _a === void 0 ? void 0 : _a.onButtonClick(e);
                    }
                    if (lockUnlockValueRef.current === "lock") {
                        setLockUnlockValue("unlock");
                        lockUnlockValueRef.current = "unlock";
                    }
                    else if (lockUnlockValueRef.current === "unlock") {
                        setLockUnlockValue("lock");
                        lockUnlockValueRef.current = "lock";
                    }
                }
            },
            {
                tooltip: "Previous period",
                buttonProperties: {
                    displayStyle: "icon",
                    label: "fast-previous",
                    domId: "tmv1-btnTimeInformationsPrevious",
                    touchMode: false,
                    icon: {
                        iconName: "play-previous",
                        fontIconFamily: 1
                    },
                    showLabelFlag: false
                },
                onButtonClick: (e) => {
                    var _a;
                    if (onCommands && onCommands[1] && onCommands[1].onButtonClick) {
                        (_a = onCommands[1]) === null || _a === void 0 ? void 0 : _a.onButtonClick(e);
                    }
                }
            },
            {
                tooltip: "Previous step",
                buttonProperties: {
                    displayStyle: "icon",
                    label: "Resume",
                    domId: "tmv1-btnTimeInformationsResume",
                    touchMode: false,
                    icon: {
                        iconName: "resume",
                        fontIconFamily: 1
                    },
                    showLabelFlag: false
                },
                onButtonClick: (e) => {
                    var _a;
                    if (onCommands && onCommands[2] && onCommands[2].onButtonClick) {
                        (_a = onCommands[2]) === null || _a === void 0 ? void 0 : _a.onButtonClick(e);
                    }
                }
            },
            {
                tooltip: "Play",
                buttonProperties: {
                    displayStyle: "icon",
                    label: "Play",
                    domId: "tmv1-btnTimeInformationsPlay",
                    touchMode: false,
                    icon: {
                        iconName: "play",
                        fontIconFamily: 1
                    },
                    showLabelFlag: false
                },
                onButtonClick: (e) => {
                    var _a;
                    if (onCommands && onCommands[3] && onCommands[3].onButtonClick) {
                        (_a = onCommands[3]) === null || _a === void 0 ? void 0 : _a.onButtonClick(e);
                    }
                    if (stateValueRef.current === "Play_Status_Pause") { // Change icon play / pause
                        //@ts-ignore
                        dispatch({ type: "updateOne", payload: { index: 3, payload: { ...commands[3], tooltip: "Pause", buttonProperties: { ...commands[3].buttonProperties, domId: "btnTimeInformationsPause", icon: { ...commands[3].buttonProperties.icon, iconName: "pause" } } } } });
                        if (setStatusValue)
                            setStatusValue("Play_Status_Forward");
                    }
                    else if (stateValueRef.current === "Play_Status_Forward" || stateValueRef.current === "Play_Status_Live") {
                        //@ts-ignore
                        dispatch({ type: "updateOne", payload: { index: 3, payload: { ...commands[3], tooltip: "Play", buttonProperties: { ...commands[3].buttonProperties, domId: "btnTimeInformationsPlay", icon: { ...commands[3].buttonProperties.icon, iconName: "play" } } } } });
                        if (setStatusValue)
                            setStatusValue("Play_Status_Pause");
                    }
                }
            },
            {
                tooltip: "Next step",
                buttonProperties: {
                    displayStyle: "icon",
                    label: "Resume",
                    domId: "tmv1-btnTimeInformationsResumeReverse",
                    touchMode: false,
                    icon: {
                        iconName: "resume",
                        fontIconFamily: 1
                    },
                    showLabelFlag: false
                },
                onButtonClick: (e) => {
                    var _a;
                    if (onCommands && onCommands[4] && onCommands[4].onButtonClick) {
                        (_a = onCommands[4]) === null || _a === void 0 ? void 0 : _a.onButtonClick(e);
                    }
                }
            },
            {
                tooltip: "Next period",
                buttonProperties: {
                    displayStyle: "icon",
                    label: "PlayNext",
                    domId: "tmv1-btnTimeInformationsPlayNext",
                    touchMode: false,
                    icon: {
                        iconName: "play-next",
                        fontIconFamily: 1
                    },
                    showLabelFlag: false
                },
                onButtonClick: (e) => {
                    var _a;
                    if (onCommands && onCommands[5] && onCommands[5].onButtonClick) {
                        (_a = onCommands[5]) === null || _a === void 0 ? void 0 : _a.onButtonClick(e);
                    }
                }
            },
            {
                tooltip: "Speed",
                buttonProperties: {
                    displayStyle: "icon",
                    label: "FastForward",
                    domId: "tmv1-btnTimeInformationsFastForward",
                    touchMode: false,
                    icon: {
                        iconName: "fast-forward",
                        fontIconFamily: 1
                    },
                    showLabelFlag: false
                },
                onButtonClick: (e) => {
                    var _a;
                    if (onCommands && onCommands[6] && onCommands[6].onButtonClick) {
                        (_a = onCommands[6]) === null || _a === void 0 ? void 0 : _a.onButtonClick(e);
                    }
                }
            },
        ]);
        const commandLength = (commands) ? Object.keys(commands).length : 0;
        (0, React_1.useEffect)(() => {
            if (ref && timeContainerRef.current && switchModeContainerRef.current && commandContainerRef.current && imgRef.current && dateContainerRef.current) {
                if (isMinified) {
                    timeContainerRef.current.style.setProperty('opacity', "0");
                    timeContainerRef.current.style.setProperty('height', "0");
                    switchModeContainerRef.current.style.setProperty('height', "50px");
                    commandContainerRef.current.style.setProperty('opacity', "0");
                    commandContainerRef.current.style.setProperty('display', "none");
                    imgRef.current.style.setProperty('margin-bottom', "10px");
                    dateContainerRef.current.style.setProperty('margin-top', "8px");
                }
                else if (!isMinified) {
                    timeContainerRef.current.style.setProperty('opacity', "1");
                    timeContainerRef.current.style.setProperty('height', "27px");
                    switchModeContainerRef.current.style.setProperty('height', "72px");
                    commandContainerRef.current.style.setProperty('opacity', "1");
                    commandContainerRef.current.style.setProperty('display', "grid");
                    imgRef.current.style.removeProperty('margin-bottom');
                    dateContainerRef.current.style.removeProperty('margin-top');
                }
            }
        }, [isMinified]);
        const handlePointerDown = (e) => {
            setMode((modeValue === 'Planned') ? 'Realized' : 'Planned');
        };
        const handlePointerOver = (e) => {
            isPointerOver.current = true;
            if (modeValue === 'Planned') {
                setImg(plannedImgOver);
            }
            else if (modeValue === 'Realized') {
                setImg(realizedImgOver);
            }
        };
        const handlePointerLeave = (e) => {
            isPointerOver.current = false;
            if (modeValue === 'Planned') {
                setImg(plannedImg);
            }
            else if (modeValue === 'Realized') {
                setImg(realizedImg);
            }
        };
        (0, React_1.useEffect)(() => {
            if (modeValue) {
                const color = modeValue === 'Planned' ? '#3D3D3D' : '#005686';
                const img = modeValue === 'Planned' ? (isPointerOver.current) ? plannedImgOver : plannedImg : (isPointerOver.current) ? realizedImgOver : realizedImg;
                setImg(img);
                setGetbgColor(color);
            }
        }, [modeValue]);
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { ref: ref, id: "tmv1-timeCommands", className: "tmv1-timeInformation-container tmv1-height-minified", style: { height: (!isMinified) ? height : containerHeightRef.current, backgroundColor: bgColor, width: 250 } },
                React.createElement("div", { className: "tmv1-main-container" },
                    React.createElement("div", { ref: switchModeContainerRef, className: "tmv1-switchMode-container tmv1-height-minified", onPointerDown: handlePointerDown, onPointerOver: handlePointerOver, onPointerLeave: handlePointerLeave },
                        React.createElement("img", { ref: imgRef, src: img, className: "tmv1-switchModeImg" })),
                    React.createElement("div", { className: "tmv1-dates-container" },
                        (restriction.isStartActive) ? React.createElement("div", { ref: dateContainerRef, className: "tmv1-restrictionFormat-container my-auto" }, restriction.restrictionStart.toLocaleString('en-US')) : React.createElement(React.Fragment, null),
                        (restriction.isEndActive) ? React.createElement("div", { ref: dateContainerRef, className: "tmv1-restrictionFormat-container my-auto" }, restriction.restrictionEnd.toLocaleString('en-US')) : React.createElement(React.Fragment, null),
                        (!restriction.isStartActive && !restriction.isEndActive) ? React.createElement(React.Fragment, null,
                            React.createElement("div", { ref: timeContainerRef, className: "tmv1-time-container tmv1-height-minified-opacity" }, date.toString()),
                            React.createElement("div", { ref: dateContainerRef, className: "tmv1-dateFormat-container" },
                                React.createElement("span", { title: restriction.restrictionStart.toLocaleString('en-US') }, restriction.restrictionStart.toLocaleString('en-US', { day: '2-digit', month: 'short' })),
                                " - ",
                                React.createElement("span", { title: restriction.restrictionEnd.toLocaleString('en-US') }, restriction.restrictionEnd.toLocaleString('en-US', { day: '2-digit', month: 'short' })))) : React.createElement(React.Fragment, null))),
                React.createElement("div", { ref: commandContainerRef, className: "tmv1-command-container tmv1-opacity", style: { gridTemplateColumns: `repeat(${commandLength}, 1fr)` } }, commands === null || commands === void 0 ? void 0 : commands.map((command) => React.createElement("div", { key: (0, React_1.useId)(), title: command.tooltip },
                    React.createElement(Button_1.default, { buttonProperties: command.buttonProperties, onChange: command === null || command === void 0 ? void 0 : command.onButtonChange, onClick: command === null || command === void 0 ? void 0 : command.onButtonClick, onDoubleClick: command === null || command === void 0 ? void 0 : command.onButtonDblClick })))))));
    });
    DELTimeCommands.displayName = "DELTimeCommands";
    exports.default = DELTimeCommands;
});
