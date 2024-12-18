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
function Intermission() {
    const [intermissionData, setIntermissionData] = (0, _reactHooks.useReplicant)("intermission", {
        bundle: "squidwest-layout-controls"
    });
    const [showTime, setShowTime] = (0, _react.useState)(true);
    const [showEvent, setShowEvent] = (0, _react.useState)(true);
    const [showLocation, setShowLocation] = (0, _react.useState)(true);
    const [showFlavorText, setShowFlavorText] = (0, _react.useState)(true);
    const [flavorText, setFlavorText] = (0, _react.useState)("");
    (0, _react.useEffect)(()=>{
        if (!intermissionData) return;
        setShowTime(intermissionData.showTime);
        setShowEvent(intermissionData.showEvent);
        setShowLocation(intermissionData.showLocation);
        setShowFlavorText(intermissionData.showFlavorText);
        setFlavorText(intermissionData.flavorText);
    }, [
        intermissionData
    ]);
    const updateIntermissionData = ()=>{
        let newIntermissionData = {
            showTime: showTime,
            showEvent: showEvent,
            showLocation: showLocation,
            showFlavorText: showFlavorText,
            flavorText: flavorText
        };
        setIntermissionData(newIntermissionData);
    };
    return /*#__PURE__*/ (0, _reactDefault.default).createElement(PanelContainer, {
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 42,
            columnNumber: 3
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputSection), {
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 43,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _collapseContainer.CollapseContainer), {
        title: "Omnibar",
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 44,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputRow), {
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 45,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputLabel), {
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 46,
            columnNumber: 7
        },
        __self: this
    }, "Show Time/Date"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputCheckbox), {
        $checked: showTime,
        onClick: ()=>setShowTime(!showTime),
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 47,
            columnNumber: 7
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputRow), {
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 49,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputLabel), {
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 50,
            columnNumber: 7
        },
        __self: this
    }, "Show Event Info"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputCheckbox), {
        $checked: showEvent,
        onClick: ()=>setShowEvent(!showEvent),
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 51,
            columnNumber: 7
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputRow), {
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 53,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputLabel), {
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 54,
            columnNumber: 7
        },
        __self: this
    }, "Show Event Location"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputCheckbox), {
        $checked: showLocation,
        onClick: ()=>setShowLocation(!showLocation),
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 55,
            columnNumber: 7
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputRow), {
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 57,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputLabel), {
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 58,
            columnNumber: 7
        },
        __self: this
    }, "Show Flavor Text"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputCheckbox), {
        $checked: showFlavorText,
        onClick: ()=>setShowFlavorText(!showFlavorText),
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 59,
            columnNumber: 7
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputRow), {
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 61,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputLabel), {
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 62,
            columnNumber: 7
        },
        __self: this
    }, "Flavor Text"), /*#__PURE__*/ (0, _reactDefault.default).createElement("input", {
        type: "text",
        value: flavorText,
        onChange: (event)=>{
            setFlavorText(event.target.value);
        },
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 63,
            columnNumber: 7
        },
        __self: this
    })))), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputButton), {
        onClick: ()=>{
            updateIntermissionData();
        },
        __source: {
            fileName: "src/dashboard/Intermission.tsx",
            lineNumber: 67,
            columnNumber: 4
        },
        __self: this
    }, "Save"));
}
const PanelContainer = (0, _styledComponentsDefault.default).div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const root = (0, _client.createRoot)(document.getElementById("root"));
root.render(/*#__PURE__*/ (0, _reactDefault.default).createElement(Intermission, {
    __source: {
        fileName: "src/dashboard/Intermission.tsx",
        lineNumber: 80,
        columnNumber: 13
    },
    __self: undefined
}));

},{"react":"bH1AQ","styled-components":"9xpRL","react-dom/client":"i5cPj","./components/Layout":"72fYZ","@nodecg/react-hooks":"audz3","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG","./components/CollapseContainer":"hrG5d"}],"audz3":[function(require,module,exports) {
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

},{"react":"bH1AQ","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}],"hrG5d":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CollapseContainer", ()=>CollapseContainer);
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _styledComponents = require("styled-components");
var _styledComponentsDefault = parcelHelpers.interopDefault(_styledComponents);
var _layout = require("./Layout");
var _react1 = require("@phosphor-icons/react");
const CollapseContainer = ({ title, children })=>{
    const [collapsed, setCollapsed] = (0, _react.useState)(false);
    return /*#__PURE__*/ (0, _reactDefault.default).createElement(Container, {
        __source: {
            fileName: "src/dashboard/components/CollapseContainer.tsx",
            lineNumber: 16,
            columnNumber: 9
        },
        __self: undefined
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(HeadRow, {
        __source: {
            fileName: "src/dashboard/components/CollapseContainer.tsx",
            lineNumber: 17,
            columnNumber: 13
        },
        __self: undefined
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputSubheader), {
        __source: {
            fileName: "src/dashboard/components/CollapseContainer.tsx",
            lineNumber: 18,
            columnNumber: 17
        },
        __self: undefined
    }, title), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.CollapseButton), {
        onClick: ()=>{
            setCollapsed(!collapsed);
        },
        __source: {
            fileName: "src/dashboard/components/CollapseContainer.tsx",
            lineNumber: 19,
            columnNumber: 17
        },
        __self: undefined
    }, collapsed ? /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _react1.CaretDown), {
        __source: {
            fileName: "src/dashboard/components/CollapseContainer.tsx",
            lineNumber: 21,
            columnNumber: 32
        },
        __self: undefined
    }) : /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _react1.CaretUp), {
        __source: {
            fileName: "src/dashboard/components/CollapseContainer.tsx",
            lineNumber: 21,
            columnNumber: 50
        },
        __self: undefined
    }))), !collapsed && /*#__PURE__*/ (0, _reactDefault.default).createElement(Container, {
        __source: {
            fileName: "src/dashboard/components/CollapseContainer.tsx",
            lineNumber: 24,
            columnNumber: 13
        },
        __self: undefined
    }, children));
};
const Container = (0, _styledComponentsDefault.default).div`
    display: contents;
`;
const HeadRow = (0, _styledComponentsDefault.default).div`
    grid-column: 1 / -1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const AddRemoveList = (0, _styledComponentsDefault.default).div`
    grid-column: 2;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
`;

},{"react":"bH1AQ","styled-components":"9xpRL","./Layout":"72fYZ","@phosphor-icons/react":"h9z2e","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}]},["i1rCR"], "i1rCR", "parcelRequire156b")

//# sourceMappingURL=intermission.2e12aebe.js.map
