import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components'
import { createRoot } from 'react-dom/client';
import { Checkbox, GridRow, ButtonWide, Fieldset, Text, Input, Row } from './components/Layout';
import { useReplicant } from '@nodecg/react-hooks';
import { ObsData } from 'schemas/obsData';
import { useObsConnectionStatus } from '../helpers/hooks'
import { CollapseContainer } from './components/CollapseContainer';
import { cloneDeep, isEqual } from 'lodash';

const defaultObsSettings: ObsData = {
	serverIp: "localhost",
	serverPort: "4455",
	serverPassword: "",
	autoConnect: false
}

const connectingMessage = "Connecting...";

export function OBSSettings() {
	
	const [ obsSettings, setObsSettings ] = useReplicant<ObsData>('obssettings', { 
		bundle: 'squidwest-layout-controls',
		defaultValue: defaultObsSettings
	});

	const [ dashboardObsSettings, setDashboardObsSettings ] = useState<ObsData>(defaultObsSettings);

	const [ statusText, setStatusText ] = useState("");

	const onDisconnect = useCallback(() => {
		setStatusText("OBS was disconnected.");
	}, []);

	const connected = useObsConnectionStatus(nodecg, { onDisconnect: onDisconnect});

	const setObsConnection = useCallback((connect: boolean, settings: ObsData) => {
		if(!settings) return;

		setStatusText(connectingMessage);

		nodecg.sendMessage('setObsConnection', { connect: connect, settings: settings })
			.then(() => {
				//OBS Connection Successful
				setStatusText("");
			}).catch((error: Error) => {

				console.log(error);

				//Simplify some common errors
				if(error.message.includes("ECONNREFUSED")) {
					setStatusText("OBS Connection Failed: Failed to connect. Is OBS open with the WebSocket Server enabled?");
				}
				else if(error.message.includes("ETIMEDOUT")) {
					setStatusText("OBS Connection Failed: Timed out. Double check your information matches what is in OBS!");
				}
				else if(error.message.includes("authentication is required")) {
					setStatusText("OBS Connection Failed: Missing authentication. Check that you've filled out the password field!");
				}
				else if(error.message.includes("Authentication failed.")) {
					setStatusText("OBS Connection Failed: Authentication failed. Verify that your password matches the one in OBS!");
				}
				else if(error.message.includes("socket hang up")) {
					setStatusText("OBS Connection Failed: Socket hang up. Is the port number conflicting?");
				}
				else if(!error.message || error.message === "") {
					setStatusText(`OBS Connection Failed: Unknown Error. Is OBS Open?`);
				}
				else {
					setStatusText(`OBS Connection Failed: ${error.message}`);
				}
				
			})
	}, []);

	useEffect(() => {
		nodecg.readReplicant<ObsData>('obssettings', (obsData) => {
			if(!obsData) return;

			if(!connected && obsData.autoConnect) {
				setObsConnection(true, obsData);
			}
		})
	});

	useEffect(() => {
		if(!obsSettings) return;

		setDashboardObsSettings(cloneDeep(obsSettings));
	}, [obsSettings]);

	const saveChanges = useCallback(() => {
		setObsSettings(dashboardObsSettings);
	}, [dashboardObsSettings, setObsSettings]);

	const hasUnsavedChanges = useMemo(() => {
		return !isEqual(obsSettings, dashboardObsSettings);
	}, [obsSettings, dashboardObsSettings]);

	return (
		<PanelContainer>
			<CollapseContainer title="OBS Configuration">
				<div>
					<p>To use this functionality, go to <strong>OBS</strong>, then <strong>Tools</strong>, then <strong>WebSocket Server Settings</strong>.</p>
					<p>Select <strong>Enable WebSocket Server</strong>, then copy everything in <strong>Show Connect Info</strong> here.</p>
					<p>If OBS is being hosted on this computer, you can instead enter <strong>localhost</strong> for the <strong>Server IP</strong>.</p>
					<p>This tool expects <strong>IPv4 addresses</strong> and will not work with IPv6.</p>
					<p>Once you're done, make sure to click <strong>Apply</strong> in OBS afterwards.</p>
				</div>
				<GridRow $templateColumns='1fr 0.5fr'>
					<Fieldset $expand>
						<legend><Text>Server IP</Text></legend>
						<Input type="text" 
							$expand
							value={dashboardObsSettings.serverIp} 
							onChange={(event) => setDashboardObsSettings((currentSettings) => { return { ...currentSettings, serverIp: event.target.value }}) }/>
					</Fieldset>
					<Fieldset $expand>
						<legend><Text>Server Port</Text></legend>
						<Input type="text" 
							$expand
							value={dashboardObsSettings.serverPort} 
							onChange={(event) => setDashboardObsSettings((currentSettings) => { return { ...currentSettings, serverPort: event.target.value }}) }/>
					</Fieldset>
				</GridRow>
				<Fieldset $expand>
					<legend><Text>Server Password</Text></legend>
					<Input type="password" 
						$expand
						value={dashboardObsSettings.serverPassword} 
						onChange={(event) => setDashboardObsSettings((currentSettings) => { return { ...currentSettings, serverPassword: event.target.value }}) }/>
				</Fieldset>
				<Row>
					<Text>Connect on Launch</Text>
					<Checkbox $checked={dashboardObsSettings.autoConnect} onClick={() => setDashboardObsSettings((currentSettings) => { return { ...currentSettings, autoConnect: !currentSettings.autoConnect }}) } />
				</Row>
			</CollapseContainer>
			<GridRow $height='56px'>
				<ButtonWide $expand={true} $colorTag={hasUnsavedChanges ? 'dark-red' : 'pink'} onClick={() => { saveChanges(); }}>{hasUnsavedChanges ? 'Save Changes' :  'Saved!'}</ButtonWide>
				<ButtonWide 
					$expand={true} 
					disabled={connected} 
					$colorTag='teal' 
					onClick={() => obsSettings && setObsConnection(true, obsSettings)}>{connected ? 'Connected to OBS!' : 'Connect to OBS'}</ButtonWide>
			</GridRow>
			{statusText && (
				<Row $align='flex-end'><Text $colorTag={statusText === connectingMessage ? 'white' : 'red'}>{statusText}</Text></Row>
			)}
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
root.render(<OBSSettings />);