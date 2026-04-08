/// <amd-module name='DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerNotifSlice'/>
define("DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerNotifSlice", ["require", "exports", "DS/ReactRedux/Toolkit"], function (require, exports, Toolkit_1) {
    "use strict";
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.clearNotifications = exports.addNotification = void 0;
    const initState = {
        title: "",
        message: "",
        level: "success",
    };
    const lightViewerNotifSlice = (0, Toolkit_1.createSlice)({
        name: "error",
        initialState: initState,
        reducers: {
            addNotification: (state, action) => {
                var _a;
                state.title = "";
                state.message = "";
                if (action && action.payload && action.payload.title && action.payload.title !== "") {
                    state.title = action.payload.title;
                    state.message = (_a = action.payload) === null || _a === void 0 ? void 0 : _a.message;
                    state.level = action.payload.level;
                }
            },
            clearNotifications: () => initState,
        },
    });
    _a = lightViewerNotifSlice.actions, exports.addNotification = _a.addNotification, exports.clearNotifications = _a.clearNotifications;
    exports.default = lightViewerNotifSlice.reducer;
});
