define('DS/DELWebTools/DELDragAndDropUtils',
    ['UWA/Utils'],
    function (UWAUtils) {
        'use strict';

        var DELDragAndDropUtils = {

            /**
             * isObject
             * @param {object} iEvent 
             * @returns {boolean} true if dropped item is an object
             */
            isObject: function (iEvent) {

                let obIsObject = false;
                if (iEvent) {

                    const data = iEvent.dataTransfer;
                    if (data.items) { // Chrome (IE, Safari and Firefox don't support dataTransfer.items)

                        // If there are several items, it can be two things :
                        // - An object comming from the search, in that case we need to accept it
                        // - Several objects dragged from the hard drive, in that case in refuse it
                        // Else there is only one item, we only accept what is comming from 3DSpace
                        if (data.items.length > 1) {

                            let it = 0;
                            const nbItem = data.items.length;
                            while (it < nbItem && !obIsObject) {
                                if (data.items[it].type === "text/searchitems") {
                                    obIsObject = true;
                                }
                                it++;
                            }
                        } else if (data.items[0].kind === "string" && data.items[0].type === "text/plain") {
                            obIsObject = true;
                        }
                    } else if (data.types) { // Firefox and IE

                        // We accept: - An object coming from the search or from 3DSpace
                        if (data.types.length == 1) { // 3DSpace (one item)
                            if (data.types[0] == 'text/plain' || data.types[0] == 'Text') {
                                obIsObject = true;
                            }
                        } else { // Search (one item or several items)
                            if ((data.types instanceof DOMStringList && data.types.contains('text/searchitems')) ||
                                (data.types instanceof Array && data.types.indexOf('text/searchitems') > -1)) {
                                obIsObject = true;
                            }
                        }
                    }
                }
                return obIsObject;
            },

            /**
             * getObjectData
             * @param {object} iEvent 
             * @returns {object} information object from input dropped object: envId, contextId, objectId, displayName and displayType
             */
            getObjectData: function (iEvent) {

                let oData = {
                    envId: null,
                    contextId: null,
                    objectId: null,
                    displayName: null,
                    displayType: null
                };

                if (iEvent && iEvent.dataTransfer) {

                    let searchItem = null;
                    try {
                        searchItem = iEvent.dataTransfer.getData('text/searchitems');
                        if (searchItem === '') {
                            searchItem = iEvent.dataTransfer.getData('text');
                        }
                    }
                    catch (error) { // IE : need try catch because getData('non-existent param') triggers a JS error
                        searchItem = iEvent.dataTransfer.getData('Text'); // IE
                    }

                    if (searchItem && searchItem !== '') {

                        const objSearchItem = JSON.parse(searchItem);
                        if (objSearchItem && objSearchItem.data && objSearchItem.data.items && objSearchItem.data.items.length > 0) {

                            const dropParam = objSearchItem.data.items[0];
                            if (dropParam) {
                                oData = {
                                    envId: dropParam.envId,
                                    contextId: dropParam.contextId,
                                    objectId: dropParam.objectId,
                                    objectType:dropParam.objectType,
                                    displayName: dropParam.displayName,
                                    displayType: dropParam.displayType,
                                };
                            }
                        }
                    }
                }

                return oData;
            },
        };

        return DELDragAndDropUtils;
    }
);

