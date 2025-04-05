import React, { useCallback } from "react";
import { Fieldset, Text, Row, Column, ButtonFieldset, ButtonTiny, ButtonSmall } from "./Layout";
import { X, Plus, CaretUp, CaretDown } from "@phosphor-icons/react";
import { cloneDeep } from "lodash";

interface FieldsetItemListProps<T> {
	list: T[];
	setList: (newList: T[]) => void;
	renderItem: (item: T, changeItem: (partial: Partial<T>) => void) => React.ReactElement;
	defaultItem: T;
	title: string;

	maxHeight?: number;
	canAddItems?: boolean;
	canDeleteItems?: boolean;
	canSwapItems?: boolean;
}

export const FieldsetItemList = <T,>({ list, setList, renderItem, defaultItem, title, maxHeight, canAddItems = true, canDeleteItems = true, canSwapItems = true }: FieldsetItemListProps<T>) => {

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
	}, [list]);

	const addItem = useCallback(() => {
		setList([...list, cloneDeep(defaultItem)])
	}, [list, defaultItem]);

	const changeItem = useCallback((partialItem: Partial<T>, itemIndex: number) => {
		setList(list.map((item, index) => {
			if(index !== itemIndex) return item;

			return { ...item, ...partialItem };
		}))
	}, [list]);

	const deleteItem = useCallback((itemIndex: number) => {
		setList(list.filter((item, index) => index !== itemIndex))
	}, [list]);

	return (
		<Fieldset $maxHeight={maxHeight}>
			<legend>
				<Row>
					<Text>{title}</Text>
					{canAddItems && (
						<ButtonFieldset $colorTag='green' onClick={() => { addItem(); }}>
							<Plus weight="bold" />
						</ButtonFieldset>
					)}
				</Row>
			</legend>
			{list.length <= 0 && (
				<Row $justify='center'>
					<Text>This list is empty! {canAddItems ? `Click the + to add items here.` : ``}</Text>
				</Row>
			)}
			{list.map((listItem, index, array) => {
				const item = renderItem(listItem, (partialItem: Partial<T>) => { changeItem(partialItem, index); });

				return (
				<Row key={index}>
					{canSwapItems && (
						<Column>
							<ButtonTiny $colorTag='blue' $border={true} disabled={index <= 0} onClick={() => { moveItem(index, false); }}><CaretUp /></ButtonTiny>
							<ButtonTiny $colorTag='red' $border={true} disabled={index >= array.length - 1} onClick={() => { moveItem(index, true); }}><CaretDown /></ButtonTiny>
						</Column>
					)}
					{item}
					{canDeleteItems && (
						<ButtonSmall $colorTag='red' onClick={() => { deleteItem(index); }}>
							<X weight="bold" />
						</ButtonSmall>
					)}
				</Row>
			)})
			}
		</Fieldset>
	)
}