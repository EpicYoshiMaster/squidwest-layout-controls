// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"5QYpv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "OBSSettings", ()=>OBSSettings);
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _styledComponents = require("styled-components");
var _styledComponentsDefault = parcelHelpers.interopDefault(_styledComponents);
var _client = require("react-dom/client");
var _layout = require("./components/Layout");
var _reactHooks = require("@nodecg/react-hooks");
var _hooks = require("../helpers/hooks");
function OBSSettings() {
    const [obsSettings, SetObsSettings] = (0, _reactHooks.useReplicant)("obssettings", {
        bundle: "squidwest-layout-controls",
        defaultValue: {
            serverIp: "",
            serverPort: "",
            autoConnect: false
        }
    });
    const [serverIp, setServerIp] = (0, _react.useState)("localhost");
    const [serverPort, setServerPort] = (0, _react.useState)("");
    const [serverPassword, setServerPassword] = (0, _react.useState)("");
    const [autoConnect, setAutoConnect] = (0, _react.useState)(false);
    const [statusText, setStatusText] = (0, _react.useState)("");
    const onDisconnect = (0, _react.useCallback)(()=>{
        setStatusText("OBS was disconnected.");
    }, []);
    const connected = (0, _hooks.useObsConnectionStatus)(nodecg, {
        onDisconnect: onDisconnect
    });
    const setObsConnection = (0, _react.useCallback)((connect, settings)=>{
        if (!settings) return;
        setStatusText("Connecting...");
        nodecg.sendMessage("setObsConnection", {
            connect: connect,
            settings: settings
        }).then(()=>{
            setStatusText("OBS Connection Successful!");
        }).catch((error)=>{
            //Simplify some common errors
            if (error.message.includes("ECONNREFUSED")) setStatusText("OBS Connection Failed: Failed to connect. Is OBS open with the WebSocket Server enabled?");
            else if (error.message.includes("ETIMEDOUT")) setStatusText("OBS Connection Failed: Timed out. Double check your information matches what is in OBS!");
            else if (error.message.includes("authentication is required")) setStatusText("OBS Connection Failed: Missing authentication. Check that you've filled out the password field!");
            else if (error.message.includes("Authentication failed.")) setStatusText("OBS Connection Failed: Authentication failed. Verify that your password matches the one in OBS!");
            else setStatusText(`${error.message}`);
        });
    }, []);
    (0, _react.useEffect)(()=>{
        nodecg.readReplicant("obssettings", (obsData)=>{
            if (!obsData) return;
            if (!connected && obsData.autoConnect) setObsConnection(true, obsData);
        });
    }, []);
    (0, _react.useEffect)(()=>{
        if (!obsSettings) return;
        setServerIp(obsSettings.serverIp);
        setServerPort(obsSettings.serverPort);
        if (obsSettings.serverPassword) setServerPassword(obsSettings.serverPassword);
        setAutoConnect(obsSettings.autoConnect);
    }, [
        obsSettings
    ]);
    const updateObsSettings = (0, _react.useCallback)(()=>{
        let newObsSettings = {
            serverIp: serverIp,
            serverPort: serverPort,
            serverPassword: serverPassword,
            autoConnect: autoConnect
        };
        SetObsSettings(newObsSettings);
    }, [
        serverIp,
        serverPort,
        serverPassword,
        autoConnect
    ]);
    return /*#__PURE__*/ (0, _reactDefault.default).createElement(PanelContainer, {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 96,
            columnNumber: 3
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputSection), {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 97,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputSubheader), {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 98,
            columnNumber: 5
        },
        __self: this
    }, "OBS Configuration"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputText), {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 99,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("p", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 100,
            columnNumber: 6
        },
        __self: this
    }, "To use this functionality, go to ", /*#__PURE__*/ (0, _reactDefault.default).createElement("strong", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 100,
            columnNumber: 42
        },
        __self: this
    }, "OBS"), ", then ", /*#__PURE__*/ (0, _reactDefault.default).createElement("strong", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 100,
            columnNumber: 69
        },
        __self: this
    }, "Tools"), ", then ", /*#__PURE__*/ (0, _reactDefault.default).createElement("strong", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 100,
            columnNumber: 98
        },
        __self: this
    }, "WebSocket Server Settings"), "."), /*#__PURE__*/ (0, _reactDefault.default).createElement("p", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 101,
            columnNumber: 6
        },
        __self: this
    }, "Select ", /*#__PURE__*/ (0, _reactDefault.default).createElement("strong", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 101,
            columnNumber: 16
        },
        __self: this
    }, "Enable WebSocket Server"), ", then copy everything in ", /*#__PURE__*/ (0, _reactDefault.default).createElement("strong", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 101,
            columnNumber: 82
        },
        __self: this
    }, "Show Connect Info"), " here."), /*#__PURE__*/ (0, _reactDefault.default).createElement("p", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 102,
            columnNumber: 6
        },
        __self: this
    }, "If OBS is being hosted on this computer, you can instead enter ", /*#__PURE__*/ (0, _reactDefault.default).createElement("strong", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 102,
            columnNumber: 72
        },
        __self: this
    }, "localhost"), " for the ", /*#__PURE__*/ (0, _reactDefault.default).createElement("strong", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 102,
            columnNumber: 107
        },
        __self: this
    }, "Server IP"), "."), /*#__PURE__*/ (0, _reactDefault.default).createElement("p", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 103,
            columnNumber: 6
        },
        __self: this
    }, "This tool expects ", /*#__PURE__*/ (0, _reactDefault.default).createElement("strong", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 103,
            columnNumber: 27
        },
        __self: this
    }, "IPv4 addresses"), " and will not work with IPv6."), /*#__PURE__*/ (0, _reactDefault.default).createElement("p", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 104,
            columnNumber: 6
        },
        __self: this
    }, "Once you're done, make sure to click ", /*#__PURE__*/ (0, _reactDefault.default).createElement("strong", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 104,
            columnNumber: 46
        },
        __self: this
    }, "Apply"), " in OBS afterwards.")), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputRow), {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 106,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputLabel), {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 107,
            columnNumber: 6
        },
        __self: this
    }, "Server IP"), /*#__PURE__*/ (0, _reactDefault.default).createElement("input", {
        type: "text",
        value: serverIp,
        onChange: (event)=>{
            setServerIp(event.target.value);
        },
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 108,
            columnNumber: 6
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputRow), {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 110,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputLabel), {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 111,
            columnNumber: 6
        },
        __self: this
    }, "Server Port"), /*#__PURE__*/ (0, _reactDefault.default).createElement("input", {
        type: "text",
        value: serverPort,
        onChange: (event)=>{
            setServerPort(event.target.value);
        },
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 112,
            columnNumber: 6
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputRow), {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 114,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputLabel), {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 115,
            columnNumber: 6
        },
        __self: this
    }, "Server Password"), /*#__PURE__*/ (0, _reactDefault.default).createElement("input", {
        type: "password",
        value: serverPassword,
        onChange: (event)=>{
            setServerPassword(event.target.value);
        },
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 116,
            columnNumber: 6
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputRow), {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 118,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputLabel), {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 119,
            columnNumber: 6
        },
        __self: this
    }, "Connect on Launch"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputCheckbox), {
        $checked: autoConnect,
        onClick: ()=>setAutoConnect(!autoConnect),
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 120,
            columnNumber: 6
        },
        __self: this
    }))), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputButton), {
        onClick: ()=>{
            updateObsSettings();
        },
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 123,
            columnNumber: 4
        },
        __self: this
    }, "Save"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputSection), {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 124,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputSubheader), {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 125,
            columnNumber: 5
        },
        __self: this
    }, "OBS Connection")), statusText && /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ErrorText), {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 128,
            columnNumber: 5
        },
        __self: this
    }, statusText), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputButton), {
        disabled: connected,
        onClick: ()=>{
            obsSettings && setObsConnection(true, obsSettings);
        },
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 130,
            columnNumber: 4
        },
        __self: this
    }, connected ? "Connected" : "Connect"));
}
const PanelContainer = (0, _styledComponentsDefault.default).div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const root = (0, _client.createRoot)(document.getElementById("root"));
root.render(/*#__PURE__*/ (0, _reactDefault.default).createElement(OBSSettings, {
    __source: {
        fileName: "src/dashboard/OBSSettings.tsx",
        lineNumber: 143,
        columnNumber: 13
    },
    __self: undefined
}));

},{"react":"bH1AQ","styled-components":"9xpRL","react-dom/client":"i5cPj","./components/Layout":"72fYZ","@nodecg/react-hooks":"audz3","../helpers/hooks":"2VUsa","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}],"audz3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _useReplicant = require("./use-replicant");
parcelHelpers.exportAll(_useReplicant, exports);
var _useListenFor = require("./use-listen-for");
parcelHelpers.exportAll(_useListenFor, exports);

},{"./use-replicant":"iySid","./use-listen-for":"ffpLW","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}],"iySid":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "useReplicant", ()=>useReplicant);
var _react = require("react");
var _json = require("klona/json");
const useReplicant = (replicantName, { bundle, defaultValue, persistent } = {})=>{
    const replicant = (0, _react.useMemo)(()=>{
        if (typeof bundle === "string") return nodecg.Replicant(replicantName, bundle, {
            defaultValue,
            persistent
        });
        return nodecg.Replicant(replicantName, {
            defaultValue,
            persistent
        });
    }, [
        bundle,
        defaultValue,
        persistent,
        replicantName
    ]);
    const [value, setValue] = (0, _react.useState)(replicant.value);
    (0, _react.useEffect)(()=>{
        const changeHandler = (newValue)=>{
            setValue((oldValue)=>{
                if (newValue !== oldValue) return newValue;
                return (0, _json.klona)(newValue);
            });
        };
        replicant.on("change", changeHandler);
        return ()=>{
            replicant.removeListener("change", changeHandler);
        };
    }, [
        replicant
    ]);
    const updateValue = (0, _react.useCallback)((newValue)=>{
        if (typeof newValue === "function") // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        newValue(replicant.value);
        else replicant.value = newValue;
    }, [
        replicant
    ]);
    return [
        value,
        updateValue
    ];
};

},{"react":"bH1AQ","klona/json":"loHAU","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}],"loHAU":[function(require,module,exports) {
function klona(val) {
    var k, out, tmp;
    if (Array.isArray(val)) {
        out = Array(k = val.length);
        while(k--)out[k] = (tmp = val[k]) && typeof tmp === "object" ? klona(tmp) : tmp;
        return out;
    }
    if (Object.prototype.toString.call(val) === "[object Object]") {
        out = {}; // null
        for(k in val)if (k === "__proto__") Object.defineProperty(out, k, {
            value: klona(val[k]),
            configurable: true,
            enumerable: true,
            writable: true
        });
        else out[k] = (tmp = val[k]) && typeof tmp === "object" ? klona(tmp) : tmp;
        return out;
    }
    return val;
}
exports.klona = klona;

},{}],"ffpLW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "useListenFor", ()=>useListenFor);
var _react = require("react");
const useListenFor = (messageName, handler, { bundle } = {})=>{
    (0, _react.useEffect)(()=>{
        if (bundle) {
            nodecg.listenFor(messageName, bundle, handler);
            return ()=>{
                nodecg.unlisten(messageName, bundle, handler);
            };
        }
        nodecg.listenFor(messageName, handler);
        return ()=>{
            nodecg.unlisten(messageName, handler);
        };
    }, [
        handler,
        messageName,
        bundle
    ]);
};

},{"react":"bH1AQ","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}],"2VUsa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "useObsConnectionStatus", ()=>useObsConnectionStatus);
var _react = require("react");
const useObsConnectionStatus = (nodecg, options)=>{
    const [connected, setConnected] = (0, _react.useState)(false);
    const onConnectionStatus = (value)=>{
        setConnected(value.isConnected);
        if (options) {
            if (options.onConnect && value.isConnected) options.onConnect();
            if (options.onDisconnect && !value.isConnected) options.onDisconnect();
        }
    };
    (0, _react.useEffect)(()=>{
        nodecg.listenFor("obsConnectionStatus", onConnectionStatus);
        return ()=>{
            nodecg.unlisten("obsConnectionStatus", onConnectionStatus);
        };
    }, []);
    return connected;
};

},{"react":"bH1AQ","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}]},["5QYpv"], "5QYpv", "parcelRequire156b")

//# sourceMappingURL=obssettings.2cbf19a2.js.map
