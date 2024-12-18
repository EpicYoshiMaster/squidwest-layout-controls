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
})({"cGl2D":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Commentators", ()=>Commentators);
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _styledComponents = require("styled-components");
var _styledComponentsDefault = parcelHelpers.interopDefault(_styledComponents);
var _client = require("react-dom/client");
var _layout = require("./components/Layout");
var _reactHooks = require("@nodecg/react-hooks");
var _commentator = require("./components/Commentator");
var _collapseContainer = require("./components/CollapseContainer");
const defaultCommentator = {
    name: "Commentator Name",
    pronouns: "any/all",
    tag: "@TagName"
};
function Commentators() {
    const [comms, setComms] = (0, _reactHooks.useReplicant)("commentators", {
        bundle: "squidwest-layout-controls",
        defaultValue: {
            commentatorOne: defaultCommentator,
            commentatorTwo: defaultCommentator,
            autoShow: true,
            delay: 3000,
            autoHide: true,
            lifetime: 5000
        }
    });
    const [commentatorOne, setCommentatorOne] = (0, _react.useState)(defaultCommentator);
    const [commentatorTwo, setCommentatorTwo] = (0, _react.useState)(defaultCommentator);
    const [autoShow, setAutoShow] = (0, _react.useState)(true);
    const [delay, setDelay] = (0, _react.useState)(3000);
    const [autoHide, setAutoHide] = (0, _react.useState)(true);
    const [lifetime, setLifetime] = (0, _react.useState)(5000);
    (0, _react.useEffect)(()=>{
        if (!comms) return;
        setCommentatorOne(comms.commentatorOne);
        setCommentatorTwo(comms.commentatorTwo);
        setAutoShow(comms.autoShow);
        setDelay(comms.delay);
        setAutoHide(comms.autoHide);
        setLifetime(comms.lifetime);
    }, [
        comms
    ]);
    const updateCommentators = (0, _react.useCallback)(()=>{
        let newCommentators = {
            commentatorOne: commentatorOne,
            commentatorTwo: commentatorTwo,
            autoShow: autoShow,
            delay: delay,
            autoHide: autoHide,
            lifetime: lifetime
        };
        setComms(newCommentators);
    }, [
        commentatorOne,
        commentatorTwo,
        autoShow,
        delay,
        autoHide,
        lifetime,
        setComms
    ]);
    const swapCommentators = (0, _react.useCallback)(()=>{
        const commOne = commentatorOne;
        setCommentatorOne(commentatorTwo);
        setCommentatorTwo(commOne);
    }, [
        commentatorOne,
        commentatorTwo
    ]);
    const addToCredits = (0, _react.useCallback)(()=>{
        nodecg.sendMessage("commsCredits", [
            commentatorOne.name || "",
            commentatorTwo.name || ""
        ]);
    }, [
        commentatorOne,
        commentatorTwo
    ]);
    const showCommentators = (0, _react.useCallback)(()=>{
        nodecg.sendMessage("commsControl", true);
    }, []);
    const hideCommentators = (0, _react.useCallback)(()=>{
        nodecg.sendMessage("commsControl", false);
    }, []);
    return /*#__PURE__*/ (0, _reactDefault.default).createElement(PanelContainer, {
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 78,
            columnNumber: 3
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputSection), {
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 79,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _collapseContainer.CollapseContainer), {
        title: "Commentator #1",
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 80,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _commentator.Commentator), {
        comm: commentatorOne,
        setCommentator: setCommentatorOne,
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 81,
            columnNumber: 6
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _collapseContainer.CollapseContainer), {
        title: "Commentator #2",
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 83,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _commentator.Commentator), {
        comm: commentatorTwo,
        setCommentator: setCommentatorTwo,
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 84,
            columnNumber: 6
        },
        __self: this
    }))), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputButton), {
        onClick: ()=>{
            swapCommentators();
        },
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 87,
            columnNumber: 4
        },
        __self: this
    }, "Swap Commentators"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputButton), {
        onClick: ()=>{
            addToCredits();
        },
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 88,
            columnNumber: 4
        },
        __self: this
    }, "Add to Credits"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputSection), {
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 89,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _collapseContainer.CollapseContainer), {
        title: "Configuration",
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 90,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputRow), {
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 91,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputLabel), {
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 92,
            columnNumber: 7
        },
        __self: this
    }, "Show Automatically"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputCheckbox), {
        $checked: autoShow,
        onClick: ()=>setAutoShow(!autoShow),
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 93,
            columnNumber: 7
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputRow), {
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 95,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputLabel), {
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 96,
            columnNumber: 7
        },
        __self: this
    }, "Show Delay Time (ms)"), /*#__PURE__*/ (0, _reactDefault.default).createElement("input", {
        type: "number",
        value: delay,
        onChange: (event)=>{
            setDelay(Number(event.target.value));
        },
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 97,
            columnNumber: 7
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputRow), {
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 99,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputLabel), {
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 100,
            columnNumber: 7
        },
        __self: this
    }, "Hide Automatically"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputCheckbox), {
        $checked: autoHide,
        onClick: ()=>setAutoHide(!autoHide),
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 101,
            columnNumber: 7
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputRow), {
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 103,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputLabel), {
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 104,
            columnNumber: 7
        },
        __self: this
    }, "Lifetime (ms)"), /*#__PURE__*/ (0, _reactDefault.default).createElement("input", {
        type: "number",
        value: lifetime,
        onChange: (event)=>{
            setLifetime(Number(event.target.value));
        },
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 105,
            columnNumber: 7
        },
        __self: this
    })))), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputButton), {
        onClick: ()=>{
            updateCommentators();
        },
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 109,
            columnNumber: 4
        },
        __self: this
    }, "Save"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputSection), {
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 110,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputSubheader), {
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 111,
            columnNumber: 5
        },
        __self: this
    }, "Manual Controls")), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputButton), {
        onClick: ()=>{
            showCommentators();
        },
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 113,
            columnNumber: 4
        },
        __self: this
    }, "Show Commentators"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputButton), {
        onClick: ()=>{
            hideCommentators();
        },
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 114,
            columnNumber: 4
        },
        __self: this
    }, "Hide Commentators"));
}
const PanelContainer = (0, _styledComponentsDefault.default).div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const root = (0, _client.createRoot)(document.getElementById("root"));
root.render(/*#__PURE__*/ (0, _reactDefault.default).createElement((0, _reactDefault.default).StrictMode, {
    __source: {
        fileName: "src/dashboard/Commentators.tsx",
        lineNumber: 127,
        columnNumber: 13
    },
    __self: undefined
}, /*#__PURE__*/ (0, _reactDefault.default).createElement(Commentators, {
    __source: {
        fileName: "src/dashboard/Commentators.tsx",
        lineNumber: 127,
        columnNumber: 31
    },
    __self: undefined
})));

},{"react":"bH1AQ","styled-components":"9xpRL","react-dom/client":"i5cPj","./components/Layout":"72fYZ","@nodecg/react-hooks":"audz3","./components/Commentator":"dOv3o","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG","./components/CollapseContainer":"hrG5d"}],"audz3":[function(require,module,exports) {
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

},{"react":"bH1AQ","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}],"dOv3o":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Commentator", ()=>Commentator);
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _styledComponents = require("styled-components");
var _styledComponentsDefault = parcelHelpers.interopDefault(_styledComponents);
var _layout = require("../components/Layout");
const Commentator = ({ comm, setCommentator })=>{
    const setName = (0, _react.useCallback)((name)=>{
        setCommentator((oldComm)=>{
            return {
                ...oldComm,
                name: name
            };
        });
    }, []);
    const setPronouns = (0, _react.useCallback)((pronouns)=>{
        setCommentator((oldComm)=>{
            return {
                ...oldComm,
                pronouns: pronouns
            };
        });
    }, []);
    const setTag = (0, _react.useCallback)((tag)=>{
        setCommentator((oldComm)=>{
            return {
                ...oldComm,
                tag: tag
            };
        });
    }, []);
    return /*#__PURE__*/ (0, _reactDefault.default).createElement(Container, {
        __source: {
            fileName: "src/dashboard/components/Commentator.tsx",
            lineNumber: 26,
            columnNumber: 3
        },
        __self: undefined
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputRow), {
        __source: {
            fileName: "src/dashboard/components/Commentator.tsx",
            lineNumber: 27,
            columnNumber: 4
        },
        __self: undefined
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputLabel), {
        __source: {
            fileName: "src/dashboard/components/Commentator.tsx",
            lineNumber: 28,
            columnNumber: 5
        },
        __self: undefined
    }, "Name"), /*#__PURE__*/ (0, _reactDefault.default).createElement("input", {
        type: "text",
        value: comm.name || "",
        onChange: (event)=>{
            setName(event.target.value);
        },
        __source: {
            fileName: "src/dashboard/components/Commentator.tsx",
            lineNumber: 29,
            columnNumber: 5
        },
        __self: undefined
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputRow), {
        __source: {
            fileName: "src/dashboard/components/Commentator.tsx",
            lineNumber: 31,
            columnNumber: 4
        },
        __self: undefined
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputLabel), {
        __source: {
            fileName: "src/dashboard/components/Commentator.tsx",
            lineNumber: 32,
            columnNumber: 5
        },
        __self: undefined
    }, "Pronouns (opt.)"), /*#__PURE__*/ (0, _reactDefault.default).createElement("input", {
        type: "text",
        value: comm.pronouns || "",
        onChange: (event)=>{
            setPronouns(event.target.value);
        },
        __source: {
            fileName: "src/dashboard/components/Commentator.tsx",
            lineNumber: 33,
            columnNumber: 5
        },
        __self: undefined
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputRow), {
        __source: {
            fileName: "src/dashboard/components/Commentator.tsx",
            lineNumber: 35,
            columnNumber: 4
        },
        __self: undefined
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputLabel), {
        __source: {
            fileName: "src/dashboard/components/Commentator.tsx",
            lineNumber: 36,
            columnNumber: 5
        },
        __self: undefined
    }, "Tag (opt.)"), /*#__PURE__*/ (0, _reactDefault.default).createElement("input", {
        type: "text",
        value: comm.tag || "",
        onChange: (event)=>{
            setTag(event.target.value);
        },
        __source: {
            fileName: "src/dashboard/components/Commentator.tsx",
            lineNumber: 37,
            columnNumber: 5
        },
        __self: undefined
    })));
};
const Container = (0, _styledComponentsDefault.default).div`
    display: contents;
`;

},{"react":"bH1AQ","styled-components":"9xpRL","../components/Layout":"72fYZ","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}],"hrG5d":[function(require,module,exports) {
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

},{"react":"bH1AQ","styled-components":"9xpRL","./Layout":"72fYZ","@phosphor-icons/react":"h9z2e","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}]},["cGl2D"], "cGl2D", "parcelRequire156b")

//# sourceMappingURL=commentators.8345df0e.js.map
