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