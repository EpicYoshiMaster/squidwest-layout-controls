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
var _collapseContainer = require("./components/CollapseContainer");
var _lodash = require("lodash");
var _hooks = require("../helpers/hooks");
var _collapseContainerItemList = require("./components/CollapseContainerItemList");
const defaultCommentator = {
    name: "Commentator Name",
    pronouns: "any/all",
    tag: "@TagName"
};
const defaultCommentatorData = {
    autoShow: true,
    delay: 3000,
    autoHide: true,
    lifetime: 10000
};
const maxCommentators = 2;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isCommentator = (item)=>{
    if (!item) return false;
    return item.name !== undefined && item.pronouns !== undefined && item.tag !== undefined;
};
function Commentators() {
    //const [commentatorDatabase, setCommentatorDatabase] = useReplicant<CommentatorList>('commentatorDatabase', { defaultValue: [] });
    const [commentatorList, setCommentatorList] = (0, _reactHooks.useReplicant)("commentatorList", {
        defaultValue: []
    });
    const [settings, setSettings] = (0, _reactHooks.useReplicant)("commentatorSettings", {
        defaultValue: defaultCommentatorData
    });
    const [dashboardCommentatorList, setDashboardCommentatorList] = (0, _react.useState)([]);
    const [dashboardSettings, setDashboardSettings] = (0, _react.useState)(defaultCommentatorData);
    (0, _react.useEffect)(()=>{
        if (!settings) return;
        setDashboardSettings((0, _lodash.cloneDeep)(settings));
    }, [
        settings
    ]);
    (0, _react.useEffect)(()=>{
        if (!commentatorList) return;
        setDashboardCommentatorList((0, _lodash.cloneDeep)(commentatorList));
    }, [
        commentatorList
    ]);
    const { addItem, delete: { deleteItem, deleteConfirmIndex } } = (0, _hooks.useListControl)(dashboardCommentatorList, setDashboardCommentatorList, defaultCommentator, isCommentator);
    const saveChanges = (0, _react.useCallback)(()=>{
        setCommentatorList(dashboardCommentatorList);
        setSettings(dashboardSettings);
    }, [
        dashboardCommentatorList,
        dashboardSettings,
        setCommentatorList,
        setSettings
    ]);
    const hasUnsavedChanges = (0, _react.useMemo)(()=>{
        return !(0, _lodash.isEqual)(commentatorList, dashboardCommentatorList) || !(0, _lodash.isEqual)(settings, dashboardSettings);
    }, [
        commentatorList,
        dashboardCommentatorList,
        settings,
        dashboardSettings
    ]);
    const addToCredits = (0, _react.useCallback)(()=>{
        nodecg.sendMessage("commsCredits", dashboardCommentatorList);
    }, [
        dashboardCommentatorList
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
            lineNumber: 71,
            columnNumber: 10
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _collapseContainer.CollapseContainer), {
        title: "Configuration",
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 72,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.GridRow), {
        $height: "4.5rem",
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 73,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Row), {
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 74,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 75,
            columnNumber: 7
        },
        __self: this
    }, "Show Automatically"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Checkbox), {
        $checked: dashboardSettings.autoShow,
        onClick: ()=>setDashboardSettings((currentSettings)=>{
                return {
                    ...currentSettings,
                    autoShow: !currentSettings.autoShow
                };
            }),
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 76,
            columnNumber: 7
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Fieldset), {
        $expand: true,
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 83,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("legend", {
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 84,
            columnNumber: 7
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 84,
            columnNumber: 15
        },
        __self: this
    }, "Show Delay Time (ms)")), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Input), {
        type: "number",
        $expand: true,
        value: dashboardSettings.delay,
        onChange: (event)=>{
            setDashboardSettings((currentSettings)=>{
                return {
                    ...currentSettings,
                    delay: Number(event.target.value)
                };
            });
        },
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 85,
            columnNumber: 7
        },
        __self: this
    }))), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.GridRow), {
        $height: "4.5rem",
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 95,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Row), {
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 96,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 97,
            columnNumber: 7
        },
        __self: this
    }, "Hide Automatically"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Checkbox), {
        $checked: dashboardSettings.autoHide,
        onClick: ()=>setDashboardSettings((currentSettings)=>{
                return {
                    ...currentSettings,
                    autoHide: !currentSettings.autoHide
                };
            }),
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 98,
            columnNumber: 7
        },
        __self: this
    })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Fieldset), {
        $expand: true,
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 105,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("legend", {
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 106,
            columnNumber: 7
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 106,
            columnNumber: 15
        },
        __self: this
    }, "Lifetime (ms)")), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Input), {
        type: "number",
        $expand: true,
        value: dashboardSettings.lifetime,
        onChange: (event)=>{
            setDashboardSettings((currentSettings)=>{
                return {
                    ...currentSettings,
                    lifetime: Number(event.target.value)
                };
            });
        },
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 107,
            columnNumber: 7
        },
        __self: this
    })))), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _collapseContainerItemList.CollapseContainerItemList), {
        maxHeight: 500,
        list: dashboardCommentatorList,
        setList: setDashboardCommentatorList,
        renderTitle: (commentator)=>/*#__PURE__*/ (0, _reactDefault.default).createElement((0, _reactDefault.default).Fragment, null, commentator.name, commentator.pronouns !== "" && /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Badge), {
                $colorTag: "teal",
                __source: {
                    fileName: "src/dashboard/Commentators.tsx",
                    lineNumber: 120,
                    columnNumber: 39
                }
            }, commentator.pronouns)),
        renderItem: (commentator, changeCommentator, index)=>/*#__PURE__*/ (0, _reactDefault.default).createElement((0, _reactDefault.default).Fragment, null, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Row), {
                $expand: true,
                __source: {
                    fileName: "src/dashboard/Commentators.tsx",
                    lineNumber: 122,
                    columnNumber: 7
                }
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Fieldset), {
                $expand: true,
                __source: {
                    fileName: "src/dashboard/Commentators.tsx",
                    lineNumber: 123,
                    columnNumber: 8
                }
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement("legend", {
                __source: {
                    fileName: "src/dashboard/Commentators.tsx",
                    lineNumber: 124,
                    columnNumber: 9
                }
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
                __source: {
                    fileName: "src/dashboard/Commentators.tsx",
                    lineNumber: 124,
                    columnNumber: 17
                }
            }, "Name")), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Input), {
                $expand: true,
                type: "text",
                value: commentator.name,
                onChange: (event)=>{
                    changeCommentator({
                        name: event.target.value
                    });
                },
                __source: {
                    fileName: "src/dashboard/Commentators.tsx",
                    lineNumber: 125,
                    columnNumber: 9
                }
            }))), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Row), {
                $expand: true,
                __source: {
                    fileName: "src/dashboard/Commentators.tsx",
                    lineNumber: 132,
                    columnNumber: 7
                }
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Fieldset), {
                $expand: true,
                __source: {
                    fileName: "src/dashboard/Commentators.tsx",
                    lineNumber: 133,
                    columnNumber: 8
                }
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement("legend", {
                __source: {
                    fileName: "src/dashboard/Commentators.tsx",
                    lineNumber: 134,
                    columnNumber: 9
                }
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
                __source: {
                    fileName: "src/dashboard/Commentators.tsx",
                    lineNumber: 134,
                    columnNumber: 17
                }
            }, "Pronouns")), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Input), {
                $expand: true,
                type: "text",
                value: commentator.pronouns,
                onChange: (event)=>{
                    changeCommentator({
                        pronouns: event.target.value
                    });
                },
                __source: {
                    fileName: "src/dashboard/Commentators.tsx",
                    lineNumber: 135,
                    columnNumber: 9
                }
            }))), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Row), {
                $expand: true,
                __source: {
                    fileName: "src/dashboard/Commentators.tsx",
                    lineNumber: 142,
                    columnNumber: 7
                }
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Fieldset), {
                $expand: true,
                __source: {
                    fileName: "src/dashboard/Commentators.tsx",
                    lineNumber: 143,
                    columnNumber: 8
                }
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement("legend", {
                __source: {
                    fileName: "src/dashboard/Commentators.tsx",
                    lineNumber: 144,
                    columnNumber: 9
                }
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
                __source: {
                    fileName: "src/dashboard/Commentators.tsx",
                    lineNumber: 144,
                    columnNumber: 17
                }
            }, "Tag")), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Input), {
                $expand: true,
                type: "text",
                value: commentator.tag,
                onChange: (event)=>{
                    changeCommentator({
                        tag: event.target.value
                    });
                },
                __source: {
                    fileName: "src/dashboard/Commentators.tsx",
                    lineNumber: 145,
                    columnNumber: 9
                }
            }))), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.GridRow), {
                $height: "2rem",
                __source: {
                    fileName: "src/dashboard/Commentators.tsx",
                    lineNumber: 152,
                    columnNumber: 7
                }
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement("div", {
                __source: {
                    fileName: "src/dashboard/Commentators.tsx",
                    lineNumber: 153,
                    columnNumber: 8
                }
            }), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ButtonWide), {
                $colorTag: deleteConfirmIndex === index ? "dark-red" : "red",
                onClick: ()=>deleteItem(index),
                __source: {
                    fileName: "src/dashboard/Commentators.tsx",
                    lineNumber: 154,
                    columnNumber: 8
                }
            }, deleteConfirmIndex === index ? "Confirm?" : "Delete"), /*#__PURE__*/ (0, _reactDefault.default).createElement("div", {
                __source: {
                    fileName: "src/dashboard/Commentators.tsx",
                    lineNumber: 155,
                    columnNumber: 8
                }
            }))),
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 118,
            columnNumber: 4
        },
        __self: this
    }), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.GridRow), {
        $height: "56px",
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 158,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ButtonWide), {
        $expand: true,
        disabled: dashboardCommentatorList.length >= maxCommentators,
        $colorTag: "green",
        onClick: ()=>{
            addItem();
        },
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 159,
            columnNumber: 5
        },
        __self: this
    }, "New Row"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ButtonWide), {
        $expand: true,
        $colorTag: hasUnsavedChanges ? "dark-red" : "pink",
        onClick: ()=>{
            saveChanges();
        },
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 162,
            columnNumber: 5
        },
        __self: this
    }, hasUnsavedChanges ? "Save Changes" : "Saved!"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ButtonWide), {
        $expand: true,
        $colorTag: "teal",
        onClick: ()=>{
            addToCredits();
        },
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 165,
            columnNumber: 5
        },
        __self: this
    }, "Add to Credits")), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 169,
            columnNumber: 4
        },
        __self: this
    }, "Manual Controls"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.GridRow), {
        $height: "56px",
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 170,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ButtonWide), {
        $expand: true,
        $colorTag: "purple",
        onClick: ()=>{
            showCommentators();
        },
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 171,
            columnNumber: 5
        },
        __self: this
    }, "Show Comms"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ButtonWide), {
        $expand: true,
        $colorTag: "purple",
        onClick: ()=>{
            hideCommentators();
        },
        __source: {
            fileName: "src/dashboard/Commentators.tsx",
            lineNumber: 174,
            columnNumber: 5
        },
        __self: this
    }, "Hide Comms")));
}
const PanelContainer = (0, _styledComponentsDefault.default).div.withConfig({
    displayName: "Commentators__PanelContainer",
    componentId: "sc-1wc230p-0"
})([
    "display:flex;flex-direction:column;justify-content:center;align-items:center;gap:5px;padding:5px 10px 12px;"
]);
const root = (0, _client.createRoot)(document.getElementById("root"));
root.render(/*#__PURE__*/ (0, _reactDefault.default).createElement((0, _reactDefault.default).StrictMode, {
    __source: {
        fileName: "src/dashboard/Commentators.tsx",
        lineNumber: 185,
        columnNumber: 13
    },
    __self: undefined
}, /*#__PURE__*/ (0, _reactDefault.default).createElement(Commentators, {
    __source: {
        fileName: "src/dashboard/Commentators.tsx",
        lineNumber: 185,
        columnNumber: 31
    },
    __self: undefined
})));

},{"react":"bH1AQ","styled-components":"9xpRL","react-dom/client":"i5cPj","./components/Layout":"72fYZ","@nodecg/react-hooks":"audz3","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG","lodash":"iyL42","../helpers/hooks":"2VUsa","./components/CollapseContainerItemList":"4TA1m","./components/CollapseContainer":"hrG5d"}],"4TA1m":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CollapseContainerItemList", ()=>CollapseContainerItemList);
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _styledComponents = require("styled-components");
var _styledComponentsDefault = parcelHelpers.interopDefault(_styledComponents);
var _layout = require("./Layout");
var _collapseContainer = require("./CollapseContainer");
var _react1 = require("@phosphor-icons/react");
const CollapseContainerItemList = ({ list, setList, renderTitle, renderItem, maxHeight, canSwapItems = true, getColorTag = ()=>undefined })=>{
    const moveItem = (0, _react.useCallback)((itemIndex, moveForward)=>{
        if (itemIndex <= 0 && !moveForward || itemIndex >= list.length - 1 && moveForward) return;
        const currentItem = list[itemIndex];
        const swapIndex = itemIndex + (moveForward ? 1 : -1);
        const swapItem = list[swapIndex];
        setList(list.map((item, index)=>{
            if (index === itemIndex) return swapItem;
            else if (index === swapIndex) return currentItem;
            else return item;
        }));
    }, [
        list,
        setList
    ]);
    const changeItem = (0, _react.useCallback)((partialItem, itemIndex)=>{
        setList(list.map((item, index)=>{
            if (index !== itemIndex) return item;
            return {
                ...item,
                ...partialItem
            };
        }));
    }, [
        list,
        setList
    ]);
    return /*#__PURE__*/ (0, _reactDefault.default).createElement(ScrollContainer, {
        $maxHeight: maxHeight,
        __source: {
            fileName: "src/dashboard/components/CollapseContainerItemList.tsx",
            lineNumber: 48,
            columnNumber: 10
        },
        __self: undefined
    }, list.length <= 0 && /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _reactDefault.default).Fragment, null, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/components/CollapseContainerItemList.tsx",
            lineNumber: 50,
            columnNumber: 6
        },
        __self: undefined
    }, "There are no entries!"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/components/CollapseContainerItemList.tsx",
            lineNumber: 51,
            columnNumber: 6
        },
        __self: undefined
    }, "...unless you click the button to add one, perhaps!")), list.map((listItem, index, array)=>{
        const colorTag = getColorTag(listItem);
        const title = renderTitle(listItem, colorTag);
        const item = renderItem(listItem, (partialItem)=>{
            changeItem(partialItem, index);
        }, index, colorTag);
        return /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _collapseContainer.CollapseContainer), {
            key: index,
            colorTag: colorTag,
            title: /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _reactDefault.default).Fragment, null, canSwapItems && /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Column), {
                __source: {
                    fileName: "src/dashboard/components/CollapseContainerItemList.tsx",
                    lineNumber: 60,
                    columnNumber: 25
                }
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ButtonTiny), {
                $colorTag: "blue",
                $border: true,
                disabled: index <= 0,
                onClick: ()=>{
                    moveItem(index, false);
                },
                __source: {
                    fileName: "src/dashboard/components/CollapseContainerItemList.tsx",
                    lineNumber: 61,
                    columnNumber: 10
                }
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _react1.CaretUp), {
                weight: "bold",
                __source: {
                    fileName: "src/dashboard/components/CollapseContainerItemList.tsx",
                    lineNumber: 63,
                    columnNumber: 14
                }
            })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ButtonTiny), {
                $colorTag: "red",
                $border: true,
                disabled: index >= array.length - 1,
                onClick: ()=>{
                    moveItem(index, true);
                },
                __source: {
                    fileName: "src/dashboard/components/CollapseContainerItemList.tsx",
                    lineNumber: 64,
                    columnNumber: 10
                }
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _react1.CaretDown), {
                weight: "bold",
                __source: {
                    fileName: "src/dashboard/components/CollapseContainerItemList.tsx",
                    lineNumber: 66,
                    columnNumber: 14
                }
            }))), title),
            __source: {
                fileName: "src/dashboard/components/CollapseContainerItemList.tsx",
                lineNumber: 59,
                columnNumber: 14
            },
            __self: undefined
        }, item);
    }));
};
const ScrollContainer = (0, _styledComponentsDefault.default).div.withConfig({
    displayName: "CollapseContainerItemList__ScrollContainer",
    componentId: "sc-k7zi8o-0"
})([
    "position:relative;width:100%;padding-right:8px;& > div{margin-bottom:5px;}& > div:last-of-type{margin-bottom:0;}",
    ""
], ({ $maxHeight })=>$maxHeight ? (0, _styledComponents.css)([
        "overflow:auto;max-height:",
        "px;"
    ], $maxHeight) : (0, _styledComponents.css)([
        ""
    ]));

},{"react":"bH1AQ","styled-components":"9xpRL","./Layout":"72fYZ","@phosphor-icons/react":"h9z2e","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG","./CollapseContainer":"hrG5d"}],"hrG5d":[function(require,module,exports) {
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

},{"react":"bH1AQ","styled-components":"9xpRL","./Layout":"72fYZ","@phosphor-icons/react":"h9z2e","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}]},["cGl2D"], "cGl2D", "parcelRequire156b")

//# sourceMappingURL=commentators.8345df0e.js.map
