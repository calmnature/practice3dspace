/// <amd-module name="DS/DELExpanderV1/DELExpanderV1"/>
define("DS/DELExpanderV1/DELExpanderV1", ["require", "exports", "DS/React18Loader/React", "DS/React18Loader/React", "css!./assets/css/DELExpenderV1.css"], function (require, exports, React, React_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const DELPXPExpander = ({ height = 25, display = true, id = "myBtnHideShow", paddingTop = 19, backgroundColor = "#898989", onClick, translateY = -8, width = 35, right = 0 }) => {
        const [isActive, setIsActive] = (0, React_1.useState)(false);
        const onClickFunction = (event) => {
            setIsActive(!isActive);
            if (onClick)
                onClick(event, !isActive);
        };
        const style = {
            width: width,
            height: height,
            background: backgroundColor,
            paddingTop: paddingTop,
            right: right,
            "--translateY": translateY + 'px'
        };
        return (React.createElement("div", { className: "pxpExpander-container" },
            React.createElement("div", { id: id, className: display ? "pxpExpander pxpExpander-display" : "pxpExpander pxpExpander-hidden", style: style, onClick: onClickFunction },
                React.createElement("span", { className: `pxpExpander-Icon wux-ui-3ds ${(isActive) ? `wux-ui-3ds-expand-down` : `wux-ui-3ds-expand-up`}` }))));
    };
    exports.default = DELPXPExpander;
});
