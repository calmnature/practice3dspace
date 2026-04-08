/// <amd-module name="DS/DELHooks/useFetchSOP"/>
define("DS/DELHooks/useFetchSOP", ["require", "exports", "DS/React18Loader/React"], function (require, exports, React_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const baseUrlConst = "http://localhost:3001";
    const urlConst = `${baseUrlConst}/serializedoperation`;
    const optionConst = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    };
    /**
     * GET Serialized Operations
     * @param { string } url
     * @param { Object } option
     * @returns
     */
    const useFetchSOP = (url = urlConst, option = optionConst) => {
        const [status, setStatus] = (0, React_1.useState)({
            loading: false
        });
        const list = async () => {
            setStatus({ loading: true });
            let call = await fetch(url, option)
                .then((res) => res.json())
                .then((res) => {
                setStatus({ loading: false, data: res.serializedOperation });
            })
                .catch((error) => {
                setStatus({ loading: false, error });
            });
            return call;
        };
        (0, React_1.useEffect)(() => {
            if (url) {
                list();
            }
        }, []);
        return { ...status, list };
    };
    exports.default = useFetchSOP;
});
