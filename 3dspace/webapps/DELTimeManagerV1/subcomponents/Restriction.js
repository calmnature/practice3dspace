/// <amd-module name="DS/DELTimeManagerV1/subcomponents/Restriction"/>
define("DS/DELTimeManagerV1/subcomponents/Restriction", ["require", "exports", "DS/React18Loader/React", "DS/React18Loader/React"], function (require, exports, React, React_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Restriction = ({ id, x, y, width, height, side = "right", isDragged = false, isMinified = false, mode = "Planned" }) => {
        const isRight = (0, React_1.useRef)(true);
        const animateBorderRef = (0, React_1.useRef)(null);
        const handleRectRef = (0, React_1.useRef)(null);
        const ARectRef = (0, React_1.useRef)(null);
        const BRectRef = (0, React_1.useRef)(null);
        const CRectRef = (0, React_1.useRef)(null);
        const [opacityRef, setOpacityRef] = (0, React_1.useState)({
            from: 0,
            to: 1
        });
        const [rectColor, setRectColor] = (0, React_1.useState)("#dbdbdb");
        const [borderColor, setBorderColor] = (0, React_1.useState)("#B4B6BA");
        (0, React_1.useEffect)(() => {
            if (animateBorderRef.current && handleRectRef.current && ARectRef.current && BRectRef.current && CRectRef.current) {
                if (isMinified) {
                    handleRectRef.current.style.setProperty('opacity', "0");
                    ARectRef.current.style.setProperty('opacity', "0");
                    BRectRef.current.style.setProperty('opacity', "0");
                    CRectRef.current.style.setProperty('opacity', "0");
                    console.log(isMinified);
                    setOpacityRef({
                        from: 1,
                        to: 0
                    });
                }
                else if (!isMinified) {
                    handleRectRef.current.style.setProperty('opacity', "1");
                    ARectRef.current.style.setProperty('opacity', "1");
                    BRectRef.current.style.setProperty('opacity', "1");
                    CRectRef.current.style.setProperty('opacity', "1");
                    setOpacityRef({
                        from: 0,
                        to: 1
                    });
                }
                animateBorderRef.current.beginElement();
            }
        }, [isMinified]);
        (0, React_1.useEffect)(() => {
            if (mode === "Planned") {
                setRectColor("#dbdbdb");
                setBorderColor("#B4B6BA");
            }
            else if (mode === "Realized") {
                setRectColor("#83bbe6");
                setBorderColor("#83bbe6");
            }
        }, [mode]);
        const onPointerOver = (event) => {
            if (mode === "Planned") {
                setBorderColor("#8a8c91");
            }
            else if (mode === "Realized") {
                setBorderColor("#368ec4");
            }
        };
        const onPointerLeave = (event) => {
            if (mode === "Planned") {
                setBorderColor("#B4B6BA");
            }
            else if (mode === "Realized") {
                setBorderColor("#83bbe6");
            }
        };
        (0, React_1.useEffect)(() => {
            isRight.current = (side === "right") ? true : false;
        }, [side]);
        (0, React_1.useEffect)(() => {
            if (isDragged) {
                setRectColor((mode === "Planned") ? "#adadad" : "#4196D8");
            }
            else {
                setRectColor((mode === "Planned") ? "#dbdbdb" : "#83bbe6");
            }
        }, [isDragged]);
        return (React.createElement(React.Fragment, null,
            React.createElement("rect", { id: "rect-" + id, className: "pr-none tmv1-draggable", x: x, y: y, width: (width < 0) ? 0 : width, height: height, fill: rectColor, fillOpacity: "0.4", visibility: "visible" }),
            React.createElement("g", { onPointerOver: onPointerOver, onPointerLeave: onPointerLeave },
                React.createElement("rect", { id: "border-" + id, x: (isRight.current) ? width : x, y: y, width: "2", height: height, fill: borderColor, visibility: "visible", className: "tmv1-draggable" }),
                React.createElement("rect", { ref: handleRectRef, id: "handler-" + id, x: (isRight.current) ? width - 4 : x - 4, y: y * 3, width: "11", height: "24", rx: "1.5", fill: "#fff", stroke: borderColor, strokeLinejoin: "round", strokeWidth: "1.5", style: { opacity: 1 }, visibility: "visible", className: `tmv1-shadow tmv1-draggable tmv1-opacity` },
                    React.createElement("animate", { ref: animateBorderRef, attributeType: "CSS", attributeName: "opacity", from: opacityRef.from, to: opacityRef.to, dur: "0.3s", fill: "freeze" })),
                React.createElement("rect", { ref: ARectRef, id: "handlerLineA-" + id, x: (isRight.current) ? width : x, y: y * 3 + 8, width: "3", height: "1.5", fill: borderColor, style: { opacity: 1 }, visibility: "visible", className: `tmv1-draggable tmv1-opacity` }),
                React.createElement("rect", { ref: BRectRef, id: "handlerLineB-" + id, x: (isRight.current) ? width : x, y: y * 3 + 11, width: "3", height: "1.5", fill: borderColor, style: { opacity: 1 }, visibility: "visible", className: `tmv1-draggable tmv1-opacity` }),
                React.createElement("rect", { ref: CRectRef, id: "handlerLineC-" + id, x: (isRight.current) ? width : x, y: y * 3 + 14, width: "3", height: "1.5", fill: borderColor, style: { opacity: 1 }, visibility: "visible", className: `tmv1-draggable tmv1-opacity` }))));
    };
    exports.default = Restriction;
});
