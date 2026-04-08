/// <amd-module name="DS/DELInfraWeb/store/slices/DELKeyValueSliceFactory"/>
define("DS/DELInfraWeb/store/slices/DELKeyValueSliceFactory", ["require", "exports", "DS/ReactRedux/Toolkit", "i18n!DS/DELInfraWeb/assets/nls/DELKeyValueSlice", "DS/DELPXPFoundations/PXPUtils"], function (require, exports, Toolkit_1, nls, Utils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createKeyValueSlice = exports.buildKeyValueActionName = exports.enDELPXPKeyValueType = exports.enDELPXPKeyValueAction = void 0;
    var enDELPXPKeyValueAction;
    (function (enDELPXPKeyValueAction) {
        enDELPXPKeyValueAction["addArrayItem"] = "addArrayItem";
        enDELPXPKeyValueAction["removeArrayItem"] = "removeArrayItem";
        enDELPXPKeyValueAction["set"] = "set";
        enDELPXPKeyValueAction["updateArrayItem"] = "updateArrayItem";
    })(enDELPXPKeyValueAction || (exports.enDELPXPKeyValueAction = enDELPXPKeyValueAction = {}));
    var enDELPXPKeyValueType;
    (function (enDELPXPKeyValueType) {
        enDELPXPKeyValueType["booleanType"] = "boolean";
        enDELPXPKeyValueType["numberType"] = "number";
        enDELPXPKeyValueType["objectType"] = "object";
        enDELPXPKeyValueType["stringType"] = "string";
        enDELPXPKeyValueType["arrayType"] = "array";
    })(enDELPXPKeyValueType || (exports.enDELPXPKeyValueType = enDELPXPKeyValueType = {}));
    const buildKeyValueActionName = (key, actionType = enDELPXPKeyValueAction.set) => {
        let oActionName = "";
        if (!key || key === "")
            return oActionName;
        return "/" + actionType + "/" + key;
    };
    exports.buildKeyValueActionName = buildKeyValueActionName;
    const _checkAction = (actionValue, state, key) => {
        let oResult = "";
        if (actionValue === undefined || Utils.isEmpty(key) || state[key] === undefined)
            return nls.errorAction;
        if ((state[key].type === enDELPXPKeyValueType.arrayType && actionValue === undefined) ||
            (state[key].type === enDELPXPKeyValueType.numberType && !(typeof actionValue === "number")) ||
            (state[key].type === enDELPXPKeyValueType.objectType && !(typeof actionValue === "object")) ||
            (state[key].type === enDELPXPKeyValueType.stringType && !(typeof actionValue === "string")) ||
            (state[key].type === enDELPXPKeyValueType.booleanType && !(typeof actionValue === "boolean")))
            return nls.errorAction;
        return oResult;
    };
    const _checkSearchItemAction = (iteamSearch, state, key) => {
        let oResult = "";
        if (Utils.isEmpty(iteamSearch) || Utils.isEmpty(key) || Utils.isEmpty(state) || !state[key] ||
            !Array.isArray(state[key].value) || state[key].type !== enDELPXPKeyValueType.arrayType ||
            ((iteamSearch.index === undefined || iteamSearch.index === null) && Utils.isEmpty(iteamSearch.searchCriteria)) ||
            (iteamSearch.searchCriteria && (Utils.isEmpty(iteamSearch.searchCriteria.compareProperty) || Utils.isEmpty(iteamSearch.searchCriteria.compareValue))) ||
            (iteamSearch.index && (iteamSearch.index < 0 || iteamSearch.index > state[key].value.length)))
            return nls.errorArrayAction;
        return oResult;
    };
    const _buildArrayActionErrorMsg = (errorMsg, arrIndexError) => {
        let oErrorMsg = "";
        if (Utils.isEmpty(errorMsg) || Utils.isEmpty(arrIndexError))
            return oErrorMsg;
        oErrorMsg = errorMsg;
        arrIndexError.forEach((itemIndex, index) => {
            oErrorMsg += itemIndex;
            if (index !== (arrIndexError.length - 1)) {
                oErrorMsg += ", ";
            }
        });
        return oErrorMsg;
    };
    const _updateRemoveAction = (arrAction, state, key, bRemoveFlag = true) => {
        let oErrorMsg = "";
        if (Utils.isEmpty(arrAction) || Utils.isEmpty(key) || Utils.isEmpty(state) || !state[key] ||
            !Array.isArray(state[key].value) || state[key].type !== enDELPXPKeyValueType.arrayType)
            return nls.errorAction;
        let errorMsg = "", nbIndexOffset = 0;
        let arrIndexError = [];
        arrAction.forEach((searchItemRemove, index) => {
            const errorMsgItem = _checkSearchItemAction(searchItemRemove, state, key);
            if (errorMsgItem !== "") {
                if (Utils.isEmpty(errorMsg)) {
                    errorMsg = errorMsgItem;
                }
                arrIndexError.push(index);
            }
            else {
                let bCompareFlag = false;
                if (searchItemRemove.searchCriteria &&
                    searchItemRemove.searchCriteria.compareProperty !== undefined &&
                    searchItemRemove.searchCriteria.compareProperty !== "" &&
                    searchItemRemove.searchCriteria.compareValue !== undefined) {
                    bCompareFlag = true;
                }
                let bIndexFlag = false;
                if (!bCompareFlag && searchItemRemove.index !== undefined && searchItemRemove.index >= 0 && searchItemRemove.index < state[key].value.length) {
                    bIndexFlag = true;
                }
                if (bIndexFlag || bCompareFlag) {
                    if (bIndexFlag && searchItemRemove.index !== undefined) {
                        if (bRemoveFlag) {
                            state[key].value.splice(searchItemRemove.index - nbIndexOffset, 1);
                            nbIndexOffset++;
                        }
                        else if (!bRemoveFlag && searchItemRemove.updatedValue !== undefined) {
                            state[key].value[searchItemRemove.index] = searchItemRemove.updatedValue;
                        }
                    }
                    else {
                        let indexItem = -1;
                        let itemFound = state[key].value.find((item, index) => {
                            if (typeof item !== "object" || !searchItemRemove.searchCriteria || !item.hasOwnProperty(searchItemRemove.searchCriteria.compareProperty))
                                return false;
                            const bFound = item[searchItemRemove.searchCriteria.compareProperty] === searchItemRemove.searchCriteria.compareValue;
                            if (bFound) {
                                indexItem = index;
                            }
                            return bFound;
                        });
                        if (itemFound && indexItem > -1 && indexItem < state[key].value.length) {
                            if (bRemoveFlag) {
                                state[key].value.splice(indexItem, 1);
                            }
                            else if (!bRemoveFlag && searchItemRemove.updatedValue !== undefined) {
                                state[key].value[indexItem] = searchItemRemove.updatedValue;
                            }
                        }
                    }
                }
                else {
                    if (Utils.isEmpty(errorMsg)) {
                        errorMsg = errorMsgItem;
                    }
                    arrIndexError.push(index);
                }
            }
        });
        oErrorMsg = _buildArrayActionErrorMsg(errorMsg, arrIndexError);
        return oErrorMsg;
    };
    /**
     *
     * @param cfgSlice
     * @returns
     */
    const createKeyValueSlice = function (cfgSlice) {
        const { uri, concepts } = cfgSlice;
        // Check slice configuration
        let initialStateSlice = {};
        Object.keys(concepts).forEach((key) => {
            if (!key || key === "")
                return;
            let keyValueObj = concepts[key];
            if (!keyValueObj || !keyValueObj.type || typeof keyValueObj.value === undefined)
                return;
            initialStateSlice[key] = keyValueObj;
        });
        const pxpSlice = (0, Toolkit_1.createSlice)({
            name: uri,
            initialState: initialStateSlice,
            reducers: {},
            extraReducers: (builder) => {
                Object.keys(initialStateSlice).forEach((key) => {
                    if (!key || key === "")
                        return;
                    const objKeyValue = initialStateSlice[key];
                    if (!objKeyValue)
                        return;
                    // Action: SET
                    builder.addCase((0, exports.buildKeyValueActionName)(key), (state, action) => {
                        const errorMsg = _checkAction(action.payload, state, key);
                        if (errorMsg === "" && state[key] && typeof state[key].value !== undefined) {
                            state[key].value = action.payload;
                        }
                    });
                    if (Array.isArray(objKeyValue.value)) {
                        // Action on array: ADD
                        builder.addCase((0, exports.buildKeyValueActionName)(key, enDELPXPKeyValueAction.addArrayItem), (state, action) => {
                            if (Utils.isEmpty(action) || Utils.isEmpty(action.payload) || Utils.isEmpty(action.type))
                                return;
                            action.payload.forEach((actionValue) => {
                                const errorMsg = _checkAction(actionValue, state, key);
                                if (errorMsg === "" && state[key].value && Array.isArray(state[key].value)) {
                                    state[key].value.push(actionValue);
                                }
                            });
                        });
                        // Action on array: REMOVE
                        builder.addCase((0, exports.buildKeyValueActionName)(key, enDELPXPKeyValueAction.removeArrayItem), (state, action) => {
                            if (Utils.isEmpty(action) || Utils.isEmpty(action.payload) || Utils.isEmpty(action.type))
                                return;
                            const errorMsg = _updateRemoveAction(action.payload, state, key);
                        });
                        // Action on array of objects: UPDATE
                        builder.addCase((0, exports.buildKeyValueActionName)(key, enDELPXPKeyValueAction.updateArrayItem), (state, action) => {
                            if (Utils.isEmpty(action) || Utils.isEmpty(action.payload) || Utils.isEmpty(action.type))
                                return;
                            const errorMsg = _updateRemoveAction(action.payload, state, key, false);
                        });
                    }
                });
            }
        });
        // Create actions and selectors
        let conceptsSlice = {};
        const selectSlice = (state) => state[uri];
        Object.keys(initialStateSlice).forEach((key) => {
            const objKeyValue = initialStateSlice[key];
            if (!objKeyValue)
                return;
            if (objKeyValue.value !== undefined && key !== "") {
                const actionsItem = {
                    set: (0, Toolkit_1.createAction)((0, exports.buildKeyValueActionName)(key))
                };
                const selectors = {
                    selectValue: (0, Toolkit_1.createSelector)([selectSlice], (slice) => (slice[key]) ? slice[key].value : undefined)
                };
                if (Array.isArray(objKeyValue.value)) {
                    actionsItem.addArrayItem = (0, Toolkit_1.createAction)((0, exports.buildKeyValueActionName)(key, enDELPXPKeyValueAction.addArrayItem));
                    actionsItem.removeArrayItem = (0, Toolkit_1.createAction)((0, exports.buildKeyValueActionName)(key, enDELPXPKeyValueAction.removeArrayItem));
                    actionsItem.updateArrayItem = (0, Toolkit_1.createAction)((0, exports.buildKeyValueActionName)(key, enDELPXPKeyValueAction.updateArrayItem));
                }
                conceptsSlice[key] = {
                    actions: actionsItem,
                    selectors: selectors
                };
            }
        });
        return {
            conceptsKeyValue: conceptsSlice,
            reducers: pxpSlice.reducer
        };
    };
    exports.createKeyValueSlice = createKeyValueSlice;
});
