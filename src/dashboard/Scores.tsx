
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components'
import { MatchData } from 'schemas/matchData';
import { createRoot } from 'react-dom/client';
import { InputCheckbox, GridRow, ButtonWide, Text, Row, Input, Fieldset } from './components/Layout';
import { useReplicant } from '@nodecg/react-hooks'
import { CaretLeft, CaretRight, Swap } from '@phosphor-icons/react';
import { modulo, getIndexColor, clamp } from '../helpers/utils';
import Colors from '../data/colors.json'
import { cloneDeep, isEqual } from 'lodash';

const MIN_SCORE = 0;
const MAX_SCORE = 9;

const defaultMatchData: MatchData = {
	matchInfo: "Round 1",
	teamA: "Team A",
	teamB: "Team B",
	scoreA: 0,
	scoreB: 0,
	matchColor: Colors.localMode[0],
	swapColor: false
}

export function Scores() {
	const [match, setMatch] = useReplicant<MatchData>('match', { 
		bundle: 'squidwest-layout-controls',
		defaultValue: defaultMatchData
	});

	const [dashboardMatch, setDashboardMatch] = useState<MatchData>(defaultMatchData);
	const [colorIndex, setColorIndex] = useState<number>(0);
	const [colorLock, setColorLock] = useState<boolean>(false);
	const [onlineMode, setOnlineMode] = useState<boolean>(false);

	const colorList = useMemo(() => {
		return colorLock ? Colors.colorLock : (onlineMode ? Colors.onlineMode : Colors.localMode);
	}, [colorLock, onlineMode]);

	useEffect(() => {
		if(!match) return;

		setDashboardMatch(cloneDeep(match));
	}, [match]);

	const saveChanges = useCallback(() => {
		setMatch(dashboardMatch);
	}, [dashboardMatch, setMatch]);

	const hasUnsavedChanges = useMemo(() => {
		return !isEqual(match, dashboardMatch);
	}, [match, dashboardMatch]);

	const showScores = useCallback(() => {
		nodecg.sendMessage('scoresControl', true);
	}, []);

	const hideScores = useCallback(() => {
		nodecg.sendMessage('scoresControl', false);
	}, []);
	
	const showCommentators = useCallback(() => {
		nodecg.sendMessage('commsControl', true);
	}, []);

	const hideCommentators = useCallback(() => {
		nodecg.sendMessage('commsControl', false);
	}, []);

	const updateColorIndex = useCallback((index: number) => {
		setColorIndex(modulo(index, colorList.length));
	}, [colorList.length]);

	useEffect(() => {
		setDashboardMatch((currentMatch) => { return { ...currentMatch, matchColor: colorList[colorIndex]}});
	}, [colorList, colorIndex]);

	return (
		<PanelContainer>
			<TeamScoreRow>
				<PanelColumn>
					<Fieldset $expand>
						<legend><Text>Round Info (opt.)</Text></legend>
						<Input type="text" 
							$expand
							value={dashboardMatch.matchInfo} 
							onChange={(event) => { setDashboardMatch((currentMatch) => { return { ...currentMatch, matchInfo: event.target.value }})}}/>
					</Fieldset>
					<Fieldset $expand>
						<legend><Text>
							<Row>
								<ColorDisplay $size={20} $color={getIndexColor(colorIndex, colorList, dashboardMatch.swapColor)} />
								Team A
							</Row>
						</Text></legend>
						<Input $expand $height='2.5rem' type="text" value={dashboardMatch.teamA} onChange={(event) => { setDashboardMatch((currentMatch) => { return { ...currentMatch, teamA: event.target.value }}) }} />
					</Fieldset>
					<Fieldset $expand>
						<legend><Text>
							<Row>
								<ColorDisplay $size={20} $color={getIndexColor(colorIndex, colorList, !dashboardMatch.swapColor)} /> 
								Team B
							</Row>
						</Text></legend>
						<Input $expand $height='2.5rem' type="text" value={dashboardMatch.teamB} onChange={(event) => { setDashboardMatch((currentMatch) => { return { ...currentMatch, teamB: event.target.value }}) }} />
					</Fieldset>
				</PanelColumn>
				<ScoreColumn>
					<PanelRow>
						<ScoreButton $colorTag='red' 
							onClick={() => { setDashboardMatch((currentMatch) => { return { ...currentMatch, scoreA: clamp(currentMatch.scoreA - 1, MIN_SCORE, MAX_SCORE)}}) }}>-</ScoreButton>
						<BigNumbers>
							{dashboardMatch.scoreA}
						</BigNumbers>
						<ScoreButton $colorTag='green' 
							onClick={() => { setDashboardMatch((currentMatch) => { return { ...currentMatch, scoreA: clamp(currentMatch.scoreA + 1, MIN_SCORE, MAX_SCORE)}}) }}>+</ScoreButton>
					</PanelRow>
					<PanelRow>
						<ScoreButton $colorTag='red' 
							onClick={() => { setDashboardMatch((currentMatch) => { return { ...currentMatch, scoreB: clamp(currentMatch.scoreB - 1, MIN_SCORE, MAX_SCORE)}}) }}>-</ScoreButton>
						<BigNumbers>
							{dashboardMatch.scoreB}
						</BigNumbers>
						<ScoreButton $colorTag='green' 
							onClick={() => { setDashboardMatch((currentMatch) => { return { ...currentMatch, scoreB: clamp(currentMatch.scoreB + 1, MIN_SCORE, MAX_SCORE)}}) }}>+</ScoreButton>
					</PanelRow>
				</ScoreColumn>
			</TeamScoreRow>
			<Row $align='center'>
				<ColorButton $colorTag='purple' onClick={() => { updateColorIndex(colorIndex - 1); }}>
					<PanelRow>
						<CaretLeft />
						<ColorDisplay $size={25} $color={getIndexColor(colorIndex - 1, colorList, dashboardMatch.swapColor)} />
						<ColorDisplay $size={25} $color={getIndexColor(colorIndex - 1, colorList, !dashboardMatch.swapColor)} />
					</PanelRow>
				</ColorButton>
				<ColorButton $colorTag='purple' onClick={() => { setDashboardMatch((currentMatch) => { return { ...currentMatch, swapColor: !currentMatch.swapColor}}) }}>
					<PanelRow>
						<ColorDisplay $size={40} $color={getIndexColor(colorIndex, colorList, dashboardMatch.swapColor)} />
						<Swap />
						<ColorDisplay $size={40} $color={getIndexColor(colorIndex, colorList, !dashboardMatch.swapColor)} />
					</PanelRow>
				</ColorButton>
				<ColorButton $colorTag='purple' onClick={() => { updateColorIndex(colorIndex + 1); }}>
					<PanelRow>
						<ColorDisplay $size={25} $color={getIndexColor(colorIndex + 1, colorList, dashboardMatch.swapColor)} />
						<ColorDisplay $size={25} $color={getIndexColor(colorIndex + 1, colorList, !dashboardMatch.swapColor)} />
						<CaretRight />
					</PanelRow>
				</ColorButton>
			</Row>
			<GridRow $height='56px' $templateColumns='1fr 0.8fr 1fr'>
				<Row>
					<Text>Color Lock</Text>
					<InputCheckbox $checked={colorLock} onClick={() => { setColorLock(!colorLock); setColorIndex(0); } } />
				</Row>
				<Row>
					<Text>Online</Text>
					<InputCheckbox $checked={onlineMode} onClick={() => { setOnlineMode(!onlineMode); setColorIndex(0); } } />
				</Row>
				<ButtonWide $expand={true} $colorTag={hasUnsavedChanges ? 'dark-red' : 'pink'} onClick={() => { saveChanges(); }}>{hasUnsavedChanges ? 'Save Changes' :  'Saved!'}</ButtonWide>
			</GridRow>
			<PanelColumn>
				<Text $textAlign='center'>Controls</Text>
				<GridRow $height='56px'>
					<ButtonWide $expand={true} $colorTag='purple' onClick={() => { showScores(); }}>Show Scores</ButtonWide>
					<ButtonWide $expand={true} $colorTag='purple' onClick={() => { hideScores(); }}>Hide Scores</ButtonWide>
				</GridRow>
				<GridRow $height='56px'>
					<ButtonWide $expand={true} $colorTag='purple' onClick={() => { showCommentators(); }}>Show Comms</ButtonWide>
					<ButtonWide $expand={true} $colorTag='purple' onClick={() => { hideCommentators(); }}>Hide Comms</ButtonWide>
				</GridRow>
			</PanelColumn>
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

const PanelRow = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const TeamScoreRow = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr max-content;
`;

const PanelColumn = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

const ScoreColumn = styled(PanelColumn)`
	padding-top: 5.7rem;
	justify-content: flex-start;
	gap: 1.7rem;
`;

const ScoreButton = styled(ButtonWide)`
	margin: 0 10px;
	width: 40px;
	height: 40px;
	padding: 3px 0;
	font-size: 1.5rem;
`;

const ColorButton = styled(ButtonWide)`
	margin: 0 5px;
	padding: 8px 3px;
`;

const ColorDisplay = styled.div<{ $size: number, $color: string }>`
	margin: 0 3px;
	height: ${({ $size }) => $size}px;
	width: ${({ $size }) => $size}px;
	border: 3px solid black;
	border-radius: 5px;
	background-color: ${({ $color }) => $color};
`;

const BigNumbers = styled.div`
	font-size: 2.5rem;
	font-weight: 600;
	font-family: 'Courier New', Courier, Consolas, monospace;
`;

const root = createRoot(document.getElementById('root')!);
root.render(<React.StrictMode><Scores /></React.StrictMode>);