
define('DS/XCTTwinExpRTWeb/StuProductExperienceTwinActor', ['DS/StuCore/StuContext', 'DS/StuRenderEngine/StuActor3D', 'DS/StuRenderEngine/CXPConfServices', 'DS/StuModel/StuVariantsManager'], function (STU, Actor3D, CXPConfServices, StuVariantsManager) {
	'use strict';

	/**
	 * Describe a STU.Actor3D which represents a Product imported in the experience.
	 * This object has a geometric representation which is required by some specific STU.Behavior.
	 *
	 * @exports ProductExperienceTwinActor
	 * @class
	 * @constructor
	 * @noinstancector
	 * @public
	 * @extends STU.Actor3D
	 * @memberof STU
	 * @alias STU.ProductExperienceTwinActor
	 */
	var ProductExperienceTwinActor = function () {

		Actor3D.call(this);

		//this.CATICXPProductConfigMgr;

		/**
		 * Override of opacity from STU.Actor3D
		 * as STU.ProductExperienceTwinActor doesn't have opacity.
		 *
		 * @member
		 * @instance
		 * @name opacity
		 * @private
		 * @type {number}
		 * @memberof STU.ProductExperienceTwinActor
		 */
		Object.defineProperty(this, "opacity", {
			enumerable: true,
			configurable: true,
			get: function () {
				return 0;
			}
			// set: function (iOpacity) {
			// 	if (iOpacity > 0)
			// 		console.warn('There is no opacity on STU.ProductExperienceTwinActor');
			// }
		});

		/**
		 * Set the current config of this STU.ProductExperienceTwinActor.
		 *
		 * @member
		 * @instance
		 * @name currentConfiguration
		 * @public
		 * @type {Object}
		 * @memberof STU.ProductExperienceTwinActor
		 */
		Object.defineProperty(this, 'currentConfiguration', {
			enumerable: true,
			configurable: true,
			get: function () {
				var myConfsManager = new CXPConfServices().build();
				return myConfsManager.getConfiguration(this.CATI3DExperienceObject);
			},
			set: function (iConfig) {
				var myConfsManager = new CXPConfServices().build();
				myConfsManager.setConfiguration(this.CATI3DExperienceObject, iConfig.CATI3DExperienceObject);
				myConfsManager.checkActivations(this.CATI3DExperienceObject);
			}
		});

	};

	ProductExperienceTwinActor.prototype = new Actor3D();
	ProductExperienceTwinActor.prototype.constructor = ProductExperienceTwinActor;

	/**
	 * Process executed when STU.ProductExperienceTwinActor is activating.
	 *
	 * @method
	 * @private
	 */
	ProductExperienceTwinActor.prototype.onInitialize = function (oExceptions) {
		Actor3D.prototype.onInitialize.call(this, oExceptions);

		if (this.variants !== undefined && this.variants !== null) {
			for (let i = 0; i < this.variants.length; i++) {
				this.variants[i].initialize(oExceptions);
			}
		}

		if (this._exposedConfigurations === undefined) return;
		// if the block is empty it is considered as executed
		for (let j = 0; j < this['_exposedConfigurations'].length; j++) {
			this['_exposedConfigurations'][j].initialize();
		}

	};

	/**
	* Process to execute when this STU.ProductExperienceTwinActor is disposing.
	*
	* @method
	* @private
	*/
	ProductExperienceTwinActor.prototype.onDispose = function () {
		Actor3D.prototype.onDispose.call(this);

		if (this.variants !== undefined && this.variants !== null) {
			for (var i = this.variants.length - 1; i >= 0; i--) {
				this.variants[i].dispose();
			}
		}
	};

	/**
	 * Process executed when STU.ProductExperienceTwinActor is activating.
	 *
	 * @method
	 * @private
	 */
	ProductExperienceTwinActor.prototype.onActivate = function (oExceptions) {
		Actor3D.prototype.onActivate.call(this, oExceptions);

		if (this.variants !== undefined && this.variants !== null) {
			for (let i = 0; i < this.variants.length; i++) {
				this.variants[i].updateActivity(oExceptions);
			}
		}

		// if the block is empty it is considered as executed
		if (this._exposedConfigurations === undefined) return;
		for (let j = 0; j < this['_exposedConfigurations'].length; j++) {
			this['_exposedConfigurations'][j].updateActivity(oExceptions);
		}
	};

	/**
	* Process executed when STU.ProductExperienceTwinActor is deactivating.
	*
	* @method
	* @private
	*/
	ProductExperienceTwinActor.prototype.onDeactivate = function (oExceptions) {
		Actor3D.prototype.onDeactivate.call(this, oExceptions);

		if (this.variants !== undefined && this.variants !== null) {
			for (var i = this.variants.length - 1; i >= 0; i--) {
				this.variants[i].updateActivity();
			}
		}
	};

	////////////////////////////////
	////// IBS PUBLIC JS APIs for CONFS

	/**
	 * Returns the configuration applied to this STU.ProductExperienceTwinActor.
	 *
	 * @method
	 * @public
	 * @return {STU.ProductConfiguration} the configuration applied to this STU.ProductExperienceTwinActor at the time of the call
	 */
	ProductExperienceTwinActor.prototype.getCurrentConfiguration = function () {
		var myConfsManager = new CXPConfServices().build();
		return myConfsManager.getConfiguration(this.CATI3DExperienceObject);
	};

	/**
	 * Removes all configurations applied to this STU.ProductExperienceTwinActor.
	 *
	 * @method
	 * @public
	 */
	ProductExperienceTwinActor.prototype.removeCurrentConfiguration = function () {
		var myConfsManager = new CXPConfServices().build();
		myConfsManager.removeConfiguration(this.CATI3DExperienceObject);
		myConfsManager.checkActivations(this.CATI3DExperienceObject);
	};

	/**
	 * Applies a configuration to this STU.ProductExperienceTwinActor.
	 *
	 * @method
	 * @public
	 * @param {STU.ProductConfiguration} iConf Configuration to apply to this STU.ProductExperienceTwinActor.
	 */
	ProductExperienceTwinActor.prototype.setCurrentConfiguration = function (iConf) {
		var myConfsManager = new CXPConfServices().build();
		myConfsManager.setConfiguration(this.CATI3DExperienceObject, iConf.CATI3DExperienceObject);
		myConfsManager.checkActivations(this.CATI3DExperienceObject);
	};

	/**
	 * Returns the list of configurations exposed on this STU.ProductExperienceTwinActor.
	 *
	 * @method
	 * @public
	 * @return {STU.ProductConfiguration[]} the exposed configurations on this STU.ProductExperienceTwinActor.
	 */
	ProductExperienceTwinActor.prototype.getConfigurations = function () {
		return this._exposedConfigurations;
	};


	////////////////////////////////
	////// IBS PRIVATE JS APIs for CONFS (ODTs)

	/**
	  * Applies a configuration, identified by its name, to this STU.ProductExperienceTwinActor.
	  *
	  * @method
	  * @private
	  * @param {string} iName Name of the configuration to apply to this actor.
	  */
	ProductExperienceTwinActor.prototype.setCurrentConfigurationByName = function (iName) {
		var myConfsManager = new CXPConfServices().build();
		myConfsManager.setConfigurationByName(this.CATI3DExperienceObject, iName);
		myConfsManager.checkActivations(this.CATI3DExperienceObject);
	};
	/**
	* Returns the name of the applied configuration to this STU.ProductExperienceTwinActor.
	*
	* @method
	* @private
	* @return {string} the configuration name; empty string if no configuration is found.
	*/
	ProductExperienceTwinActor.prototype.getCurrentConfigurationName = function () {
		var myConfsManager = new CXPConfServices().build();
		return myConfsManager.getCurrentConfigurationName(this.CATI3DExperienceObject);
	};

	////// ~IBS JS APIs for CONFS
	////////////////////////////////

	////////////////////////////////
	////// ASO4 PRIVATE JS APIs for ASSET UPDATE

	/**
	* Retrieve the object�s status relative to its asset link.
	*
	* @method
	* @private
	* @return {STU.Actor3D.EAssetLinkStatus} enum describing the status of the object�s asset link
	*/
	ProductExperienceTwinActor.prototype.getAssetLinkStatus = function () {
		var status = this.CATI3DExperienceObject.getAssetLinkStatus();
		return status;
	};

	////// ~ASO4 JS APIs for ASSET UPDATE
	////////////////////////////////




	////////////////////////////////
	////// JS APIs for VARIANTS

	/**
			* Returns a Variant identified by its name, defined in the context of this Twin Root Actor
			* @method
			* @public
			* @param {String} [iName] the name of the variant
			* @return {STU.Variant}
			*/
	ProductExperienceTwinActor.prototype.getVariantByName = function (iName) {
		var myVariantsManager = StuVariantsManager.get();
		return myVariantsManager.getVariantByNameInContext(this.CATI3DExperienceObject, iName);
	};

	/**
		* Returns a Variant identified by its display name, defined in the context of this Twin Root Actor
		* WARNING: if display name is not unique, first variant found is returned
		* @method
		* @public
		* @param {String} [iDisplayName] the display name of the variant
		* @return {STU.Variant}
		*/
	ProductExperienceTwinActor.prototype.getVariantByDisplayName = function (iDisplayName) {
		var myVariantsManager = StuVariantsManager.get();
		return myVariantsManager.getVariantByDisplayNameInContext(this.CATI3DExperienceObject, iDisplayName);
	};

	/**
		* Returns an array of all the Variants of a given type, defined in the context of this Twin Root Actor
		* @method
		* @public
		* @param {STU.Variant.EVariantType} iType type of the returned variants
		* @return {STU.Variant[]}
		*/
	ProductExperienceTwinActor.prototype.getVariantsByType = function (iType) {
		var typeVariants = [];
		for (const variant of this.variants) {
			if (variant.getType() === iType
				|| iType === STU.Variant.EVariantType.eAll
				|| iType === STU.Variant.EVariantType.ePackage && variant.getType() === STU.Variant.EVariantType.eProductConfiguration
				|| iType === STU.Variant.EVariantType.ePackage && variant.getType() === STU.Variant.EVariantType.eUserPackage) {
				typeVariants.push(variant);
			}
		}
		return typeVariants;
	};

	////////////////////////////////
	////// DCN23 JS APIs for PLM METADATA

	/**
	 * Returns the PLM Metedata of this Twin Root Actor.
	 * Function can also be used to retrive PLM Infos from a STU.Intersection issued from a pick.
	 *
	 * @method
	 * @public
	 * @param {STU.Intersection} [iIntersection] - the intersection of the picked occurrence
	 * @param {boolean} [iLeafElemOnly=false] - set to true to get only the PLM Infos of the lowest element picked in the list returned
	 * @return {Object} list containing the dictionnaries of PLMMetadata of all the occurences picked in the arborescense {propertyName: propertyValue}
	 */
	ProductExperienceTwinActor.prototype.getPLMMetadata = function (iIntersection, iLeafElemOnly = false) {
		// Initialize PLMServices if not already done
		if (!this.PLMServices) {
			this.PLMServices = this.buildPLMServices();
		}

		// Internal function to extract properties from a given object (itself or as argument)
		const extractPLMProperties = (source) => {
			const targetPLMProperties = {};
			const propertiesNames = this.PLMServices.GetPLMProperties(source);

			for (const propName of propertiesNames) {
				targetPLMProperties[propName] = this.PLMServices.GetPLMPropValue(source, propName);
			}

			return targetPLMProperties;
		};

		// Working as a service
		if (iIntersection && iIntersection._occurence) {
			var PLMDataHolderList = [];

			if (iLeafElemOnly) {
				PLMDataHolderList.push(extractPLMProperties(iIntersection._occurence[0]));
			}
			else {
				for (var holder of iIntersection._occurence) {
					PLMDataHolderList.push(extractPLMProperties(holder));
				}
			}

			return PLMDataHolderList;
		}

		// Cache properties if not already done
		if (!this.PLMProperties) {
			this.PLMProperties = extractPLMProperties(this.CATI3DExperienceObject);
		}

		return this.PLMProperties;
	};

	////// ~DCN23 JS APIs for PLM METADATA
	////////////////////////////////

	// Expose in STU namespace.
	STU.ProductExperienceTwinActor = ProductExperienceTwinActor;

	return ProductExperienceTwinActor;
});

define('XCTTwinExpRTWeb/StuProductExperienceTwinActor', ['DS/XCTTwinExpRTWeb/StuProductExperienceTwinActor'], function (ProductExperienceTwinActor) {
	'use strict';

	return ProductExperienceTwinActor;
});
