/// <amd-module name='DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerPlatformCtxSlice'/>
define("DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerPlatformCtxSlice", ["require", "exports", "DS/ReactRedux/Toolkit"], function (require, exports, Toolkit_1) {
    "use strict";
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.actionGetUrlSpace = exports.actionGetSecurityCtxInfo = exports.actionGetPlatformInfo = exports.actionGetAppInfo = exports.FETCH_URLSPACE = exports.FETCH_SECURITYCTX_INFO = exports.FETCH_PLATFORM_INFO = exports.FETCH_APP_INFO = exports.FETCH_PLATFORMCTX = exports.PLATFORMCTX_SLICE = void 0;
    const _buildActionName = (iType) => {
        return exports.PLATFORMCTX_SLICE + "/" + iType;
    };
    exports.PLATFORMCTX_SLICE = "platformCtx";
    exports.FETCH_PLATFORMCTX = "fetchPlatformCtx";
    exports.FETCH_APP_INFO = "fetchAppInfo";
    exports.FETCH_PLATFORM_INFO = "fetchPlatformInfo";
    exports.FETCH_SECURITYCTX_INFO = "fetchSecurityCtxInfo";
    exports.FETCH_URLSPACE = "urlSpace";
    exports.actionGetAppInfo = (0, Toolkit_1.createAction)(_buildActionName(exports.FETCH_APP_INFO));
    exports.actionGetPlatformInfo = (0, Toolkit_1.createAction)(_buildActionName(exports.FETCH_PLATFORM_INFO));
    exports.actionGetSecurityCtxInfo = (0, Toolkit_1.createAction)(_buildActionName(exports.FETCH_SECURITYCTX_INFO));
    exports.actionGetUrlSpace = (0, Toolkit_1.createAction)(_buildActionName(exports.FETCH_URLSPACE));
    let appId = "", platformId = "", currentLang = "";
    if (typeof widget !== "undefined" && typeof widget.getValue !== "undefined") {
        appId = widget.getValue("x3dAppId") ? widget.getValue("x3dAppId") : widget.getValue("appId");
        platformId = widget.getValue("x3dPlatformId") || "OnPremise";
        currentLang = widget.lang || "";
    }
    const initialStateSlice = {
        appId: appId,
        appInfo: undefined,
        arrPlatformInfo: undefined,
        urlSpace: "",
        userCollabSpace: undefined,
        defaultCollabSpace: "",
    };
    const platformCtxSlice = (0, Toolkit_1.createSlice)({
        name: "platformCtx",
        initialState: initialStateSlice,
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(exports.actionGetAppInfo, (state, action) => {
                if (action && action.payload && state) {
                    state.appInfo = action.payload;
                }
            });
            builder.addCase(exports.actionGetPlatformInfo, (state, action) => {
                if (action && action.payload && state) {
                    state.arrPlatformInfo = action.payload;
                }
            });
            builder.addCase(exports.actionGetSecurityCtxInfo, (state, action) => {
                if (action && action.payload && state) {
                    state.userCollabSpace = action.payload;
                    if (state.userCollabSpace) {
                        state.defaultCollabSpace =
                            state.userCollabSpace.preferredcredentials.role.name +
                                "." +
                                state.userCollabSpace.preferredcredentials.organization.name +
                                "." +
                                state.userCollabSpace.preferredcredentials.collabspace.name;
                    }
                }
            });
            builder.addCase(exports.actionGetUrlSpace, (state, action) => {
                if (action && action.payload && state) {
                    state.urlSpace = action.payload;
                }
            });
        },
    });
    _a = platformCtxSlice.actions;
    exports.default = platformCtxSlice.reducer;
});
