/// <amd-module name="DS/DELInfraWeb/hooks/useStatusSliceSelector"/>
define("DS/DELInfraWeb/hooks/useStatusSliceSelector", ["require", "exports", "DS/DELInfraWeb/store/DELStore"], function (require, exports, DELStore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useComputedStatusSliceSelector = void 0;
    const useComputedStatusSliceSelector = (store, arrURI) => {
        let oSelector = { status: DELStore_1.enDELStatus.success, description: { title: "" } };
        /* @TODO XXE
        if (!store || !store.getCorpusSelectors) return oSelector;
      
        const selectorStatus: DELStatusSliceSelectors | undefined = useMemo(() => store.getStatusSelectors(), []);
        if (!selectorStatus || !selectorStatus.selectComputedStatusByURI) return oSelector;
      
        const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
        oSelector = useAppSelector(selectorStatus.selectComputedStatusByURI(arrURI));*/
        return oSelector;
    };
    exports.useComputedStatusSliceSelector = useComputedStatusSliceSelector;
});
