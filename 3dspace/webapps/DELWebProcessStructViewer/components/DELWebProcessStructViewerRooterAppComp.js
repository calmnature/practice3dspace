/// <amd-module name="DS/DELWebProcessStructViewer/components/DELWebProcessStructViewerRooterAppComp"/>
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("DS/DELWebProcessStructViewer/components/DELWebProcessStructViewerRooterAppComp", ["require", "exports", "DS/React18Loader/React", "DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerStore", "react-redux", "DS/ReactRouterDom/ReactRouterDom", "DS/DELReactControls/WelcomeScreen/WelcomeViewRouter", "DS/DELWebProcessStructViewer/components/DELWebProcessStructViewerWSComp", "DS/DELWebProcessStructViewer/components/DELWebProcessStructViewerAppComp", "css!../assets/css/DELWebProcessStructViewer.css", "css!DS/DELReactControls/DELReactControls.css"], function (require, exports, React, DELWebProcessStructViewerStore_1, react_redux_1, ReactRouterDom_1, WelcomeViewRouter_1, DELWebProcessStructViewerWSComp_1, DELWebProcessStructViewerAppComp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    DELWebProcessStructViewerStore_1 = __importDefault(DELWebProcessStructViewerStore_1);
    WelcomeViewRouter_1 = __importDefault(WelcomeViewRouter_1);
    DELWebProcessStructViewerWSComp_1 = __importDefault(DELWebProcessStructViewerWSComp_1);
    DELWebProcessStructViewerAppComp_1 = __importDefault(DELWebProcessStructViewerAppComp_1);
    const DELPSVRooterAppComp = ({ url, runsInPlatform }) => {
        const initialEntries = ["/"];
        return (React.createElement(react_redux_1.Provider, { store: DELWebProcessStructViewerStore_1.default },
            React.createElement(ReactRouterDom_1.MemoryRouter, { initialEntries: initialEntries },
                React.createElement(WelcomeViewRouter_1.default, { dataset: "dataSet", MainView: React.createElement(DELWebProcessStructViewerAppComp_1.default, null), WelcomeView: React.createElement(DELWebProcessStructViewerWSComp_1.default, null) }))));
    };
    DELPSVRooterAppComp.displayName = "DELPSVRooterAppComp";
    exports.default = DELPSVRooterAppComp;
});
