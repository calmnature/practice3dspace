/**
* @quickReview A97 25:02:19 : Creation
* @quickReview A97 25:03:07 : Commented traces
* @quickReview A97 25:03:26 : Added Manager public methods
* @quickReview A97 25:08:08 : IR-1435517: Parts jump to new location on slightest movement in DSXM web play
* @quickReview A97 25:09:22 : IR-1440169: Components is moving to infinite position when dragging.
* @quickReview A97 26:01:19 : FUN162248 : Common manager services are now kept here
* @quickReview A97 26:01:22 : FUN162248 : Added new service method and null check on solver in existing methods.
*/

define("DS/CXPAssemblyStudioMuCEngine/StuMoveUnderConstraintsManager",
  [
    "DS/StuCore/StuManager",
    "DS/StuCore/StuContext",
    "DS/CATSolverCDSWeb/CATSolverCDSSolver",
    "DS/StuRenderEngine/StuActor3D",
    "DS/StuRenderEngine/StuSubProductActor",
    "DS/StuRenderEngine/StuProductActor",
    "DS/MathematicsES/MathsDef"
  ],
  function (StuManager,
    StuContext,
    CATSolverCDSSolver,
    StuActor3D,
    StuSubProductActor,
    StuProductActor,
    MathsDef) {
    "use strict";

    var MoveUnderConstraintsManager = function () {
      StuManager.call(this);
      this.name = "MoveUnderConstraintsManager";

      this.soundPlayCount = 0;
      this._count = 1;
      this.cdsJson = null;
      this._grabbedActor = null;
      this.cdsSolver = null;
      this.mapActorIDAndPosition = null;

      //console.log(`${++this._count} : MoveUnderConstraintsManager | constructor`);
    };

    //==============================================================================
    // MoveUnderConstraintsManager::MoveUnderConstraintsManager
    //==============================================================================
    MoveUnderConstraintsManager.prototype = new StuManager();
    MoveUnderConstraintsManager.prototype.constructor = MoveUnderConstraintsManager;

    //==============================================================================
    // MoveUnderConstraintsManager::onInitialize
    //==============================================================================
    MoveUnderConstraintsManager.prototype.onInitialize = function () {
      //console.log(`MoveUnderConstraintsManager : onInitialize `);
      //implementation in StuMoveUnderConstraintsManagerWeb and StuMoveUnderConstraintsManagerNA

      StuManager.prototype.onInitialize.call(this);
    };

    //==============================================================================
    // MoveUnderConstraintsManager::onDispose
    //==============================================================================
    MoveUnderConstraintsManager.prototype.onDispose = function () {
      //console.log(`MoveUnderConstraintsManager : onDispose `);

      StuManager.prototype.onDispose.call(this);
    };

    //==============================================================================
    // MoveUnderConstraintsManager::fixActorTemporarily
    //==============================================================================
    MoveUnderConstraintsManager.prototype.fixActorTemporarily = function (iActorToFix, ibFix) {
      //implementation in StuMoveUnderConstraintsManagerWeb and StuMoveUnderConstraintsManagerNA
    };

    //==============================================================================
    // MoveUnderConstraintsManager::storeActorInitialPositions
    //==============================================================================
    MoveUnderConstraintsManager.prototype.storeActorInitialPositions = function () {
      //implementation in StuMoveUnderConstraintsManagerWeb and StuMoveUnderConstraintsManagerNA
      //console.log(`MoveUnderConstraintsManager : storeActorInitialPositions `);
    };

    //==============================================================================
    // MoveUnderConstraintsManager::resetPosition
    //==============================================================================
    MoveUnderConstraintsManager.prototype.resetPosition = function () {
      //console.log(`MoveUnderConstraintsManager : resetPosition `);
      //implementation in StuMoveUnderConstraintsManagerWeb and StuMoveUnderConstraintsManagerNA
    };

    //==============================================================================
    // MoveUnderConstraintsManager::setGrabbedActor
    //==============================================================================
    MoveUnderConstraintsManager.prototype.setGrabbedActor = function (iGrabbedActor, iPickingPoint, isManagerType ) {
      //console.log(`MoveUnderConstraintsManager : setGrabbedActor`);
      //implementation in StuMoveUnderConstraintsManagerWeb and StuMoveUnderConstraintsManagerNA
    };

    //==============================================================================
    // MoveUnderConstraintsManager::computePositionOfActors
    //==============================================================================
    MoveUnderConstraintsManager.prototype.computePositionOfActors = function (iTransfoToApply) {
      //console.log(`MoveUnderConstraintsManager : computePositionOfActors `);
      //implementation in StuMoveUnderConstraintsManagerWeb and StuMoveUnderConstraintsManagerNA
    };

    //==============================================================================
    // MoveUnderConstraintsManager::playSound
    //==============================================================================
    MoveUnderConstraintsManager.prototype.playSound = function (iRootActor) {
      if (iRootActor) {
        // let evt = new StuContext.SoundPlayerStartedEvent();
        // rootActor.dispatchEvent(evt);

        let behaviorsArray = iRootActor.getBehaviors();
        for (let idx = 0; idx < behaviorsArray.length; idx++) {
          let idxBehavior = behaviorsArray[idx];

          if (idxBehavior.name === "SoundPlayer") {
            if (idxBehavior.isPlaying() !== true) {
              idxBehavior.play();
            }
            else {
              idxBehavior.stop();
            }
          }
        }
      }
    };

    //==============================================================================
    // MoveUnderConstraintsManager::setActorPosition
    //==============================================================================
    MoveUnderConstraintsManager.prototype.setActorPosition = function (iRootActor, iActorToPosition, iCurrentAbsPos, iTransfo) {
      if (iRootActor && iActorToPosition && iCurrentAbsPos && iTransfo) {
        iTransfo.multiply(iCurrentAbsPos, false);

        let parentActor = iActorToPosition.getParentActor();
        if (parentActor) {
          let absPosParent = new MathsDef.Transformation();
          // Using World ctx will not work when sub assemblies are not at origin. eg: Robot1 (Orange)
          //absPosParent = parentActor.getTransform("World");
          absPosParent = parentActor.getTransform(iRootActor);
          let absPosInvParent = absPosParent.inverse();
          let localTransfo = absPosInvParent.multiply(iTransfo, false);
          iActorToPosition.setTransform(localTransfo, parentActor);
        }
      }
    };

    //==============================================================================
    // MoveUnderConstraintsManager::getRootActor
    //==============================================================================
    MoveUnderConstraintsManager.prototype.getRootActor = function (iActor) {
      let oRootActor = null;
      if (iActor) {
        if (iActor instanceof StuSubProductActor || iActor instanceof StuProductActor) {
          let parentActor = iActor.getParentActor();
          if (parentActor instanceof StuSubProductActor) {
            oRootActor = this.getRootActor(parentActor);
          } else if (parentActor instanceof StuProductActor) {
            oRootActor = parentActor;
          }
        }
      }
      return oRootActor;
    };

    //==============================================================================
    // MoveUnderConstraintsManager::isTransfoValid
    //==============================================================================
    MoveUnderConstraintsManager.prototype.isTransfoValid = function (iTransfo) {
      let obValid = true;
      let arrTransfo = iTransfo.getArray();
      for (let idx = arrTransfo.length - 1; idx >= 0; idx--) {
        let val = arrTransfo[idx];
        if (!isFinite(val) || isNaN(val)) {
          obValid = false;
        }
      }
      return obValid;
    };

    //==============================================================================
    // MoveUnderConstraintsManager::getLocalPickingPoint
    //==============================================================================
    MoveUnderConstraintsManager.prototype.getLocalPickingPoint = function (iGrabbedActor, iPickingPoint, isManagerType) {
      let oLocalPickPoint = [];
      let rootActor = this.getRootActor(this._grabbedActor);
      if (rootActor && iGrabbedActor) {
        let parentActor = iGrabbedActor.getParentActor();
        if (parentActor) {
          let absPosParent = new MathsDef.Transformation();
          absPosParent = parentActor.getTransform(rootActor);
          let absPosInvParent = absPosParent.inverse();

          if (iPickingPoint) {
            // For Pick point manip. 
            let absPickPointTransfo = this._getTransfoFromPoint(iPickingPoint);
            if (absPickPointTransfo) {
              let localPickPointTransfo = absPosInvParent.multiply(absPickPointTransfo, false);
              if (localPickPointTransfo) {
                oLocalPickPoint.push(localPickPointTransfo.getArray()[9]);
                oLocalPickPoint.push(localPickPointTransfo.getArray()[10]);
                oLocalPickPoint.push(localPickPointTransfo.getArray()[11]);
              }
            }
          }
          else {
            // IR-1396087: BBox manip
            oLocalPickPoint = this.ComputeCoG(iGrabbedActor, isManagerType);
          }
        }
      }

      return oLocalPickPoint;
    };

    //==============================================================================
    // MoveUnderConstraintsManager::ComputeCoG
    //==============================================================================
    MoveUnderConstraintsManager.prototype.ComputeCoG = function (iActor, isManagerType) {
      let oArrCoGPoint = [];

      if (iActor) {
        // IR-1435517: Use bounding sphere center which is transformed according to root product's position in the experience instead of BoundingBox
        let rootActor = this.getRootActor(iActor);
        if (rootActor) {
          let bsActor = this._getActorBS(rootActor, iActor, isManagerType);
          if (bsActor && typeof bsActor.center !== "undefined") {
            //let scene = rootActor.getScene();
            //let CERoot = scene.getExperience();
            //let bsActor = iActor.getBoundingSphere(CERoot);

            // Transform bsActor according to root product's position in the experience
            let transfoScene = rootActor.getSceneTransform();
            let transfoRootInScene = rootActor.getTransform(transfoScene);
            bsActor.center.applyTransformation(transfoRootInScene);

            oArrCoGPoint.push(bsActor.center.x);
            oArrCoGPoint.push(bsActor.center.y);
            oArrCoGPoint.push(bsActor.center.z);
          }
        }

        // let BoundingBox = new STU.Box();
        // let absTransfo = iActor.getTransform();
        // iActor.StuIRepresentation.GetBoundingBox(BoundingBox, absTransfo, 1); // local
        // let xdim = 0.5 * (BoundingBox.high.x - BoundingBox.low.x);
        // let ydim = 0.5 * (BoundingBox.high.y - BoundingBox.low.y);
        // let zdim = 0.5 * (BoundingBox.high.z - BoundingBox.low.z);
        // oArrCoGPoint.push(xdim);
        // oArrCoGPoint.push(ydim);
        // oArrCoGPoint.push(zdim);

        //let oCoGPoint = null;
        // if (iActor) {
        //   let actorRigidBody = iActor.RigidBody;
        //   if (actorRigidBody) {
        //     let actorRigidObject = actorRigidBody.getRigidObject();
        //     if (actorRigidObject) {
        //       let objInertia = rigid.GetInertia();
        //       if (objInertia) {
        //         oCoGPoint = Inertia.GetCenterOfGravity();
        //       }
        //     }
        //   }
        //   else {
        //     let xrRay = iActor.XRRay;
        //     if (xrRay) {
        //       let intersection = xrRay.pick();
        //       if (intersection) {
        //         let ptIntersection = intersection.getPoint();
        //         oIntersectionPoint.push(ptIntersection.x);
        //         oIntersectionPoint.push(ptIntersection.x);
        //         oIntersectionPoint.push(ptIntersection.x);
        //       }
        //     }

        //     let bbSphere = iActor.getBoundingSphere();
        //     if (bbSphere) {
        //       let bbCenterPt = this.rootActorCentre = bbSphere.getCenter();
        //       oIntersectionPoint.push(bbCenterPt.x);
        //       oIntersectionPoint.push(bbCenterPt.x);
        //       oIntersectionPoint.push(bbCenterPt.x);
        //     }


        //     let bbox = iActor.getBoundingBox(); // getBoundingSphere 
        //     if (bbox) {
        //       var xdim = 0.5 * (bbox.high.x - bbox.low.x);
        //       var ydim = 0.5 * (bbox.high.y - bbox.low.y);
        //       var zdim = 0.5 * (bbox.high.z - bbox.low.z);
        //       oIntersectionPoint.push(xdim);
        //       oIntersectionPoint.push(ydim);
        //       oIntersectionPoint.push(zdim);
        //     }
        //     else {
        //       let BoundingBox = new STU.Box();
        //       let absTransfo = iActor.getTransform();
        //       iActor.StuIRepresentation.GetBoundingBox(BoundingBox, absTransfo, 1); // local
        //       var xdim = 0.5 * (BoundingBox.high.x - BoundingBox.low.x);
        //       var ydim = 0.5 * (BoundingBox.high.y - BoundingBox.low.y);
        //       var zdim = 0.5 * (BoundingBox.high.z - BoundingBox.low.z);
        //       oIntersectionPoint.push(xdim);
        //       oIntersectionPoint.push(ydim);
        //       oIntersectionPoint.push(zdim);
        //     }
        //   }
        // }
      }

      return oArrCoGPoint;
    };

    // //==============================================================================
    // // MoveUnderConstraintsManager::ComputeCoGInParentCtx
    // //==============================================================================
    // MoveUnderConstraintsManager.prototype.ComputeCoGInParentCtx = function (iActor) {
    //   let oArrCoGPoint = [];

    //   if (iActor) {
    //     // IR-1435517: Use bounding sphere center which is transformed according to root product's position in the experience instead of BoundingBox
    //     //let bsActor = iActor.getBoundingSphere("Parent");
    //     let parentActor = iActor.getParentActor();
    //     if (parentActor) {
    //       let bsActor = iActor.getBoundingSphere(parentActor);
    //       if (bsActor && typeof bsActor.center !== "undefined") {
    //         oArrCoGPoint.push(bsActor.center.x);
    //         oArrCoGPoint.push(bsActor.center.y);
    //         oArrCoGPoint.push(bsActor.center.z);
    //       }
    //     }
    //   }

    //   return oArrCoGPoint;
    // };

    // //==============================================================================
    // // MoveUnderConstraintsManager::ComputeCoGInWorldCtx
    // //==============================================================================
    // MoveUnderConstraintsManager.prototype.ComputeCoGInWorldCtx = function (iActor) {
    //   let oArrCoGPoint = [];

    //   if (iActor) {
    //     let bsActor = iActor.getBoundingSphere("World");
    //     if (bsActor && typeof bsActor.center !== "undefined") {
    //       oArrCoGPoint.push(bsActor.center.x);
    //       oArrCoGPoint.push(bsActor.center.y);
    //       oArrCoGPoint.push(bsActor.center.z);
    //     }

    //     // let arrAbsCoGParent = this.ComputeCoGInParentCtx(iActor);
    //     // let vectCoGParent = new MathsDef.Vector3D(arrAbsCoGParent[0], arrAbsCoGParent[1], arrAbsCoGParent[2]);
    //     // let parentActor = iActor.getParentActor();
    //     // let absTransfoParent = parentActor.getTransform("World");
    //     // vectCoGParent.applyTransformation(absTransfoParent);
    //     // oArrCoGPoint = MathsDef.Vector3D.add(vectCoGParent, absTransfoParent.vector); // World Ctx
    //   }

    //   return oArrCoGPoint;
    // };

    //==============================================================================
    // MoveUnderConstraintsManager::isPathSame
    //==============================================================================
    MoveUnderConstraintsManager.prototype.isPathSame = function (iArrPath1, iArrPath2) {
      let obIsSame = false;

      if (iArrPath1 && iArrPath2) {
        if (iArrPath1.length === iArrPath2.length) {
          for (let idx = 0; idx < iArrPath1.length; idx++) {
            obIsSame = false;

            let pathItem1 = iArrPath1[idx];
            let pathItem2 = iArrPath2[idx];
            if (pathItem1 === pathItem2) {
              obIsSame = true;
            }
            else
              break;
          }
        }
      }
      return obIsSame;
    };

    //==============================================================================
    // MoveUnderConstraintsManager::getTransfoToApplyInRootProductCtx
    //==============================================================================
    MoveUnderConstraintsManager.prototype.getTransfoToApplyInRootProductCtx = function (iAbsMatrixTransfo, iActor) {
      let oMatrixTransfoInRootCtx = null;

      if (iActor && typeof iAbsMatrixTransfo.matrix !== "undefined") {
        let rootActor = this.getRootActor(iActor);
        if (rootActor) {
          let arrAbsMatrix = iAbsMatrixTransfo.matrix;
          if (arrAbsMatrix) {
            // IR-1440169: Get translation vector in Root product's context, but retain the matrix part of iAbsMatrixTransfo.
            // i.e. Negate the position of Root Product from translation vector.
            // Eg: transfoInRoot = Inverse(AbsPosRoot) * (AbsTransfo) 
            let absPosRoot = new MathsDef.Transformation();
            absPosRoot = rootActor.getTransform("World");
            let absPosInvRoot = absPosRoot.getInverse();

            let absTranslationVector = new MathsDef.Vector3D(arrAbsMatrix[9], arrAbsMatrix[10], arrAbsMatrix[11]); // Absolute translation
            let vectorTranslationInRoot = absTranslationVector.applyTransformation(absPosInvRoot); // Translation in Root Ctx
            //let vectorTranslationInRoot = absTranslationVector;

            // Convert Transformation back to to 4x4 Matrix
            oMatrixTransfoInRootCtx = {
              matrix: [
                arrAbsMatrix[0], arrAbsMatrix[1], arrAbsMatrix[2],
                arrAbsMatrix[3], arrAbsMatrix[4], arrAbsMatrix[5],
                arrAbsMatrix[6], arrAbsMatrix[7], arrAbsMatrix[8],
                vectorTranslationInRoot.x,
                vectorTranslationInRoot.y,
                vectorTranslationInRoot.z
              ]
            };
          }
        }
      }

      return oMatrixTransfoInRootCtx;
    };

    //==============================================================================
    // MoveUnderConstraintsManager::_getTransfoFromPoint
    //==============================================================================
    MoveUnderConstraintsManager.prototype._getTransfoFromPoint = function (iArrPoint) {
      let oPosTransfo = new MathsDef.Transformation();
      if (iArrPoint) {
        oPosTransfo.setFromArray(
          [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
            iArrPoint[0],
            iArrPoint[1],
            iArrPoint[2],
          ]);
      }
      return oPosTransfo;
    };

    //==============================================================================
    // MoveUnderConstraintsManager::isALeafActor
    //==============================================================================
    MoveUnderConstraintsManager.prototype.isALeafActor = function (iActor) {

      let obLeaf = false;
      if (iActor) {
        let listChildren = iActor.getSubActors();
        if (0 === listChildren.length)
          obLeaf = true;
      }

      return obLeaf;
    };

    //==============================================================================
    // MoveUnderConstraintsManager::applyTransfoToActorPosition
    //==============================================================================
    MoveUnderConstraintsManager.prototype.applyTransfoToActorPosition = function (iActorToPosition, iTransfo) {
      if (iActorToPosition) {

        let rootActor = this.getRootActor(iActorToPosition);
        if (rootActor) {
          let absPosMoving = new MathsDef.Transformation();
          absPosMoving = iActorToPosition.getTransform(rootActor);

          this.setActorPosition(rootActor, iActorToPosition, absPosMoving, iTransfo);
        }

        // let absPosMoving = new MathsDef.Transformation();
        // movingActor.CATIMovable.GetAbsPosition(absPosMoving);
        // iTransfo.multiply(absPosMoving, false);
        // movingActor.CATIMovable.SetAbsPosition(iTransfo);

        // let absPosMoving1 = new MathsDef.Transformation();
        // let actMovable = movingActor.QueryInterface('CATIMovable');
        // actMovable.GetAbsPosition(absPosMoving1);

        //const sName = movingActor.CATI3DExperienceObject.GetValueByName('_varName');

        // let absPosMoving = new MathsDef.Transformation();
        // movingActor.CATIMovable.GetAbsPosition(absPosMoving);
        // iTransfo.multiply(absPosMoving, false);

        // let parentActor = movingActor.getParentActor();
        // if (parentActor) {
        //   let absPosParent = new MathsDef.Transformation();
        //   parentActor.CATIMovable.GetAbsPosition(absPosParent);

        //   let absPosInvParent = absPosParent.inverse();
        //   absPosInvParent.multiply(iTransfo, false);
        //   movingActor.CATIMovable.SetLocalPosition(null, absPosInvParent.getArray());
        // }

        // let actorOldAbsPos = new MathsDef.Transformation();
        // movingActor.CATIMovable.GetAbsPosition(actorOldAbsPos);
        // iTransfo.multiply(actorOldAbsPos, false);
        // //movingActor.CATI3DExperienceObject.SetValueByName("_varposition", iTransfo.getArray());
        // movingActor.CATIMovable.SetAbsPosition(iTransfo.getArray());

        // let curPosTransfo = this._GetTransfoFromActorPosition(movingActor);
        // // Apply solver transfo to the current position of actor to get its new position after the solve.
        // iTransfo.multiply(curPosTransfo, false);

        // let currPosTransfo = new MathsDef.Transformation();
        // movingActor.CATIMovable.GetLocalPosition(currPosTransfo);
        // if (!this._isEqual(currPosTransfo, iTransfo)) {
        //   //console.log(`${++this._count} : _applyTransfoToActorPosition ${sName} | Before CATIMovable::SetLocalPosition ${sName}`);
        //   //movingActor.CATIMovable.SetLocalPosition(null, iTransfo);
        //   movingActor.CATI3DExperienceObject.SetValueByName("_varposition", iTransfo.getArray());
        //   //console.log(`${++this._count} : _applyTransfoToActorPosition ${sName} | After CATIMovable::SetLocalPosition ${sName}`);
        // }

        //const sName = movingActor.QueryInterface('CATI3DExperienceObject').GetValueByName('_varName');
        //console.log(`${++this._count} : _applyTransfoToActorPosition ${sName} : ${iTransfo[9]} ${iTransfo[10]} ${iTransfo[11]}`);
      }
    };

    //==============================================================================
    // MoveUnderConstraintsManager::getSolverResult
    //==============================================================================
    MoveUnderConstraintsManager.prototype.getSolverResult = function (iMovedActor, iAbsMatrixTransfoToApply) {
      let oSolverResults = null;

      if (this.cdsSolver && iMovedActor && iMovedActor instanceof StuActor3D && iAbsMatrixTransfoToApply && typeof iAbsMatrixTransfoToApply.matrix !== 'undefined') {
        // IR-1440169: Get translation vector in Root product's context.
        let deltaMatrixTransfo = this.getTransfoToApplyInRootProductCtx(iAbsMatrixTransfoToApply, iMovedActor);
        this.cdsSolver.setMoveType("movebytransfo");
        this.cdsSolver.setTarget(deltaMatrixTransfo);
        let solverOutput = this.cdsSolver.run();
        if (solverOutput && typeof solverOutput.results !== 'undefined') {
          oSolverResults = solverOutput.results;
        }

        // // For debug
        // // To Apply transfo directly without solver
        // //let arrMatrix = iAbsMatrixTransfoToApply.matrix;
        // let arrMatrix = deltaMatrixTransfo.matrix;
        // if (arrMatrix) {
        //   // Convert 4x4 Matrix to Transformation
        //   let absTransfoToApply = new MathsDef.Transformation();
        //   absTransfoToApply.setFromArray([
        //     arrMatrix[0], arrMatrix[1], arrMatrix[2], arrMatrix[9],
        //     arrMatrix[3], arrMatrix[4], arrMatrix[5], arrMatrix[10],
        //     arrMatrix[6], arrMatrix[7], arrMatrix[8], arrMatrix[11],
        //     0, 0, 0, 0], 1);

        //   // 1. Apply transfo directly
        //   // Method 1
        //   let absPosMoving = new MathsDef.Transformation();
        //   let rootActor = this.getRootActor(iMovedActor);
        //   if (rootActor) {
        //     absPosMoving = iMovedActor.getTransform(rootActor);
        //     //absPosMoving = iMovedActor.getTransform("World");
        //     absPosMoving.multiply(absTransfoToApply, true)
        //     //iMovedActor.setTransform(absPosMoving, "World");
        //     iMovedActor.setTransform(absPosMoving, rootActor);

        //     // Method 2
        //     // absPosMoving = iMovedActor.getTransform("World");
        //     // this.setActorPosition(rootActor, iMovedActor, absPosMoving, absTransfoToApply);
        //   }
        // }
      }

      return oSolverResults;
    };

    //==============================================================================
    // MoveUnderConstraintsManager::setMovingActorInSolver
    //==============================================================================
    MoveUnderConstraintsManager.prototype.setMovingActorInSolver = function (iActor, iArrActorPath, iPickingPoint, isManagerType) {
      if (iActor && iArrActorPath && this.cdsSolver) {
        this._grabbedActor = iActor;

        let sActorPath = iArrActorPath.join("\\u0005");
        if (sActorPath.length) {
          // IR-1396087: Point manip
          let ptLocalPickpoint = this.getLocalPickingPoint(this._grabbedActor, iPickingPoint, isManagerType);
          if (ptLocalPickpoint) {
            this.cdsSolver.setMovingEntity(sActorPath, ptLocalPickpoint);
            //this.cdsSolver.setMovingEntity(sActorPath);
          }
        }
      }
    };

    //==============================================================================
    // MoveUnderConstraintsManager::resetSolver
    //==============================================================================
    MoveUnderConstraintsManager.prototype.resetSolver = function () {
      if (this.cdsSolver && this.cdsJson) {
        this.cdsSolver.clean();
        this.cdsSolver = null;

        this.cdsSolver = new CATSolverCDSSolver();
        this.cdsSolver.initialize(this.cdsJson);
        this.cdsSolver.load();

        // let solverOutput = this.cdsSolver.UndoRun();
        // if (solverOutput) {
        //   this._processSolverResults(solverOutput.results);
        // }
      }
    };

    //==============================================================================
    // MoveUnderConstraintsManager::resetActorPosition
    //==============================================================================
    MoveUnderConstraintsManager.prototype.resetActorPosition = function (iActor, iAbsPos) {
      if (iActor && iAbsPos) {
        let rootActor = this.getRootActor(iActor);
        if (rootActor) {
          let identityTransfo = new MathsDef.Transformation();
          this.setActorPosition(rootActor, iActor, iAbsPos, identityTransfo);
        }
      }
    };

    //==============================================================================
    // MoveUnderConstraintsManager::storeActorInitialPosition
    //==============================================================================
    MoveUnderConstraintsManager.prototype.storeActorInitialPosition = function (iRootActor, iActor, iActorIDPath) {
      if (iRootActor && iActor && iActorIDPath) {
        let absPosActor = new MathsDef.Transformation();
        absPosActor = iActor.getTransform(iRootActor).clone();
        this.mapActorIDAndPosition.set(iActorIDPath, absPosActor);
      }
    };

    //==============================================================================
    // MoveUnderConstraintsManager::initSolver
    //==============================================================================
    MoveUnderConstraintsManager.prototype.initSolver = function (isJsonString) {
      if (this.cdsSolver && isJsonString) {
        this.cdsJson = isJsonString;
        this.cdsSolver.initialize(this.cdsJson);
        this.cdsSolver.load();
      }
    };

    //==============================================================================
    // MoveUnderConstraintsManager::cleanSolver
    //==============================================================================
    MoveUnderConstraintsManager.prototype.cleanSolver = function () {
      if (this.cdsSolver) {
        this.cdsSolver.clean();
      }
      this.cdsJson = null;
      this.cdsSolver = null;
    };

    //==============================================================================
    // MoveUnderConstraintsManager::fixActorRigidSet
    //==============================================================================
    MoveUnderConstraintsManager.prototype.fixActorRigidSet = function (iArrActorPath, ibFix) {
      let obFixToggled = false;

      if (this.cdsSolver && iArrActorPath) {
        let sActorPath = iArrActorPath.join("\\u0005")
        if (sActorPath.length) {
          // IR-1419170: Return success or failure of fixRigidSet
          obFixToggled = this.cdsSolver.fixRigidSet(sActorPath, ibFix);
        }
      }

      return obFixToggled;
    };

    //==============================================================================
    // MoveUnderConstraintsManager::_getActorBS
    //==============================================================================
    MoveUnderConstraintsManager.prototype._getActorBS = function (iRootActor, iActor, isManagerType) {
      let oActorBS = null;

      if (iRootActor && iActor && typeof isManagerType !== "undefined" && isManagerType) {
        // Wont work for Robot1 (Orange)
        //oActorBS = iActor.getBoundingSphere("World");

        if (isManagerType === "Manager_NA") {
          // Works well in CXP Native Play, but makes Web play KO!
          oActorBS = iActor.getBoundingSphere(iRootActor);
        }
        else if (isManagerType === "Manager_WEB") {
          // Works well in Web play but makes CXP Native Play KO!
          oActorBS = iActor.getBoundingSphere("Parent");
        }
      }

      return oActorBS;
    };

    StuContext.registerManager(MoveUnderConstraintsManager);

    // Expose in StuContext namespace.
    StuContext.MoveUnderConstraintsManager = MoveUnderConstraintsManager;

    return MoveUnderConstraintsManager;
  });

define("CXPAssemblyStudioMuCEngine/StuMoveUnderConstraintsManager", ["DS/CXPAssemblyStudioMuCEngine/StuMoveUnderConstraintsManager",]
  , function (MoveUnderConstraintsManager) {
    "use strict";

    return MoveUnderConstraintsManager;
  });
