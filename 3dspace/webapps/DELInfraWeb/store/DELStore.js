/// <amd-module name="DS/DELInfraWeb/store/DELStore"/>
define("DS/DELInfraWeb/store/DELStore", ["require", "exports", "DS/ReactRedux/Toolkit", "DS/DELInfraWeb/middlewares/DELBackendMiddleware", "DS/DELInfraWeb/typings/DELPXPBackendCommunicationType", "DS/DELInfraWeb/store/slices/DELCorpusSliceFactory", "DS/DELInfraWeb/store/slices/DELEndPointSliceFactory", "DS/DELInfraWeb/store/slices/DELKeyValueSliceFactory", "DS/DELInfraWeb/store/selectors/DELComputedSelector", "DS/DELInfraWeb/typings/DELSliceType"], function (require, exports, Toolkit_1, DELBackendMiddleware_1, DELPXPBackendCommunicationType_1, DELCorpusSliceFactory_1, DELEndPointSliceFactory_1, DELKeyValueSliceFactory_1, DELComputedSelector_1, DELSliceType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createPXPStore = exports.enDELStatus = void 0;
    Object.defineProperty(exports, "enDELStatus", { enumerable: true, get: function () { return DELSliceType_1.enDELStatus; } });
    const createPXPStore = (options) => {
        const mapAction = {}, mapKeyValueAction = {}, mapCorpusAction = {}, mapEndPointAction = {};
        let actionStatusSlice, selectorsStatusSlice;
        const mapKeyValueSelector = {}, mapEndPointSelector = {}, mapCorpusSelector = {};
        const mapComputedSelector = {};
        const ftcGetAllCorpusURIs = () => {
            return Object.keys(mapCorpusSelector);
        };
        const fctGetActions = (uri) => {
            let oResult;
            if (pxpStore && mapAction && uri && uri !== "" && mapAction[uri]) {
                oResult = mapAction[uri];
            }
            return oResult;
        };
        const fctGetEndPointActions = (endPoinType) => {
            let oResult;
            if (pxpStore && mapEndPointAction && endPoinType && mapEndPointAction[endPoinType.toString()]) {
                oResult = mapEndPointAction[endPoinType.toString()];
            }
            return oResult;
        };
        const fctGetCorpusActions = (uri) => {
            let oResult;
            if (pxpStore && mapCorpusAction && uri && uri !== "" && mapCorpusAction[uri]) {
                oResult = mapCorpusAction[uri];
            }
            return oResult;
        };
        const fctKeyValueActions = (uri) => {
            let oResult;
            if (pxpStore && mapKeyValueAction && uri && uri !== "" && mapKeyValueAction[uri]) {
                oResult = mapKeyValueAction[uri];
            }
            return oResult;
        };
        const fctGetKeyValueSelectors = (uri) => {
            let oResult;
            if (pxpStore && mapKeyValueSelector && uri && uri !== "" && mapKeyValueSelector[uri]) {
                oResult = mapKeyValueSelector[uri];
            }
            return oResult;
        };
        const fctGetCorpusSelectors = (uri) => {
            let oResult;
            if (pxpStore && mapCorpusSelector && uri && uri !== "" && mapCorpusSelector[uri]) {
                oResult = mapCorpusSelector[uri];
            }
            return oResult;
        };
        const fctGetEndPointSelectors = (uri) => {
            let oResult;
            if (pxpStore && mapEndPointSelector && uri && uri !== "" && mapEndPointSelector[uri]) {
                oResult = mapEndPointSelector[uri];
            }
            return oResult;
        };
        const fctGetComputedSelectors = (uri) => {
            let oResult;
            if (pxpStore && mapComputedSelector && uri && uri !== "" && mapComputedSelector[uri]) {
                oResult = mapComputedSelector[uri];
            }
            return oResult;
        };
        /* @TODO XXE
          const fctGetStatusActions = (): DELStatusSliceAction | undefined => {
              return actionStatusSlice;
          };
      
          const fctGetStatusSelectors = (): DELStatusSliceSelectors | undefined => {
              return selectorsStatusSlice;
        };*/
        const reducerMap = {};
        /* @TODO XXE
        // Slice: STATUS (created by default)
        if(options.statusSliceFlag === undefined || options.statusSliceFlag === true) {
            const statusSlice:DELStatusSlice = createStatusSlice();
            if(statusSlice) {
                actionStatusSlice = statusSlice.actions;
                reducerMap[STATUS_SLICE] = statusSlice.reducers;
                selectorsStatusSlice = statusSlice.selectors;
            }
        }*/
        // Slice: CORPUS
        if (options && options.slicesCorpusCfg && options.slicesCorpusCfg.length > 0) {
            options.slicesCorpusCfg.forEach((pxpCorpusSliceOptions) => {
                const setCorpusUri = new Set(); // To prevent multiple slices with same uri
                if (pxpCorpusSliceOptions.uri && pxpCorpusSliceOptions.uri !== "") {
                    if (!setCorpusUri.has(pxpCorpusSliceOptions.uri)) {
                        setCorpusUri.add(pxpCorpusSliceOptions.uri);
                        const pxpCorpusSlice = (0, DELCorpusSliceFactory_1.createCorpusSlice)(pxpCorpusSliceOptions);
                        if (pxpCorpusSlice && !mapCorpusAction[pxpCorpusSliceOptions.uri] && !reducerMap[pxpCorpusSliceOptions.uri]) {
                            mapCorpusAction[pxpCorpusSliceOptions.uri] = pxpCorpusSlice.actions;
                            reducerMap[pxpCorpusSliceOptions.uri] = pxpCorpusSlice.reducers;
                            mapCorpusSelector[pxpCorpusSliceOptions.uri] = pxpCorpusSlice.selectors;
                        }
                    }
                    else {
                        // TODO Warning
                    }
                }
            });
            // Computed Selector
            if (options.selectorComputedCfg && options.selectorComputedCfg.length > 0 && Object.keys(mapCorpusSelector) && Object.keys(mapCorpusSelector).length > 0) {
                const setSelectorCptdUri = new Set(); // To prevent multiple selectors with same uri
                options.selectorComputedCfg.forEach((selectorComputedCg) => {
                    // TODO Warning
                    const computedSelector = (0, DELComputedSelector_1.createComputedSelector)(selectorComputedCg, mapCorpusSelector);
                    if (computedSelector) {
                        setSelectorCptdUri.add(selectorComputedCg.uri);
                        mapComputedSelector[selectorComputedCg.uri] = computedSelector;
                    }
                });
            }
        }
        // Slice: END POINT
        if (options && options.slicesEndPointCfg && options.slicesEndPointCfg.length > 0) {
            const setEndPointType = new Set(); // To prevent multiple End Points having same type
            options.slicesEndPointCfg.forEach((endPointSliceOptions) => {
                if (!setEndPointType.has(endPointSliceOptions.type)) {
                    setEndPointType.add(endPointSliceOptions.type);
                    const pxpEndPointSlice = (0, DELEndPointSliceFactory_1.createEndPointSlice)(endPointSliceOptions);
                    if (pxpEndPointSlice && !mapEndPointAction[endPointSliceOptions.type] && !reducerMap[endPointSliceOptions.type]) {
                        mapEndPointAction[endPointSliceOptions.type] = pxpEndPointSlice.actions;
                        reducerMap[endPointSliceOptions.type] = pxpEndPointSlice.reducers;
                        mapEndPointSelector[endPointSliceOptions.type] = pxpEndPointSlice.selectors;
                    }
                }
                else {
                    // TODO warning
                }
            });
        }
        // Slice: KEY VALUE
        if (options && options.slicesKeyValueCfg && options.slicesKeyValueCfg.length > 0) {
            options.slicesKeyValueCfg.forEach((keyValueSliceOptions) => {
                const setCorpusUri = new Set(); // To prevent multiple slices with same uri
                if (!setCorpusUri.has(keyValueSliceOptions.uri)) {
                    setCorpusUri.add(keyValueSliceOptions.uri);
                    const keyValueSlice = (0, DELKeyValueSliceFactory_1.createKeyValueSlice)(keyValueSliceOptions);
                    if (keyValueSlice && keyValueSlice.conceptsKeyValue) {
                        reducerMap[keyValueSliceOptions.uri] = keyValueSlice.reducers;
                        const arrKeyConcepts = Object.keys(keyValueSlice.conceptsKeyValue);
                        arrKeyConcepts.forEach((key) => {
                            const keyMap = "/" + keyValueSliceOptions.uri + "/" + key;
                            const uri = keyValueSlice.conceptsKeyValue[key];
                            if (uri.actions) {
                                mapKeyValueAction[keyMap] = uri.actions;
                            }
                            mapKeyValueSelector[keyMap] = uri.selectors;
                        });
                    }
                }
                else {
                    // TODO Warning
                }
            });
        }
        // Slice: CUSTOM
        if (options && options.slicesCustomCfg && options.slicesCustomCfg.length > 0) {
            options.slicesCustomCfg.forEach((customSliceOptions) => {
                // TODO check uri uniqueness
                reducerMap[customSliceOptions.uri] = customSliceOptions.reducers;
                mapAction[customSliceOptions.uri] = customSliceOptions.actions;
            });
        }
        // Create store
        let pxpStore = (0, Toolkit_1.configureStore)({
            reducer: reducerMap,
            middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(DELBackendMiddleware_1.default)
        });
        //-------------------------------------------------------------------------------------------------------------------
        // Update End Point with State Susbcription actions if Corpus slices with activated stateSubscription options exist
        // Then create defined End Points if autoCreationFlag: only creation, no connection 
        //-------------------------------------------------------------------------------------------------------------------
        if (options && options.slicesEndPointCfg && options.slicesEndPointCfg.length > 0) {
            options.slicesEndPointCfg.forEach((endPointSliceOptions) => {
                // Check if there is any corpus slice with State Subscription
                let corpusStateSubActionName;
                if (options && options.slicesCorpusCfg) {
                    const filteredSliceCorpusCfg = options.slicesCorpusCfg.filter((corpusSliceCfg) => {
                        return (corpusSliceCfg.endPointType === endPointSliceOptions.type || (endPointSliceOptions.type === DELPXPBackendCommunicationType_1.enDELPXPEndPointType.User && corpusSliceCfg.endPointType === undefined)) && corpusSliceCfg.stateSubscription === true && corpusSliceCfg.uri && corpusSliceCfg.uri !== "";
                    });
                    corpusStateSubActionName = filteredSliceCorpusCfg.map((corpusSliceCfg) => {
                        const cudActionName = {
                            createUpdateAction: (0, DELCorpusSliceFactory_1.buildCorpusRespName)(DELPXPBackendCommunicationType_1.enDELPXPCRUDAction.createUpdate, corpusSliceCfg.uri),
                            uri: corpusSliceCfg.uri
                        };
                        return cudActionName;
                    });
                    if (corpusStateSubActionName && corpusStateSubActionName.length > 0) {
                        pxpStore.dispatch({ type: (0, DELEndPointSliceFactory_1._buildStateSubActionName)(endPointSliceOptions.type), payload: corpusStateSubActionName });
                    }
                }
                if (endPointSliceOptions.autoCreationFlag === false)
                    return;
                pxpStore.dispatch({ type: DELPXPBackendCommunicationType_1.enDELPXPEndPointAction.creation, payload: endPointSliceOptions });
            });
        }
        // Add Actions and Selectors getters
        pxpStore.getActions = fctGetActions;
        pxpStore.getCorpusActions = fctGetCorpusActions;
        pxpStore.getCorpusSelectors = fctGetCorpusSelectors;
        pxpStore.getEndPointActions = fctGetEndPointActions;
        pxpStore.getEndPointSelectors = fctGetEndPointSelectors;
        pxpStore.getKeyValueActions = fctKeyValueActions;
        pxpStore.getKeyValueSelectors = fctGetKeyValueSelectors;
        pxpStore.getComputedSelectors = fctGetComputedSelectors;
        /* @TODO XXE(pxpStore as DELStore).getStatusAction = fctGetStatusActions;
        (pxpStore as DELStore).getStatusSelectors = fctGetStatusSelectors;*/
        pxpStore.getAllCorpusURIs = ftcGetAllCorpusURIs; // TO DO @XXE Doc
        return pxpStore;
    };
    exports.createPXPStore = createPXPStore;
});
