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
})({"7kAYc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Credits", ()=>Credits);
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _styledComponents = require("styled-components");
var _styledComponentsDefault = parcelHelpers.interopDefault(_styledComponents);
var _client = require("react-dom/client");
var _nameList = require("./components/NameList");
var _layout = require("./components/Layout");
var _reactHooks = require("@nodecg/react-hooks");
function Credits() {
    const [creditsData, setCreditsData] = (0, _reactHooks.useReplicant)("creditsData", {
        bundle: "squidwest-layout-controls"
    });
    const [setupTeam, setSetupTeam] = (0, _react.useState)([
        ""
    ]);
    const [commentaryTeam, setCommentaryTeam] = (0, _react.useState)([
        ""
    ]);
    const [techTeam, setTechTeam] = (0, _react.useState)([
        ""
    ]);
    const [staffTeam, setStaffTeam] = (0, _react.useState)([
        ""
    ]);
    const [headTO, setHeadTO] = (0, _react.useState)([
        ""
    ]);
    const [poolCaptains, setPoolCaptains] = (0, _react.useState)([
        ""
    ]);
    const [artTeam, setArtTeam] = (0, _react.useState)([
        ""
    ]);
    (0, _react.useEffect)(()=>{
        if (!creditsData) return;
        setSetupTeam(creditsData.setupTeam);
        setCommentaryTeam(creditsData.commentaryTeam);
        setTechTeam(creditsData.techTeam);
        setStaffTeam(creditsData.staffTeam);
        setHeadTO(creditsData.headTO);
        setPoolCaptains(creditsData.poolCaptains);
        setArtTeam(creditsData.artTeam);
    }, [
        creditsData
    ]);
    const onCommsCredits = (0, _react.useCallback)((value)=>{
        if (!value) return;
        let newCommentaryTeam = commentaryTeam.slice();
        value.forEach((name)=>{
            const trimmed = name.trim();
            if (name === "") return;
            if (!newCommentaryTeam.includes(trimmed)) newCommentaryTeam.push(trimmed);
        });
        setCommentaryTeam(newCommentaryTeam);
    }, [
        commentaryTeam,
        setCommentaryTeam
    ]);
    (0, _react.useEffect)(()=>{
        nodecg.listenFor("commsCredits", onCommsCredits);
        return ()=>{
            nodecg.unlisten("commsCredits", onCommsCredits);
        };
    }, [
        onCommsCredits
    ]);
    const updateCreditsData = ()=>{
        let newcreditsData = {
            setupTeam: setupTeam,
            commentaryTeam: commentaryTeam,
            techTeam: techTeam,
            staffTeam: staffTeam,
            headTO: headTO,
            poolCaptains: poolCaptains,
            artTeam: artTeam
        };
        setCreditsData(newcreditsData);
    };
    return /*#__PURE__*/ (0, _reactDefault.default).createElement(PanelContainer, {
        __source: {
            fileName: "src/dashboard/Credits.tsx",
            lineNumber: 74,
            columnNumber: 3
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputSection), {
        __source: {
            fileName: "src/dashboard/Credits.tsx",
            lineNumber: 75,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _nameList.NameList), {
        title: "Setup and Teardown Volunteers",
        list: setupTeam,
        listUpdateHandler: setSetupTeam,
        __source: {
            fileName: "src/dashboard/Credits.tsx",
            lineNumber: 76,
            columnNumber: 5
        },
        __self: this
    }), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _nameList.NameList), {
        title: "Commentary",
        list: commentaryTeam,
        listUpdateHandler: setCommentaryTeam,
        __source: {
            fileName: "src/dashboard/Credits.tsx",
            lineNumber: 77,
            columnNumber: 5
        },
        __self: this
    }), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _nameList.NameList), {
        title: "Stream Technicians",
        list: techTeam,
        listUpdateHandler: setTechTeam,
        __source: {
            fileName: "src/dashboard/Credits.tsx",
            lineNumber: 78,
            columnNumber: 5
        },
        __self: this
    }), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _nameList.NameList), {
        title: "Artists",
        list: artTeam,
        listUpdateHandler: setArtTeam,
        __source: {
            fileName: "src/dashboard/Credits.tsx",
            lineNumber: 79,
            columnNumber: 5
        },
        __self: this
    }), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _nameList.NameList), {
        title: "SquidWest TOs and Staff",
        list: staffTeam,
        listUpdateHandler: setStaffTeam,
        __source: {
            fileName: "src/dashboard/Credits.tsx",
            lineNumber: 80,
            columnNumber: 5
        },
        __self: this
    }), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _nameList.NameList), {
        title: "Head TO",
        list: headTO,
        listUpdateHandler: setHeadTO,
        __source: {
            fileName: "src/dashboard/Credits.tsx",
            lineNumber: 81,
            columnNumber: 5
        },
        __self: this
    }), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _nameList.NameList), {
        title: "Staff and Pool Captains",
        list: poolCaptains,
        listUpdateHandler: setPoolCaptains,
        __source: {
            fileName: "src/dashboard/Credits.tsx",
            lineNumber: 82,
            columnNumber: 5
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputButton), {
        onClick: ()=>{
            updateCreditsData();
        },
        __source: {
            fileName: "src/dashboard/Credits.tsx",
            lineNumber: 84,
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
root.render(/*#__PURE__*/ (0, _reactDefault.default).createElement(Credits, {
    __source: {
        fileName: "src/dashboard/Credits.tsx",
        lineNumber: 97,
        columnNumber: 13
    },
    __self: undefined
}));

},{"react":"bH1AQ","styled-components":"9xpRL","react-dom/client":"i5cPj","./components/NameList":"aP5aI","./components/Layout":"72fYZ","@nodecg/react-hooks":"audz3","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}],"aP5aI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "NameList", ()=>NameList);
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _styledComponents = require("styled-components");
var _styledComponentsDefault = parcelHelpers.interopDefault(_styledComponents);
var _layout = require("./Layout");
var _collapseContainer = require("./CollapseContainer");
const NameList = ({ title, list, listUpdateHandler })=>{
    const setItemValue = (newValue, i)=>{
        listUpdateHandler(list.map((item, index)=>{
            return i === index ? newValue : item;
        }));
    };
    const removeItem = ()=>{
        listUpdateHandler(list.filter((item, index)=>{
            return index < list.length - 1;
        }));
    };
    const addItem = ()=>{
        listUpdateHandler([
            ...list,
            ""
        ]);
    };
    return /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _collapseContainer.CollapseContainer), {
        title: title,
        __source: {
            fileName: "src/dashboard/components/NameList.tsx",
            lineNumber: 28,
            columnNumber: 9
        },
        __self: undefined
    }, list.map((item, i)=>{
        return /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputRow), {
            key: i,
            __source: {
                fileName: "src/dashboard/components/NameList.tsx",
                lineNumber: 31,
                columnNumber: 21
            },
            __self: undefined
        }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputLabel), {
            __source: {
                fileName: "src/dashboard/components/NameList.tsx",
                lineNumber: 32,
                columnNumber: 25
            },
            __self: undefined
        }, i + 1 + "."), /*#__PURE__*/ (0, _reactDefault.default).createElement("input", {
            type: "string",
            value: item,
            onChange: (event)=>{
                setItemValue(event.target.value, i);
            },
            __source: {
                fileName: "src/dashboard/components/NameList.tsx",
                lineNumber: 33,
                columnNumber: 25
            },
            __self: undefined
        }));
    }), /*#__PURE__*/ (0, _reactDefault.default).createElement(AddRemoveList, {
        __source: {
            fileName: "src/dashboard/components/NameList.tsx",
            lineNumber: 37,
            columnNumber: 13
        },
        __self: undefined
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputButtonSmall), {
        onClick: ()=>{
            removeItem();
        },
        __source: {
            fileName: "src/dashboard/components/NameList.tsx",
            lineNumber: 38,
            columnNumber: 17
        },
        __self: undefined
    }, "-"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputButtonSmall), {
        onClick: ()=>{
            addItem();
        },
        __source: {
            fileName: "src/dashboard/components/NameList.tsx",
            lineNumber: 39,
            columnNumber: 17
        },
        __self: undefined
    }, "+")));
};
const AddRemoveList = (0, _styledComponentsDefault.default).div`
    grid-column: 2;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
`;

},{"react":"bH1AQ","styled-components":"9xpRL","./Layout":"72fYZ","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG","./CollapseContainer":"hrG5d"}],"hrG5d":[function(require,module,exports) {
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

},{"react":"bH1AQ","styled-components":"9xpRL","./Layout":"72fYZ","@phosphor-icons/react":"h9z2e","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}],"audz3":[function(require,module,exports) {
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

},{"react":"bH1AQ","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}]},["7kAYc"], "7kAYc", "parcelRequire156b")

//# sourceMappingURL=credits.ed845b9a.js.map
