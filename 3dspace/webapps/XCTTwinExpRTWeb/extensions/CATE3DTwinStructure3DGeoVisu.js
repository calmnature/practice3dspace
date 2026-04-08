/**
 * @name DS/XCTTwinExpRTWeb/extensions/CATE3DTwinStructure3DGeoVisu
 * @implements {DS/CAT3DExpModel/interfaces/CATI3DGeoVisu}
 * @augments DS/CATCXPModel/extensions/CATE3DActor3DGeoVisu
 * @constructor
 *
 * @description
 * CATI3DGeoVisu implementation for XCTTwinStructureActor_Spec
 */
define("DS/XCTTwinExpRTWeb/extensions/CATE3DTwinStructure3DGeoVisu", [
    "UWA/Core",
    "DS/CATCXPModel/extensions/CATE3DActor3DGeoVisu"
], function (UWA, CATE3DActor3DGeoVisu) {
    "use strict";

    var CATE3DTwinStructure3DGeoVisu = CATE3DActor3DGeoVisu.extend(
        /** @lends DS/XCTTwinExpRTWeb/extensions/CATE3DTwinStructure3DGeoVisu.prototype **/
        {
            init: function () {
                this._parent();
                this._prevGeometries = undefined;
                this._prevActorNames = undefined;
            },

            Build: function () {
                this._parent();

                const experienceObject = this.QueryInterface("CATI3DExperienceObject");

                if (!experienceObject) { return; }

                this._prevGeometries = new Set(experienceObject.GetValueByName("geometries"));

                const actors = experienceObject.GetValueByName("actors");


                this._prevActorNames = new Set(
                    actors.map(actor =>
                        actor.QueryInterface("CATI3DExperienceObject").GetValueByName("_varName")
                    )
                );

            },

            _Fill: function (iNode3D) {
                this._parent(iNode3D);

                this.listenTo(
                    this.QueryInterface("CATI3DExperienceObject"),
                    "geometries.CHANGED",
                    () => {
                        this.frameVisuChanges.push(this._refreshTwinGeometries);
                        this.RequestVisuRefresh();
                    }
                );

                this.frameVisuChanges.push(this._refreshTwinGeometries);
                this.RequestVisuRefresh();
            },

            _refreshTwinGeometries: function () {
                const experienceObject = this.QueryInterface("CATI3DExperienceObject");

                const currentNodes = new Set(
                    experienceObject
                        .GetValueByName("geometries")
                        .map(geo =>
                            geo.QueryInterface("CATI3DGeoVisu").GetNode()
                        )
                );

                // Remove old geometries
                this._prevGeometries.forEach(node => {
                    if (!currentNodes.has(node)) {
                        this._node3D.remove(node);
                        this._prevGeometries.delete(node);
                    }
                });

                // Add new geometries
                currentNodes.forEach(node => {
                    if (!this._prevGeometries.has(node)) {
                        this._node3D.addChild(node);
                        this._prevGeometries.add(node);
                    }
                });

                this.setReady(true);
            },

            _refreshChildrenNodes: function () {
                //assume no render required unless new node requested
                var requestRender = false;

                //retrieve Visu Nodes
                const _node3DChildren = this._node3D.getChildren();

                //children with IDs
                let currentNodes = new Map();
                _node3DChildren.forEach(child => currentNodes.set(child.id, child));

                let experienceChildrenToAdd = new Map();

                const local = this.GetLocalNodes();

                //experience node exists
                if (local) {
                    experienceChildrenToAdd.set(local.id, local);
                }

                //get all experience child nodes
                const subActors = this.QueryInterface('CATI3DExperienceObject').GetValueByName('actors');
                if (UWA.is(subActors)) {
                    for (var i = 0; i < subActors.length; i++) {
                        var geoVisu = subActors[i].QueryInterface('CATI3DGeoVisu');
                        if (UWA.is(geoVisu)) {
                            var childNode = geoVisu.GetNode();
                            experienceChildrenToAdd.set(childNode.id, childNode);
                        }
                    }
                }

                if (currentNodes.size > 0) {
                    for (const key of currentNodes.keys()) {
                        //already have it, delete duplicate
                        if (experienceChildrenToAdd.get(key)) {
                            experienceChildrenToAdd.delete(key);
                        } else {
                            if (this._prevGeometries.has(currentNodes.get(key))) { continue; } // Skip geometries
                            this._node3D.removeChild(currentNodes.get(key));
                            requestRender = true;
                        }
                    }
                }

                if (experienceChildrenToAdd.size > 0) {
                    requestRender = true;
                    for (const value of experienceChildrenToAdd.values()) {
                        this._node3D.addChild(value);
                    }
                }

                return requestRender;
            },

            _isAllChildrenReady: function () {
                if (!this._parent()) { return false; }

                const geometries = this.QueryInterface("CATI3DExperienceObject").GetValueByName("geometries");

                for (let i = 0; i < geometries.length; i++) {
                    if (!geometries[i].QueryInterface('CATI3DGeoVisu').isReady()) {
                        return false;
                    }
                }

                return true;
            }

        }
    ); // end of CATE3DTwinStructure3DGeoVisu

    return CATE3DTwinStructure3DGeoVisu;
});
