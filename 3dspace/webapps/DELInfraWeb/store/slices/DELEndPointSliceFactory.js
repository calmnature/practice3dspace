/// <amd-module name="DS/DELInfraWeb/store/slices/DELEndPointSliceFactory"/>
define("DS/DELInfraWeb/store/slices/DELEndPointSliceFactory", ["require", "exports", "DS/ReactRedux/Toolkit", "DS/DELInfraWeb/typings/DELPXPBackendCommunicationType", "DS/DELPXPFoundations/PXPUtils", "i18n!DS/DELInfraWeb/assets/nls/DELEndPointSlice"], function (require, exports, Toolkit_1, DELPXPBackendCommunicationType_1, Utils, nls) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createEndPointSlice = exports._buildStateSubActionName = exports.buildEndPointActionName = exports.getNlsEndPointType = exports.isEndPointAction = void 0;
    /**
     * Check if input Action is a End Point action
     * @param action
     * @returns
     */
    const isEndPointAction = function (action) {
        if (!action || !action.type || action.type === "")
            return false;
        return Object.values(DELPXPBackendCommunicationType_1.enDELPXPEndPointAction).includes(action.type);
    };
    exports.isEndPointAction = isEndPointAction;
    /**
     * Get Nls value for End Point type
     * @param type - enDELPXPEndPointType
     * @returns
     */
    const getNlsEndPointType = (type) => {
        let oNls = "";
        if (type) {
            switch (type) {
                case DELPXPBackendCommunicationType_1.enDELPXPEndPointType.Session:
                    oNls = nls.Session;
                    break;
                case DELPXPBackendCommunicationType_1.enDELPXPEndPointType.User:
                    oNls = nls.User;
                    break;
                default:
                    break;
            }
        }
        return oNls;
    };
    exports.getNlsEndPointType = getNlsEndPointType;
    /**
     * Build End Point Action Name
     * @param {enDELPXPEndPointAction} enEndPointAction
     * @param {enDELPXPEndPointType} endPointType
      * @returns
     */
    const buildEndPointActionName = function (enEndPointAction, endPointType) {
        let oActionType = "";
        if (!enEndPointAction || !endPointType)
            return oActionType;
        oActionType = "/" + DELPXPBackendCommunicationType_1.BACKEND_RESPONSE + "/" + enEndPointAction.toString() + "/" + endPointType.toString();
        return oActionType;
    };
    exports.buildEndPointActionName = buildEndPointActionName;
    /**
     * ONLY FOR INTERNAL USE: Build State Sub action name
     * @param {enDELPXPEndPointAction} enEndPointAction
     * @param {enDELPXPEndPointType} endPointType
      * @returns
     */
    const _buildStateSubActionName = function (endPointType) {
        let oActionType = "";
        if (!endPointType)
            return oActionType;
        oActionType = "/" + DELPXPBackendCommunicationType_1.BACKEND_RESPONSE + "/endpoint_AddStateSubAction/" + endPointType.toString();
        return oActionType;
    };
    exports._buildStateSubActionName = _buildStateSubActionName;
    const createEndPointSlice = function (cfgSlice) {
        var _a;
        if (!cfgSlice) {
            throw new Error('End Point Slice factory: incorrect configuration'); // TODO Nls
        }
        if (!cfgSlice.uri || cfgSlice.uri === "" || !cfgSlice.type) {
            throw new Error('End Point Slice factory: incorrect configuration. Name and type attributes are mandatory !'); // TODO Nls
        }
        // CLOUD (only): Add identifier to End Point
        let uri = cfgSlice.uri;
        if (widget && widget.id) {
            uri += "|";
            if (cfgSlice.id && cfgSlice.id != "") {
                uri += cfgSlice.id;
            }
            else {
                uri += Utils.UUIDv4();
            }
        }
        const initialStateSlice = {
            autoCreationFlag: (_a = cfgSlice.autoCreationFlag) !== null && _a !== void 0 ? _a : true,
            endPoint: {
                connected: false,
                created: false,
                uri: uri,
                options: cfgSlice === null || cfgSlice === void 0 ? void 0 : cfgSlice.appOptions,
                type: cfgSlice.type || DELPXPBackendCommunicationType_1.enDELPXPEndPointType.User
            }
        };
        const pxpSlice = (0, Toolkit_1.createSlice)({
            name: cfgSlice.type.toString(),
            initialState: initialStateSlice,
            reducers: {},
            extraReducers: (builder) => {
                builder.addCase((0, exports.buildEndPointActionName)(DELPXPBackendCommunicationType_1.enDELPXPEndPointAction.connectionStatus, cfgSlice.type).toString(), (state, action) => {
                    if (!action || action.payload === undefined)
                        return;
                    state.endPoint.connected = action.payload;
                });
                builder.addCase((0, exports.buildEndPointActionName)(DELPXPBackendCommunicationType_1.enDELPXPEndPointAction.creationStatus, cfgSlice.type).toString(), (state, action) => {
                    if (!action || action.payload === undefined)
                        return;
                    state.endPoint.created = true;
                    state.endPoint.options = action.payload;
                });
                // ONLY FOR INTERNAL USE ;
                builder.addCase((0, exports._buildStateSubActionName)(cfgSlice.type), (state, action) => {
                    if (!action || action.payload === undefined)
                        return;
                    state.stateSubAction = action.payload;
                });
            }
        });
        const connectAction = (0, Toolkit_1.createAction)((DELPXPBackendCommunicationType_1.enDELPXPEndPointAction.connect).toString());
        const fctConnectAction = function () {
            return connectAction(initialStateSlice.endPoint);
        };
        const creationAction = (0, Toolkit_1.createAction)((DELPXPBackendCommunicationType_1.enDELPXPEndPointAction.creation).toString());
        const fctCreationAction = function (endPointType) {
            return creationAction(endPointType);
        };
        const disconnectAction = (0, Toolkit_1.createAction)((DELPXPBackendCommunicationType_1.enDELPXPEndPointAction.disconnect).toString());
        const fctDisconnectAction = function () {
            return disconnectAction(initialStateSlice.endPoint.type);
        };
        const launchCmdAction = (0, Toolkit_1.createAction)((DELPXPBackendCommunicationType_1.enDELPXPEndPointAction.launchCommand).toString());
        const fctLaunchCmdAction = function (launchCmdInfo) {
            launchCmdInfo.type = initialStateSlice.endPoint.type;
            return launchCmdAction(launchCmdInfo);
        };
        const unsubscribeAction = (0, Toolkit_1.createAction)((DELPXPBackendCommunicationType_1.enDELPXPEndPointAction.unsubscribe).toString());
        const fctUnsubscribeAction = function () {
            return unsubscribeAction(initialStateSlice.endPoint.type);
        };
        /*const publishAction: PayloadActionCreator<DELPXPBackendPublish> = createAction<DELPXPBackendPublish>((enDELPXPEndPointAction.publish).toString());
        const fctPublishAction = function (launchCmdInfo: DELPXPBackendPublish): Action<string> {
            return publishAction(launchCmdInfo);
        };*/
        const selectors = {
            selectValue: (0, Toolkit_1.createSelector)([(state) => state[pxpSlice.name]], (slice) => {
                return slice.endPoint;
            })
        };
        return {
            actions: {
                connect: fctConnectAction,
                creation: fctCreationAction,
                disconnect: fctDisconnectAction,
                launchCmd: fctLaunchCmdAction,
                unsubscribe: fctUnsubscribeAction,
                //publish: fctPublishAction
            },
            reducers: pxpSlice.reducer,
            selectors: selectors
        };
    };
    exports.createEndPointSlice = createEndPointSlice;
});
