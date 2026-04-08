/// <amd-module name='DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerItemSlice'/>
define("DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerItemSlice", ["require", "exports", "DS/ReactRedux/Toolkit"], function (require, exports, Toolkit_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fetchAPIItem = void 0;
    const initialState = {
        itemResponse: [],
    };
    const lightViewerSlice = (0, Toolkit_1.createSlice)({
        name: "itemData",
        initialState,
        reducers: {
            /**
             * Updates the itemResponse state with new or existing ExpandItems.
             */
            fetchAPIItem: (state, action) => {
                const incomingItems = action.payload.data;
                // Create a map for existing items to improve performance
                const existingItemsMap = new Map(state.itemResponse.map((item) => [item.id, item]));
                incomingItems.forEach((newItem) => {
                    if (existingItemsMap.has(newItem.id)) {
                        // Replace existing item
                        const index = state.itemResponse.findIndex((item) => item.id === newItem.id);
                        if (index !== -1) {
                            state.itemResponse[index] = newItem;
                        }
                    }
                    else {
                        // Add new item
                        state.itemResponse.push(newItem);
                    }
                });
            },
        },
    });
    exports.fetchAPIItem = lightViewerSlice.actions.fetchAPIItem;
    exports.default = lightViewerSlice.reducer;
});
