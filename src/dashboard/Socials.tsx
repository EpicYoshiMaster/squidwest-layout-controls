import React, { useCallback, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components'
import { Socials, SocialsGroup, SocialItem } from 'schemas/socials';
import { createRoot } from 'react-dom/client';
import { useReplicant } from '@nodecg/react-hooks';
import { Platform } from '../types/types';
import { Text, Row, GridRow, Fieldset, ButtonWide, ButtonLarge, Badge } from './components/Layout';
import { useDropzone } from 'react-dropzone';
import { isEqual, cloneDeep } from 'lodash';
import { exportJSON, fileToJSON } from '../helpers/utils';
import { useTimedActive } from '../helpers/hooks';
import { FieldsetItemList } from './components/FieldsetItemList';
import { CollapseContainerItemList } from './components/CollapseContainerItemList';

const DefaultSocialItem: SocialItem = { platform: Platform.Bluesky, social: "" };
const DefaultGroup: SocialsGroup = { name: "New Group", items: [DefaultSocialItem] };

const DefaultSocials: Socials = [{
	name: "SquidWest",
	items: [
		{ platform: Platform.YouTube, social: "@SquidWestLANs" },
		{ platform: Platform.Twitter, social: "@SquidWest" },
		{ platform: Platform.Bluesky, social: "@squidwest.bsky.social" },
		{ platform: Platform.Discord, social: "discord.gg/Acv9qH6" }
	]
}]

const isSocials = (object: unknown): object is Socials => {
	if(!Array.isArray(object)) {
		return false;
	}

	//Technically only validates for presence of name and items but should be fine enough
	if(object.some((value) => { return value.name === undefined || !Array.isArray(value.items); })) {
		return false;
	}

	return true;
}

export function SocialsInformation() {
	const [socials, setSocials] = useReplicant<Socials>('socials', { 
		bundle: 'squidwest-layout-controls',
		defaultValue: DefaultSocials
	});

	const [dashboardSocials, setDashboardSocials] = useState(DefaultSocials);

	const [importError, setImportError] = useState("");
	const [error, startErrorTime] = useTimedActive(5000, () => { setImportError(""); });
	const [confirm, startConfirmTime] = useTimedActive(2000);

	const hasUnsavedChanges = useMemo(() => {
		return !isEqual(socials, dashboardSocials);
	}, [socials, dashboardSocials]);

	useEffect(() => {
		if(!socials) return;
		
		setDashboardSocials(cloneDeep(socials));
	}, [socials]);

	const showImportError = useCallback((error: string) => {
		setImportError(error);

		if(error !== "") {
			startErrorTime();
		}
	}, [startErrorTime]);

	const addGroup = useCallback(() => {
		setDashboardSocials([...dashboardSocials, cloneDeep(DefaultGroup)]);
	}, [dashboardSocials]);

	const deleteGroup = useCallback((groupIndex: number) => {
		setDashboardSocials(dashboardSocials.filter((group, index) => index !== groupIndex));
	}, [dashboardSocials]);
	
	const updateSocials = useCallback(() => {
		setSocials(dashboardSocials);
	}, [setSocials, dashboardSocials]);

	const onImportJSON = useCallback((json: unknown) => {
		if(json && isSocials(json)) {
			setDashboardSocials(json);
			showImportError("");
		}
		else {
			showImportError("The file provided failed to be matched.");
		}
	}, [showImportError]);

	const { getRootProps, getInputProps, open } = useDropzone({ 
		onDrop:  (acceptedFiles: File[]) => { fileToJSON(acceptedFiles, onImportJSON, showImportError); }, 
		accept: { 'application/json': ['.json'] } , 
		noClick: true, noDrag: true, noKeyboard: true, multiple: false 
	});

	const handleExport = useCallback(() => {
		exportJSON(dashboardSocials, 'socials.json');
	}, [dashboardSocials]);

	return (
		<PanelContainer {...getRootProps()}>
			<input {...getInputProps()} />
			<CollapseContainerItemList
				list={dashboardSocials}
				setList={setDashboardSocials}
				renderTitle={(group) => (
					<>
						{group.name}
						{group.items.length > 0 && (<Badge $colorTag='purple'>{group.items.length} Socials</Badge>)}
					</>
				)}
				renderItem={(group, changeGroup, index) => (
					<>
						<Row $align='flex-end' $height='4rem'>
							<Fieldset>
								<legend><Text>Group Name</Text></legend>
								<input type="text" value={group.name} onChange={(event) => { changeGroup({ name: event.target.value }); }} />
							</Fieldset>
							<ButtonLarge $colorTag={ confirm ? 'dark-red' : 'red' } $expand={true} onClick={() => confirm ? deleteGroup(index) : startConfirmTime()}>{ confirm ? 'Confirm?' : 'Delete Group' }</ButtonLarge>
						</Row>
						<FieldsetItemList
							list={group.items}
							setList={(newList) => { changeGroup({ items: newList }); }}
							renderItem={(item, changeItem) => (
							<>
								<select value={item.platform} onChange={(event) => { changeItem({ platform: event.target.value as Platform }); }}>
									{Object.keys(Platform).map((platform, index) => 
										<option key={index} value={platform}>{platform}</option>
									)}
								</select>
								<input type="text" value={item.social} onChange={(event) => { changeItem({ social: event.target.value }); }} />
							</>
							)}
							defaultItem={DefaultSocialItem}
							title="Socials"
							maxHeight={350}
						/>
					</>
				)}
				maxHeight={600}
			/>
			<GridRow $height='3rem'>
				<ButtonWide $expand={true} $colorTag='green' onClick={() => { addGroup(); }}>New Group</ButtonWide>
				<ButtonWide $expand={true} $colorTag={hasUnsavedChanges ? 'dark-red' : 'pink'} onClick={() => { updateSocials(); }}>{hasUnsavedChanges ? 'Save Changes' :  'Saved!'}</ButtonWide>
				<ButtonWide $expand={true} $colorTag='orange' onClick={() => { open(); }}>Import</ButtonWide>
				<ButtonWide $expand={true} $colorTag='blue' onClick={() => { handleExport(); }}>Export</ButtonWide>
			</GridRow>
			{error && (
				<Row $height='1.5rem' $align='flex-end'><Text $colorTag='red'>ERROR: {importError}</Text></Row>
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
root.render(<SocialsInformation />);