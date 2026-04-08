/// <amd-module name="DS/DELInfraWeb/components/DELAppError"/>
define("DS/DELInfraWeb/components/DELAppError", ["require", "exports", "DS/React18Loader/React", "i18n!DS/DELInfraWeb/assets/nls/DELApplication"], function (require, exports, React, nls) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const DELAppError = ({ errorDetails = nls.notAvailable }) => {
        return (React.createElement("div", { className: 'container-fluid m-2' },
            React.createElement("div", { className: 'p-3 bg-danger text-white' },
                React.createElement("h3", null, "Application initialization failed...")),
            React.createElement("div", { className: 'p-3 bg-danger-subtle' },
                React.createElement("span", { className: 'font-weight-bold mx-2' }, nls.details),
                errorDetails)));
    };
    exports.default = DELAppError;
});
