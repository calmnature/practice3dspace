/// <amd-module name='DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerStore'/>
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerStore", ["require", "exports", "DS/ReactRedux/Toolkit", "DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerMiddleware", "DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerPlatformCtxSlice", "DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerProcessSlice", "DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerItemSlice", "DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerResourcesSlice", "DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerDrawingSlice", "DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerNotifSlice", "DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerDroppedObjTypeSlice", "DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerLoadingSlice"], function (require, exports, Toolkit_1, DELWebProcessStructViewerMiddleware_1, DELWebProcessStructViewerPlatformCtxSlice_1, DELWebProcessStructViewerProcessSlice_1, DELWebProcessStructViewerItemSlice_1, DELWebProcessStructViewerResourcesSlice_1, DELWebProcessStructViewerDrawingSlice_1, DELWebProcessStructViewerNotifSlice_1, DELWebProcessStructViewerDroppedObjTypeSlice_1, DELWebProcessStructViewerLoadingSlice_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    DELWebProcessStructViewerPlatformCtxSlice_1 = __importDefault(DELWebProcessStructViewerPlatformCtxSlice_1);
    DELWebProcessStructViewerProcessSlice_1 = __importDefault(DELWebProcessStructViewerProcessSlice_1);
    DELWebProcessStructViewerItemSlice_1 = __importDefault(DELWebProcessStructViewerItemSlice_1);
    DELWebProcessStructViewerResourcesSlice_1 = __importDefault(DELWebProcessStructViewerResourcesSlice_1);
    DELWebProcessStructViewerDrawingSlice_1 = __importDefault(DELWebProcessStructViewerDrawingSlice_1);
    DELWebProcessStructViewerNotifSlice_1 = __importDefault(DELWebProcessStructViewerNotifSlice_1);
    DELWebProcessStructViewerDroppedObjTypeSlice_1 = __importDefault(DELWebProcessStructViewerDroppedObjTypeSlice_1);
    DELWebProcessStructViewerLoadingSlice_1 = __importDefault(DELWebProcessStructViewerLoadingSlice_1);
    // Combined the slices into appReducer
    const appReducer = (0, Toolkit_1.combineReducers)({
        platformCtx: DELWebProcessStructViewerPlatformCtxSlice_1.default,
        processData: DELWebProcessStructViewerProcessSlice_1.default,
        itemData: DELWebProcessStructViewerItemSlice_1.default,
        resourceData: DELWebProcessStructViewerResourcesSlice_1.default,
        drawingData: DELWebProcessStructViewerDrawingSlice_1.default,
        notification: DELWebProcessStructViewerNotifSlice_1.default,
        droppedObjectType: DELWebProcessStructViewerDroppedObjTypeSlice_1.default,
        loading: DELWebProcessStructViewerLoadingSlice_1.default,
    });
    // Created the rootReducer to reset state on RESET_STORE action
    const rootReducer = (state, action) => {
        if (action.type === "RESET_STORE") {
            return appReducer({
                platformCtx: state.platformCtx, // keep platformCtx unchanged
                // reset others explicitly to empty/initial values:
                processData: { expandResponse: [] },
                itemData: { itemResponse: [] },
                resourceData: { resourceResponse: [] },
                drawingData: { drawingResponse: [] },
                notification: { title: "", message: "", level: "success" },
                droppedObjectType: { type: null },
                loading: state.loading,
            }, action);
        }
        return appReducer(state, action);
    };
    // Step 3: Use rootReducer in configureStore
    const store = (0, Toolkit_1.configureStore)({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(DELWebProcessStructViewerMiddleware_1.apiMiddleware),
    });
    exports.default = store;
});
