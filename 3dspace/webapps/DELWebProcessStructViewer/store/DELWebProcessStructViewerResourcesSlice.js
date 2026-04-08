/// <amd-module name='DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerResourcesSlice'/>
define("DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerResourcesSlice", ["require", "exports", "DS/ReactRedux/Toolkit"], function (require, exports, Toolkit_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fetchAPIResources = void 0;
    const initialState = {
        resourceResponse: [],
    };
    const lightViewerSlice = (0, Toolkit_1.createSlice)({
        name: "resourceData",
        initialState,
        reducers: {
            /**
             * Handles a successful API fetch by updating the resourceResponse array state.
             *
             * @param {object} state - The current state of the slice.
             * @param {PayloadAction<{ id: string; data: ResourceItems[] }>} action - The action object containing the payload.
             */
            fetchAPIResources(state, action) {
                state.resourceResponse = [...action.payload.data];
            },
        },
    });
    exports.fetchAPIResources = lightViewerSlice.actions.fetchAPIResources;
    exports.default = lightViewerSlice.reducer;
});
