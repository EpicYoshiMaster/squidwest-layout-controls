import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components'
import { createRoot } from 'react-dom/client';
import { Checkbox, Text, Row, GridRow, Fieldset, Input, ButtonWide } from './components/Layout';
import { useReplicant } from '@nodecg/react-hooks'
import { IntermissionData } from 'schemas/intermissionData';
import { CollapseContainer } from './components/CollapseContainer';
import { cloneDeep, isEqual } from 'lodash';

const defaultIntermissionSettings: IntermissionData = {
	showTime: true,
	showEvent: true,
	showLocation: true,
	showFlavorText: true,
	flavorText: ""
}

export function Intermission() {
	const [intermissionSettings, setIntermissionSettings] = useReplicant<IntermissionData>('intermission', { bundle: 'squidwest-layout-controls'});
	const [dashboardIntermissionSettings, setDashboardIntermissionSettings] = useState<IntermissionData>(defaultIntermissionSettings);

	useEffect(() => {
		if(!intermissionSettings) return;

		setDashboardIntermissionSettings(cloneDeep(intermissionSettings));
	}, [intermissionSettings]);

	const saveChanges = useCallback(() => {
		setIntermissionSettings(dashboardIntermissionSettings);
	}, [dashboardIntermissionSettings, setIntermissionSettings]);

	const hasUnsavedChanges = useMemo(() => {
		return !isEqual(intermissionSettings, dashboardIntermissionSettings);
	}, [intermissionSettings, dashboardIntermissionSettings]);

	return (
		<PanelContainer>
			<CollapseContainer title="Omnibar">
				<GridRow>
					<Row $justify='flex-end'>
						<Text>Show Time/Date</Text>
						<Checkbox 
							$checked={dashboardIntermissionSettings.showTime} 
							onClick={() => setDashboardIntermissionSettings((currentSettings) => { return { ...currentSettings, showTime: !currentSettings.showTime }}) } />
					</Row>
					<Row $justify='flex-end'>
						<Text>Show Event Info</Text>
						<Checkbox 
							$checked={dashboardIntermissionSettings.showEvent} 
							onClick={() => setDashboardIntermissionSettings((currentSettings) => { return { ...currentSettings, showEvent: !currentSettings.showEvent }}) } />
					</Row>	
				</GridRow>
				<GridRow>
					<Row $justify='flex-end'>
						<Text>Show Event Location</Text>
						<Checkbox 
							$checked={dashboardIntermissionSettings.showLocation} 
							onClick={() => setDashboardIntermissionSettings((currentSettings) => { return { ...currentSettings, showLocation: !currentSettings.showLocation }}) } />
					</Row>
					<Row $justify='flex-end'>
						<Text>Show Flavor Text</Text>
						<Checkbox 
							$checked={dashboardIntermissionSettings.showFlavorText} 
							onClick={() => setDashboardIntermissionSettings((currentSettings) => { return { ...currentSettings, showFlavorText: !currentSettings.showFlavorText }}) } />
					</Row>
				</GridRow>
				<Row $justify="flex-end">
					<Fieldset $expand>
						<legend><Text>Flavor Text</Text></legend>
						<Input type="text" 
							$expand
							value={dashboardIntermissionSettings.flavorText} 
							onChange={(event) => setDashboardIntermissionSettings((currentSettings) => { return { ...currentSettings, flavorText: event.target.value }}) }/>
					</Fieldset>
				</Row>
			</CollapseContainer>
			<GridRow $height='56px'>
				<div></div>
				<ButtonWide $expand={true} $colorTag={hasUnsavedChanges ? 'dark-red' : 'pink'} onClick={() => { saveChanges(); }}>{hasUnsavedChanges ? 'Save Changes' :  'Saved!'}</ButtonWide>
				<div></div>
			</GridRow>
		</PanelContainer>
	)
}

const PanelContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 5px;
	padding: 5px 10px 12px;
`;

const root = createRoot(document.getElementById('root')!);
root.render(<Intermission />);