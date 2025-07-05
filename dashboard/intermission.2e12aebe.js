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
})({"i1rCR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Intermission", ()=>Intermission);
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _styledComponents = require("styled-components");
var _styledComponentsDefault = parcelHelpers.interopDefault(_styledComponents);
var _client = require("react-dom/client");
var _layout = require("./components/Layout");
var _reactHooks = require("@nodecg/react-hooks");
var _collapseContainer = require("./components/CollapseContainer");
var _lodash = require("lodash");
const defaultIntermissionSettings = {
    showTime: true,
    showEvent: true,
    showLocation: true,
    showFlavorText: true,
    flavorText: ""
};
function Intermission() {
    const [intermissionSettings, setIntermissionSettings] = (0, _reactHooks.useReplicant)("intermission", {
        bundle: "squidwest-layout-controls"
    });
    const [dashboardIntermissionSettings, setDashboardIntermissionSettings] = (0, _react.useState)(defaultIntermissionSettings);
    (0, _react.useEffect)(()=>{
        if (!intermissionSettings) return;
        setDashboardIntermissionSettings((0, _lodash.cloneDeep)(intermissionSettings));
    }, [
        intermissionSettings
    ]);
    const saveChanges = (0, _react.useCallback)(()=>{
        setIntermissionSettings(dashboardIntermissionSettings);
    }, [
        dashboardIntermissionSettings,
        setIntermissionSettings
    ]);
    const hasUnsavedChanges = (0, _react.useMemo)(()=>{
        return !(0, _lodash.isEqual)(intermissionSettings, dashboardIntermissionSettings);
    }, [
        intermissionSettings,
        dashboardIntermissionSettings
    ]);
    return /*#__PURE__*/ (0, _reactDefault.default).createElement(PanelContainer, {
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 31,
            columnNumber: 10
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _collapseContainer.CollapseContainer), {
        title: "Omnibar",
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 32,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.GridRow), {
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 33,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Row), {
        $justify: "flex-end",
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 34,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 35,
            columnNumber: 7
        },
        __self: this
    }, "Show Time/Date"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Checkbox), {
        $checked: dashboardIntermissionSettings.showTime,
        onClick: ()=>setDashboardIntermissionSettings((currentSettings)=>{
                return {
                    ...currentSettings,
                    showTime: !currentSettings.showTime
                };
            }),
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 36,
            columnNumber: 7
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Row), {
        $justify: "flex-end",
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 43,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 44,
            columnNumber: 7
        },
        __self: this
    }, "Show Event Info"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Checkbox), {
        $checked: dashboardIntermissionSettings.showEvent,
        onClick: ()=>setDashboardIntermissionSettings((currentSettings)=>{
                return {
                    ...currentSettings,
                    showEvent: !currentSettings.showEvent
                };
            }),
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 45,
            columnNumber: 7
        },
        __self: this
    }))), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.GridRow), {
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 53,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Row), {
        $justify: "flex-end",
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 54,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 55,
            columnNumber: 7
        },
        __self: this
    }, "Show Event Location"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Checkbox), {
        $checked: dashboardIntermissionSettings.showLocation,
        onClick: ()=>setDashboardIntermissionSettings((currentSettings)=>{
                return {
                    ...currentSettings,
                    showLocation: !currentSettings.showLocation
                };
            }),
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 56,
            columnNumber: 7
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Row), {
        $justify: "flex-end",
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 63,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 64,
            columnNumber: 7
        },
        __self: this
    }, "Show Flavor Text"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Checkbox), {
        $checked: dashboardIntermissionSettings.showFlavorText,
        onClick: ()=>setDashboardIntermissionSettings((currentSettings)=>{
                return {
                    ...currentSettings,
                    showFlavorText: !currentSettings.showFlavorText
                };
            }),
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 65,
            columnNumber: 7
        },
        __self: this
    }))), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Row), {
        $justify: "flex-end",
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 73,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Fieldset), {
        $expand: true,
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 74,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("legend", {
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 75,
            columnNumber: 7
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 75,
            columnNumber: 15
        },
        __self: this
    }, "Flavor Text")), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Input), {
        type: "text",
        $expand: true,
        value: dashboardIntermissionSettings.flavorText,
        onChange: (event)=>setDashboardIntermissionSettings((currentSettings)=>{
                return {
                    ...currentSettings,
                    flavorText: event.target.value
                };
            }),
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 76,
            columnNumber: 7
        },
        __self: this
    })))), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.GridRow), {
        $height: "56px",
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 85,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("div", {
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 86,
            columnNumber: 5
        },
        __self: this
    }), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ButtonWide), {
        $expand: true,
        $colorTag: hasUnsavedChanges ? "dark-red" : "pink",
        onClick: ()=>{
            saveChanges();
        },
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 87,
            columnNumber: 5
        },
        __self: this
    }, hasUnsavedChanges ? "Save Changes" : "Saved!"), /*#__PURE__*/ (0, _reactDefault.default).createElement("div", {
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 90,
            columnNumber: 5
        },
        __self: this
    })));
}
const PanelContainer = (0, _styledComponentsDefault.default).div.withConfig({
    displayName: "Intermission__PanelContainer",
    componentId: "sc-1nvsmlw-0"
})([
    "position:relative;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:5px;padding:5px 10px 12px;"
]);
const root = (0, _client.createRoot)(document.getElementById("root"));
root.render(/*#__PURE__*/ (0, _reactDefault.default).createElement(Intermission, {
    __source: {
        fileName: "src/dashboard/Intermission.tsx",
        lineNumber: 99,
        columnNumber: 13
    },
    __self: undefined
}));

},{"react":"bH1AQ","styled-components":"9xpRL","react-dom/client":"i5cPj","./components/Layout":"72fYZ","@nodecg/react-hooks":"audz3","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG","./components/CollapseContainer":"hrG5d","lodash":"iyL42"}],"hrG5d":[function(require,module,exports) {
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

},{"react":"bH1AQ","styled-components":"9xpRL","./Layout":"72fYZ","@phosphor-icons/react":"h9z2e","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}]},["i1rCR"], "i1rCR", "parcelRequire156b")

//# sourceMappingURL=intermission.2e12aebe.js.map
