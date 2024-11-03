
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components'
import NodeCG from '@nodecg/types';
import { CommentatorData, CommentatorInfo } from 'schemas';
import { createRoot } from 'react-dom/client';
import { InputButton, InputCheckbox, InputLabel, InputRow, InputSection, InputSubheader } from './components/Layout';
import { useReplicant } from '@nodecg/react-hooks'
import { Commentator } from './components/Commentator';

const defaultCommentator: CommentatorInfo = { name: "Commentator Name", pronouns: "any/all", tag: "@TagName" }

export function Commentators() {
	const [comms, setComms] = useReplicant<CommentatorData>('commentators', { 
		bundle: 'squidwest-layout-controls',
		defaultValue: { 
			commentatorOne: defaultCommentator, 
			commentatorTwo: defaultCommentator,
			autoShow: true,
			delay: 3000,
			autoHide: true,
			lifetime: 5000
		}});

	const [commentatorOne, setCommentatorOne ] = useState<CommentatorInfo>(defaultCommentator);
	const [commentatorTwo, setCommentatorTwo ] = useState<CommentatorInfo>(defaultCommentator);

	const [ autoShow, setAutoShow ] = useState<boolean>(true);
	const [ delay, setDelay ] = useState<number>(3000);
	const [ autoHide, setAutoHide ] = useState<boolean>(true);
	const [ lifetime, setLifetime ] = useState<number>(5000);

	useEffect(() => {
		if(!comms) return;

		setCommentatorOne(comms.commentatorOne);
		setCommentatorTwo(comms.commentatorTwo);
		setAutoShow(comms.autoShow);
		setDelay(comms.delay);
		setAutoHide(comms.autoHide);
		setLifetime(comms.lifetime);
	}, [comms]);
	
	const updateCommentators = useCallback(() => {
		let newCommentators: CommentatorData = {
			commentatorOne: commentatorOne,
			commentatorTwo: commentatorTwo,
			autoShow: autoShow,
			delay: delay,
			autoHide: autoHide,
			lifetime: lifetime
		};

		setComms(newCommentators);
	}, [commentatorOne, commentatorTwo, autoShow, delay, autoHide, lifetime, setComms]);

	const swapCommentators = useCallback(() => {
		const commOne = commentatorOne;

		setCommentatorOne(commentatorTwo);
		setCommentatorTwo(commOne);
	}, [commentatorOne, commentatorTwo]);

	const addToCredits = useCallback(() => {
		nodecg.sendMessage('commsCredits', [commentatorOne.name || "", commentatorTwo.name || ""]);
	}, [commentatorOne, commentatorTwo]);

	const showCommentators = useCallback(() => {
		nodecg.sendMessage('commsControl', true);
	}, []);

	const hideCommentators = useCallback(() => {
		nodecg.sendMessage('commsControl', false);
	}, []);

	return (
		<PanelContainer>
			<InputSection>
				<InputSubheader>Commentator #1</InputSubheader>
				<Commentator comm={commentatorOne} setCommentator={setCommentatorOne} />
				<InputSubheader>Commentator #2</InputSubheader>
				<Commentator comm={commentatorTwo} setCommentator={setCommentatorTwo} />
			</InputSection>
			<InputButton onClick={() => { swapCommentators(); }}>Swap Commentators</InputButton>
			<InputButton onClick={() => { addToCredits(); }}>Add to Credits</InputButton>
			<InputSection>
				<InputSubheader>Configuration</InputSubheader>
				<InputRow>
					<InputLabel>Show Automatically</InputLabel>
					<InputCheckbox $checked={autoShow} onClick={() => setAutoShow(!autoShow) } />
				</InputRow>
				<InputRow>
					<InputLabel>Show Delay Time (ms)</InputLabel>
					<input type="number" value={delay} onChange={(event) => { setDelay(Number(event.target.value));  }}/>
				</InputRow>
				<InputRow>
					<InputLabel>Hide Automatically</InputLabel>
					<InputCheckbox $checked={autoHide} onClick={() => setAutoHide(!autoHide) } />
				</InputRow>
				<InputRow>
					<InputLabel>Lifetime (ms)</InputLabel>
					<input type="number" value={lifetime} onChange={(event) => { setLifetime(Number(event.target.value)); }}/>
				</InputRow>
			</InputSection>
			<InputButton onClick={() => { updateCommentators(); }}>Save</InputButton>
			<InputSection>
				<InputSubheader>Manual Controls</InputSubheader>
			</InputSection>
			<InputButton onClick={() => { showCommentators(); }}>Show Commentators</InputButton>
			<InputButton onClick={() => { hideCommentators(); }}>Hide Commentators</InputButton>
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
root.render(<React.StrictMode><Commentators /></React.StrictMode>);