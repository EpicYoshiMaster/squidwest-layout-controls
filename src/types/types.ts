export enum LoadState {
	LS_NotLoaded,
	LS_Loaded,
	LS_Done
};

export type TimeInterval = {
	startTime: number;
	endTime?: number;
}