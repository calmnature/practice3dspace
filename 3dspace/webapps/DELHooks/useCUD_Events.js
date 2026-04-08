/// <amd-module name="DS/DELHooks/useCUD_Events"/>
define("DS/DELHooks/useCUD_Events", ["require", "exports", "DS/React18Loader/React", "DS/DELHooks/usePrevious"], function (require, exports, React_1, usePrevious_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Compares the current state with the old state then extract modifications
     * @param { T } arrFirst New state of objects
     * @param { string } name Name or type corresponding to arrFirst
     * @returns { CUD_Events | void }
     * @see {@link https://delpxpdocs.dsone.3ds.com/webinfra/componentTools/reactComponentTools/useCUD_Events}
     */
    const useCUD_Events = (arrFirst, name) => {
        const cud_events = (0, React_1.useRef)({
            [name]: {
                updated: [],
                created: [],
                deleted: []
            }
        });
        if (arrFirst === null || typeof arrFirst === "undefined")
            return cud_events.current;
        /**
         * return CUD type
         * @param { number } arrFirstLength New state of array length
         * @param { number } arrSecondLength State - 1 of array length
         * @returns { GetCUD } update | create | delete
         */
        const getCUD = (arrFirstLength, arrSecondLength) => {
            let type = '';
            if (arrFirstLength === arrSecondLength) {
                type = 'update';
            }
            else if (arrFirstLength > arrSecondLength) {
                type = 'create';
            }
            else if (arrFirstLength < arrSecondLength) {
                type = 'delete';
            }
            return type;
        };
        /**
         * Return created operations
         * @param { Array<object> } arrFirst
         * @param { Array<object> } arrSecond
         * @returns { DirtyNodes }
         */
        const setCreatedNodes = (arrFirst, arrSecond) => {
            let difference = [];
            if (Object.keys(arrSecond).length > 0) {
                //difference = Object.entries(arrFirst).filter((value: any) => Object.entries(arrSecond).indexOf(value[1]) === -1).map((value: any) => value[1]);
                difference = Object.entries(arrFirst).filter((value) => !(value[0] in arrSecond)).map((value) => value[1]);
            }
            else {
                difference = Object.entries(arrFirst).map((value) => value[1]);
            }
            return { value: difference, isDirty: "created" };
        };
        /**
         * Return deleted object id
         * @param { Array<object> } arrFirst
         * @param { Array<object> } arrSecond
         * @returns { DirtyNodes }
         */
        const setDeletedNodes = (arrFirst, arrSecond) => {
            const difference = Object.values(arrSecond).filter((object1) => !Object.values(arrFirst).some((object2) => object1.id === object2.id)).map((value) => value.id);
            return { value: difference, isDirty: "deleted" };
        };
        /**
         * Check if two arrays are deeply equal
         * @param { Array<object> } arrFirst
         * @param { Array<object> } arrSecond
         * @returns { boolean }
         */
        const deepEqual = (arrFirst, arrSecond) => {
            const ok = Object.keys, tx = typeof arrFirst, ty = typeof arrSecond;
            return arrFirst && arrSecond && tx === 'object' && tx === ty ? (ok(arrFirst).length === ok(arrSecond).length &&
                ok(arrFirst).every((key) => deepEqual(arrFirst[key], arrSecond[key]))) : (arrFirst === arrSecond);
        };
        /**
         * Return updated object
         * @param { Array<object> } arrFirst
         * @param { Array<object> } arrSecond
         * @returns { DirtyNodes }
         */
        const setUpdatedNodes = (arrFirst, arrSecond) => {
            const value = Object.entries(arrFirst).map((value, index) => {
                if (Array.isArray(value[1]) && typeof arrSecond[index] === 'object') {
                    return compareArrays(value, arrSecond[index]);
                }
                else {
                    //@ts-ignore
                    if (!deepEqual(value[1], arrSecond[value[0]])) {
                        return value[1];
                    }
                }
            }).filter(value => typeof value !== 'undefined');
            return { value: value, isDirty: "updated" };
        };
        /**
         * Compares the current state with the old state
         * @param arrFirst New state of serializedOperations
         * @param arrSecond State - 1 of serializedOperations
         * @returns
         */
        const compareArrays = (arrFirst, arrSecond) => {
            if (arrSecond === null || typeof arrSecond === "undefined")
                return { value: arrFirst, isDirty: '' };
            let getCUDType = '';
            if (arrSecond) {
                getCUDType = getCUD(Object.keys(arrFirst).length, Object.keys(arrSecond).length);
            }
            else {
                getCUDType = "create";
            }
            switch (getCUDType) {
                case 'update':
                    var { value, isDirty } = setUpdatedNodes(arrFirst, arrSecond);
                    break;
                case 'delete':
                    var { value, isDirty } = setDeletedNodes(arrFirst, arrSecond);
                    break;
                case 'create':
                    var { value, isDirty } = setCreatedNodes(arrFirst, arrSecond);
                    break;
                default:
                    return;
            }
            if (value === undefined && value['length'] === 0 && isDirty === "")
                return;
            return { value: value, isDirty: isDirty };
        };
        // Keep in memory last state
        const previousArr = (0, usePrevious_1.default)(arrFirst);
        let { isDirty, value } = (0, React_1.useMemo)(() => compareArrays(arrFirst, previousArr), [arrFirst]);
        // Update CUD_EVENTS Object with CUD object
        if (typeof isDirty !== "undefined" && typeof value !== "undefined" && isDirty !== "") {
            cud_events.current = {
                ...cud_events.current,
                [name]: {
                    ...cud_events.current[name],
                    [isDirty]: value
                }
            };
        }
        return (0, React_1.useMemo)(() => cud_events.current, [arrFirst]);
    };
    exports.default = useCUD_Events;
});
