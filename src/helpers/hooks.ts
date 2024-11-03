import NodeCG from '@nodecg/types';
import { useCallback, useEffect, useState } from 'react';

type ConnectionOptions = { onConnect?: () => void, onDisconnect?: () => void}

export const useObsConnectionStatus = (nodecg: NodeCG.ClientAPI, options?: ConnectionOptions) => {
	const [ connected, setConnected ] = useState(false);

	const onConnectionStatus = (value: {isConnected: boolean }) => {
		setConnected(value.isConnected);

		if(options) {
			if(options.onConnect && value.isConnected) {
				options.onConnect();
			}

			if(options.onDisconnect && !value.isConnected) {
				options.onDisconnect();
			}
		}
	};

	useEffect(() => {
		nodecg.listenFor('obsConnectionStatus', onConnectionStatus);

		return () => {
			nodecg.unlisten('obsConnectionStatus', onConnectionStatus);
		}
	}, []);

	return connected;
}