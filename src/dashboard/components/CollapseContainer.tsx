import React, { useState } from 'react';
import styled from 'styled-components';
import { TransparentButton } from './Layout';
import { CaretDown, CaretUp } from '@phosphor-icons/react'

interface CollapseContainerProps {
	title: string | React.ReactElement;
	children: React.ReactNode;
	colorTag?: string;
}

export const CollapseContainer: React.FC<CollapseContainerProps> = ({ title, children, colorTag }) => {
	const [collapsed, setCollapsed] = useState(true);

	return (
		<Container $colorTag={colorTag}>
			<Header $colorTag={colorTag}>
				<Front>
					{title}
				</Front>
				<TransparentButton onClick={() => { setCollapsed(!collapsed); }}>
					{collapsed ? (<CaretDown />) : (<CaretUp />)}
				</TransparentButton>
			</Header>
			{!collapsed && ( <Content $colorTag={colorTag}> {children} </Content> )}            
		</Container>
	)
};

const Container = styled.div<{ $colorTag?: string }>`
	position: relative;

	width: 100%;
	border-radius: 0.5rem;
	background-color: var(--collapse${({ $colorTag }) => $colorTag ? `-${$colorTag}` : ``});
`;

const Header = styled.div<{ $colorTag?: string }>`
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 3px 8px;
	gap: 5px;
	border-radius: 0.5rem;
	background-color: var(--collapse${({ $colorTag }) => $colorTag ? `-${$colorTag}` : ``});
	border: 3px solid var(--collapse-${({ $colorTag }) => $colorTag ? `${$colorTag}-` : ``}border);
`;

const Front = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	gap: 5px;
	font-size: 1.3rem;
	font-weight: 700;
`;

const Content = styled.div<{ $colorTag?: string }>`
	position: relative;	
	margin-top: -8px;
	padding: 10px 8px 5px;
	border: 3px solid var(--collapse-${({ $colorTag }) => $colorTag ? `${$colorTag}-` : ``}border);
	border-top: none;
	border-radius: 0 0 0.5rem 0.5rem;
`;