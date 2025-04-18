import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone/.";

export enum LoadState {
	LS_NotLoaded,
	LS_Loaded,
	LS_Done
};

export enum Platform {
	Bluesky = 'Bluesky',
	Discord = 'Discord',
	Twitter = 'Twitter',
	YouTube = 'YouTube'
}

export type TimeInterval = {
	startTime: number;
	endTime?: number;
}

export type ListControlState = {
	addItem: () => void;
	delete: {
		deleteItem: (itemIndex: number) => void;
		deleteConfirmIndex: number;
	}
	importList: {
		getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
		getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
		open: () => void;
		importError: string;
	};
	exportList: () => void;
}