/* eslint no-console: ["error", { allow: ["warn"] }] */
/**
 * @name DS/XCTTwinExpRTWeb/extensions/CATE3DTwinGeometry3DGeoVisu
 * @implements {DS/CAT3DExpModel/interfaces/CATI3DGeoVisu}
 * @augments DS/CATCXPModel/extensions/CATE3DScene3DGeoVisu
 * @constructor
 *
 * @description
 * CATI3DGeoVisu implementation for XCTTwinGeometryObject_Spec
 */
define("DS/XCTTwinExpRTWeb/extensions/CATE3DTwinGeometry3DGeoVisu", [
    "UWA/Core",
    "DS/CATCXPModel/extensions/CATE3DScene3DGeoVisu"
], function (UWA, CATE3DScene3DGeoVisu) {
    "use strict";

    var CATE3DTwinGeometry3DGeoVisu = CATE3DScene3DGeoVisu.extend(
        /** @lends DS/XCTTwinExpRTWeb/extensions/CATE3DTwinGeometry3DGeoVisu.prototype **/
        {
            init: function () {
                this._parent();
                this._modelLoaded = false;
            },

            Dispose: function () {
                this._parent();
                this._modelLoaded = false;
            },

            _Fill: function (iNode3D) {
                this._parent(iNode3D);
                this._LoadAsset();
            },
            
            _LoadAsset: function () {
                try {
                    this.QueryInterface('CATI3DX3DActorAsset').getNode3D().then((iAssetNode) => {
                        this._node3D.addChild(iAssetNode);
                        this.RequestVisuRefresh();
                        this._modelLoaded = true;
                        this.setReady(true);
                    })['catch']((e) => {
                        this._modelLoaded = true;
                        this.setReady(true);
                        console.warn("[WARN] Node3D issue: " + e);
                        console.warn("[WARN] Issue occurred on " + this.QueryInterface("CATI3DExperienceObject").GetPathOfIds().toString());
                    });
                } catch (e) {
                    console.warn("[WARN] CATE3DTwinGeometry3DGeoVisu asset not loaded: " + this.QueryInterface("CATI3DExperienceObject").GetPathOfIds().toString());
                    console.warn(e);
                }
                return this._node3D;
            },


            isReady: function () {
                return this._parent() && this._modelLoaded;
            }
        }
    ); // end of CATE3DTwinGeometry3DGeoVisu

    return CATE3DTwinGeometry3DGeoVisu;
});
