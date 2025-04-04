import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components'
import NodeCG from '@nodecg/types';
import { Socials, SocialsGroup, SocialItem } from 'schemas/socials';
import { createRoot } from 'react-dom/client';
import { useReplicant } from '@nodecg/react-hooks';
import { Platform } from '../types/types';
import { CollapseContainer } from './components/NewCollapseContainer';
import { X, Plus, CaretUp, CaretDown } from '@phosphor-icons/react';
import { TransparentButtonSmall } from './components/Layout';
import { useDropzone } from 'react-dropzone';

//New Socials:
//Socials Groups
//Select specific platforms to be fully customizable
//Social Group Name
//Array of { Platform, Social }

//Collapsible:
//When collapsed, show just the group name
//When uncollapsed, show input for group name, all items (select + input + X), a button to update, a button to delete.
//Button to add a new social

//Below everything, show a button to add a new group

//Panel things:
//Add New Social Group
//X Delete Buttons
//Import & Export

//A generic collapse container list component.

//A generic fieldset container list component??
//move items, delete items, add items, change items are all options
//Pass a template as a variable for the item entry.
//Each template entry returns a partial object containing its changes to the overall item
//ex. { platform: Platform, social: string }, onClick might return { social: string }
//use { ...socialItem, ...partialObject } to apply

//Next steps:
// - Make confirm buttons
// - Contextual Save button
// - color tags for other elements (text, badges)

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

const isSocials = (object: any): object is Socials => {
	if(!Array.isArray(object)) {
		return false;
	}

	//Technically only validates for presence of name and items but should be fine enough
	if(object.some((value) => { return value.name !== undefined && !Array.isArray(value.items); })) {
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

	//useEffect(() => {
	//	if(!socials) return;
	//	
	//	setDashboardSocials(socials);
	//}, [socials]);	

	const addGroup = useCallback(() => {
		setDashboardSocials([...dashboardSocials, structuredClone(DefaultGroup)]);
	}, [dashboardSocials]);

	const changeGroup = useCallback((socialGroup: SocialsGroup, index: number) => {
		const newSocials = dashboardSocials.slice();
		newSocials.splice(index, 1, socialGroup)

		setDashboardSocials(newSocials)
	}, [dashboardSocials]);

	const deleteGroup = useCallback((groupIndex: number) => {
		setDashboardSocials(dashboardSocials.filter((group, index) => index !== groupIndex));
	}, [dashboardSocials]);

	const moveGroup = useCallback((groupIndex: number, moveForward: boolean) => {
		if((groupIndex <= 0 && !moveForward) || (groupIndex >= dashboardSocials.length - 1 && moveForward)) return;

		//groupIndex is 3, moveForward is true
		//we want to swap 3 and 4
		//4 should be first, 3 should be second
		//4 should be placed at index 3

		//groupIndex is 3, moveForward is false
		//we want to swap 2 and 3
		//3 should be first, 2 should be second
		//3 should be placed at index 2

		const firstGroup = dashboardSocials[moveForward ? groupIndex + 1 : groupIndex];
		const secondGroup = dashboardSocials[moveForward ? groupIndex : groupIndex - 1];

		const newSocials = dashboardSocials.slice();

		newSocials.splice(moveForward ? groupIndex : groupIndex - 1, 2, firstGroup, secondGroup);

		setDashboardSocials(newSocials);
	}, [dashboardSocials]);

	const moveSocial = useCallback((socialGroup: SocialsGroup, groupIndex: number, itemIndex: number, moveForward: boolean) => {
		if((itemIndex <= 0 && !moveForward) || (itemIndex >= socialGroup.items.length - 1 && moveForward)) return;

		const firstItem = socialGroup.items[moveForward ? itemIndex + 1 : itemIndex];
		const secondItem = socialGroup.items[moveForward ? itemIndex : itemIndex - 1];

		socialGroup.items.splice(moveForward ? itemIndex : itemIndex - 1, 2, firstItem, secondItem);

		changeGroup(socialGroup, groupIndex);
	}, [changeGroup]);

	const addDashboardSocial = useCallback((socialGroup: SocialsGroup, groupIndex: number) => {
		socialGroup.items.push(structuredClone(DefaultSocialItem));

		changeGroup(socialGroup, groupIndex);
	}, [changeGroup]);

	const changeDashboardSocial = useCallback((socialGroup: SocialsGroup, socialItem: SocialItem, groupIndex: number, itemIndex: number) => {
		socialGroup.items.splice(itemIndex, 1, socialItem);

		changeGroup(socialGroup, groupIndex);
	}, [changeGroup]);

	const deleteDashboardSocial = useCallback((socialGroup: SocialsGroup, groupIndex: number, itemIndex: number) => {
		socialGroup.items = socialGroup.items.filter((item, index) => index !== itemIndex)

		changeGroup(socialGroup, groupIndex);
	}, [changeGroup]);
	
	const updateSocials = useCallback(() => {
		setSocials(dashboardSocials);
	}, [dashboardSocials]);

	
	const handleImport = useCallback((acceptedFiles: File[]) => {
		if(acceptedFiles.length > 1)
		{
			setImportError("Only one file can be imported at a time.");
			return;
		}

		if(acceptedFiles.length == 0)
		{
			setImportError("An unknown issue occurred while trying to load the file. (No files were accepted?)");
			return;
		}

		const [ file ] = acceptedFiles;

		if(!file.name.endsWith('.json'))
		{
			setImportError("File must end in .json");
			return;
		}



		const reader = new FileReader();

		reader.onabort = () => {
			setImportError("The file read process was aborted.");
		}

		reader.onerror = () => {
			setImportError("An unknown issue occurred while trying to read the file. The file may be corrupted.");
		}

		file.text().then((value: string) => {
			try {
				const importedJSON = JSON.parse(value);

				if(importedJSON && isSocials(importedJSON))
				{
					setDashboardSocials(importedJSON);
					setImportError("");
				}
				else
				{
					setImportError("The file provided failed to be matched.");
				}
			} catch (error) {
				setImportError(`The file could not be read: ${error}.`);
			}
		});

	}, []);

	const { getRootProps, getInputProps, open } = useDropzone({ onDrop: handleImport, accept: { 'application/json': ['.json'] } , noClick: true, noDrag: true, noKeyboard: true, multiple: false });

	const handleExport = useCallback(() => {
		const a = document.createElement('a');

		a.href = URL.createObjectURL(new Blob([JSON.stringify(dashboardSocials, null, 2)], { type: 'text/plain' }));

		a.setAttribute('download', 'socials.json');

		document.body.appendChild(a);

		a.click();

		document.body.removeChild(a);
	}, [dashboardSocials]);

	return (
		<PanelContainer {...getRootProps()}>
			<input {...getInputProps()} />
			{dashboardSocials.map((socialGroup, groupIndex, groupArray) => (
				<CollapseContainer title={(
					<>
						<Column>
							<ButtonTiny $colorTag='blue' $border={true} disabled={groupIndex <= 0} onClick={() => { moveGroup(groupIndex, false); }}><CaretUp weight='bold' /></ButtonTiny>
							<ButtonTiny $colorTag='red' $border={true} disabled={groupIndex >= groupArray.length - 1} onClick={() => { moveGroup(groupIndex, true); }}><CaretDown weight='bold' /></ButtonTiny>
						</Column>
						{socialGroup.name}
						{socialGroup.items.length > 0 && (<Badge>{socialGroup.items.length} Socials</Badge>)}
					</>
				)} key={groupIndex}>
					<Row $align='flex-end' $height='4rem'>
						<Fieldset>
							<legend><InputLabel>Group Name</InputLabel></legend>
							<NewInput type="text" value={socialGroup.name} onChange={(event) => { changeGroup({ ...socialGroup, name: event.target.value }, groupIndex); }} />
						</Fieldset>
						<ButtonLarge $colorTag='red' $expand={true} onClick={() => { deleteGroup(groupIndex); }}>Delete Group</ButtonLarge>
					</Row>
					<Fieldset $maxHeight={350}>
						<legend>
							<Row>
								<InputLabel>Socials</InputLabel>
								<ButtonFieldset $colorTag='green' onClick={() => { addDashboardSocial(socialGroup, groupIndex); }}>
									<Plus weight="bold" />
								</ButtonFieldset>
							</Row>
						</legend>
						{socialGroup.items.length <= 0 && (
							<Row $justify='center'>
								<InputLabel>Empty! Click the + to add items here.</InputLabel>
							</Row>
						)}
						{socialGroup.items.map((socialItem, itemIndex, itemArray) => (
						<Row key={itemIndex}>
							<Column>
								<ButtonTiny $colorTag='blue' $border={true} disabled={itemIndex <= 0} onClick={() => { moveSocial(socialGroup, groupIndex, itemIndex, false); }}><CaretUp /></ButtonTiny>
								<ButtonTiny $colorTag='red' $border={true} disabled={itemIndex >= itemArray.length - 1} onClick={() => { moveSocial(socialGroup, groupIndex, itemIndex, true); }}><CaretDown /></ButtonTiny>
							</Column>
							<Select value={socialItem.platform} onChange={(event) => { changeDashboardSocial(socialGroup, { ...socialItem, platform: event.target.value as Platform }, groupIndex, itemIndex);}}>
								{Object.keys(Platform).map((platform, index) => 
									<option key={index} value={platform}>{platform}</option>
								)}
							</Select>
							<NewInput type="text" value={socialItem.social} onChange={(event) => { changeDashboardSocial(socialGroup, { ...socialItem, social: event.target.value }, groupIndex, itemIndex);  }} />
							<ButtonSmall $colorTag='red' onClick={() => { deleteDashboardSocial(socialGroup, groupIndex, itemIndex); }}>
								<X weight="bold" />
							</ButtonSmall>
						</Row>
						))
						}
					</Fieldset>
				</CollapseContainer>
			))}
			<GridRow $height='3rem'>
				<ButtonWide $expand={true} $colorTag='green' onClick={() => { addGroup(); }}>New Group</ButtonWide>
				<ButtonWide $expand={true} $colorTag='pink' onClick={() => { updateSocials(); }}>Save</ButtonWide>
				<ButtonWide $expand={true} $colorTag='orange' onClick={() => { open(); }}>Import</ButtonWide>
				<ButtonWide $expand={true} $colorTag='blue' onClick={() => { handleExport(); }}>Export</ButtonWide>
			</GridRow>
			{importError !== "" && (
				<Row><InputLabel>ERROR: {importError}</InputLabel></Row>
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

const Row = styled.div<{ $align?: string, $justify?: string, $height?: string }>`
	position: relative;
	margin: 2px 0;
	display: flex;
	flex-direction: row;
	align-items: ${({ $align }) => $align ? $align : 'center'};
	justify-content: ${({ $justify }) => $justify ? $justify : 'flex-start'};
	gap: 5px;
	height: ${({ $height }) => $height ? $height : 'auto'};

	& input, textarea, select {
		height: 2.25rem;
		font-size: 1rem;
	}

	& input {
		flex-grow: 1;
	}
`;

const GridRow = styled.div<{ $height?: string }>`
	position: relative;
	margin: 2px 0;
	display: grid;
	width: 100%;
	gap: 5px;
	height: ${({ $height }) => $height ? $height : 'auto'};
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
`;

const Column = styled.div`
	position: relative;
	display: flex;	
	flex-direction: column;
	justify-content: center;
	gap: 3px;
`;

const Fieldset = styled.fieldset<{ $maxHeight?: number }>`
	position: relative;
	padding: 5px 5px;	
	margin: 0;
	border-radius: 0.5rem;
	border: 2px solid white;

	${({ $maxHeight }) => $maxHeight ? 
	css`
	overflow: auto;
	max-height: ${$maxHeight}px;
	` : css``}
`;

const Badge = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2px 4px;

	font-size: 1rem;
	border-radius: 0.5rem;
	background-color: #ae67dd;
`;

const NewInput = styled.input`
`;

const InputLabel = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	font-weight: 700;
`;

const ButtonSmall = styled.button<{ $colorTag?: string, $expand?: boolean, $border?: boolean }>`
	position: relative;
	padding: 6px 6px;
	font-size: 1.1rem;
	font-weight: bold;
	
	border-radius: 0.25rem;
	margin: 0;
	color: var(--text);
	background-color: var(--${({ $colorTag }) => $colorTag ? `${$colorTag}` : `button`});
	border: ${({ $border, $colorTag }) => $border ? ($colorTag ? `2px solid var(--${$colorTag}-border)` : `2px solid var(--button-border)`) : `none`};

	height: ${({ $expand }) => $expand ? '100%' : 'auto'};
	width: ${({ $expand }) => $expand ? '100%' : 'auto'};

	display: flex;
	justify-content: center;
	align-items: center;

	&:not(:disabled):hover {
		background-color: var(--${({ $colorTag }) => $colorTag ? `${$colorTag}` : `button`}-hover);
	}

	&:not(:disabled):active {
		background-color: var(--${({ $colorTag }) => $colorTag ? `${$colorTag}` : `button`}-active);
	}

	&:disabled {
		opacity: 0.5;
	}
`;

const ButtonWide = styled(ButtonSmall)`
	padding: 6px 15px;
	border-width: 3px;
`;

const ButtonLarge = styled(ButtonSmall)`
	padding: 6px 10px;
	border-width: 3px;
	font-size: 1.3rem;
`;

const ButtonFieldset = styled(ButtonSmall)`
	padding: 3px;	
	font-size: 1.1rem;
`;

const ButtonTiny = styled(ButtonSmall)`
	padding: 0;
	font-size: 1.25rem;
`;

const Select = styled.select`
`;

const InputButton = styled.button`
	margin: 10px;
	padding: 5px 25px;
	font-size: 1.5rem;
	font-weight: bold;
	border: none;
	border-radius: 0.5rem;
	color: #ffffff;
	background-color: #d346fe; //#9746fe

	&:not(:disabled):hover {
		background-color: #5f2573;
	}

	&:not(:disabled):active {
		background-color: #4c1d5c;
	}

	&:disabled {
		opacity: 0.5;
	}
`;

const root = createRoot(document.getElementById('root')!);
root.render(<SocialsInformation />);