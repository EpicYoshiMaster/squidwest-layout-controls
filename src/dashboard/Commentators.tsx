
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components'
import { CommentatorData } from 'schemas/commentatorData';
import { createRoot } from 'react-dom/client';
import { Badge, ButtonWide, Fieldset, GridRow, Input, InputCheckbox, Row, Text } from './components/Layout';
import { useReplicant } from '@nodecg/react-hooks'
import { CollapseContainer } from './components/CollapseContainer';
import { CommentatorList, Commentator } from 'schemas/commentatorList';
import { cloneDeep, isEqual } from 'lodash';
import { useListControl } from '../helpers/hooks';
import { CollapseContainerItemList } from './components/CollapseContainerItemList';

const defaultCommentator: Commentator = { name: "Commentator Name", pronouns: "any/all", tag: "@TagName" }
const defaultCommentatorData: CommentatorData = {
	autoShow: true,
	delay: 3000,
	autoHide: true,
	lifetime: 10000
}

const maxCommentators = 3;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isCommentator = (item: any): item is Commentator => {
	if(!item) return false;

	return item.name !== undefined 
	&& item.pronouns !== undefined 
	&& item.tag !== undefined;
}

export function Commentators() {

	//const [commentatorDatabase, setCommentatorDatabase] = useReplicant<CommentatorList>('commentatorDatabase', { defaultValue: [] });
	const [commentatorList, setCommentatorList] = useReplicant<CommentatorList>('commentatorList', { defaultValue: [] });

	const [settings, setSettings] = useReplicant<CommentatorData>('commentatorSettings', { defaultValue: defaultCommentatorData });

	const [dashboardCommentatorList, setDashboardCommentatorList] = useState<CommentatorList>([]);
	const [dashboardSettings, setDashboardSettings] = useState<CommentatorData>(defaultCommentatorData);

	useEffect(() => {
		if(!settings) return;

		setDashboardSettings(cloneDeep(settings));
	}, [settings]);

	useEffect(() => {
		if(!commentatorList) return;

		setDashboardCommentatorList(cloneDeep(commentatorList));
	}, [commentatorList]);

	const { 
		addItem, 
		delete: {
			deleteItem,
			deleteConfirmIndex
		}
	} = useListControl(dashboardCommentatorList, setDashboardCommentatorList, defaultCommentator, isCommentator);
	
	const saveChanges = useCallback(() => {
		setCommentatorList(dashboardCommentatorList);
		setSettings(dashboardSettings);
	}, [dashboardCommentatorList, dashboardSettings, setCommentatorList, setSettings]);

	const hasUnsavedChanges = useMemo(() => {
		return !isEqual(commentatorList, dashboardCommentatorList) || !isEqual(settings, dashboardSettings);
	}, [commentatorList, dashboardCommentatorList, settings, dashboardSettings]);

	const addToCredits = useCallback(() => {
		nodecg.sendMessage('commsCredits', dashboardCommentatorList);
	}, [dashboardCommentatorList]);

	const showCommentators = useCallback(() => {
		nodecg.sendMessage('commsControl', true);
	}, []);

	const hideCommentators = useCallback(() => {
		nodecg.sendMessage('commsControl', false);
	}, []);

	return (
		<PanelContainer>
			<CollapseContainer title="Configuration">
				<Row $height='4.5rem'>
					<Text>Show Automatically</Text>
					<InputCheckbox 
						$checked={dashboardSettings.autoShow} 
						onClick={() => setDashboardSettings((currentSettings) => { return { ...currentSettings, autoShow: !currentSettings.autoShow }; }) } />
					<Fieldset>
						<legend><Text>Show Delay Time (ms)</Text></legend>
						<input type="number" 
							value={dashboardSettings.delay} 
							onChange={(event) => { setDashboardSettings((currentSettings) => { return { ...currentSettings, delay: Number(event.target.value) }; })  }}/>
					</Fieldset>
				</Row>
				<Row $height='4.5rem'>
					<Text>Hide Automatically</Text>
					<InputCheckbox 
						$checked={dashboardSettings.autoHide} 
						onClick={() => setDashboardSettings((currentSettings) => { return { ...currentSettings, autoHide: !currentSettings.autoHide }; }) } />
					<Fieldset>
						<legend><Text>Lifetime (ms)</Text></legend>
						<input type="number" 
							value={dashboardSettings.lifetime} 
							onChange={(event) => { setDashboardSettings((currentSettings) => { return { ...currentSettings, lifetime: Number(event.target.value) }; }) }}/>
					</Fieldset>
				</Row>
			</CollapseContainer>
			<CollapseContainerItemList
				maxHeight={500}
				list={dashboardCommentatorList}
				setList={setDashboardCommentatorList}
				renderTitle={(commentator) => (
					<>
						{commentator.name}
						{commentator.pronouns !== "" && (
							<Badge $colorTag='teal'>{commentator.pronouns}</Badge>
						)}
					</>
				)}
				renderItem={(commentator, changeCommentator, index) => (
					<>
						<Row $expand>
							<Fieldset $expand>
								<legend><Text>Name</Text></legend>
								<Input $expand type="text" value={commentator.name} onChange={(event) => { changeCommentator({ name: event.target.value }); }} />
							</Fieldset>
						</Row>
						<Row $expand>
							<Fieldset $expand>
								<legend><Text>Pronouns</Text></legend>
								<Input $expand type="text" value={commentator.pronouns} onChange={(event) => { changeCommentator({ pronouns: event.target.value }); }} />
							</Fieldset>
						</Row>
						<Row $expand>
							<Fieldset $expand>
								<legend><Text>Tag</Text></legend>
								<Input $expand type="text" value={commentator.tag} onChange={(event) => { changeCommentator({ tag: event.target.value }); }} />
							</Fieldset>
						</Row>
						<GridRow $height='2rem'>
							<div></div>
							<ButtonWide $colorTag={ deleteConfirmIndex === index ? 'dark-red' : 'red' } onClick={() => deleteItem(index) }>{ deleteConfirmIndex === index ? 'Confirm?' : 'Delete' }</ButtonWide>
							<div></div>
						</GridRow>
					</>
				)}
			/>
			<GridRow $height='3rem'>
				<ButtonWide $expand={true} disabled={dashboardCommentatorList.length >= maxCommentators} $colorTag='green' onClick={() => { addItem(); }}>New Row</ButtonWide>
				<ButtonWide $expand={true} $colorTag={hasUnsavedChanges ? 'dark-red' : 'pink'} onClick={() => { saveChanges(); }}>{hasUnsavedChanges ? 'Save Changes' :  'Saved!'}</ButtonWide>
				<ButtonWide $expand={true} $colorTag='teal' onClick={() => { addToCredits(); }}>Add to Credits</ButtonWide>
			</GridRow>
			<Text>Manual Controls</Text>
			<GridRow $height='3rem'>	
				<ButtonWide $expand={true} $colorTag='purple' onClick={() => { showCommentators(); }}>Show Comms</ButtonWide>
				<ButtonWide $expand={true} $colorTag='purple' onClick={() => { hideCommentators(); }}>Hide Comms</ButtonWide>
			</GridRow>
		</PanelContainer>
	)
}

const PanelContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 5px;
	padding: 5px 10px 12px;
`;

const root = createRoot(document.getElementById('root')!);
root.render(<React.StrictMode><Commentators /></React.StrictMode>);