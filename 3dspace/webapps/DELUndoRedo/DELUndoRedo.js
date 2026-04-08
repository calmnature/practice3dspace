/// <amd-module name="DS/DELUndoRedo/DELUndoRedo"/>
define("DS/DELUndoRedo/DELUndoRedo", ["require", "exports", "DS/DELUndoRedo/utils/ActionsHistory", "DS/DELUndoRedo/utils/StatePatchesUtils"], function (require, exports, ActionsHistory_1, StatePatchesUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.undoRedoMiddleware = exports.clearHistory = exports.commitTransaction = exports.abortTransaction = exports.beginTransaction = exports.getReversibleActionsMap = exports.getActionsHistory = exports.transactionalDispatch = exports.irreversibleDispatch = exports.undoableReducers = exports.abortTransactionAction = exports.redoStore = exports.undoStore = void 0;
    // global variables
    const filteredActions = ['undoAction',
        'redoAction',
        'UNDOSTATE', 'REDOSTATE',
        'UNDO_STORE', 'REDO_STORE',
        'updateCanUndo', 'updateCanRedo',
        'START_TRANSACTION', 'ABORT_TRANSACTION', 'END_TRANSACTION'];
    const defaultHistoryConfig = {
        maxSize: 30
    };
    const undoableSlicesNames = [];
    const reversibleActionsMap = new Map();
    // aid classes
    let actionsHistory;
    let dispatch;
    // exposed actions creators
    const undoStore = () => ({ type: 'UNDO_STORE' });
    exports.undoStore = undoStore;
    const redoStore = () => ({ type: 'REDO_STORE' });
    exports.redoStore = redoStore;
    const abortTransactionAction = (payload) => ({ type: 'ABORT_TRANSACTION', payload: payload });
    exports.abortTransactionAction = abortTransactionAction;
    // internal actions creators
    const saveUndoHistory = (payload) => ({ type: 'historyRecordsState/updateCanUndo', payload: { canUndoFlag: payload } });
    const saveRedoHistory = (payload) => ({ type: 'historyRecordsState/updateCanRedo', payload: { canRedoFlag: payload } });
    const undoState = (targetName, payload) => ({ type: targetName + '/UNDOSTATE', payload: payload });
    const redoState = (targetName, payload) => ({ type: targetName + '/REDOSTATE', payload: payload });
    /**
     * add undo/redo actions to the slice actions and register unod/redo callbacks
     * @param {Slice} slice
     * @param {reversibleActionsType} sliceReversibleActionsMap
     * @returns enhanced slice reducers containing undo/redo actions
     */
    const undoableReducers = (slice, sliceReversibleActionsMap = new Map()) => {
        undoableSlicesNames.push(slice.name);
        reversibleActionsMap.set(slice.name, sliceReversibleActionsMap);
        const originalReducer = slice.reducer;
        const enhancedReducers = (state, action) => {
            if (action.type === (slice.name + "/UNDOSTATE")) {
                state = (0, StatePatchesUtils_1.applyInverseDiff)(state, action.payload);
                return state;
            }
            else if (action.type === (slice.name + "/REDOSTATE")) {
                state = (0, StatePatchesUtils_1.applyDiff)(state, action.payload);
                return state;
            }
            else {
                const newState = originalReducer(state, action);
                return newState;
            }
        };
        return enhancedReducers;
    };
    exports.undoableReducers = undoableReducers;
    /**
     * special dispatch method ignored by the middleware
     * @param dispatch
     */
    const irreversibleDispatch = (dispatch) => (action) => {
        if (typeof action === "function") {
            return action((asyncAction) => {
                const ignoredAction = { ...asyncAction, ignore: true };
                return dispatch(ignoredAction);
            });
        }
        if (typeof action === "object") {
            const ignoredAction = { ...action, ignore: true };
            return dispatch(ignoredAction);
        }
    };
    exports.irreversibleDispatch = irreversibleDispatch;
    /**
     * special dispatch method for transactional actions (dispatched with a transaction id)
     * @param dispatch
     */
    const transactionalDispatch = (dispatch) => (action, transactionId) => {
        if (typeof action === "function") {
            return action((asyncAction) => {
                const transactionalAction = { ...asyncAction, transactionId: transactionId };
                return dispatch(transactionalAction);
            });
        }
        if (typeof action === "object") {
            const transactionalAction = { ...action, transactionId: transactionId };
            return dispatch(transactionalAction);
        }
    };
    exports.transactionalDispatch = transactionalDispatch;
    // actions history method
    const getActionsHistory = () => {
        return actionsHistory;
    };
    exports.getActionsHistory = getActionsHistory;
    const getReversibleActionsMap = () => {
        return reversibleActionsMap;
    };
    exports.getReversibleActionsMap = getReversibleActionsMap;
    const beginTransaction = () => {
        return actionsHistory.beginTransaction();
    };
    exports.beginTransaction = beginTransaction;
    const abortTransaction = (transactionId) => {
        dispatch((0, exports.abortTransactionAction)(transactionId));
    };
    exports.abortTransaction = abortTransaction;
    const commitTransaction = (transactionId) => {
        actionsHistory.commitTransaction(transactionId);
    };
    exports.commitTransaction = commitTransaction;
    const clearHistory = () => {
        actionsHistory.clearHistory();
    };
    exports.clearHistory = clearHistory;
    /**
     * middleware to integrate undo-redo features
     * @param {historyConfigOptions} historyConfig configuration parameters for the history
     */
    const undoRedoMiddleware = (historyConfig = defaultHistoryConfig) => {
        actionsHistory = new ActionsHistory_1.ActionsHistory(historyConfig.maxSize);
        return (storeApi) => (next) => async (action) => {
            var _a;
            if (!dispatch)
                dispatch = storeApi.dispatch;
            if (action.type === "UNDO_STORE") {
                const currentRecordList = actionsHistory.undoAction();
                currentRecordList === null || currentRecordList === void 0 ? void 0 : currentRecordList.forEach((currentRecord, index) => {
                    var _a;
                    const { dispatchedAction, actionSource, actionChanges } = currentRecord;
                    const reversibleActionsMapElt = (_a = reversibleActionsMap.get(actionSource)) === null || _a === void 0 ? void 0 : _a.get(dispatchedAction);
                    if (reversibleActionsMapElt && reversibleActionsMapElt.onUndoActionCallback) {
                        reversibleActionsMapElt.onUndoActionCallback(actionChanges, (0, exports.irreversibleDispatch)(dispatch));
                    }
                    else {
                        dispatch(undoState(actionSource, actionChanges)); //undo
                    }
                });
                dispatch(saveUndoHistory(actionsHistory.canUndo()));
                dispatch(saveRedoHistory(actionsHistory.canRedo()));
                return;
            }
            if (action.type === "REDO_STORE") {
                const currentRecordList = actionsHistory.redoAction();
                currentRecordList === null || currentRecordList === void 0 ? void 0 : currentRecordList.forEach((currentRecord) => {
                    var _a;
                    const { dispatchedAction, actionSource, actionChanges } = currentRecord;
                    const reversibleActionsMapElt = (_a = reversibleActionsMap.get(actionSource)) === null || _a === void 0 ? void 0 : _a.get(dispatchedAction);
                    if (reversibleActionsMapElt && reversibleActionsMapElt.onRedoActionCallback) {
                        reversibleActionsMapElt.onRedoActionCallback(actionChanges, (0, exports.irreversibleDispatch)(dispatch));
                    }
                    else {
                        dispatch(redoState(actionSource, actionChanges)); //redo
                    }
                });
                dispatch(saveUndoHistory(actionsHistory.canUndo()));
                dispatch(saveRedoHistory(actionsHistory.canRedo()));
                return;
            }
            if (action.type === "ABORT_TRANSACTION") {
                const transactionId = "payload" in action ? action["payload"] : null;
                if (!transactionId)
                    return;
                const abortedTransaction = actionsHistory.abortTransaction(transactionId);
                abortedTransaction === null || abortedTransaction === void 0 ? void 0 : abortedTransaction.forEach((currentRecord) => {
                    var _a;
                    const { dispatchedAction, actionSource, actionChanges } = currentRecord;
                    const reversibleActionsMapElt = (_a = reversibleActionsMap.get(actionSource)) === null || _a === void 0 ? void 0 : _a.get(dispatchedAction);
                    if (reversibleActionsMapElt && reversibleActionsMapElt.onUndoActionCallback) {
                        reversibleActionsMapElt.onUndoActionCallback(actionChanges, (0, exports.irreversibleDispatch)(dispatch));
                    }
                    else {
                        dispatch(undoState(actionSource, actionChanges)); //undo
                    }
                });
                dispatch(saveUndoHistory(actionsHistory.canUndo()));
                dispatch(saveRedoHistory(actionsHistory.canRedo()));
                return;
            }
            const [sliceName, type, status] = (_a = action.type) === null || _a === void 0 ? void 0 : _a.split("/");
            const shouldSaveGuard = !action.hasOwnProperty("ignore") && undoableSlicesNames.includes(sliceName) && !filteredActions.includes(type) && (typeof status === "undefined" || (typeof status !== "undefined" && status === "fulfilled"));
            if (shouldSaveGuard) {
                const oldstoreState = storeApi.getState()[sliceName];
                if (typeof oldstoreState === "undefined") { // throw an error
                    console.error("Error: The slice name is not equal to the corresponding state name:", sliceName);
                    return next(action);
                }
                next(action);
                const newstoreState = storeApi.getState()[sliceName];
                const diff = (0, StatePatchesUtils_1.getStateDiff)(oldstoreState, newstoreState);
                if (diff.length > 0) {
                    if ("transactionId" in action)
                        actionsHistory.saveAction({ dispatchedAction: type, actionSource: sliceName, actionChanges: diff, transactionId: action["transactionId"] });
                    else
                        actionsHistory.saveAction({ dispatchedAction: type, actionSource: sliceName, actionChanges: diff });
                    dispatch(saveUndoHistory(true));
                    dispatch(saveRedoHistory(false));
                }
                return;
            }
            return next(action);
        };
    };
    exports.undoRedoMiddleware = undoRedoMiddleware;
});
