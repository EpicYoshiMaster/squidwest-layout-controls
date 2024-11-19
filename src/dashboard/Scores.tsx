
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components'
import NodeCG from '@nodecg/types';
import { MatchData } from 'schemas';
import { createRoot } from 'react-dom/client';
import { InputButton, InputCheckbox, InputLabel, InputRow, InputSection, InputSubheader, InputButtonSmall } from './components/Layout';
import { useReplicant } from '@nodecg/react-hooks'

export function Scores() {
	const [match, setMatch] = useReplicant<MatchData>('match', { 
		bundle: 'squidwest-layout-controls',
		defaultValue: { 
			teamA: "Team A",
			teamB: "Team B",
			scoreA: 0,
			scoreB: 0
		}
	});

	const [teamA, setTeamA] = useState<string>("Team A");
	const [teamB, setTeamB] = useState<string>("Team B");
	const [scoreA, setScoreA] = useState<number>(0);
	const [scoreB, setScoreB] = useState<number>(0);

	useEffect(() => {
		if(!match) return;

		setTeamA(match.teamA);
		setTeamB(match.teamB);
		setScoreA(match.scoreA);
		setScoreB(match.scoreB);
	}, [match]);
	
	const updateMatch = useCallback(() => {
		let newMatch: MatchData = {
			teamA: teamA,
			teamB: teamB,
			scoreA: scoreA,
			scoreB: scoreB
		};

		setMatch(newMatch);
	}, [teamA, teamB, scoreA, scoreB, setMatch]);

	const showScores = useCallback(() => {
		nodecg.sendMessage('scoresControl', true);
	}, []);

	const hideScores = useCallback(() => {
		nodecg.sendMessage('scoresControl', false);
	}, []);

	return (
		<PanelColumn>
			<TeamScoreRow>
				<PanelColumn>
					<TeamInputSection>
						<InputSubheader>Team Information</InputSubheader>
						<InputRow>
							<InputLabel>Team A</InputLabel>
							<input type="text" value={teamA} onChange={(event) => { setTeamA(event.target.value); }} />
						</InputRow>
						<InputRow>
							<InputLabel>Team B</InputLabel>
							<input type="text" value={teamB} onChange={(event) => { setTeamB(event.target.value); }} />
						</InputRow>
					</TeamInputSection>
					<InputButton onClick={() => { updateMatch(); }}>Save</InputButton>
				</PanelColumn>
				<PanelRow>
					<ScoreColumn>
						<ScoreButton onClick={() => { setScoreA(scoreA + 1); }}>+</ScoreButton>
						<BigNumbers>
						{scoreA}
						</BigNumbers>
						<ScoreButton onClick={() => { setScoreA(Math.max(scoreA - 1, 0)); }}>-</ScoreButton>
					</ScoreColumn>
					<BigNumbers>
						:
					</BigNumbers>
					<ScoreColumn>
						<ScoreButton onClick={() => { setScoreB(scoreB + 1); }}>+</ScoreButton>
						<BigNumbers>
						{scoreB}
						</BigNumbers>
						<ScoreButton onClick={() => { setScoreB(Math.max(scoreB - 1, 0)); }}>-</ScoreButton>
					</ScoreColumn>
				</PanelRow>
			</TeamScoreRow>
			<PanelColumn>
				<LeftInputSubheader>Controls</LeftInputSubheader>
				<PanelRow>
					<InputButton onClick={() => { showScores(); }}>Show Scores</InputButton>
					<InputButton onClick={() => { hideScores(); }}>Hide Scores</InputButton>
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
	justify-content: space-evenly;
`;

const ScoreButton = styled(InputButtonSmall)`
	margin: 0 10px;
`;

const TeamInputSection = styled(InputSection)`
	padding: 10px;	
`;

const LeftInputSubheader = styled(InputSubheader)`
	width: 100%;
	text-align: left;	
`;

const BigNumbers = styled.div`
	font-size: 5rem;
	font-weight: 600;
	font-family: 'Courier New', Courier, Consolas, monospace;
`;

const root = createRoot(document.getElementById('root')!);
root.render(<React.StrictMode><Scores /></React.StrictMode>);