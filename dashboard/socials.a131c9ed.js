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
})({"hB2Fr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SocialsInformation", ()=>SocialsInformation);
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _styledComponents = require("styled-components");
var _styledComponentsDefault = parcelHelpers.interopDefault(_styledComponents);
var _client = require("react-dom/client");
var _reactHooks = require("@nodecg/react-hooks");
var _types = require("../types/types");
var _layout = require("./components/Layout");
var _lodash = require("lodash");
var _hooks = require("../helpers/hooks");
var _fieldsetItemList = require("./components/FieldsetItemList");
var _collapseContainerItemList = require("./components/CollapseContainerItemList");
const DefaultSocialItem = {
    platform: (0, _types.Platform).Bluesky,
    social: ""
};
const DefaultGroup = {
    name: "New Group",
    items: [
        DefaultSocialItem
    ]
};
const DefaultSocials = [
    {
        name: "SquidWest",
        items: [
            {
                platform: (0, _types.Platform).YouTube,
                social: "@SquidWestLANs"
            },
            {
                platform: (0, _types.Platform).Twitter,
                social: "@SquidWest"
            },
            {
                platform: (0, _types.Platform).Bluesky,
                social: "@squidwest.bsky.social"
            },
            {
                platform: (0, _types.Platform).Discord,
                social: "discord.gg/Acv9qH6"
            }
        ]
    }
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSocialsGroup = (object)=>{
    if (!object) return false;
    return object.name !== undefined && Array.isArray(object.items);
};
function SocialsInformation() {
    const [socials, setSocials] = (0, _reactHooks.useReplicant)("socials", {
        bundle: "squidwest-layout-controls",
        defaultValue: DefaultSocials
    });
    const [dashboardSocials, setDashboardSocials] = (0, _react.useState)(DefaultSocials);
    const { addItem, delete: { deleteItem, deleteConfirmIndex }, importList: { getRootProps, getInputProps, open, importError }, exportList } = (0, _hooks.useListControl)(dashboardSocials, setDashboardSocials, DefaultGroup, isSocialsGroup, "socials.json");
    const hasUnsavedChanges = (0, _react.useMemo)(()=>{
        return !(0, _lodash.isEqual)(socials, dashboardSocials);
    }, [
        socials,
        dashboardSocials
    ]);
    (0, _react.useEffect)(()=>{
        if (!socials) return;
        setDashboardSocials((0, _lodash.cloneDeep)(socials));
    }, [
        socials
    ]);
    const updateSocials = (0, _react.useCallback)(()=>{
        setSocials(dashboardSocials);
    }, [
        setSocials,
        dashboardSocials
    ]);
    return /*#__PURE__*/ (0, _reactDefault.default).createElement(PanelContainer, {
        ...getRootProps(),
        __source: {
            fileName: "src/dashboard/Socials.tsx",
            lineNumber: 72,
            columnNumber: 10
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("input", {
        ...getInputProps(),
        __source: {
            fileName: "src/dashboard/Socials.tsx",
            lineNumber: 73,
            columnNumber: 4
        },
        __self: this
    }), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _collapseContainerItemList.CollapseContainerItemList), {
        list: dashboardSocials,
        setList: setDashboardSocials,
        renderTitle: (group)=>/*#__PURE__*/ (0, _reactDefault.default).createElement((0, _reactDefault.default).Fragment, null, group.name, group.items.length > 0 && /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Badge), {
                $colorTag: "purple",
                __source: {
                    fileName: "src/dashboard/Socials.tsx",
                    lineNumber: 76,
                    columnNumber: 34
                }
            }, group.items.length, " Socials")),
        renderItem: (group, changeGroup, index)=>/*#__PURE__*/ (0, _reactDefault.default).createElement((0, _reactDefault.default).Fragment, null, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Row), {
                $align: "flex-end",
                $height: "4rem",
                __source: {
                    fileName: "src/dashboard/Socials.tsx",
                    lineNumber: 78,
                    columnNumber: 7
                }
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Fieldset), {
                $expand: true,
                __source: {
                    fileName: "src/dashboard/Socials.tsx",
                    lineNumber: 79,
                    columnNumber: 8
                }
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement("legend", {
                __source: {
                    fileName: "src/dashboard/Socials.tsx",
                    lineNumber: 80,
                    columnNumber: 9
                }
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
                __source: {
                    fileName: "src/dashboard/Socials.tsx",
                    lineNumber: 80,
                    columnNumber: 17
                }
            }, "Group Name")), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Input), {
                $expand: true,
                type: "text",
                value: group.name,
                onChange: (event)=>{
                    changeGroup({
                        name: event.target.value
                    });
                },
                __source: {
                    fileName: "src/dashboard/Socials.tsx",
                    lineNumber: 81,
                    columnNumber: 9
                }
            }))), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _fieldsetItemList.FieldsetItemList), {
                list: group.items,
                setList: (newList)=>{
                    changeGroup({
                        items: newList
                    });
                },
                renderItem: (item, changeItem)=>/*#__PURE__*/ (0, _reactDefault.default).createElement((0, _reactDefault.default).Fragment, null, /*#__PURE__*/ (0, _reactDefault.default).createElement("select", {
                        value: item.platform,
                        onChange: (event)=>{
                            changeItem({
                                platform: event.target.value
                            });
                        },
                        __source: {
                            fileName: "src/dashboard/Socials.tsx",
                            lineNumber: 93,
                            columnNumber: 9
                        }
                    }, Object.keys((0, _types.Platform)).map((platform, index)=>/*#__PURE__*/ (0, _reactDefault.default).createElement("option", {
                            key: index,
                            value: platform,
                            __source: {
                                fileName: "src/dashboard/Socials.tsx",
                                lineNumber: 98,
                                columnNumber: 58
                            }
                        }, platform))), /*#__PURE__*/ (0, _reactDefault.default).createElement("input", {
                        type: "text",
                        value: item.social,
                        onChange: (event)=>{
                            changeItem({
                                social: event.target.value
                            });
                        },
                        __source: {
                            fileName: "src/dashboard/Socials.tsx",
                            lineNumber: 100,
                            columnNumber: 9
                        }
                    })),
                defaultItem: DefaultSocialItem,
                title: "Socials",
                maxHeight: 350,
                __source: {
                    fileName: "src/dashboard/Socials.tsx",
                    lineNumber: 88,
                    columnNumber: 7
                }
            }), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.GridRow), {
                $height: "2rem",
                __source: {
                    fileName: "src/dashboard/Socials.tsx",
                    lineNumber: 106,
                    columnNumber: 7
                }
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement("div", {
                __source: {
                    fileName: "src/dashboard/Socials.tsx",
                    lineNumber: 107,
                    columnNumber: 8
                }
            }), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ButtonWide), {
                $colorTag: deleteConfirmIndex === index ? "dark-red" : "red",
                onClick: ()=>deleteItem(index),
                __source: {
                    fileName: "src/dashboard/Socials.tsx",
                    lineNumber: 108,
                    columnNumber: 8
                }
            }, deleteConfirmIndex === index ? "Confirm?" : "Delete"), /*#__PURE__*/ (0, _reactDefault.default).createElement("div", {
                __source: {
                    fileName: "src/dashboard/Socials.tsx",
                    lineNumber: 109,
                    columnNumber: 8
                }
            }))),
        maxHeight: 600,
        __source: {
            fileName: "src/dashboard/Socials.tsx",
            lineNumber: 74,
            columnNumber: 4
        },
        __self: this
    }), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.GridRow), {
        $height: "3rem",
        __source: {
            fileName: "src/dashboard/Socials.tsx",
            lineNumber: 112,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ButtonWide), {
        $expand: true,
        $colorTag: "green",
        onClick: ()=>{
            addItem();
        },
        __source: {
            fileName: "src/dashboard/Socials.tsx",
            lineNumber: 113,
            columnNumber: 5
        },
        __self: this
    }, "New Row"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ButtonWide), {
        $expand: true,
        $colorTag: hasUnsavedChanges ? "dark-red" : "pink",
        onClick: ()=>{
            updateSocials();
        },
        __source: {
            fileName: "src/dashboard/Socials.tsx",
            lineNumber: 116,
            columnNumber: 5
        },
        __self: this
    }, hasUnsavedChanges ? "Save Changes" : "Saved!"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ButtonWide), {
        $expand: true,
        $colorTag: "orange",
        onClick: ()=>{
            open();
        },
        __source: {
            fileName: "src/dashboard/Socials.tsx",
            lineNumber: 119,
            columnNumber: 5
        },
        __self: this
    }, "Import"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ButtonWide), {
        $expand: true,
        $colorTag: "blue",
        onClick: ()=>{
            exportList();
        },
        __source: {
            fileName: "src/dashboard/Socials.tsx",
            lineNumber: 122,
            columnNumber: 5
        },
        __self: this
    }, "Export")), importError !== "" && /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Row), {
        $align: "flex-end",
        __source: {
            fileName: "src/dashboard/Socials.tsx",
            lineNumber: 126,
            columnNumber: 27
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        $colorTag: "red",
        __source: {
            fileName: "src/dashboard/Socials.tsx",
            lineNumber: 126,
            columnNumber: 50
        },
        __self: this
    }, "ERROR: ", importError)));
}
const PanelContainer = (0, _styledComponentsDefault.default).div.withConfig({
    displayName: "Socials__PanelContainer",
    componentId: "sc-g7l6q4-0"
})([
    "position:relative;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:5px;padding:5px 10px 12px;"
]);
const root = (0, _client.createRoot)(document.getElementById("root"));
root.render(/*#__PURE__*/ (0, _reactDefault.default).createElement(SocialsInformation, {
    __source: {
        fileName: "src/dashboard/Socials.tsx",
        lineNumber: 134,
        columnNumber: 13
    },
    __self: undefined
}));

},{"react":"bH1AQ","styled-components":"9xpRL","react-dom/client":"i5cPj","@nodecg/react-hooks":"audz3","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG","../types/types":"2nPdh","lodash":"iyL42","./components/Layout":"72fYZ","../helpers/hooks":"2VUsa","./components/FieldsetItemList":"jlyLQ","./components/CollapseContainerItemList":"4TA1m"}],"2nPdh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LoadState", ()=>LoadState);
parcelHelpers.export(exports, "Platform", ()=>Platform);
var LoadState;
(function(LoadState) {
    LoadState[LoadState["LS_NotLoaded"] = 0] = "LS_NotLoaded";
    LoadState[LoadState["LS_Loaded"] = 1] = "LS_Loaded";
    LoadState[LoadState["LS_Done"] = 2] = "LS_Done";
})(LoadState || (LoadState = {}));
var Platform;
(function(Platform) {
    Platform["Bluesky"] = "Bluesky";
    Platform["Discord"] = "Discord";
    Platform["Twitter"] = "Twitter";
    Platform["YouTube"] = "YouTube";
})(Platform || (Platform = {}));

},{"@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}],"jlyLQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FieldsetItemList", ()=>FieldsetItemList);
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _layout = require("./Layout");
var _react1 = require("@phosphor-icons/react");
var _lodash = require("lodash");
const FieldsetItemList = ({ list, setList, renderItem, defaultItem, title, maxHeight, canAddItems = true, canDeleteItems = true, canSwapItems = true })=>{
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
    const addItem = (0, _react.useCallback)(()=>{
        setList([
            ...list,
            (0, _lodash.cloneDeep)(defaultItem)
        ]);
    }, [
        list,
        defaultItem,
        setList
    ]);
    const changeItem = (0, _react.useCallback)((partialItem, itemIndex)=>{
        setList(list.map((item, index)=>{
            if (index !== itemIndex) return item;
            if (typeof partialItem === "object") return {
                ...item,
                ...partialItem
            };
            return partialItem;
        }));
    }, [
        list,
        setList
    ]);
    const deleteItem = (0, _react.useCallback)((itemIndex)=>{
        setList(list.filter((item, index)=>index !== itemIndex));
    }, [
        list,
        setList
    ]);
    return /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Fieldset), {
        $column: true,
        $maxHeight: maxHeight,
        __source: {
            fileName: "src/dashboard/components/FieldsetItemList.tsx",
            lineNumber: 60,
            columnNumber: 10
        },
        __self: undefined
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("legend", {
        __source: {
            fileName: "src/dashboard/components/FieldsetItemList.tsx",
            lineNumber: 61,
            columnNumber: 4
        },
        __self: undefined
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Row), {
        __source: {
            fileName: "src/dashboard/components/FieldsetItemList.tsx",
            lineNumber: 62,
            columnNumber: 5
        },
        __self: undefined
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/components/FieldsetItemList.tsx",
            lineNumber: 63,
            columnNumber: 6
        },
        __self: undefined
    }, title), canAddItems && /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ButtonFieldset), {
        $colorTag: "green",
        onClick: ()=>{
            addItem();
        },
        __source: {
            fileName: "src/dashboard/components/FieldsetItemList.tsx",
            lineNumber: 64,
            columnNumber: 22
        },
        __self: undefined
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _react1.Plus), {
        weight: "bold",
        __source: {
            fileName: "src/dashboard/components/FieldsetItemList.tsx",
            lineNumber: 67,
            columnNumber: 8
        },
        __self: undefined
    })))), list.length <= 0 && /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Row), {
        $justify: "center",
        __source: {
            fileName: "src/dashboard/components/FieldsetItemList.tsx",
            lineNumber: 71,
            columnNumber: 25
        },
        __self: undefined
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/components/FieldsetItemList.tsx",
            lineNumber: 72,
            columnNumber: 6
        },
        __self: undefined
    }, "This list is empty! ", canAddItems ? `Click the + to add items here.` : ``)), list.map((listItem, index, array)=>{
        const item = renderItem(listItem, (partialItem)=>{
            changeItem(partialItem, index);
        });
        return /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Row), {
            $expand: true,
            key: index,
            __source: {
                fileName: "src/dashboard/components/FieldsetItemList.tsx",
                lineNumber: 78,
                columnNumber: 14
            },
            __self: undefined
        }, canSwapItems && /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Column), {
            __source: {
                fileName: "src/dashboard/components/FieldsetItemList.tsx",
                lineNumber: 79,
                columnNumber: 23
            },
            __self: undefined
        }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ButtonTiny), {
            $colorTag: "blue",
            $border: true,
            disabled: index <= 0,
            onClick: ()=>{
                moveItem(index, false);
            },
            __source: {
                fileName: "src/dashboard/components/FieldsetItemList.tsx",
                lineNumber: 80,
                columnNumber: 8
            },
            __self: undefined
        }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _react1.CaretUp), {
            __source: {
                fileName: "src/dashboard/components/FieldsetItemList.tsx",
                lineNumber: 82,
                columnNumber: 14
            },
            __self: undefined
        })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ButtonTiny), {
            $colorTag: "red",
            $border: true,
            disabled: index >= array.length - 1,
            onClick: ()=>{
                moveItem(index, true);
            },
            __source: {
                fileName: "src/dashboard/components/FieldsetItemList.tsx",
                lineNumber: 83,
                columnNumber: 8
            },
            __self: undefined
        }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _react1.CaretDown), {
            __source: {
                fileName: "src/dashboard/components/FieldsetItemList.tsx",
                lineNumber: 85,
                columnNumber: 14
            },
            __self: undefined
        }))), item, canDeleteItems && /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ButtonSmall), {
            $colorTag: "red",
            onClick: ()=>{
                deleteItem(index);
            },
            __source: {
                fileName: "src/dashboard/components/FieldsetItemList.tsx",
                lineNumber: 88,
                columnNumber: 25
            },
            __self: undefined
        }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _react1.X), {
            weight: "bold",
            __source: {
                fileName: "src/dashboard/components/FieldsetItemList.tsx",
                lineNumber: 91,
                columnNumber: 8
            },
            __self: undefined
        })));
    }));
};

},{"react":"bH1AQ","./Layout":"72fYZ","@phosphor-icons/react":"h9z2e","lodash":"iyL42","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}],"4TA1m":[function(require,module,exports) {
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

},{"react":"bH1AQ","styled-components":"9xpRL","./Layout":"72fYZ","@phosphor-icons/react":"h9z2e","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}]},["hB2Fr"], "hB2Fr", "parcelRequire156b")

//# sourceMappingURL=socials.a131c9ed.js.map
