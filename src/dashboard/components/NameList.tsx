import React, { useState } from 'react';
import styled from 'styled-components';
import { InputButtonSmall, InputLabel, InputRow, InputSubheader, CollapseButton } from './Layout';
import { CaretDown, CaretUp } from '@phosphor-icons/react'

//Title
interface NameListProps {
    title: string,
    list: string[],
    listUpdateHandler: (newList: string[]) => void
}

export const NameList: React.FC<NameListProps> = ({ title, list, listUpdateHandler }) => {

    const [collapsed, setCollapsed] = useState(false);

    const setItemValue = (newValue: string, i: number) => {
        listUpdateHandler(list.map((item, index) => { return (i === index) ? newValue : item; }));
    };

    const removeItem = () => {
        listUpdateHandler(list.filter((item, index) => { return index < list.length - 1}));
    }

    const addItem = () => {
        listUpdateHandler([ ...list, ""]);
    }

    return (
        <Container>
            <HeadRow>
                <InputSubheader>{title}</InputSubheader>
                <CollapseButton
                    onClick={() => { setCollapsed(!collapsed); }}
                >{collapsed ? (<CaretDown />) : (<CaretUp />)}</CollapseButton>
            </HeadRow>
            {!collapsed && (
            <Container>
                {
                list.map((item, i) => {
                    { return (
                        <InputRow key={i}>
                            <InputLabel>{(i + 1) + '.'}</InputLabel>
                            <input type="string" value={item} onChange={(event) => { setItemValue(event.target.value, i) }}/>
                        </InputRow>
                    )}
                })
                }
                <AddRemoveList>
                    <InputButtonSmall onClick={() => { removeItem(); }}>-</InputButtonSmall>
                    <InputButtonSmall onClick={() => { addItem(); }}>+</InputButtonSmall>
                </AddRemoveList>
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

const AddRemoveList = styled.div`
    grid-column: 2;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
`;
