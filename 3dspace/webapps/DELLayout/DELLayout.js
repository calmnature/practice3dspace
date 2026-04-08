/// <amd-module name="DS/DELLayout/DELLayout"/>
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("DS/DELLayout/DELLayout", ["require", "exports", "DS/React18Loader/React", "DS/DELReactControls/Controls/Button", "DS/DELSplitter/DELSplitter", "./LayoutProvider", "DS/DELReactControls/Skeleton/SkeletonCenterContainer", "DS/DELReactControls/Skeleton/SkeletonLayout", "DS/DELReactControls/Skeleton/SkeletonLeftContainer", "DS/DELReactControls/Skeleton/SkeletonStatusContainer"], function (require, exports, React, Button_1, DELSplitter_1, LayoutProvider_1, SkeletonCenterContainer_1, SkeletonLayout_1, SkeletonLeftContainer_1, SkeletonStatusContainer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DELLayout = void 0;
    Button_1 = __importDefault(Button_1);
    DELSplitter_1 = __importDefault(DELSplitter_1);
    SkeletonCenterContainer_1 = __importDefault(SkeletonCenterContainer_1);
    SkeletonLayout_1 = __importDefault(SkeletonLayout_1);
    SkeletonLeftContainer_1 = __importDefault(SkeletonLeftContainer_1);
    SkeletonStatusContainer_1 = __importDefault(SkeletonStatusContainer_1);
    const DELLayoutMenu = React.forwardRef(({ className, items, ...props }, ref) => (React.createElement("div", { ref: ref, "data-dellayout": "menu", className: "d-flex w-100 mw-0 flex-column gap-1 py-3" + " " + className, ...props }, items.map((item, index) => (React.createElement(DELLayoutMenuItem, { key: index },
        React.createElement(DELLayoutMenuButton, { component: item.component },
            React.createElement("img", { src: item.icon }),
            React.createElement("span", null, item.label)),
        React.createElement(DELLayoutMenuAction, { component: item.component, pinAuto: true })))))));
    DELLayoutMenu.displayName = "DELSidebarMenu"; // TODO: DELLayoutMenu
    const DELLayoutMenuItem = React.forwardRef(({ className, ...props }, ref) => (React.createElement("div", { ref: ref, "data-sidebar": "menu-item", className: "position-relative" + " " + className || "", ...props })));
    DELLayoutMenuItem.displayName = "DELSidebarMenuItem";
    const DELLayoutMenuButton = React.forwardRef(({ isActive = false, asChild, className, component, ...props }, ref) => {
        const { activeComponent, activateComponent } = (0, LayoutProvider_1.useDELLayoutContext)();
        const isActiveComponent = activeComponent === component;
        return (React.createElement("button", { onClick: () => activateComponent(component || null), ref: ref, "data-sidebar": "menu-button", "data-active": isActive, className: "menu-link d-flex w-100 align-items-center gap-2 overflow-hidden rounded px-4 py-3 text-start text-sm lh-lg" +
                (isActiveComponent ? " active " : " ") +
                className, ...props }));
    });
    const DELLayoutMenuPinAction = React.forwardRef(({ component, className, ...props }, ref) => {
        const { activateComponent, pinnedComponent, pinComponent } = (0, LayoutProvider_1.useDELLayoutContext)();
        const handlePinComponent = (event) => {
            if (React.isValidElement(pinnedComponent) &&
                React.isValidElement(component) &&
                pinnedComponent.type === (component === null || component === void 0 ? void 0 : component.type)) {
                pinComponent(null);
            }
            else {
                activateComponent(component || null);
                pinComponent(component || null);
            }
        };
        const isPinned = React.isValidElement(pinnedComponent) &&
            React.isValidElement(component) &&
            pinnedComponent.type === (component === null || component === void 0 ? void 0 : component.type);
        return (React.createElement(Button_1.default, { buttonProperties: {
                displayStyle: "lite",
                icon: {
                    iconName: isPinned ? "pin" : "pin-off",
                    fontIconFamily: WUXManagedFontIcons.Font3DS,
                },
            }, className: className + " " + (isPinned ? "opacity-100" : "opacity-50"), onClick: handlePinComponent }));
    });
    const DELLayoutMenuAction = React.forwardRef(({ component, asChild, pinAuto, className, ...props }, ref) => {
        const { pinComponent } = (0, LayoutProvider_1.useDELLayoutContext)();
        if (pinAuto) {
            return (React.createElement(DELLayoutMenuPinAction, { "data-sidebar": "menu-action", className: "position-absolute top-0 bottom-0 end-0 mr-4 d-flex align-items-center justify-content-center", component: component, ref: ref }));
        }
        return (React.createElement("button", { ref: ref, "data-sidebar": "menu-action", className: "position-absolute top-0 bottom-0 end-0 mr-4 d-flex align-items-center justify-content-center", ...props, onClick: (e) => {
                pinComponent(component || null);
                e.stopPropagation();
            } }));
    });
    DELLayoutMenuAction.displayName = "DELSidebarMenuAction";
    const DELLayoutInset = React.forwardRef(({ className, ...props }, ref) => {
        const { components } = (0, LayoutProvider_1.useDELLayoutContext)();
        return (React.createElement(DELSplitter_1.default, null, components.map((component, index) => {
            if (index === 0) {
                return React.createElement(DELSplitter_1.default.Left, null, component);
            }
            if (index === 1) {
                return React.createElement(DELSplitter_1.default.Right, null, component);
            }
            return React.createElement(React.Fragment, null);
        })));
    });
    const DELLayout = ({ items, }) => {
        return (React.createElement(LayoutProvider_1.DELLayoutProvider, null,
            React.createElement(SkeletonLayout_1.default, null,
                React.createElement(SkeletonLeftContainer_1.default, { properties: {
                        width: 275,
                        titleBar: { close: true },
                        collapsed: false,
                    } },
                    React.createElement(DELLayoutMenu, { items: items }) // DELLayoutMenu
                ,
                    " // DELLayoutMenu"),
                React.createElement(SkeletonCenterContainer_1.default, null,
                    React.createElement(DELLayoutInset, null)),
                React.createElement(SkeletonStatusContainer_1.default, null, "status bar"))));
    };
    exports.DELLayout = DELLayout;
});
