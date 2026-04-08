/**
 * @name DS/StudioUIActorModelWeb/extensions/CATE3DText3DGeoVisu
 * @implements {DS/CAT3DExpModel/interfaces/CATI3DGeoVisu}
 * @augments DS/StudioUIActorModelWeb/extensions/CATE3DActor3DGeoVisu
 * @constructor
 *
 * @description
 * CATI3DGeoVisu implementation for CXP3DTextActor_Spec
 */
define("DS/StudioUIActorModelWeb/extensions/CATE3DText3DGeoVisu", [
  "UWA/Core",
  "UWA/Class/Listener",
  "DS/CATCXPModel/extensions/CATE3DActor3DGeoVisu",
  "DS/Visualization/ThreeJS_DS",
  "DS/Visualization/SceneGraphFactory",
  "DS/Visualization/Node3D",
  "DS/SceneGraphNodes/CanvasNode",
  "DS/SceneGraphNodes/CanvasNodeTexture",
  "DS/StudioUIActorModelWeb/interfaces/CATI3DXUIEvents",
], function (
  UWA,
  Listener,
  CATE3DActor3DGeoVisu,
  THREE,
  SceneGraphFactory,
  Node3D,
  CanvasNode,
  CanvasNodeTexture,
  CATI3DXUIEvents,
) {
  "use strict";

  let CATE3DText3DGeoVisu = CATE3DActor3DGeoVisu.extend(
    Listener,
    /** @lends DS/StudioUIActorModelWeb/extensions/CATE3DText3DGeoVisu.prototype **/
    {
      init: function () {
        this._parent();
        this._TextNode = null;
        this._BorderNode = null;
        this._BackgroundNode = null;
        this._name = "";
        this._width = 0;
        this._adjustedWidth = 0;
        this._height = 0;
        this._adjustedHeight = 0;

        this._text = "";
        this._fontSize = 0;
        this._alignment = 0;
        this._textColor = null;
        this._textOpacity = 0;
        this._isItalic = false;
        this._isBold = false;
        this._showBackground = false;
        this._backgroundColor = null;
        this._backgroundOpacity = 0;
        this._showBorder = false;
        this._borderColor = null;
        this._borderOpacity = 0;

        this._opacity = 0;
        this._isVisible = false;
      },

      Dispose: function () {
        this._parent();
        this._unregisterEvents();
        if (this._Node) {
          this._Node.removeChildren();
        }

        this._TextNode = null;
        this._BorderNode = null;
        this._BackgroundNode = null;
        this._name = "";
        this._width = 0;
        this._adjustedWidth = 0;
        this._height = 0;
        this._adjustedHeight = 0;

        this._text = "";
        this._fontSize = 0;
        this._alignment = 0;
        this._textColor = null;
        this._textOpacity = 0;
        this._isItalic = false;
        this._isBold = false;
        this._showBackground = false;
        this._backgroundColor = null;
        this._backgroundOpacity = 0;
        this._showBorder = false;
        this._borderColor = null;
        this._borderOpacity = 0;

        this._opacity = 0;
        this._isVisible = false;
      },

      _Fill: function (iNode3D) {
        this._parent(iNode3D);

        // create Text
        let refreshPropertiesPromise = this._refreshProperties();

        refreshPropertiesPromise.then((expObject) => {
          let self = this;

          self._refreshText();
          // callbacks to refresh visu
          let eventsToListenForRedraw = [
            "text.CHANGED",
            "fontSize.CHANGED",
            "font.CHANGED",
            "italic.CHANGED",
            "bold.CHANGED",
            "alignment.CHANGED",
            "textColor.CHANGED",
            "backgroundColor.CHANGED",
            "borderColor.CHANGED",
          ];
          for (const event of eventsToListenForRedraw) {
            self.listenTo(expObject, event, function () {
              self.frameVisuChanges.push(self._redrawTextFromModel);
              self.RequestVisuRefresh();
            });
          }

          let eventsToListenForRefresh = [
            // '_varposition.CHANGED'	this is handled by CATE3DScene3DGeoVisu
            // 'visible.CHANGED'		this is handled by CATE3DScene3DGeoVisu
            "width.CHANGED",
            "height.CHANGED",
            "textOpacity.CHANGED",
            "showBackground.CHANGED",
            "backgroundOpacity.CHANGED",
            "showBorder.CHANGED",
            "borderOpacity.CHANGED",
          ];
          for (const event of eventsToListenForRefresh) {
            self.listenTo(expObject, event, function () {
              self.frameVisuChanges.push(self._refreshTextFromModel);
              self.RequestVisuRefresh();
            });
          }

          self._registerEvents();
          self.setReady(true);
        });
      },

      _RefreshVisibility: function () {
        let ret = this._parent();

        // Refresh the button visibility from the model
        this.frameVisuChanges.push(this._refreshTextFromModel);
        this.RequestVisuRefresh();

        return ret;
      },

      GetLocalNodes: function () {
        return this._Node;
      },

      _createNode: function (type) {
        let computedOpacity = 1;
        let computedDrawCB = function () {};
        switch (type) {
          case "text":
            computedOpacity = this._textOpacity * (this._opacity / 255);
            computedDrawCB = this._drawTextCanvasTexture.bind(this);
            break;
          case "border":
            computedOpacity = this._borderOpacity * (this._opacity / 255);
            computedDrawCB = this._drawBorderCanvasTexture.bind(this);
            break;
          case "background":
            computedOpacity = this._backgroundOpacity * (this._opacity / 255);
            computedDrawCB = this._drawBackgroundCanvasTexture.bind(this);
            break;
          default:
            return null;
        }

        let NodeTexture = new CanvasNodeTexture({
          width: this._adjustedWidth,
          height: this._adjustedHeight,
          rectangleTexture: true,
          drawCB: computedDrawCB,
          alphaTest: 0,
          materialParams: {
            opacity: computedOpacity,
            depthTest: true,
            depthWrite: true,
			polygonOffset: false
          },
        });
        NodeTexture.maxPow = this.computePow();

        let NodeContainer = new CanvasNode(
          {
            name: "TextNode",
            side: THREE.DoubleSide,
            widthVector: new THREE.Vector3(this._adjustedWidth, 0.0, 0.0),
            heightVector: new THREE.Vector3(0.0, this._adjustedHeight, 0.0),
            bottomLeftcorner: new THREE.Vector3(
              -this._adjustedWidth / 2,
              -this._adjustedHeight / 2,
              0,
            ),
            canvasNodeTexture: NodeTexture,
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
        let bbox = NodeContainer.getBoundingBox();
        NodeContainer.forceBoundingElements(
          true,
          { sphere: bsphere, box: bbox },
          { sphere: bsphere, box: bbox },
        );

        return NodeContainer;
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

      _drawTextCanvasTexture: function (canvasNodeTexture, context, _tick, k) {
        let canvasWidth = context.canvas.width;
        let canvasHeight = context.canvas.height;

        context.scale(1, 1);
        context.setTransform(-1, 0, 0, -1, canvasWidth, canvasHeight);

        let textMarginSizeModel = 10;
        let textMarginRatio = [0, 0];
        textMarginRatio[0] = textMarginSizeModel / this._adjustedWidth;
        textMarginRatio[1] = textMarginSizeModel / this._adjustedHeight;
        let textMarginSizeCanvas = [0, 0];
        textMarginSizeCanvas[0] = canvasWidth * textMarginRatio[0];
        textMarginSizeCanvas[1] = canvasHeight * textMarginRatio[1];

        let fontRatio = this._fontSize / this._adjustedWidth;
        let fontSize = canvasWidth * fontRatio;
        context.font = `${this._isItalic ? "italic" : ""} ${this._isBold ? "bold" : ""} ${fontSize}px sans-serif`;
        let textMetrics = context.measureText(this._text);
        let textSize = [0, 0];
        textSize[0] = textMetrics.width;
        textSize[1] =
          textMetrics.actualBoundingBoxAscent +
          textMetrics.actualBoundingBoxDescent;

        let buttonTotalSizeCanvas = [0, 0];
        buttonTotalSizeCanvas[0] = textSize[0] + textMarginSizeCanvas[0];
        buttonTotalSizeCanvas[1] = textSize[1] + textMarginSizeCanvas[1] * 2;
        let buttonTotalSizeModel = [0, 0];
        buttonTotalSizeModel[0] =
          (buttonTotalSizeCanvas[0] * this._adjustedWidth) / canvasWidth;
        buttonTotalSizeModel[1] =
          (buttonTotalSizeCanvas[1] * this._adjustedHeight) / canvasHeight;
        if (buttonTotalSizeModel[0] > this._adjustedWidth) {
          this._adjustedWidth = buttonTotalSizeModel[0];
          this.frameVisuChanges.push(this._refreshText);
        }
        if (buttonTotalSizeModel[1] > this._adjustedHeight) {
          this._adjustedHeight = buttonTotalSizeModel[1];
          this.frameVisuChanges.push(this._refreshText);
        }

        let textPosition = [];
        if (this._alignment == 0) {
          context.textAlign = "start";
          textPosition[0] = textMarginSizeCanvas[0];
          textPosition[1] = textMarginSizeCanvas[1];
        } else if (this._alignment == 1) {
          context.textAlign = "center";
          textPosition[0] = canvasWidth / 2;
          textPosition[1] = textMarginSizeCanvas[1];
        } else if (this._alignment == 2) {
          context.textAlign = "end";
          textPosition[0] = canvasWidth - textMarginSizeCanvas[0];
          textPosition[1] = textMarginSizeCanvas[1];
        }

        // let textColorObject = {r: Math.ceil(this._textColor.r * 255), g: Math.ceil(this._textColor.g * 255), b: Math.ceil(this._textColor.b * 255), a: Math.ceil(this._textOpacity * 255)};
        let textColorObject = {
          r: Math.ceil(this._textColor.r * 255),
          g: Math.ceil(this._textColor.g * 255),
          b: Math.ceil(this._textColor.b * 255),
          a: 255,
        };
        let textColorCSS = `rgba(${textColorObject.r}, ${textColorObject.g}, ${textColorObject.b}, ${textColorObject.a})`;

        context.fillStyle = textColorCSS;
        context.textBaseline = "top";
        context.fillText(this._text, textPosition[0], textPosition[1]);
      },

      _drawBorderCanvasTexture: function (
        canvasNodeTexture,
        context,
        _tick,
        k,
      ) {
        let canvasWidth = context.canvas.width;
        let canvasHeight = context.canvas.height;

        context.scale(1, 1);
        context.setTransform(-1, 0, 0, -1, canvasWidth, canvasHeight);

        // let borderColorObject = {r: Math.ceil(this._borderColor.r * 255), g: Math.ceil(this._borderColor.g * 255), b: Math.ceil(this._borderColor.b * 255), a: Math.ceil(this._borderOpacity * 255)};
        let borderColorObject = {
          r: Math.ceil(this._borderColor.r * 255),
          g: Math.ceil(this._borderColor.g * 255),
          b: Math.ceil(this._borderColor.b * 255),
          a: 255,
        };
        let borderColorCSS = `rgba(${borderColorObject.r}, ${borderColorObject.g}, ${borderColorObject.b}, ${borderColorObject.a})`;

        context.beginPath();
        context.rect(0, 0, canvasWidth, canvasHeight);
        context.fillStyle = "rgba(0,0,0,0)";
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = borderColorCSS;
        context.stroke();
        context.closePath();
      },

      _drawBackgroundCanvasTexture: function (
        canvasNodeTexture,
        context,
        _tick,
        k,
      ) {
        let canvasWidth = context.canvas.width;
        let canvasHeight = context.canvas.height;

        context.scale(1, 1);
        context.setTransform(-1, 0, 0, -1, canvasWidth, canvasHeight);

        // let backgroundColorObject = {r: Math.ceil(this._backgroundColor.r * 255), g: Math.ceil(this._backgroundColor.g * 255), b: Math.ceil(this._backgroundColor.b * 255), a: Math.ceil(this._backgroundOpacity * 255)};
        let backgroundColorObject = {
          r: Math.ceil(this._backgroundColor.r * 255),
          g: Math.ceil(this._backgroundColor.g * 255),
          b: Math.ceil(this._backgroundColor.b * 255),
          a: 255,
        };
        let backgroundColorCSS = `rgba(${backgroundColorObject.r}, ${backgroundColorObject.g}, ${backgroundColorObject.b}, ${backgroundColorObject.a})`;

        context.beginPath();
        context.rect(0, 0, canvasWidth, canvasHeight);
        context.fillStyle = backgroundColorCSS;
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = "rgba(0,0,0,0)";
        context.stroke();
        context.closePath();
      },

      _refreshTextFromModel: function () {
        let refreshPropertiesPromise = this._refreshProperties();
        refreshPropertiesPromise.then(() => {
          this._refreshText();
        });

        return true;
      },

      _redrawTextFromModel: function () {
        let refreshPropertiesPromise = this._refreshProperties();
        refreshPropertiesPromise.then(() => {
          this._redrawText();
        });

        return true;
      },

      _refreshProperties: async function () {
        let expObject = this.QueryInterface("CATI3DExperienceObject");
        if (!expObject) return false;

        this._name = expObject.GetValueByName("_varName");
        let modelWidth = expObject.GetValueByName("width");
        if (this._width !== modelWidth) {
          this._width = modelWidth;
          this._adjustedWidth = this._width;
        }

        let modelHeight = expObject.GetValueByName("height");
        if (this._height !== modelHeight) {
          this._height = modelHeight;
          this._adjustedHeight = this._height;
        }

        this._text = expObject.GetValueByName("text");
        this._fontSize = expObject.GetValueByName("fontSize");
        this._alignment = expObject.GetValueByName("alignment");
        this._textColor = expObject.GetValueByName("textColor");
        this._textOpacity = expObject.GetValueByName("textOpacity");
        this._isItalic = expObject.GetValueByName("italic");
        this._isBold = expObject.GetValueByName("bold");
        this._showBackground = expObject.GetValueByName("showBackground");
        this._backgroundColor = expObject.GetValueByName("backgroundColor");
        this._backgroundOpacity = expObject.GetValueByName("backgroundOpacity");
        this._showBorder = expObject.GetValueByName("showBorder");
        this._borderColor = expObject.GetValueByName("borderColor");
        this._borderOpacity = expObject.GetValueByName("borderOpacity");

        this._opacity = expObject.GetValueByName("opacity");
        this._isVisible = expObject.GetValueByName("visible");

        return expObject;
      },

      _refreshText: async function () {
        if (UWA.is(this._node3D)) {
          this._node3D.removeChildren();
        }

        if (this._isVisible) {
          if (this._showBackground)
            this._BackgroundNode = this._createNode("background");
          if (this._showBorder) this._BorderNode = this._createNode("border");
          this._TextNode = this._createNode("text");
          this._node3D.addChild(this._BackgroundNode);
          this._node3D.addChild(this._BorderNode);
          this._node3D.addChild(this._TextNode);
          this._node3D.setName(this._name);
        }

        this.RequestVisuRefresh();

        return true;
      },

      _redrawText: async function () {
        if (this._BackgroundNode) this._BackgroundNode.canvasNodeTexture.requestRedraw();
        if (this._BorderNode) this._BorderNode.canvasNodeTexture.requestRedraw();
        if (this._TextNode) this._TextNode.canvasNodeTexture.requestRedraw();
        this.RequestVisuRefresh();

        return true;
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
            },
          );
          this.listenTo(
            actorCATI3DXUIEvents,
            CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIReleaseEvent,
            function () {
              // Callback function to complete if the visu needs to change
            },
          );
          this.listenTo(
            actorCATI3DXUIEvents,
            CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIEnterEvent,
            function () {
              // Callback function to complete if the visu needs to change
            },
          );
          this.listenTo(
            actorCATI3DXUIEvents,
            CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIExitEvent,
            function () {
              // Callback function to complete if the visu needs to change
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

  return CATE3DText3DGeoVisu;
});
