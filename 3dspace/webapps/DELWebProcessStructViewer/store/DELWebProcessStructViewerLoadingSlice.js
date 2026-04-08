/// <amd-module name='DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerLoadingSlice'/>
define("DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerLoadingSlice", ["require", "exports", "DS/ReactRedux/Toolkit", "../services/DELWebProcessStructViewerUtils"], function (require, exports, Toolkit_1, DELWebProcessStructViewerUtils_1) {
    "use strict";
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.setAtRest = exports.fetchFailure = exports.fetchSuccess = exports.fetchStart = void 0;
    const initialState = {
        //   loading: false,
        loading: DELWebProcessStructViewerUtils_1.LoadingStatus.Idle,
        error: null,
    };
    const loadingSlice = (0, Toolkit_1.createSlice)({
        name: "loading",
        initialState,
        reducers: {
            fetchStart: (state) => {
                state.loading = DELWebProcessStructViewerUtils_1.LoadingStatus.Loading;
                state.error = null;
            },
            fetchSuccess: (state) => {
                state.loading = DELWebProcessStructViewerUtils_1.LoadingStatus.LoadingDone;
            },
            fetchFailure: (state, action) => {
                state.loading = DELWebProcessStructViewerUtils_1.LoadingStatus.LoadingDone;
                state.error = action.payload;
            },
            setAtRest: (state) => {
                state.loading = DELWebProcessStructViewerUtils_1.LoadingStatus.Idle;
            },
        },
    });
    _a = loadingSlice.actions, exports.fetchStart = _a.fetchStart, exports.fetchSuccess = _a.fetchSuccess, exports.fetchFailure = _a.fetchFailure, exports.setAtRest = _a.setAtRest;
    exports.default = loadingSlice.reducer;
});
