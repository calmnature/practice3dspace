/// <amd-module name="DS/DELInfraWeb/store/slices/DELCorpusSliceFactory"/>
define("DS/DELInfraWeb/store/slices/DELCorpusSliceFactory", ["require", "exports", "DS/ReactRedux/Toolkit", "DS/DELInfraWeb/typings/DELPXPBackendCommunicationType", "DS/React18Loader/FastDeepEqual"], function (require, exports, Toolkit_1, DELPXPBackendCommunicationType_1, equal) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createCorpusSlice = exports.isCRUDResponse = exports.isCRUDAction = exports.isBackendAction = exports.getInfoFromAction = exports.buildEmptyActionName = exports.buildCorpusActionName = exports.buildCorpusRespName = void 0;
    /**
     * Build Corpus Response Name
     * @param {enDELPXPCRUDAction} enCRUDAction
     * @param {string} uri
     * @returns
     */
    const buildCorpusRespName = function (actionName, uri) {
        let oActionType = "";
        if (!actionName || !uri || uri === "")
            return oActionType;
        oActionType = "/" + DELPXPBackendCommunicationType_1.BACKEND_RESPONSE + "/" + actionName + uri;
        return oActionType;
    };
    exports.buildCorpusRespName = buildCorpusRespName;
    /**
     * Build Corpus Action Name
     * @param {enDELPXPCRUDAction} enCRUDAction
     * @param {string} uri
     * @returns
     */
    const buildCorpusActionName = function (enCRUDAction, uri) {
        let oCRUDActionType = "";
        if (!enCRUDAction || !uri || uri === "")
            return oCRUDActionType;
        oCRUDActionType = "/" + enCRUDAction + uri;
        return oCRUDActionType;
    };
    exports.buildCorpusActionName = buildCorpusActionName;
    const buildEmptyActionName = function (uri) {
        return "/" + DELPXPBackendCommunicationType_1.EMPTY_SLICE + uri;
    };
    exports.buildEmptyActionName = buildEmptyActionName;
    const buildUnsubscribeUpdateActionName = function (uri) {
        return "/" + DELPXPBackendCommunicationType_1.UNSUBSCRIBE_UPDATE + uri;
    };
    /**
     * Get CRUD action information: CRUD action type and URI
     * @param action
     * @returns
     */
    const getInfoFromAction = (action) => {
        let oResult;
        if (!action || !action.type || action.type === "")
            return oResult;
        //-------------------------------------------------------------------------------------------------------------
        // Action type = uri: support two use cases (RequestType = Create, Read, Update, Delete, Query or Unsubscribe)
        // --> "/RequestType/domaine/concept" or "/RequestType/domaine/version/concept"
        //-------------------------------------------------------------------------------------------------------------
        const arrSplitActionType = action.type.split("/");
        if (!arrSplitActionType || arrSplitActionType.length < 4 || arrSplitActionType.length > 5)
            return oResult;
        const bCrudAction = Object.values(DELPXPBackendCommunicationType_1.enDELPXPCRUDAction).includes(arrSplitActionType[1]);
        oResult = {
            crudAction: bCrudAction ? arrSplitActionType[1] : undefined,
            action: !bCrudAction ? arrSplitActionType[1] : undefined,
            uri: action.type.replace("/" + arrSplitActionType[1], ""),
        };
        return oResult;
    };
    exports.getInfoFromAction = getInfoFromAction;
    /**
     * Check if input Action is a backend request action
     * @param action
     * @returns
     */
    const isBackendAction = function (action) {
        if (!action || !action.type || action.type === "")
            return false;
        //-------------------------------------------------------------------------------------------------------------
        // Action type = uri: support two use cases (RequestType = Create, Read, Update, Delete, Query or Unsubscribe)
        // --> "/RequestType/domaine/concept" or "/RequestType/domaine/version/concept"
        //-------------------------------------------------------------------------------------------------------------
        const arrSplitActionType = action.type.split("/");
        if (!arrSplitActionType || arrSplitActionType.length < 4 || arrSplitActionType.length > 5)
            return false;
        if (arrSplitActionType[1] !== DELPXPBackendCommunicationType_1.UNSUBSCRIBE_UPDATE)
            return false;
        return true;
    };
    exports.isBackendAction = isBackendAction;
    /**
     * Check if input Action is a CRUD request action
     * @param action
     * @returns
     */
    const isCRUDAction = function (action) {
        if (!action || !action.type || action.type === "")
            return false;
        //-------------------------------------------------------------------------------------------------------------
        // Action type = uri: support two use cases (RequestType = Create, Read, Update, Delete, Query or Unsubscribe)
        // --> "/RequestType/domaine/concept" or "/RequestType/domaine/version/concept"
        //-------------------------------------------------------------------------------------------------------------
        const arrSplitActionType = action.type.split("/");
        if (!arrSplitActionType || arrSplitActionType.length < 4 || arrSplitActionType.length > 5)
            return false;
        if (!Object.values(DELPXPBackendCommunicationType_1.enDELPXPCRUDAction).includes(arrSplitActionType[1]))
            return false;
        return true;
    };
    exports.isCRUDAction = isCRUDAction;
    /**
     * Check if input Response is a CRUD request response
     * @param action
     * @returns
     */
    const isCRUDResponse = function (action) {
        let oResult = false;
        if (!action || !action.type || action.type === "")
            return oResult;
        //-------------------------------------------------------------------------------------------------------------
        // Action type = uri: support two use cases (RequestType = Create, Read, Update, Delete, Query or Unsubscribe)
        // --> "/backendResp/RequestType/domaine/concept" or "/backendResp/RequestType/domaine/version/concept"
        //-------------------------------------------------------------------------------------------------------------
        const arrSplitActionType = action.type.split("/");
        if (!arrSplitActionType || arrSplitActionType.length < 5 || arrSplitActionType.length > 6)
            return oResult;
        if (Object.values(DELPXPBackendCommunicationType_1.enDELPXPCRUDAction).includes(arrSplitActionType[2])) {
            oResult = true;
        }
        return oResult;
    };
    exports.isCRUDResponse = isCRUDResponse;
    /**
     * GHet concept value from URI
     * @param uri - string: uri: /domaine/concept or /domaine/version/concept
     * @returns
     */
    const getConceptFromUri = (uri) => {
        let concept = uri;
        const arrSplitedUri = uri.split("/");
        if (arrSplitedUri && arrSplitedUri.length > 0) {
            concept = arrSplitedUri[arrSplitedUri.length - 1];
        }
        return concept;
    };
    const convertBackendObject = (payload, convertObject) => {
        const oConvertedEntities = [];
        if (!payload || payload.length === 0)
            return oConvertedEntities;
        if (!convertObject)
            return payload;
        payload.forEach((backendEntity) => {
            convertObject(backendEntity).forEach((convertedEntity) => {
                oConvertedEntities.push(convertedEntity);
            });
        });
        return oConvertedEntities;
    };
    const addObjectsToState = (state, entities) => {
        if (!state || !state.entities || !entities || entities.length === 0)
            return;
        if (state.entities.length > 0) {
            const newEntities = entities.filter((entityPayload) => state.entities.find((entity) => {
                let oResult = false;
                if (entityPayload === null || !entityPayload || entity === null || !entity || typeof entity !== typeof entityPayload)
                    return true;
                if (typeof entity === "object" && typeof entityPayload === "object" && entity.hasOwnProperty("id") && entityPayload.hasOwnProperty("id")) {
                    oResult = entity.id === entityPayload.id;
                }
                else if (typeof entity === "string" || typeof entity === "number") {
                    oResult = entity === entityPayload;
                }
                return oResult;
            }) === undefined);
            state.entities.push(...newEntities);
        }
        else {
            const newEntitiesWithId = entities.filter((newEntity) => typeof newEntity === "object" && newEntity.hasOwnProperty("id"));
            if (newEntitiesWithId) {
                state.entities.push(...newEntitiesWithId);
            }
        }
    };
    // @TODO Creates object without id and @class attributes
    const omitIdClass = (obj) => {
        if (!obj)
            return undefined;
        const { id, "@class": value, ...objWithoutAttr } = obj;
        return objWithoutAttr;
    };
    /**
     * Create a Corpus Slice
     * @param {DELPXPCorpusSliceCfg} cfgSlice
     * @returns
     */
    const createCorpusSlice = function (cfgSlice) {
        // uri: /domaine/concept or /domaine/version/concept
        const { uri, convertObject } = cfgSlice;
        const endPointTypeSlice = cfgSlice.endPointType || DELPXPBackendCommunicationType_1.enDELPXPEndPointType.User;
        const initialStateSlice = { entities: [], endPointType: endPointTypeSlice };
        const pxpSlice = (0, Toolkit_1.createSlice)({
            name: uri,
            initialState: initialStateSlice,
            reducers: {},
            extraReducers: (builder) => {
                builder
                    .addCase((0, exports.buildCorpusRespName)(DELPXPBackendCommunicationType_1.enDELPXPCRUDAction.create, uri), (state, action) => {
                    if (!state || !state.entities || !action || !action.payload || !action.payload.objects || action.payload.objects.length === 0)
                        return;
                    addObjectsToState(state, convertBackendObject(action.payload.objects, convertObject));
                })
                    .addCase((0, exports.buildCorpusRespName)(DELPXPBackendCommunicationType_1.enDELPXPCRUDAction.query, uri), (state, action) => {
                    if (!state || !state.entities || !action || !action.payload || !action.payload.objects || action.payload.objects.length === 0)
                        return;
                    addObjectsToState(state, convertBackendObject(action.payload.objects, convertObject));
                })
                    .addCase((0, exports.buildCorpusRespName)(DELPXPBackendCommunicationType_1.enDELPXPCRUDAction.read, uri), (state, action) => {
                    if (!state || !state.entities || !action || !action.payload || !action.payload.objects || action.payload.objects.length === 0)
                        return;
                    addObjectsToState(state, convertBackendObject(action.payload.objects, convertObject));
                })
                    .addCase((0, exports.buildCorpusRespName)(DELPXPBackendCommunicationType_1.enDELPXPCRUDAction.update, uri), (state, action) => {
                    if (!state || !state.entities || !action || !action.payload || !Array.isArray(action.payload.objects) || action.payload.objects.length === 0)
                        return;
                    // Convert backend object if needed
                    const entities = convertBackendObject(action.payload.objects, convertObject);
                    const nbUpdate = entities.length;
                    let itUpdate = 0;
                    while (itUpdate < nbUpdate) {
                        if (entities[itUpdate] && typeof entities[itUpdate] === "object" && entities[itUpdate].hasOwnProperty("id")) {
                            let objectStored = state.entities.find((entity) => {
                                let oResult = false;
                                if (entity !== null && typeof entity === "object" && entity.hasOwnProperty("id")) {
                                    oResult = entity.id === entities[itUpdate].id;
                                }
                                return oResult;
                            });
                            if (objectStored) {
                                const objSlice = omitIdClass(objectStored);
                                const objUpdated = omitIdClass(entities[itUpdate]);
                                if (objSlice && objUpdated && !equal(objSlice, objUpdated)) {
                                    Object.assign(objectStored, { ...objUpdated });
                                }
                            }
                        }
                        itUpdate++;
                    }
                })
                    .addCase((0, exports.buildCorpusRespName)(DELPXPBackendCommunicationType_1.enDELPXPCRUDAction.createUpdate, uri), (state, action) => {
                    // TMP Code: waiting for all Corpus data migrated to CUD Event
                    if (!state || !state.entities || !action || !action.payload || !action.payload.objects || action.payload.objects.length === 0)
                        return;
                    // Convert backend object if needed
                    const entities = convertBackendObject(action.payload.objects, convertObject);
                    entities.forEach((obj) => {
                        if (!obj || typeof obj !== "object" || !obj.hasOwnProperty("id"))
                            return;
                        let objectStored = state.entities.find((entity) => {
                            let oResult = false;
                            if (entity !== null && typeof entity === "object" && entity.hasOwnProperty("id")) {
                                oResult = entity.id === obj.id;
                            }
                            return oResult;
                        });
                        if (objectStored) {
                            Object.assign(objectStored, obj);
                        }
                        else {
                            state.entities.push(obj);
                        }
                    });
                })
                    .addCase((0, exports.buildCorpusRespName)(DELPXPBackendCommunicationType_1.enDELPXPCRUDAction.delete, uri), (state, action) => {
                    if (!state || !state.entities || !action || !action.payload)
                        return;
                    if (!action.payload.objects || action.payload.objects.length === 0) {
                        state.entities = [];
                    }
                    else if (Array.isArray(action.payload.objects)) {
                        state.entities = state.entities.filter((entity) => {
                            return action.payload.objects ? action.payload.objects.find((actionEntity) => actionEntity === entity.id) === undefined : true;
                        });
                    }
                })
                    .addCase((0, exports.buildEmptyActionName)(uri), (state, action) => {
                    if (!state || !state.entities || !action)
                        return;
                    state.entities = [];
                });
            },
        });
        const concept = getConceptFromUri(uri);
        // CRUD Action: Create
        const createActionPXP = (0, Toolkit_1.createAction)((0, exports.buildCorpusActionName)(DELPXPBackendCommunicationType_1.enDELPXPCRUDAction.create, uri));
        const fctCreateAction = function (actionType) {
            return createActionPXP({ endPointType: endPointTypeSlice, objectsType: concept, objectsToCreate: actionType.objectsToCreateUpdate, requesterId: actionType === null || actionType === void 0 ? void 0 : actionType.requesterId });
        };
        // CRUD Action: Read
        const readAction = (0, Toolkit_1.createAction)((0, exports.buildCorpusActionName)(DELPXPBackendCommunicationType_1.enDELPXPCRUDAction.read, uri));
        const fctReadAction = function (actionType) {
            // XXE TMP, subscribe to update:  Wait for Query request on all URIs
            return readAction({ endPointType: endPointTypeSlice, objectsType: concept, objectsToRead: actionType === null || actionType === void 0 ? void 0 : actionType.id, requesterId: actionType === null || actionType === void 0 ? void 0 : actionType.requesterId, subscribeToUpdates: actionType === null || actionType === void 0 ? void 0 : actionType.subscribeToUpdates, actionId: actionType === null || actionType === void 0 ? void 0 : actionType.actionId });
        };
        // CRUD Action: Update
        const updateAction = (0, Toolkit_1.createAction)((0, exports.buildCorpusActionName)(DELPXPBackendCommunicationType_1.enDELPXPCRUDAction.update, uri));
        const fctUpdateAction = function (actionType) {
            return updateAction({ endPointType: endPointTypeSlice, objectsType: concept, objectsToCreateUpdate: actionType.objectsToCreateUpdate, requesterId: actionType === null || actionType === void 0 ? void 0 : actionType.requesterId });
        };
        // CRUD Action: Delete
        const deleteAction = (0, Toolkit_1.createAction)((0, exports.buildCorpusActionName)(DELPXPBackendCommunicationType_1.enDELPXPCRUDAction.delete, uri));
        const fctDeleteAction = function (actionType) {
            return deleteAction({ endPointType: endPointTypeSlice, objectsType: concept, objectsToDelete: actionType.id, requesterId: actionType === null || actionType === void 0 ? void 0 : actionType.requesterId });
        };
        // CRUD Action: Query
        const queryAction = (0, Toolkit_1.createAction)((0, exports.buildCorpusActionName)(DELPXPBackendCommunicationType_1.enDELPXPCRUDAction.query, uri));
        const fctQueryAction = function (actionType) {
            return queryAction({ endPointType: endPointTypeSlice, objectsType: concept, conditions: actionType.conditions, subscribeToUpdates: actionType.subscribeToUpdates, actionId: actionType === null || actionType === void 0 ? void 0 : actionType.actionId, requesterId: actionType === null || actionType === void 0 ? void 0 : actionType.requesterId });
        };
        // Action: Unsubscribe to update request
        const unsubscribeAction = (0, Toolkit_1.createAction)(buildUnsubscribeUpdateActionName(uri));
        const fctUnsubscribeAction = function (actionType) {
            return unsubscribeAction({ endPointType: endPointTypeSlice, objectsType: concept, actionId: actionType.actionId, requesterId: actionType === null || actionType === void 0 ? void 0 : actionType.requesterId });
        };
        // Action: Empty
        const emptyAction = (0, Toolkit_1.createAction)((0, exports.buildEmptyActionName)(uri));
        const fctEmptyAction = function () {
            return emptyAction({ endPointType: endPointTypeSlice });
        };
        // Selectors
        const selectors = {};
        selectors.selectEntities = (0, Toolkit_1.createSelector)([(state) => state[uri]], (slice) => slice.entities);
        selectors.selectEndPointType = (0, Toolkit_1.createSelector)([(state) => state[pxpSlice.name]], (slice) => slice.endPointType);
        return {
            actions: {
                query: fctQueryAction,
                create: fctCreateAction,
                read: fctReadAction,
                update: fctUpdateAction,
                delete: fctDeleteAction,
                empty: fctEmptyAction,
                unsubscribeUpdate: fctUnsubscribeAction,
            },
            reducers: pxpSlice.reducer,
            selectors: selectors,
        };
    };
    exports.createCorpusSlice = createCorpusSlice;
});
