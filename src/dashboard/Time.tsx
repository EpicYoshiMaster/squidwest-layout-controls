import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components'
import { createRoot } from 'react-dom/client';
import { Text } from './components/Layout';
import { TimeDisplay } from './components/TimeDisplay';
import { TimeInterval } from '../types/types';
import { useObsConnectionStatus } from '../helpers/hooks';

export function Time() {

	const [breakTime, setBreakTime] = useState<TimeInterval>({ startTime: Date.now() });
	const [gameTime, setGameTime] = useState<TimeInterval>({ startTime: Date.now(), endTime: Date.now() });
	const [transitionTime, setTransitionTime] = useState<TimeInterval>({ startTime: Date.now() });

	const [currentTime, setCurrentTime] = useState<number>( Date.now() );
	const interval = useRef<number | null>(null);

	const connected = useObsConnectionStatus(nodecg);

	const onSceneChange = useCallback((value: { sceneName: string, timeStamp: number}) => {
		if(value.sceneName.includes("Game")) {
			setBreakTime((oldBreakTime) => oldBreakTime.endTime ? oldBreakTime : { ...oldBreakTime, endTime: value.timeStamp })
			setGameTime((oldGameTime) => oldGameTime.endTime ? {startTime: value.timeStamp} : oldGameTime)
		}
		else {
			setBreakTime(oldBreakTime => oldBreakTime.endTime ? {startTime: value.timeStamp} : oldBreakTime)
			setGameTime((oldGameTime) => oldGameTime.endTime ? oldGameTime : { ...oldGameTime, endTime: value.timeStamp })
		}

		setTransitionTime({ startTime: value.timeStamp });
	}, []);

	const calcTime = useCallback((interval: TimeInterval) => {
		return interval.endTime ? interval.endTime - interval.startTime : currentTime - interval.startTime;
	}, [currentTime]);

	useEffect(() => {
		if(!interval.current) {
			interval.current = window.setInterval(() => {
				setCurrentTime(Date.now());
			}, 10);
		}

		return () => {
			if(!interval.current) return;

			clearInterval(interval.current);
			interval.current = null;
		}

	}, [interval, setCurrentTime]);

	useEffect(() => {
		nodecg.listenFor('onSceneChange', onSceneChange);

		return () => {
			nodecg.unlisten('onSceneChange', onSceneChange);
		}
	});

	return (
		<PanelContainer>
			{connected && (
			<Wrapper>
				<TimeDisplay timingName='Time On Break' time={calcTime(breakTime)} />
				<TimeDisplay timingName='Time On Game' time={calcTime(gameTime)} />
				<TimeDisplay timingName='Time Since Transition' time={calcTime(transitionTime)} />	
			</Wrapper>
			)}

			{!connected && (
			<MarginWrapper>
				<Text>
					<p>OBS is not currently connected!</p>
					<p>This panel provides information on OBS transitions and break timings.</p>
					<p>To use it, go to <strong>2. Settings</strong> and check the <strong>OBS Settings</strong> NodeCG Panel to enable websocket support.</p>
				</Text>
			</MarginWrapper>
			)}
			
		</PanelContainer>
	)
}

const PanelContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
`;

const Wrapper = styled.div`
	display: contents;
`;

const MarginWrapper = styled.div`
	margin: 1.5rem 0.25rem;
	font-size: 1.25rem;
`;

const root = createRoot(document.getElementById('root')!);
root.render(<Time />);