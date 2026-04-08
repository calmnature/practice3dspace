/// <amd-module name="DS/DELStatusComponentV1/DELStatusV1"/>
define("DS/DELStatusComponentV1/DELStatusV1", ["require", "exports", "DS/React18Loader/React", "DS/DELPXPFoundations/PXPUtils", "DS/DELInfraWeb/store/DELStore", "DS/DELLoader/Loader", "DS/React18Loader/React", "DS/ReactRedux/ReactRedux", "DS/DELInfraWeb/hooks/useStatusSliceSelector", "DS/Core/WebUXGlobalEnums", "css!./assets/css/DELStatusV1.css"], function (require, exports, React, Utils, DELStore_1, Loader_1, React_1, ReactRedux_1, useStatusSliceSelector_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.enDELStatusSide = void 0;
    var enDELStatusSide;
    (function (enDELStatusSide) {
        enDELStatusSide[enDELStatusSide["LEFT"] = 0] = "LEFT";
        enDELStatusSide[enDELStatusSide["RIGHT"] = 1] = "RIGHT";
    })(enDELStatusSide || (exports.enDELStatusSide = enDELStatusSide = {}));
    var enCSSDisplay;
    (function (enCSSDisplay) {
        enCSSDisplay["none"] = "none";
        enCSSDisplay["block"] = "block";
    })(enCSSDisplay || (enCSSDisplay = {}));
    var enContainerWidth;
    (function (enContainerWidth) {
        enContainerWidth["status"] = "26px";
        enContainerWidth["loading"] = "300px";
    })(enContainerWidth || (enContainerWidth = {}));
    const DELStatusComp = ({ id = "DELStatus-" + Utils.UUIDv4(), offsets = { bottomBoundary: 0, sideBoundary: 0 }, side = enDELStatusSide.RIGHT, uris = [] }) => {
        const store = (0, ReactRedux_1.useStore)();
        const statusComp = (0, useStatusSliceSelector_1.useComputedStatusSliceSelector)(store, uris);
        const [cssDisplayContainer, setCssDisplayContainer] = (0, React_1.useState)(enCSSDisplay.block);
        const [cssLeftContainer, setCssLeftContainer] = (0, React_1.useState)('');
        const [cssRightContainer, setCssRightContainer] = (0, React_1.useState)(`${offsets.sideBoundary}px`);
        const [classNameCircle, setClassNameCircle] = (0, React_1.useState)('compStatus-Circle compStatus-Circle-Error');
        const [cssDisplayCircle, setCssDisplayCircle] = (0, React_1.useState)(enCSSDisplay.block);
        const [cssAnimationCircle, setCssAnimationCircle] = (0, React_1.useState)(`animationERROR`);
        const [classNameIcon, setClassNameIcon] = (0, React_1.useState)('compStatus-Icon wux-ui-3ds wux-ui-3ds-close');
        const [displayLoading, setDisplayLoading] = (0, React_1.useState)(false);
        const [optionsLoader, setOptionsLoader] = (0, React_1.useState)({ fadeDuration: 300, height: 20 });
        //----------------------------------------------
        // SIDE and OFFSETS
        //----------------------------------------------
        (0, React_1.useEffect)(() => {
            if (side === enDELStatusSide.RIGHT && cssLeftContainer !== '') {
                setCssLeftContainer('');
                setCssRightContainer(`${offsets.sideBoundary}px`);
            }
            else if (side === enDELStatusSide.LEFT && cssRightContainer !== '') {
                setCssRightContainer('');
                setCssLeftContainer(`${offsets.sideBoundary}px`);
            }
        }, [side, offsets]);
        //----------------------------------------------
        // STATUS
        //----------------------------------------------
        (0, React_1.useEffect)(() => {
            if (statusComp) {
                // Sucess: hide component
                if (statusComp.status === DELStore_1.enDELStatus.success) {
                    if (cssAnimationCircle !== '') {
                        setCssAnimationCircle('');
                    }
                    if (cssDisplayContainer !== enCSSDisplay.none) {
                        setCssDisplayContainer(enCSSDisplay.none);
                    }
                }
                else {
                    if (cssDisplayContainer !== enCSSDisplay.block) {
                        setCssDisplayContainer(enCSSDisplay.block);
                    }
                    // LOADING
                    if (statusComp.status === DELStore_1.enDELStatus.loading) {
                        if (cssAnimationCircle !== '') {
                            setCssAnimationCircle('');
                        }
                        if (cssDisplayCircle !== enCSSDisplay.none) {
                            setCssDisplayCircle(enCSSDisplay.none);
                        }
                        if (!displayLoading) {
                            setDisplayLoading(true);
                        }
                    }
                    else if ((statusComp.status === DELStore_1.enDELStatus.error || statusComp.status === DELStore_1.enDELStatus.critical)) {
                        // ERROR and CRITICAL
                        if (displayLoading) {
                            setDisplayLoading(false);
                        }
                        if (cssAnimationCircle !== 'animationERROR') {
                            setCssAnimationCircle('animationERROR');
                        }
                        if (cssDisplayCircle !== enCSSDisplay.block) {
                            setCssDisplayCircle(enCSSDisplay.block);
                        }
                        if (classNameCircle !== 'compStatus-Circle compStatus-Circle-Error') {
                            setClassNameCircle('compStatus-Circle compStatus-Circle-Error');
                        }
                        if (classNameIcon !== 'compStatus-Icon compStatus-Icon-Error wux-ui-3ds wux-ui-3ds-close') {
                            setClassNameIcon('compStatus-Icon compStatus-Icon-Error wux-ui-3ds wux-ui-3ds-close');
                        }
                    }
                    else if (statusComp.status === DELStore_1.enDELStatus.warning && classNameCircle !== 'compStatus-Circle compStatus-Circle-Warning') {
                        // WARNING
                        if (displayLoading) {
                            setDisplayLoading(false);
                        }
                        if (cssAnimationCircle !== 'animationWARNING') {
                            setCssAnimationCircle('animationWARNING');
                        }
                        if (cssDisplayCircle !== enCSSDisplay.block) {
                            setCssDisplayCircle(enCSSDisplay.block);
                        }
                        if (classNameCircle !== 'compStatus-Circle compStatus-Circle-Warning') {
                            setClassNameCircle('compStatus-Circle compStatus-Circle-Warning');
                        }
                        if (classNameIcon !== 'compStatus-Icon compStatus-Icon-Warning wux-ui-3ds wux-ui-3ds-attention') {
                            setClassNameIcon('compStatus-Icon compStatus-Icon-Warning wux-ui-3ds wux-ui-3ds-attention');
                        }
                    }
                }
                /*export type DELGlobalStatus = {
                  status: enDELStatus,
                  description: DELStatusDescription,
                  additionalInfo?: DELStatusAdditionalInfo[]
                }*/
            }
        }, [statusComp]);
        return (React.createElement("div", { id: id, className: "compStatus-Container", style: {
                position: 'absolute',
                display: `${cssDisplayContainer}`,
                bottom: `${offsets.bottomBoundary}px`,
                left: `${cssLeftContainer}`,
                right: `${cssRightContainer}`
            } },
            React.createElement("div", { className: classNameCircle, style: { display: `${cssDisplayCircle}`, animationName: `${cssAnimationCircle}` } },
                React.createElement("span", { className: classNameIcon })),
            React.createElement(Loader_1.default, { isVisible: displayLoading, options: optionsLoader })));
    };
    exports.default = DELStatusComp;
});
