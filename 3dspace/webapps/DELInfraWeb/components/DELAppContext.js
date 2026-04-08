/// <amd-module name="DS/DELInfraWeb/components/DELAppContext"/>
define("DS/DELInfraWeb/components/DELAppContext", ["require", "exports", "DS/React18Loader/React", "DS/React18Loader/React", "DS/React18Loader/React", "DS/DELInfraWeb/typings/DELWebAppType"], function (require, exports, React, React_1, React_2, DELWebAppType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DELPXPAppCtxProvider = exports.useAppCtx = exports.DELAppContext = void 0;
    exports.DELAppContext = (0, React_1.createContext)({
        context: DELWebAppType_1.DELWidgetCtx.cloud,
        configuration: undefined,
        updateConfiguration: (newConfig) => { },
        widgetDimension: { height: 0, width: 0 }
    });
    const useAppCtx = () => {
        const { context, configuration, updateConfiguration, widgetDimension } = (0, React_2.useContext)(exports.DELAppContext);
        return { context: context, configuration: configuration, updateConfiguration: updateConfiguration, widgetDimension: widgetDimension };
    };
    exports.useAppCtx = useAppCtx;
    const DELPXPAppCtxProvider = ({ children, appConfiguration }) => {
        const [context, setContext] = (0, React_1.useState)((widget && typeof widget.id === 'string') ? DELWebAppType_1.DELWidgetCtx.cloud : DELWebAppType_1.DELWidgetCtx.onPremise);
        const [widgetDimension, setWidgetDimension] = (0, React_1.useState)(widget.body.getDimensions());
        const [configuration, setConfiguration] = (0, React_1.useState)(appConfiguration || {
            updateConfiguration: (newConfig) => { }
        });
        const updateConfiguration = (config) => {
            setConfiguration(config);
        };
        (0, React_1.useEffect)(() => {
            if (widget !== undefined && widget.addEvent !== undefined && widget.body) {
                widget.addEvent('onResize', () => {
                    if (!widget.body)
                        return;
                    setWidgetDimension(widget.body.getDimensions());
                });
            }
        }, []);
        return (React.createElement(exports.DELAppContext.Provider, { value: { configuration, widgetDimension, context, updateConfiguration } }, children));
    };
    exports.DELPXPAppCtxProvider = DELPXPAppCtxProvider;
});
