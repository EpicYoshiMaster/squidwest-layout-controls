import NodeCG from '@nodecg/types';
import { useCallback, useEffect, useState, useRef } from 'react';

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
	});

	return connected;
}

export const useTimedActive = (time: number, onTimeEnd?: () => void): [boolean, () => void] => {
	const [active, setActive] = useState(false);
	const timeoutId = useRef<number | null>(null);

	const startTime = useCallback(() => {
		setActive(true);
	}, []);

	useEffect(() => {
		if(active) {
			timeoutId.current = window.setTimeout(() => { 
				setActive(false); 

				if(onTimeEnd) {
					onTimeEnd();
				}
			}, time);
		}

		return () => {
			if(timeoutId.current) {
				clearInterval(timeoutId.current);
			}
		}
	}, [active, onTimeEnd, time]);

	return [active, startTime];
}