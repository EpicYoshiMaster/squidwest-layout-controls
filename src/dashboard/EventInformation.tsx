import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { EventData, EventInfo } from 'schemas/eventData';
import { createRoot } from 'react-dom/client';
import { InputButton, InputSection, InputSubheader } from './components/Layout';
import { useReplicant } from '@nodecg/react-hooks'
import { Event } from './components/Event';

export function EventInformation() {
	const [eventData, setEventData] = useReplicant<EventData>('eventData', { bundle: 'squidwest-layout-controls'});

	const [currentEvent, setCurrentEvent] = useState<EventInfo>({ name: "Current Event Name", location: "Event Location", number: 1, date: "Today" });
	const [nextEvent, setNextEvent] = useState<EventInfo>({ name: "Next Event Name", location: "Next Event Location", number: 2, date: "January 1, 2024" });


	useEffect(() => {
		if(!eventData) return;

		setCurrentEvent(eventData.currentEvent);
		setNextEvent(eventData.nextEvent);
	}, [eventData]);
	
	const updateEventData = () => {
		const newEventData: EventData = {
			currentEvent: currentEvent,
			nextEvent: nextEvent
		};

		setEventData(newEventData);
	}

	return (
		<PanelContainer>
			<InputSection>
				<InputSubheader>Current Event</InputSubheader>
				<Event event={currentEvent} setEvent={setCurrentEvent} useDate={false} />
				<InputSubheader>Next Event</InputSubheader>
				<Event event={nextEvent} setEvent={setNextEvent} useDate={true} />
			</InputSection>
			<InputButton onClick={() => { updateEventData(); }}>Save</InputButton>
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
root.render(<EventInformation />);