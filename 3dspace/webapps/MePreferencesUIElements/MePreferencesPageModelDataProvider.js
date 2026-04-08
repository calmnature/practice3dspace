define('DS/MePreferencesUIElements/MePreferencesPageModelDataProvider',
    ['DS/WAFData/WAFData',
        'DS/Notifications/NotificationsManagerUXMessages',
        'DS/Notifications/NotificationsManagerViewOnScreen',
        'DS/MePreferencesClientCacheMgr/MePreferencesClientCacheMgr',
        'DS/MePreferencesClientUtilities/MePreferencesPlatformServicesUtils'
    ],
    function (WAFData, NotificationsManagerUXMessages,
        WUXNotificationsManagerViewOnScreen, MePreferencesClientCacheMgr, MePreferencesPlatformServicesUtils) {

        window.notifs = NotificationsManagerUXMessages;
        WUXNotificationsManagerViewOnScreen.setNotificationManager(window.notifs);

        var mePrefClientCacheMgr = new MePreferencesClientCacheMgr();
        var clientEtag = null;

        var mePreferencesPageModelDataProvider = function () {
            this.appsNotInCache = new Set();
        };

        mePreferencesPageModelDataProvider.prototype.getPageModel = async function (requestedURL, appID, currentLanguage, bypassServerCall = false, bypassCache = false) {
            // if (!appID.contains(",")) { //cache not applicable for multiple appIDs
            var data = await mePrefClientCacheMgr.retrieveCache(requestedURL);
            if (!data) {
                if (!appID.includes(",") && bypassServerCall) { // Check if appID contains a comma
                    this.appsNotInCache.add(appID); // Add appID to the Set
                }
                if (!bypassServerCall) {

                    if (bypassCache) {

                        var respArr = await getResourcesFromServer(requestedURL, clientEtag);
                        if (respArr && respArr[0] && respArr[1] && respArr[2]) {
                            data = {
                                "responseData": respArr[0],
                                "responseStatus": respArr[1].status,
                                "responseETag": respArr[2].etag
                            };
                        }
                        return respArr[0];
                    } else {

                        let key = await getKeyForPageModel(appID, currentLanguage);

                        clientEtag = await mePrefClientCacheMgr.retrieveEtag(key);

                        var respArr = await getResourcesFromServer(requestedURL, clientEtag);
                        if (respArr && respArr[0] && respArr[1] && respArr[2]) {
                            data = {
                                "responseData": respArr[0],
                                "responseStatus": respArr[1].status,
                                "responseETag": respArr[2].etag,
                                "responseEKey": respArr[2]['x-request-id']
                            };
                        }
                        if (data) {
                            if (data.responseStatus === 200) {
                                //if data not found in cache and server returns status 200 with response and etag
                                let etagheader = new Headers();
                                etagheader.append('etag', data.responseETag);

                                let x_apiKeyheader = new Headers();
                                x_apiKeyheader.append('x-request-id', data.responseEKey);

                                // Merge headers from etagheader and e_Keyheader
                                let mergedHeaders = new Headers();
                                etagheader.forEach((value, name) => mergedHeaders.append(name, value));
                                x_apiKeyheader.forEach((value, name) => mergedHeaders.append(name, value));

                                let options = {
                                    headers: mergedHeaders
                                };

                                let newresponse = new Response(data.responseData, options);
                                if (newresponse && requestedURL.contains("&v")) {
                                    //if request Url contains version then delete the already present cache for that appId and language and add the new response with etag in cache
                                    if (key) {
                                        await mePrefClientCacheMgr.deleteCache(key);
                                    }
                                    await mePrefClientCacheMgr.addCache(requestedURL, newresponse);
                                }
                                return data.responseData;
                            }
                            else if (data.responseStatus === 304) {
                                //if data not found in cache and server returns status 304, retrieve the already present cached response
                                let result = await mePrefClientCacheMgr.retrieveCache(key);

                                let etagheader = new Headers();
                                etagheader.append('etag', clientEtag);
                                let options = {
                                    headers: etagheader
                                }

                                let newresponse = new Response(result, options);
                                if (newresponse && requestedURL.contains("&v")) {
                                    //if request Url contains version then delete the already present cache for that appId and language and add the new response with etag in cache
                                    if (key) {
                                        await mePrefClientCacheMgr.deleteCache(key);
                                    }
                                    await mePrefClientCacheMgr.addCache(requestedURL, newresponse);
                                }
                                return result;
                            }
                        }
                        else {
                            //if data not found in cache as well as on server return error notification
                            let ErrorNotification = {
                                level: "error",
                                title: "Error",
                                subtitle: "",
                                message: "Something went wrong",
                                sticky: true,
                                id: 'data-mep-po-notif-page-model-error'
                            };
                            NotificationsManagerUXMessages.addNotif(ErrorNotification);
                        }
                    }
                } else
                    return null;
            }
            return data;
            // }
            // else {
            //     let result = await getResourcesFromServer(requestedURL);
            //     if(result)
            //         return result.responseData;
            //     else{
            //         let ErrorNotification = {
            //             level: "error",
            //             title: "Error",
            //             subtitle: "",
            //             message: "Something went wrong",
            //             sticky: true
            //         };
            //         NotificationsManagerUXMessages.addNotif(ErrorNotification);
            //     }
            // }
        }

        //gets key from cache for previously stored response of application
        async function getKeyForPageModel(appID, currentLanguage) {
            const cache = await caches.open('MePreferences');
            const keys = await cache.keys();
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i].url;
                if ((key.includes(appID)) && key.includes(currentLanguage)) {
                    return key;
                };
            }
            return null;
        }

        //gets resources from pageModel API
        async function getResourcesFromServer(url, clientEtag) {
            let REQUEST_BODY = null;
            let headersInfo = {
                'If-None-Match': ''
            };
            if (clientEtag)
                headersInfo["If-None-Match"] = clientEtag;

            let options = {
                headersInfo: headersInfo
            };

            return await MePreferencesPlatformServicesUtils.callRestAPI(REQUEST_BODY, url, 'GET', options).then((responseObject) => {
                return responseObject;
            }).catch((errorInfo) => {
                return null;
            });
        }

        return mePreferencesPageModelDataProvider;
    });
