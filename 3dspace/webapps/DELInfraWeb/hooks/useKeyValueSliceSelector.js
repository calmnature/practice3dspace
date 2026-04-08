/// <amd-module name="DS/DELInfraWeb/hooks/useKeyValueSliceSelector"/>
define("DS/DELInfraWeb/hooks/useKeyValueSliceSelector", ["require", "exports", "DS/React18Loader/React", "DS/ReactRedux/ReactRedux"], function (require, exports, React_1, ReactRedux_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const useKeyValueSliceSelector = (store, uri) => {
        let oSelectorValue;
        if (!store || !store.getKeyValueSelectors || !uri || uri === "")
            return oSelectorValue;
        const selectorKVPXP = (0, React_1.useMemo)(() => store.getKeyValueSelectors(uri), []);
        if (!selectorKVPXP || !selectorKVPXP.selectValue)
            return oSelectorValue;
        const useAppSelector = ReactRedux_1.useSelector;
        oSelectorValue = useAppSelector(selectorKVPXP.selectValue);
        return oSelectorValue;
    };
    exports.default = useKeyValueSliceSelector;
});
