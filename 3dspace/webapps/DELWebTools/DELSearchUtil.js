define('DS/DELWebTools/DELSearchUtil', [
    'UWA/Core',
    'UWA/Utils/InterCom'
], function (UWA, InterCom) {
    'use strict';

    var SearchUtil = {

        initialize: function () {
            this.socketName = 'search_socket_' + (new Date()).getTime();
            this.socket = new InterCom.Socket(this.socketName, { dispatchRetryInterval: 5 });
            this.socket.subscribeServer('SearchComServer');
            this.listener = this.objectsSelected.bind(this);
            this.socket.addListener('Selected_Objects_search', this.listener);
            var options = this.options();
            this.socket.dispatchEvent('RegisterContext', options);
            return this;
        },

        options: function (title, types, role, defaultSearchCriteria, bMultiSel, additionalQuery, selectable) {

            let opts = {};
            opts.title = title;
            opts.mode = 'furtive'; // furtive means with an OK & Cancel buttons
            opts.app_socket_id = this.socketName; // name of the socket for communication
            if (widget !== null && widget !== undefined) {
                opts.widget_id = widget.id; // our widget id
            } else {
                opts.widget_id = '';
            }

            opts.default_with_precond = true; // will use a precondition
            opts.show_precond = false; // do not show the precondition when searching
            opts.idcard_activated = false; // do not show an idcard of the object selected
            opts.multiSel = false; //UWA.is(bMultiSel)? bMultiSel : false;
            opts.role = role; // role used when performing the query
            if (types/* && !defaultSearchCriteria*/) {
                opts.precond = '';
                types = types.split(',');
                types.forEach(function (item, index) {
                    if (index !== 0) {
                        opts.precond += ' OR ';
                    }
                    opts.precond += 'flattenedtaxonomies:"types/' + item + '"';
                });
            }

            if (additionalQuery) {
                if (opts.precond) {
                    opts.precond = "( " + opts.precond + ") AND " + additionalQuery;
                } else {
                    opts.precond = additionalQuery;
                }
            }

            if (selectable && selectable.length > 0) {
                opts.columns = selectable;
            }

            return (opts);
        },

        destroy: function () {
            let optionsUnregister = {};
            optionsUnregister.widget_id = widget.id;
            this.socket.dispatchEvent('unregisterSearchContext', optionsUnregister);
            this.socket.unsubscribeServer('SearchComServer');
            this.socket.removeListener('Selected_Objects_search', this.listener);
            this.socket.disconnect();
            delete this.socket;
        },

        activate: function (title, types, role, defaultSearchCriteria, bMultiSel, callback, additionalQuery, selectable) {
            const options = this.options(title, types, role, defaultSearchCriteria, bMultiSel, additionalQuery, selectable);
            this.callback = callback;
            this.socket.dispatchEvent('InContextSearch', options);
        },

        isAvailable: function () {
            return (UWA.is(this.socket));
        },

        configureSearch: function (options) {
            if (!this.isAvailable()) {
                this.initialize(options);
            }
        },

        launchSearch: function (options) {
            const that = this;
            that.initialize();
            that.activate('Builder',
                options.allowedTypes, options.role || ''/* role */, /* '*'+ */
                options.criteria/* +'*' */, options.bMultiSel,
                function (results) {
                    options.in_apps_callback(results);
                }, options.additionalQuery,
                options.selectable);
        },

        objectsSelected: function (parameters) {
            let result = [], i, len;
            if (this.callback) {
                i = 0;
                len = parameters.length;
                for (; i < len; i++) {
                    result.push(parameters[i]);
                }
                this.callback(result);
            }
        }
    };

    return SearchUtil;
});

