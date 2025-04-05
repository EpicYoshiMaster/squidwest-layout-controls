import styled, { css } from "styled-components";

export const InputSection = styled.div`
	padding: 10px 20px;
	width: 100%;

	display: grid;
	grid-template-columns: max-content 1fr;	
`;

export const InputRow = styled.div`
	display: contents;

	& input, textarea, select {
		height: 2rem;
		font-size: 1rem;
	}
`;

export const InputSubheader = styled.div`
    grid-column: 1 / -1;
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0.75rem 0;
`;

export const InputText = styled.div`
    grid-column: 1 / -1;
    font-size: 1rem;
	margin-bottom: 0.75rem;

	p {
		margin: 0;
		margin-bottom: 5px;
	}
`;

export const ErrorText = styled.div`
	font-weight: 700;
	font-size: 1.25rem;
	margin: 0.5rem 0;
	text-align: center;

	p {
		margin: 0;
		margin-bottom: 5px;
	}
`;

export const InputLabel = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding-right: 0.5rem;
	font-weight: 700;
	line-height: 2;
`;

export const InputButton = styled.button`
	margin: 10px;
	padding: 10px 50px;
	font-size: 1.5rem;
	font-weight: bold;
	border: none;
	border-radius: 0.5rem;
	color: #ffffff;
	background-color: #d346fe; //#9746fe

	&:not(:disabled):hover {
		background-color: #5f2573;
	}

	&:not(:disabled):active {
		background-color: #4c1d5c;
	}

	&:disabled {
		opacity: 0.5;
	}
`;

export const TransparentButton = styled.button`
    margin: 0;
    padding: 0;
    font-size: 2rem;
    font-weight: 800;
    color: white;
    background: transparent;
    border: transparent;
	display: flex;
	align-items: center;

    :hover {
        cursor: pointer;
    }
`;

export const TransparentButtonSmall = styled(TransparentButton)`
	font-size: 1rem;
`;

export const InputCheckbox = styled.button<{ $checked: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 1.5rem;
	height: 1.5rem;
	margin: 3px;
	margin-right: 8px;
	padding: 15px;
	border: solid 2px #d346fe;
	border-radius: 0.5rem;

	background-color: ${({ $checked }) => $checked ? '#d346fe' : 'transparent'};

	&:not(:disabled):hover {
		background-color: #5f2573;
	}

	&:not(:disabled):active {
		background-color: #4c1d5c;
	}

	&:disabled {
		opacity: 0.5;
	}

	&::after {
		content: '✓';
		display: ${({ $checked}) => $checked ? 'block' : 'none'};
		color: #fff;
		font-size: 1.5rem;
	}
`;

export const InputButtonSmall = styled(InputButton)`
    font-size: 1.25rem;
    padding: 5px 25px;
	font-family: 'Courier New', Courier, Consolas, monospace;
`;

/**
 * New Layout Items
 */
export const Row = styled.div<{ $align?: string, $justify?: string, $height?: string }>`
	position: relative;
	margin: 2px 0;
	display: flex;
	flex-direction: row;
	align-items: ${({ $align }) => $align ? $align : 'center'};
	justify-content: ${({ $justify }) => $justify ? $justify : 'flex-start'};
	gap: 5px;
	height: ${({ $height }) => $height ? $height : 'auto'};

	& input, textarea, select {
		height: 2.25rem;
		font-size: 1rem;
	}

	& input {
		flex-grow: 1;
	}
`;

export const GridRow = styled.div<{ $height?: string }>`
	position: relative;
	margin: 2px 0;
	display: grid;
	width: 100%;
	gap: 5px;
	height: ${({ $height }) => $height ? $height : 'auto'};
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
`;

export const Column = styled.div`
	position: relative;
	display: flex;	
	flex-direction: column;
	justify-content: center;
	gap: 3px;
`;

export const Fieldset = styled.fieldset<{ $maxHeight?: number }>`
	position: relative;
	padding: 3px;	
	margin: 0;
	border-radius: 0.5rem;
	border: 2px solid white;

	${({ $maxHeight }) => $maxHeight ? 
	css`
	overflow: auto;
	max-height: ${$maxHeight}px;
	` : css``}
`;

export const Badge = styled.div<{ $colorTag?: string }>`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2px 4px;

	font-size: 1rem;
	border-radius: 0.5rem;
	color: var(--text);
	background-color: var(--${({ $colorTag }) => $colorTag ? `${$colorTag}` : `button`});
`;

export const ButtonSmall = styled.button<{ $colorTag?: string, $expand?: boolean, $border?: boolean }>`
	position: relative;
	padding: 6px 6px;
	font-size: 1.1rem;
	font-weight: bold;
	
	border-radius: 0.25rem;
	margin: 0;
	color: var(--text);
	background-color: var(--${({ $colorTag }) => $colorTag ? `${$colorTag}` : `button`});
	border: ${({ $border, $colorTag }) => $border ? ($colorTag ? `2px solid var(--${$colorTag}-border)` : `2px solid var(--button-border)`) : `none`};

	height: ${({ $expand }) => $expand ? '100%' : 'auto'};
	width: ${({ $expand }) => $expand ? '100%' : 'auto'};

	display: flex;
	justify-content: center;
	align-items: center;

	&:not(:disabled):hover {
		background-color: var(--${({ $colorTag }) => $colorTag ? `${$colorTag}` : `button`}-hover);
	}

	&:not(:disabled):active {
		background-color: var(--${({ $colorTag }) => $colorTag ? `${$colorTag}` : `button`}-active);
	}

	&:disabled {
		opacity: 0.5;
	}
`;

export const ButtonWide = styled(ButtonSmall)`
	padding: 6px 10px;
	border-width: 3px;
`;

export const ButtonLarge = styled(ButtonSmall)`
	padding: 3px 10px;
	border-width: 3px;
	font-size: 1.3rem;
`;

export const ButtonFieldset = styled(ButtonSmall)`
	padding: 3px;	
	font-size: 1.1rem;
`;

export const ButtonTiny = styled(ButtonSmall)`
	padding: 0;
	font-size: 1.25rem;
`;

export const Text = styled.p<{ $colorTag?: string, $textAlign?: string, $fontWeight?: string }>`
	position: relative;
	padding: 0;
	margin: 0;
	font-weight: ${({ $fontWeight }) => $fontWeight ? `${$fontWeight}` : `700`};
	color: var(--${({ $colorTag }) => $colorTag ? `${$colorTag}` : `text`});
	text-align: ${({ $textAlign }) => $textAlign ? `${$textAlign}` : `center`};
`;

export const ColorSpan = styled.span<{ $colorTag?: string, $fontWeight?: string }>`
	color: var(--${({ $colorTag }) => $colorTag ? `${$colorTag}` : `text`});
	font-weight: ${({ $fontWeight }) => $fontWeight ? `${$fontWeight}` : `unset`};
`;