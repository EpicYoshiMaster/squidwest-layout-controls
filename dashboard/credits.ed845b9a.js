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
var _layout = require("./components/Layout");
var _reactHooks = require("@nodecg/react-hooks");
var _lodash = require("lodash");
var _hooks = require("../helpers/hooks");
var _utils = require("../helpers/utils");
var _collapseContainerItemList = require("./components/CollapseContainerItemList");
var _fieldsetItemList = require("./components/FieldsetItemList");
const defaultCreditsRow = {
    name: "Credit Name",
    image: "",
    imageBundle: "",
    items: []
};
const defaultCredits = [
    {
        name: "Credit Name",
        image: "",
        imageBundle: "",
        items: []
    }
];
const specialCreditsRows = [
    {
        name: "YOSHI",
        colorTag: "green",
        disableFeatures: true
    },
    {
        name: "CURRENTEVENT",
        colorTag: "orange",
        disableFeatures: true
    },
    {
        name: "NEXTEVENT",
        colorTag: "orange",
        disableFeatures: true
    },
    {
        name: "Commentary",
        colorTag: "teal",
        disableFeatures: false
    }
];
const commentaryRowName = "Commentary";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isCreditsRow = (item)=>{
    if (!item) return false;
    return item.name !== undefined && item.image !== undefined && Array.isArray(item.items);
};
const shouldDisableRowFeatures = (creditsRow)=>{
    return specialCreditsRows.find((value)=>value.name === creditsRow.name && value.disableFeatures);
};
function Credits() {
    const [credits, setCredits] = (0, _reactHooks.useReplicant)("creditsData", {
        bundle: "squidwest-layout-controls",
        defaultValue: defaultCredits
    });
    const [bundleImages] = (0, _reactHooks.useReplicant)("bundleImages", {
        defaultValue: {
            bundles: [],
            selectedBundle: "",
            images: []
        }
    });
    const [selectedBundle, setSelectedBundle] = (0, _react.useState)("");
    const [dashboardCredits, setDashboardCredits] = (0, _react.useState)(defaultCredits);
    (0, _react.useEffect)(()=>{
        if (!bundleImages) return;
        setSelectedBundle(bundleImages.selectedBundle);
    }, [
        bundleImages
    ]);
    (0, _react.useEffect)(()=>{
        if (!credits) return;
        setDashboardCredits((0, _lodash.cloneDeep)(credits));
    }, [
        credits
    ]);
    const { addItem, delete: { deleteItem, deleteConfirmIndex }, importList: { getRootProps, getInputProps, open, importError }, exportList } = (0, _hooks.useListControl)(dashboardCredits, setDashboardCredits, defaultCreditsRow, isCreditsRow, "credits.json");
    const hasUnsavedChanges = (0, _react.useMemo)(()=>{
        return !(0, _lodash.isEqual)(credits, dashboardCredits);
    }, [
        credits,
        dashboardCredits
    ]);
    const updateSelectedBundle = (0, _react.useCallback)((value)=>{
        setSelectedBundle(value);
        nodecg.sendMessage("updateBundleImages", {
            ...bundleImages,
            selectedBundle: value
        });
    }, [
        bundleImages
    ]);
    const onCommsCredits = (0, _react.useCallback)((addCommentators)=>{
        if (!addCommentators) return;
        const commentaryCreditsIndex = dashboardCredits.findIndex((creditsRow)=>creditsRow.name === commentaryRowName);
        if (commentaryCreditsIndex !== -1) {
            const newCommentaryItems = dashboardCredits[commentaryCreditsIndex].items.slice();
            addCommentators.forEach((commentator)=>{
                const trimmed = commentator.name.trim();
                if (trimmed === "") return;
                if (!newCommentaryItems.includes(trimmed)) newCommentaryItems.push(trimmed);
            });
            setDashboardCredits((oldDashboardCredits)=>oldDashboardCredits.map((creditsRow)=>{
                    if (creditsRow.name !== commentaryRowName) return creditsRow;
                    return {
                        ...creditsRow,
                        items: newCommentaryItems
                    };
                }));
        }
    }, [
        dashboardCredits
    ]);
    (0, _reactHooks.useListenFor)("commsCredits", onCommsCredits);
    const updateCredits = (0, _react.useCallback)(()=>{
        setCredits(dashboardCredits);
    }, [
        setCredits,
        dashboardCredits
    ]);
    return /*#__PURE__*/ (0, _reactDefault.default).createElement(PanelContainer, {
        ...getRootProps(),
        __source: {
            fileName: "src/dashboard/Credits.tsx",
            lineNumber: 124,
            columnNumber: 10
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("input", {
        ...getInputProps(),
        __source: {
            fileName: "src/dashboard/Credits.tsx",
            lineNumber: 125,
            columnNumber: 4
        },
        __self: this
    }), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Row), {
        $expand: true,
        $height: "4rem",
        $justify: "center",
        $align: "center",
        __source: {
            fileName: "src/dashboard/Credits.tsx",
            lineNumber: 126,
            columnNumber: 4
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Fieldset), {
        __source: {
            fileName: "src/dashboard/Credits.tsx",
            lineNumber: 127,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement("legend", {
        __source: {
            fileName: "src/dashboard/Credits.tsx",
            lineNumber: 128,
            columnNumber: 6
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        __source: {
            fileName: "src/dashboard/Credits.tsx",
            lineNumber: 128,
            columnNumber: 14
        },
        __self: this
    }, "Selected Bundle for Images")), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Select), {
        $width: "300px",
        value: selectedBundle,
        onChange: (event)=>{
            updateSelectedBundle(event.target.value);
        },
        __source: {
            fileName: "src/dashboard/Credits.tsx",
            lineNumber: 129,
            columnNumber: 6
        },
        __self: this
    }, bundleImages && bundleImages.bundles.map((bundle, index)=>/*#__PURE__*/ (0, _reactDefault.default).createElement("option", {
            key: index,
            value: bundle,
            __source: {
                fileName: "src/dashboard/Credits.tsx",
                lineNumber: 132,
                columnNumber: 68
            },
            __self: this
        }, bundle))))), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _collapseContainerItemList.CollapseContainerItemList), {
        maxHeight: 600,
        list: dashboardCredits,
        setList: setDashboardCredits,
        getColorTag: (creditsRow)=>{
            const specialRow = specialCreditsRows.find((value)=>value.name === creditsRow.name);
            return specialRow ? specialRow.colorTag : undefined;
        },
        renderTitle: (creditsRow)=>/*#__PURE__*/ (0, _reactDefault.default).createElement((0, _reactDefault.default).Fragment, null, creditsRow.name, (creditsRow.items.length > 0 || shouldDisableRowFeatures(creditsRow)) && /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Badge), {
                $colorTag: "purple",
                __source: {
                    fileName: "src/dashboard/Credits.tsx",
                    lineNumber: 141,
                    columnNumber: 81
                }
            }, shouldDisableRowFeatures(creditsRow) ? `Special Row` : `${creditsRow.items.length} Entries`)),
        renderItem: (creditsRow, changeRow, index)=>/*#__PURE__*/ (0, _reactDefault.default).createElement((0, _reactDefault.default).Fragment, null, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Row), {
                $height: "4rem",
                __source: {
                    fileName: "src/dashboard/Credits.tsx",
                    lineNumber: 143,
                    columnNumber: 7
                }
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Fieldset), {
                $expand: true,
                __source: {
                    fileName: "src/dashboard/Credits.tsx",
                    lineNumber: 144,
                    columnNumber: 8
                }
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement("legend", {
                __source: {
                    fileName: "src/dashboard/Credits.tsx",
                    lineNumber: 145,
                    columnNumber: 9
                }
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
                __source: {
                    fileName: "src/dashboard/Credits.tsx",
                    lineNumber: 145,
                    columnNumber: 17
                }
            }, "Credit Name")), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Input), {
                $expand: true,
                type: "text",
                value: creditsRow.name,
                onChange: (event)=>{
                    changeRow({
                        name: event.target.value
                    });
                },
                __source: {
                    fileName: "src/dashboard/Credits.tsx",
                    lineNumber: 146,
                    columnNumber: 9
                }
            }))), !shouldDisableRowFeatures(creditsRow) && /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _reactDefault.default).Fragment, null, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Row), {
                __source: {
                    fileName: "src/dashboard/Credits.tsx",
                    lineNumber: 154,
                    columnNumber: 8
                }
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Fieldset), {
                $height: "100px",
                $expand: true,
                __source: {
                    fileName: "src/dashboard/Credits.tsx",
                    lineNumber: 155,
                    columnNumber: 9
                }
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement("legend", {
                __source: {
                    fileName: "src/dashboard/Credits.tsx",
                    lineNumber: 156,
                    columnNumber: 10
                }
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
                __source: {
                    fileName: "src/dashboard/Credits.tsx",
                    lineNumber: 156,
                    columnNumber: 18
                }
            }, "Image")), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Row), {
                $height: "100%",
                $expand: true,
                __source: {
                    fileName: "src/dashboard/Credits.tsx",
                    lineNumber: 157,
                    columnNumber: 10
                }
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Select), {
                $width: creditsRow.image !== "" ? `275px` : `100%`,
                value: creditsRow.image,
                onChange: (event)=>{
                    changeRow({
                        image: event.target.value,
                        imageBundle: event.target.value !== "" ? selectedBundle : ""
                    });
                },
                __source: {
                    fileName: "src/dashboard/Credits.tsx",
                    lineNumber: 158,
                    columnNumber: 11
                }
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement("optgroup", {
                label: `Selected (${creditsRow.imageBundle !== "" ? creditsRow.imageBundle : "N/A"})`,
                __source: {
                    fileName: "src/dashboard/Credits.tsx",
                    lineNumber: 164,
                    columnNumber: 12
                }
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement("option", {
                value: creditsRow.image,
                __source: {
                    fileName: "src/dashboard/Credits.tsx",
                    lineNumber: 165,
                    columnNumber: 13
                }
            }, creditsRow.image !== "" ? creditsRow.image : "None")), /*#__PURE__*/ (0, _reactDefault.default).createElement("optgroup", {
                label: selectedBundle,
                __source: {
                    fileName: "src/dashboard/Credits.tsx",
                    lineNumber: 167,
                    columnNumber: 12
                }
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement("option", {
                value: "",
                __source: {
                    fileName: "src/dashboard/Credits.tsx",
                    lineNumber: 168,
                    columnNumber: 13
                }
            }, "None"), bundleImages && bundleImages.images.map((imagePath, index)=>/*#__PURE__*/ (0, _reactDefault.default).createElement("option", {
                    key: index,
                    value: imagePath,
                    __source: {
                        fileName: "src/dashboard/Credits.tsx",
                        lineNumber: 169,
                        columnNumber: 76
                    }
                }, imagePath)))), creditsRow.image !== "" && creditsRow.imageBundle !== "" && /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Image), {
                $maxWidth: "70px",
                height: 70,
                src: (0, _utils.getImagePath)(creditsRow.imageBundle, creditsRow.image),
                __source: {
                    fileName: "src/dashboard/Credits.tsx",
                    lineNumber: 172,
                    columnNumber: 72
                }
            })))), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _fieldsetItemList.FieldsetItemList), {
                list: creditsRow.items,
                setList: (newList)=>{
                    changeRow({
                        items: newList
                    });
                },
                renderItem: (item, changeItem)=>/*#__PURE__*/ (0, _reactDefault.default).createElement((0, _reactDefault.default).Fragment, null, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Input), {
                        $expand: true,
                        type: "text",
                        value: item,
                        onChange: (event)=>{
                            changeItem(event.target.value);
                        },
                        __source: {
                            fileName: "src/dashboard/Credits.tsx",
                            lineNumber: 181,
                            columnNumber: 10
                        }
                    })),
                defaultItem: "",
                title: "Entries",
                maxHeight: 350,
                __source: {
                    fileName: "src/dashboard/Credits.tsx",
                    lineNumber: 176,
                    columnNumber: 8
                }
            })), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.GridRow), {
                $height: "2rem",
                __source: {
                    fileName: "src/dashboard/Credits.tsx",
                    lineNumber: 187,
                    columnNumber: 7
                }
            }, /*#__PURE__*/ (0, _reactDefault.default).createElement("div", {
                __source: {
                    fileName: "src/dashboard/Credits.tsx",
                    lineNumber: 188,
                    columnNumber: 8
                }
            }), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ButtonWide), {
                $colorTag: deleteConfirmIndex === index ? "dark-red" : "red",
                onClick: ()=>deleteItem(index),
                __source: {
                    fileName: "src/dashboard/Credits.tsx",
                    lineNumber: 189,
                    columnNumber: 8
                }
            }, deleteConfirmIndex === index ? "Confirm?" : "Delete"), /*#__PURE__*/ (0, _reactDefault.default).createElement("div", {
                __source: {
                    fileName: "src/dashboard/Credits.tsx",
                    lineNumber: 190,
                    columnNumber: 8
                }
            }))),
        __source: {
            fileName: "src/dashboard/Credits.tsx",
            lineNumber: 136,
            columnNumber: 4
        },
        __self: this
    }), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.GridRow), {
        $height: "3rem",
        __source: {
            fileName: "src/dashboard/Credits.tsx",
            lineNumber: 193,
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
            fileName: "src/dashboard/Credits.tsx",
            lineNumber: 194,
            columnNumber: 5
        },
        __self: this
    }, "New Row"), /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.ButtonWide), {
        $expand: true,
        $colorTag: hasUnsavedChanges ? "dark-red" : "pink",
        onClick: ()=>{
            updateCredits();
        },
        __source: {
            fileName: "src/dashboard/Credits.tsx",
            lineNumber: 197,
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
            fileName: "src/dashboard/Credits.tsx",
            lineNumber: 200,
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
            fileName: "src/dashboard/Credits.tsx",
            lineNumber: 203,
            columnNumber: 5
        },
        __self: this
    }, "Export")), importError !== "" && /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Row), {
        $align: "flex-end",
        __source: {
            fileName: "src/dashboard/Credits.tsx",
            lineNumber: 207,
            columnNumber: 27
        },
        __self: this
    }, /*#__PURE__*/ (0, _reactDefault.default).createElement((0, _layout.Text), {
        $colorTag: "red",
        __source: {
            fileName: "src/dashboard/Credits.tsx",
            lineNumber: 207,
            columnNumber: 50
        },
        __self: this
    }, "ERROR: ", importError)));
}
const PanelContainer = (0, _styledComponentsDefault.default).div.withConfig({
    displayName: "Credits__PanelContainer",
    componentId: "sc-kz8xcs-0"
})([
    "position:relative;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:5px;padding:5px 10px 12px;"
]);
const root = (0, _client.createRoot)(document.getElementById("root"));
root.render(/*#__PURE__*/ (0, _reactDefault.default).createElement(Credits, {
    __source: {
        fileName: "src/dashboard/Credits.tsx",
        lineNumber: 215,
        columnNumber: 13
    },
    __self: undefined
}));

},{"react":"bH1AQ","styled-components":"9xpRL","react-dom/client":"i5cPj","./components/Layout":"72fYZ","@nodecg/react-hooks":"audz3","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG","lodash":"iyL42","../helpers/hooks":"2VUsa","../helpers/utils":"2gdT3","./components/CollapseContainerItemList":"4TA1m","./components/FieldsetItemList":"jlyLQ"}],"4TA1m":[function(require,module,exports) {
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

},{"react":"bH1AQ","styled-components":"9xpRL","./Layout":"72fYZ","@phosphor-icons/react":"h9z2e","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}],"jlyLQ":[function(require,module,exports) {
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

},{"react":"bH1AQ","./Layout":"72fYZ","@phosphor-icons/react":"h9z2e","lodash":"iyL42","@parcel/transformer-js/src/esmodule-helpers.js":"hvLRG"}]},["7kAYc"], "7kAYc", "parcelRequire156b")

//# sourceMappingURL=credits.ed845b9a.js.map
