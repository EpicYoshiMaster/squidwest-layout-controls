import { ColorInfo } from 'schemas/matchData';

export const formatTimeHMSC = (ms: number): string => {
	ms = ms > 0 ? ms : 0;

	const hour = Math.floor(ms / 60 / 60 / 1000);
	ms = ms % (60 * 60 * 1000);

	const minute = Math.floor(ms / 60 / 1000);
	ms = ms % (60 * 1000);

	const second = Math.floor(ms / 1000);
	ms = ms % 1000;

	const centiseconds = Math.floor(ms / 10);

	return `${hour}:${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}.${centiseconds < 10 ? `0${centiseconds}` : centiseconds}`
}

export const formatDateHM = (date: Date) => {
	return date.getHours() + ":" + ((date.getMinutes() < 10) ? "0" : "") + date.getMinutes();
};

export const formatDateMDY = (date: Date) => {
	return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
}

export const modulo = (dividend: number, divisor: number) => {
	return ((dividend % divisor) + divisor) % divisor;
}

export const getIndexColor = (index: number, list: ColorInfo[], swap: boolean) => {
	return !swap ? list[modulo(index, list.length)].teamA : list[modulo(index, list.length)].teamB;
}

export const lerp = (a: number, b: number, alpha: number) => { return a + alpha * (b - a)};

export const clamp = (value: number, min: number, max: number) => { return Math.min(Math.max(value, min), max)};

/**
 * acceptedFiles can only be 1 file, it is an array to facilitate easy use of react-dropzone
 */
export const fileToJSON = (acceptedFiles: File[], onImport: (json: any) => void, onError: (error: string) => void) => {
	if(acceptedFiles.length > 1)
	{
		onError("Only one file can be imported at a time.");
		return;
	}

	if(acceptedFiles.length == 0)
	{
		onError("An unknown issue occurred while trying to load the file. (No files were accepted?)");
		return;
	}

	const [ file ] = acceptedFiles;

	file.text().then((value: string) => {
		try {
			const importedJSON = JSON.parse(value);
			onImport(importedJSON);

		} catch (error) {
			onError(`The file could not be read: ${error}.`);
		}
	}).catch((error) => {
		onError(`The file could not be read: ${error}`);
	});
}

export const exportJSON = (json: any, fileName: string) => {
	const a = document.createElement('a');

	a.href = URL.createObjectURL(new Blob([JSON.stringify(json, null, 2)], { type: 'text/plain' }));

	a.setAttribute('download', fileName);

	document.body.appendChild(a);

	a.click();

	document.body.removeChild(a);
}