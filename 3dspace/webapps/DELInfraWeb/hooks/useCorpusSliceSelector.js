/// <amd-module name="DS/DELInfraWeb/hooks/useCorpusSliceSelector"/>
define("DS/DELInfraWeb/hooks/useCorpusSliceSelector", ["require", "exports", "DS/React18Loader/React", "DS/ReactRedux/ReactRedux"], function (require, exports, React_1, ReactRedux_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useCorpusEntitiesSelector = void 0;
    const useCorpusEntitiesSelector = (store, key) => {
        let oSelector;
        if (!store || !store.getCorpusSelectors || !key || key === "")
            return oSelector;
        const selectorCorpus = (0, React_1.useMemo)(() => store.getCorpusSelectors(key), []);
        if (!selectorCorpus || !selectorCorpus.selectEntities)
            return oSelector;
        const useAppSelector = ReactRedux_1.useSelector;
        oSelector = useAppSelector(selectorCorpus.selectEntities);
        return oSelector;
    };
    exports.useCorpusEntitiesSelector = useCorpusEntitiesSelector;
});
