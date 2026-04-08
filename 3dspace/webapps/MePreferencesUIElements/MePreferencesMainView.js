define('DS/MePreferencesUIElements/MePreferencesMainView',
    [
        "DS/MePreferencesUIElements/MePreferencesPageView",
        "DS/MePreferencesUIElements/MePreferencesCategoryView",
        "DS/Windows/DockingElement",
        "DS/Controls/Loader",
        "DS/MePreferencesClientUtilities/MePreferencesWriter",
        "DS/Controls/Button",
        "i18n!DS/MePreferencesUIElements/assets/nls/translation",
        "DS/Core/TooltipModel"
    ],
    function (MePreferencesPageView, MePreferencesCategoryView, WUXDockingElement, WUXLoader,
        MePreferencesWriter, WUXButton, mePrefTranslation, WUXTooltipModel) {

        var serviceurl = null;
        // var mainDiv = createDiv("me-preference-main-view");
        var mainDiv = null;
        var mePreferencesCategoryViewObj = new MePreferencesCategoryView();
        var adminValues = null;
        var defaultPrefValuesMap = {};
        var prefDiv = null;
        var prefDivContent = null;
        var isAdminview = false;
        var mePrefbetaOptionstab = null;
        var mePrefLangObj = null
        var mePreferencesPageViewObj = new MePreferencesPageView();
        var TENANT_ID = null;
        var currentlySelectedAppID = null;

        function createDiv(style) {
            return new UWA.createElement("div", {
                "class": style
            });
        }

        function getValueFromNLS(key, nls) {
            var nlsVal = "to be overloaded from NLS";

            if (nls && nls[key] != undefined)
                nlsVal = nls[key];

            return nlsVal;
        }

        var mePreferencesMainViewObj = {

            createMainView: async function (appID, isAdminView, adminProfileValues, serviceURL, mePrefBetaOptionsObj, mePrefLangObject, variation, tenantID) {

                TENANT_ID = tenantID;
                mePrefbetaOptionstab = mePrefBetaOptionsObj;
                mePrefLangObj = mePrefLangObject;
                adminValues = adminProfileValues;
                isAdminview = isAdminView;
                serviceurl = serviceURL;

                if (isAdminView)
                    mainDiv = createDiv("me-preference-main-view-admin");
                else
                    mainDiv = createDiv("me-preference-main-view");

                prefDiv = new UWA.Element("div", {
                    class: "child-div-right"
                });
                prefDivContent = new UWA.Element("div"
                );

                if (appID === '3DSApp.SWXXDWI_AP.SWPLUS' || appID === '3DSApp.SWXXDWI_AP.CATIAPLUS' || appID === '3DSApp.SWXXDWI_AP.3DEXPPLUS') {
                    mainDiv = await createSolidworksAppsView(appID, variation, prefDiv, prefDivContent);
                    return mainDiv;
                }

                // if (!isAdminView) {
                //     var topBarDiv = new UWA.Element("div", {
                //         class: "reset-div-class"
                //     });

                //     var resetICON = createResetIcon();
                //     resetICON.inject(topBarDiv);

                //     topBarDiv.inject(mainDiv);

                //     resetICON.addEventListener("buttonclick", function (e) {
                //         mePreferencesResetDialogBuilder.reset(serviceurl, currentlySelectedAppID);
                //     });


                // }

                // var dockingDiv = new UWA.Element("div", {
                //     class: "me-preference-docking-div"
                // });

                let dockingElement = new WUXDockingElement({
                    side: WUXDockAreaEnum.LeftDockArea
                });

                dockingElement.freeZoneContent = prefDiv;
                dockingElement.dockingZoneSize = 200;

                if ((variation && variation.type === "globalview") || isAdminview || (variation && variation.type === "appview" && variation.showCategoryView === true)) {

                    document.removeEventListener("nodeSelectionChange", onNodeSelectionChange, true);
                    document.addEventListener("nodeSelectionChange", onNodeSelectionChange, true);

                    var categoryDiv = new UWA.Element("div", {
                        class: "child-div-left"
                    });

                    let categorycontent = await createCategoryView(appID, variation, tenantID);
                    categorycontent.inject(categoryDiv);

                    dockingElement.dockingZoneContent = categoryDiv;

                    if (variation && variation.type === "appview")
                        dockingElement.collapseDockingZoneFlag = true;
                }

                // if (!isAdminView) {
                //     dockingElement.inject(dockingDiv);
                //     dockingDiv.inject(mainDiv);
                // } else
                dockingElement.inject(mainDiv);

                await mePreferencesCategoryViewObj.selectAppNode(appID, isAdminview);

                return mainDiv;
            },

            getDefaultPrefValuesMap: function () {
                if (defaultPrefValuesMap)
                    return defaultPrefValuesMap;
            }
        }

        async function createSolidworksAppsView(appID, variation, prefDiv, prefDivContent) {
            variation.showCategoryView = false;

            prefDivContent = await createPreferenceView(appID);
            prefDivContent.inject(prefDiv);
            prefDiv.setAttribute("data-mep-page-view-load-done-po-use-only", "");

            return prefDiv;
        }

        function createResetIcon() {
            var reseticon = new WUXButton({
                label: "Some label",
                showLabelFlag: false,
                class: "topBar-button-class",
                icon: {
                    iconName: "reset",
                    fontIconFamily: WUXManagedFontIcons.Font3DS
                },
                tooltipInfos: {
                    //   title: "Simple tooltip",
                    shortHelp: getValueFromNLS("ResetPreferencesButton.tooltipInfos.shortHelp", mePrefTranslation),
                    mouseRelativePosition: false,
                    position: "bottom"
                }
            });

            //let tooltipInfoObj = getValueFromNLS("ResetPreferencesButton.tooltipInfos.shortHelp", mePrefTranslation);

            // if (tooltipInfoObj) {
            //     reseticon.tooltipInfos = new WUXTooltipModel(tooltipInfoObj);
            // }

            return reseticon;
        }

        function addDefaultPreferenceInMap(appID, defaultPrefValuesfromPage) {
            defaultPrefValuesMap[appID] = defaultPrefValuesfromPage;
        }

        async function createCategoryView(appID, variation, tenantID) {
            let categoryViewContent = await mePreferencesCategoryViewObj.createCategoryUI(isAdminview, appID, variation, tenantID);
            return categoryViewContent;
        }

        async function createPreferenceView(appID) {
            let prefDivView = createDiv("me-preference-view-visibility-" + appID);
            return await mePreferencesPageViewObj.getMePreferencePageView(serviceurl, appID, prefDivView, isAdminview, adminValues, mePrefbetaOptionstab, mePrefLangObj, TENANT_ID);
        }

        async function onNodeSelectionChange(e) {
            navigator.locks.request("my_resource", async (lock) => {
                // The lock has been acquired.
                await ProcessSelectionChange(e);
                // Now the lock will be released.
            });
        }

        async function ProcessSelectionChange(e) {
            // var loader2 = new WUXLoader({
            //     text:"Loading...", 
            //     shape: "spinner"
            // }).inject(prefDiv);
            // loader2.on();
            prefDiv.removeAttribute("data-mep-page-view-load-done-po-use-only");
            //if view exists 
            let appID = e.detail["appId"];
            currentlySelectedAppID = appID;

            let curElementList = document.querySelectorAll('div[class^="me-preference-view-visibility-"]');
            if (curElementList.length > 0) {
                let parent = curElementList[0].parentNode;

                for (let i = 0; i < curElementList.length; i++) {
                    parent.removeChild(curElementList[i]);
                }
            }

            prefDivContent = await createPreferenceView(appID);
            //loader2.off();
            prefDivContent.inject(prefDiv);
            prefDiv.setAttribute("data-mep-page-view-load-done-po-use-only", "");
            let defaultPrefValuesfromPage = mePreferencesPageViewObj.getDefaultValues();
            addDefaultPreferenceInMap(appID, defaultPrefValuesfromPage);
        }

        return mePreferencesMainViewObj;
    });
