import React, { useCallback, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components'
import { Socials, SocialsGroup, SocialItem } from 'schemas/socials';
import { createRoot } from 'react-dom/client';
import { useReplicant } from '@nodecg/react-hooks';
import { Platform } from '../types/types';
import { Text, Row, GridRow, Fieldset, ButtonWide, Badge, Input } from './components/Layout';
import { isEqual, cloneDeep } from 'lodash';
import { useListControl } from '../helpers/hooks';
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSocialsGroup = (object: any): object is SocialsGroup => {
	if(!object) return false;

	return object.name !== undefined 
	&& Array.isArray(object.items);
}

export function SocialsInformation() {
	const [socials, setSocials] = useReplicant<Socials>('socials', { 
		bundle: 'squidwest-layout-controls',
		defaultValue: DefaultSocials
	});

	const [dashboardSocials, setDashboardSocials] = useState(DefaultSocials);

	const { 
		addItem, 
		delete: {
			deleteItem,
			deleteConfirmIndex
		}, 
		importList: { getRootProps, getInputProps, open, importError }, 
		exportList 
	} = useListControl(dashboardSocials, setDashboardSocials, DefaultGroup, isSocialsGroup, 'socials.json');

	const hasUnsavedChanges = useMemo(() => {
		return !isEqual(socials, dashboardSocials);
	}, [socials, dashboardSocials]);

	useEffect(() => {
		if(!socials) return;
		
		setDashboardSocials(cloneDeep(socials));
	}, [socials]);
	
	const updateSocials = useCallback(() => {
		setSocials(dashboardSocials);
	}, [setSocials, dashboardSocials]);

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
							<Fieldset $expand>
								<legend><Text>Group Name</Text></legend>
								<Input $expand type="text" value={group.name} onChange={(event) => { changeGroup({ name: event.target.value }); }} />
							</Fieldset>
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
						<GridRow $height='2rem'>
							<div></div>
							<ButtonWide $colorTag={ deleteConfirmIndex === index ? 'dark-red' : 'red' } onClick={() => deleteItem(index) }>{ deleteConfirmIndex === index ? 'Confirm?' : 'Delete' }</ButtonWide>
							<div></div>
						</GridRow>
					</>
				)}
				maxHeight={600}
			/>
			<GridRow $height='3rem'>
				<ButtonWide $expand={true} $colorTag='green' onClick={() => { addItem(); }}>New Row</ButtonWide>
				<ButtonWide $expand={true} $colorTag={hasUnsavedChanges ? 'dark-red' : 'pink'} onClick={() => { updateSocials(); }}>{hasUnsavedChanges ? 'Save Changes' :  'Saved!'}</ButtonWide>
				<ButtonWide $expand={true} $colorTag='orange' onClick={() => { open(); }}>Import</ButtonWide>
				<ButtonWide $expand={true} $colorTag='blue' onClick={() => { exportList(); }}>Export</ButtonWide>
			</GridRow>
			{importError !== "" && (
				<Row $align='flex-end'><Text $colorTag='red'>ERROR: {importError}</Text></Row>
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