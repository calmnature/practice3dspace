/// <amd-module name='DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerMiddleware'/>
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerMiddleware", ["require", "exports", "DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerPlatformCtxSlice", "DS/DELWebProcessStructViewer/services/DELWebProcessStructViewerPlatformServices", "DS/DELWebProcessStructViewer/services/DELWebProcessStructViewerRequestService", "DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerProcessSlice", "DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerItemSlice", "DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerResourcesSlice", "../services/DELWebProcessStructViewerUtils", "DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerDrawingSlice", "DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerNotifSlice", "i18n!DS/DELWebProcessStructViewer/assets/nls/DELWebProcessStructViewerReqServices", "DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerLoadingSlice"], function (require, exports, DELWebProcessStructViewerPlatformCtxSlice_1, DELWebProcessStructViewerPlatformServices_1, DELWebProcessStructViewerRequestService_1, DELWebProcessStructViewerProcessSlice_1, DELWebProcessStructViewerItemSlice_1, DELWebProcessStructViewerResourcesSlice_1, DELWebProcessStructViewerUtils_1, DELWebProcessStructViewerDrawingSlice_1, DELWebProcessStructViewerNotifSlice_1, nls, DELWebProcessStructViewerLoadingSlice_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.apiMiddleware = exports.FETCH = void 0;
    DELWebProcessStructViewerPlatformServices_1 = __importDefault(DELWebProcessStructViewerPlatformServices_1);
    DELWebProcessStructViewerRequestService_1 = __importDefault(DELWebProcessStructViewerRequestService_1);
    exports.FETCH = "FETCH";
    /**
     * Fetch all information needed to build preferences
     */
    const _getPlatformCtxData = async (store) => {
        const platformServices = new DELWebProcessStructViewerPlatformServices_1.default();
        if (!store || !platformServices)
            return;
        //------------------------------------------
        // !! TMP only for Dev context from HOME !!
        //------------------------------------------
        await platformServices.initStandaloneMode();
        // Retrieve Application information
        platformServices.getApplicationInfo().then((appInfo) => {
            if (appInfo) {
                store.dispatch((0, DELWebProcessStructViewerPlatformCtxSlice_1.actionGetAppInfo)(appInfo));
            }
            else {
                /*TO DO error notification / dispatch on error slice*/
            }
        });
        // Retrieve Platform information
        platformServices.getPlatformInfo().then((arrPlatformInfo) => {
            if (arrPlatformInfo) {
                store.dispatch((0, DELWebProcessStructViewerPlatformCtxSlice_1.actionGetPlatformInfo)(arrPlatformInfo));
            }
            if (arrPlatformInfo && arrPlatformInfo.length === 1) {
                const urlSpace = platformServices.get3DSpaceURL(arrPlatformInfo[0]);
                const platformid = platformServices.getPlatformId();
                if (urlSpace !== "" && platformid !== "") {
                    store.dispatch((0, DELWebProcessStructViewerPlatformCtxSlice_1.actionGetUrlSpace)(urlSpace));
                    // Retrieve Security Context information
                    platformServices.getSecurityContextInfo(urlSpace, platformid).then(async (collabSpace) => {
                        if (collabSpace) {
                            store.dispatch((0, DELWebProcessStructViewerPlatformCtxSlice_1.actionGetSecurityCtxInfo)(collabSpace));
                            DELWebProcessStructViewerRequestService_1.default.setPlatformInfo(urlSpace, platformServices.getSecurityContext(collabSpace));
                        }
                        else {
                            store.dispatch((0, DELWebProcessStructViewerNotifSlice_1.addNotification)({ title: nls.Error_SecurityContext, level: "error" }));
                        }
                    });
                }
                else {
                    store.dispatch((0, DELWebProcessStructViewerNotifSlice_1.addNotification)({ title: nls.Error_SecurityContext, level: "error" }));
                }
            }
            else {
                store.dispatch((0, DELWebProcessStructViewerNotifSlice_1.addNotification)({ title: nls.Error_SecurityContext, level: "error" }));
            }
        });
    };
    const apiMiddleware = (store) => (next) => (action) => {
        const API = DELWebProcessStructViewerRequestService_1.default.getInstance();
        if (!API) {
            store.dispatch((0, DELWebProcessStructViewerNotifSlice_1.addNotification)({ title: nls.Error_Expand, level: "error" }));
            return;
        }
        switch (action.type) {
            case exports.FETCH: // fetch an expand information of object
                // start
                store.dispatch((0, DELWebProcessStructViewerLoadingSlice_1.fetchStart)());
                API.progressiveExpand(action.payload.physicalId, action.payload.type, DELWebProcessStructViewerUtils_1.itemTypes.includes(action.payload.type)
                    ? DELWebProcessStructViewerUtils_1.MainTYPE_TAGS.ITEM
                    : DELWebProcessStructViewerUtils_1.serviceItemTypes.includes(action.payload.type)
                        ? DELWebProcessStructViewerUtils_1.MainTYPE_TAGS.SBOMITEM
                        : DELWebProcessStructViewerUtils_1.serviceProcessTypes.includes(action.payload.type)
                            ? DELWebProcessStructViewerUtils_1.MainTYPE_TAGS.SBOMPROCESS
                            : DELWebProcessStructViewerUtils_1.MainTYPE_TAGS.PROCESS, action.payload.physical_id_paths, (data) => {
                    // Dispatch a successful action to store the fetched data in the state based on Response Type
                    if (data.expandResponse && data.expandResponse.length > 0) {
                        store.dispatch((0, DELWebProcessStructViewerProcessSlice_1.fetchAPIProcess)({ id: action.payload.physicalId, data: data.expandResponse }));
                    }
                    if (data.resourceResponse && data.resourceResponse.length > 0) {
                        store.dispatch((0, DELWebProcessStructViewerResourcesSlice_1.fetchAPIResources)({ id: action.payload.physicalId, data: data.resourceResponse }));
                    }
                    if (data.itemResponse && data.itemResponse.length > 0) {
                        store.dispatch((0, DELWebProcessStructViewerItemSlice_1.fetchAPIItem)({ id: action.payload.physicalId, data: data.itemResponse }));
                    }
                    if (data.drawings && data.drawings.length > 0) {
                        store.dispatch((0, DELWebProcessStructViewerDrawingSlice_1.fetchAPIDrawing)({ id: action.payload.physicalId, data: data.drawings }));
                    }
                    if (data.errors && data.errors.length > 0) {
                        const allMessages = data.errors.map((err) => err[0]);
                        const messages = Array.from(new Set(allMessages));
                        if (messages.length === 1) {
                            store.dispatch((0, DELWebProcessStructViewerNotifSlice_1.addNotification)({ title: messages[0], level: "error" }));
                        }
                        else {
                            const combined = messages.join(" and ");
                            store.dispatch((0, DELWebProcessStructViewerNotifSlice_1.addNotification)({ title: combined, level: "error" }));
                        }
                    }
                    store.dispatch((0, DELWebProcessStructViewerLoadingSlice_1.fetchSuccess)());
                }, (error) => {
                    store.dispatch((0, DELWebProcessStructViewerNotifSlice_1.addNotification)({ title: error, level: "error" }));
                });
                break;
            case DELWebProcessStructViewerPlatformCtxSlice_1.FETCH_PLATFORMCTX: // platform context info
                // Check if action or store is missing
                if (!action || !store) {
                    // Dispatch error notification if action or store is missing
                    store.dispatch((0, DELWebProcessStructViewerNotifSlice_1.addNotification)({ title: nls.Errro_PlatformInfo, level: "error" }));
                    return;
                }
                _getPlatformCtxData(store);
                break;
            default:
                break;
        }
        next(action);
    };
    exports.apiMiddleware = apiMiddleware;
});
