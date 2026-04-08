/**
* @quickReview A97 25:02:19 : Creation
* @quickReview A97 25:02:20 : Handled SpatialDoubleTapEvent
* @quickReview A97 25:03:07 : Handled drag with left hand
* @quickReview A97 25:03:26 : Reset position on double right click. Events on start and end of Drag
* @quickReview A97 25:03:26 : Removed unused variables
* @quickReview A97 25:03:27 : Code cleanup
* @quickReview A97 25:03:28 : Event dispatch on Position reset
* @quickReview A97 25:04:08 : New method to get position from mouse event
* @quickReview A97 25:04:14 : New method delivered by XCT for removing highlight of actor
* @quickReview A97 25:05:13 : IR-1396087 : Constraints are not respected in 3DPlay MUC
* @quickReview A97 25:08:08 : IR-1435517 : Parts jump to new location on slightest movement in DSXM web play
* @quickReview A97 25:08:14 : IR-1419170 : Double pinch on a fix part fix all parts together
* @quickReview A97 25:09:17 : IR-1440169 : Refactored the code.
* @quickReview A97 26:01:19 : FUN162248 : Integration Move Under Constraint in 3DExcite Creative App
* @quickReview A97 26:01:22 : FUN162248 : Removed console logs
*/

define("DS/CXPAssemblyStudioMuC/StuMoveUnderConstraintsBe", [
  "DS/StuCore/StuContext",
  "DS/StuModel/StuBehavior",
  "DS/EP/EP",
  "DS/EPEventServices/EPEvent",
  "DS/MathematicsES/MathsDef",
  "DS/StuRenderEngine/StuActor3D",
  'DS/StuRenderEngine/StuSubProductActor',
  "DS/CXPAssemblyStudioMuCEngine/StuMoveUnderConstraintsManager",
  "DS/EPInputs/EPMousePressEvent",
  "DS/EPInputs/EPMouseMoveEvent",
  "DS/EPInputs/EPMouseClickEvent",
  "DS/EPInputs/EPMouseReleaseEvent",
  "DS/StuCameras/StuInputManager",
  "DS/StuClickable/StuSpatialDoubleTapEvent"
], function (
  STU,
  StuBehavior,
  EP,
  EPEvent,
  MathsDef,
  StuActor3D,
  StuSubProductActor) {
  "use strict";

  /**
   * Behavior that permit to make actors respect constraints when dragged
   *
   * @exports MoveUnderConstraints
   * @extends {STU.Behavior}
   * @memberof STU
   * @alias STU.MoveUnderConstraints
   */
  var MoveUnderConstraints = function () {
    StuBehavior.call(this);
    this.name = "MoveUnderConstraints";

    //==============================================================================
    // Properties that should NOT be visible in UI
    //==============================================================================
    this._MuCManager = null;
    this._grabbedActor = null;
    this._fixedActor = null;
    this._dragStarted = false;
    this._count = 0;
    this._rightHandPosInitial = null;
    this._leftHandPosInitial = null;
    this._rightHandPos = null;
    this._leftHandPos = null;
    this._lastLeftDeviceMoveEvent = null;
    this._lastRightDeviceMoveEvent = null;
    this._currentTrackerName = null;
    //console.log(`${++this._count} : MoveUnderConstraintsBe | constructor`);
  };

  //==============================================================================
  // MoveUnderConstraints::MoveUnderConstraints
  //==============================================================================
  MoveUnderConstraints.prototype = new StuBehavior();
  MoveUnderConstraints.prototype.constructor = MoveUnderConstraints;

  /**
  * This event is thrown when MuC has started
  * @public
  * @extends EP.Event
  * @memberof STU
  */
  var MoveUnderConstraintStartedEvent = function () {
    EPEvent.call(this);
  };

  MoveUnderConstraintStartedEvent.prototype = new EPEvent();
  MoveUnderConstraintStartedEvent.prototype.constructor = MoveUnderConstraintStartedEvent;
  MoveUnderConstraintStartedEvent.prototype.type = 'MoveUnderConstraintStartedEvent';

  // Expose in STU namespace.
  STU.MoveUnderConstraintStartedEvent = MoveUnderConstraintStartedEvent;
  EP.EventServices.registerEvent(MoveUnderConstraintStartedEvent);

  /**
  * This event is thrown when MuC has ended
  * @public
  * @extends EP.Event
  * @memberof STU
  */
  var MoveUnderConstraintEndedEvent = function () {
    EPEvent.call(this);
  };

  MoveUnderConstraintEndedEvent.prototype = new EPEvent();
  MoveUnderConstraintEndedEvent.prototype.constructor = MoveUnderConstraintEndedEvent;
  MoveUnderConstraintEndedEvent.prototype.type = 'MoveUnderConstraintEndedEvent';

  // Expose in STU namespace.
  STU.MoveUnderConstraintEndedEvent = MoveUnderConstraintEndedEvent;
  EP.EventServices.registerEvent(MoveUnderConstraintEndedEvent);

  /**
  * This event is thrown when MuC has ended
  * @public
  * @extends EP.Event
  * @memberof STU
  */
  var MoveUnderConstraintPositionResetEvent = function () {
    EPEvent.call(this);
  };

  MoveUnderConstraintPositionResetEvent.prototype = new EPEvent();
  MoveUnderConstraintPositionResetEvent.prototype.constructor = MoveUnderConstraintPositionResetEvent;
  MoveUnderConstraintPositionResetEvent.prototype.type = 'MoveUnderConstraintPositionResetEvent';

  // Expose in STU namespace.
  STU.MoveUnderConstraintPositionResetEvent = MoveUnderConstraintPositionResetEvent;
  EP.EventServices.registerEvent(MoveUnderConstraintPositionResetEvent);
  //==============================================================================
  // MoveUnderConstraints::resetPosition
  //==============================================================================
  MoveUnderConstraints.prototype.resetPosition = function () {
    //console.log(`${++this._count} MoveUnderConstraintsBe : resetPosition `);

    let rc = false;
    if (this._MuCManager) {
      this._MuCManager.resetPosition();
      rc = true;

      let evtMuCPosReset = new MoveUnderConstraintPositionResetEvent();
      if (evtMuCPosReset) {
        this.dispatchEvent(evtMuCPosReset);
      }
    }

    return rc;
  };

  //==============================================================================
  // MoveUnderConstraints::onActivate
  //==============================================================================
  MoveUnderConstraints.prototype.onActivate = function (oExceptions) {
    STU.Behavior.prototype.onActivate.call(this, oExceptions);

    //console.log(`${++this._count} MoveUnderConstraintsBe : onActivate `);

    EP.EventServices.addObjectListener(EP.MouseDoubleClickEvent, this, "onMouseDoubleClickEvent");
    EP.EventServices.addObjectListener(EP.MousePressEvent, this, "onMousePressEvent");
    EP.EventServices.addObjectListener(EP.MouseMoveEvent, this, "onMouseMoveEvent");
    EP.EventServices.addObjectListener(EP.MouseReleaseEvent, this, "onMouseReleaseEvent");

    EP.EventServices.addObjectListener(STU.SpatialDoubleTapEvent, this, 'onSpatialDoubleTapEvent');
    EP.EventServices.addObjectListener(EP.DevicePressEvent, this, 'onDevicePressEvent');
    EP.EventServices.addObjectListener(EP.DeviceTrackerEvent, this, 'onDeviceMoveEvent');
    EP.EventServices.addObjectListener(EP.DeviceReleaseEvent, this, 'onDeviceReleaseEvent');

    this._MuCManager = new STU.MoveUnderConstraintsManager();
    if (this._MuCManager === undefined || this._MuCManager === null) {
      console.log(`${++this._count} : MoveUnderConstraints::onActivate | _MuCManager creation failed `);
      return this;
    }
    this._MuCManager.initialize();
    this._MuCManager.storeActorInitialPositions();
  };

  //==============================================================================
  // MoveUnderConstraints::onDeactivate
  //==============================================================================
  MoveUnderConstraints.prototype.onDeactivate = function () {
    // console.log(`${++this._count} : onDeactivate `);

    if (this._MuCManager) {
      this._MuCManager.dispose();
      this._MuCManager = null;
    }

    this._grabbedActor = null;
    this._fixedActor = null;
    this._dragStarted = false;
    this._count = 0;
    this._rightHandPosInitial = null;
    this._leftHandPosInitial = null;
    this._rightHandPos = null;
    this._leftHandPos = null;
    this._lastLeftDeviceMoveEvent = null;
    this._lastRightDeviceMoveEvent = null;
    this._currentTrackerName = null;

    // Remove Listener when you don't need it anymore
    EP.EventServices.removeObjectListener(EP.MouseDoubleClickEvent, this, "onMouseDoubleClickEvent");
    EP.EventServices.removeObjectListener(EP.MousePressEvent, this, "onMousePressEvent");
    EP.EventServices.removeObjectListener(EP.MouseMoveEvent, this, "onMouseMoveEvent");
    EP.EventServices.removeObjectListener(EP.MouseReleaseEvent, this, "onMouseReleaseEvent");

    EP.EventServices.removeObjectListener(STU.SpatialDoubleTapEvent, this, 'onSpatialDoubleTapEvent');
    EP.EventServices.removeObjectListener(EP.DevicePressEvent, this, 'onDevicePressEvent');
    EP.EventServices.removeObjectListener(EP.DeviceTrackerEvent, this, 'onDeviceMoveEvent');
    EP.EventServices.removeObjectListener(EP.DeviceReleaseEvent, this, 'onDeviceReleaseEvent');

    STU.Behavior.prototype.onDeactivate.call(this);
  };

  //==============================================================================
  // MoveUnderConstraints::_toggleFixedState
  //==============================================================================
  MoveUnderConstraints.prototype._toggleFixedState = function (iActor, bFixActor) {
    let obFixToggled = false;

    // IR-1419170: Return success or failure of fixActorTemporarily
    if (this._MuCManager) {
      obFixToggled = this._MuCManager.fixActorTemporarily(iActor, bFixActor);
    }

    return obFixToggled;
  }

  //==============================================================================
  // MoveUnderConstraints::_manageToggleFixState
  //==============================================================================
  MoveUnderConstraints.prototype._manageToggleFixState = function (iActor) {

    if (this._MuCManager && iActor) {
      let bFixActor = true;

      const sActorIDPath = this._MuCManager._getPathOfActor(iActor);

      // Remove highlight of previously fixed actor and unfix it.
      if (this._fixedActor) {
        const sFixedActorIDPath = this._MuCManager._getPathOfActor(this._fixedActor);

        // IR-1435517: Use path of IDs to compare actors instead of only its ID.
        // Fix the input actor only if it is different from the currenlty fixed. 
        // If they are the same, Unfix.
        if (this._MuCManager.isPathSame(sFixedActorIDPath, sActorIDPath))
          bFixActor = false;

        // IR-1419170: Unfix existing fixed actor.
        // Remove highlight only if unfix succeeds.
        if (this._toggleFixedState(this._fixedActor, false)) {
          this._highlightActor(this._fixedActor, false);
          this._fixedActor = null;
        }
      }

      if (bFixActor) {
        // Fix the new actor.
        // IR-1419170: _toggleFixedState can fail if the actor has a Fix constraint on it. 
        // So highlight the actor and store it as fixed only if fixing succeedes.
        if (this._toggleFixedState(iActor, true)) {
          this._fixedActor = iActor;
          this._highlightActor(this._fixedActor, true);
        }
      }
    }

  }

  //==============================================================================
  // MoveUnderConstraints::onMouseDoubleClickEvent
  //==============================================================================
  MoveUnderConstraints.prototype.onMouseDoubleClickEvent = function (iMouseDoubleClickEvent) {
    //console.log(`${++this._count} : MoveUnderConstraints Be :: onMouseDoubleClickEvent `);

    if (iMouseDoubleClickEvent) {
      if (iMouseDoubleClickEvent.button === 2) {
        //console.log(`${++this._count} : onMouseDoubleClickEvent | resetPosition `);
        this.resetPosition();
      }
      else {
        let actorGrabbed = this._getGrabbedActor(iMouseDoubleClickEvent);
        if (actorGrabbed) {
          this._manageToggleFixState(actorGrabbed);
        }
      }
    }

  };

  //==============================================================================
  // MoveUnderConstraints::onMousePressEvent
  //==============================================================================
  MoveUnderConstraints.prototype.onMousePressEvent = function (iMousePressEvent) {
    //console.log(`${++this._count} : MoveUnderConstraints Be :: onMousePressEvent `);

    this._grabbedActor = this._getGrabbedActor(iMousePressEvent);
    if (this._grabbedActor) {
      this._highlightActor(this._grabbedActor, true);
      this._dragStarted = true;

      let evtMuCStarted = new MoveUnderConstraintStartedEvent();
      if (evtMuCStarted) {
        this.dispatchEvent(evtMuCStarted);
      }

      if (this._MuCManager) {
        // For Pick point manip. But works only with mouse events on webplayer and not on AVP
        // let ptIntersection = this._getIntersectionPoint(iMousePressEvent);
        // this._MuCManager.setGrabbedActor(this._grabbedActor, ptIntersection);

        let sManagerType = this._MuCManager.getManagerType();

        // IR-1396087: BBox manip
        this._MuCManager.setGrabbedActor(this._grabbedActor, null, sManagerType);
      }
    }
  };

  //==============================================================================
  // MoveUnderConstraints::onSpatialDoubleTapEvent
  //==============================================================================
  MoveUnderConstraints.prototype.onSpatialDoubleTapEvent = function (iSpatialDoubleTapEvent) {
    //console.log(`${++this._count} : MoveUnderConstraints Be :: onSpatialDoubleTapEvent `);

    let actorGrabbed = iSpatialDoubleTapEvent.actor;
    if (actorGrabbed) {
      this._manageToggleFixState(actorGrabbed);
    }
    else {
      console.log(`${++this._count} : onSpatialDoubleTapEvent | actor not retrieved `);
    }

  };

  //==============================================================================
  // MoveUnderConstraints::onDevicePressEvent
  //==============================================================================
  MoveUnderConstraints.prototype.onDevicePressEvent = function (iDevicePressEvent) {
    //console.log(`${++this._count} : MoveUnderConstraints Be :: onDevicePressEvent `);

    // When drag is going on with a tracker, (current tracker already set), dont store a new one.
    if (this._dragStarted === false) {
      let clickedActor = iDevicePressEvent.actor;
      if (clickedActor) {
        let bValidTracker = false;
        if (iDevicePressEvent.trackerName === "controllerTracker_1") {
          this._leftHandPosInitial = null;
          this._currentTrackerName = "controllerTracker_1";
          this._rightHandPosInitial = this._rightHandPos;
          bValidTracker = true;
        }
        else if (iDevicePressEvent.trackerName === "controllerTracker_2") {
          this._rightHandPosInitial = null;
          this._currentTrackerName = "controllerTracker_2";
          this._leftHandPosInitial = this._leftHandPos;
          bValidTracker = true;
        }
        else
          console.log(`${++this._count} : MoveUnderConstraints Be :: onDevicePressEvent | invalid tracker`);

        if (bValidTracker) {
          //console.log(`${++this._count} : MoveUnderConstraints Be :: onDevicePressEvent | ${this._currentTrackerName}`);

          this._grabbedActor = clickedActor;
          if (this._grabbedActor) {

            let evtMuCStarted = new MoveUnderConstraintStartedEvent();
            if (evtMuCStarted) {
              this.dispatchEvent(evtMuCStarted);
            }

            this._highlightActor(this._grabbedActor, true);
            this._dragStarted = true;
            if (this._MuCManager) {
              this._MuCManager.setGrabbedActor(this._grabbedActor);
            }
          }
        }

      }
      else {
        console.log(`${++this._count} : onDevicePressEvent | getActor failed `);
      }
    }
  };

  //==============================================================================
  // MoveUnderConstraints::onMouseMoveEvent
  //==============================================================================
  MoveUnderConstraints.prototype.onMouseMoveEvent = function (iMouseMoveEvent) {

    if (this._dragStarted === false) {
      return;
    }

    if (this._MuCManager) {
      let relativeTransfo = this._getTransfoToApplyToGrabbedActor(iMouseMoveEvent);
      if (relativeTransfo) {
        this._MuCManager.computePositionOfActors(relativeTransfo);
      }
    }
  };

  //==============================================================================
  // MoveUnderConstraints::onExecute
  //==============================================================================
  MoveUnderConstraints.prototype.onExecute = function () {
    //console.log(`${++this._count} : MoveUnderConstraints Be :: onExecute `);

    if (this._dragStarted === false) {
      return;
    }

    if (this._MuCManager) {
      let lastDeviceMoveEvent = null;
      if (this._lastLeftDeviceMoveEvent && this._lastLeftDeviceMoveEvent.trackerName === this._currentTrackerName) {
        lastDeviceMoveEvent = this._lastLeftDeviceMoveEvent;
        //console.log(`${++this._count} : MoveUnderConstraints Be :: onExecute | ${this._currentTrackerName} | Left`);
      }

      if (this._lastRightDeviceMoveEvent && this._lastRightDeviceMoveEvent.trackerName === this._currentTrackerName) {
        lastDeviceMoveEvent = this._lastRightDeviceMoveEvent;
        //console.log(`${++this._count} : MoveUnderConstraints Be :: onExecute | ${this._currentTrackerName} | Right`);
      }

      if (lastDeviceMoveEvent) {
        let relativeTransfo = this._getTransfoToApplyToGrabbedActorFromDeviceMoveEvent(lastDeviceMoveEvent);
        this._MuCManager.computePositionOfActors(relativeTransfo);
      }
    }
  }

  //==============================================================================
  // MoveUnderConstraints::onDeviceMoveEvent
  //==============================================================================
  MoveUnderConstraints.prototype.onDeviceMoveEvent = function (iDeviceMoveEvent) {
    //console.log(`${++this._count} : onDeviceMoveEvent `);

    // We need to store the pos at all time here, so that when changing pinch to antothtr one it doesnt teleport
    // if (this._dragStarted === false) {
    //   return;
    // }

    if (this._MuCManager) {
      if (iDeviceMoveEvent) {

        if (iDeviceMoveEvent.trackerName === "controllerTracker_1") {
          this._rightHandPos = iDeviceMoveEvent.trackerValue;
          this._lastRightDeviceMoveEvent = iDeviceMoveEvent;
        }
        else if (iDeviceMoveEvent.trackerName === "controllerTracker_2") {
          this._leftHandPos = iDeviceMoveEvent.trackerValue;
          this._lastLeftDeviceMoveEvent = iDeviceMoveEvent;
        }

        // Invoke solver only in onExecute since this callback is triggered a lot of times
        //let relativeTransfo = this._getTransfoToApplyToGrabbedActorFromDeviceMoveEvent(iDeviceMoveEvent);
        //if (this._isALargeTransfo(relativeTransfo))
        //this._MuCManager.computePositionOfActors(relativeTransfo);
      }
    }
  };

  //==============================================================================
  // MoveUnderConstraints::onMouseReleaseEvent
  //==============================================================================
  MoveUnderConstraints.prototype.onMouseReleaseEvent = function (iMouseReleaseEvent) {
    //console.log(`${++this._count} : onMouseReleaseEvent `);
    this._dragStarted = false;

    let evtMuCEnded = new MoveUnderConstraintEndedEvent();
    if (evtMuCEnded) {
      this.dispatchEvent(evtMuCEnded);
    }

    if (this._grabbedActor) {
      this._highlightActor(this._grabbedActor, false);
      this._grabbedActor = null;
    }
  };

  //==============================================================================
  // MoveUnderConstraints::onDeviceReleaseEvent
  //==============================================================================
  MoveUnderConstraints.prototype.onDeviceReleaseEvent = function (iDeviceReleaseEvent) {
    //console.log(`${++this._count} : onDeviceReleaseEvent | ${iDeviceReleaseEvent.trackerName} `);
    if (iDeviceReleaseEvent.trackerName === this._currentTrackerName) {
      this._dragStarted = false;
      this._rightHandPosInitial = null;
      this._leftHandPosInitial = null;
      this._currentTrackerName = null;

      let evtMuCEnded = new MoveUnderConstraintEndedEvent();
      if (evtMuCEnded) {
        this.dispatchEvent(evtMuCEnded);
      }

      if (this._grabbedActor) {
        this._highlightActor(this._grabbedActor, false);
        this._grabbedActor = null;
      }
    }
  };

  //==============================================================================
  // MoveUnderConstraints::_getTransfoToApplyToGrabbedActor
  //==============================================================================
  MoveUnderConstraints.prototype._getTransfoToApplyToGrabbedActor = function (iMouseMoveEvent) {
    let oRelativeTransfo = null;

    let renderMngr = STU.RenderManager.getInstance();
    if (renderMngr) {
      let actorCurrPos = this._getActorCurrentPosition(iMouseMoveEvent);
      if (actorCurrPos) {
        let actorNewPos = this._getActorNewPosition(iMouseMoveEvent, actorCurrPos);
        if (actorNewPos) {

          // // For debugging the pickpoint
          // let actorNewPosPt = new MathsDef.Point(actorNewPos.x, actorNewPos.y, actorNewPos.z);
          // var debugSphereNew = { screenSize: true, lifetime: 3000, opacity: 0.5, color: new STU.Color(255, 0, 0) }; //red
          // renderMngr.createSphere(actorNewPosPt, 3, debugSphereNew);

          // let actorOldPos = new MathsDef.Point(actorCurrPos.x, actorCurrPos.y, actorCurrPos.z);
          // var debugSphereOld = { screenSize: true, lifetime: 3000, color: new STU.Color(0, 255, 0) }; //green
          // renderMngr.createSphere(actorOldPos, 3, debugSphereOld);
          // console.log(`${++this._count} : Old Pos ${actorCurrPos.x} ${actorCurrPos.y} ${actorCurrPos.z}`);
          // console.log(`${++this._count} : New Pos ${actorNewPos.x} ${actorNewPos.y} ${actorNewPos.z}`);

          oRelativeTransfo = this._getRelativeTransfoFromPoint(actorCurrPos, actorNewPos);
        }
      }
    }
    else {
      console.log(`${++this._count} : MoveUnderConstraints::_getTransfoToApplyToGrabbedActor renderMngr is null `);
    }

    return oRelativeTransfo;
  };

  //==============================================================================
  // MoveUnderConstraints::_getTransfoToApplyToGrabbedActorFromDeviceMoveEvent
  //==============================================================================
  MoveUnderConstraints.prototype._getTransfoToApplyToGrabbedActorFromDeviceMoveEvent = function (iDeviceTrackerEvent) {
    //console.log(`${++this._count} : _getTransfoToApplyToGrabbedActorFromDeviceMoveEvent `);

    let oRelativeTransfo = null;

    if (this._grabbedActor) {

      if (iDeviceTrackerEvent) {
        let handPosNew = iDeviceTrackerEvent.trackerValue;

        if (iDeviceTrackerEvent.trackerName === "controllerTracker_1") {
          if (this._rightHandPosInitial) {
            oRelativeTransfo = this._getRelativeTransfoFromPositions(this._rightHandPosInitial, handPosNew);
            this._rightHandPosInitial = handPosNew;
          }
          else
            console.log(`${++this._count} : _getTransfoToApplyToGrabbedActorFromDeviceMoveEvent | _rightHandPosInitial is null `);
        }
        else if (iDeviceTrackerEvent.trackerName === "controllerTracker_2") {
          if (this._leftHandPosInitial) {
            oRelativeTransfo = this._getRelativeTransfoFromPositions(this._leftHandPosInitial, handPosNew);
            this._leftHandPosInitial = handPosNew;
          }
          else
            console.log(`${++this._count} : _getTransfoToApplyToGrabbedActorFromDeviceMoveEvent | _leftHandPosInitial is null `);
        }
      }

    }

    return oRelativeTransfo;
  };

  //==============================================================================
  // MoveUnderConstraints::_getRelativeTransfoFromPoint
  //==============================================================================
  MoveUnderConstraints.prototype._getRelativeTransfoFromPoint = function (iVectOldPoint, iVectNewPoint) {

    let vectLinearTransfo = new MathsDef.Vector3D.sub(iVectNewPoint, iVectOldPoint);
    let oRelativeTransfo = {
      matrix: [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1,
        vectLinearTransfo.x,
        vectLinearTransfo.y,
        vectLinearTransfo.z
      ],
    };

    return oRelativeTransfo;
  };

  //==============================================================================
  // MoveUnderConstraints::_getRelativeTransfoFromPositions
  //==============================================================================
  MoveUnderConstraints.prototype._getRelativeTransfoFromPositions = function (iPos1, iPos2) {
    //console.log(`${++this._count} : _getRelativeTransfoFromPositions `);

    let ptPos2 = new MathsDef.Vector3D(iPos2[9], iPos2[10], iPos2[11]);
    let ptPos1 = new MathsDef.Vector3D(iPos1[9], iPos1[10], iPos1[11]);
    let vectLinearTransfo = new MathsDef.Vector3D.sub(ptPos2, ptPos1);

    //let matRot = new ThreeJS_DS.Matrix4().makeRotationAxis((1, 0, 0), 0);
    //let m = matRot.elements;

    let oRelativeTransfo = {
      matrix: [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1,
        vectLinearTransfo.x,
        vectLinearTransfo.y,
        vectLinearTransfo.z
      ]
    };

    return oRelativeTransfo;
  };

  //==============================================================================
  // MoveUnderConstraints::_getGrabbedActor
  //==============================================================================
  MoveUnderConstraints.prototype._getGrabbedActor = function (iMousePressEvent) {
    let oActor = null;

    let objIntersection = this._getIntersectionObject(iMousePressEvent);
    if (objIntersection) {
      var actorIntersection = objIntersection.getActor();
      if (actorIntersection instanceof StuActor3D) {
        oActor = actorIntersection;
      }
    }

    return oActor;
  };

  //==============================================================================
  // MoveUnderConstraints::_highlightActor
  //==============================================================================
  MoveUnderConstraints.prototype._highlightActor = function (iActor, ibHighlight) {
    let oActor = null;

    if (iActor) {
      let renderMngr = STU.RenderManager.getInstance();
      if (renderMngr) {
        if (ibHighlight)
          renderMngr.highlight(iActor);
        else
          renderMngr.dehighlight(iActor);
      }
    }
  };

  //==============================================================================
  // MoveUnderConstraints::_getIntersectionObject
  //==============================================================================
  MoveUnderConstraints.prototype._getIntersectionObject = function (iMouseEvent) {
    let oIntersectionObj = null;
    if (iMouseEvent) {
      // This doesnt work for ODTs
      // let posMousePos = iMouseEvent.getMouse().getPosition();

      let posMousePos = iMouseEvent.getPosition();
      if (posMousePos) {
        let renderMngr = STU.RenderManager.getInstance();
        if (renderMngr) {
          let pickOptions = { retrieveOnlyActor: false };
          oIntersectionObj = renderMngr.pickFromScreen(posMousePos, pickOptions);
        }
      }
    }

    return oIntersectionObj;
  };

  // //==============================================================================
  // // MoveUnderConstraints::_getIntersectionPoint
  // //==============================================================================
  // MoveUnderConstraints.prototype._getIntersectionPoint = function (iMouseEvent) {
  //   let oIntersectionPoint = [];

  //   let objIntersection = this._getIntersectionObject(iMouseEvent);
  //   if (objIntersection) {
  //     oIntersectionPoint.push(objIntersection.point.x);
  //     oIntersectionPoint.push(objIntersection.point.y);
  //     oIntersectionPoint.push(objIntersection.point.z);
  //   }
  //   return oIntersectionPoint;
  // };

  // //==============================================================================
  // // MoveUnderConstraints::_isALargeTransfo
  // //==============================================================================
  // MoveUnderConstraints.prototype._isALargeTransfo = function (iDeltaTransfo) {
  //   let obLarge = true;
  //   let arrTransfo = iDeltaTransfo.matrix;
  //   for (let idx = arrTransfo.length - 1; idx >= 9 && !obLarge; idx--) {
  //     let val = arrTransfo[idx];
  //     if (val < -0.5 || val > 0.5) {
  //       obLarge = true;
  //     }
  //   }
  //   return obLarge;
  // };

  // //==============================================================================
  // // MoveUnderConstraints::_getVirtualIntersectionTransform
  // // Copied from StudioCreativeCntModelRTWeb\StuMiscContent.mweb\src\StuFollowMouseBe.js
  // //==============================================================================
  // MoveUnderConstraints.prototype._getVirtualIntersectionTransform = function (iActor, iLine) {
  //   let oTransform = null;

  //   if (iActor && iLine && typeof iLine.origin !== 'undefined' && typeof iLine.direction !== 'undefined') {
  //     var origin = iLine.origin;
  //     var direction = iLine.direction;
  //     direction.normalize();
  //     var xMouse = direction.clone();
  //     xMouse.z = 0;
  //     xMouse.normalize();
  //     var cosAlpha = xMouse.dot(direction);
  //     var alpha = Math.acos(cosAlpha);
  //     var d = origin.z;
  //     var mouseDistance = (d / Math.sin(alpha));

  //     direction.multiplyScalar(mouseDistance);
  //     //console.log(`${++this._count} : mouseDistance ${mouseDistance}`);

  //     // updating the transform
  //     var vector = new MathsDef.Vector3D(origin.x, origin.y, origin.z);
  //     vector.add(direction);

  //     var d2 = vector.squareNorm();
  //     var ExpScale = STU.RenderManager.getInstance().getExperienceScaleFactor();
  //     if (d2 >= 10000000 * 10000000 * 3 || Math.abs(ExpScale - 1) > 100 * Number.EPSILON) {
  //       vector = iActor.getPosition("World");
  //     }

  //     oTransform = new MathsDef.Transformation();
  //     let matrix = iActor.getTransform("World").matrix;

  //     oTransform.matrix = matrix;
  //     oTransform.vector = vector;
  //     console.log(`${++this._count} : New Pos ${vector.x} ${vector.y} ${vector.z}`);
  //   }

  //   //return oTransform;
  //   return oTransform.vector;
  // };

  //==============================================================================
  // MoveUnderConstraints::_getActorNewPosition
  // Copied from StudioCreativeCntModelRTWeb\StuMiscContent.mweb\src\StuFollowMouseBe.js
  //==============================================================================
  MoveUnderConstraints.prototype._getActorNewPosition = function (iMouseEvent, iActorCurrPosVector) {
    let oActorNewPosVector = null;

    let renderMngr = STU.RenderManager.getInstance();
    if (iActorCurrPosVector && renderMngr) {

      // Option 1: New position from Camera
      let grabDistance = null;

      // const stuExperience = STU.Experience.getCurrent();
      // if (stuExperience) {
      //   let expCamera = stuExperience.currentCamera;
      //   expCamera = stuExperience.getStartupCamera();
      //   if (expCamera) {
      //     grabDistance = expCamera.getPosition().sub(iActorCurrPosVector).norm();
      //   }
      // }

      if (!grabDistance) {
        let rmCamera = renderMngr.getCurrentCamera();
        if (rmCamera) {
          grabDistance = rmCamera.getPosition().sub(iActorCurrPosVector).norm();
          if (grabDistance) {
            let grabOffset = renderMngr.getMousePositionIn3D(grabDistance).sub(iActorCurrPosVector);
            oActorNewPosVector = renderMngr.getMousePositionIn3D(grabDistance);
            oActorNewPosVector.sub(grabOffset);
          }
        }
      }

      // Option 2: New position using intersection object (similar to StuFollowMouseBe.js)
      // let arrIntersectionPoint = this._getIntersectionPoint(iMouseEvent);
      // if (arrIntersectionPoint && arrIntersectionPoint.length === 3) {
      //   oActorNewPosVector = new MathsDef.Vector3D(arrIntersectionPoint[0], arrIntersectionPoint[1], arrIntersectionPoint[2]);
      // }
      // else {
      //   let posMouse = iMouseEvent.getPosition();
      //   if (posMouse) {
      //     let line = renderMngr.getLineFromPosition(posMouse);
      //     if (line) {
      //       oActorNewPosVector = this._getVirtualIntersectionTransform(this._grabbedActor, line);
      //     }
      //   }
      // }
    }

    return oActorNewPosVector;
  };

  //==============================================================================
  // MoveUnderConstraints::_getActorCurrentPosition
  //==============================================================================
  MoveUnderConstraints.prototype._getActorCurrentPosition = function (iMouseEvent) {
    let oActorPosVector = null;

    if (this._grabbedActor) {

      // IR-1435517: Since transfo returned by solver is to be applied on CoG, compute the delta also with CoG.
      //oActorPosVector = this._grabbedActor.getPosition();

      let sManagerType = this._MuCManager.getManagerType();

      // CoG in world coordinates
      let arrAbsCoGWorld = this._MuCManager.ComputeCoG(this._grabbedActor, sManagerType);
      if (typeof arrAbsCoGWorld !== 'undefined' && arrAbsCoGWorld && arrAbsCoGWorld.length === 3) {
        oActorPosVector = new MathsDef.Vector3D(arrAbsCoGWorld[0], arrAbsCoGWorld[1], arrAbsCoGWorld[2]);
      }
    }

    return oActorPosVector;
  };

  // Expose in STU namespace.
  STU.MoveUnderConstraints = MoveUnderConstraints;

  return MoveUnderConstraints;
});

define("CXPAssemblyStudioMuC/StuMoveUnderConstraintsBe", [
  "DS/CXPAssemblyStudioMuC/StuMoveUnderConstraintsBe",
], function (MoveUnderConstraints) {
  "use strict";

  return MoveUnderConstraints;
});
