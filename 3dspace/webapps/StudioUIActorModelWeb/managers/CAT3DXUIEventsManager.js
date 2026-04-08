/**
 * @name DS/StudioUIActorModelWeb/managers/CAT3DXUIEventsManager
 * @constructor
 * @hideconstructor
 *
 * @description
 * Manager to process UI events for 3D UIActors
 */
define('DS/StudioUIActorModelWeb/managers/CAT3DXUIEventsManager',
[
    'UWA/Core',
    'UWA/Class/Events',
    'UWA/Class/Listener',
    'DS/VisuEvents/EventsManager',
    'DS/Visualization/ThreeJS_DS',
    'DS/CATCXPModel/CATCXPRenderUtils',
    'DS/StudioUIActorModelWeb/interfaces/CATI3DXUIEvents'
],
function (
    UWA,
    Events,
    Listener,
    VisuEventsManager,
    THREE,
    CATCXPRenderUtils,
    CATI3DXUIEvents
) {
    'use strict';

    let CAT3DXUIEventsManager = UWA.Class.extend(Events, Listener,
        /** @lends DS/StudioUIActorModelWeb/managers/CAT3DXUIEventsManager.prototype **/
        {
            Build: function () {
                this._inputViewer = undefined;
                this._registeredActors = [];
                this._listenedEvents = [];
                this._listenerActive = false;
                this._touchReleased = false;
                this._storedIndexes = [];
                this._storedPositions = [];
            },

            Dispose: function () {
                while (this._registeredActors.length > 0) {
                    this.Unregister3DUIActor(this._registeredActors[0]);
                }

                this._inputViewer = undefined;
                this._registeredActors = [];
                this._listenedEvents = [];
                this._listenerActive = false;
                this._touchReleased = false;
                this._storedIndexes = [];
                this._storedPositions = [];
            },

            Register3DUIActor: function (iActor) {
                if (iActor && !this._registeredActors.includes(iActor)) {
                    this._registeredActors.push(iActor);

                    const actorUIEventInterface = iActor.QueryInterface(CATI3DXUIEvents.interfaceName);
                    if (actorUIEventInterface) { // Listen to the visible property of the registered actor
                        const checkModelToProcessEvents = function () {
                            // Only process events if the 3DUIActor is visible
                            const actorVisible = iActor.GetValueByName('visible');
                            // Only process events if the 3DUIActor is enabled
                            const actorEnabled = iActor.GetValueByName('enabled');
                            actorUIEventInterface.processUIEvents(actorVisible && actorEnabled);
                        }

                        checkModelToProcessEvents(); // check now and after model changes
                        this.listenTo(iActor, 'visible.CHANGED', checkModelToProcessEvents);
                        this.listenTo(iActor, 'enabled.CHANGED', checkModelToProcessEvents);
                    }

                }

                if (this._registeredActors.length > 0 && !this._listenerActive) {
                    this._registerEvents();
                }
            },

            Unregister3DUIActor: function (iActor) {
                if (iActor && this._registeredActors.includes(iActor)) {
                    const actorIndex = this._registeredActors.indexOf(iActor);
                    if (actorIndex > -1) {
                        this._registeredActors.splice(actorIndex, 1);

                        // Stop listening to the visible property of the unregistered actor
                        this.stopListening(iActor, 'visible.CHANGED');
                    }
                }

                if (this._registeredActors.length == 0 && this._listenerActive) {
                    this._unregisterEvents();
                }
            },

            _getInputViewer: function () {
                if (!this._inputViewer) {
                    this._inputViewer = this._experienceBase.webApplication.frmWindow.getViewer();
                }
                return this._inputViewer;
            },


            _registerEvents: function() {
                if (!this._listenedEvents) return;

                const viewer = this._getInputViewer();
                if (!viewer) return;

                const _this = this;
                this._listenedEvents.push(VisuEventsManager.addEvent(viewer.div, 'onLeftClick', function (evt) {
                    if (evt.from[0].view !== _this._inputViewer.canvas) {
                        return;
                    }

                    if (_this._storedIndexes[0] > -1) {
                        const pickedActor = _this._registeredActors[_this._storedIndexes[0]];
                        if (pickedActor) {
                            const pickedActorUIEventInterface = pickedActor.QueryInterface(CATI3DXUIEvents.interfaceName);
                            if (pickedActorUIEventInterface) {
                                pickedActorUIEventInterface.receiveUIEvent(CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUILeftClickEvent);
                            }
                        }
                    }
                }));
                this._listenedEvents.push(VisuEventsManager.addEvent(viewer.div, 'onRightClick', function (evt) {
                    if (evt.from[0].view !== _this._inputViewer.canvas) {
                        return;
                    }

                    if (_this._storedIndexes[0] > -1) {
                        const pickedActor = _this._registeredActors[_this._storedIndexes[0]];
                        if (pickedActor) {
                            const pickedActorUIEventInterface = pickedActor.QueryInterface(CATI3DXUIEvents.interfaceName);
                            if (pickedActorUIEventInterface) {
                                pickedActorUIEventInterface.receiveUIEvent(CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIRightClickEvent);
                            }
                        }
                    }
                }));
                this._listenedEvents.push(VisuEventsManager.addEvent(viewer.div, 'onLeftDoubleClick', function (evt) {
                    if (evt.from[0].view !== _this._inputViewer.canvas) {
                        return;
                    }

                    if (_this._storedIndexes[0] > -1) {
                        const pickedActor = _this._registeredActors[_this._storedIndexes[0]];
                        if (pickedActor) {
                            const pickedActorUIEventInterface = pickedActor.QueryInterface(CATI3DXUIEvents.interfaceName);
                            if (pickedActorUIEventInterface) {
                                pickedActorUIEventInterface.receiveUIEvent(CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIDoubleClickEvent);
                            }
                        }
                    }
                }));
                this._listenedEvents.push(VisuEventsManager.addEvent(viewer.div, 'onLeftMouseDown', function (evt) {
                    if (evt.from[0].view !== _this._inputViewer.canvas) {
                        return;
                    }

                    if (_this._storedIndexes[0] > -1) {
                        const pickedActor = _this._registeredActors[_this._storedIndexes[0]];
                        if (pickedActor) {
                            const pickedActorUIEventInterface = pickedActor.QueryInterface(CATI3DXUIEvents.interfaceName);
                            if (pickedActorUIEventInterface) {
                                pickedActorUIEventInterface.receiveUIEvent(CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIPressEvent);
                            }
                        }
                    }
                }));
                this._listenedEvents.push(VisuEventsManager.addEvent(viewer.div, 'onLeftMouseUp', function (evt) {
                    if (evt.from[0].view !== _this._inputViewer.canvas) {
                        return;
                    }

                    if (_this._storedIndexes[0] > -1) {
                        const pickedActor = _this._registeredActors[_this._storedIndexes[0]];
                        if (pickedActor) {
                            const pickedActorUIEventInterface = pickedActor.QueryInterface(CATI3DXUIEvents.interfaceName);
                            if (pickedActorUIEventInterface) {
                                pickedActorUIEventInterface.receiveUIEvent(CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIReleaseEvent);
                            }
                        }
                    }
                }));
                this._listenedEvents.push(VisuEventsManager.addEvent(viewer.div, 'onMouseMove', function (evt) {
                    if (evt.from[0].view !== _this._inputViewer.canvas) {
                        return;
                    }

                    // Update of the stored position from the event data
                    if (evt.from[0]) _this._storedPositions[0] = evt.from[0].currentPosition;

                    let pickedActorExited = false;
                    const pickedActor = _this._getPickedUIActorInPosition(_this._storedPositions[0]);
                    if (pickedActor) {
                        const pickedActorIndex = _this._getIndexOfPickedUIActorObject(pickedActor);
                        if (pickedActorIndex != -1) {
                            if (_this._storedIndexes[0] > -1) { // _storedIndexes[0] already initialized
                                const previousPickedActor = _this._registeredActors[_this._storedIndexes[0]];
                                if (previousPickedActor && previousPickedActor.GetObject() == pickedActor) {
                                    const pickedActorUIEventInterface = pickedActor.QueryInterface(CATI3DXUIEvents.interfaceName);
                                    if (pickedActorUIEventInterface) {
                                        pickedActorUIEventInterface.receiveUIEvent(CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIHoverEvent);
                                    }
                                } else {
                                    pickedActorExited = true;
                                }
                            } else { // _storedIndexes[0] to be initialized
                                _this._storedIndexes[0] = pickedActorIndex;

                                const pickedActorUIEventInterface = pickedActor.QueryInterface(CATI3DXUIEvents.interfaceName);
                                if (pickedActorUIEventInterface) {
                                    pickedActorUIEventInterface.receiveUIEvent(CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIEnterEvent);
                                }
                            }
                        }
                    } else if (_this._storedIndexes[0] > -1) {
                        pickedActorExited = true;
                    }

                    if (pickedActorExited) {
                        const previousPickedActor = _this._registeredActors[_this._storedIndexes[0]];
                        if (previousPickedActor) {
                            const pickedActorUIEventInterface = previousPickedActor.QueryInterface(CATI3DXUIEvents.interfaceName);
                            if (pickedActorUIEventInterface) {
                                pickedActorUIEventInterface.receiveUIEvent(CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIExitEvent);
                                pickedActorUIEventInterface.receiveUIEvent(CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIReleaseEvent);
                            }
                        }

                        _this._storedIndexes[0] = -1;
                    }
                }));
                this._listenedEvents.push(VisuEventsManager.addEvent(viewer.div, 'onTap', function (evt) {
                    if (evt.from[0].view !== _this._inputViewer.canvas) {
                        return;
                    }

                    if (_this._storedIndexes[0] > -1) {
                        const pickedActor = _this._registeredActors[_this._storedIndexes[0]];
                        if (pickedActor) {
                            const pickedActorUIEventInterface = pickedActor.QueryInterface(CATI3DXUIEvents.interfaceName);
                            if (pickedActorUIEventInterface) {
                                pickedActorUIEventInterface.receiveUIEvent(CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUILeftClickEvent);
                            }
                        }

                    }
                }));
                this._listenedEvents.push(VisuEventsManager.addEvent(viewer.div, 'onTwoFingerTap', function (evt) {
                    if (evt.from[0].view !== _this._inputViewer.canvas) {
                        return;
                    }

                    if ((_this._storedIndexes[0] > -1 && _this._storedIndexes[1] > -1) &&
                        (_this._storedIndexes[0] == _this._storedIndexes[1])) {
                        const pickedActor = _this._registeredActors[_this._storedIndexes[0]];
                        if (pickedActor) {
                            const pickedActorUIEventInterface = pickedActor.QueryInterface(CATI3DXUIEvents.interfaceName);
                            if (pickedActorUIEventInterface) {
                                pickedActorUIEventInterface.receiveUIEvent(CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIRightClickEvent);
                            }
                        }

                    }
                }));
                this._listenedEvents.push(VisuEventsManager.addEvent(viewer.div, 'onDoubleTap', function (evt) {
                    if (evt.from[0].view !== _this._inputViewer.canvas) {
                        return;
                    }

                    if (_this._storedIndexes[0] > -1) {
                        const pickedActor = _this._registeredActors[_this._storedIndexes[0]];
                        if (pickedActor) {
                            const pickedActorUIEventInterface = pickedActor.QueryInterface(CATI3DXUIEvents.interfaceName);
                            if (pickedActorUIEventInterface) {
                                pickedActorUIEventInterface.receiveUIEvent(CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIDoubleClickEvent);
                            }
                        }
                    }
                }));
                this._listenedEvents.push(VisuEventsManager.addEvent(viewer.div, 'onTouch', function (evt) {
                    if (evt.from[0].view !== _this._inputViewer.canvas) {
                        return;
                    }

                    // Initialization of stored properties after the touch is released
                    if (_this._touchReleased) {
                        _this._storedPositions = [];
                        _this._storedIndexes = [];
                        _this._touchReleased = false;
                    }

                    // Update of the stored position from the event data
                    if (evt.from[0]) _this._storedPositions[0] = evt.from[0].currentPosition;
                    if (evt.from[1]) _this._storedPositions[1] = evt.from[1].currentPosition;

                    let pickedActor0; let pickedActorIndex0 = -1;
                    if (_this._storedPositions[0]) {
                        pickedActor0 = _this._getPickedUIActorInPosition(_this._storedPositions[0]);
                        pickedActorIndex0 = _this._getIndexOfPickedUIActorObject(pickedActor0);
                    }

                    let pickedActor1; let pickedActorIndex1 = -1;
                    if (_this._storedPositions[1]) {
                        pickedActor1 = _this._getPickedUIActorInPosition(_this._storedPositions[1]);
                        pickedActorIndex1 = _this._getIndexOfPickedUIActorObject(pickedActor1);
                    }

                    if (pickedActor0 && pickedActorIndex0 != -1) {
                        _this._storedIndexes[0] = pickedActorIndex0;

                        const pickedActorUIEventInterface = pickedActor0.QueryInterface(CATI3DXUIEvents.interfaceName);
                        if (pickedActorUIEventInterface) {
                            pickedActorUIEventInterface.receiveUIEvent(CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIEnterEvent);
                            pickedActorUIEventInterface.receiveUIEvent(CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIHoverEvent);
                            pickedActorUIEventInterface.receiveUIEvent(CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIPressEvent);
                        }
                    }

                    if (pickedActor1 && pickedActorIndex1 != -1) {
                        _this._storedIndexes[1] = pickedActorIndex1;
                    }
                }));
                this._listenedEvents.push(VisuEventsManager.addEvent(viewer.div, 'onTouchDrag', function (evt) {
                    if (evt.from[0].view !== _this._inputViewer.canvas) {
                        return;
                    }

                    // Initialization of stored properties after the touch is released
                    if (_this._touchReleased) {
                        _this._storedPositions = [];
                        _this._storedIndexes = [];
                        _this._touchReleased = false;
                        return // This is needed because an extra touchDrag event is send after the touch is released
                    }

                    // Update of the stored position from the event data
                    if (evt.from[0]) _this._storedPositions[0] = evt.from[0].currentPosition;

                    let pickedActor0; let pickedActorIndex0 = -1;
                    if (_this._storedPositions[0]) {
                        pickedActor0 = _this._getPickedUIActorInPosition(_this._storedPositions[0]);
                        pickedActorIndex0 = _this._getIndexOfPickedUIActorObject(pickedActor0);
                    }

                    let pickedActorExited = false;
                    if (pickedActor0 && pickedActorIndex0 != -1) {
                        if (_this._storedIndexes[0] > -1) { // _storedIndexes[0] already initialized
                            const previousPickedActor = _this._registeredActors[_this._storedIndexes[0]];
                            if (previousPickedActor && previousPickedActor.GetObject() == pickedActor0) {
                                const pickedActorUIEventInterface = pickedActor0.QueryInterface(CATI3DXUIEvents.interfaceName);
                                if (pickedActorUIEventInterface) {
                                    pickedActorUIEventInterface.receiveUIEvent(CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIHoverEvent);
                                }
                            } else {
                                pickedActorExited = true;
                            }
                        } else { // _storedIndexes[0] to be initialized
                            _this._storedIndexes[0] = pickedActorIndex0;

                            const pickedActorUIEventInterface = pickedActor0.QueryInterface(CATI3DXUIEvents.interfaceName);
                            if (pickedActorUIEventInterface) {
                                pickedActorUIEventInterface.receiveUIEvent(CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIEnterEvent);
                                pickedActorUIEventInterface.receiveUIEvent(CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIHoverEvent);
                            }
                        }
                    } else if (_this._storedIndexes[0] > -1) {
                        pickedActorExited = true;
                    }

                    if (pickedActorExited) {
                        const previousPickedActor = _this._registeredActors[_this._storedIndexes[0]];
                        if (previousPickedActor) {
                            const pickedActorUIEventInterface = previousPickedActor.QueryInterface(CATI3DXUIEvents.interfaceName);
                            if (pickedActorUIEventInterface) {
                                pickedActorUIEventInterface.receiveUIEvent(CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIExitEvent);
                                pickedActorUIEventInterface.receiveUIEvent(CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIReleaseEvent);
                            }
                        }

                        _this._storedPositions = [];
                        _this._storedIndexes = [];
                    }
                }));
                this._listenedEvents.push(VisuEventsManager.addEvent(viewer.div, 'onRelease', function (evt) {
                    if (evt.from[0].view !== _this._inputViewer.canvas) {
                        return;
                    }

                    if (_this._storedIndexes[0] > -1) {
                        const pickedActor = _this._registeredActors[_this._storedIndexes[0]];
                        if (pickedActor) {
                            const pickedActorUIEventInterface = pickedActor.QueryInterface(CATI3DXUIEvents.interfaceName);
                            if (pickedActorUIEventInterface) {
                                pickedActorUIEventInterface.receiveUIEvent(CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIExitEvent);
                                pickedActorUIEventInterface.receiveUIEvent(CATI3DXUIEvents.CAT3DXUIEventTypes.CAT3DXUIReleaseEvent);
                            }
                        }

                    }
                    _this._touchReleased = true;

                }));

                this._listenerActive = true;
            },

            _unregisterEvents: function () {
                if (this._listenedEvents) { // unsubscribe events
                    for (let i = this._listenedEvents.length; i--;) {
                        VisuEventsManager.removeEventFromToken(this._listenedEvents[i]);
                        this._listenedEvents.splice(i, 1);
                    }
                }

                this._listenerActive = false;
            },

            _getPickedUIActorInPosition: function (inputPosition) {
                const viewer = this.GetObject()._experienceBase.getManager('CAT3DXVisuManager').getViewer();
                if (! viewer) return null;

                let intersections = [];
                const position = new THREE.Vector2(inputPosition.x, inputPosition.y);
                const mousePosition = viewer.getMousePosition(position);
                const pickData = viewer.pick(mousePosition, 'mesh', false);

                if (pickData) {
                    const path = pickData.path;
                    if (path.length >= 1) {
                        const components = CATCXPRenderUtils.getComponentsFromPathElement(pickData.path[0], true);
                        if (components.length === 1) {
                            const intersection = new STU.Intersection();
                            intersection.setActor(components[0]);

                            intersections.push(intersection);
                        }
                    }
                }

                if (intersections.length > 0 && intersections[0]) {
                    const firstIntersection = intersections[0];
                    return firstIntersection.getActor();
                } else {
                    return null;
                }
            },

            _getIndexOfPickedUIActorObject: function (iPickedActorObject) {
                if (! iPickedActorObject) return -1;

                for (let index in this._registeredActors) {
                    let actor = this._registeredActors[index];
                    if (actor) {
                        if (actor && actor.GetObject() == iPickedActorObject) {
                            return index;
                        }
                    }
                }

                return -1;
            },

            _checkPickedActorObject: function (iPickedActorObject) {
                return (this._getIndexOfPickedUIActorObject(iPickedActorObject) != -1);
            },

            GetType: function () {
                return 'CAT3DXUIEventsManager';
            },

        }
    );

    return CAT3DXUIEventsManager;
});
