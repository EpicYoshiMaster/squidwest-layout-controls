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
var _collapseContainer = require("./components/CollapseContainer");
var _lodash = require("lodash");
const defaultObsSettings = {
    serverIp: "localhost",
    serverPort: "4455",
    serverPassword: "",
    autoConnect: false
};
const connectingMessage = "Connecting...";
function OBSSettings() {
    const [obsSettings, setObsSettings] = (0, _reactHooks.useReplicant)("obssettings", {
        bundle: "squidwest-layout-controls",
        defaultValue: defaultObsSettings
    });
    const [dashboardObsSettings, setDashboardObsSettings] = (0, _react.useState)(defaultObsSettings);
    const [statusText, setStatusText] = (0, _react.useState)("");
    const onDisconnect = (0, _react.useCallback)(()=>{
        setStatusText("OBS was disconnected.");
    }, []);
    const connected = (0, _hooks.useObsConnectionStatus)(nodecg, {
        onDisconnect: onDisconnect
    });
    const setObsConnection = (0, _react.useCallback)((connect, settings)=>{
        if (!settings) return;
        setStatusText(connectingMessage);
        nodecg.sendMessage("setObsConnection", {
            connect: connect,
            settings: settings
        }).then(()=>{
            //OBS Connection Successful
            setStatusText("");
        }).catch((error)=>{
            console.log(error);
            //Simplify some common errors
            if (error.message.includes("ECONNREFUSED")) setStatusText("OBS Connection Failed: Failed to connect. Is OBS open with the WebSocket Server enabled?");
            else if (error.message.includes("ETIMEDOUT")) setStatusText("OBS Connection Failed: Timed out. Double check your information matches what is in OBS!");
            else if (error.message.includes("authentication is required")) setStatusText("OBS Connection Failed: Missing authentication. Check that you've filled out the password field!");
            else if (error.message.includes("Authentication failed.")) setStatusText("OBS Connection Failed: Authentication failed. Verify that your password matches the one in OBS!");
            else if (error.message.includes("socket hang up")) setStatusText("OBS Connection Failed: Socket hang up. Is the port number conflicting?");
            else if (!error.message || error.message === "") setStatusText(`OBS Connection Failed: Unknown Error. Is OBS Open?`);
            else setStatusText(`OBS Connection Failed: ${error.message}`);
        });
    }, []);
    (0, _react.useEffect)(()=>{
        nodecg.readReplicant("obssettings", (obsData)=>{
            if (!obsData) return;
            if (!connected && obsData.autoConnect) setObsConnection(true, obsData);
        });
    });
    (0, _react.useEffect)(()=>{
        if (!obsSettings) return;
        setDashboardObsSettings((0, _lodash.cloneDeep)(obsSettings));
    }, [
        obsSettings
    ]);
    const saveChanges = (0, _react.useCallback)(()=>{
        setObsSettings(dashboardObsSettings);
    }, [
        dashboardObsSettings,
        setObsSettings
    ]);
    const hasUnsavedChanges = (0, _react.useMemo)(()=>{
        return !(0, _lodash.isEqual)(obsSettings, dashboardObsSettings);
    }, [
        obsSettings,
        dashboardObsSettings
    ]);
    return /*#__PURE__*/ (0, _reactDefault.default).createElement(PanelContainer, {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 78,
            columnNumber: 10
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _collapseContainer.CollapseContainer), {
        title: "OBS Configuration",
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 79,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("div", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 80,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("p", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 81,
            columnNumber: 6
        },
        __self: this
    }, "To use this functionality, go to ", /*#__PURE__*/ (0, _reactDefault.default).createElement("strong", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 81,
            columnNumber: 42
        },
        __self: this
    }, "OBS"), ", then ", /*#__PURE__*/ (0, _reactDefault.default).createElement("strong", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 81,
            columnNumber: 69
        },
        __self: this
    }, "Tools"), ", then ", /*#__PURE__*/ (0, _reactDefault.default).createElement("strong", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 81,
            columnNumber: 98
        },
        __self: this
    }, "WebSocket Server Settings"), "."), /*#__PURE__*/ (0, _reactDefault.default).createElement("p", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 82,
            columnNumber: 6
        },
        __self: this
    }, "Select ", /*#__PURE__*/ (0, _reactDefault.default).createElement("strong", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 82,
            columnNumber: 16
        },
        __self: this
    }, "Enable WebSocket Server"), ", then copy everything in ", /*#__PURE__*/ (0, _reactDefault.default).createElement("strong", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 82,
            columnNumber: 82
        },
        __self: this
    }, "Show Connect Info"), " here."), /*#__PURE__*/ (0, _reactDefault.default).createElement("p", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 83,
            columnNumber: 6
        },
        __self: this
    }, "If OBS is being hosted on this computer, you can instead enter ", /*#__PURE__*/ (0, _reactDefault.default).createElement("strong", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 83,
            columnNumber: 72
        },
        __self: this
    }, "localhost"), " for the ", /*#__PURE__*/ (0, _reactDefault.default).createElement("strong", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 83,
            columnNumber: 107
        },
        __self: this
    }, "Server IP"), "."), /*#__PURE__*/ (0, _reactDefault.default).createElement("p", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 84,
            columnNumber: 6
        },
        __self: this
    }, "This tool expects ", /*#__PURE__*/ (0, _reactDefault.default).createElement("strong", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 84,
            columnNumber: 27
        },
        __self: this
    }, "IPv4 addresses"), " and will not work with IPv6."), /*#__PURE__*/ (0, _reactDefault.default).createElement("p", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 85,
            columnNumber: 6
        },
        __self: this
    }, "Once you're done, make sure to click ", /*#__PURE__*/ (0, _reactDefault.default).createElement("strong", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 85,
            columnNumber: 46
        },
        __self: this
    }, "Apply"), " in OBS afterwards.")), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.GridRow), {
        $templateColumns: "1fr 0.5fr",
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 87,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Fieldset), {
        $expand: true,
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 88,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("legend", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 89,
            columnNumber: 7
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 89,
            columnNumber: 15
        },
        __self: this
    }, "Server IP")), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Input), {
        type: "text",
        $expand: true,
        value: dashboardObsSettings.serverIp,
        onChange: (event)=>setDashboardObsSettings((currentSettings)=>{
                return {
                    ...currentSettings,
                    serverIp: event.target.value
                };
            }),
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 90,
            columnNumber: 7
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Fieldset), {
        $expand: true,
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 97,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("legend", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 98,
            columnNumber: 7
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 98,
            columnNumber: 15
        },
        __self: this
    }, "Server Port")), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Input), {
        type: "text",
        $expand: true,
        value: dashboardObsSettings.serverPort,
        onChange: (event)=>setDashboardObsSettings((currentSettings)=>{
                return {
                    ...currentSettings,
                    serverPort: event.target.value
                };
            }),
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 99,
            columnNumber: 7
        },
        __self: this
    }))), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Fieldset), {
        $expand: true,
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 107,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("legend", {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 108,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 108,
            columnNumber: 14
        },
        __self: this
    }, "Server Password")), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Input), {
        type: "password",
        $expand: true,
        value: dashboardObsSettings.serverPassword,
        onChange: (event)=>setDashboardObsSettings((currentSettings)=>{
                return {
                    ...currentSettings,
                    serverPassword: event.target.value
                };
            }),
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 109,
            columnNumber: 6
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Row), {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 116,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 117,
            columnNumber: 6
        },
        __self: this
    }, "Connect on Launch"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Checkbox), {
        $checked: dashboardObsSettings.autoConnect,
        onClick: ()=>setDashboardObsSettings((currentSettings)=>{
                return {
                    ...currentSettings,
                    autoConnect: !currentSettings.autoConnect
                };
            }),
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 118,
            columnNumber: 6
        },
        __self: this
    }))), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.GridRow), {
        $height: "56px",
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 126,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ButtonWide), {
        $expand: true,
        $colorTag: hasUnsavedChanges ? "dark-red" : "pink",
        onClick: ()=>{
            saveChanges();
        },
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 127,
            columnNumber: 5
        },
        __self: this
    }, hasUnsavedChanges ? "Save Changes" : "Saved!"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ButtonWide), {
        $expand: true,
        disabled: connected,
        $colorTag: "teal",
        onClick: ()=>obsSettings && setObsConnection(true, obsSettings),
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 130,
            columnNumber: 5
        },
        __self: this
    }, connected ? "Connected to OBS!" : "Connect to OBS")), statusText && /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Row), {
        $align: "flex-end",
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 132,
            columnNumber: 19
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        $colorTag: statusText === connectingMessage ? "white" : "red",
        __source: {
            fileName: "src/dashboard/OBSSettings.tsx",
            lineNumber: 132,
            columnNumber: 42
        },
        __self: this
    }, statusText)));
}
const PanelContainer = (0, _styledComponentsDefault.default).div.withConfig({
    displayName: "OBSSettings__PanelContainer",
    componentId: "sc-1ozylfv-0"
})([
    "position:relative;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:5px;padding:5px 10px 12px;"
]);
const root = (0, _client.createRoot)(document.getElementById("root"));
root.render(/*#__PURE__*/ (0, _reactDefault.default).createElement(OBSSettings, {
    __source: {
        fileName: "src/dashboard/OBSSettings.tsx",
        lineNumber: 140,
        columnNumber: 13
    },
    __self: undefined
}));

},{"react":"bH1AQ","styled-components":"9xpRL","react-dom/client":"i5cPj","./components/Layout":"72fYZ","@nodecg/react-hooks":"audz3","../helpers/hooks":"2VUsa","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG","./components/CollapseContainer":"hrG5d","lodash":"iyL42"}],"hrG5d":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CollapseContainer", ()=>CollapseContainer);
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _styledComponents = require("styled-components");
var _styledComponentsDefault = parcelHelpers.interopDefault(_styledComponents);
var _layout = require("./Layout");
var _react1 = require("@phosphor-icons/react");
const CollapseContainer = ({ title, children, colorTag })=>{
    const [collapsed, setCollapsed] = (0, _react.useState)(true);
    return /*#__PURE__*/ (0, _reactDefault.default).createElement(Container, {
        $colorTag: colorTag,
        __source: {
            fileName: "src/dashboard/components/CollapseContainer.tsx",
            lineNumber: 16,
            columnNumber: 10
        },
        __self: undefined
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(Header, {
        $colorTag: colorTag,
        __source: {
            fileName: "src/dashboard/components/CollapseContainer.tsx",
            lineNumber: 17,
            columnNumber: 4
        },
        __self: undefined
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(Front, {
        __source: {
            fileName: "src/dashboard/components/CollapseContainer.tsx",
            lineNumber: 18,
            columnNumber: 5
        },
        __self: undefined
    }, title), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.TransparentButton), {
        onClick: ()=>{
            setCollapsed(!collapsed);
        },
        __source: {
            fileName: "src/dashboard/components/CollapseContainer.tsx",
            lineNumber: 21,
            columnNumber: 5
        },
        __self: undefined
    }, collapsed ? /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _react1.CaretDown), {
        __source: {
            fileName: "src/dashboard/components/CollapseContainer.tsx",
            lineNumber: 24,
            columnNumber: 19
        },
        __self: undefined
    }) : /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _react1.CaretUp), {
        __source: {
            fileName: "src/dashboard/components/CollapseContainer.tsx",
            lineNumber: 24,
            columnNumber: 35
        },
        __self: undefined
    }))), !collapsed && /*#__PURE__*/ (0, _reactDefault.default).createElement(Content, {
        $colorTag: colorTag,
        __source: {
            fileName: "src/dashboard/components/CollapseContainer.tsx",
            lineNumber: 27,
            columnNumber: 19
        },
        __self: undefined
    }, " ", children, " "));
};
const Container = (0, _styledComponentsDefault.default).div.withConfig({
    displayName: "CollapseContainer__Container",
    componentId: "sc-z8wv3n-0"
})([
    "position:relative;width:100%;border-radius:0.5rem;background-color:var(--collapse",
    ");"
], ({ $colorTag })=>$colorTag ? `-${$colorTag}` : ``);
const Header = (0, _styledComponentsDefault.default).div.withConfig({
    displayName: "CollapseContainer__Header",
    componentId: "sc-z8wv3n-1"
})([
    "position:relative;display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding:3px 8px;gap:5px;border-radius:0.5rem;background-color:var(--collapse",
    ");border:3px solid var(--collapse-",
    "border);"
], ({ $colorTag })=>$colorTag ? `-${$colorTag}` : ``, ({ $colorTag })=>$colorTag ? `${$colorTag}-` : ``);
const Front = (0, _styledComponentsDefault.default).div.withConfig({
    displayName: "CollapseContainer__Front",
    componentId: "sc-z8wv3n-2"
})([
    "position:relative;display:flex;flex-direction:row;justify-content:flex-start;align-items:center;gap:5px;font-size:1.3rem;font-weight:700;"
]);
const Content = (0, _styledComponentsDefault.default).div.withConfig({
    displayName: "CollapseContainer__Content",
    componentId: "sc-z8wv3n-3"
})([
    "position:relative;margin-top:-8px;padding:10px 8px 5px;border:3px solid var(--collapse-",
    "border);border-top:none;border-radius:0 0 0.5rem 0.5rem;"
], ({ $colorTag })=>$colorTag ? `${$colorTag}-` : ``);

},{"react":"bH1AQ","styled-components":"9xpRL","./Layout":"72fYZ","@phosphor-icons/react":"h9z2e","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}]},["5QYpv"], "5QYpv", "parcelRequire156b")

//# sourceMappingURL=obssettings.2cbf19a2.js.map
