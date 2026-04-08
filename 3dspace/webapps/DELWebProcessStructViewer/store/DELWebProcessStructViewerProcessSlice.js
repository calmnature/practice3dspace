/// <amd-module name='DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerProcessSlice'/>
define("DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerProcessSlice", ["require", "exports", "DS/ReactRedux/Toolkit"], function (require, exports, Toolkit_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fetchAPIProcess = void 0;
    const initialState = {
        expandResponse: [],
    };
    const lightViewerSlice = (0, Toolkit_1.createSlice)({
        name: "processData",
        initialState,
        reducers: {
            /**
             * Handles a request by updating the expandResponse array state.
             *
             * @param {object} state - The current state of the slice.
             * @param {PayloadAction<{ id: string; data: ProcessExpand[] }>} action - The action object containing the payload.
             */
            fetchAPIProcess(state, action) {
                let array = state.expandResponse;
                const existingMap = new Map(array.map((obj) => [obj.id, obj]));
                // Replace or add efficiently
                action.payload.data.forEach((newObj) => {
                    if (existingMap.has(newObj.id)) {
                        const index = array.findIndex((obj) => obj.id === newObj.id);
                        if (index !== -1)
                            array[index] = newObj;
                    }
                    else {
                        array.push(newObj);
                    }
                });
                state.expandResponse = array;
            },
        },
    });
    exports.fetchAPIProcess = lightViewerSlice.actions.fetchAPIProcess;
    exports.default = lightViewerSlice.reducer;
});
