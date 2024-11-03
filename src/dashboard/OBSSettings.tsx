import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components'
import NodeCG from '@nodecg/types';
import { createRoot } from 'react-dom/client';
import { InputCheckbox, InputSubheader, InputRow, InputLabel, InputSection, InputText, InputButton, ErrorText } from './components/Layout';
import { useReplicant } from '@nodecg/react-hooks';
import { ObsData } from 'schemas';
import { useObsConnectionStatus } from '../helpers/hooks'

export function OBSSettings() {
	
	const [ obsSettings, SetObsSettings ] = useReplicant<ObsData>('obssettings', { 
		bundle: 'squidwest-layout-controls',
		defaultValue: { serverIp: "", serverPort: "", autoConnect: false}
	});

	const [ serverIp, setServerIp ] = useState("");
	const [ serverPort, setServerPort ] = useState("");
	const [ serverPassword, setServerPassword ] = useState("");
	const [ autoConnect, setAutoConnect ] = useState(false);

	const [ statusText, setStatusText ] = useState("");

	const onDisconnect = useCallback(() => {
		setStatusText("OBS was disconnected.");
	}, []);

	const connected = useObsConnectionStatus(nodecg, { onDisconnect: onDisconnect});
	

	const setObsConnection = useCallback((connect: boolean, settings: ObsData) => {
		if(!settings) return;

		setStatusText("Connecting...");

		nodecg.sendMessage('setObsConnection', { connect: connect, settings: settings })
			.then(() => {
				setStatusText("OBS Connection Successful!");
			}).catch((error: Error) => {

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
				else {
					setStatusText(`${error.message}`);
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
	}, []);

	useEffect(() => {
		if(!obsSettings) return;

		setServerIp(obsSettings.serverIp);
		setServerPort(obsSettings.serverPort);

		if(obsSettings.serverPassword) {
			setServerPassword(obsSettings.serverPassword);
		}
		
		setAutoConnect(obsSettings.autoConnect);
	}, [obsSettings]);

	const updateObsSettings = useCallback(() => {
		let newObsSettings: ObsData = {
			serverIp: serverIp,
			serverPort: serverPort,
			serverPassword: serverPassword,
			autoConnect: autoConnect
		};

		SetObsSettings(newObsSettings);
	}, [serverIp, serverPort, serverPassword, autoConnect]);

	return (
		<PanelContainer>
			<InputSection>
				<InputSubheader>OBS Configuration</InputSubheader>
				<InputText>
					To use this functionality, go to <strong>OBS</strong>, then <strong>Tools</strong>, then <strong>WebSocket Server Settings</strong>.
					Select <strong>Enable WebSocket Server</strong>, then copy everything in <strong>Show Connect Info</strong> here.
					Make sure to click <strong>Apply</strong> in OBS afterwards.
				</InputText>
				<InputRow>
					<InputLabel>Server IP</InputLabel>
					<input type="text" value={serverIp} onChange={(event) => { setServerIp(event.target.value); }} />
				</InputRow>
				<InputRow>
					<InputLabel>Server Port</InputLabel>
					<input type="text" value={serverPort} onChange={(event) => { setServerPort(event.target.value); }} />
				</InputRow>
				<InputRow>
					<InputLabel>Server Password</InputLabel>
					<input type="password" value={serverPassword} onChange={(event) => { setServerPassword(event.target.value); }} />
				</InputRow>
				<InputRow>
					<InputLabel>Connect on Launch</InputLabel>
					<InputCheckbox $checked={autoConnect} onClick={() => setAutoConnect(!autoConnect) } />
				</InputRow>
			</InputSection>
			<InputButton onClick={() => { updateObsSettings(); }}>Save</InputButton>
			<InputSection>
				<InputSubheader>OBS Connection</InputSubheader>
			</InputSection>
			{statusText && (
				<ErrorText>{statusText}</ErrorText>
			)}
			<InputButton disabled={connected} onClick={() => { obsSettings && setObsConnection(true, obsSettings); }}>{connected ? 'Connected' : 'Connect'}</InputButton>
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
root.render(<OBSSettings />);