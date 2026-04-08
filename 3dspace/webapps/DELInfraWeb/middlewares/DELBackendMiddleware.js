/// <amd-module name="DS/DELInfraWeb/middlewares/DELBackendMiddleware"/>
define("DS/DELInfraWeb/middlewares/DELBackendMiddleware", ["require", "exports", "DS/DELInfraWeb/DELPXPBackendCommunication", "DS/DELInfraWeb/typings/DELPXPBackendCommunicationType", "DS/DELInfraWeb/store/slices/DELCorpusSliceFactory", "DS/DELInfraWeb/store/slices/DELEndPointSliceFactory", "DS/DELInfraWeb/typings/DELSliceType", "DS/Logger/Logger", "i18n!DS/DELInfraWeb/assets/nls/DELBackendMiddleware"], function (require, exports, DELPXPBackendCommunication_1, DELPXPBackendCommunicationType_1, DELCorpusSliceFactory_1, DELEndPointSliceFactory_1, DELSliceType_1, Logger, nls) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Get error message from object returned by a promise --> a string or an error
     * @param error - Error | string
     * @returns - string: Error message
     */
    const _getErrorMessage = (error) => {
        let oErrorMsg = "";
        if (error) {
            oErrorMsg = typeof error === "string" ? error : error.message;
        }
        return oErrorMsg;
    };
    /** @TODO XXE
     * Handle START Loading Status: dispatch action to update Status slice
     * @param storeApi - any: Store
     * @param uri - string: request uri
     * @param title - string: Success title
     * @param action - PayloadAction<any>
     * @param requesterId - string: Requester id (optional)
     */
    /*const _handleStartLoadingStatus = (storeApi: any, uri: string, title: string, action: PayloadAction<any>, requesterId?: string): string => {
    
      let oStatusId: string = "";
      if (storeApi && uri && title) {
    
        oStatusId = Utils.UUIDv4();
        const status: DELActionStatus = {
          id: oStatusId,
          uri: uri,
          requesterId: requesterId,
          severity: enDELStatus.loading,
          description: {
            title: title
          },
          context: action,
          loadingInfo: {
            status: enDELLoadingInfo.start
          },
          timeStamp: Date.now()
        };
        storeApi.dispatch({ type: STATUS_SENDSTATUS_ACTION, payload: status });
      }
    
      return oStatusId;
    };*/
    /** @TODO XXE
     * Handle STOP Loading Status: dispatch action to update Status slice
     * @param storeApi - any: Store
     * @param uri - string: request uri
     * @param description - StatusDescription: Title and message (optional)
     * @param severity - enDELStatus: Severity
     * @param startReqId - string: Start loading Request id
     * @param requesterId - string: Requester id (optional)
     */
    /*const _handleStopLoadingStatus = (storeApi: any, uri: string, description: StatusDescription, severity: enDELStatus, startReqId: string, action: PayloadAction<any>, requesterId?: string): string => {
    
      let oStatusId: string = "";
      if (storeApi && uri && description && description.title && startReqId && severity) {
    
        oStatusId = Utils.UUIDv4();
        const status: DELActionStatus = {
          id: oStatusId,
          uri: uri,
          requesterId: requesterId,
          severity: severity,
          description: {
            title: description.title,
            message: description?.message
          },
          loadingInfo: {
            status: enDELLoadingInfo.stop,
            startRequestId: startReqId
          },
          context: action,
          timeStamp: Date.now()
        };
        storeApi.dispatch({ type: STATUS_SENDSTATUS_ACTION, payload: status });
    
        if (severity !== enDELStatus.success) {
          _logger.error(description.title + ((description.message) ? description.message : ""));
        }
      }
    
      return oStatusId;
    };*/
    /** @TODO XXE
     * Handle Success Status: dispatch action to update Status slice
     * @param storeApi - any: Store
     * @param uri - string: request uri
     * @param description - Status description: Title and message
     * @param action - PayloadAction<any>
     * @param requesterId - string: Requester id
     */
    /*const _handleSuccessStatus = (storeApi: any, uri: string, description: StatusDescription, action: PayloadAction<any>, requesterId?: string): void => {
    
      if (storeApi && uri && description && description.title) {
    
        const status: DELActionStatus = {
          id: Utils.UUIDv4(),
          uri: uri,
          requesterId: requesterId,
          severity: enDELStatus.success,
          description: {
            title: description.title,
            message: description?.message
          },
          context: action,
          timeStamp: Date.now()
        };
        storeApi.dispatch({ type: STATUS_SENDSTATUS_ACTION, payload: status });
      }
    };*/
    /**
     * Handle Error Status: dispatch action to update Status slice
     * @param storeApi - any: Store
     * @param uri - string: Requests's URI
     * @param description - DELStatusDescription: Title and message
     * @param action - PayloadAction: Related action
     * @param severity - enDELStatus: Severity
     * @param requesterId - string: Requester id (optional)
     */
    const _handleErrorStatus = (storeApi, uri, description, action, severity = DELSliceType_1.enDELStatus.critical, requesterId) => {
        let consoleErrorMsg = nls.unknownError;
        if (storeApi && uri && description && description.title) {
            consoleErrorMsg = description.title;
            if (description.message)
                consoleErrorMsg += " - " + description.message;
            /* @TODO XXE
            const statusError: DELActionStatus = {
              id: Utils.UUIDv4(),
              uri: uri,
              requesterId: requesterId,
              severity: severity,
              description: {
                title: description.title,
                message: description.message
              },
              context: action,
              timeStamp: Date.now()
            };
            storeApi.dispatch({ type: STATUS_SENDSTATUS_ACTION, payload: statusError });*/
        }
        _logger.error(consoleErrorMsg);
    };
    /**
     * Create End Point (no connection)
     * @param endPointCreationInfo
     * @param storeApi
     * @returns
     */
    const _createEndPoint = (action, storeApi) => {
        if (!_pxpBackendCom || !storeApi || !action || !action.payload || !storeApi.getState())
            return _handleErrorStatus(storeApi, DELSliceType_1.PXPBACKEND, { title: nls.endPoint_CreationError_StatusTitle, message: nls.unknownError }, action);
        const endPointType = action.payload.type;
        const storeState = storeApi.getState();
        const endPointSliceState = storeState[endPointType.toString()];
        if (!endPointSliceState || !endPointSliceState.endPoint)
            return _handleErrorStatus(storeApi, DELSliceType_1.PXPBACKEND, { title: nls.endPoint_CreationError_StatusTitle, message: nls.endPoint_CreationError_Incorrect }, action);
        // Loading: START - launch loader
        // @TODO XXE const idStartLoadingStatus: string = _handleStartLoadingStatus(storeApi, PXPBACKEND, nls.endPoint_Creation_StatusTitle, action, PXPBACKEND); // getNlsEndPointType
        _pxpBackendCom
            .createEndPoint(endPointSliceState, endPointSliceState.endPoint.options)
            .then((endPointClient) => {
            if (endPointClient) {
                // Loading: STOP - Successful Status
                //_handleStopLoadingStatus(storeApi, PXPBACKEND, { title: nls.endPoint_CreationSuccess_StatusTitle }, enDELStatus.success, idStartLoadingStatus, action, PXPBACKEND);
                // End Point is created: updated its attribute
                const endPointOptions = { connectTimeout: endPointClient.connectTimeout };
                storeApi.dispatch({ type: (0, DELEndPointSliceFactory_1.buildEndPointActionName)(DELPXPBackendCommunicationType_1.enDELPXPEndPointAction.creationStatus, endPointType), payload: endPointOptions });
            }
        })
            .catch((error) => {
            // Loading: STOP - Log Error Status
            //_handleStopLoadingStatus(storeApi, PXPBACKEND, { title: nls.endPoint_CreationError_StatusTitle, message: _getErrorMessage(error) }, enDELStatus.critical, idStartLoadingStatus, action, PXPBACKEND);
            _logger.error(nls.endPoint_CreationError_StatusTitle + _getErrorMessage(error));
        });
    };
    /**
     * Handle End Point connection
     * @param {DELPXPEndPoint} End Point
     * @param {any} storeApi
     */
    const _connectEndPoint = (action, storeApi) => {
        if (!_pxpBackendCom || !storeApi || !action || !action.payload || !storeApi.getState())
            return _handleErrorStatus(storeApi, DELSliceType_1.PXPBACKEND, { title: nls.endPoint_ConnectionError_StatusTitle, message: nls.unknownError }, action);
        const endPoint = action.payload;
        if (endPoint && endPoint.hasOwnProperty("uri") && endPoint.uri != "" && endPoint.type) {
            // Loading: START - launch loader
            // @TODO XXE const idStartLoadingStatus: string = _handleStartLoadingStatus(storeApi, PXPBACKEND, nls.endPoint_Connection_StatusTitle, action, PXPBACKEND);
            _pxpBackendCom
                .connectEndPoint(endPoint)
                .then(() => {
                // Dispatch to update connected status of End Point is done in onConnectionChange callback: see backendConnectorMiddleware / setDispatchCB
                // Loading: STOP - Successful Status
                //_handleStopLoadingStatus(storeApi, PXPBACKEND, { title: nls.endPoint_ConnectionSuccess_StatusTitle }, enDELStatus.success, idStartLoadingStatus, action, PXPBACKEND);
            })
                .catch((error) => {
                // Loading: STOP - Log Error Status
                //_handleStopLoadingStatus(storeApi, PXPBACKEND, { title: nls.endPoint_ConnectionError_StatusTitle, message: _getErrorMessage(error) }, enDELStatus.critical, idStartLoadingStatus, action, PXPBACKEND);
                _logger.error(nls.endPoint_ConnectionError_StatusTitle + _getErrorMessage(error));
            });
        }
        else {
            // Error Status
            _handleErrorStatus(storeApi, DELSliceType_1.PXPBACKEND, { title: nls.endPoint_ConnectionError_StatusTitle, message: nls.endPoint_ConnectionError_MissingInfo }, action);
        }
    };
    /**
     * Handle End Point disconnection action
     * @param {enDELPXPEndPointType} End Point
     * @param {any} storeApi
     */
    const _disconnect = (action, storeApi) => {
        const endPointType = action.payload;
        if (endPointType && _pxpBackendCom && storeApi) {
            _pxpBackendCom.disconnect(endPointType); // No Promise
            // @TODO XXE _handleSuccessStatus(storeApi, PXPBACKEND, { title: nls.endPoint_DisconnectionSuccess_StatusTitle }, action);
        }
        else {
            // Log Error Status
            _handleErrorStatus(storeApi, DELSliceType_1.PXPBACKEND, { title: nls.endPoint_DisconnectionError_StatusTitle, message: nls.endPoint_DisconnectionError_MissingInfo }, action);
        }
    };
    /**
     * Handle launch command action
     * @param pxpCommand
     * @param storeApi
     */
    const _launchCommand = (action, storeApi) => {
        const pxpCommand = action.payload;
        if (pxpCommand && pxpCommand.name && pxpCommand.name !== "" && pxpCommand.type && pxpCommand.uri && pxpCommand.uri !== "" && _pxpBackendCom && storeApi) {
            // Loading: START - launch loader
            // @TODO XXE const idLoadingStatus: string = _handleStartLoadingStatus(storeApi, PXPBACKEND, pxpCommand.name + " " + nls.endPoint_Command_StatusTitle, action, PXPBACKEND);
            _pxpBackendCom
                .launchCmd(pxpCommand)
                .then(() => {
                // Loading: STOP - Successful Status
                //_handleStopLoadingStatus(storeApi, PXPBACKEND, { title: pxpCommand.name + " " + nls.endPoint_CommandSuccess_StatusTitle }, enDELStatus.success, idLoadingStatus, action, PXPBACKEND);
            })
                .catch((error) => {
                // Loading: STOP - Log Error Status
                //_handleStopLoadingStatus(storeApi, PXPBACKEND, { title: nls.endPoint_CommandError_StatusTitle, message: _getErrorMessage(error) }, enDELStatus.critical, idLoadingStatus, action, PXPBACKEND);
                _logger.error(nls.endPoint_CommandError_StatusTitle + _getErrorMessage(error));
            });
        }
        else {
            // Error Status
            _handleErrorStatus(storeApi, DELSliceType_1.PXPBACKEND, { title: pxpCommand.name + " " + nls.endPoint_CommandError_StatusTitle, message: nls.endPoint_CommandError_MissingInfo }, action);
        }
    };
    /**
     * Handles End Point actions: creation, connection, disconnection, command...
     * @param action
     * @param storeApi
     * @returns
     */
    var _handleEndPointAction = (action, storeApi) => {
        if (!_pxpBackendCom || !action || !action.payload || !action.type || !storeApi)
            return _handleErrorStatus(storeApi, DELSliceType_1.PXPBACKEND, { title: nls.unknownError }, action);
        if (action.type === DELPXPBackendCommunicationType_1.enDELPXPEndPointAction.creation && !_pxpBackendCom.isEndPointCreated(action.payload)) {
            _createEndPoint(action, storeApi);
        }
        else if (action.type === DELPXPBackendCommunicationType_1.enDELPXPEndPointAction.connect && action.payload.type && _pxpBackendCom.isEndPointCreated(action.payload.type) && !_pxpBackendCom.isEndPointConnected(action.payload.type)) {
            _connectEndPoint(action, storeApi);
        }
        else {
            /* @TODO XXE if (_pxpBackendCom.isEndPointConnected(action.payload)) {*/
            switch (action.type) {
                case DELPXPBackendCommunicationType_1.enDELPXPEndPointAction.disconnect:
                    _disconnect(action, storeApi);
                    break;
                case DELPXPBackendCommunicationType_1.enDELPXPEndPointAction.launchCommand:
                    _launchCommand(action, storeApi);
                    break;
                case DELPXPBackendCommunicationType_1.enDELPXPEndPointAction.unsubscribe:
                    _pxpBackendCom.unsubscribeStateSubSignal(action.payload);
                    break;
                default:
                    break;
            }
        }
    };
    /**
     * Handle Successful CRUD Request: send successful status
     * @param storeApi
     * @param uri
     * @param requesterId
     * @param idLoadingStatus
     * @param requestDescription
     * @param parameters
     */
    var _handleSuccessfulCRUDReq = (storeApi, uri, typeAction, responsePayload, requesterId, idLoadingStatus, requestDescription, action) => {
        // Update Store
        storeApi.dispatch({ type: typeAction || "", payload: responsePayload });
        /* @TODO XXE
        if (uri && idLoadingStatus !== "") {
      
          // Loading: STOP - Successful Status
          _handleStopLoadingStatus(storeApi, uri, { title: requestDescription, message: nls.requestSuccessful }, enDELStatus.success, idLoadingStatus, action, requesterId);
      
        } else {
      
          _handleSuccessStatus(storeApi, uri, { title: requestDescription, message: nls.requestSuccessful }, action, requesterId);
        }*/
    };
    /**
     * Handle Error CRUD Request
     * @param storeApi - Redux store
     * @param uri - string: Slice URI
     * @param error - Error|string: Error or error message
     * @param idLoadingStatus - string: Start loading status
     * @param requestDescription - string: Description
     * @param action - PayloadAction: related action
     * @param requesterId - string: requester di (optional)
     */
    var _handleErrorCrudReq = (storeApi, uri, error, idLoadingStatus, requestDescription, action, requesterId) => {
        /* @TODO XXE
        if (uri && idLoadingStatus !== "") {
      
          // Loading: STOP - Log Error Status
          //_handleStopLoadingStatus(storeApi, uri, { title: requestDescription, message: _getErrorMessage(error) }, enDELStatus.error, idLoadingStatus, action, requesterId);
          _logger.error(nls.requestDescription + _getErrorMessage(error));
      
        } else {*/
        // Error Status
        _handleErrorStatus(storeApi, uri, { title: requestDescription, message: _getErrorMessage(error) }, action, DELSliceType_1.enDELStatus.error, requesterId);
        //}
    };
    /**
     * Send CRUD request to PXP Backend
     * @param {any} store
     */
    const _sendCRUDReqToBackend = (action, storeApi) => {
        var _a;
        if (!_pxpBackendCom || !action || !action.payload || !action.payload.objectsType || !action.type || !storeApi) {
            return _handleErrorStatus(storeApi, nls.unknown, { title: nls.unknownError }, action);
        }
        const storeState = storeApi.getState();
        if (!storeState) {
            return _handleErrorStatus(storeApi, nls.unknown, { title: nls.unknownError }, action);
        }
        const requestInfo = (0, DELCorpusSliceFactory_1.getInfoFromAction)(action);
        if (!requestInfo || !requestInfo.crudAction || !requestInfo.uri || requestInfo.uri === "" || !storeState[requestInfo.uri]) {
            return _handleErrorStatus(storeApi, nls.unknown, { title: nls.unknownError }, action);
        }
        const typeAction = (0, DELCorpusSliceFactory_1.buildCorpusRespName)(requestInfo.crudAction, requestInfo.uri);
        const endPointType = storeState[requestInfo.uri].endPointType;
        if (_pxpBackendCom.isEndPointConnected(endPointType)) {
            // Loading: START - launch loader
            const requestDescription = requestInfo.crudAction + nls.requestOn + action.payload.objectsType;
            let idLoadingStatus = ""; // @TODO XXE  _handleStartLoadingStatus(storeApi, requestInfo.uri, requestDescription, action, action.payload?.requesterId);
            switch (requestInfo.crudAction) {
                //-----------------------------
                // CREATE
                //-----------------------------
                case DELPXPBackendCommunicationType_1.enDELPXPCRUDAction.create:
                    _pxpBackendCom
                        .sendCreateRequest(endPointType, action.type, action.payload)
                        .then((responsePayload) => {
                        var _a;
                        _handleSuccessfulCRUDReq(storeApi, requestInfo.uri, typeAction, responsePayload, (_a = action.payload) === null || _a === void 0 ? void 0 : _a.requesterId, idLoadingStatus, requestDescription, action);
                    })
                        .catch((error) => {
                        var _a;
                        _handleErrorCrudReq(storeApi, requestInfo.uri, error, idLoadingStatus, requestDescription, action, (_a = action.payload) === null || _a === void 0 ? void 0 : _a.requesterId);
                    });
                    break;
                //-----------------------------
                // READ
                //-----------------------------
                case DELPXPBackendCommunicationType_1.enDELPXPCRUDAction.read:
                    _pxpBackendCom
                        .sendReadRequest(endPointType, action.type, action.payload)
                        .then((responsePayload) => {
                        var _a;
                        _handleSuccessfulCRUDReq(storeApi, requestInfo.uri, typeAction, responsePayload, (_a = action.payload) === null || _a === void 0 ? void 0 : _a.requesterId, idLoadingStatus, requestDescription, action);
                    })
                        .catch((error) => {
                        var _a;
                        _handleErrorCrudReq(storeApi, requestInfo.uri, error, idLoadingStatus, requestDescription, action, (_a = action.payload) === null || _a === void 0 ? void 0 : _a.requesterId);
                    });
                    break;
                //-----------------------------
                // DELETE
                //-----------------------------
                case DELPXPBackendCommunicationType_1.enDELPXPCRUDAction.delete:
                    if (!action.payload.objectsToDelete || !Array.isArray(action.payload.objectsToDelete)) {
                        return _handleErrorStatus(storeApi, nls.unknown, { title: nls.requestError_IncorrectArg + nls.delete }, action);
                    }
                    _pxpBackendCom
                        .sendDeleteRequest(endPointType, action.type, action.payload)
                        .then(() => {
                        var _a;
                        _handleSuccessfulCRUDReq(storeApi, requestInfo.uri, typeAction, { objects: action.payload.objectsToDelete }, (_a = action.payload) === null || _a === void 0 ? void 0 : _a.requesterId, idLoadingStatus, requestDescription, action);
                    })
                        .catch((error) => {
                        var _a;
                        _handleErrorCrudReq(storeApi, requestInfo.uri, error, idLoadingStatus, requestDescription, action, (_a = action.payload) === null || _a === void 0 ? void 0 : _a.requesterId);
                    });
                    break;
                //-----------------------------
                // QUERY
                //-----------------------------
                case DELPXPBackendCommunicationType_1.enDELPXPCRUDAction.query:
                    // TODO
                    _pxpBackendCom
                        .sendQueryRequest(endPointType, action.type, action.payload)
                        .then((responsePayload) => {
                        var _a;
                        _handleSuccessfulCRUDReq(storeApi, requestInfo.uri, typeAction, responsePayload, (_a = action.payload) === null || _a === void 0 ? void 0 : _a.requesterId, idLoadingStatus, requestDescription, action);
                    })
                        .catch((error) => {
                        var _a;
                        _handleErrorCrudReq(storeApi, requestInfo.uri, error, idLoadingStatus, requestDescription, action, (_a = action.payload) === null || _a === void 0 ? void 0 : _a.requesterId);
                    });
                    break;
                //-----------------------------
                // UPDATE
                //-----------------------------
                case DELPXPBackendCommunicationType_1.enDELPXPCRUDAction.update:
                    if (!action.payload.objectsToCreateUpdate || !Array.isArray(action.payload.objectsToCreateUpdate) || action.payload.objectsToCreateUpdate.length === 0 || !action.payload.objectsType) {
                        return _handleErrorStatus(storeApi, nls.unknown, { title: nls.requestError_IncorrectArg + nls.update }, action);
                    }
                    _pxpBackendCom
                        .sendUpdateRequest(endPointType, action.type, action.payload)
                        .then(() => {
                        var _a;
                        _handleSuccessfulCRUDReq(storeApi, requestInfo.uri, typeAction, { objectsType: action.payload.objectsType, objects: action.payload.objectsToCreateUpdate }, (_a = action.payload) === null || _a === void 0 ? void 0 : _a.requesterId, idLoadingStatus, requestDescription, action);
                    })
                        .catch((error) => {
                        var _a;
                        _handleErrorCrudReq(storeApi, requestInfo.uri, error, idLoadingStatus, requestDescription, action, (_a = action.payload) === null || _a === void 0 ? void 0 : _a.requesterId);
                    });
                    break;
                default:
                    break;
            }
        }
        else {
            _handleErrorStatus(storeApi, requestInfo.uri, { title: nls.endPoint_NotConnected_Error }, action, DELSliceType_1.enDELStatus.error, (_a = action.payload) === null || _a === void 0 ? void 0 : _a.requesterId);
        }
    };
    /**
     * Send request to PXP Backend
     * @param {any} store
     */
    const _sendReqToBackend = (action, storeApi) => {
        var _a;
        if (!_pxpBackendCom || !action || !action.payload || (!action.type && !storeApi))
            return _handleErrorStatus(storeApi, nls.unknownError, { title: nls.unknownError }, action);
        const requestInfo = (0, DELCorpusSliceFactory_1.getInfoFromAction)(action);
        if (!requestInfo || !requestInfo.action || requestInfo.action === "" || !requestInfo.uri || requestInfo.uri === "") {
            return _handleErrorStatus(storeApi, (requestInfo === null || requestInfo === void 0 ? void 0 : requestInfo.uri) || nls.unknownError, { title: nls.unknownError }, action);
        }
        const storeState = storeApi.getState();
        if (!storeState || !storeState[requestInfo.uri])
            return _handleErrorStatus(storeApi, requestInfo.uri, { title: nls.unknownError }, action);
        const endPointType = storeState[requestInfo.uri].endPointType;
        if (_pxpBackendCom.isEndPointConnected(endPointType)) {
            switch (requestInfo.action) {
                case DELPXPBackendCommunicationType_1.UNSUBSCRIBE_UPDATE:
                    _pxpBackendCom
                        .sendUnsubscribeUpdateRequest(endPointType, action.type, action.payload)
                        .then((responsePayload) => {
                        if (!responsePayload || !responsePayload.content || responsePayload.content !== DELPXPBackendCommunicationType_1.BACKEND_RESP_OK)
                            _handleErrorStatus(storeApi, requestInfo.uri, { title: nls.responseError_Text }, action);
                    })
                        .catch((error) => {
                        _handleErrorStatus(storeApi, requestInfo.uri, { title: _getErrorMessage(error) }, action);
                    });
                    break;
                default:
                    break;
            }
        }
        else {
            _handleErrorStatus(storeApi, requestInfo.uri, { title: nls.endPoint_NotConnected_Error }, action, DELSliceType_1.enDELStatus.error, (_a = action.payload) === null || _a === void 0 ? void 0 : _a.requesterId);
        }
    };
    //----------------------------------------------------------------------------------------------
    // PXP Middleware
    //----------------------------------------------------------------------------------------------
    const _pxpBackendCom = new DELPXPBackendCommunication_1.DELPXPBackendCommunication();
    var _logger = Logger.getLogger("PXP.MIDDLEWARE");
    const backendConnectorMiddleware = (storeApi) => (next) => (action) => {
        if (!storeApi || !storeApi.dispatch || !action || typeof action.type === undefined || typeof action.payload === undefined || !_pxpBackendCom) {
            return next(action);
        }
        if (!_pxpBackendCom.isDispatchCBSet()) {
            _pxpBackendCom.setDispatchCB((action) => {
                if (!action)
                    return;
                // End Point action
                if ((action.type === DELPXPBackendCommunicationType_1.enDELPXPEndPointAction.connect || action.type === DELPXPBackendCommunicationType_1.enDELPXPEndPointAction.disconnect) && action.payload) {
                    // Update End Point connected status
                    storeApi.dispatch({ type: (0, DELEndPointSliceFactory_1.buildEndPointActionName)(DELPXPBackendCommunicationType_1.enDELPXPEndPointAction.connectionStatus, action.payload), payload: action.type === DELPXPBackendCommunicationType_1.enDELPXPEndPointAction.connect });
                    // End Point is diconnected
                    if (action.type === DELPXPBackendCommunicationType_1.enDELPXPEndPointAction.disconnect) {
                        _logger.error(nls.endPoint_Disconnection);
                    }
                }
                else if ((0, DELCorpusSliceFactory_1.isCRUDResponse)(action) || action.type === DELSliceType_1.STATUS_SENDSTATUS_ACTION) {
                    // CRUD Response or Status action
                    storeApi.dispatch({ type: action.type, payload: action.payload });
                }
            });
        }
        // Handles End Point actions
        if ((0, DELEndPointSliceFactory_1.isEndPointAction)(action)) {
            _handleEndPointAction(action, storeApi);
        }
        else if ((0, DELCorpusSliceFactory_1.isCRUDAction)(action)) {
            // Handles CRUD actions
            _sendCRUDReqToBackend(action, storeApi);
        }
        else if ((0, DELCorpusSliceFactory_1.isBackendAction)(action)) {
            // Handles Backend actions
            _sendReqToBackend(action, storeApi);
        }
        return next(action);
    };
    exports.default = backendConnectorMiddleware;
});
