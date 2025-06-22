import React, { useCallback, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components'
import { CreditsData, CreditsRow } from 'schemas/creditsData';
import { createRoot } from 'react-dom/client';
import { Badge, ButtonLarge, ButtonWide, Fieldset, GridRow, Image, Input, Row, Select, Text } from './components/Layout';
import { useReplicant } from '@nodecg/react-hooks';
import { cloneDeep, isEqual } from 'lodash';
import { useListControl } from '../helpers/hooks';
import { getImagePath } from '../helpers/utils';
import { CollapseContainerItemList } from './components/CollapseContainerItemList';
import { FieldsetItemList } from './components/FieldsetItemList';
import { BundleImages } from 'schemas/bundleImages';

const defaultCreditsRow = { name: "Credit Name", image: "", imageBundle: "", items: [] };
const defaultCredits: CreditsData = [{ name: "Credit Name", image: "", imageBundle: "", items: [] }];

const specialCreditsRows = [
	{ name: "YOSHI", colorTag: "green" },
	{ name: "CURRENTEVENT", colorTag: "orange" },
	{ name: "NEXTEVENT", colorTag: "orange" }
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isCreditsRow = (item: any): item is CreditsRow => {
	if(!item) return false;

	return item.name !== undefined 
	&& item.image !== undefined 
	&& Array.isArray(item.items);
}

export function Credits() {
	const [credits, setCredits] = useReplicant<CreditsData>('creditsData', { bundle: 'squidwest-layout-controls', defaultValue: defaultCredits });
	const [bundleImages] = useReplicant<BundleImages>('bundleImages', { defaultValue: { bundles: [], selectedBundle: "", images: [] }});
	const [selectedBundle, setSelectedBundle] = useState("");
	const [dashboardCredits, setDashboardCredits] = useState(defaultCredits);

	useEffect(() => {
		if(!bundleImages) return;

		setSelectedBundle(bundleImages.selectedBundle);
	}, [bundleImages]);

	useEffect(() => {
		if(!credits) return;

		setDashboardCredits(cloneDeep(credits));
	}, [credits]);

	const { 
		addItem, 
		delete: {
			deleteItem,
			deleteConfirmIndex
		}, 
		importList: { getRootProps, getInputProps, open, importError }, 
		exportList 
	} = useListControl(dashboardCredits, setDashboardCredits, defaultCreditsRow, isCreditsRow, 'credits.json');

	const hasUnsavedChanges = useMemo(() => {
		return !isEqual(credits, dashboardCredits);
	}, [credits, dashboardCredits]);

	const updateSelectedBundle = useCallback((value: string) => {
		setSelectedBundle(value);
		nodecg.sendMessage('updateBundleImages', { ...bundleImages, selectedBundle: value });
	}, [bundleImages]);

	/*const onCommsCredits = useCallback(( value: string[] ) => {
		if(!value) return;

		let newCommentaryTeam = commentaryTeam.slice();

		value.forEach((name) => {
			const trimmed = name.trim();

			if(name === "") return;

			if(!newCommentaryTeam.includes(trimmed)) {
				newCommentaryTeam.push(trimmed);
			}
		})

		setCommentaryTeam(newCommentaryTeam);
	}, [commentaryTeam, setCommentaryTeam]);*/

	/*useEffect(() => {
		nodecg.listenFor('commsCredits', onCommsCredits)

		return () => {
			nodecg.unlisten('commsCredits', onCommsCredits);
		}
	}, [onCommsCredits]);*/

	const updateCredits = useCallback(() => {
		setCredits(dashboardCredits);
	}, [setCredits, dashboardCredits]);

	return (
		<PanelContainer {...getRootProps()}>
			<input {...getInputProps()} />
			<Row $expand $height='4rem' $justify='center' $align='center'>
				<Fieldset>
					<legend><Text>Selected Bundle for Images</Text></legend>
					<Select $width="300px" value={selectedBundle} onChange={(event) => { updateSelectedBundle(event.target.value); }}>
						{bundleImages && bundleImages.bundles.map((bundle, index) => (
							<option key={index} value={bundle}>{bundle}</option>
						))}
					</Select>
				</Fieldset>
			</Row>
			<CollapseContainerItemList
				maxHeight={600}
				list={dashboardCredits}
				setList={setDashboardCredits}
				getColorTag={(creditsRow) => { 
					const specialRow = specialCreditsRows.find((value) => value.name === creditsRow.name);

					return specialRow ? specialRow.colorTag : undefined; } }
				renderTitle={(creditsRow, colorTag) => (
					<>
						{creditsRow.name}
						{(creditsRow.items.length > 0 || colorTag) && (
							<Badge $colorTag='purple'>{colorTag ? `Special Row` : `${creditsRow.items.length} Entries` }</Badge>
						)}
					</>
				)}
				renderItem={(creditsRow, changeRow, index, colorTag) => (
					<>
						<Row $align='flex-end' $height='4rem'>
							<Fieldset>
								<legend><Text>Credit Name</Text></legend>
								<input type="text" value={creditsRow.name} onChange={(event) => { changeRow({ name: event.target.value }); }} />
							</Fieldset>
							<ButtonLarge 
								$colorTag={ deleteConfirmIndex === index ? 'dark-red' : 'red' } 
								$expand={true} 
								onClick={() => deleteItem(index) }>
								{ deleteConfirmIndex === index ? 'Confirm?' : 'Delete Row' }
							</ButtonLarge>
						</Row>
						{!colorTag && (
						<>
							<Row>
								<Fieldset $height="100px" $expand={true}>
									<legend><Text>Image</Text></legend>
									<Row $height='100%' $expand>
										<Select 
											$width={creditsRow.image !== "" ? `275px` : `100%`} 
											value={creditsRow.image} 
											onChange={(event) => { changeRow({ image: event.target.value, imageBundle: event.target.value !== "" ? selectedBundle : "" }); } }>
											<optgroup label={`Selected (${creditsRow.imageBundle !== "" ? creditsRow.imageBundle : "N/A"})`}>
												<option value={creditsRow.image}>{creditsRow.image !== "" ? creditsRow.image : "None"}</option>
											</optgroup>
											<optgroup label={selectedBundle}>
												<option value="">None</option>
												{bundleImages && bundleImages.images.map((imagePath, index) => (
													<option key={index} value={imagePath}>{imagePath}</option>
												))}
											</optgroup>
										</Select>
										{creditsRow.image !== "" && creditsRow.imageBundle !== "" && ( <Image $maxWidth='75px' height={75} src={getImagePath(creditsRow.imageBundle, creditsRow.image)} /> )}
									</Row>
								</Fieldset>
							</Row>
							<FieldsetItemList
								list={creditsRow.items}
								setList={(newList) => { changeRow({ items: newList }); }}
								renderItem={(item, changeItem) => (
								<>
									<Input $expand type="text" value={item} onChange={(event) => { changeItem(event.target.value); }} />
								</>
								)}
								defaultItem={""}
								title="Entries"
								maxHeight={350}
							/>
						</>
						)}
						
					</>
				)}
			/>
			<GridRow $height='3rem'>
				<ButtonWide $expand={true} $colorTag='green' onClick={() => { addItem(); }}>New Row</ButtonWide>
				<ButtonWide $expand={true} $colorTag={hasUnsavedChanges ? 'dark-red' : 'pink'} onClick={() => { updateCredits(); }}>{hasUnsavedChanges ? 'Save Changes' :  'Saved!'}</ButtonWide>
				<ButtonWide $expand={true} $colorTag='orange' onClick={() => { open(); }}>Import</ButtonWide>
				<ButtonWide $expand={true} $colorTag='blue' onClick={() => { exportList(); }}>Export</ButtonWide>
			</GridRow>
			{importError !== "" && (
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
root.render(<Credits />);