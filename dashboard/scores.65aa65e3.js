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
})({"iiCR8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Scores", ()=>Scores);
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _styledComponents = require("styled-components");
var _styledComponentsDefault = parcelHelpers.interopDefault(_styledComponents);
var _client = require("react-dom/client");
var _layout = require("./components/Layout");
var _reactHooks = require("@nodecg/react-hooks");
var _react1 = require("@phosphor-icons/react");
var _utils = require("../helpers/utils");
var _colorsJson = require("../data/colors.json");
var _colorsJsonDefault = parcelHelpers.interopDefault(_colorsJson);
var _lodash = require("lodash");
const MIN_SCORE = 0;
const MAX_SCORE = 9;
const defaultMatchData = {
    matchInfo: "Round 1",
    teamA: "Team A",
    teamB: "Team B",
    scoreA: 0,
    scoreB: 0,
    matchColor: (0, _colorsJsonDefault.default).localMode[0],
    swapColor: false
};
function Scores() {
    const [match, setMatch] = (0, _reactHooks.useReplicant)("match", {
        bundle: "squidwest-layout-controls",
        defaultValue: defaultMatchData
    });
    const [dashboardMatch, setDashboardMatch] = (0, _react.useState)(defaultMatchData);
    const [colorIndex, setColorIndex] = (0, _react.useState)(0);
    const [colorLock, setColorLock] = (0, _react.useState)(false);
    const [onlineMode, setOnlineMode] = (0, _react.useState)(false);
    const colorList = (0, _react.useMemo)(()=>{
        return colorLock ? (0, _colorsJsonDefault.default).colorLock : onlineMode ? (0, _colorsJsonDefault.default).onlineMode : (0, _colorsJsonDefault.default).localMode;
    }, [
        colorLock,
        onlineMode
    ]);
    (0, _react.useEffect)(()=>{
        if (!match) return;
        setDashboardMatch((0, _lodash.cloneDeep)(match));
    }, [
        match
    ]);
    const saveChanges = (0, _react.useCallback)(()=>{
        setMatch(dashboardMatch);
    }, [
        dashboardMatch,
        setMatch
    ]);
    const hasUnsavedChanges = (0, _react.useMemo)(()=>{
        return !(0, _lodash.isEqual)(match, dashboardMatch);
    }, [
        match,
        dashboardMatch
    ]);
    const showScores = (0, _react.useCallback)(()=>{
        nodecg.sendMessage("scoresControl", true);
    }, []);
    const hideScores = (0, _react.useCallback)(()=>{
        nodecg.sendMessage("scoresControl", false);
    }, []);
    const showCommentators = (0, _react.useCallback)(()=>{
        nodecg.sendMessage("commsControl", true);
    }, []);
    const hideCommentators = (0, _react.useCallback)(()=>{
        nodecg.sendMessage("commsControl", false);
    }, []);
    const updateColorIndex = (0, _react.useCallback)((index)=>{
        setColorIndex((0, _utils.modulo)(index, colorList.length));
    }, [
        colorList.length
    ]);
    (0, _react.useEffect)(()=>{
        setDashboardMatch((currentMatch)=>{
            return {
                ...currentMatch,
                matchColor: colorList[colorIndex]
            };
        });
    }, [
        colorList,
        colorIndex
    ]);
    return /*#__PURE__*/ (0, _reactDefault.default).createElement(PanelContainer, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 67,
            columnNumber: 10
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(TeamScoreRow, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 68,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(PanelColumn, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 69,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Fieldset), {
        $expand: true,
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 70,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("legend", {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 71,
            columnNumber: 7
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 71,
            columnNumber: 15
        },
        __self: this
    }, "Round Info (opt.)")), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Input), {
        type: "text",
        $expand: true,
        value: dashboardMatch.matchInfo,
        onChange: (event)=>{
            setDashboardMatch((currentMatch)=>{
                return {
                    ...currentMatch,
                    matchInfo: event.target.value
                };
            });
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 72,
            columnNumber: 7
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Fieldset), {
        $expand: true,
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 81,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("legend", {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 82,
            columnNumber: 7
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 82,
            columnNumber: 15
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Row), {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 83,
            columnNumber: 8
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(ColorDisplay, {
        $size: 20,
        $color: (0, _utils.getIndexColor)(colorIndex, colorList, dashboardMatch.swapColor),
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 84,
            columnNumber: 9
        },
        __self: this
    }), "Team A"))), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Input), {
        $expand: true,
        $height: "2.5rem",
        type: "text",
        value: dashboardMatch.teamA,
        onChange: (event)=>{
            setDashboardMatch((currentMatch)=>{
                return {
                    ...currentMatch,
                    teamA: event.target.value
                };
            });
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 88,
            columnNumber: 7
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Fieldset), {
        $expand: true,
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 97,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("legend", {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 98,
            columnNumber: 7
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 98,
            columnNumber: 15
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Row), {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 99,
            columnNumber: 8
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(ColorDisplay, {
        $size: 20,
        $color: (0, _utils.getIndexColor)(colorIndex, colorList, !dashboardMatch.swapColor),
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 100,
            columnNumber: 9
        },
        __self: this
    }), "Team B"))), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Input), {
        $expand: true,
        $height: "2.5rem",
        type: "text",
        value: dashboardMatch.teamB,
        onChange: (event)=>{
            setDashboardMatch((currentMatch)=>{
                return {
                    ...currentMatch,
                    teamB: event.target.value
                };
            });
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 104,
            columnNumber: 7
        },
        __self: this
    }))), /*#__PURE__*/ (0, _reactDefault.default).createElement(ScoreColumn, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 114,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(PanelRow, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 115,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(ScoreButton, {
        $colorTag: "red",
        onClick: ()=>{
            setDashboardMatch((currentMatch)=>{
                return {
                    ...currentMatch,
                    scoreA: (0, _utils.clamp)(currentMatch.scoreA - 1, MIN_SCORE, MAX_SCORE)
                };
            });
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 116,
            columnNumber: 7
        },
        __self: this
    }, "-"), /*#__PURE__*/ (0, _reactDefault.default).createElement(BigNumbers, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 124,
            columnNumber: 7
        },
        __self: this
    }, dashboardMatch.scoreA), /*#__PURE__*/ (0, _reactDefault.default).createElement(ScoreButton, {
        $colorTag: "green",
        onClick: ()=>{
            setDashboardMatch((currentMatch)=>{
                return {
                    ...currentMatch,
                    scoreA: (0, _utils.clamp)(currentMatch.scoreA + 1, MIN_SCORE, MAX_SCORE)
                };
            });
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 127,
            columnNumber: 7
        },
        __self: this
    }, "+")), /*#__PURE__*/ (0, _reactDefault.default).createElement(PanelRow, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 136,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(ScoreButton, {
        $colorTag: "red",
        onClick: ()=>{
            setDashboardMatch((currentMatch)=>{
                return {
                    ...currentMatch,
                    scoreB: (0, _utils.clamp)(currentMatch.scoreB - 1, MIN_SCORE, MAX_SCORE)
                };
            });
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 137,
            columnNumber: 7
        },
        __self: this
    }, "-"), /*#__PURE__*/ (0, _reactDefault.default).createElement(BigNumbers, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 145,
            columnNumber: 7
        },
        __self: this
    }, dashboardMatch.scoreB), /*#__PURE__*/ (0, _reactDefault.default).createElement(ScoreButton, {
        $colorTag: "green",
        onClick: ()=>{
            setDashboardMatch((currentMatch)=>{
                return {
                    ...currentMatch,
                    scoreB: (0, _utils.clamp)(currentMatch.scoreB + 1, MIN_SCORE, MAX_SCORE)
                };
            });
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 148,
            columnNumber: 7
        },
        __self: this
    }, "+")))), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Row), {
        $align: "center",
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 159,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(ColorButton, {
        $colorTag: "purple",
        onClick: ()=>{
            updateColorIndex(colorIndex - 1);
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 160,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(PanelRow, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 163,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _react1.CaretLeft), {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 164,
            columnNumber: 7
        },
        __self: this
    }), /*#__PURE__*/ (0, _reactDefault.default).createElement(ColorDisplay, {
        $size: 25,
        $color: (0, _utils.getIndexColor)(colorIndex - 1, colorList, dashboardMatch.swapColor),
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 165,
            columnNumber: 7
        },
        __self: this
    }), /*#__PURE__*/ (0, _reactDefault.default).createElement(ColorDisplay, {
        $size: 25,
        $color: (0, _utils.getIndexColor)(colorIndex - 1, colorList, !dashboardMatch.swapColor),
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 166,
            columnNumber: 7
        },
        __self: this
    }))), /*#__PURE__*/ (0, _reactDefault.default).createElement(ColorButton, {
        $colorTag: "purple",
        onClick: ()=>{
            setDashboardMatch((currentMatch)=>{
                return {
                    ...currentMatch,
                    swapColor: !currentMatch.swapColor
                };
            });
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 169,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(PanelRow, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 177,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(ColorDisplay, {
        $size: 40,
        $color: (0, _utils.getIndexColor)(colorIndex, colorList, dashboardMatch.swapColor),
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 178,
            columnNumber: 7
        },
        __self: this
    }), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _react1.Swap), {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 179,
            columnNumber: 7
        },
        __self: this
    }), /*#__PURE__*/ (0, _reactDefault.default).createElement(ColorDisplay, {
        $size: 40,
        $color: (0, _utils.getIndexColor)(colorIndex, colorList, !dashboardMatch.swapColor),
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 180,
            columnNumber: 7
        },
        __self: this
    }))), /*#__PURE__*/ (0, _reactDefault.default).createElement(ColorButton, {
        $colorTag: "purple",
        onClick: ()=>{
            updateColorIndex(colorIndex + 1);
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 183,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(PanelRow, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 186,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(ColorDisplay, {
        $size: 25,
        $color: (0, _utils.getIndexColor)(colorIndex + 1, colorList, dashboardMatch.swapColor),
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 187,
            columnNumber: 7
        },
        __self: this
    }), /*#__PURE__*/ (0, _reactDefault.default).createElement(ColorDisplay, {
        $size: 25,
        $color: (0, _utils.getIndexColor)(colorIndex + 1, colorList, !dashboardMatch.swapColor),
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 188,
            columnNumber: 7
        },
        __self: this
    }), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _react1.CaretRight), {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 189,
            columnNumber: 7
        },
        __self: this
    })))), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.GridRow), {
        $height: "56px",
        $templateColumns: "1fr 0.8fr 1fr",
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 193,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Row), {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 194,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 195,
            columnNumber: 6
        },
        __self: this
    }, "Color Lock"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Checkbox), {
        $checked: colorLock,
        onClick: ()=>{
            setColorLock(!colorLock);
            setColorIndex(0);
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 196,
            columnNumber: 6
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Row), {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 201,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 202,
            columnNumber: 6
        },
        __self: this
    }, "Online"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Checkbox), {
        $checked: onlineMode,
        onClick: ()=>{
            setOnlineMode(!onlineMode);
            setColorIndex(0);
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 203,
            columnNumber: 6
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ButtonWide), {
        $expand: true,
        $colorTag: hasUnsavedChanges ? "dark-red" : "pink",
        onClick: ()=>{
            saveChanges();
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 208,
            columnNumber: 5
        },
        __self: this
    }, hasUnsavedChanges ? "Save Changes" : "Saved!")), /*#__PURE__*/ (0, _reactDefault.default).createElement(PanelColumn, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 212,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        $textAlign: "center",
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 213,
            columnNumber: 5
        },
        __self: this
    }, "Controls"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.GridRow), {
        $height: "56px",
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 214,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ButtonWide), {
        $expand: true,
        $colorTag: "purple",
        onClick: ()=>{
            showScores();
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 215,
            columnNumber: 6
        },
        __self: this
    }, "Show Scores"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ButtonWide), {
        $expand: true,
        $colorTag: "purple",
        onClick: ()=>{
            hideScores();
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 218,
            columnNumber: 6
        },
        __self: this
    }, "Hide Scores")), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.GridRow), {
        $height: "56px",
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 222,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ButtonWide), {
        $expand: true,
        $colorTag: "purple",
        onClick: ()=>{
            showCommentators();
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 223,
            columnNumber: 6
        },
        __self: this
    }, "Show Comms"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ButtonWide), {
        $expand: true,
        $colorTag: "purple",
        onClick: ()=>{
            hideCommentators();
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 226,
            columnNumber: 6
        },
        __self: this
    }, "Hide Comms"))));
}
const PanelContainer = (0, _styledComponentsDefault.default).div.withConfig({
    displayName: "Scores__PanelContainer",
    componentId: "sc-spnar6-0"
})([
    "position:relative;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:5px;padding:5px 10px 12px;"
]);
const PanelRow = (0, _styledComponentsDefault.default).div.withConfig({
    displayName: "Scores__PanelRow",
    componentId: "sc-spnar6-1"
})([
    "width:100%;display:flex;flex-direction:row;justify-content:center;align-items:center;"
]);
const TeamScoreRow = (0, _styledComponentsDefault.default).div.withConfig({
    displayName: "Scores__TeamScoreRow",
    componentId: "sc-spnar6-2"
})([
    "width:100%;display:grid;grid-template-columns:1fr max-content;"
]);
const PanelColumn = (0, _styledComponentsDefault.default).div.withConfig({
    displayName: "Scores__PanelColumn",
    componentId: "sc-spnar6-3"
})([
    "height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;"
]);
const ScoreColumn = (0, _styledComponentsDefault.default)(PanelColumn).withConfig({
    displayName: "Scores__ScoreColumn",
    componentId: "sc-spnar6-4"
})([
    "padding-top:5.7rem;justify-content:flex-start;gap:1.7rem;"
]);
const ScoreButton = (0, _styledComponentsDefault.default)((0, _layout.ButtonWide)).withConfig({
    displayName: "Scores__ScoreButton",
    componentId: "sc-spnar6-5"
})([
    "margin:0 10px;width:40px;height:40px;padding:3px 0;font-size:1.5rem;"
]);
const ColorButton = (0, _styledComponentsDefault.default)((0, _layout.ButtonWide)).withConfig({
    displayName: "Scores__ColorButton",
    componentId: "sc-spnar6-6"
})([
    "margin:0 5px;padding:8px 3px;"
]);
const ColorDisplay = (0, _styledComponentsDefault.default).div.withConfig({
    displayName: "Scores__ColorDisplay",
    componentId: "sc-spnar6-7"
})([
    "margin:0 3px;height:",
    "px;width:",
    "px;border:3px solid black;border-radius:5px;background-color:",
    ";"
], ({ $size })=>$size, ({ $size })=>$size, ({ $color })=>$color);
const BigNumbers = (0, _styledComponentsDefault.default).div.withConfig({
    displayName: "Scores__BigNumbers",
    componentId: "sc-spnar6-8"
})([
    "font-size:2.5rem;font-weight:600;font-family:'Courier New',Courier,Consolas,monospace;"
]);
const root = (0, _client.createRoot)(document.getElementById("root"));
root.render(/*#__PURE__*/ (0, _reactDefault.default).createElement((0, _reactDefault.default).StrictMode, {
    __source: {
        fileName: "src/dashboard/Scores.tsx",
        lineNumber: 276,
        columnNumber: 13
    },
    __self: undefined
}, /*#__PURE__*/ (0, _reactDefault.default).createElement(Scores, {
    __source: {
        fileName: "src/dashboard/Scores.tsx",
        lineNumber: 276,
        columnNumber: 31
    },
    __self: undefined
})));

},{"react":"bH1AQ","styled-components":"9xpRL","react-dom/client":"i5cPj","./components/Layout":"72fYZ","@nodecg/react-hooks":"audz3","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG","@phosphor-icons/react":"h9z2e","../helpers/utils":"2gdT3","../data/colors.json":"lldi3","lodash":"iyL42"}],"lldi3":[function(require,module,exports) {
module.exports = JSON.parse('{"localMode":[{"index":0,"name":"YellowPurple","teamA":"#ceb121","teamB":"#9025c6"},{"index":1,"name":"TurquoiseRed","teamA":"#1ec0ad","teamB":"#d74b31"},{"index":2,"name":"TurquoisePink","teamA":"#1bbeab","teamB":"#c43a6e"},{"index":3,"name":"OrangePurple","teamA":"#cd510a","teamB":"#6e04b6"},{"index":4,"name":"LimegreenPurple","teamA":"#becd41","teamB":"#6325cd"},{"index":5,"name":"GreenPurple","teamA":"#a0c937","teamB":"#ba30b0"},{"index":6,"name":"BlueYellow","teamA":"#1a1aae","teamB":"#e38d24"},{"index":7,"name":"YellowBlue","teamA":"#d0be08","teamB":"#3a0ccd"},{"index":8,"name":"OrangeBlue","teamA":"#de6624","teamB":"#343bc4"},{"index":9,"name":"PinkGreen","teamA":"#c12d74","teamB":"#2cb721"}],"onlineMode":[{"index":0,"name":"GreenPurple","teamA":"#a0c937","teamB":"#ba30b0"},{"index":1,"name":"OrangeBlue","teamA":"#de6624","teamB":"#343bc4"},{"index":2,"name":"OrangePurple","teamA":"#cd510a","teamB":"#6e04b6"},{"index":3,"name":"BlueYellow","teamA":"#1a1aae","teamB":"#e38d24"},{"index":4,"name":"LimegreenPurple","teamA":"#becd41","teamB":"#6325cd"},{"index":5,"name":"YellowBlue","teamA":"#d0be08","teamB":"#3a0ccd"},{"index":6,"name":"TurquoiseRed","teamA":"#1ec0ad","teamB":"#d74b31"},{"index":7,"name":"TurquoisePink","teamA":"#1bbeab","teamB":"#c43a6e"},{"index":8,"name":"PinkGreen","teamA":"#c12d74","teamB":"#2cb721"},{"index":9,"name":"YellowPurple","teamA":"#ceb121","teamB":"#9025c6"}],"colorLock":[{"index":0,"name":"YellowBlue","teamA":"#caba21","teamB":"#502eba"},{"index":1,"name":"OrangeBlue","teamA":"#d99116","teamB":"#1655be"}]}');

},{}]},["iiCR8"], "iiCR8", "parcelRequire156b")

//# sourceMappingURL=scores.65aa65e3.js.map
