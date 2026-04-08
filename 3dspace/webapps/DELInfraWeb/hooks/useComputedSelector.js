/// <amd-module name="DS/DELInfraWeb/hooks/useComputedSelector"/>
define("DS/DELInfraWeb/hooks/useComputedSelector", ["require", "exports", "DS/React18Loader/React", "DS/ReactRedux/ReactRedux"], function (require, exports, React_1, ReactRedux_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useComputedSelector = void 0;
    const useComputedSelector = (store, key) => {
        let oSelector;
        if (!store || !store.getComputedSelectors || !key || key === "")
            return oSelector;
        const selectorComputed = (0, React_1.useMemo)(() => store.getComputedSelectors(key), []);
        if (!selectorComputed)
            return oSelector;
        const useAppSelector = ReactRedux_1.useSelector;
        oSelector = useAppSelector(selectorComputed);
        return oSelector;
    };
    exports.useComputedSelector = useComputedSelector;
});
