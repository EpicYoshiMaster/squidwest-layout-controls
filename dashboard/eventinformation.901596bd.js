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
})({"4N2Ux":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "EventInformation", ()=>EventInformation);
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _styledComponents = require("styled-components");
var _styledComponentsDefault = parcelHelpers.interopDefault(_styledComponents);
var _client = require("react-dom/client");
var _layout = require("./components/Layout");
var _reactHooks = require("@nodecg/react-hooks");
var _lodash = require("lodash");
var _collapseContainer = require("./components/CollapseContainer");
const defaultEventData = {
    currentEvent: {
        name: "Current Event Name",
        location: "Event Location",
        number: 1,
        date: "Today"
    },
    nextEvent: {
        name: "Next Event Name",
        location: "Next Event Location",
        number: 2,
        date: "January 1, 2024"
    }
};
function EventInformation() {
    const [eventData, setEventData] = (0, _reactHooks.useReplicant)("eventData", {
        bundle: "squidwest-layout-controls"
    });
    const [dashboardEventData, setDashboardEventData] = (0, _react.useState)(defaultEventData);
    (0, _react.useEffect)(()=>{
        if (!eventData) return;
        setDashboardEventData((0, _lodash.cloneDeep)(eventData));
    }, [
        eventData
    ]);
    const saveChanges = (0, _react.useCallback)(()=>{
        setEventData(dashboardEventData);
    }, [
        dashboardEventData,
        setEventData
    ]);
    const hasUnsavedChanges = (0, _react.useMemo)(()=>{
        return !(0, _lodash.isEqual)(eventData, dashboardEventData);
    }, [
        eventData,
        dashboardEventData
    ]);
    return /*#__PURE__*/ (0, _reactDefault.default).createElement(PanelContainer, {
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 38,
            columnNumber: 10
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _collapseContainer.CollapseContainer), {
        title: "Current Event",
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 39,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.GridRow), {
        $templateColumns: "1fr 0.6fr",
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 40,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Fieldset), {
        $expand: true,
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 41,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("legend", {
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 42,
            columnNumber: 7
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 42,
            columnNumber: 15
        },
        __self: this
    }, "Event Name")), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Input), {
        type: "text",
        $expand: true,
        value: dashboardEventData.currentEvent.name,
        onChange: (event)=>setDashboardEventData((currentData)=>{
                return {
                    ...currentData,
                    currentEvent: {
                        ...currentData.currentEvent,
                        name: event.target.value
                    }
                };
            }),
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 43,
            columnNumber: 7
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Fieldset), {
        $expand: true,
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 53,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("legend", {
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 54,
            columnNumber: 7
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 54,
            columnNumber: 15
        },
        __self: this
    }, "Event Number")), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Input), {
        type: "text",
        $expand: true,
        value: dashboardEventData.currentEvent.number,
        onChange: (event)=>setDashboardEventData((currentData)=>{
                return {
                    ...currentData,
                    currentEvent: {
                        ...currentData.currentEvent,
                        number: Number(event.target.value)
                    }
                };
            }),
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 55,
            columnNumber: 7
        },
        __self: this
    }))), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Fieldset), {
        $expand: true,
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 66,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("legend", {
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 67,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 67,
            columnNumber: 14
        },
        __self: this
    }, "Event Location")), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Input), {
        type: "text",
        $expand: true,
        value: dashboardEventData.currentEvent.location,
        onChange: (event)=>setDashboardEventData((currentData)=>{
                return {
                    ...currentData,
                    currentEvent: {
                        ...currentData.currentEvent,
                        location: event.target.value
                    }
                };
            }),
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 68,
            columnNumber: 6
        },
        __self: this
    }))), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _collapseContainer.CollapseContainer), {
        title: "Next Event",
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 79,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.GridRow), {
        $templateColumns: "1fr 0.6fr",
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 80,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Fieldset), {
        $expand: true,
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 81,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("legend", {
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 82,
            columnNumber: 7
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 82,
            columnNumber: 15
        },
        __self: this
    }, "Event Name")), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Input), {
        type: "text",
        $expand: true,
        value: dashboardEventData.nextEvent.name,
        onChange: (event)=>setDashboardEventData((currentData)=>{
                return {
                    ...currentData,
                    nextEvent: {
                        ...currentData.nextEvent,
                        name: event.target.value
                    }
                };
            }),
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 83,
            columnNumber: 7
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Fieldset), {
        $expand: true,
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 93,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("legend", {
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 94,
            columnNumber: 7
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 94,
            columnNumber: 15
        },
        __self: this
    }, "Event Number")), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Input), {
        type: "text",
        $expand: true,
        value: dashboardEventData.nextEvent.number,
        onChange: (event)=>setDashboardEventData((currentData)=>{
                return {
                    ...currentData,
                    nextEvent: {
                        ...currentData.nextEvent,
                        number: Number(event.target.value)
                    }
                };
            }),
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 95,
            columnNumber: 7
        },
        __self: this
    }))), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Fieldset), {
        $expand: true,
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 106,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("legend", {
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 107,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 107,
            columnNumber: 14
        },
        __self: this
    }, "Event Location")), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Input), {
        type: "text",
        $expand: true,
        value: dashboardEventData.nextEvent.location,
        onChange: (event)=>setDashboardEventData((currentData)=>{
                return {
                    ...currentData,
                    nextEvent: {
                        ...currentData.nextEvent,
                        location: event.target.value
                    }
                };
            }),
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 108,
            columnNumber: 6
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Fieldset), {
        $expand: true,
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 118,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("legend", {
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 119,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 119,
            columnNumber: 14
        },
        __self: this
    }, "Event Date")), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Input), {
        type: "text",
        $expand: true,
        value: dashboardEventData.nextEvent.date,
        onChange: (event)=>setDashboardEventData((currentData)=>{
                return {
                    ...currentData,
                    nextEvent: {
                        ...currentData.nextEvent,
                        date: event.target.value
                    }
                };
            }),
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 120,
            columnNumber: 6
        },
        __self: this
    }))), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.GridRow), {
        $height: "56px",
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 131,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("div", {
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 132,
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
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 133,
            columnNumber: 5
        },
        __self: this
    }, hasUnsavedChanges ? "Save Changes" : "Saved!"), /*#__PURE__*/ (0, _reactDefault.default).createElement("div", {
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 136,
            columnNumber: 5
        },
        __self: this
    })));
}
const PanelContainer = (0, _styledComponentsDefault.default).div.withConfig({
    displayName: "EventInformation__PanelContainer",
    componentId: "sc-10ekzvk-0"
})([
    "position:relative;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:5px;padding:5px 10px 12px;"
]);
const root = (0, _client.createRoot)(document.getElementById("root"));
root.render(/*#__PURE__*/ (0, _reactDefault.default).createElement(EventInformation, {
    __source: {
        fileName: "src/dashboard/EventInformation.tsx",
        lineNumber: 145,
        columnNumber: 13
    },
    __self: undefined
}));

},{"react":"bH1AQ","styled-components":"9xpRL","react-dom/client":"i5cPj","./components/Layout":"72fYZ","@nodecg/react-hooks":"audz3","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG","lodash":"iyL42","./components/CollapseContainer":"hrG5d"}],"hrG5d":[function(require,module,exports) {
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

},{"react":"bH1AQ","styled-components":"9xpRL","./Layout":"72fYZ","@phosphor-icons/react":"h9z2e","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}]},["4N2Ux"], "4N2Ux", "parcelRequire156b")

//# sourceMappingURL=eventinformation.901596bd.js.map
