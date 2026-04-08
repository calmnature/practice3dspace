/// <amd-module name="DS/DELToolbarSearchV1/DELToolbarSearch"/>
define("DS/DELToolbarSearchV1/DELToolbarSearch", ["require", "exports", "DS/React18Loader/React", "DS/React18Loader/React", "DS/DELExpanderV1/DELExpanderV1", "DS/DELReactControls/Tweakers/Toolbar", "i18n!./assets/nls/DELToolbarSearch", "css!./assets/css/DELToolbarSearchV1.css"], function (require, exports, React, React_1, DELExpanderV1_1, Toolbar_1, nls) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const DELToolbarSearch = (0, React_1.memo)(({ closeBtnLabel = nls.get('closeBtn'), editorPlaceholder = nls.get('search'), expanderBackgroundColor = "#B4B6BA", expanderHeight = 25, id = 'DELToolbarSearch', onClickExpander, onClickHideBtn, onEditorChange, searchBtnLabel = nls.get('search'), width = '100%' }) => {
        const [displaySearchBar, setDisplaySearchBar] = (0, React_1.useState)(false);
        const handleOnClickExpander = (0, React_1.useCallback)(() => {
            setDisplaySearchBar(!displaySearchBar);
            if (onClickExpander)
                onClickExpander();
            setTimeout(() => {
                focusEditor();
            }, 150);
        }, [displaySearchBar]);
        const handleOnClickIconButton = (0, React_1.useCallback)(() => {
            setDisplaySearchBar(!displaySearchBar);
            if (onClickHideBtn)
                onClickHideBtn();
        }, [displaySearchBar]);
        const handleOnChangeEditor = (0, React_1.useCallback)((value) => {
            if (onEditorChange)
                onEditorChange(value);
        }, []);
        const focusEditor = (0, React_1.useCallback)(() => {
            var _a;
            (_a = document.getElementsByClassName("wux-ui-state-undefined")[0]) === null || _a === void 0 ? void 0 : _a.focus();
        }, []);
        const handleOnFocus = (0, React_1.useCallback)(() => {
            //@ts-ignore
            document.getElementsByClassName('wux-button-icon-fi wux-ui-genereatedicon-fi wux-ui-3ds wux-ui-3ds-search wux-ui-3ds-lg')[0].style.color = '#368ec4';
        }, []);
        const handleOnFocusOut = (0, React_1.useCallback)(() => {
            //@ts-ignore
            document.getElementsByClassName('wux-button-icon-fi wux-ui-genereatedicon-fi wux-ui-3ds wux-ui-3ds-search wux-ui-3ds-lg')[0].style.color = '';
        }, []);
        const refContainerToolbar = (0, React_1.useCallback)((divElement) => {
            if (divElement !== null) {
                divElement.addEventListener('focus', handleOnFocus);
                divElement.addEventListener('focusout', handleOnFocusOut);
            }
        }, []);
        (0, React_1.useEffect)(() => {
            return () => {
                if (document.getElementById('containerToolbar') !== null) {
                    document.getElementById('containerToolbar').removeEventListener('focus', handleOnFocus);
                    document.getElementById('containerToolbar').removeEventListener('focusout', handleOnFocusOut);
                }
            };
        }, []);
        return (React.createElement("div", { "data-testid": "toolbarSearch" },
            React.createElement(DELExpanderV1_1.default, { id: "DELExpander-" + id, height: expanderHeight, display: !displaySearchBar, onClick: handleOnClickExpander, backgroundColor: expanderBackgroundColor }),
            React.createElement("div", { id: id + '-toolbar-container', className: displaySearchBar ? "toolbar-container-show" : "toolbar-container-hide", style: { width } }, displaySearchBar &&
                React.createElement("div", { id: "containerToolbar", ref: refContainerToolbar },
                    React.createElement(Toolbar_1.default, null,
                        React.createElement(Toolbar_1.default.IconButton, { label: searchBtnLabel, onClick: focusEditor, icon: { iconName: 'search', fontIconFamily: 1 }, category: "search", position: "far" }),
                        React.createElement(Toolbar_1.default.Editor, { dataElements: { placeholder: editorPlaceholder }, onChange: handleOnChangeEditor, category: "search", position: "far" }),
                        React.createElement(Toolbar_1.default.IconButton, { label: closeBtnLabel, onClick: handleOnClickIconButton, icon: { iconName: 'close', fontIconFamily: 1 }, category: "close", position: "far" }))))));
    });
    DELToolbarSearch.displayName = 'DELToolbarSearch';
    exports.default = DELToolbarSearch;
});
