/// <amd-module name='DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerDrawingSlice'/>
define("DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerDrawingSlice", ["require", "exports", "DS/ReactRedux/Toolkit"], function (require, exports, Toolkit_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fetchAPIDrawing = void 0;
    const initialState = {
        drawingResponse: [],
    };
    const lightViewerSlice = (0, Toolkit_1.createSlice)({
        name: "drawingData",
        initialState,
        reducers: {
            /**
             * Handles a successful API fetch by updating the drawingResponse array state.
             *
             * @param {object} state - The current state of the slice.
             * @param {PayloadAction<{ id: string; data: DrawingsItem[] }>} action - The action object containing the payload.
             */
            fetchAPIDrawing(state, action) {
                state.drawingResponse = action.payload.data;
            },
        },
    });
    exports.fetchAPIDrawing = lightViewerSlice.actions.fetchAPIDrawing;
    exports.default = lightViewerSlice.reducer;
});
