import NodeCG from '@nodecg/types';
import { cloneDeep } from 'lodash';
import { useCallback, useEffect, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { exportJSON, fileToJSON } from './utils';
import { ListControlState } from '../types/types';

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

export const useTimedState = <T>(defaultState: T, time: number): [T, (value: T) => void] => {
	const [state, setState] = useState<T>(defaultState);
	const timeoutId = useRef<number | null>(null);

	const resetState = useCallback(() => {
		setState(defaultState);
	}, [defaultState]);

	const setTimedState = useCallback((value: T) => {
		setState(value);

		if(timeoutId.current) {
			clearInterval(timeoutId.current);
		}

		if(value === defaultState) return;

		timeoutId.current = window.setTimeout(resetState, time);
	}, [resetState, setState, defaultState, time]);

	return [state, setTimedState];
}

export const useListControl = <T>(list: T[], setList: (newList: T[]) => void, defaultItem: T, isListItem?: (item: unknown) => item is T, exportFileName?: string): ListControlState => {
	const [importError, setImportError] = useTimedState<string>("", 5000);
	const [deleteConfirmIndex, setDeleteConfirmIndex] = useTimedState(-1, 2000);

	const isListValid = useCallback((object: unknown): object is T[] => {
		if(!Array.isArray(object)) {
			return false;
		}

		if(isListItem && !object.every(isListItem)) {
			return false;
		}

		return true;
	}, [isListItem])

	const addItem = useCallback(() => {
		setList([...list, cloneDeep(defaultItem)])
	}, [setList, list, defaultItem]);

	const deleteItem = useCallback((itemIndex: number) => {
		if(deleteConfirmIndex === itemIndex) {
			setList(list.filter((item, index) => index !== itemIndex));
			setDeleteConfirmIndex(-1);
		}
		else {
			setDeleteConfirmIndex(itemIndex);
		}
	}, [setList, list, deleteConfirmIndex, setDeleteConfirmIndex]);

	const onImportList = useCallback((json: unknown) => {
		if(json && isListValid(json)) {
			setList(json);
			setImportError("");
		}
		else {
			setImportError("The file provided failed to be matched.");
		}
	}, [isListValid, setList, setImportError]);
	
	const { getRootProps, getInputProps, open } = useDropzone({ 
		onDrop:  (acceptedFiles: File[]) => { fileToJSON(acceptedFiles, onImportList, setImportError); }, 
		accept: { 'application/json': ['.json'] } , 
		noClick: true, noDrag: true, noKeyboard: true, multiple: false 
	});

	const exportList = useCallback(() => {
		exportJSON(list, exportFileName || 'list.json');
	}, [list, exportFileName]);

	return { addItem, delete: { deleteItem, deleteConfirmIndex }, importList: { getRootProps, getInputProps, open, importError }, exportList }
}