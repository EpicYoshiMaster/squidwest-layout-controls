import React, { useState } from 'react';
import styled from 'styled-components';
import { InputSubheader, TransparentButton } from './Layout';
import { CaretDown, CaretUp } from '@phosphor-icons/react'

interface CollapseContainerProps {
	title: string | React.ReactElement;
	children: React.ReactNode;
}

export const CollapseContainer: React.FC<CollapseContainerProps> = ({ title, children }) => {
	const [collapsed, setCollapsed] = useState(true);

	return (
		<Container>
			<Header>
				<Front>
					{title}
				</Front>
				<TransparentButton onClick={() => { setCollapsed(!collapsed); }}>
					{collapsed ? (<CaretDown />) : (<CaretUp />)}
				</TransparentButton>
			</Header>
			{!collapsed && ( <Content> {children} </Content> )}            
		</Container>
	)
};

const Container = styled.div`
	position: relative;

	width: 100%;
	border-radius: 0.5rem;
	background-color: #4d4e8f;
`;

const Header = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 3px 8px;
	border-radius: 0.5rem;
	background-color: #4d4e8f;
	border: 3px solid #7967dd;
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

const Content = styled.div`
	position: relative;	
	margin-top: -8px;
	padding: 10px 8px 5px;
	border: 3px solid #7967dd;
	border-top: none;
	border-radius: 0 0 0.5rem 0.5rem;
`;