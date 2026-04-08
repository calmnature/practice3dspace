/// <amd-module name="DS/DELInfraWeb/components/DELApplication"/>
define("DS/DELInfraWeb/components/DELApplication", ["require", "exports", "DS/React18Loader/React", "DS/ReactRedux/ReactRedux", "DS/DELInfraWeb/components/DELAppContext"], function (require, exports, React, ReactRedux, DELAppContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const DELApplication = ({ clientRootComponent, store, configuration }) => {
        return (React.createElement("div", { id: "app" }, (store) ?
            React.createElement(ReactRedux.Provider, { store: store },
                React.createElement(DELAppContext_1.DELPXPAppCtxProvider, { appConfiguration: configuration }, clientRootComponent))
            :
                React.createElement(DELAppContext_1.DELPXPAppCtxProvider, { appConfiguration: configuration }, clientRootComponent)));
    };
    exports.default = DELApplication;
});
