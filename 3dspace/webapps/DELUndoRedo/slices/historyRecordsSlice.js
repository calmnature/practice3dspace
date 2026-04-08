/// <amd-module name="DS/DELUndoRedo/slices/historyRecordsSlice"/>
define("DS/DELUndoRedo/slices/historyRecordsSlice", ["require", "exports", "DS/ReactRedux/Toolkit"], function (require, exports, Toolkit) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.selectCanRedo = exports.selectCanUndo = void 0;
    const initialState = {
        canUndo: false,
        canRedo: false,
        isRegisteringAction: false,
        isUndoingAction: false,
        isRedoingAction: false
    };
    const sliceName = 'historyRecordsState';
    const historyRecordsSlice = Toolkit.createSlice({
        name: sliceName,
        initialState: initialState,
        reducers: {
            updateCanUndo: (state, action) => {
                state.canUndo = action.payload.canUndoFlag;
                return state;
            },
            updateCanRedo: (state, action) => {
                state.canRedo = action.payload.canRedoFlag;
                return state;
            }
        }
    });
    const selectCanUndo = (state) => state.historyRecordsState.canUndo;
    exports.selectCanUndo = selectCanUndo;
    const selectCanRedo = (state) => state.historyRecordsState.canRedo;
    exports.selectCanRedo = selectCanRedo;
    exports.default = historyRecordsSlice;
});
