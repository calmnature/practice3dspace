define('DS/DELWebInfrastructure/Controls/DataGridViewResourceContextualMenuBuilder',
    ['DS/DataGridView/DataGridViewContextualMenuBuilder'],
function (DataGridViewContextualMenuBuilder) {
    'use strict';

    /***  IR-1497327-3DEXPERIENCER2026x
        Both Chrome and FF deprecated the ability to call a class constructor using <parent_class>.call(...), and the keyword 'class' is a restricted word in ES5 (which JavaScriptMVC's version of Rhino uses).
        Therefore we had to move the declaratation of the class to someplace that JavaScriptMVC doesn't compile (DELWebInfrastructureUI/DELWebInfrastructure.mwebext) and then add all the overloaded methods
        in the module that is actually implementing them (DELWebAssetMgmtUI/DELWebAssetMgmt.mweb).
    ***/

    class DataGridViewResourceContextualMenuBuilder extends DataGridViewContextualMenuBuilder {
        constructor (collectionView) {
            super(collectionView); //call the DataGridViewContextualMenuBuilder constructor

            this._baseSupportedMenus = this._supportedMenus.slice(0); //clone the array
        }
    };

    //make sure the constructor type is correct
    Object.defineProperty(DataGridViewResourceContextualMenuBuilder.prototype, 'constructor', {
        value: DataGridViewResourceContextualMenuBuilder,
        enumerable: false, // so that it does not appear in 'for in' loop
        writable: true
    });

    return DataGridViewResourceContextualMenuBuilder;
});
