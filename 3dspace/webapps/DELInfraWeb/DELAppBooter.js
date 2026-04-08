"use strict";
require(['DS/DELPXPFoundations/PXPUtils',
    'DS/DELWebTools/DELAuthenticationTools',
    'DS/DELInfraWeb/components/DELAppError',
    'DS/DELInfraWeb/components/DELApplication',
    'DS/React18Loader/React',
    'DS/React18Loader/ReactDomClient',
    'UWA/Core',
    '!DS/DELInfraWeb/assets/nls/DELApplication'], function (PXPUtils, AuthTools, DELAppError, DELApplication, React, ReactDOM, UWA, nls) {
    const CSS_PXPBOOTSTRAP = "DELInfraWeb/assets/css/DELBootstrap.css";
    const CSS_NVPATCH = "../Controls/nv-patch.css";
    const CSS_STANDALONE = "../c/UWA/assets/css/standalone.css";
    let enErrorSeverity;
    (function (enErrorSeverity) {
        enErrorSeverity["Error"] = "Error";
        enErrorSeverity["Warning"] = "Warning";
    })(enErrorSeverity || (enErrorSeverity = {}));
    ;
    /**
     * Handle loading module error:
     * @param error
     * @returns
     */
    function handleError(error, severity = enErrorSeverity.Error) {
        if (severity === enErrorSeverity.Error) {
            console.error('%c========= App initialization: %cFAILED%c =========', 'color: royalblue;font-weight:bold;', 'color: red;font-weight:bold;', 'color: royalblue;font-weight:bold;');
            if (error) {
                console.error('Error: ' + error.message);
            }
            if (widget && widget.elements && widget.elements.body) {
                const divErrorComponent = new UWA.Element("div", { id: "appError" });
                divErrorComponent.inject(widget.elements.body);
                const errorDetails = (error) ? error.message : "";
                ReactDOM.createRoot(divErrorComponent).render(React.createElement(DELAppError.default, { errorDetails: errorDetails }));
            }
        }
        else {
            console.warn('%c========= App initialization: %cWARNING%c =========', 'color: royalblue;font-weight:bold;', 'color: orange;font-weight:bold;', 'color: royalblue;font-weight:bold;');
            if (error) {
                console.warn('Warning: ' + error.message);
            }
        }
    }
    ;
    /**
     * Load needed CSS resource files according to the context (cloud or not)
     * @returns
     */
    async function loadPXPCSS() {
        if (widget && typeof widget.id === 'string') {
            PXPUtils.loadCSS(window.dsDefaultWebappsBaseUrl + CSS_PXPBOOTSTRAP).catch((error) => { handleError(new Error(nls.error_Css), enErrorSeverity.Warning); });
        }
        else {
            // Not Dashboard context: load standalone and nv-patch css files
            Promise.all([PXPUtils.loadCSS(window.dsDefaultWebappsBaseUrl + CSS_STANDALONE), PXPUtils.loadCSS(window.dsDefaultWebappsBaseUrl + CSS_NVPATCH), PXPUtils.loadCSS(window.dsDefaultWebappsBaseUrl + CSS_PXPBOOTSTRAP)])
                .catch((error) => { handleError(new Error(nls.error_Css), enErrorSeverity.Warning); });
        }
    }
    ;
    /**
     * Set debug mode: variable stored in local storage used by React and Redux libraries
     * @returns
     */
    const setupDebugInfo = () => {
        if (!window || !window.location || !window.location.search)
            return;
        const params = new URLSearchParams(window === null || window === void 0 ? void 0 : window.location.search);
        if (params.has('debug') && window.localStorage) {
            window.localStorage.ReactDebug = true;
            window.localStorage.ReactDOMDebug = true;
            window.localStorage.ReduxDebug = true;
        }
    };
    /**
     * Load Root Component Module: App's root React component
     * @param moduleApp
     * @param containerApp
     * @returns root app component module
     */
    function loadRootComponentModule(moduleApp, containerApp) {
        return new Promise(function (resolve, reject) {
            if (!moduleApp || moduleApp === "" || !containerApp) {
                reject(new Error(nls.error_MissingOptions));
            }
            else {
                PXPUtils.loadModuleJS_AMD(moduleApp).then((component) => {
                    console.log('%c========= App Module: %cLOADED%c =========', 'color: royalblue;font-weight:bold;', 'color: green;font-weight:bold;', 'color: royalblue;font-weight:bold;');
                    resolve(component);
                }).catch((error) => { reject(error); });
            }
        });
    }
    ;
    /**
     * Load an aoptional module
     * @param modulePath
     * @returns loaded module
     */
    function loadOptionalModule(modulePath) {
        return new Promise(function (resolve, reject) {
            if (!modulePath || modulePath === "") {
                resolve(undefined);
            }
            else {
                PXPUtils.loadModuleJS_AMD(modulePath).then((module) => {
                    if (!module || !module.hasOwnProperty('default')) {
                        reject(new Error(modulePath + ' ' + nls.error_LoadingModule_NoDefault));
                    }
                    console.log('%c========= Module ' + modulePath + ': %cLOADED%c =========', 'color: royalblue;font-weight:bold;', 'color: green;font-weight:bold;', 'color: royalblue;font-weight:bold;');
                    resolve(module.default);
                }).catch((error) => { reject(error); });
            }
        });
    }
    ;
    /**
     * Load optional(s) module such as store and app configuration, and then upload React
     * Root component, create a React application and render root inside container div
     * @param rootComponentPath - React Root Component
     * @param containerApp  - HTML div where React Root component will be rendered
     * @param storePath - Module path of Redux Store (optional)
     * @param configurationPath  - Module Path of applicaction configuration (optional)
     * @returns
     */
    async function loadAppModules(rootComponentPath, containerApp, storePath, configurationPath) {
        return loadOptionalModule(storePath)
            .then((storeModule) => {
            return loadOptionalModule(configurationPath).then(configurationModule => {
                return { storeModule, configurationModule };
            });
        }).then(({ storeModule, configurationModule }) => {
            return loadRootComponentModule(rootComponentPath, containerApp).then((clientRootComponent) => {
                if (!clientRootComponent || !clientRootComponent.hasOwnProperty('default')) {
                    throw new Error(nls.error_RootComponentModule);
                }
                else {
                    console.log('%c========= React Root Component Module : %cLOADED%c =========', 'color: royalblue;font-weight:bold;', 'color: green;font-weight:bold;', 'color: royalblue;font-weight:bold;');
                    if (clientRootComponent.AppHandler && clientRootComponent.AppHandler.onBeforeCreateApp) {
                        clientRootComponent.AppHandler.onBeforeCreateApp();
                    }
                    let root = ReactDOM.createRoot(containerApp);
                    root.render(React.createElement(DELApplication.default, { key: "DELApplication", clientRootComponent: React.createElement(clientRootComponent.default, null), store: storeModule, configuration: configurationModule }));
                    if (clientRootComponent.AppHandler && clientRootComponent.AppHandler.onAfterCreateApp) {
                        clientRootComponent.AppHandler.onAfterCreateApp(clientRootComponent);
                    }
                }
            });
        });
    }
    ;
    /**
     * Create and render the React application powered by Dr-WAF
     * @param widget valid (optional) UWA widget when running in the 3DExperience platform
     */
    const bootRun = async () => {
        const collectionScript = document.getElementsByTagName('script');
        const booterScript = Array.from(collectionScript).find((scriptElt) => scriptElt.src.includes('DELInfraWeb/DELAppBooter.js'));
        if (!booterScript)
            return handleError(new Error(nls.error_Init));
        const rootComponentPath = booterScript.getAttribute('data-component');
        if (!rootComponentPath)
            return handleError(new Error(nls.error_RootComponentPath));
        const storePath = booterScript.getAttribute('data-store');
        const appConfigPath = booterScript.getAttribute('data-configuration');
        const eltContainerId = booterScript.getAttribute('data-element');
        if (!eltContainerId)
            return handleError(new Error(nls.error_ContainerNotFound));
        let eltContainer = document.getElementById(eltContainerId);
        if (eltContainer === null)
            return handleError(new Error(nls.error_ContainerNotFound));
        // Local Widget: handle authentication
        if (!widget.id) {
            await AuthTools.requestAuthentication();
        }
        // Debug or not
        setupDebugInfo();
        // Load needed CSS resource files according to the context (cloud or not)
        loadPXPCSS();
        // Load Store (optional), app configuration (optional) and React Root component modules
        loadAppModules(rootComponentPath, eltContainer, storePath || undefined, appConfigPath || undefined);
    };
    if (widget !== undefined && widget.addEvent !== undefined) {
        widget.addEvent('onLoad', async () => {
            bootRun();
        });
    }
    else {
        bootRun();
    }
});
