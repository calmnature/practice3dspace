define("DS/DELWebProcessStructViewer/services/DELWebProcessStructViewerSearchServices", ["require", "exports", "UWA/Utils/InterCom", "UWA/Core"], function (require, exports, InterCom, UWACore) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SearchServices = void 0;
    class SearchServices {
        constructor(searchPanelTitle, arrTypes, allowMultiSelect) {
            this._callback = undefined;
            this._socketId = "search_socket_" + new Date().getTime();
            this._serverIdSearch = "SearchComServer";
            this._socketSearch = new InterCom.Socket(this._socketId);
            this._socketSearch.subscribeServer(this._serverIdSearch);
            this._optionsSearch = {
                title: searchPanelTitle,
                mode: "furtive",
                widget_id: widget && widget.id ? widget.id : "",
                app_socket_id: this._socketId,
                default_with_precond: true,
                show_precond: false,
                multiSel: allowMultiSelect ? allowMultiSelect : false,
                precond: this._createSearchTypesQuery(arrTypes),
                tenant: widget && widget.getValue ? widget.getValue("x3dPlatformId") : "",
            };
            UWACore.merge(this._optionsSearch, this._socketSearch.defaultOptions);
        }
        /**
         * Activates search
         * @param callback
         */
        activateSearch(callback) {
            this._socketSearch.dispatchEvent("RegisterContext", this._optionsSearch);
            this._socketSearch.dispatchEvent("InContextSearch", this._optionsSearch);
            this._listener = this.searchItemSelected.bind(this);
            this._socketSearch.addListener("Selected_Objects_search", this._listener);
            this._destroyListener = () => {
                this.destroy();
            };
            this._socketSearch.addListener("clearSearch", this._destroyListener);
            this._callback = callback;
        }
        /**
         * Search Item Selected call back
         * @param arrData
         */
        searchItemSelected(arrData) {
            this.destroy();
            if (this._callback && arrData && arrData.length > 0) {
                let searchData = [];
                if (this._optionsSearch.multiSel) {
                    searchData = arrData.map((val) => {
                        return {
                            id: val.id,
                            project: val["ds6w:project_value"],
                            organization: val["ds6w:organizationResponsible_value"],
                            label: val["ds6w:label"],
                            type: val["ds6w:type_value"],
                            revision: val["ds6wg:revision"],
                        };
                    });
                }
                else {
                    searchData.push({
                        id: arrData[0].id,
                        project: arrData[0]["ds6w:project_value"],
                        organization: arrData[0]["ds6w:organizationResponsible_value"],
                        label: arrData[0]["ds6w:label"],
                        type: arrData[0]["ds6w:type_value"],
                        revision: arrData[0]["ds6wg:revision"],
                    });
                }
                this._callback(searchData);
            }
        }
        /**
         * Clean all objects and listeners
         */
        destroy() {
            if (this._socketSearch) {
                this._socketSearch.dispatchEvent("unregisterSearchContext", this._optionsSearch.widget_id);
                this._socketSearch.unsubscribeServer(this._serverIdSearch);
                this._socketSearch.removeListener("Selected_Objects_search", this._listener);
                this._socketSearch.removeListener("clearSearch", this._destroyListener);
                this._socketSearch.disconnect();
                this._socketSearch = null;
            }
        }
        /**
         * Build type query string
         * @param arrTypes
         * @returns string
         */
        _createSearchTypesQuery(types) {
            let result = "";
            if (types.length > 0) {
                result += "[ds6w:type]:" + types[0];
                for (let i = 1; i < types.length; i++) {
                    result += " OR [ds6w:type]:" + types[i];
                }
            }
            return result;
        }
    }
    exports.SearchServices = SearchServices;
    exports.default = SearchServices;
});
