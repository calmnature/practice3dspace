/**
 * @name DS/StudioUIActorModelWeb/extensions/CATE3DButton3DGeoVisu
 * @implements {DS/CAT3DExpModel/interfaces/CATI3DGeoVisu}
 * @augments DS/StudioUIActorModelWeb/extensions/CATE3DActor3DGeoVisu
 * @constructor
 *
 * @description
 * CATI3DGeoVisu implementation for CXP3DButtonActor_Spec
 */
define("DS/StudioUIActorModelWeb/extensions/CATE3DButton3DGeoVisu", [
  "UWA/Core",
  "UWA/Class/Listener",
  "DS/CATCXPModel/extensions/CATE3DActor3DGeoVisu",
  "DS/Visualization/ThreeJS_DS",
  "DS/Visualization/SceneGraphFactory",
  "DS/SceneGraphNodes/CanvasNode",
  "DS/SceneGraphNodes/CanvasNodeTexture",
  "DS/StudioUIActorModelWeb/interfaces/CATI3DXUIEvents",
], function (
  UWA,
  Listener,
  CATE3DActor3DGeoVisu,
  THREE,
  SceneGraphFactory,
  CanvasNode,
  CanvasNodeTexture,
  CATI3DXUIEvents,
) {
  "use strict";

  let CATE3DButton3DGeoVisu = CATE3DActor3DGeoVisu.extend(
    Listener,
    /** @lends DS/StudioUIActorModelWeb/extensions/CATE3DButton3DGeoVisu.prototype **/
    {
      init: function () {
        this._parent();
        this._buttonNode = null;
        this._name = "";
        this._width = 0;
        this._adjustedWidth = 0;
        this._height = 0;
        this._adjustedHeight = 0;
        this._isEnabled = false;
        this._isPressed = false;
        this._isHovered = false;
        this._displayState = "";

        this._label = "";
        this._fontSize = 0;
        this._icon = null;
        this._isPushable = false;
        this._isPushed = false;

        this._opacity = 0;
        this._isVisible = false;
      },

      Dispose: function () {
        this._parent();
        this._unregisterEvents();
        if (this._buttonNode) {
          this._buttonNode.removeChildren();
        }

        this._buttonNode = null;
        this._name = "";
        this._width = 0;
        this._adjustedWidth = 0;
        this._height = 0;
        this._adjustedHeight = 0;
        this._isEnabled = false;
        this._isPressed = false;
        this._isHovered = false;
        this._displayState = "";

        this._label = "";
        this._fontSize = 0;
        this._icon = null;
        this._isPushable = false;
        this._isPushed = false;

        this._opacity = 0;
        this._isVisible = false;
      },

      _Fill: function (iNode3D) {
        this._parent(iNode3D);

        // create button
        let refreshPropertiesPromise = this._refreshProperties();

        refreshPropertiesPromise.then((expObject) => {
          let self = this;

          self._refreshButton();
          // callbacks to refresh visu
          let eventsToListenForRedraw = [
            "enabled.CHANGED",
            "label.CHANGED",
            "fontSize.CHANGED",
            "pushable.CHANGED",
            "pushed.CHANGED",
            "icon.CHANGED",
            "iconDimension.CHANGED",
          ];

          for (const event of eventsToListenForRedraw) {
            this.listenTo(expObject, event, function () {
              self.frameVisuChanges.push(self._redrawButtonFromModel);
              self.RequestVisuRefresh();
            });
          }

          let eventsToListenForRefresh = ["width.CHANGED", "height.CHANGED"];

          for (const event of eventsToListenForRefresh) {
            this.listenTo(expObject, event, function () {
              self.frameVisuChanges.push(self._refreshButtonFromModel);
              self.RequestVisuRefresh();
            });
          }

          this._registerEvents();
          this.setReady(true);
        });
      },

      _RefreshVisibility: function () {
        let ret = this._parent();

        // Refresh the button visibility from the model
        this.frameVisuChanges.push(this._refreshButtonFromModel);
        this.RequestVisuRefresh();

        return ret;
      },

      GetLocalNodes: function () {
        return this._buttonNode;
      },

      _createButton: function () {
        let buttonTexture = new CanvasNodeTexture({
          width: this._adjustedWidth,
          height: this._adjustedHeight,
          rectangleTexture: true,
          drawCB: this._drawCanvasTexture.bind(this),
          alphaTest: 0,
          materialParams: {
            opacity: this._opacity / 255,
            depthTest: true,
            depthWrite: true,
			polygonOffset: false
          },
        });
        buttonTexture.maxPow = this.computePow();

        let buttonContainer = new CanvasNode(
          {
            name: this._name,
            side: THREE.DoubleSide,
            widthVector: new THREE.Vector3(this._adjustedWidth, 0.0, 0.0),
            heightVector: new THREE.Vector3(0.0, this._adjustedHeight, 0.0),
            bottomLeftcorner: new THREE.Vector3(
              -this._adjustedWidth / 2,
              -this._adjustedHeight / 2,
              0,
            ),
            canvasNodeTexture: buttonTexture,
          },
          SceneGraphFactory,
        );

        let bsphere = new THREE.Sphere();
        bsphere.center = new THREE.Vector3(
          this._adjustedWidth / 2,
          this._adjustedHeight / 2,
          0,
        ); //need to re-center it (as it is offset above but idk why?)
        bsphere.radius = Math.sqrt(
          Math.pow(this._adjustedWidth * 0.5, 2) +
            Math.pow(this._adjustedHeight * 0.5, 2),
        );
        let bbox = buttonContainer.getBoundingBox();
        buttonContainer.forceBoundingElements(
          true,
          { sphere: bsphere, box: bbox },
          { sphere: bsphere, box: bbox },
        );

        return buttonContainer;
      },

      computePow: function () {
        // Defaut limit used by xHighlight for the texture of their main Canvas Node
        let maxSize = Math.pow(2048, 2);

        // Agorithm used by xHighlight to compute the maxPow value
        return (
          Math.log(maxSize / (this._adjustedWidth * this._adjustedHeight)) /
          (2 * Math.log(2))
        );
      },

      _drawCanvasTexture: function (canvasNodeTexture, context, _tick, k) {
        let canvasWidth = context.canvas.width;
        let canvasHeight = context.canvas.height;

        context.scale(1, 1);
        context.setTransform(-1, 0, 0, -1, canvasWidth, canvasHeight);

        let labelMarginSizeModel = [20, 20];
        let labelMarginRatio = [0, 0];
        labelMarginRatio[0] = labelMarginSizeModel[0] / this._adjustedWidth;
        labelMarginRatio[1] = labelMarginSizeModel[1] / this._adjustedHeight;
        let textMarginSizeCanvas = [0, 0];
        textMarginSizeCanvas[0] = canvasWidth * labelMarginRatio[0];
        textMarginSizeCanvas[1] = canvasHeight * labelMarginRatio[1];

        let iconSizeCanvas = [0, 0];
        let iconMarginSizeCanvas = [0, 0];
        let labelStartPosition = 0;
        if (this._icon) {
          let iconSizeModel = [0, 0];
          iconSizeModel[0] = this._icon.dimension[0];
          iconSizeModel[1] = this._icon.dimension[1];

          // Update of the margin using the icon size
          let iconMarginSizeModel = [
            10,
            (this._adjustedHeight - iconSizeModel[1]) / 2,
          ];
          let iconMarginRatio = [0, 0];
          iconMarginRatio[0] = iconMarginSizeModel[0] / this._adjustedWidth;
          iconMarginRatio[1] = iconMarginSizeModel[1] / this._adjustedHeight;
          iconMarginSizeCanvas[0] = canvasWidth * iconMarginRatio[0];
          iconMarginSizeCanvas[1] = canvasHeight * iconMarginRatio[1];

          let iconRatio = [0, 0];
          iconRatio[0] = iconSizeModel[0] / this._adjustedWidth;
          iconRatio[1] = iconSizeModel[1] / this._adjustedHeight;
          iconSizeCanvas[0] = canvasWidth * iconRatio[0];
          iconSizeCanvas[1] = canvasHeight * iconRatio[1];

          labelStartPosition =
            (canvasWidth + iconSizeCanvas[0] + iconMarginSizeCanvas[0] * 2) / 2;
        } else {
          labelStartPosition = canvasWidth / 2;
        }

        let fontRatio = this._fontSize / this._adjustedWidth;
        let fontSize = canvasWidth * fontRatio;
        context.font = `${fontSize}px sans-serif`;
        let labelMetrics = context.measureText(this._label);
        let labelSize = [0, 0];
        labelSize[0] = labelMetrics.width;
        labelSize[1] =
          labelMetrics.actualBoundingBoxAscent +
          labelMetrics.actualBoundingBoxDescent;

        let buttonTotalSizeCanvas = [0, 0];
        buttonTotalSizeCanvas[0] =
          iconSizeCanvas[0] +
          iconMarginSizeCanvas[0] * 2 +
          (labelSize[0] + textMarginSizeCanvas[0]);
        buttonTotalSizeCanvas[1] = Math.max(
          iconSizeCanvas[1] + iconMarginSizeCanvas[1] * 2,
          labelSize[1] + textMarginSizeCanvas[1] * 2,
        );
        let buttonTotalSizeModel = [0, 0];
        buttonTotalSizeModel[0] =
          (buttonTotalSizeCanvas[0] * this._adjustedWidth) / canvasWidth;
        buttonTotalSizeModel[1] =
          (buttonTotalSizeCanvas[1] * this._adjustedHeight) / canvasHeight;
        if (buttonTotalSizeModel[0] > this._adjustedWidth) {
          this._adjustedWidth = buttonTotalSizeModel[0];
          this.frameVisuChanges.push(this._refreshButton);
        }
        if (buttonTotalSizeModel[1] > this._adjustedHeight) {
          this._adjustedHeight = buttonTotalSizeModel[1];
          this.frameVisuChanges.push(this._refreshButton);
        }

        let backgroundColor = "#EDEEEE";
        if (!this._isEnabled) {
          backgroundColor = "#F0F0F0";
        } else if (this._isHovered) {
          if (this._isPressed) {
            backgroundColor = "#CCD0D0";
          } else if (this._isPushed) {
            backgroundColor = "#CFE4EF";
          } else {
            backgroundColor = "#DFE1E0";
          }
        } else if (this._isPushed) {
          backgroundColor = "#CFE4EF";
        }
        let labelColor = "#3D3D3D";
        if (!this._isEnabled) {
          labelColor = "#979797";
        } else if (this._isPushed) {
          if (!this._isHovered) {
            labelColor = "#005686";
          }
        }

        context.beginPath();
        context.rect(0, 0, canvasWidth, canvasHeight);
        context.fillStyle = backgroundColor;
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = "#000000";
        context.stroke();
        context.closePath();

        if (this._icon) {
          context.drawImage(
            this._icon.texture,
            iconMarginSizeCanvas[0],
            iconMarginSizeCanvas[1],
            iconSizeCanvas[0],
            iconSizeCanvas[1],
          );
        }

        context.fillStyle = labelColor;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(this._label, labelStartPosition, canvasHeight / 2);
      },

      _refreshButtonFromModel: function () {
        let refreshPropertiesPromise = this._refreshProperties();
        refreshPropertiesPromise.then(() => {
          this._refreshButton();
        });

        return true;
      },

      _redrawButtonFromModel: function () {
        let refreshPropertiesPromise = this._refreshProperties();
        refreshPropertiesPromise.then(() => {
          this._redrawButton();
        });

        return true;
      },

      _refreshProperties: async function () {
        let expObject = this.QueryInterface("CATI3DExperienceObject");
        if (!expObject) return false;

        this._name = expObject.GetValueByName("_varName");
        let modelWidth = expObject.GetValueByName("width");
        let modelHeight = expObject.GetValueByName("height");

        if (this._width !== modelWidth) {
          this._width = modelWidth;
          this._adjustedWidth = this._width;
        }

        if (this._height !== modelHeight) {
          this._height = modelHeight;
          this._adjustedHeight = this._height;
        }

        this._isEnabled = expObject.GetValueByName("enabled");
        this._isPushable = expObject.GetValueByName("pushable");
        this._isPushed = expObject.GetValueByName("pushed");

        this._label = expObject.GetValueByName("label");
        this._fontSize = expObject.GetValueByName("fontSize");

        let iconObject = expObject.GetValueByName("icon");
        if (iconObject) {
          let iconTextureAsset = iconObject.QueryInterface(
            "CATI3DXPictureResourceAsset",
          );
          if (iconTextureAsset) {
            let iconTexture = await iconTextureAsset.getPicture();
            if (iconTexture) {
              let iconDimension = [0, 0];
              let iconDimensionObject = expObject
                .GetValueByName("iconDimension")
                .QueryInterface("CATI3DExperienceObject");
              if (iconDimensionObject) {
                iconDimension[0] = iconDimensionObject.GetValueByName("x");
                iconDimension[1] = iconDimensionObject.GetValueByName("y");

                if (iconDimension[0] > this._adjustedWidth) {
                  this._adjustedWidth = iconDimension[0];
                } else if (iconDimension[1] > this._adjustedHeight) {
                  this._adjustedHeight = iconDimension[1];
                }
              }
              this._icon = {
                texture: iconTexture,
                dimension: iconDimension,
              };
            }
          }
        }

        this._opacity = expObject.GetValueByName("opacity");
        this._isVisible = expObject.GetValueByName("visible");

        return expObject;
      },

      _refreshButton: function () {
        if (UWA.is(this._buttonNode)) {
          this._node3D.removeChild(this._buttonNode);
        }

        if (this._isVisible) {
          this._buttonNode = this._createButton();
          this._buttonNode.setName(this._name);
          this._node3D.addChild(this._buttonNode);
        }

        this.RequestVisuRefresh();

        return true;
      },

      _redrawButton: function () {
        if (this._buttonNode)
          this._buttonNode.canvasNodeTexture.requestRedraw();
        this.RequestVisuRefresh();

        return true;
      },

      _updatePushedState: function () {
        let expObject = this.QueryInterface("CATI3DExperienceObject");
        if (!expObject) return false;

        if (this._isPushable) {
          this._isPushed = !this._isPushed;
          expObject.SetValueByName("pushed", this._isPushed);
        }
      },

      _registerEvents: function () {
        let _this = this;

        let actorCATI3DXUIEvents = this.QueryInterface(
          CATI3DXUIEvents.interfaceName,
        );
        if (actorCATI3DXUIEvents) {
          this.listenTo(
            actorCATI3DXUIEvents,
            CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUILeftClickEvent,
            function () {
              // Callback function to complete if the visu needs to change
            },
          );
          this.listenTo(
            actorCATI3DXUIEvents,
            CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIRightClickEvent,
            function () {
              // Callback function to complete if the visu needs to change
            },
          );
          this.listenTo(
            actorCATI3DXUIEvents,
            CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIDoubleClickEvent,
            function () {
              // Callback function to complete if the visu needs to change
            },
          );
          this.listenTo(
            actorCATI3DXUIEvents,
            CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIPressEvent,
            function () {
              // Callback function to complete if the visu needs to change
              if (!_this._isPressed) {
                _this._isPressed = true;
                _this.frameVisuChanges.push(_this._refreshButton);
                _this.RequestVisuRefresh();
              }
            },
          );
          this.listenTo(
            actorCATI3DXUIEvents,
            CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIReleaseEvent,
            function () {
              // Callback function to complete if the visu needs to change
              if (_this._isPressed && _this._isHovered) {
                _this._isPressed = false;
                _this._updatePushedState();
                _this.frameVisuChanges.push(_this._refreshButton);
                _this.RequestVisuRefresh();
              }
            },
          );
          this.listenTo(
            actorCATI3DXUIEvents,
            CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIEnterEvent,
            function () {
              // Callback function to complete if the visu needs to change
              if (!_this._isHovered) {
                _this._isHovered = true;
                _this.frameVisuChanges.push(_this._refreshButton);
                _this.RequestVisuRefresh();
              }
            },
          );
          this.listenTo(
            actorCATI3DXUIEvents,
            CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIExitEvent,
            function () {
              // Callback function to complete if the visu needs to change
              if (_this._isHovered) {
                _this._isHovered = false;
                _this._isPressed = false;
                _this.frameVisuChanges.push(_this._refreshButton);
                _this.RequestVisuRefresh();
              }
            },
          );
          this.listenTo(
            actorCATI3DXUIEvents,
            CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIHoverEvent,
            function () {
              // Callback function to complete if the visu needs to change
            },
          );
        }
      },

      _unregisterEvents: function () {
        this.stopListening();
      },
    },
  );

  return CATE3DButton3DGeoVisu;
});
