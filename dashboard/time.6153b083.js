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
})({"hfWwA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Time", ()=>Time);
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _styledComponents = require("styled-components");
var _styledComponentsDefault = parcelHelpers.interopDefault(_styledComponents);
var _client = require("react-dom/client");
var _layout = require("./components/Layout");
var _timeDisplay = require("./components/TimeDisplay");
var _hooks = require("../helpers/hooks");
function Time() {
    const [breakTime, setBreakTime] = (0, _react.useState)({
        startTime: Date.now()
    });
    const [gameTime, setGameTime] = (0, _react.useState)({
        startTime: Date.now(),
        endTime: Date.now()
    });
    const [transitionTime, setTransitionTime] = (0, _react.useState)({
        startTime: Date.now()
    });
    const [currentTime, setCurrentTime] = (0, _react.useState)(Date.now());
    const interval = (0, _react.useRef)(null);
    const connected = (0, _hooks.useObsConnectionStatus)(nodecg);
    const onSceneChange = (0, _react.useCallback)((value)=>{
        if (value.sceneName.includes("Game")) {
            setBreakTime((oldBreakTime)=>oldBreakTime.endTime ? oldBreakTime : {
                    ...oldBreakTime,
                    endTime: value.timeStamp
                });
            setGameTime((oldGameTime)=>oldGameTime.endTime ? {
                    startTime: value.timeStamp
                } : oldGameTime);
        } else {
            setBreakTime((oldBreakTime)=>oldBreakTime.endTime ? {
                    startTime: value.timeStamp
                } : oldBreakTime);
            setGameTime((oldGameTime)=>oldGameTime.endTime ? oldGameTime : {
                    ...oldGameTime,
                    endTime: value.timeStamp
                });
        }
        setTransitionTime({
            startTime: value.timeStamp
        });
    }, []);
    const calcTime = (0, _react.useCallback)((interval)=>{
        return interval.endTime ? interval.endTime - interval.startTime : currentTime - interval.startTime;
    }, [
        currentTime
    ]);
    (0, _react.useEffect)(()=>{
        if (!interval.current) interval.current = window.setInterval(()=>{
            setCurrentTime(Date.now());
        }, 10);
        return ()=>{
            if (!interval.current) return;
            clearInterval(interval.current);
            interval.current = null;
        };
    }, [
        interval,
        setCurrentTime
    ]);
    (0, _react.useEffect)(()=>{
        nodecg.listenFor("onSceneChange", onSceneChange);
        return ()=>{
            nodecg.unlisten("onSceneChange", onSceneChange);
        };
    }, []);
    return /*#__PURE__*/ (0, _reactDefault.default).createElement(PanelContainer, {
        __source: {
            fileName: "src/dashboard/Time.tsx",
            lineNumber: 62,
            columnNumber: 3
        },
        __self: this
    }, connected && /*#__PURE__*/ (0, _reactDefault.default).createElement(Wrapper, {
        __source: {
            fileName: "src/dashboard/Time.tsx",
            lineNumber: 64,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _timeDisplay.TimeDisplay), {
        timingName: "Time On Break",
        time: calcTime(breakTime),
        __source: {
            fileName: "src/dashboard/Time.tsx",
            lineNumber: 65,
            columnNumber: 5
        },
        __self: this
    }), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _timeDisplay.TimeDisplay), {
        timingName: "Time On Game",
        time: calcTime(gameTime),
        __source: {
            fileName: "src/dashboard/Time.tsx",
            lineNumber: 66,
            columnNumber: 5
        },
        __self: this
    }), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _timeDisplay.TimeDisplay), {
        timingName: "Time Since Transition",
        time: calcTime(transitionTime),
        __source: {
            fileName: "src/dashboard/Time.tsx",
            lineNumber: 67,
            columnNumber: 5
        },
        __self: this
    })), !connected && /*#__PURE__*/ (0, _reactDefault.default).createElement(MarginWrapper, {
        __source: {
            fileName: "src/dashboard/Time.tsx",
            lineNumber: 72,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ErrorText), {
        __source: {
            fileName: "src/dashboard/Time.tsx",
            lineNumber: 73,
            columnNumber: 5
        },
        __self: this
    }, "OBS is not currently connected! To use this panel, OBS functionality must be enabled. Check the OBS Settings panel.")));
}
const PanelContainer = (0, _styledComponentsDefault.default).div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
`;
const Wrapper = (0, _styledComponentsDefault.default).div`
	display: contents;
`;
const MarginWrapper = (0, _styledComponentsDefault.default).div`
	margin: 4rem 0;
`;
const root = (0, _client.createRoot)(document.getElementById("root"));
root.render(/*#__PURE__*/ (0, _reactDefault.default).createElement(Time, {
    __source: {
        fileName: "src/dashboard/Time.tsx",
        lineNumber: 102,
        columnNumber: 13
    },
    __self: undefined
}));

},{"react":"bH1AQ","styled-components":"9xpRL","react-dom/client":"i5cPj","./components/Layout":"72fYZ","./components/TimeDisplay":"6N5pK","../helpers/hooks":"2VUsa","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}],"6N5pK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TimeDisplay", ()=>TimeDisplay);
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _styledComponents = require("styled-components");
var _styledComponentsDefault = parcelHelpers.interopDefault(_styledComponents);
var _utils = require("../../helpers/utils");
const TimeDisplay = ({ timingName, time })=>{
    return /*#__PURE__*/ (0, _reactDefault.default).createElement(Container, {
        __source: {
            fileName: "src/dashboard/components/TimeDisplay.tsx",
            lineNumber: 14,
            columnNumber: 9
        },
        __self: undefined
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(TimeHeader, {
        __source: {
            fileName: "src/dashboard/components/TimeDisplay.tsx",
            lineNumber: 15,
            columnNumber: 13
        },
        __self: undefined
    }, timingName), /*#__PURE__*/ (0, _reactDefault.default).createElement(Time, {
        __source: {
            fileName: "src/dashboard/components/TimeDisplay.tsx",
            lineNumber: 16,
            columnNumber: 4
        },
        __self: undefined
    }, (0, _utils.formatTimeHMSC)(time)));
};
const Container = (0, _styledComponentsDefault.default).div`
    display: contents;
`;
const TimeHeader = (0, _styledComponentsDefault.default).div`
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 0.5rem;
`;
const Time = (0, _styledComponentsDefault.default).div`
	font-size: 4rem;
	font-weight: 600;
	font-family: 'Courier New', Courier, Consolas, monospace;
`;

},{"react":"bH1AQ","styled-components":"9xpRL","../../helpers/utils":"2gdT3","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}],"2gdT3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "formatTimeHMSC", ()=>formatTimeHMSC);
parcelHelpers.export(exports, "formatDateHM", ()=>formatDateHM);
parcelHelpers.export(exports, "formatDateMDY", ()=>formatDateMDY);
parcelHelpers.export(exports, "modulo", ()=>modulo);
parcelHelpers.export(exports, "getIndexColor", ()=>getIndexColor);
const formatTimeHMSC = (ms)=>{
    ms = ms > 0 ? ms : 0;
    const hour = Math.floor(ms / 60 / 60 / 1000);
    ms = ms % 3600000;
    const minute = Math.floor(ms / 60 / 1000);
    ms = ms % 60000;
    const second = Math.floor(ms / 1000);
    ms = ms % 1000;
    const centiseconds = Math.floor(ms / 10);
    return `${hour}:${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}.${centiseconds < 10 ? `0${centiseconds}` : centiseconds}`;
};
const formatDateHM = (date)=>{
    return date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
};
const formatDateMDY = (date)=>{
    return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
};
const modulo = (dividend, divisor)=>{
    return (dividend % divisor + divisor) % divisor;
};
const getIndexColor = (index, list, swap)=>{
    return !swap ? list[modulo(index, list.length)].teamA : list[modulo(index, list.length)].teamB;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}],"2VUsa":[function(require,module,exports) {
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

},{"react":"bH1AQ","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}]},["hfWwA"], "hfWwA", "parcelRequire156b")

//# sourceMappingURL=time.6153b083.js.map
