import NodeCG from '@nodecg/types';
import Package from '../../package.json'
import { OBSControl } from './OBSControl';
import { ObsData } from 'schemas/obsData';
import { BundleImages } from 'schemas/bundleImages'; 
import { TimeLogger } from './Logger';
import { updateBundleImages } from '../helpers/utils';

export = async (nodecg: NodeCG.ServerAPI) => {

	console.log(`You're using ${Package.name} Version ${Package.version} (${Package.squidwest.month})`);

	const bundleImages = nodecg.Replicant<BundleImages>('bundleImages', { defaultValue: { bundles: [], selectedBundle: "", images: [] }});

	bundleImages.value = updateBundleImages(bundleImages.value);

	const timeLogger = new TimeLogger(`${Package.name}-Time`, true);
	
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onConnect = (obs: OBSControl) => {
		nodecg.sendMessage('obsConnectionStatus', { isConnected: true });
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onDisconnect = (obs: OBSControl) => {
		nodecg.sendMessage('obsConnectionStatus', { isConnected: false });
	}

	const onCurrentProgramSceneChanged = (obs: OBSControl, event: {sceneName: string, sceneUuid: string}) => {
		const timeStamp = Date.now();
		nodecg.sendMessage('onSceneChange', { sceneName: event.sceneName, timeStamp: timeStamp});

		timeLogger.addTime(`On OBS Scene: ${event.sceneName}`, timeStamp);
	}

	const onStreamStateChanged = (obs: OBSControl, event: { outputActive: boolean; outputState: string; }) => {
		if(event.outputActive && event.outputState === 'OBS_WEBSOCKET_OUTPUT_STARTED') {
			timeLogger.startRecord("Stream Started", Date.now());
		}
		else if(!event.outputActive && event.outputState === 'OBS_WEBSOCKET_OUTPUT_STOPPED') {
			timeLogger.endRecord("Stream Ended", Date.now());
		}
	};

	const obs = new OBSControl({ onConnect, onDisconnect, onCurrentProgramSceneChanged, onStreamStateChanged });

	nodecg.listenFor('setObsConnection', (value: { connect: boolean, settings: ObsData }, ack) => {

		if(value.connect) {

			obs.connect(value.settings.serverIp, value.settings.serverPort, value.settings.serverPassword).then(() => {
				if(ack && !ack.handled) {
					ack(null, "OBS Connection Successful!");
				}
			}).catch((e) => {
				if(ack && !ack.handled) {
					ack(e);
				}
			})
		}
		
	})

	nodecg.listenFor('updateBundleImages', (oldValue: BundleImages) => {
		bundleImages.value = updateBundleImages(oldValue);
		console.log(bundleImages.value);
	})

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
	});*/
}