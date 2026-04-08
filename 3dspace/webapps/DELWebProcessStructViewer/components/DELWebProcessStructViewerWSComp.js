/// <amd-module name="DS/DELWebProcessStructViewer/components/DELWebProcessStructViewerWSComp"/>
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("DS/DELWebProcessStructViewer/components/DELWebProcessStructViewerWSComp", ["require", "exports", "DS/React18Loader/React", "DS/React18Loader/React", "DS/ReactRouterDom/ReactRouterDom", "DS/WebappsUtils/WebappsUtils", "DS/ReactRedux/ReactRedux", "DS/WelcomeScreenView/WelcomeScreenButtonController", "DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerPlatformCtxSlice", "DS/DELReactControls/WelcomeScreen/WelcomeScreen", "DS/DELWebProcessStructViewer/services/DELWebProcessStructViewerDDServices", "../services/DELWebProcessStructViewerUtils", "DS/DELWebProcessStructViewer/services/DELWebProcessStructViewerSearchServices", "DS/DELWebProcessStructViewer/services/DELWebProcessStructViewerPrefServices", "i18n!DS/DELWebProcessStructViewer/assets/nls/DELWebProcessStructViewer", "i18n!DS/DELWebProcessStructViewer/assets/nls/DELWebProcessStructViewerReqServices", "DS/DELWebProcessStructViewer/components/DELModalLoader", "DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerDroppedObjTypeSlice", "DS/DELWebProcessStructViewer/store/DELWebProcessStructViewerLoadingSlice", "../services/DELWebProcessStructViewerUtils", "../services/DELWebProcessStructViewerUtils", "DS/Notifications/NotificationsManagerUXMessages", "DS/Notifications/NotificationsManagerViewOnScreen"], function (require, exports, React, React_1, ReactRouterDom_1, WebappsUtils_1, ReactRedux_1, WelcomeScreenButtonController, DELWebProcessStructViewerPlatformCtxSlice_1, WelcomeScreen_1, DELWebProcessStructViewerDDServices_1, DELWebProcessStructViewerUtils_1, DELWebProcessStructViewerSearchServices_1, DELWebProcessStructViewerPrefServices_1, nls, nlsReqServ, DELModalLoader_1, DELWebProcessStructViewerDroppedObjTypeSlice_1, DELWebProcessStructViewerLoadingSlice_1, DELWebProcessStructViewerUtils_2, DELWebProcessStructViewerUtils_3, NotificationsManagerUXMessages_1, NotificationsManagerViewOnScreen_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    WelcomeScreen_1 = __importDefault(WelcomeScreen_1);
    DELModalLoader_1 = __importDefault(DELModalLoader_1);
    NotificationsManagerUXMessages_1 = __importDefault(NotificationsManagerUXMessages_1);
    NotificationsManagerViewOnScreen_1 = __importDefault(NotificationsManagerViewOnScreen_1);
    NotificationsManagerViewOnScreen_1.default.setNotificationManager(NotificationsManagerUXMessages_1.default);
    NotificationsManagerViewOnScreen_1.default.setStackingPolicy(5);
    const DELPSVWSComp = () => {
        const navigate = (0, ReactRouterDom_1.useNavigate)();
        const [buttonWS, setButtonWS] = (0, React_1.useState)([]);
        const dispatch = (0, ReactRedux_1.useDispatch)();
        const background = (0, WebappsUtils_1.getWebappsAssetUrl)(DELWebProcessStructViewerUtils_3.appName, "img/PSVWSBg.jpg");
        const platformCtxData = (0, ReactRedux_1.useSelector)((state) => state.platformCtx);
        const autoReloadRef = (0, React_1.useRef)(true);
        const notifs = (0, ReactRedux_1.useSelector)((state) => state.notification);
        const links = [
            {
                id: "contentKnowledge",
                i18n: { title: nls.ContentKnowledge },
                links: [
                    {
                        id: "btnUserAssistance",
                        i18n: { title: nls.UserAssistance },
                        icon: "i-question",
                        url: "",
                    },
                ],
            },
            {
                id: "socialNetworks",
                i18n: { title: nls.SocialNetworks },
                links: [
                    {
                        id: "btnDelmiaCommunity",
                        i18n: { title: nls.DelmiaCommunity },
                        icon: "logo-3dswym",
                        url: "https://r1132100503382-eu1-3dswym.3dexperience.3ds.com/#community:26",
                    },
                ],
            },
        ];
        const arePlatformDataAlreadyFetched = () => {
            return (platformCtxData !== undefined &&
                platformCtxData.userCollabSpace !== undefined &&
                platformCtxData.urlSpace !== undefined &&
                platformCtxData.urlSpace !== "" &&
                platformCtxData.arrPlatformInfo !== undefined &&
                platformCtxData.arrPlatformInfo.length > 0 &&
                platformCtxData.appInfo !== undefined &&
                platformCtxData.defaultCollabSpace != "" &&
                platformCtxData.defaultCollabSpace !== undefined);
        };
        const loading = (0, ReactRedux_1.useSelector)((state) => state.loading.loading);
        const optionsLoader = { message: "Please wait for a while" };
        // writing drag and drop functionality
        const dragAndDrop = {
            callbacks: {
                //@ts-ignore
                onDragEnter: (iDragEvent) => {
                    // have to return a promise.resolve isObject from services file
                    return Promise.resolve((0, DELWebProcessStructViewerDDServices_1.isObject)(iDragEvent) ? "OverFullPage" : "Forbidden");
                },
                onDrop: function (iDragEvent) {
                    const droppedContentItem = (0, DELWebProcessStructViewerDDServices_1.getObjectData)(iDragEvent);
                    dispatch({ type: "RESET_STORE" });
                    if (droppedContentItem && droppedContentItem.objectType && droppedContentItem.objectId && droppedContentItem.objectId !== "") {
                        if (DELWebProcessStructViewerUtils_1.allSupportedObjects.includes(droppedContentItem.objectType)) {
                            openRootObject({ id: droppedContentItem.objectId, type: droppedContentItem.objectType });
                        }
                        else {
                            NotificationsManagerUXMessages_1.default.addNotif({ level: "error", title: nlsReqServ.error_NotAllowedObject, message: nlsReqServ.error_NotAllowedObject_msg });
                        }
                    }
                    else {
                        NotificationsManagerUXMessages_1.default.addNotif({ level: "error", title: nlsReqServ.error_IncorrectObject, message: nlsReqServ.error_IncorrectObject_msg });
                    }
                },
            },
        };
        // Callback to open Root object,
        // as in Translation app, arrDefaultLanguages is passed as dependencies, think what can be passed here
        const openRootObject = (0, React_1.useCallback)((refSession) => {
            if (refSession && refSession.id !== "" && refSession.type !== "") {
                // check if id & type is present in preferences by using functions [isAlreadyFetched setLastSessionObjectIdType]
                // dispatch and action to call progressive API
                (0, DELWebProcessStructViewerPrefServices_1.setLastSessionObjectIdType)(refSession);
                dispatch({
                    type: "FETCH",
                    payload: { physicalId: refSession.id, type: refSession.type },
                });
                dispatch((0, DELWebProcessStructViewerDroppedObjTypeSlice_1.setDroppedObjectType)(refSession.type));
            }
        }, []);
        (0, React_1.useEffect)(() => {
            // Retrieve all platform context information
            if (!arePlatformDataAlreadyFetched()) {
                // Retrieve all platform context information
                dispatch({ type: DELWebProcessStructViewerPlatformCtxSlice_1.FETCH_PLATFORMCTX });
            }
            else {
                autoReloadRef.current = false;
            }
        }, []);
        // add dependencies platformCtxData
        (0, React_1.useEffect)(() => {
            if (platformCtxData.userCollabSpace && platformCtxData.arrPlatformInfo && platformCtxData.appInfo) {
                (0, DELWebProcessStructViewerPrefServices_1.buildPreferences)(platformCtxData.userCollabSpace, platformCtxData.defaultCollabSpace, platformCtxData.arrPlatformInfo, platformCtxData.appInfo);
            }
        }, [
            platformCtxData.userCollabSpace,
            platformCtxData.defaultCollabSpace,
            platformCtxData.arrPlatformInfo,
            platformCtxData.urlSpace,
            platformCtxData.appInfo,
        ]);
        (0, React_1.useEffect)(() => {
            // Initialize an array to store welcome screen buttons
            const arrWSButtons = [];
            // Check if the last session object ID type is available
            if ((0, DELWebProcessStructViewerPrefServices_1.getLastSessionObjectIdType)()) {
                // Add a reload button to the array if the last session object ID type is available
                arrWSButtons.push({
                    id: "btnReload",
                    i18n: { title: nls.Reload }, // Button title
                    icon: "reset", // Button icon
                    controller: new WelcomeScreenButtonController({
                        // Define the button action
                        onAction: () => {
                            // Get the reference session from the last session object ID type
                            const refSession = (0, DELWebProcessStructViewerPrefServices_1.getLastSessionObjectIdType)();
                            if (refSession) {
                                dispatch({ type: "RESET_STORE" });
                                // Open the root object
                                openRootObject(refSession);
                            }
                            else {
                                // TO DO error management
                            }
                            return Promise.resolve();
                        },
                    }),
                    hasCustomContent: false,
                });
            }
            // Add an open button to the array
            arrWSButtons.push({
                id: "btnOpen",
                i18n: { title: nls.Open }, // Button title
                icon: "open", // Button icon
                controller: new WelcomeScreenButtonController({
                    onAction: () => {
                        // Create a search services instance
                        let searchServices = new DELWebProcessStructViewerSearchServices_1.SearchServices(nls.Open_3dSearch_Label, DELWebProcessStructViewerUtils_1.allSupportedObjects);
                        if (searchServices) {
                            searchServices.activateSearch((arrData) => {
                                if (arrData && arrData.length === 1 && arrData[0] && arrData[0].id && arrData[0].id !== "") {
                                    const refSession = { id: arrData[0].id, type: arrData[0].type };
                                    dispatch({ type: "RESET_STORE" });
                                    openRootObject(refSession);
                                }
                            });
                        }
                        // Return a resolved promise
                        return Promise.resolve();
                    },
                }),
                hasCustomContent: false,
            });
            // Update the welcome screen buttons state
            setButtonWS(arrWSButtons);
        }, []);
        (0, React_1.useEffect)(() => {
            const refSession = (0, DELWebProcessStructViewerPrefServices_1.getLastSessionObjectIdType)();
            if (autoReloadRef.current && (0, DELWebProcessStructViewerPrefServices_1.getReloadValue)() && refSession) {
                if (refSession) {
                    dispatch({ type: "RESET_STORE" });
                    openRootObject(refSession);
                }
            }
        }, [arePlatformDataAlreadyFetched()]);
        (0, React_1.useEffect)(() => {
            if (loading === DELWebProcessStructViewerUtils_2.LoadingStatus.LoadingDone) {
                navigate("/main");
                dispatch((0, DELWebProcessStructViewerLoadingSlice_1.setAtRest)());
            }
        }, [loading]);
        (0, React_1.useEffect)(() => {
            if (notifs && notifs.level && notifs.title && notifs.title !== "") {
                NotificationsManagerUXMessages_1.default.addNotif({ level: notifs.level, title: notifs.title, message: notifs === null || notifs === void 0 ? void 0 : notifs.message });
            }
        }, [notifs]);
        return (React.createElement(React.Fragment, null,
            React.createElement(DELModalLoader_1.default, { id: "modalLoaderContainer", isVisible: loading === DELWebProcessStructViewerUtils_2.LoadingStatus.Loading, options: optionsLoader },
                React.createElement(WelcomeScreen_1.default, { className: "ws-container-PSVApp", title: nls.WS_Title, subtitle: nls.WS_SubTitle, background: background, dragAndDrop: dragAndDrop, buttons: buttonWS, linksCategories: links }))));
    };
    DELPSVWSComp.displayName = "DELPSVWSComp";
    exports.default = DELPSVWSComp;
});
