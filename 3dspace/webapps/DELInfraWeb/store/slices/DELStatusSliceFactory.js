// <amd-module name="DS/DELInfraWeb/store/slices/DELStatusSliceFactory"/>
define(["require", "exports", "DS/ReactRedux/Toolkit", "DS/DELInfraWeb/store/slices/DELEndPointSliceFactory", "DS/DELInfraWeb/store/slices/DELCorpusSliceFactory", "DS/DELInfraWeb/typings/DELSliceType", "DS/DELInfraWeb/typings/DELPXPBackendCommunicationType"], function (require, exports, Toolkit_1, DELEndPointSliceFactory_1, DELCorpusSliceFactory_1, DELSliceType_1, DELPXPBackendCommunicationType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createStatusSlice = exports.STATUS_SLICE = void 0;
    exports.STATUS_SLICE = "statusSlice";
    /** TO DO Doc @XXE
     * Create a Corpus Slice
     * @param {DELPXPCorpusSliceCfg} cfgSlice
     * @returns
     */
    const createStatusSlice = function () {
        const sendStatusActionPXP = (0, Toolkit_1.createAction)(DELSliceType_1.STATUS_SENDSTATUS_ACTION);
        const fctSendStatusAction = function (actionType) {
            return sendStatusActionPXP(actionType);
        };
        function isPayloadAction(action) {
            return typeof action === 'object' && action !== null && 'type' in action && 'payload' in action;
        }
        /**
         * Build "computed" status for corpus slice related to action paylod URI
         * @param actionStatus
         * @param state
         * @returns
         */
        const _computeCorpusStatus = (actionStatus, state) => {
            if (!actionStatus || !actionStatus.uri || !actionStatus.context || !state || !state.entities || !state.entities[actionStatus.uri] || !state.entities[actionStatus.uri].allStatuses ||
                !state.entities[actionStatus.uri].computedStatus || !actionStatus.description || !actionStatus.description.title)
                return;
            if (!isPayloadAction(actionStatus.context) || !(0, DELCorpusSliceFactory_1.isCRUDAction)(actionStatus.context))
                return;
            state.entities[actionStatus.uri].computedStatus = { ...state.entities[actionStatus.uri].computedStatus, description: actionStatus.description, status: actionStatus.severity };
        };
        /**
         * Build "computed" backend status
         * @param actionStatus
         * @param state
         * @returns
         */
        const _computeBackendStatus = (actionStatus, state) => {
            if (!actionStatus || !actionStatus.uri || !actionStatus.context || !state || !state.entities || !state.entities[DELSliceType_1.PXPBACKEND] || !state.entities[DELSliceType_1.PXPBACKEND].allStatuses ||
                !state.entities[DELSliceType_1.PXPBACKEND].computedStatus || !actionStatus.description || !actionStatus.description.title)
                return;
            // End Point status
            if (isPayloadAction(actionStatus.context) && (0, DELEndPointSliceFactory_1.isEndPointAction)(actionStatus.context)) {
                if (actionStatus.loadingInfo) {
                    if (actionStatus.loadingInfo.status === DELSliceType_1.enDELLoadingInfo.start) {
                        state.entities[DELSliceType_1.PXPBACKEND].computedStatus = { ...state.entities[DELSliceType_1.PXPBACKEND].computedStatus, loading: true, description: actionStatus.description, status: actionStatus.severity };
                    }
                    else {
                        if (actionStatus.context.type === DELPXPBackendCommunicationType_1.enDELPXPEndPointAction.connect && actionStatus.severity === DELSliceType_1.enDELStatus.success) {
                            state.entities[DELSliceType_1.PXPBACKEND].computedStatus = { ...state.entities[DELSliceType_1.PXPBACKEND].computedStatus, description: actionStatus.description, status: actionStatus.severity, connected: true };
                        }
                        else {
                            state.entities[DELSliceType_1.PXPBACKEND].computedStatus = { ...state.entities[DELSliceType_1.PXPBACKEND].computedStatus, description: actionStatus.description, status: actionStatus.severity };
                        }
                    }
                }
                else if (actionStatus.context.type === DELPXPBackendCommunicationType_1.enDELPXPEndPointAction.disconnect) {
                    // Disconnection (no promise --> no loading)
                    state.entities[DELSliceType_1.PXPBACKEND].computedStatus = { ...state.entities[DELSliceType_1.PXPBACKEND].computedStatus, description: actionStatus.description, status: actionStatus.severity };
                }
            }
        };
        // Init status slice: default value for PXP Backend status
        const initialState = { entities: {} };
        initialState.entities[DELSliceType_1.PXPBACKEND] = {
            computedStatus: {
                connected: false,
                status: DELSliceType_1.enDELStatus.success,
                description: { title: "" }
            },
            allStatuses: []
        };
        //--------------------------------------------------------------------------------------
        // Status Slice creation
        //--------------------------------------------------------------------------------------
        const pxpSlice = (0, Toolkit_1.createSlice)({
            name: exports.STATUS_SLICE,
            initialState: initialState,
            reducers: {},
            extraReducers: (builder) => {
                builder.addCase(sendStatusActionPXP, (state, action) => {
                    if (!action || !action.payload)
                        return;
                    // Warning: No URI
                    if (!action.payload.uri || action.payload.uri === "") {
                        console.debug("[PXP Store Middleware]: new status without URI defined");
                        return;
                    }
                    // Add URI (as key) to global object if not already defined
                    if (!state.entities.hasOwnProperty(action.payload.uri)) {
                        state.entities[action.payload.uri] = {
                            computedStatus: { status: DELSliceType_1.enDELStatus.success, description: { title: "" } },
                            allStatuses: []
                        };
                    }
                    //-----------------------------------------------------------------------------------------
                    // Loading stop status: - Remove loading start status 
                    //                      - If success: Remove also previous succesful statuses (if exist)
                    //-----------------------------------------------------------------------------------------
                    if (action.payload.loadingInfo !== undefined && action.payload.loadingInfo.status === DELSliceType_1.enDELLoadingInfo.stop) {
                        let statusStartRequest = state.entities[action.payload.uri].allStatuses.find((status) => { var _a, _b; return status.id === ((_b = (_a = action.payload) === null || _a === void 0 ? void 0 : _a.loadingInfo) === null || _b === void 0 ? void 0 : _b.startRequestId) && status.loadingInfo && status.loadingInfo.status === DELSliceType_1.enDELLoadingInfo.start; });
                        if (statusStartRequest) {
                            // Remove start loading status
                            state.entities[action.payload.uri].allStatuses = state.entities[action.payload.uri].allStatuses.filter((status) => {
                                const bRelatedStartLoadingStatus = (statusStartRequest && status.id === statusStartRequest.id) ? true : false;
                                let bPrevIdenticalStatus = false;
                                if (!bRelatedStartLoadingStatus) {
                                    bPrevIdenticalStatus = (status.uri === action.payload.uri && status.severity === DELSliceType_1.enDELStatus.success && status.severity === action.payload.severity) ? true : false;
                                }
                                return !bRelatedStartLoadingStatus && !bPrevIdenticalStatus;
                            });
                        }
                        else {
                            // Warning: Start request id not found TO DO @XXE
                            console.debug("[PXP Store Middleware]: new stop loading status, start request is not found");
                        }
                    }
                    state.entities[action.payload.uri].allStatuses = [...state.entities[action.payload.uri].allStatuses, action.payload];
                    // Update computed status
                    if (action.payload.uri === DELSliceType_1.PXPBACKEND && action.payload.context) {
                        _computeBackendStatus(action.payload, state);
                    }
                    else {
                        _computeCorpusStatus(action.payload, state);
                    }
                });
            }
        });
        //--------------------------------------------------------------------------------------
        // Selectors
        //--------------------------------------------------------------------------------------
        const selectorEntities = (0, Toolkit_1.createSelector)([(state) => state[exports.STATUS_SLICE]], (slice) => slice.entities);
        const selectors = {
            selectComputedStatusByURI: (arrURI) => (0, Toolkit_1.createSelector)([selectorEntities], (entities) => {
                let oGlobalStatus = { status: DELSliceType_1.enDELStatus.success, description: { title: "" } };
                if (!entities[DELSliceType_1.PXPBACKEND] || !entities[DELSliceType_1.PXPBACKEND].computedStatus)
                    return oGlobalStatus;
                // First: check backend status, if error or loading do not analyze other information
                if (entities[DELSliceType_1.PXPBACKEND].computedStatus.status === DELSliceType_1.enDELStatus.loading || entities[DELSliceType_1.PXPBACKEND].computedStatus.status === DELSliceType_1.enDELStatus.critical ||
                    entities[DELSliceType_1.PXPBACKEND].computedStatus.status === DELSliceType_1.enDELStatus.error) {
                    oGlobalStatus.status = entities[DELSliceType_1.PXPBACKEND].computedStatus.status;
                    oGlobalStatus.description = entities[DELSliceType_1.PXPBACKEND].computedStatus.description;
                }
                else {
                    if (arrURI) {
                        // Find loading and error statuses (if exist)
                        let tempStatus = DELSliceType_1.enDELStatus.success;
                        arrURI.forEach((uri) => {
                            if (uri !== DELSliceType_1.PXPBACKEND && entities && entities[uri] && entities[uri].computedStatus) {
                                if (entities[uri].computedStatus.status !== DELSliceType_1.enDELStatus.success) {
                                    if (!oGlobalStatus.additionalInfo) {
                                        oGlobalStatus.additionalInfo = [];
                                    }
                                    if (oGlobalStatus.description.title === "" || (entities[uri].computedStatus.status === DELSliceType_1.enDELStatus.error && tempStatus !== DELSliceType_1.enDELStatus.error) ||
                                        (entities[uri].computedStatus.status === DELSliceType_1.enDELStatus.loading && tempStatus !== DELSliceType_1.enDELStatus.error) ||
                                        (entities[uri].computedStatus.status === DELSliceType_1.enDELStatus.warning && tempStatus !== DELSliceType_1.enDELStatus.warning && tempStatus !== DELSliceType_1.enDELStatus.error && tempStatus !== DELSliceType_1.enDELStatus.loading)) {
                                        oGlobalStatus.description = entities[uri].computedStatus.description;
                                        oGlobalStatus.status = entities[uri].computedStatus.status;
                                        tempStatus = entities[uri].computedStatus.status;
                                    }
                                    else {
                                        oGlobalStatus.additionalInfo.push({
                                            description: entities[uri].computedStatus.description,
                                            status: entities[uri].computedStatus.status
                                        });
                                    }
                                }
                            }
                        });
                    }
                    else {
                        oGlobalStatus = { status: DELSliceType_1.enDELStatus.success, description: { title: "" } };
                    }
                }
                return oGlobalStatus;
            })
        };
        return {
            actions: {
                sendStatus: fctSendStatusAction,
            },
            reducers: pxpSlice.reducer,
            selectors: selectors
        };
    };
    exports.createStatusSlice = createStatusSlice;
});
