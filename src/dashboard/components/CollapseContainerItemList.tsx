import React, { useCallback } from "react";
import styled, { css } from "styled-components";
import { Text, Column, ButtonTiny } from "./Layout";
import { CollapseContainer } from "./CollapseContainer";
import { CaretUp, CaretDown } from "@phosphor-icons/react";

interface CollapseContainerItemListProps<T> {
	list: T[];
	setList: (newList: T[]) => void;
	renderTitle: (item: T, colorTag?: string | undefined) => React.ReactElement;
	renderItem: (item: T, changeItem: (partial: Partial<T>) => void, index: number, colorTag?: string | undefined) => React.ReactElement;
	getColorTag?: (item: T) => string | undefined;

	maxHeight?: number;
	canSwapItems?: boolean;
}

export const CollapseContainerItemList = <T,>({ list, setList, renderTitle, renderItem, maxHeight, canSwapItems = true, getColorTag = () => undefined }: CollapseContainerItemListProps<T>) => {

	const moveItem = useCallback((itemIndex: number, moveForward: boolean) => {
		if((itemIndex <= 0 && !moveForward) || (itemIndex >= list.length - 1 && moveForward)) return;

		const currentItem = list[itemIndex];
		const swapIndex = itemIndex + (moveForward ? 1 : -1);
		const swapItem = list[swapIndex];

		setList(list.map((item, index) => {
			if(index === itemIndex) {
				return swapItem;
			}
			else if(index === swapIndex) {
				return currentItem;
			}
			else {
				return item;
			}
		}));
	}, [list, setList]);

	const changeItem = useCallback((partialItem: Partial<T>, itemIndex: number) => {
		setList(list.map((item, index) => {
			if(index !== itemIndex) return item;

			return { ...item, ...partialItem };
		}))
	}, [list, setList]);

	return (
		<ScrollContainer $maxHeight={maxHeight}>
			{list.length <= 0 && (
				<>
					<Text>There are no entries!</Text>
					<Text>...unless you click the button to add one, perhaps!</Text>
				</>
			)}
			{list.map((listItem, index, array) => {
				const colorTag = getColorTag(listItem);
				const title = renderTitle(listItem, colorTag);
				const item = renderItem(listItem, (partialItem: Partial<T>) => { changeItem(partialItem, index); }, index, colorTag);

				return (
					<CollapseContainer 
					key={index}
					colorTag={colorTag}
					title={(
						<>
							{canSwapItems && (
								<Column>
									<ButtonTiny $colorTag='blue' $border={true} disabled={index <= 0} onClick={() => { moveItem(index, false); }}><CaretUp weight='bold' /></ButtonTiny>
									<ButtonTiny $colorTag='red' $border={true} disabled={index >= array.length - 1} onClick={() => { moveItem(index, true); }}><CaretDown weight='bold' /></ButtonTiny>
								</Column>
							)}
							{title}
						</>
					)}>
						{item}
					</CollapseContainer>
				)
			})

			}
		</ScrollContainer>

	)
}

const ScrollContainer = styled.div<{ $maxHeight?: number }>`
	position: relative;
	width: 100%;
	padding-right: 8px;

	& > div {
		margin-bottom: 5px;
	}

	& > div:last-of-type {
		margin-bottom: 0;
	}

	${({ $maxHeight }) => $maxHeight ? 
	css`
	overflow: auto;
	max-height: ${$maxHeight}px;
	` : css``}
`;