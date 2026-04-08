/// <amd-module name='DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerDroppedObjTypeSlice'/>
define("DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerDroppedObjTypeSlice", ["require", "exports", "DS/ReactRedux/Toolkit"], function (require, exports, Toolkit_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.setDroppedObjectType = void 0;
    const initialState = {
        type: null,
    };
    const droppedObjectTypeSlice = (0, Toolkit_1.createSlice)({
        name: "droppedObjectType",
        initialState,
        reducers: {
            setDroppedObjectType: (state, action) => {
                state.type = action.payload;
            },
        },
    });
    exports.setDroppedObjectType = droppedObjectTypeSlice.actions.setDroppedObjectType;
    exports.default = droppedObjectTypeSlice.reducer;
});
