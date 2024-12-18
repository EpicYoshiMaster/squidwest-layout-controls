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
function Scores() {
    const [match, setMatch] = (0, _reactHooks.useReplicant)("match", {
        bundle: "squidwest-layout-controls",
        defaultValue: {
            matchInfo: "Round 1",
            teamA: "Team A",
            teamB: "Team B",
            scoreA: 0,
            scoreB: 0,
            matchColor: (0, _colorsJsonDefault.default).anarchy[0],
            swapColor: false
        }
    });
    const [matchInfo, setMatchInfo] = (0, _react.useState)("Round 1");
    const [teamA, setTeamA] = (0, _react.useState)("Team A");
    const [teamB, setTeamB] = (0, _react.useState)("Team B");
    const [scoreA, setScoreA] = (0, _react.useState)(0);
    const [scoreB, setScoreB] = (0, _react.useState)(0);
    const [colorIndex, setColorIndex] = (0, _react.useState)(0);
    const [swapColor, setSwapColor] = (0, _react.useState)(false);
    const [colorLock, setColorLock] = (0, _react.useState)(false);
    const colorList = (0, _react.useMemo)(()=>{
        return !colorLock ? (0, _colorsJsonDefault.default).anarchy : (0, _colorsJsonDefault.default).colorLock;
    }, [
        colorLock
    ]);
    (0, _react.useEffect)(()=>{
        if (!match) return;
        setMatchInfo(match.matchInfo);
        setTeamA(match.teamA);
        setTeamB(match.teamB);
        setScoreA(match.scoreA);
        setScoreB(match.scoreB);
        if (match.matchColor) setColorIndex(match.matchColor.index);
        setSwapColor(match.swapColor);
    }, [
        match
    ]);
    const updateMatch = (0, _react.useCallback)(()=>{
        let newMatch = {
            matchInfo: matchInfo,
            teamA: teamA,
            teamB: teamB,
            scoreA: scoreA,
            scoreB: scoreB,
            matchColor: colorList[colorIndex],
            swapColor: swapColor
        };
        setMatch(newMatch);
    }, [
        matchInfo,
        teamA,
        teamB,
        scoreA,
        scoreB,
        colorList,
        colorIndex,
        swapColor,
        setMatch
    ]);
    const showScores = (0, _react.useCallback)(()=>{
        nodecg.sendMessage("scoresControl", true);
    }, []);
    const hideScores = (0, _react.useCallback)(()=>{
        nodecg.sendMessage("scoresControl", false);
    }, []);
    const updateColorIndex = (0, _react.useCallback)((index)=>{
        setColorIndex((0, _utils.modulo)(index, colorList.length));
    }, [
        colorLock
    ]);
    return /*#__PURE__*/ (0, _reactDefault.default).createElement(PanelColumn, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 81,
            columnNumber: 3
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(TeamScoreRow, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 82,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(PanelColumn, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 83,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(TeamInputSection, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 84,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputSubheader), {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 85,
            columnNumber: 7
        },
        __self: this
    }, "Match Information"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputRow), {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 86,
            columnNumber: 7
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputLabel), {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 87,
            columnNumber: 8
        },
        __self: this
    }, "Info (opt.)"), /*#__PURE__*/ (0, _reactDefault.default).createElement("input", {
        type: "text",
        value: matchInfo,
        onChange: (event)=>{
            setMatchInfo(event.target.value);
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 88,
            columnNumber: 8
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputRow), {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 90,
            columnNumber: 7
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputLabel), {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 91,
            columnNumber: 8
        },
        __self: this
    }, "Team A"), /*#__PURE__*/ (0, _reactDefault.default).createElement("input", {
        type: "text",
        value: teamA,
        onChange: (event)=>{
            setTeamA(event.target.value);
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 92,
            columnNumber: 8
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputRow), {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 94,
            columnNumber: 7
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputLabel), {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 95,
            columnNumber: 8
        },
        __self: this
    }, "Team B"), /*#__PURE__*/ (0, _reactDefault.default).createElement("input", {
        type: "text",
        value: teamB,
        onChange: (event)=>{
            setTeamB(event.target.value);
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 96,
            columnNumber: 8
        },
        __self: this
    }))), /*#__PURE__*/ (0, _reactDefault.default).createElement(ColorRow, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 99,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(ColorButton, {
        onClick: ()=>{
            updateColorIndex(colorIndex - 1);
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 100,
            columnNumber: 7
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(PanelRow, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 101,
            columnNumber: 8
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _react1.CaretLeft), {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 102,
            columnNumber: 9
        },
        __self: this
    }), /*#__PURE__*/ (0, _reactDefault.default).createElement(ColorDisplay, {
        $size: 25,
        $color: (0, _utils.getIndexColor)(colorIndex - 1, colorList, swapColor),
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 103,
            columnNumber: 9
        },
        __self: this
    }), /*#__PURE__*/ (0, _reactDefault.default).createElement(ColorDisplay, {
        $size: 25,
        $color: (0, _utils.getIndexColor)(colorIndex - 1, colorList, !swapColor),
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 104,
            columnNumber: 9
        },
        __self: this
    }))), /*#__PURE__*/ (0, _reactDefault.default).createElement(ColorButton, {
        onClick: ()=>{
            setSwapColor(!swapColor);
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 107,
            columnNumber: 7
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(PanelRow, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 108,
            columnNumber: 8
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(ColorDisplay, {
        $size: 40,
        $color: (0, _utils.getIndexColor)(colorIndex, colorList, swapColor),
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 109,
            columnNumber: 9
        },
        __self: this
    }), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _react1.Swap), {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 110,
            columnNumber: 9
        },
        __self: this
    }), /*#__PURE__*/ (0, _reactDefault.default).createElement(ColorDisplay, {
        $size: 40,
        $color: (0, _utils.getIndexColor)(colorIndex, colorList, !swapColor),
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 111,
            columnNumber: 9
        },
        __self: this
    }))), /*#__PURE__*/ (0, _reactDefault.default).createElement(ColorButton, {
        onClick: ()=>{
            updateColorIndex(colorIndex + 1);
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 114,
            columnNumber: 7
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(PanelRow, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 115,
            columnNumber: 8
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(ColorDisplay, {
        $size: 25,
        $color: (0, _utils.getIndexColor)(colorIndex + 1, colorList, swapColor),
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 116,
            columnNumber: 9
        },
        __self: this
    }), /*#__PURE__*/ (0, _reactDefault.default).createElement(ColorDisplay, {
        $size: 25,
        $color: (0, _utils.getIndexColor)(colorIndex + 1, colorList, !swapColor),
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 117,
            columnNumber: 9
        },
        __self: this
    }), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _react1.CaretRight), {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 118,
            columnNumber: 9
        },
        __self: this
    })))), /*#__PURE__*/ (0, _reactDefault.default).createElement(PanelRow, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 122,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputSection), {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 123,
            columnNumber: 7
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputRow), {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 124,
            columnNumber: 8
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputLabel), {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 125,
            columnNumber: 9
        },
        __self: this
    }, "Color Lock"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputCheckbox), {
        $checked: colorLock,
        onClick: ()=>{
            setColorLock(!colorLock);
            setColorIndex(0);
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 126,
            columnNumber: 9
        },
        __self: this
    }))), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputButton), {
        onClick: ()=>{
            updateMatch();
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 129,
            columnNumber: 7
        },
        __self: this
    }, "Save"))), /*#__PURE__*/ (0, _reactDefault.default).createElement(ScoreRow, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 132,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(ScoreColumn, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 133,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(ScoreButton, {
        onClick: ()=>{
            setScoreA(scoreA + 1);
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 134,
            columnNumber: 7
        },
        __self: this
    }, "+"), /*#__PURE__*/ (0, _reactDefault.default).createElement(BigNumbers, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 135,
            columnNumber: 7
        },
        __self: this
    }, scoreA), /*#__PURE__*/ (0, _reactDefault.default).createElement(ScoreButton, {
        onClick: ()=>{
            setScoreA(Math.max(scoreA - 1, 0));
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 138,
            columnNumber: 7
        },
        __self: this
    }, "-")), /*#__PURE__*/ (0, _reactDefault.default).createElement(BigNumbers, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 140,
            columnNumber: 6
        },
        __self: this
    }, ":"), /*#__PURE__*/ (0, _reactDefault.default).createElement(ScoreColumn, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 143,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(ScoreButton, {
        onClick: ()=>{
            setScoreB(scoreB + 1);
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 144,
            columnNumber: 7
        },
        __self: this
    }, "+"), /*#__PURE__*/ (0, _reactDefault.default).createElement(BigNumbers, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 145,
            columnNumber: 7
        },
        __self: this
    }, scoreB), /*#__PURE__*/ (0, _reactDefault.default).createElement(ScoreButton, {
        onClick: ()=>{
            setScoreB(Math.max(scoreB - 1, 0));
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 148,
            columnNumber: 7
        },
        __self: this
    }, "-")))), /*#__PURE__*/ (0, _reactDefault.default).createElement(PanelColumn, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 152,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement(LeftInputSubheader, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 153,
            columnNumber: 5
        },
        __self: this
    }, "Controls"), /*#__PURE__*/ (0, _reactDefault.default).createElement(PanelRow, {
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 154,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputButton), {
        onClick: ()=>{
            showScores();
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 155,
            columnNumber: 6
        },
        __self: this
    }, "Show Scores"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.InputButton), {
        onClick: ()=>{
            hideScores();
        },
        __source: {
            fileName: "src/dashboard/Scores.tsx",
            lineNumber: 156,
            columnNumber: 6
        },
        __self: this
    }, "Hide Scores"))));
}
const PanelRow = (0, _styledComponentsDefault.default).div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;
const TeamScoreRow = (0, _styledComponentsDefault.default).div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr max-content;
`;
const PanelColumn = (0, _styledComponentsDefault.default).div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const ScoreColumn = (0, _styledComponentsDefault.default)(PanelColumn)`
	justify-content: space-evenly;
`;
const ScoreButton = (0, _styledComponentsDefault.default)((0, _layout.InputButtonSmall))`
	margin: 0 10px;
`;
const TeamInputSection = (0, _styledComponentsDefault.default)((0, _layout.InputSection))`
	padding: 10px;	
`;
const LeftInputSubheader = (0, _styledComponentsDefault.default)((0, _layout.InputSubheader))`
	width: 100%;
	text-align: left;	
`;
const ColorButton = (0, _styledComponentsDefault.default)((0, _layout.InputButton))`
	margin: 0 5px;
	padding: 8px 3px;
`;
const ColorRow = (0, _styledComponentsDefault.default)(PanelRow)`
	justify-content: center;
`;
const ScoreRow = (0, _styledComponentsDefault.default)(PanelRow)`
	max-height: 250px;
`;
const ColorDisplay = (0, _styledComponentsDefault.default).div`
	margin: 0 3px;
	height: ${({ $size })=>$size}px;
	width: ${({ $size })=>$size}px;
	border: 3px solid black;
	border-radius: 5px;
	background-color: ${({ $color })=>$color};
`;
const BigNumbers = (0, _styledComponentsDefault.default).div`
	font-size: 4rem;
	font-weight: 600;
	font-family: 'Courier New', Courier, Consolas, monospace;
`;
const root = (0, _client.createRoot)(document.getElementById("root"));
root.render(/*#__PURE__*/ (0, _reactDefault.default).createElement((0, _reactDefault.default).StrictMode, {
    __source: {
        fileName: "src/dashboard/Scores.tsx",
        lineNumber: 231,
        columnNumber: 13
    },
    __self: undefined
}, /*#__PURE__*/ (0, _reactDefault.default).createElement(Scores, {
    __source: {
        fileName: "src/dashboard/Scores.tsx",
        lineNumber: 231,
        columnNumber: 31
    },
    __self: undefined
})));

},{"react":"bH1AQ","styled-components":"9xpRL","react-dom/client":"i5cPj","./components/Layout":"72fYZ","@nodecg/react-hooks":"audz3","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG","@phosphor-icons/react":"h9z2e","../helpers/utils":"2gdT3","../data/colors.json":"lldi3"}],"audz3":[function(require,module,exports) {
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

},{"react":"bH1AQ","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}],"2gdT3":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}],"lldi3":[function(require,module,exports) {
module.exports = JSON.parse('{"anarchy":[{"index":0,"name":"GreenPurple","teamA":"#a0c937","teamB":"#ba30b0"},{"index":1,"name":"OrangeBlue","teamA":"#de6624","teamB":"#343bc4"},{"index":2,"name":"OrangePurple","teamA":"#cd510a","teamB":"#6e04b6"},{"index":3,"name":"BlueYellow","teamA":"#1a1aae","teamB":"#e38d24"},{"index":4,"name":"LimegreenPurple","teamA":"#becd41","teamB":"#6325cd"},{"index":5,"name":"YellowBlue","teamA":"#d0be08","teamB":"#3a0ccd"},{"index":6,"name":"TurquoiseRed","teamA":"#1ec0ad","teamB":"#d74b31"},{"index":7,"name":"TurquoisePink","teamA":"#1bbeab","teamB":"#c43a6e"},{"index":8,"name":"PinkGreen","teamA":"#c12d74","teamB":"#2cb721"},{"index":9,"name":"YellowPurple","teamA":"#ceb121","teamB":"#9025c6"}],"colorLock":[{"index":0,"name":"YellowBlue","teamA":"#caba21","teamB":"#502eba"},{"index":1,"name":"OrangeBlue","teamA":"#d99116","teamB":"#1655be"}]}');

},{}]},["iiCR8"], "iiCR8", "parcelRequire156b")

//# sourceMappingURL=scores.65aa65e3.js.map
