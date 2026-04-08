/// <amd-module name="DS/DELUndoRedo/utils/StatePatchesUtils"/>
define("DS/DELUndoRedo/utils/StatePatchesUtils", ["require", "exports", "DS/React18Loader/FastDeepEqual"], function (require, exports, equal) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.applyChangeToObject = exports.applyInverseChangeToObject = exports.applyDiff = exports.applyInverseDiff = exports.getStateDiff = void 0;
    /**
     * method to get the diff patches between two state instances (old,new)
     * @param {unknown} oldState old instance
     * @param {unknown} newState new instance
     * @param {string} eltPath the path for recursivity
     * @returns {diffType[]}
     */
    const getStateDiff = (oldState, newState, eltPath = "") => {
        let diffPatches = [];
        if (typeof oldState === typeof newState) {
            if (Array.isArray(oldState) && Array.isArray(newState)) {
                if (oldState.length === newState.length) { // Update
                    newState.filter((item, index) => !equal(item, oldState[index])).forEach((item) => diffPatches.push({ cudAction: "Update", changes: item, inverseChanges: oldState[newState.indexOf(item)], eltPath: eltPath ? eltPath + `/${[newState.indexOf(item)]}` : `${[newState.indexOf(item)]}` }));
                }
                else {
                    const oldSet = new Set(oldState);
                    const newSet = new Set(newState);
                    newState.filter(item => !oldSet.has(item)).forEach((item) => diffPatches.push({ cudAction: "Create", changes: item, inverseChanges: {}, eltPath: eltPath ? eltPath + `/${[-1]}` : `${[-1]}` }));
                    oldState.filter(item => !newSet.has(item)).forEach((item) => diffPatches.push({ cudAction: "Delete", changes: item, inverseChanges: {}, eltPath: eltPath ? eltPath + `/${[-1]}` : `${[-1]}` }));
                }
            }
            else if ((Array.isArray(oldState) && !Array.isArray(newState)) || (!Array.isArray(oldState) && Array.isArray(newState))) {
                diffPatches.push({ cudAction: "Update", changes: newState, inverseChanges: oldState, eltPath: eltPath });
            }
            else if (oldState instanceof Object && newState instanceof Object) {
                for (const key in { ...oldState, ...newState }) {
                    const oldValue = oldState[key];
                    const newValue = newState[key];
                    const nestedPath = eltPath ? eltPath + `/${[key]}` : `${[key]}`;
                    if (!equal(oldValue, newValue)) {
                        if (oldValue instanceof Object || newValue instanceof Object)
                            diffPatches = [...diffPatches, ...(0, exports.getStateDiff)(oldValue, newValue, nestedPath)];
                        else if (oldValue && newValue)
                            diffPatches.push({ cudAction: "Update", changes: structuredClone(newValue), inverseChanges: structuredClone(oldValue), eltPath: nestedPath });
                        else if (oldValue && !newValue)
                            diffPatches.push({ cudAction: "Delete", changes: structuredClone(oldValue), inverseChanges: {}, eltPath: nestedPath });
                        else if (!oldValue && newValue)
                            diffPatches.push({ cudAction: "Create", changes: structuredClone(newValue), inverseChanges: {}, eltPath: nestedPath });
                    }
                }
            }
            else {
                diffPatches.push({ cudAction: "Update", changes: newState, inverseChanges: oldState, eltPath: eltPath });
            }
        }
        else {
            diffPatches.push({ cudAction: "Update", changes: newState, inverseChanges: oldState, eltPath: eltPath });
        }
        return diffPatches;
    };
    exports.getStateDiff = getStateDiff;
    /**
     * method to apply the inverse diff patches to a state instance
     * @param {unknown} oldState the state instance
     * @param {diffType[]} diffList  the list of patches
     * @returns the new instance of the state
     */
    const applyInverseDiff = (state, diffList) => {
        diffList.forEach((diff) => {
            const { eltPath } = diff;
            const path = eltPath.split("/");
            if (path.length > 1) {
                state = Object.assign({}, state); // avoid the issues of read-only object
                path.reduce((neO, i, level) => {
                    if (level === path.length - 2) {
                        neO[i] = (0, exports.applyInverseChangeToObject)(neO[i], diff, path);
                        return neO[i];
                    }
                    return neO[i];
                }, state);
            }
            else {
                state = (0, exports.applyInverseChangeToObject)(state, diff, path);
            }
        });
        return state;
    };
    exports.applyInverseDiff = applyInverseDiff;
    /**
     * method to apply the diff patches to a state instance
     * @param {unknown} oldState the state instance
     * @param {diffType[]} diffList  the list of patches
     * @returns the new instance of the state
     */
    const applyDiff = (state, diffList) => {
        diffList.forEach((diff) => {
            const { eltPath } = diff;
            const path = eltPath.split("/");
            if (path.length > 1) {
                state = Object.assign({}, state); // avoid the issues of read-only object
                path.reduce((neO, i, level) => {
                    if (level === path.length - 2) {
                        neO[i] = (0, exports.applyChangeToObject)(neO[i], diff, path);
                        return neO[i];
                    }
                    return neO[i];
                }, state);
            }
            else {
                state = (0, exports.applyChangeToObject)(state, diff, path);
            }
        });
        return state;
    };
    exports.applyDiff = applyDiff;
    const applyInverseChangeToObject = (obj, diff, path) => {
        const { cudAction, changes, inverseChanges } = diff;
        const id = path[path.length - 1];
        switch (cudAction) {
            case "Create":
                if (Array.isArray(obj)) {
                    obj = obj.filter((elt, index) => {
                        return !equal(elt, changes); //&& ((elt instanceof Object && changes instanceof Object && "id" in elt && "id" in changes && elt.id !== changes.id))
                    });
                }
                else {
                    if (typeof id === "string")
                        delete obj[id];
                }
                break;
            case "Delete":
                if (Array.isArray(obj)) {
                    obj = [...obj, changes];
                }
                else {
                    if (typeof id === "string")
                        obj[id] = changes;
                }
                break;
            case "Update":
                if (Array.isArray(obj)) {
                    obj = [...obj];
                    obj[Number(id)] = inverseChanges;
                }
                else if (obj instanceof Object) {
                    obj = Object.assign({}, obj);
                    if (typeof id === "string") {
                        obj[id] = inverseChanges;
                    }
                }
                else {
                    obj = inverseChanges;
                }
                break;
            default:
                break;
        }
        return obj;
    };
    exports.applyInverseChangeToObject = applyInverseChangeToObject;
    const applyChangeToObject = (obj, diff, path) => {
        const { cudAction, changes } = diff;
        const id = path[path.length - 1];
        switch (cudAction) {
            case "Create":
                if (Array.isArray(obj)) {
                    obj = [...obj, changes];
                }
                else {
                    if (typeof id === "string")
                        obj[id] = changes;
                }
                break;
            case "Delete":
                if (Array.isArray(obj)) {
                    obj = obj.filter((elt, index) => {
                        return !equal(elt, changes); // && (elt instanceof Object && changes instanceof Object && "id" in elt && "id" in changes && elt.id !== changes.id);
                    });
                }
                else {
                    if (typeof id === "string")
                        delete obj[id];
                }
                break;
            case "Update":
                if (Array.isArray(obj)) {
                    obj = [...obj];
                    obj[Number(id)] = changes;
                }
                else if (obj instanceof Object) {
                    obj = Object.assign({}, obj);
                    if (typeof id === "string")
                        obj[id] = changes;
                }
                else {
                    obj = changes;
                }
                break;
            default:
                break;
        }
        return obj;
    };
    exports.applyChangeToObject = applyChangeToObject;
});
