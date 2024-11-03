import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components'
import NodeCG from '@nodecg/types';
import { createRoot } from 'react-dom/client';
import { InputButton, InputCheckbox, InputLabel, InputRow, InputSection, InputSubheader } from './components/Layout';
import { useReplicant } from '@nodecg/react-hooks'
import { IntermissionData } from 'schemas';

export function Intermission() {
	const [intermissionData, setIntermissionData] = useReplicant<IntermissionData>('intermission', { bundle: 'squidwest-layout-controls'});

	const [showTime, setShowTime] = useState(true);
	const [showEvent, setShowEvent] = useState(true);
	const [showLocation, setShowLocation] = useState(true);
	const [showFlavorText, setShowFlavorText] = useState(true);
	const [flavorText, setFlavorText] = useState("");

	useEffect(() => {
		if(!intermissionData) return;
   
		setShowTime(intermissionData.showTime);
		setShowEvent(intermissionData.showEvent);
		setShowLocation(intermissionData.showLocation);
		setShowFlavorText(intermissionData.showFlavorText);
		setFlavorText(intermissionData.flavorText);
	}, [intermissionData]);
	
	const updateIntermissionData = () => {
		let newIntermissionData: IntermissionData = {
			showTime: showTime,
			showEvent: showEvent,
			showLocation: showLocation,
			showFlavorText: showFlavorText,
			flavorText: flavorText
		};

		setIntermissionData(newIntermissionData);
	}

	return (
		<PanelContainer>
			<InputSection>
				<InputSubheader>Omnibar</InputSubheader>
				<InputRow>
					<InputLabel>Show Time/Date</InputLabel>
					<InputCheckbox $checked={showTime} onClick={() => setShowTime(!showTime) } />
				</InputRow>
				<InputRow>
					<InputLabel>Show Event Info</InputLabel>
					<InputCheckbox $checked={showEvent} onClick={() => setShowEvent(!showEvent) } />
				</InputRow>
				<InputRow>
					<InputLabel>Show Event Location</InputLabel>
					<InputCheckbox $checked={showLocation} onClick={() => setShowLocation(!showLocation) } />
				</InputRow>
				<InputRow>
					<InputLabel>Show Flavor Text</InputLabel>
					<InputCheckbox $checked={showFlavorText} onClick={() => setShowFlavorText(!showFlavorText) } />
				</InputRow>
				<InputRow>
					<InputLabel>Flavor Text</InputLabel>
					<input type="text" value={flavorText} onChange={(event) => { setFlavorText(event.target.value); }} />
				</InputRow>
			</InputSection>
			<InputButton onClick={() => { updateIntermissionData(); }}>Save</InputButton>
		</PanelContainer>
	)
}

const PanelContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const root = createRoot(document.getElementById('root')!);
root.render(<Intermission />);