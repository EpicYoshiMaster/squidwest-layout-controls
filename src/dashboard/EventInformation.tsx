import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components'
import { EventData } from 'schemas/eventData';
import { createRoot } from 'react-dom/client';
import { ButtonWide, Fieldset, GridRow, Input, Text } from './components/Layout';
import { useReplicant } from '@nodecg/react-hooks'
import { cloneDeep, isEqual } from 'lodash';
import { CollapseContainer } from './components/CollapseContainer';

const defaultEventData: EventData = {
	currentEvent: {
		name: "Current Event Name",
		location: "Event Location",
		number: 1,
		date: "Today"
	},
	nextEvent: {
		name: "Next Event Name",
		location: "Next Event Location",
		number: 2,
		date: "January 1, 2024"
	}
}

export function EventInformation() {
	const [eventData, setEventData] = useReplicant<EventData>('eventData', { bundle: 'squidwest-layout-controls' });
	const [dashboardEventData, setDashboardEventData] = useState<EventData>(defaultEventData);

	useEffect(() => {
		if(!eventData) return;

		setDashboardEventData(cloneDeep(eventData));
	}, [eventData]);

	const saveChanges = useCallback(() => {
		setEventData(dashboardEventData);
	}, [dashboardEventData, setEventData]);

	const hasUnsavedChanges = useMemo(() => {
		return !isEqual(eventData, dashboardEventData);
	}, [eventData, dashboardEventData]);

	return (
		<PanelContainer>
			<CollapseContainer title="Current Event">
				<GridRow $templateColumns='1fr 0.6fr'>
					<Fieldset $expand>
						<legend><Text>Event Name</Text></legend>
						<Input type="text" 
							$expand
							value={dashboardEventData.currentEvent.name} 
							onChange={(event) => setDashboardEventData((currentData) => { return { ...currentData, currentEvent: { ...currentData.currentEvent, name: event.target.value } }}) }/>
					</Fieldset>
					<Fieldset $expand>
						<legend><Text>Event Number</Text></legend>
						<Input type="text" 
							$expand
							value={dashboardEventData.currentEvent.number} 
							onChange={(event) => setDashboardEventData((currentData) => { return { ...currentData, currentEvent: { ...currentData.currentEvent, number: Number(event.target.value) } }}) }/>
					</Fieldset>
				</GridRow>
				<Fieldset $expand>
					<legend><Text>Event Location</Text></legend>
					<Input type="text" 
						$expand
						value={dashboardEventData.currentEvent.location} 
						onChange={(event) => setDashboardEventData((currentData) => { return { ...currentData, currentEvent: { ...currentData.currentEvent, location: event.target.value } }}) }/>
				</Fieldset>
			</CollapseContainer>
			<CollapseContainer title="Next Event">
				<GridRow $templateColumns='1fr 0.6fr'>
					<Fieldset $expand>
						<legend><Text>Event Name</Text></legend>
						<Input type="text" 
							$expand
							value={dashboardEventData.nextEvent.name} 
							onChange={(event) => setDashboardEventData((currentData) => { return { ...currentData, nextEvent: { ...currentData.nextEvent, name: event.target.value } }}) }/>
					</Fieldset>
					<Fieldset $expand>
						<legend><Text>Event Number</Text></legend>
						<Input type="text" 
							$expand
							value={dashboardEventData.nextEvent.number} 
							onChange={(event) => setDashboardEventData((currentData) => { return { ...currentData, nextEvent: { ...currentData.nextEvent, number: Number(event.target.value) } }}) }/>
					</Fieldset>
				</GridRow>
				<Fieldset $expand>
					<legend><Text>Event Location</Text></legend>
					<Input type="text" 
						$expand
						value={dashboardEventData.nextEvent.location} 
						onChange={(event) => setDashboardEventData((currentData) => { return { ...currentData, nextEvent: { ...currentData.nextEvent, location: event.target.value } }}) }/>
				</Fieldset>
				<Fieldset $expand>
					<legend><Text>Event Date</Text></legend>
					<Input type="text"
						$expand
						value={dashboardEventData.nextEvent.date} 
						onChange={(event) => setDashboardEventData((currentData) => { return { ...currentData, nextEvent: { ...currentData.nextEvent, date: event.target.value } }}) }/>
				</Fieldset>
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
root.render(<EventInformation />);