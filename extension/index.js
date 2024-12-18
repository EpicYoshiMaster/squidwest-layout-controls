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
})({"adkVt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _packageJson = require("../../package.json");
var _packageJsonDefault = parcelHelpers.interopDefault(_packageJson);
var _obscontrol = require("./OBSControl");
var _logger = require("./Logger");
module.exports = async (nodecg)=>{
    console.log(`You're using ${(0, _packageJsonDefault.default).name} Version ${(0, _packageJsonDefault.default).version} (${(0, _packageJsonDefault.default).squidwest.month})`);
    const timeLogger = new (0, _logger.TimeLogger)(`${(0, _packageJsonDefault.default).name}-Time`, true);
    const onConnect = (obs)=>{
        nodecg.sendMessage("obsConnectionStatus", {
            isConnected: true
        });
    };
    const onDisconnect = (obs)=>{
        nodecg.sendMessage("obsConnectionStatus", {
            isConnected: false
        });
    };
    const onCurrentProgramSceneChanged = (obs, event)=>{
        const timeStamp = Date.now();
        nodecg.sendMessage("onSceneChange", {
            sceneName: event.sceneName,
            timeStamp: timeStamp
        });
        timeLogger.addTime(`On OBS Scene: ${event.sceneName}`, timeStamp);
    };
    const onStreamStateChanged = (obs, event)=>{
        if (event.outputActive && event.outputState === "OBS_WEBSOCKET_OUTPUT_STARTED") timeLogger.startRecord("Stream Started", Date.now());
        else if (!event.outputActive && event.outputState === "OBS_WEBSOCKET_OUTPUT_STOPPED") timeLogger.endRecord("Stream Ended", Date.now());
    };
    const obs = new (0, _obscontrol.OBSControl)({
        onConnect,
        onDisconnect,
        onCurrentProgramSceneChanged,
        onStreamStateChanged
    });
    nodecg.listenFor("setObsConnection", (value, ack)=>{
        if (value.connect) obs.connect(value.settings.serverIp, value.settings.serverPort, value.settings.serverPassword).then(()=>{
            if (ack && !ack.handled) ack(null, "OBS Connection Successful!");
        }).catch((e)=>{
            if (ack && !ack.handled) ack(e);
        });
    });
/*
	const obs = new OBSControl(nodecg);

	nodecg.listenFor('Hooray', () => {
		const easeInExpo = (alpha: number): number => {
            return (alpha <= 0) ? 0 : Math.pow(2, 10 * alpha - 10);
        }

		const easeOutExpo = (alpha: number): number => {
			return (alpha >= 1) ? 1 : 1 - Math.pow(2, -10 * alpha);
		}

		obs.setCurrentProgramScene('Game');
		obs.transitionInputVolume('Music', 3000, -100, 0, easeInExpo);
		obs.transitionInputVolume('Bottom Video Game', 3000, 0, -100, easeOutExpo);
	});*/ };

},{"../../package.json":"jpc7V","./OBSControl":"dZhDB","./Logger":"6o2Jo","@parcel/transformer-js/src/esmodule-helpers.js":"9VN6q"}],"jpc7V":[function(require,module,exports) {
module.exports = JSON.parse('{"name":"squidwest-layout-controls","version":"1.1.0","squidwest":{"month":"December 2024"},"description":"NodeCG Dashboard system for SquidWest Splatoon events","homepage":"","author":{"name":"EpicYoshiMaster","email":"epicyoshim@gmail.com","url":""},"files":["dashboard","graphics","extension.js","extension"],"keywords":["nodecg-bundle"],"nodecg":{"compatibleRange":"^2.0.0","dashboardPanels":[{"name":"credits","title":"Credits","width":3,"file":"credits.html","workspace":"1. Stream Tech","headerColor":"#525F78"},{"name":"intermission","title":"Intermission Screen","width":3,"file":"intermission.html","workspace":"1. Stream Tech","headerColor":"#525F78"},{"name":"commentators","title":"Commentators Information","width":3,"file":"commentators.html","workspace":"1. Stream Tech","headerColor":"#525F78"},{"name":"time","title":"Time Information","width":3,"file":"time.html","workspace":"1. Stream Tech","headerColor":"#525F78"},{"name":"eventinformation","title":"Event Information","width":3,"file":"eventinformation.html","workspace":"2. Settings","headerColor":"#525F78"},{"name":"socials","title":"Socials Information","width":3,"file":"socials.html","workspace":"2. Settings","headerColor":"#525F78"},{"name":"obs","title":"OBS Settings","width":3,"file":"obssettings.html","workspace":"2. Settings","headerColor":"#525F78"},{"name":"scores","title":"Scores","width":4,"file":"scores.html","workspace":"1. Stream Tech","headerColor":"#525F78"}]},"browserslist":{"production":[">0.5%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]},"scripts":{"build":"node scripts/build.mjs --all","build:extension":"node scripts/build.mjs --extension","watch":"node scripts/build.mjs --all --watch","watch:browser":"node scripts/build.mjs --dashboard --graphics --watch","watch:schemas":"node scripts/build.mjs --schemas --watch","dev":"concurrently --kill-others \\"npm run watch:schemas\\" \\"npm run watch:browser\\" \\"nodemon\\"","generate-schema-types":"trash src/types/schemas && nodecg schema-types"},"dependencies":{"@nodecg/react-hooks":"^1.0.3","@phosphor-icons/react":"^2.1.7","@types/react":"*","@types/react-dom":"*","obs-websocket-js":"^5.0.6","react":"*","react-dom":"*","styled-components":"^6.1.13","ts-node":"*"},"devDependencies":{"@nodecg/types":"^2.0.0","@parcel/config-default":"*","@parcel/core":"*","@parcel/reporter-cli":"*","@parcel/validator-typescript":"*","@types/node":"^18","concurrently":"*","glob":"^10.2.7","nodemon":"*","trash-cli":"*","typescript":"^5.1.3"},"license":"MIT"}');

},{}],"dZhDB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "OBSControl", ()=>OBSControl);
var _obsWebsocketJs = require("obs-websocket-js");
var _obsWebsocketJsDefault = parcelHelpers.interopDefault(_obsWebsocketJs);
class OBSControl {
    async connect(ip, port, password) {
        try {
            await this.socket.connect(`ws://${ip}:${port}`, password);
            console.log("OBS Connected");
            if (this.eventCalls.onConnect) this.eventCalls.onConnect(this);
            const onExitStarted = ()=>{
                console.log("OBS Disconnected");
                if (this.eventCalls.onDisconnect) this.eventCalls.onDisconnect(this);
                this.socket.off("ExitStarted", onExitStarted);
            };
            this.socket.on("ExitStarted", onExitStarted).on("CurrentProgramSceneChanged", this.onCurrentProgramSceneChanged.bind(this)).on("StreamStateChanged", this.onStreamStateChanged.bind(this));
        } catch (e) {
            throw new Error(`OBS Connection Failed: ${e instanceof Error ? e.message : String(e)}`);
        }
    }
    //
    // Events
    //
    onCurrentProgramSceneChanged(event) {
        if (this.eventCalls.onCurrentProgramSceneChanged) this.eventCalls.onCurrentProgramSceneChanged(this, event);
    }
    onStreamStateChanged(event) {
        if (this.eventCalls.onStreamStateChanged) this.eventCalls.onStreamStateChanged(this, event);
    }
    //
    // Requests
    //
    setCurrentProgramScene(scene) {
        return this.socket.call("SetCurrentProgramScene", {
            sceneName: scene
        });
    }
    async transitionInputVolume(input, transitionTime, targetDb, startDb, interpFunc) {
        if (startDb) await this.setInputVolume(input, startDb);
        const { inputVolumeDb } = await this.getInputVolume(input);
        let startTime = new Date().getTime();
        const lerp = (a, b, alpha)=>{
            return a + alpha * (b - a);
        };
        const clamp = (value, min, max)=>{
            return Math.min(Math.max(value, min), max);
        };
        let setVolumeInterval = setInterval(()=>{
            const alpha = (new Date().getTime() - startTime) / transitionTime;
            this.setInputVolume(input, lerp(inputVolumeDb, targetDb, clamp(interpFunc ? interpFunc(alpha) : alpha, 0, 1)));
            console.log(`${input} - alpha: ${alpha}, dB: ${lerp(inputVolumeDb, targetDb, clamp(interpFunc ? interpFunc(alpha) : alpha, 0, 1))}`);
        }, 10);
        await setTimeout(()=>{
            clearInterval(setVolumeInterval);
            this.setInputVolume(input, targetDb);
            console.log(`${input} - DONE, dB: ${targetDb}`);
        }, transitionTime);
    }
    getInputVolume(input) {
        return this.socket.call("GetInputVolume", {
            inputName: input
        });
    }
    setInputVolume(input, dB) {
        return this.socket.call("SetInputVolume", {
            inputName: input,
            inputVolumeDb: dB
        });
    }
    constructor(eventCalls){
        this.socket = new (0, _obsWebsocketJsDefault.default)();
        this.eventCalls = eventCalls;
    }
}

},{"obs-websocket-js":"obs-websocket-js","@parcel/transformer-js/src/esmodule-helpers.js":"9VN6q"}],"9VN6q":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"6o2Jo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Logger", ()=>Logger);
parcelHelpers.export(exports, "TimeLogger", ()=>TimeLogger);
var _objectSpread = require("@swc/helpers/_/_object_spread");
var _objectSpreadProps = require("@swc/helpers/_/_object_spread_props");
var _fs = require("fs");
var _utils = require("../helpers/utils");
class Logger {
    //Writes one line of text, then moves to the next line.
    write(text) {
        if (!this.stream) {
            console.log(`LOGGER: Error, attempted to write file with non-existant stream!`);
            return;
        }
        this.stream.write(text + "\n");
    }
    constructor(logName, includeDate){
        const currentTime = new Date();
        const date = currentTime.getMonth() + 1 + "_" + currentTime.getDate() + "_" + currentTime.getFullYear();
        this.logName = logName + (includeDate ? `_${date}` : ``);
        this.stream = _fs.createWriteStream(`./logs/${this.logName}.log`, {
            flags: "a"
        });
    }
}
class TimeLogger extends Logger {
    addTime(name, time, isLabel = false) {
        if (this.timeLog.length > 0) {
            let prevTime = this.timeLog[this.timeLog.length - 1];
            //In the event this is just a label, take the name of the previous log if it exists
            if (prevTime.isLabel && this.timeLog.length > 1) prevTime = (0, _objectSpreadProps._)((0, _objectSpread._)({}, prevTime), {
                name: this.timeLog[this.timeLog.length - 2].name
            });
            const duration = time - prevTime.time;
            this.write(`${(0, _utils.formatDateHM)(new Date(prevTime.time))} - ${prevTime.name} (${(0, _utils.formatTimeHMSC)(duration)})`);
            if (name.includes("Game")) {
                let startofBreakTime = this.timeLog.slice().reverse().find((log, index, array)=>{
                    if (log.isLabel) return true;
                    //Next entry in array is the Game scene (reversed)
                    if (index < array.length - 1 && array[index + 1].name.includes("Game")) return true;
                    return false;
                });
                if (!startofBreakTime) startofBreakTime = this.timeLog[0];
                const breakTime = time - startofBreakTime.time;
                this.write(`\nBreak Time: ${(0, _utils.formatTimeHMSC)(breakTime)}\n`);
            }
        }
        this.timeLog.push({
            name,
            time,
            isLabel
        });
    }
    startRecord(recordLabel, time) {
        if (this.recordIndex >= 0) {
            console.log(`TIMELOGGER: Warning, attempted to start a record while already recording.`);
            return;
        }
        this.addTime(recordLabel, time, true);
        this.write(`\n${(0, _utils.formatDateHM)(new Date(time))} === ${recordLabel} ===\n`);
        this.recordIndex = this.timeLog.length - 1;
    }
    endRecord(recordLabel, time) {
        if (this.recordIndex < 0) {
            console.log(`TIMELOGGER: Warning, attempted to finish a record without starting recording.`);
            return;
        }
        this.addTime(recordLabel, time, true);
        this.write(`\n${(0, _utils.formatDateHM)(new Date(time))} === ${recordLabel} ===\n`);
        const totalTime = this.timeLog[this.timeLog.length - 1].time - this.timeLog[this.recordIndex].time;
        const gameTime = this.timeLog.reduce((accum, log, index, array)=>{
            if (log.name.includes("Game") && index < array.length - 1) return accum + (array[index + 1].time - log.time);
            else return accum;
        }, 0);
        const breakTime = totalTime - gameTime;
        this.write("Summary\n");
        this.write(`Total Time: ${(0, _utils.formatTimeHMSC)(totalTime)}`);
        this.write(`Game Time: ${(0, _utils.formatTimeHMSC)(gameTime)}`);
        this.write(`Break Time: ${(0, _utils.formatTimeHMSC)(breakTime)}\n`);
        this.recordIndex = -1;
    }
    constructor(...args){
        super(...args);
        this.timeLog = [];
        this.recordIndex = -1;
    }
}

},{"@swc/helpers/_/_object_spread":"3fvE7","@swc/helpers/_/_object_spread_props":"8TpEU","fs":"fs","../helpers/utils":"8neMH","@parcel/transformer-js/src/esmodule-helpers.js":"9VN6q"}],"3fvE7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_", ()=>_object_spread);
var _definePropertyJs = require("./_define_property.js");
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
        ownKeys.forEach(function(key) {
            (0, _definePropertyJs._)(target, key, source[key]);
        });
    }
    return target;
}

},{"./_define_property.js":"bdMCd","@parcel/transformer-js/src/esmodule-helpers.js":"9VN6q"}],"bdMCd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_", ()=>_define_property);
function _define_property(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9VN6q"}],"8TpEU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_", ()=>_object_spread_props);
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    else ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
    return target;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9VN6q"}],"8neMH":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9VN6q"}]},["adkVt"], "adkVt", "parcelRequire156b")

//# sourceMappingURL=index.js.map
