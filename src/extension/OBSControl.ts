import OBSWebSocket, { OBSEventTypes } from 'obs-websocket-js';

export type OBSCallback = (obs: OBSControl) => void;
export type OBSEventCallback<E extends keyof OBSEventTypes> = (obs: OBSControl, event: OBSEventTypes[E]) => void;

export type OBSEventCalls = {
    onConnect?: OBSCallback;
    onDisconnect?: OBSCallback;
    onCurrentProgramSceneChanged?: OBSEventCallback<'CurrentProgramSceneChanged'>;
    onStreamStateChanged?: OBSEventCallback<'StreamStateChanged'>;
    //Expand this list as necessities grow
}

export class OBSControl {
    private socket: OBSWebSocket;
    private eventCalls: OBSEventCalls;

    constructor(eventCalls: OBSEventCalls) {
        this.socket = new OBSWebSocket();
        this.eventCalls = eventCalls;
    }

    async connect(ip: string, port: string, password?: string): Promise<void> {

        try {
            await this.socket.connect(`ws://${ip}:${port}`, password);

            console.log("OBS Connected");

            if(this.eventCalls.onConnect) {
                this.eventCalls.onConnect(this);
            }

            const onExitStarted = () => { 
                console.log("OBS Disconnected");

                if(this.eventCalls.onDisconnect) {
                    this.eventCalls.onDisconnect(this); 
                }
                
                this.socket.off('ExitStarted', onExitStarted);
            }

            this.socket.on('ExitStarted', onExitStarted)
                .on('CurrentProgramSceneChanged', this.onCurrentProgramSceneChanged.bind(this))
                .on('StreamStateChanged', this.onStreamStateChanged.bind(this));
        }
        catch(e) {
            throw new Error(`OBS Connection Failed: ${e instanceof Error ? e.message : String(e)}`);
        }
    }

    //
    // Events
    //

    private onCurrentProgramSceneChanged(event: { sceneName: string, sceneUuid: string }) {
        if(this.eventCalls.onCurrentProgramSceneChanged) { 
            this.eventCalls.onCurrentProgramSceneChanged(this, event);
        }
    }

    private onStreamStateChanged(event: { outputActive: boolean, outputState: string }) {
        if(this.eventCalls.onStreamStateChanged) { 
            this.eventCalls.onStreamStateChanged(this, event);
        }
    }

    //
    // Requests
    //

    setCurrentProgramScene(scene: string): Promise<void> {
        return this.socket.call('SetCurrentProgramScene', {sceneName: scene});
    }

    async transitionInputVolume(input: string, transitionTime: number, targetDb: number, startDb?: number, interpFunc?: (alpha: number) => number) {
        if(startDb) {
            await this.setInputVolume(input, startDb);
        }

        const { inputVolumeDb } = await this.getInputVolume(input);

        let startTime = new Date().getTime();

        const lerp = (a: number, b: number, alpha: number) => { return a + alpha * (b - a)};
        const clamp = (value: number, min: number, max: number) => { return Math.min(Math.max(value, min), max)};

        let setVolumeInterval = setInterval(() => { 
            const alpha = (new Date().getTime() - startTime) / transitionTime;
            this.setInputVolume(input, lerp(inputVolumeDb, targetDb, clamp(interpFunc ? interpFunc(alpha) : alpha, 0, 1)));
            console.log(`${input} - alpha: ${alpha}, dB: ${lerp(inputVolumeDb, targetDb, clamp(interpFunc ? interpFunc(alpha) : alpha, 0, 1))}`);
        }, 10);

        await setTimeout(() => {
            clearInterval(setVolumeInterval)
            this.setInputVolume(input, targetDb);
            console.log(`${input} - DONE, dB: ${targetDb}`);
        }, transitionTime);
    }

    getInputVolume(input: string): Promise<{inputVolumeDb: number, inputVolumeMul: number}> {
        return this.socket.call('GetInputVolume', {inputName: input});
    }

    setInputVolume(input: string, dB: number): Promise<void> {
        return this.socket.call('SetInputVolume', {inputName: input, inputVolumeDb: dB});
    }
}