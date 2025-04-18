import React, { useState } from 'react';
import styled from 'styled-components';
import { InputSubheader, TransparentButton } from './Layout';
import { CaretDown, CaretUp } from '@phosphor-icons/react'

//Title
interface CollapseContainerProps {
    title: string;
	children: React.ReactNode;
}

export const CollapseContainer: React.FC<CollapseContainerProps> = ({ title, children }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Container>
            <HeadRow>
                <InputSubheader>{title}</InputSubheader>
                <TransparentButton
                    onClick={() => { setCollapsed(!collapsed); }}
                >{collapsed ? (<CaretDown />) : (<CaretUp />)}</TransparentButton>
            </HeadRow>
            {!collapsed && (
            <Container>
                {children}
            </Container>
            )}            
        </Container>
    )
};

const Container = styled.div`
    display: contents;
`;

const HeadRow = styled.div`
    grid-column: 1 / -1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;