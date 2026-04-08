define('DS/MePreferencesClientCacheMgr/MePreferencesClientCacheMgr',
    [],
    function () {

        var mepClientCache = function () {
        }

        //opens MePreferences cache storage and search for a match of requested url
        mepClientCache.prototype.retrieveCache = async function (requestedURL) {
            if ('caches' in window) {
                const cache = await caches.open('MePreferences');
                const resp = await cache.match(requestedURL);
                if (resp && resp.status === 200) {
                    let data = await resp.text();
                    return data;
                }
            }
            return null;

        }

        //adds cache with url as key and the server response as value in MePreferences cache storage
        mepClientCache.prototype.addCache = async function (requestedURL, response) {
            if ('caches' in window) {
                const newCache = await caches.open('MePreferences');
                if (newCache)
                    newCache.put(requestedURL, response);
            }

            return null;
        }

        //delete cache 
        mepClientCache.prototype.deleteCache = async function (requestedURL) {
            if ('caches' in window) {
                const cache = await caches.open('MePreferences');
                if(cache)   
                    cache.delete(requestedURL);
            }
            
        }

        //returns etag from stored cache 
        mepClientCache.prototype.retrieveEtag = async function (requestedURL) {
            if ('caches' in window) {
                const cache = await caches.open('MePreferences');
                const response = await cache.match(requestedURL);
                if (response && response.headers.has('etag')) {
                    return response.headers.get('etag');
                }

            }
        }

        function compareAppIDs(urlAppID, appID) {
            if (urlAppID.includes(',')) {
                let urlAppIDArray = urlAppID.replace(/"/g, '').split(',').map(item => item.trim());
        
                function arraysEqual(arr1, arr2) {
                    if (arr1.length !== arr2.length) return false;
                    const set1 = new Set(arr1);
                    const set2 = new Set(arr2);
                    for (let item of set1) {
                        if (!set2.has(item)) return false;
                    }
                    return true;
                }
        
                return arraysEqual(urlAppIDArray, appID);
            } else {
                return urlAppID.replace(/"/g, '') === appID;
            }
        }


        mepClientCache.prototype.retrieveKey = async function (appID) {
            if ('caches' in window) {
                try {
                    const cache = await caches.open('MePreferences');
                    const keys = await cache.keys();
                    for (const request of keys) {
                        const url = new URL(request.url);
                        const urlAppID = url.searchParams.get('appId') || url.searchParams.get('appIds');
                        if(urlAppID){
                            let areEqual = compareAppIDs(urlAppID, appID);
                            if (url.pathname.includes('page_model') && areEqual) {
                                const response = await cache.match(request);
                                if (response && response.headers.has('x-request-id')) {
                                    return response.headers.get('x-request-id');
                                }
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error retrieving key from cache:', error);
                }
            }
            return null;
        };

        return mepClientCache;

    });
    
