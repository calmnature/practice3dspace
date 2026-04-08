/// <amd-module name="DS/DELPopup/Popup"/>
define("DS/DELPopup/Popup", ["require", "exports", "DS/React18Loader/React", "DS/React18Loader/React", "DS/Controls/Popup", "css!./assets/css/DELPopup.css"], function (require, exports, React, React_1, WUXPopup) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PopupTrigger = exports.PopupConstraint = exports.PopupAlignment = exports.PopupPosition = void 0;
    var PopupPosition;
    (function (PopupPosition) {
        PopupPosition["bottom"] = "bottom";
        PopupPosition["left"] = "left";
        PopupPosition["right"] = "right";
        PopupPosition["top"] = "top";
    })(PopupPosition || (exports.PopupPosition = PopupPosition = {}));
    var PopupAlignment;
    (function (PopupAlignment) {
        PopupAlignment["center"] = "center";
        PopupAlignment["far"] = "far";
        PopupAlignment["near"] = "near";
    })(PopupAlignment || (exports.PopupAlignment = PopupAlignment = {}));
    var PopupConstraint;
    (function (PopupConstraint) {
        PopupConstraint["none"] = "none";
        PopupConstraint["screen"] = "screen";
    })(PopupConstraint || (exports.PopupConstraint = PopupConstraint = {}));
    var PopupTrigger;
    (function (PopupTrigger) {
        PopupTrigger["click"] = "click";
        PopupTrigger["focus"] = "focus";
        PopupTrigger["hover"] = "hover";
        PopupTrigger["mousePress"] = "mousePress";
    })(PopupTrigger || (exports.PopupTrigger = PopupTrigger = {}));
    const Popup = ({ children, content, options }) => {
        const targetRef = (0, React_1.useRef)(null);
        const wuxPopupRef = (0, React_1.useRef)();
        (0, React_1.useEffect)(() => {
            if (!children || Array.isArray(children)) {
                console.warn("Error: only one children is allowed"); // TO DO @XXE
            }
            else {
                if (targetRef.current) {
                    wuxPopupRef.current = new WUXPopup();
                }
            }
            return () => {
                if (wuxPopupRef && wuxPopupRef.current) {
                    wuxPopupRef.current.destroy();
                    wuxPopupRef.current = undefined;
                }
            };
        }, []);
        // Popup Properties
        (0, React_1.useEffect)(() => {
            if (options) {
                wuxPopupRef.current = new WUXPopup({
                    alignment: (options && options.alignment) ? options.alignment : PopupAlignment.near,
                    autoHide: (options && options.autoHide !== undefined) ? options.autoHide : true,
                    beforeDisplayCallback: (options && options.beforeDisplayCallback) ? options.beforeDisplayCallback : undefined,
                    constraint: (options && options.constraint) ? options.constraint : PopupConstraint.none,
                    identifier: (options && options.identifier) ? options.identifier : '',
                    mouseRelativePosition: (options && options.mouseRelativePosition !== undefined) ? options.mouseRelativePosition : false,
                    offset: { x: 0, y: 0 },
                    position: (options && options.position) ? options.position : PopupPosition.right,
                    positionTarget: (options && options.positionTarget) ? options.positionTarget : undefined,
                    resizableFlag: (options && options.resizableFlag !== undefined) ? options.resizableFlag : false,
                    toggleFlag: (options && options.toggleFlag !== undefined) ? options.toggleFlag : true,
                    trigger: (options && options.trigger) ? options.trigger : '',
                    visibleFlag: (options && options.visibleFlag !== undefined) ? options.visibleFlag : false,
                    target: targetRef.current
                });
            }
        }, [options]);
        (0, React_1.useEffect)(() => {
            if (content && wuxPopupRef.current) {
                wuxPopupRef.current.setBody(content);
            }
        }, [content]);
        return (React.createElement("div", { className: "popupWrapper", ref: targetRef }, children));
    };
    exports.default = Popup;
});
