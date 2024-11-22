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
var _event = require("./components/Event");
function EventInformation() {
    const [eventData, setEventData] = (0, _reactHooks.useReplicant)("eventData", {
        bundle: "squidwest-layout-controls"
    });
    const [currentEvent, setCurrentEvent] = (0, _react.useState)({
        name: "Current Event Name",
        location: "Event Location",
        number: 1,
        date: "Today"
    });
    const [nextEvent, setNextEvent] = (0, _react.useState)({
        name: "Next Event Name",
        location: "Next Event Location",
        number: 2,
        date: "January 1, 2024"
    });
    (0, _react.useEffect)(()=>{
        if (!eventData) return;
        setCurrentEvent(eventData.currentEvent);
        setNextEvent(eventData.nextEvent);
    }, [
        eventData
    ]);
    const updateEventData = ()=>{
        let newEventData = {
            currentEvent: currentEvent,
            nextEvent: nextEvent
        };
        setEventData(newEventData);
    };
    return /*#__PURE__*/ (0, _reactDefault.default).createElement(PanelContainer, {
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 35,
            columnNumber: 3
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputSection), {
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 36,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputSubheader), {
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 37,
            columnNumber: 5
        },
        __self: this
    }, "Current Event"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _event.Event), {
        event: currentEvent,
        setEvent: setCurrentEvent,
        useDate: false,
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 38,
            columnNumber: 5
        },
        __self: this
    }), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputSubheader), {
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 39,
            columnNumber: 5
        },
        __self: this
    }, "Next Event"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _event.Event), {
        event: nextEvent,
        setEvent: setNextEvent,
        useDate: true,
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 40,
            columnNumber: 5
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputButton), {
        onClick: ()=>{
            updateEventData();
        },
        __source: {
            fileName: "src/dashboard/EventInformation.tsx",
            lineNumber: 42,
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
root.render(/*#__PURE__*/ (0, _reactDefault.default).createElement(EventInformation, {
    __source: {
        fileName: "src/dashboard/EventInformation.tsx",
        lineNumber: 55,
        columnNumber: 13
    },
    __self: undefined
}));

},{"react":"bH1AQ","styled-components":"9xpRL","react-dom/client":"i5cPj","./components/Layout":"72fYZ","@nodecg/react-hooks":"audz3","./components/Event":"iygdW","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}],"audz3":[function(require,module,exports) {
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

},{"react":"bH1AQ","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}],"iygdW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Event", ()=>Event);
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _styledComponents = require("styled-components");
var _styledComponentsDefault = parcelHelpers.interopDefault(_styledComponents);
var _layout = require("../components/Layout");
const Event = ({ event, setEvent, useDate })=>{
    const setName = (0, _react.useCallback)((name)=>{
        setEvent((oldEvent)=>{
            return {
                ...oldEvent,
                name: name
            };
        });
    }, []);
    const setLocation = (0, _react.useCallback)((location)=>{
        setEvent((oldEvent)=>{
            return {
                ...oldEvent,
                location: location
            };
        });
    }, []);
    const setNumber = (0, _react.useCallback)((number)=>{
        setEvent((oldEvent)=>{
            return {
                ...oldEvent,
                number: number
            };
        });
    }, []);
    const setDate = (0, _react.useCallback)((date)=>{
        setEvent((oldEvent)=>{
            return {
                ...oldEvent,
                date: date
            };
        });
    }, []);
    return /*#__PURE__*/ (0, _reactDefault.default).createElement(Container, {
        __source: {
            fileName: "src/dashboard/components/Event.tsx",
            lineNumber: 31,
            columnNumber: 3
        },
        __self: undefined
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputRow), {
        __source: {
            fileName: "src/dashboard/components/Event.tsx",
            lineNumber: 32,
            columnNumber: 4
        },
        __self: undefined
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputLabel), {
        __source: {
            fileName: "src/dashboard/components/Event.tsx",
            lineNumber: 33,
            columnNumber: 5
        },
        __self: undefined
    }, "Event Name"), /*#__PURE__*/ (0, _reactDefault.default).createElement("input", {
        type: "text",
        value: event.name || "",
        onChange: (event)=>{
            setName(event.target.value);
        },
        __source: {
            fileName: "src/dashboard/components/Event.tsx",
            lineNumber: 34,
            columnNumber: 5
        },
        __self: undefined
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputRow), {
        __source: {
            fileName: "src/dashboard/components/Event.tsx",
            lineNumber: 36,
            columnNumber: 4
        },
        __self: undefined
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputLabel), {
        __source: {
            fileName: "src/dashboard/components/Event.tsx",
            lineNumber: 37,
            columnNumber: 5
        },
        __self: undefined
    }, "Event Location"), /*#__PURE__*/ (0, _reactDefault.default).createElement("input", {
        type: "text",
        value: event.location || "",
        onChange: (event)=>{
            setLocation(event.target.value);
        },
        __source: {
            fileName: "src/dashboard/components/Event.tsx",
            lineNumber: 38,
            columnNumber: 5
        },
        __self: undefined
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputRow), {
        __source: {
            fileName: "src/dashboard/components/Event.tsx",
            lineNumber: 40,
            columnNumber: 4
        },
        __self: undefined
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputLabel), {
        __source: {
            fileName: "src/dashboard/components/Event.tsx",
            lineNumber: 41,
            columnNumber: 5
        },
        __self: undefined
    }, "Event #"), /*#__PURE__*/ (0, _reactDefault.default).createElement("input", {
        type: "text",
        value: event.number || 0,
        onChange: (event)=>{
            setNumber(Number(event.target.value));
        },
        __source: {
            fileName: "src/dashboard/components/Event.tsx",
            lineNumber: 42,
            columnNumber: 5
        },
        __self: undefined
    })), useDate && /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputRow), {
        __source: {
            fileName: "src/dashboard/components/Event.tsx",
            lineNumber: 45,
            columnNumber: 4
        },
        __self: undefined
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputLabel), {
        __source: {
            fileName: "src/dashboard/components/Event.tsx",
            lineNumber: 46,
            columnNumber: 5
        },
        __self: undefined
    }, "Event Date"), /*#__PURE__*/ (0, _reactDefault.default).createElement("input", {
        type: "text",
        value: event.date || "",
        onChange: (event)=>{
            setDate(event.target.value);
        },
        __source: {
            fileName: "src/dashboard/components/Event.tsx",
            lineNumber: 47,
            columnNumber: 5
        },
        __self: undefined
    })));
};
const Container = (0, _styledComponentsDefault.default).div`
    display: contents;
`;

},{"react":"bH1AQ","styled-components":"9xpRL","../components/Layout":"72fYZ","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}]},["4N2Ux"], "4N2Ux", "parcelRequire156b")

//# sourceMappingURL=eventinformation.901596bd.js.map
