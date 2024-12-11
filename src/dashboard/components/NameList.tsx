import React from 'react';
import styled from 'styled-components';
import { InputButtonSmall, InputLabel, InputRow, InputSubheader, CollapseButton } from './Layout';
import { CollapseContainer } from './CollapseContainer';

//Title
interface NameListProps {
    title: string,
    list: string[],
    listUpdateHandler: (newList: string[]) => void
}

export const NameList: React.FC<NameListProps> = ({ title, list, listUpdateHandler }) => {

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
        <CollapseContainer title={title}>
            {list.map((item, i) => {
                { return (
                    <InputRow key={i}>
                        <InputLabel>{(i + 1) + '.'}</InputLabel>
                        <input type="string" value={item} onChange={(event) => { setItemValue(event.target.value, i) }}/>
                    </InputRow>
                )}
            })}
            <AddRemoveList>
                <InputButtonSmall onClick={() => { removeItem(); }}>-</InputButtonSmall>
                <InputButtonSmall onClick={() => { addItem(); }}>+</InputButtonSmall>
            </AddRemoveList>
        </CollapseContainer>
    )
};

const AddRemoveList = styled.div`
    grid-column: 2;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
`;
