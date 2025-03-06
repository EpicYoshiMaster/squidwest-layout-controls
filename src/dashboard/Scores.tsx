
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components'
import NodeCG from '@nodecg/types';
import { MatchData } from 'schemas/matchData';
import { createRoot } from 'react-dom/client';
import { InputButton, InputCheckbox, InputLabel, InputRow, InputSection, InputSubheader, InputButtonSmall } from './components/Layout';
import { useReplicant } from '@nodecg/react-hooks'
import { CaretLeft, CaretRight, Swap } from '@phosphor-icons/react';
import { modulo, getIndexColor, clamp } from '../helpers/utils';
import Colors from '../data/colors.json'

const MIN_SCORE = 0;
const MAX_SCORE = 9;

export function Scores() {
	const [match, setMatch] = useReplicant<MatchData>('match', { 
		bundle: 'squidwest-layout-controls',
		defaultValue: { 
			matchInfo: "Round 1",
			teamA: "Team A",
			teamB: "Team B",
			scoreA: 0,
			scoreB: 0,
			matchColor: Colors.localMode[0],
			swapColor: false
		}
	});

	const [matchInfo, setMatchInfo] = useState<string>("Round 1");
	const [teamA, setTeamA] = useState<string>("Team A");
	const [teamB, setTeamB] = useState<string>("Team B");
	const [scoreA, setScoreA] = useState<number>(0);
	const [scoreB, setScoreB] = useState<number>(0);
	const [colorIndex, setColorIndex] = useState<number>(0);
	const [swapColor, setSwapColor] = useState<boolean>(false);
	const [colorLock, setColorLock] = useState<boolean>(false);
	const [onlineMode, setOnlineMode] = useState<boolean>(false);

	const colorList = useMemo(() => {
		return colorLock ? Colors.colorLock : (onlineMode ? Colors.onlineMode : Colors.localMode);
	}, [colorLock, onlineMode]);

	useEffect(() => {
		if(!match) return;

		setMatchInfo(match.matchInfo);
		setTeamA(match.teamA);
		setTeamB(match.teamB);
		setScoreA(match.scoreA);
		setScoreB(match.scoreB);
		if(match.matchColor) {
			setColorIndex(match.matchColor.index);
		}
		setSwapColor(match.swapColor);
	}, [match]);
	
	const updateMatch = useCallback(() => {
		let newMatch: MatchData = {
			matchInfo: matchInfo,
			teamA: teamA,
			teamB: teamB,
			scoreA: scoreA,
			scoreB: scoreB,
			matchColor: colorList[colorIndex],
			swapColor: swapColor
		};

		setMatch(newMatch);
	}, [matchInfo, teamA, teamB, scoreA, scoreB, colorList, colorIndex, swapColor, setMatch]);

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
	}, [colorLock]);

	return (
		<PanelColumn>
			<TeamScoreRow>
				<PanelColumn>
					<TeamInputSection>
						<InputSubheader>Match Information</InputSubheader>
						<InputRow>
							<InputLabel>Info (opt.)</InputLabel>
							<input type="text" value={matchInfo} onChange={(event) => { setMatchInfo(event.target.value); }} />
						</InputRow>
						<InputRowLarge>
							<InputLabel><ColorDisplay $size={20} $color={getIndexColor(colorIndex, colorList, swapColor)} /> Team A</InputLabel>
							<input type="text" value={teamA} onChange={(event) => { setTeamA(event.target.value); }} />
						</InputRowLarge>
						<InputRowLarge>
							<InputLabel><ColorDisplay $size={20} $color={getIndexColor(colorIndex, colorList, !swapColor)} /> Team B</InputLabel>
							<input type="text" value={teamB} onChange={(event) => { setTeamB(event.target.value); }} />
						</InputRowLarge>
					</TeamInputSection>
					<ColorRow>
						<ColorButton onClick={() => { updateColorIndex(colorIndex - 1); }}>
							<PanelRow>
								<CaretLeft />
								<ColorDisplay $size={25} $color={getIndexColor(colorIndex - 1, colorList, swapColor)} />
								<ColorDisplay $size={25} $color={getIndexColor(colorIndex - 1, colorList, !swapColor)} />
							</PanelRow>
						</ColorButton>
						<ColorButton onClick={() => { setSwapColor(!swapColor); }}>
							<PanelRow>
								<ColorDisplay $size={40} $color={getIndexColor(colorIndex, colorList, swapColor)} />
								<Swap />
								<ColorDisplay $size={40} $color={getIndexColor(colorIndex, colorList, !swapColor)} />
							</PanelRow>
						</ColorButton>
						<ColorButton onClick={() => { updateColorIndex(colorIndex + 1); }}>
							<PanelRow>
								<ColorDisplay $size={25} $color={getIndexColor(colorIndex + 1, colorList, swapColor)} />
								<ColorDisplay $size={25} $color={getIndexColor(colorIndex + 1, colorList, !swapColor)} />
								<CaretRight />
							</PanelRow>
						</ColorButton>
					</ColorRow>
				</PanelColumn>
				<ScoreColumn>
					<ScoreRow>
						<ScoreButton onClick={() => { setScoreA(clamp(scoreA - 1, MIN_SCORE, MAX_SCORE)); }}>-</ScoreButton>
						<BigNumbers>
							{scoreA}
						</BigNumbers>
						<ScoreButton onClick={() => { setScoreA(clamp(scoreA + 1, MIN_SCORE, MAX_SCORE)); }}>+</ScoreButton>
					</ScoreRow>
					<ScoreRow>
						<ScoreButton onClick={() => { setScoreB(clamp(scoreB - 1, MIN_SCORE, MAX_SCORE)); }}>-</ScoreButton>
						<BigNumbers>
							{scoreB}
						</BigNumbers>
						<ScoreButton onClick={() => { setScoreB(clamp(scoreB + 1, MIN_SCORE, MAX_SCORE)); }}>+</ScoreButton>
					</ScoreRow>
				</ScoreColumn>
			</TeamScoreRow>
			<LeftPanelRow>
				<InputRow>
					<InputLabel>Color Lock</InputLabel>
					<InputCheckbox $checked={colorLock} onClick={() => { setColorLock(!colorLock); setColorIndex(0); } } />
				</InputRow>
				<InputRow>
					<InputLabel>Online</InputLabel>
					<InputCheckbox $checked={onlineMode} onClick={() => { setOnlineMode(!onlineMode); setColorIndex(0); } } />
				</InputRow>
				<InputButton onClick={() => { updateMatch(); }}>Save</InputButton>
			</LeftPanelRow>
			<PanelColumn>
				<LeftInputSubheader>Controls</LeftInputSubheader>
				<PanelRow>
					<InputButton onClick={() => { showScores(); }}>Show Scores</InputButton>
					<InputButton onClick={() => { hideScores(); }}>Hide Scores</InputButton>
				</PanelRow>
				<PanelRow>
					<InputButton onClick={() => { showCommentators(); }}>Show Comms</InputButton>
					<InputButton onClick={() => { hideCommentators(); }}>Hide Comms</InputButton>
				</PanelRow>
			</PanelColumn>
		</PanelColumn>
	)
}

const PanelRow = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const LeftPanelRow = styled(PanelRow)`
	justify-content: flex-start;	
	padding-left: 5px;
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
`;

const ScoreColumn = styled(PanelColumn)`
	padding-top: 5.5rem;
	justify-content: flex-start;
`;

const ScoreButton = styled(InputButtonSmall)`
	margin: 0 10px;
	padding: 3px 15px;
	font-size: 1.5rem;
`;

const TeamInputSection = styled(InputSection)`
	padding: 10px;	
`;

const LeftInputSubheader = styled(InputSubheader)`
	width: 100%;
	text-align: left;	
`;

const ColorButton = styled(InputButton)`
	margin: 0 5px;
	padding: 8px 3px;
`;

const ColorRow = styled(PanelRow)`
	justify-content: center;
`;

const ScoreRow = styled(PanelRow)`
`;

const InputRowLarge = styled(InputRow)`
	& > div, input, textarea, select {
	}

	& input, textarea, select {
		height: 2.5rem;
	}
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