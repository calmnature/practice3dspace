/// <amd-module name="DS/DELInfraWeb/hooks/useEndPointSliceSelector"/>
define("DS/DELInfraWeb/hooks/useEndPointSliceSelector", ["require", "exports", "DS/React18Loader/React", "DS/ReactRedux/ReactRedux"], function (require, exports, React_1, ReactRedux_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const useEndPointSliceSelector = (store, uri) => {
        let oSelectorValue;
        if (!store || !store.getEndPointSelectors || !uri)
            return oSelectorValue;
        const selectorEndPoint = (0, React_1.useMemo)(() => store.getEndPointSelectors(uri.toString()), []);
        if (!selectorEndPoint || !selectorEndPoint.selectValue)
            return oSelectorValue;
        const useAppSelector = ReactRedux_1.useSelector;
        oSelectorValue = useAppSelector(selectorEndPoint.selectValue);
        return oSelectorValue;
    };
    exports.default = useEndPointSliceSelector;
});
