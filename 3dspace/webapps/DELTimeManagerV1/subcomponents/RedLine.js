/// <amd-module name="DS/DELTimeManagerV1/subcomponents/RedLine"/>
define("DS/DELTimeManagerV1/subcomponents/RedLine", ["require", "exports", "DS/React18Loader/React", "DS/React18Loader/React", "DS/DELContext/PlayerStatusContext", "css!../assets/css/DELRedLine.css"], function (require, exports, React, React_1, PlayerStatusContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const RedLine = ({ disableEvent = false, id, x, y, offset, onClick, opacity, tooltip = "Go to date", translateX = 0, translateY = 0, height = 91, text, isDocked = false, isMinified = false }) => {
        const { statusValue } = (0, React_1.useContext)(PlayerStatusContext_1.PlayerStatusContext);
        const redlineContainerRef = (0, React_1.useRef)(null);
        const redLineSVG = (0, React_1.useRef)(null);
        const tspanSVG = (0, React_1.useRef)(null);
        const textSVG = (0, React_1.useRef)(null);
        const redRectSVG = (0, React_1.useRef)(null);
        const triangleSVG = (0, React_1.useRef)(null);
        const logoSVG = (0, React_1.useRef)(null);
        const animateRedLineRef = (0, React_1.useRef)(null);
        const [minifiedHeight, setMinifiedHeight] = (0, React_1.useState)({
            from: 0,
            to: height
        });
        const [positionX, setPositionX] = (0, React_1.useState)(x);
        const [tspanSVGWidth, setTspanSVGWidth] = (0, React_1.useState)(60);
        //const isDefaultModeRef: boolean = useRef<boolean>(mode === "Default");
        const isLiveModeRef = (0, React_1.useRef)(statusValue === "Play_Status_Live");
        const isPlayModeRef = (0, React_1.useRef)(statusValue === "Play_Status_Forward");
        const isActiveMode = (0, React_1.useRef)(isLiveModeRef.current || isPlayModeRef.current);
        const handleClick = (e) => {
            if (onClick)
                onClick(e);
        };
        const handleOnWheel = React.useCallback((event) => {
            if (event.ctrlKey)
                event.preventDefault();
        }, [redlineContainerRef]);
        (0, React_1.useEffect)(() => {
            var _a, _b, _c, _d, _e, _f;
            if (disableEvent) {
                (_a = redLineSVG.current) === null || _a === void 0 ? void 0 : _a.classList.add('pointerEventsNone');
                (_b = triangleSVG.current) === null || _b === void 0 ? void 0 : _b.classList.add('pointerEventsNone');
                (_c = redRectSVG.current) === null || _c === void 0 ? void 0 : _c.classList.add('pointerEventsNone');
            }
            else if (!disableEvent) {
                (_d = redLineSVG.current) === null || _d === void 0 ? void 0 : _d.classList.remove('pointerEventsNone');
                (_e = triangleSVG.current) === null || _e === void 0 ? void 0 : _e.classList.remove('pointerEventsNone');
                (_f = redRectSVG.current) === null || _f === void 0 ? void 0 : _f.classList.remove('pointerEventsNone');
            }
        }, [disableEvent]);
        (0, React_1.useEffect)(() => {
            if (redlineContainerRef.current !== null) {
                redlineContainerRef.current.addEventListener('wheel', handleOnWheel, { passive: false });
            }
            return () => {
                if (redlineContainerRef.current !== null) {
                    redlineContainerRef.current.removeEventListener('wheel', handleOnWheel);
                }
            };
        }, [redlineContainerRef]);
        (0, React_1.useEffect)(() => {
            isLiveModeRef.current = statusValue === "Play_Status_Live";
            isPlayModeRef.current = statusValue === "Play_Status_Forward";
            isActiveMode.current = isLiveModeRef.current || isPlayModeRef.current;
            if (tspanSVG.current) {
                if (isActiveMode.current) {
                    setTspanSVGWidth(tspanSVG.current.getBBox().width + 36);
                }
                else if (!isActiveMode.current) {
                    setTspanSVGWidth(tspanSVG.current.getBBox().width + 16);
                }
            }
        }, [statusValue]);
        (0, React_1.useEffect)(() => {
            if (animateRedLineRef.current) {
                if (isMinified) {
                    setMinifiedHeight({ from: height, to: 33 });
                }
                else if (!isMinified) {
                    setMinifiedHeight({ from: 33, to: height });
                }
                animateRedLineRef.current.beginElement();
            }
        }, [isMinified]);
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
                if (isActiveMode.current) {
                    setTspanSVGWidth(tspanSVG.current.getBBox().width + 36);
                }
                else if (!isActiveMode.current) {
                    setTspanSVGWidth(tspanSVG.current.getBBox().width + 16);
                }
            }
        }, [tspanSVG.current, text]);
        (0, React_1.useEffect)(() => {
            if (redLineSVG.current) {
                document.documentElement.style.setProperty('--transitionDuration', '150ms');
            }
        }, [redLineSVG.current]);
        (0, React_1.useEffect)(() => {
            if (redLineSVG.current && textSVG.current && redRectSVG.current && tspanSVG.current && triangleSVG.current) {
                if (isDocked) { // Docked
                    redLineSVG.current.style.setProperty('--redLineHeight', "0px");
                    textSVG.current.style.setProperty('opacity', "0");
                    redRectSVG.current.style.setProperty('width', "20");
                    redRectSVG.current.style.setProperty('transform', "translate(0, 0)");
                    triangleSVG.current.style.setProperty('opacity', "0");
                }
                else if (!isDocked) { // Undocked
                    redLineSVG.current.style.setProperty('--redLineHeight', `${height - y}px`);
                    textSVG.current.style.setProperty('opacity', "1");
                    redRectSVG.current.style.removeProperty('width');
                    redRectSVG.current.style.removeProperty('transform');
                    triangleSVG.current.style.setProperty('opacity', "1");
                }
            }
        }, [isDocked, height]);
        (0, React_1.useEffect)(() => {
            if (logoSVG.current) {
                if (isDocked) {
                    logoSVG.current.style.setProperty('opacity', "1");
                }
                else {
                    logoSVG.current.style.setProperty('opacity', "0");
                }
            }
        }, [isDocked, logoSVG.current]);
        return (React.createElement("svg", { ref: redlineContainerRef },
            React.createElement("rect", { ref: redLineSVG, id: id, x: positionX, y: y + 17, height: height - y, fill: "#CC0A31", opacity: opacity, transform: `translate(${translateX}, ${translateY})`, style: { strokeWidth: 10 }, width: 2, stroke: "transparent", className: "tmv1-draggable tmv1-height tmv1-opacity" }),
            React.createElement("svg", { ref: triangleSVG, id: "triangle-" + id, className: "tmv1-draggable tmv1-shadow tmv1-opacity", x: positionX - 12, y: y + 12 },
                React.createElement("path", { d: "M13.5 10L0.0766068 0.25L26.9234 0.25L13.5 10Z", transform: "translate(-0.5 0)", fill: "#CC0A31" })),
            React.createElement("rect", { ref: redRectSVG, id: "redRect-" + id, x: positionX, y: y, width: tspanSVGWidth, height: 17, rx: 4, fill: "#CC0A31", opacity: opacity, transform: `translate(-${(tspanSVGWidth / 2) - 2}, 0)`, className: `tmv1-shadow tmv1-redLine ${(isDocked ? "tmv1-clickable" : "tmv1-draggable")}`, onClick: handleClick }, isDocked ? React.createElement("title", null, tooltip) : ''),
            isDocked ? React.createElement("g", { ref: logoSVG, id: "g-centerAdded" + id, transform: ` translate(${positionX + 2}, 2) scale(0.7)`, className: `tmv1-opacity ${(isDocked ? "tmv1-clickable" : "")}`, onClick: handleClick },
                React.createElement("path", { id: "playIcontm-c1", fill: "#fff", opacity: "1", d: "M21,5V17l-8-6Z" }),
                React.createElement("path", { id: "playIcon2tm-c1", fill: "#fff", opacity: "1", d: "M1,17V5l8,6Z" }),
                React.createElement("rect", { id: "playIcon3tm-c1", fill: "#fff", x: "10", width: "2", height: "20", opacity: "1" }),
                isDocked ? React.createElement("title", null, tooltip) : '') : '',
            React.createElement("text", { ref: textSVG, id: "textToolTip-" + id, textRendering: "geometricPrecision", fontFamily: "Arial", fontSize: "12px", textAnchor: "middle", x: positionX, y: y, fill: "#fff", transform: `translate(${isActiveMode.current ? 10 : 1}, 12.5)`, style: { display: "inline" }, className: "tmv1-draggable pr-none tmv1-redLine" },
                React.createElement("tspan", { id: "hourToolTip-" + id, ref: tspanSVG, className: "tmv1-draggable" }, text)),
            isLiveModeRef.current && !isDocked ? React.createElement("g", { id: "g-liveAdded-" + id, transform: `translate(${positionX - (tspanSVGWidth / 2) + 6} 0.5) scale(0.8)` },
                React.createElement("circle", { cx: "11", cy: "11", r: "2", fill: "#fff" }),
                React.createElement("path", { id: "liveWave2-" + id, className: "liveModeAnimation", fill: "#fff", d: "M8.4,14.027,7.086,15.541a5.988,5.988,0,0,1,0-9.086L8.4,7.969a3.978,3.978,0,0,0,0,6.058Zm6.515,1.514L13.6,14.027a3.978,3.978,0,0,0,0-6.058l1.313-1.514a5.988,5.988,0,0,1,.642,8.444A6.08,6.08,0,0,1,14.914,15.541Z" }),
                React.createElement("path", { id: "liveWave3-" + id, className: "liveModeAnimation", fill: "#fff", d: "M4.485,18.6a10.033,10.033,0,0,1,0-15.2L5.8,4.91a8.014,8.014,0,0,0,0,12.173ZM8.4,14.027,7.086,15.541a5.988,5.988,0,0,1,0-9.086L8.4,7.969a3.978,3.978,0,0,0,0,6.058Zm6.515,1.514L13.6,14.027a3.978,3.978,0,0,0,0-6.058l1.313-1.514a5.988,5.988,0,0,1,.642,8.444A6.08,6.08,0,0,1,14.914,15.541Zm2.6,3.063L16.2,17.087a8.013,8.013,0,0,0,0-12.172L17.515,3.4a10.033,10.033,0,0,1,0,15.2Z" })) : '',
            isPlayModeRef.current && !isDocked ? React.createElement("g", { id: "g-playAdded-" + id, transform: `translate(${positionX - (tspanSVGWidth / 2) + 5} -1.5) scale(0.95)` },
                React.createElement("path", { id: "playAdded-" + id, fill: "#fff", opacity: "1", d: "M8,16.48v-10A.52.52,0,0,1,8.52,6a.68.68,0,0,1,.27.07l9.92,5a.51.51,0,0,1,0,.92l-9.92,5a.68.68,0,0,1-.27.07A.52.52,0,0,1,8,16.48Z" })) : '')
        // <animate ref={ animateRedLineRef } attributeName="height" from={ minifiedHeight.from } to={ minifiedHeight.to } dur="0.3s" fill="freeze" />
        );
    };
    exports.default = RedLine;
});
