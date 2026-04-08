/// <amd-module name="DS/DELInfraWeb/DELPXPBackendCommunication"/>
define("DS/DELInfraWeb/DELPXPBackendCommunication", ["require", "exports", "DS/DELInfraWeb/typings/DELPXPBackendCommunicationType", "DS/DELInfraWeb/store/slices/DELCorpusSliceFactory", "DS/DELInfraWeb/typings/DELSliceType", "DS/DELPXPFoundations/DELPXPFoundations", "DS/DELPXPFoundations/DELPXPFoundations", "DS/DELPXPFoundations/PXPBackendConnect", "DS/DELPXPFoundations/PXPUtils", "i18n!DS/DELInfraWeb/assets/nls/DELPXPBackendCommunication"], function (require, exports, DELPXPBackendCommunicationType_1, DELCorpusSliceFactory_1, DELSliceType_1, DELPXPFoundations_1, DELPXPFoundations_2, PXPBackendConnect_1, Utils, nls) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DELPXPBackendCommunication = exports.KeySignal = exports.Transport = exports.EventFlag = exports.EventType = exports.EventStatus = exports.HeaderKey = void 0;
    Object.defineProperty(exports, "HeaderKey", { enumerable: true, get: function () { return DELPXPFoundations_2.HeaderKey; } });
    Object.defineProperty(exports, "EventStatus", { enumerable: true, get: function () { return DELPXPFoundations_2.EventStatus; } });
    Object.defineProperty(exports, "EventType", { enumerable: true, get: function () { return DELPXPFoundations_2.EventType; } });
    Object.defineProperty(exports, "EventFlag", { enumerable: true, get: function () { return DELPXPFoundations_2.EventFlag; } });
    Object.defineProperty(exports, "Transport", { enumerable: true, get: function () { return DELPXPFoundations_2.Transport; } });
    Object.defineProperty(exports, "KeySignal", { enumerable: true, get: function () { return DELPXPFoundations_2.KeySignal; } });
    const TOPIC_STATESUBSCRIPTION = "StateSubscription";
    const CUD_EVENT = "CUDEvent";
    const DEFAULT_TIMEOUT = 60000;
    // Get End Point creation + connection status to prevent request if not
    class DELPXPBackendCommunication {
        constructor() {
            this._mapEndPoint = new Map();
            this._mapQueryActionId = new Map();
            this._setAttachOnMsgKey = new Set();
            this._dispatchCB = undefined;
        }
        isDispatchCBSet() {
            return (this._dispatchCB !== undefined);
        }
        setDispatchCB(dispatchCB) {
            this._dispatchCB = dispatchCB;
        }
        /**
       * Get End Point connection status
       * @param endPointType
       * @returns boolean - True if End Point is connected
       */
        isEndPointConnected(endPointType) {
            let isConnected = false;
            if (endPointType && this._mapEndPoint) {
                let existingEndPoint = this._mapEndPoint.get(endPointType);
                if (existingEndPoint) {
                    isConnected = existingEndPoint.isConnected();
                }
            }
            return isConnected;
        }
        /**
         * Get End Point creation status
         * @param endPointType
         * @returns boolean - True if End Point is created
         */
        isEndPointCreated(endPointType) {
            let isCreated = false;
            if (endPointType && this._mapEndPoint) {
                isCreated = (this._mapEndPoint.get(endPointType) !== undefined);
            }
            return isCreated;
        }
        /**
         * Get Timeout
         * @param endPointType
         * @returns
         */
        getTimeout() {
            return DEFAULT_TIMEOUT;
        }
        /**
           * Connect to PXP Backend
           * @param options
           * @returns
           */
        _connectToPXPBackend(options) {
            return new Promise((resolve, reject) => {
                let registryAPI;
                (0, PXPBackendConnect_1.ConnectToPXPBackend)(options || {})
                    .then((connection) => {
                    var _a;
                    // update registry API
                    registryAPI = connection.registry;
                    const ConnectionEK = {
                        serverUrl: connection.hypervisorUrl,
                        clientName: (_a = (options && options.clientName)) !== null && _a !== void 0 ? _a : 'Widget',
                        ...(options && options.checkServer && {
                            features: DELPXPFoundations_1.enFeaturesBusOptions.enCheckHypervisorConnectionOnCreate,
                        }),
                        ...(connection.passportUrl && {
                            authentication: DELPXPFoundations_1.AuthProfile.ServiceWithTGT({ passport: connection.passportUrl.toString() }) /// injection passport for local server ! (bypass EK.Passport)
                        })
                    };
                    const busName = (options === null || options === void 0 ? void 0 : options.busName) || 'LocalBus';
                    return (0, DELPXPFoundations_1.ConnectToBusEK)(busName, ConnectionEK);
                })
                    .then((Bus) => {
                    console.info('%c    * Connection Server %cOK%c (' + Bus.serverUrl + ')', 'color: blue;', 'color: green;font-weight:bold;', 'color: blue;');
                    resolve(Bus);
                });
            });
        }
        ;
        /**
         * Build Response payload from a Transport object received from backend request
         * @param transport
         * @returns
         */
        _buildResponsePayload(transport) {
            var _a;
            if (!transport || transport.isStatusError())
                return;
            let oResponse = {
                correlationID: transport.getCorrelationID(),
                objects: []
            };
            if (transport.isPXP_ObjectContainer()) {
                const iterableContainer = transport.asPXP_ObjectContainer();
                for (const itemContainer of iterableContainer) {
                    if (DELPXPFoundations_1.PXPObject.isCompatible(itemContainer) && oResponse.objects) {
                        oResponse.objects.push(itemContainer);
                    }
                }
            }
            else if (transport.isText()) {
                const txtContent = transport.asText();
                if (txtContent !== "") {
                    oResponse.content = txtContent;
                }
            }
            if (transport.hasHeader("type") && transport.getHeader("type") !== "") {
                oResponse.objectsType = transport.getHeader("type");
            }
            else {
                const objectWithType = (_a = oResponse === null || oResponse === void 0 ? void 0 : oResponse.objects) === null || _a === void 0 ? void 0 : _a.find((item) => item.hasOwnProperty("objectsType"));
                if (objectWithType) {
                    oResponse.objectsType = objectWithType.objectsType;
                }
            }
            // FUTUR: check type of retrieved objects --> ok with slice type ?
            return oResponse;
        }
        ;
        _isCUDEventCompatible(cudObject) {
            if (!DELPXPFoundations_1.PXPObject.isCompatible(cudObject))
                return false;
            if ('created' in cudObject && Array.isArray(cudObject['created']) && 'deleted' in cudObject && Array.isArray(cudObject['deleted']) &&
                'deleted' in cudObject && Array.isArray(cudObject['deleted']) && 'type' in cudObject && typeof cudObject['type'] === 'string')
                return true;
            else
                return false;
        }
        /**
         * Dispatch Action related to input CUD Event transport object
         * @param transport - CUD Event transport object
         * @param uri - Corpus Slice uri
         */
        _dispatchCUDEventAction(transport, uri) {
            if (!transport || !transport.isPXP_ObjectContainer() || transport.isStatusError() || !uri || uri === "" || !this._dispatchCB)
                return;
            const transportContent = transport.getContent();
            if (!transportContent || !this._isCUDEventCompatible(transportContent))
                return;
            let payload = {
                correlationID: transport.getCorrelationID(),
                objects: [],
                stateSubscriptionFlag: true
            };
            let content = transportContent;
            payload.objectsType = content.type;
            let eCrudAction;
            if (content.created.length > 0) {
                eCrudAction = DELPXPBackendCommunicationType_1.enDELPXPCRUDAction.create;
                payload.objects = content.created;
            }
            else if (content.deleted.length > 0) {
                eCrudAction = DELPXPBackendCommunicationType_1.enDELPXPCRUDAction.delete;
                payload.objects = content.deleted;
            }
            else {
                eCrudAction = DELPXPBackendCommunicationType_1.enDELPXPCRUDAction.update;
                payload.objects = content.updated;
            }
            const action = {
                payload: payload,
                type: "/" + DELPXPBackendCommunicationType_1.BACKEND_RESPONSE + "/" + eCrudAction + uri
            };
            this._dispatchCB(action);
        }
        /**
         * Clean CB defined on End Point
         * @param endPoint
         * @returns
         */
        _cleanEndPointCB(endPoint) {
            if (!endPoint)
                return;
            this._unsubscribeStateSubSignal(endPoint);
            endPoint.detachOnConnectionChange(this._onConnectionChange);
            this._setAttachOnMsgKey.forEach((key) => {
                endPoint.detachOnMessage(key);
            });
        }
        ;
        /**
         * Unsubscribe to State Subscription topic ansd signal
         * @param endPoint
         * @returns
         */
        unsubscribeStateSubSignal(endPointType) {
            if (!endPointType)
                return;
            let existingEndPoint = this._mapEndPoint.get(endPointType);
            if (!existingEndPoint)
                return;
            this._unsubscribeStateSubSignal(existingEndPoint);
        }
        ;
        /**
         * Unsubscribe to State Subscription topic ansd signal
         * @param endPoint
         * @returns
         */
        _unsubscribeStateSubSignal(endPoint) {
            if (!endPoint)
                return;
            endPoint.unsubscribeTopics(TOPIC_STATESUBSCRIPTION);
            endPoint.unsubscribeSignal();
        }
        ;
        /**
         * Call back for On Connection Change Event
         * @param this - OnConnectionChangeInfo, end point info and dispatch callback to launch action from Middleware
         * @param status
         * @returns
         */
        _onConnectionChange(status) {
            if (!this.endPointType || !this.dispatchCB || !status || (status !== DELPXPFoundations_1.enConnectionStatus.connected && (status !== DELPXPFoundations_1.enConnectionStatus.disconnected)))
                return;
            let actionType = (status === DELPXPFoundations_1.enConnectionStatus.connected) ? DELPXPBackendCommunicationType_1.enDELPXPEndPointAction.connect : DELPXPBackendCommunicationType_1.enDELPXPEndPointAction.disconnect;
            const payloadAction = {
                payload: this.endPointType,
                type: actionType
            };
            this.dispatchCB(payloadAction);
        }
        /**
         * Create a new End Point
         * @param endPointCreationInfo
         * @returns
         */
        async createEndPoint(endPointSliceState, appOptions) {
            return new Promise((resolve, reject) => {
                if (!endPointSliceState || !endPointSliceState.endPoint) {
                    reject(this._handleError(nls.errorEndpoint));
                }
                else {
                    this._connectToPXPBackend(appOptions).then((bus) => {
                        return bus.CreateEndpoint(endPointSliceState.endPoint.uri, endPointSliceState.endPoint.options);
                    }).then((endPointClient) => {
                        let existingEndPoint = this._mapEndPoint.get(endPointSliceState.endPoint.type);
                        if (!existingEndPoint) {
                            this._mapEndPoint.set(endPointSliceState.endPoint.type, endPointClient);
                            endPointClient.subscribeTopics(TOPIC_STATESUBSCRIPTION).catch((error) => { reject(this._handleError(error)); });
                            endPointClient.attachOnConnectionChange(this._onConnectionChange.bind({ endPointType: endPointSliceState.endPoint.type, dispatchCB: this._dispatchCB }));
                            resolve(endPointClient);
                        }
                        else {
                            reject(this._handleError(nls.errorEndpoint));
                        }
                    }).catch((error) => { reject(this._handleError(error)); });
                }
            });
        }
        ;
        /**
         * Subscribe to State Subscription topic: attach a callback and filter messages
         * @param endPoint
         * @returns
         */
        _subscribe(endPointType, uri, actionId) {
            if (!endPointType || !uri || uri === "" || !this._mapEndPoint || !this._setAttachOnMsgKey || !this._mapQueryActionId || !actionId)
                return;
            let endPointClient = this._mapEndPoint.get(endPointType);
            if (!endPointClient) {
                this._handleError(nls.errorEndpoint);
            }
            else {
                // XXE TMP subscribeToUpdates on READ request, wait for Query request on all URIs
                const uriWithoutReqPrefix = uri.replace("/" + DELPXPBackendCommunicationType_1.enDELPXPCRUDAction.query.toString(), '').replace("/" + DELPXPBackendCommunicationType_1.enDELPXPCRUDAction.read.toString(), '');
                //-----------------------------------------------------------------------
                // Get concept: support two use cases
                // --> uri = "domaine/concept" or uri = "/domaine/version/concept"
                //-----------------------------------------------------------------------
                const arrSplitUri = uriWithoutReqPrefix.split('/');
                if (!arrSplitUri || arrSplitUri.length < 3 || arrSplitUri.length > 4)
                    return;
                const concept = (arrSplitUri.length === 3) ? arrSplitUri[2] : arrSplitUri[3];
                // Check cb on message is not already added
                //@ts-ignore
                if (endPointClient._onMessageRegistered && endPointClient._onMessageRegistered.find((msgRegistered) => msgRegistered.key === uriWithoutReqPrefix)) {
                    return;
                }
                // Store subscription info for onMessage and onAZcceptFilter callbacks
                const setActionId = this._mapQueryActionId.get(uriWithoutReqPrefix);
                if (setActionId) {
                    setActionId.add(actionId);
                }
                else {
                    const setActionIdNew = new Set();
                    setActionIdNew.add(actionId);
                    this._mapQueryActionId.set(uriWithoutReqPrefix, setActionIdNew);
                }
                // Store callback key to handle unsubscription
                this._setAttachOnMsgKey.add(uriWithoutReqPrefix);
                /**
                 * Message is accepted: dispatch related action to the store
                 * @param message
                 * @returns
                 */
                const onMessage = (message) => {
                    if (!message || !this._dispatchCB)
                        return;
                    const typeObj = message.getHeader("type");
                    if (!typeObj || typeObj === "")
                        return;
                    // TMP Code: Corpus data not migrated to CUD Event
                    if (typeObj !== CUD_EVENT) {
                        const payloadStateSub = this._buildResponsePayload(message);
                        if (payloadStateSub) {
                            const action = {
                                payload: payloadStateSub,
                                type: (0, DELCorpusSliceFactory_1.buildCorpusRespName)(DELPXPBackendCommunicationType_1.enDELPXPCRUDAction.createUpdate, uriWithoutReqPrefix)
                            };
                            this._dispatchCB(action);
                        }
                    }
                    else {
                        this._dispatchCUDEventAction(message, uriWithoutReqPrefix);
                    }
                };
                /**
                 * Message filtering
                 * @param message
                 * @returns
                 */
                const onAcceptFilter = (message) => {
                    if (!concept || concept === "" || !message || message.getTopic() !== "StateSubscription" || !message.hasHeader("type") || !message.isPXP_ObjectContainer())
                        return false;
                    // Message is in error: log an error status in Status slice
                    if (message.isStatusError() && this._dispatchCB) {
                        const requesterId = message.getHeader("SubscribeId");
                        const action = {
                            payload: {
                                id: Utils.UUIDv4(),
                                severity: DELSliceType_1.enDELStatus.error,
                                requesterId: (requesterId && requesterId != "") ? requesterId : DELSliceType_1.PXPBACKEND,
                                description: { title: nls.errorStateSubscriptionMessage },
                                context: message,
                                timeStamp: Date.now()
                            },
                            type: DELSliceType_1.STATUS_SENDSTATUS_ACTION
                        };
                        this._dispatchCB(action);
                        return false;
                    }
                    const typeObj = message.getHeader("type");
                    if (!typeObj || typeObj === "")
                        return false;
                    // Retrieve actionId(s) linked to current concept (uri)
                    let setActionId;
                    if (this._mapQueryActionId) {
                        setActionId = this._mapQueryActionId.get(uriWithoutReqPrefix);
                    }
                    const actionId = message.getHeader('SubscribeId');
                    if (!setActionId || !actionId || !setActionId.has(actionId))
                        return false;
                    // TMP Code: Corpus data not migrated to CUD Event
                    if (typeObj !== CUD_EVENT) {
                        if (!typeObj || typeObj !== concept)
                            return false;
                    }
                    else {
                        const msgContent = message.getContent();
                        if (!msgContent || !msgContent.type || msgContent.type !== concept)
                            return false;
                    }
                    return true;
                };
                endPointClient.attachOnMessage(onMessage, onAcceptFilter, uriWithoutReqPrefix);
            }
        }
        ;
        /**
       * unsubscribe: Clean CB defined on End Point
       * @param endPoint
       * @returns
       */
        _unsubscribe(endPointType, uri, actionId) {
            if (!endPointType || !uri || uri === "" || !this._mapEndPoint || !this._setAttachOnMsgKey || !this._mapQueryActionId || !actionId)
                return;
            let existingEndPoint = this._mapEndPoint.get(endPointType);
            if (!existingEndPoint) {
                this._handleError(nls.errorEndpoint);
            }
            else {
                const uriWithoutUnsub = uri.replace("/" + DELPXPBackendCommunicationType_1.UNSUBSCRIBE_UPDATE, '');
                existingEndPoint.detachOnMessage(uriWithoutUnsub);
                this._setAttachOnMsgKey.delete(uriWithoutUnsub);
                const setActionId = this._mapQueryActionId.get(uriWithoutUnsub);
                if (setActionId) {
                    setActionId.delete(actionId);
                    if (setActionId.size === 0) {
                        this._mapQueryActionId.delete(uriWithoutUnsub);
                    }
                }
            }
        }
        ;
        /**
           * Connect End Point
           * @param cnxOptions
           * @returns
           */
        async connectEndPoint(endPointInfo) {
            return new Promise((resolve, reject) => {
                if (!endPointInfo || !endPointInfo.uri || endPointInfo.uri === "") {
                    reject(this._handleError(nls.errorEndpoint));
                }
                else {
                    let existingEndPoint = this._mapEndPoint.get(endPointInfo.type);
                    if (!existingEndPoint) {
                        reject(this._handleError(nls.errorEndpoint));
                    }
                    else {
                        if (!existingEndPoint.isConnected()) {
                            existingEndPoint.connect().then(() => {
                                resolve(existingEndPoint ? existingEndPoint.isConnected() : false);
                            }).catch((error) => { reject(this._handleError(error)); });
                        }
                        else {
                            resolve(true); /*Warning ? */
                        }
                    }
                }
            });
        }
        ;
        /**
         * End Point disconnection
         * @param endPointType
         * @returns
         */
        disconnect(endPointType) {
            if (!endPointType)
                return;
            let existingEndPoint = this._mapEndPoint.get(endPointType);
            if (!existingEndPoint)
                return;
            this._cleanEndPointCB(existingEndPoint);
            existingEndPoint.disconnect();
            this._mapEndPoint.delete(endPointType);
        }
        ;
        /**
         * Handle error
         * @param transportMsg
         * @returns
         */
        _handleError(error) {
            let errorMsg = "";
            if (!error)
                return errorMsg;
            if (error instanceof DELPXPFoundations_1.Transport) {
                if (error.isError()) {
                    const pxpError = error.asError();
                    errorMsg = pxpError.getMessage();
                }
                else if (error.isText()) {
                    errorMsg = error.asText();
                }
            }
            else if (typeof error === "string") {
                errorMsg = error;
            }
            else if (error instanceof Error) {
                errorMsg = error.message;
            }
            return errorMsg;
        }
        ;
        /**
         * Check if Request parameters attributes are correct
         * @param {RequestParameters} options
         * @param {string} uri
         * @return {boolean} TRUE if parameters attributes are correct
         */
        _checkRequestParameters(options) {
            let oReturn = true, nlsMsg = "[PXP Backend Com] uri = " + options.uri + " : ";
            if (!options || !options.uri || options.uri === "") {
                return false;
            }
            if (!options.onFail) {
                nlsMsg += nls.errorOnFail;
                oReturn = false;
            }
            if (!options.onSuccess) {
                nlsMsg += ((nlsMsg.length > 0) ? ", " : "") + nls.errorOnSuccess;
                oReturn = false;
            }
            if (!oReturn) {
                throw new Error(nlsMsg);
            }
            return oReturn;
        }
        ;
        /**
         * Handle onSuccess callback
         * @param transport
         */
        _handleOnSuccess(transport, resolve, reject) {
            if (!transport || !resolve || !reject) {
                throw new Error("[PXP Backend Com] onSucces callback: missing information");
            }
            if (transport.isStatusError()) {
                reject(this._handleError(nls.errorReqAnswerStatus));
            }
            else {
                resolve(this._buildResponsePayload(transport));
            }
        }
        ;
        /**
         * Send Create Request
         * @param uri
         * @param objectsType
         * @param objectsId
         */
        sendCreateRequest(endPointType, uri, payload) {
            return new Promise((resolve, reject) => {
                const arrResponse = [];
                this._sendCreateRequest({
                    endPointType: endPointType,
                    uri: uri,
                    objectsType: payload.objectsType,
                    objectsToCreate: payload.objectsToCreate,
                    requesterId: payload === null || payload === void 0 ? void 0 : payload.requesterId,
                    onSuccess: (transportMsg) => {
                        this._handleOnSuccess(transportMsg, resolve, reject);
                    },
                    onFail: (transportError) => { reject(this._handleError(transportError)); }
                });
            });
        }
        ;
        /**
         * Send Create Request
         * @param options
         * @returns
         */
        _sendCreateRequest(options) {
            if (!this._checkRequestParameters(options) || !options.endPointType)
                return false;
            if (!options.objectsType) {
                throw new Error("[PXP Backend Com] uri = " + options.uri + " : " + nls.errorObjectType);
            }
            if (!options.objectsToCreate) {
                throw new Error("[PXP Backend Com] uri = " + options.uri + " : " + nls.errorObjectsToCreate);
            }
            const endPoint = this._mapEndPoint.get(options.endPointType);
            if (!endPoint)
                throw new Error("[PXP Backend Com] " + nls.errorEndpoint);
            // Create event transport
            const msg = new DELPXPFoundations_1.Transport(DELPXPFoundations_1.Event.EventType.bagobjects, {
                'Create~1': {
                    "@class": "Create~1",
                    objectsType: options.objectsType,
                    objectsToCreate: options.objectsToCreate,
                },
            });
            // Add type header
            msg.withHeaders({ type: 'Create', requesterId: options.requesterId });
            return endPoint.sendRequest({
                uri: options.uri,
                msg: msg,
                onSuccess: options.onSuccess,
                onFail: options.onFail,
            });
        }
        ;
        /**
       * Send an Unsubscribe (to udpate) Request
       * @param endPointType
       * @param uri
       * @param payload
       * @returns
       */
        sendUnsubscribeUpdateRequest(endPointType, uri, payload) {
            return new Promise((resolve, reject) => {
                const arrResponse = [];
                this._sendUnsubscribeUpdateRequest({
                    endPointType: endPointType,
                    uri: uri,
                    objectsType: payload.objectsType,
                    actionId: payload.actionId,
                    onSuccess: (transportMsg) => {
                        this._unsubscribe(endPointType, uri, payload.actionId);
                        this._handleOnSuccess(transportMsg, resolve, reject);
                    },
                    onFail: (transportError) => { reject(this._handleError(transportError)); }
                });
            });
        }
        ;
        /**
         * Send an Unsubscribe (to udpate) Request
         * @param options
         * @returns
         */
        _sendUnsubscribeUpdateRequest(options) {
            if (!this._checkRequestParameters(options) || !options.endPointType) {
                throw new Error("[PXP Backend Com] " + nls.errorIncorrectReqOptions);
            }
            if (!options.objectsType) {
                throw new Error("[PXP Backend Com] uri = " + options.uri + " : " + nls.errorObjectType);
            }
            if (!options.actionId) {
                throw new Error("[PXP Backend Com] uri = " + options.uri + " : " + nls.errorActionId);
            }
            const endPoint = this._mapEndPoint.get(options.endPointType);
            if (!endPoint) {
                throw new Error("[PXP Backend Com] " + nls.errorEndpoint);
            }
            // Create event transport
            const headerTransport = {
                'Unsubscribe~1': {
                    "@class": "Unsubscribe~1",
                    actionId: options.actionId,
                    objectsType: options.objectsType
                },
            };
            const msg = new DELPXPFoundations_1.Transport(DELPXPFoundations_1.Event.EventType.bagobjects, headerTransport);
            // Add type header
            msg.withHeaders({ type: 'Unsubscribe', requesterId: options.requesterId });
            return endPoint.sendRequest({
                uri: options.uri,
                msg: msg,
                onSuccess: options.onSuccess,
                onFail: options.onFail,
            });
        }
        ;
        /**
           * Send a Read Request
           * @param uri
           * @param objectsType
           * @param objectsId
           */
        sendReadRequest(endPointType, uri, payload) {
            return new Promise((resolve, reject) => {
                const actionId = payload.actionId || Utils.UUIDv4();
                this._sendReadRequest({
                    actionId,
                    endPointType: endPointType,
                    uri: uri,
                    objectsType: payload.objectsType,
                    objectsToRead: payload.objectsToRead,
                    requesterId: payload === null || payload === void 0 ? void 0 : payload.requesterId,
                    subscribeToUpdates: payload.subscribeToUpdates || false,
                    onSuccess: (transportMsg) => {
                        // XXE TMP subscribeToUpdates, wait for Query request on all URIs
                        if (payload.subscribeToUpdates) {
                            this._subscribe(endPointType, uri, actionId);
                        }
                        this._handleOnSuccess(transportMsg, resolve, reject);
                    },
                    onFail: (transportError) => { reject(this._handleError(transportError)); }
                });
            });
        }
        ;
        /**
         * Send a Read Request
         * @param options
         * @returns
         */
        _sendReadRequest(options) {
            if (!this._checkRequestParameters(options) || !options.endPointType) {
                throw new Error("[PXP Backend Com] " + nls.errorIncorrectReqOptions);
            }
            if (!options.objectsType) {
                throw new Error("[PXP Backend Com] uri = " + options.uri + " : " + nls.errorObjectType);
            }
            let objectsToRead = undefined;
            if (options.objectsToRead) {
                if (!Array.isArray(options.objectsToRead) && typeof options.objectsToRead === "string") {
                    objectsToRead = [options.objectsToRead];
                }
                else {
                    objectsToRead = options.objectsToRead;
                }
            }
            const endPoint = this._mapEndPoint.get(options.endPointType);
            if (!endPoint) {
                throw new Error("[PXP Backend Com] " + nls.errorEndpoint);
            }
            // Create event transport
            const headerTransport = {
                'Read~1': {
                    "@class": "Read~1",
                    actionId: options.actionId,
                    objectsType: options.objectsType,
                    objectIdsToRead: objectsToRead,
                    subscribeToUpdates: options.subscribeToUpdates // XXE TMP: handle subscribe to update
                },
            };
            const msg = new DELPXPFoundations_1.Transport(DELPXPFoundations_1.Event.EventType.bagobjects, headerTransport);
            // Add type header
            msg.withHeaders({ type: 'Read', requesterId: options.requesterId });
            return endPoint.sendRequest({
                uri: options.uri,
                msg: msg,
                onSuccess: options.onSuccess,
                onFail: options.onFail,
            });
        }
        ;
        /**
         * Send a Query Request
         * @param uri
         * @param objectsType
         * @param objectsId
         */
        sendQueryRequest(endPointType, uri, payload) {
            return new Promise((resolve, reject) => {
                const actionId = payload.actionId || Utils.UUIDv4();
                this._sendQueryRequest({
                    actionId: actionId,
                    conditions: payload.conditions,
                    endPointType: endPointType,
                    objectsType: payload.objectsType,
                    subscribeToUpdates: payload.subscribeToUpdates || false,
                    requesterId: payload === null || payload === void 0 ? void 0 : payload.requesterId,
                    uri: uri,
                    onSuccess: (transportMsg) => {
                        if (payload.subscribeToUpdates) {
                            this._subscribe(endPointType, uri, actionId);
                        }
                        this._handleOnSuccess(transportMsg, resolve, reject);
                    },
                    onFail: (transportError) => { reject(this._handleError(transportError)); }
                });
            });
        }
        ;
        /**
         * Send a Query Request
         * @param options
         * @returns
         */
        _sendQueryRequest(options) {
            // @TODO log a warning / error if subscribeToUpdates + actionId === "" --> no filtering, PCS issue
            if (!this._checkRequestParameters(options) || !options.endPointType)
                return false;
            if (!options.objectsType) {
                throw new Error("[PXP Backend Com] uri = " + options.uri + " : " + nls.errorObjectType);
            }
            if (!options.conditions) {
                throw new Error("[PXP Backend Com] uri = " + options.uri + " : " + nls.errorConditions);
            }
            const endPoint = this._mapEndPoint.get(options.endPointType);
            if (!endPoint)
                throw new Error("[PXP Backend Com] " + nls.errorEndpoint);
            // Create event transport
            const headerTransport = {
                'Query~1': {
                    "@class": "Query~1",
                    actionId: options.actionId,
                    objectsType: options.objectsType,
                    conditions: options.conditions,
                    subscribeToUpdates: options.subscribeToUpdates
                },
            };
            const msg = new DELPXPFoundations_1.Transport(DELPXPFoundations_1.Event.EventType.bagobjects, headerTransport);
            // Add type header
            msg.withHeaders({ type: 'Query', requesterId: options.requesterId });
            return endPoint.sendRequest({
                uri: options.uri,
                msg: msg,
                onSuccess: options.onSuccess,
                onFail: options.onFail,
            });
        }
        ;
        /**
         * Send an Update Request
         * @param uri
         * @param objectsType
         * @param objectsId
         */
        sendUpdateRequest(endPointType, uri, payload) {
            return new Promise((resolve, reject) => {
                const arrResponse = [];
                this._sendUpdateRequest({
                    endPointType: endPointType,
                    uri: uri,
                    objectsType: payload.objectsType,
                    objectsToCreateUpdate: payload.objectsToCreateUpdate,
                    requesterId: payload === null || payload === void 0 ? void 0 : payload.requesterId,
                    onSuccess: (transportMsg) => {
                        this._handleOnSuccess(transportMsg, resolve, reject);
                    },
                    onFail: (transportError) => { reject(this._handleError(transportError)); }
                });
            });
        }
        ;
        /**
         * Send an Update Request
         * @param options
         * @returns
         */
        _sendUpdateRequest(options) {
            if (!this._checkRequestParameters(options) || !options.endPointType)
                return false;
            if (!options.objectsType) {
                throw new Error("[PXP Backend Com] uri = " + options.uri + " : " + nls.errorObjectType);
            }
            if (!options.objectsToCreateUpdate) {
                throw new Error("[PXP Backend Com] uri = " + options.uri + " : " + nls.errorObjectsToUpdate);
            }
            const endPoint = this._mapEndPoint.get(options.endPointType);
            if (!endPoint)
                throw new Error("[PXP Backend Com] " + nls.errorEndpoint);
            // Create event transport
            const msg = new DELPXPFoundations_1.Transport(DELPXPFoundations_1.Event.EventType.bagobjects, {
                'Update~1': {
                    "@class": "Update~1",
                    objectsType: options.objectsType,
                    objectsToCreateUpdate: options.objectsToCreateUpdate,
                },
            });
            // Add type header
            msg.withHeaders({ type: 'Update', requesterId: options.requesterId, });
            return endPoint.sendRequest({
                uri: options.uri,
                msg: msg,
                onSuccess: options.onSuccess,
                onFail: options.onFail,
            });
        }
        ;
        /**
         * Send a Delete Request
         * @param uri
         * @param objectsType
         * @param objectsId
         */
        sendDeleteRequest(endPointType, uri, payload) {
            return new Promise((resolve, reject) => {
                const arrResponse = [];
                this._sendDeleteRequest({
                    endPointType: endPointType,
                    uri: uri,
                    objectsType: payload.objectsType,
                    objectsToDelete: payload.objectsToDelete,
                    requesterId: payload === null || payload === void 0 ? void 0 : payload.requesterId,
                    onSuccess: (transportMsg) => {
                        this._handleOnSuccess(transportMsg, resolve, reject);
                    },
                    onFail: (transportError) => { reject(this._handleError(transportError)); }
                });
            });
        }
        ;
        /**
         * Send a Delete Request
         * @param options
         * @returns
         */
        _sendDeleteRequest(options) {
            if (!this._checkRequestParameters(options) || !options.endPointType)
                return false;
            if (!options.objectsType) {
                throw new Error("[PXP Backend Com] uri = " + options.uri + " : " + nls.errorObjectType);
            }
            if (!options.objectsToDelete) {
                throw new Error("[PXP Backend Com] uri = " + options.uri + " : " + nls.errorObjectsToDelete);
            }
            const endPoint = this._mapEndPoint.get(options.endPointType);
            if (!endPoint)
                throw new Error("[PXP Backend Com] " + nls.errorEndpoint);
            // Create event transport
            const msg = new DELPXPFoundations_1.Transport(DELPXPFoundations_1.Event.EventType.bagobjects, {
                'Delete~1': {
                    "@class": "Delete~1",
                    objectsType: options.objectsType,
                    objectIdsToDelete: options.objectsToDelete,
                },
            });
            // Add type header
            msg.withHeaders({ type: 'Delete', requesterId: options.requesterId });
            return endPoint.sendRequest({
                uri: options.uri,
                msg: msg,
                onSuccess: options.onSuccess,
                onFail: options.onFail,
            });
        }
        ;
        /**
         * Launch a command
         * @param pxpCommand
         * @returns
         */
        launchCmd(pxpCommand) {
            return new Promise((resolve, reject) => {
                if (!pxpCommand || !pxpCommand.name || pxpCommand.name === "" || !pxpCommand.type || !pxpCommand.uri || pxpCommand.uri === "") {
                    reject(new Error("[PXP Backend Com] launchCmd = " + nls.errorLaunchCmd));
                }
                if (pxpCommand.type !== undefined) {
                    const endPoint = this._mapEndPoint.get(pxpCommand.type);
                    if (!endPoint) {
                        reject(new Error("[PXP Backend Com] launchCmd = " + nls.errorEndpoint));
                    }
                    const cmdTransport = new DELPXPFoundations_1.Transport(DELPXPFoundations_1.EventType.object, {
                        "@class": "Command~1",
                        commandName: pxpCommand.name,
                        parameters: (pxpCommand.parameters && Array.isArray(pxpCommand.parameters)) ? pxpCommand.parameters : [],
                        KVParameters: (pxpCommand.KVParameters && Array.isArray(pxpCommand.KVParameters)) ? pxpCommand.KVParameters : [],
                    });
                    endPoint === null || endPoint === void 0 ? void 0 : endPoint.request(pxpCommand.uri, cmdTransport).then((transport) => {
                        resolve();
                    }).catch((error) => {
                        reject(error);
                    });
                }
            });
        }
        ;
    }
    exports.DELPXPBackendCommunication = DELPXPBackendCommunication;
});
