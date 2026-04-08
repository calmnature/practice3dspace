/// <amd-module name="DS/DELTimeManagerV1/subcomponents/NowDate"/>
define("DS/DELTimeManagerV1/subcomponents/NowDate", ["require", "exports", "DS/React18Loader/React", "DS/React18Loader/React", "DS/DELContext/PlayerStatusContext"], function (require, exports, React, React_1, PlayerStatusContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const NowDate = ({ disableEvent = false, id, isDocked = false, x, y, mode, onClick, offset, text = "LIVE", tooltip = "Go to live" }) => {
        const playerStatus = (0, React_1.useContext)(PlayerStatusContext_1.PlayerStatusContext);
        const nowDateSVG = (0, React_1.useRef)(null);
        const liveRectSVG = (0, React_1.useRef)(null);
        const livText = (0, React_1.useRef)(null);
        const tspanSVG = (0, React_1.useRef)(null);
        const triangleSVG = (0, React_1.useRef)(null);
        const isLiveModeref = (0, React_1.useRef)(false);
        const [positionX, setPositionX] = (0, React_1.useState)(x);
        const [tspanSVGWidth, setTspanSVGWidth] = (0, React_1.useState)(62);
        const [rectColor, setRectColor] = (0, React_1.useState)("#898989");
        const onClickNowDate = (event) => {
            if ((playerStatus === null || playerStatus === void 0 ? void 0 : playerStatus.statusValue) === "Play_Status_Live") {
                isLiveModeref.current = false;
            }
            else {
                isLiveModeref.current = true;
            }
            if (onClick)
                onClick(event, isLiveModeref.current, isDocked);
        };
        const handleOnWheel = React.useCallback((event) => {
            if (event.ctrlKey)
                event.preventDefault();
        }, [nowDateSVG]);
        (0, React_1.useEffect)(() => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            if (disableEvent) {
                (_a = nowDateSVG.current) === null || _a === void 0 ? void 0 : _a.classList.add('pointerEventsNone');
                (_b = triangleSVG.current) === null || _b === void 0 ? void 0 : _b.classList.add('pointerEventsNone');
                (_c = liveRectSVG.current) === null || _c === void 0 ? void 0 : _c.classList.add('pointerEventsNone');
                (_d = livText.current) === null || _d === void 0 ? void 0 : _d.classList.add('pointerEventsNone');
            }
            else if (!disableEvent) {
                (_e = nowDateSVG.current) === null || _e === void 0 ? void 0 : _e.classList.remove('pointerEventsNone');
                (_f = triangleSVG.current) === null || _f === void 0 ? void 0 : _f.classList.remove('pointerEventsNone');
                (_g = liveRectSVG.current) === null || _g === void 0 ? void 0 : _g.classList.remove('pointerEventsNone');
                (_h = livText.current) === null || _h === void 0 ? void 0 : _h.classList.remove('pointerEventsNone');
            }
        }, [disableEvent]);
        (0, React_1.useEffect)(() => {
            if (nowDateSVG.current !== null) {
                nowDateSVG.current.addEventListener('wheel', handleOnWheel, { passive: false });
            }
            return () => {
                if (nowDateSVG.current !== null) {
                    nowDateSVG.current.removeEventListener('wheel', handleOnWheel);
                }
            };
        }, [nowDateSVG]);
        (0, React_1.useEffect)(() => {
            if (mode === "Planned") {
                setRectColor("#898989");
            }
            else if (mode === "Realized") {
                setRectColor("#66bcec"); //#026399
            }
        }, [mode]);
        (0, React_1.useEffect)(() => {
            if (isDocked) {
                setPositionX(offset);
            }
            else {
                setPositionX(x);
            }
        }, [x, offset, isDocked]);
        (0, React_1.useEffect)(() => {
            if (tspanSVG.current && tspanSVGWidth) {
                setTspanSVGWidth(tspanSVG.current.getBBox().width + 26);
            }
        }, [tspanSVG.current, text]);
        (0, React_1.useEffect)(() => {
            if (liveRectSVG.current) {
                document.documentElement.style.setProperty('--transitionDuration', '150ms');
            }
        }, [liveRectSVG.current]);
        (0, React_1.useEffect)(() => {
            if (livText.current && liveRectSVG.current && triangleSVG.current) {
                if (isDocked) { // Docked
                    livText.current.style.setProperty('opacity', "0");
                    liveRectSVG.current.style.setProperty('width', '20');
                    liveRectSVG.current.style.setProperty('transform', "translate(0, 0)");
                    triangleSVG.current.style.setProperty('opacity', "0");
                }
                else if (!isDocked) { // Undocked
                    livText.current.style.setProperty('opacity', "1");
                    liveRectSVG.current.style.removeProperty('width');
                    liveRectSVG.current.style.removeProperty('transform');
                    triangleSVG.current.style.setProperty('opacity', "1");
                }
            }
        }, [isDocked]);
        return (React.createElement("svg", { ref: nowDateSVG },
            React.createElement("g", { onClick: onClickNowDate },
                React.createElement("svg", { ref: triangleSVG, id: "liveTriangle-" + id, x: positionX - 12, y: y + 12, visibility: "visible", style: { opacity: 1 }, role: "button" },
                    React.createElement("path", { d: "M13.5 10L0.0766068 0.25L26.9234 0.25L13.5 10Z", fill: rectColor })),
                React.createElement("rect", { ref: liveRectSVG, id: "liveRect-" + id, x: positionX, y: y, className: "tmv1-shadow tmv1-width", width: tspanSVGWidth, height: 17, rx: 4, fill: rectColor, visibility: "visible", transform: `translate(-${tspanSVGWidth / 2 + 2} 0)`, style: { opacity: 1 }, role: "button" }),
                React.createElement("g", { id: "g-liveIcon-" + id, transform: `translate(${(isDocked) ? positionX + 1 : positionX - tspanSVGWidth / 2} 1) scale(0.8)`, visibility: "visible", style: { opacity: "1" }, role: "button" },
                    React.createElement("path", { id: "liveIcon-" + id, fill: "#fff", d: "M5.14,17.84A9,9,0,0,1,4.19,5.1a9.37,9.37,0,0,1,.95-.94L6.32,5.52a7.17,7.17,0,0,0,0,11Zm3.52-4.12L7.48,15.09a5.39,5.39,0,0,1-.58-7.6,5.29,5.29,0,0,1,.58-.58L8.66,8.27a3.58,3.58,0,0,0-.41,5.05A3.87,3.87,0,0,0,8.66,13.72ZM11,12.8A1.8,1.8,0,1,1,12.8,11h0A1.81,1.81,0,0,1,11,12.8Zm3.52,2.29-1.18-1.37a3.57,3.57,0,0,0,.41-5,4,4,0,0,0-.41-.41l1.18-1.36a5.39,5.39,0,0,1,.58,7.6A5.29,5.29,0,0,1,14.52,15.09Zm2.34,2.75-1.18-1.36a7.21,7.21,0,0,0,.79-10.17,7.37,7.37,0,0,0-.79-.79l1.18-1.36a9,9,0,0,1,.95,12.74A9.37,9.37,0,0,1,16.86,17.84Z" })),
                React.createElement("text", { ref: livText, id: "liveText-" + id, fontFamily: "Arial", fontSize: "12", x: positionX + 36, y: y + 13, textAnchor: "middle", visibility: "visible", fill: "#fff", transform: `translate(-30 0)`, style: { opacity: 1, display: "inline" }, className: "tmv1-opacity user-select-none", role: "button" },
                    React.createElement("tspan", { ref: tspanSVG },
                        text,
                        " ",
                        isDocked ? React.createElement("title", null, tooltip) : '')))));
    };
    exports.default = NowDate;
});
