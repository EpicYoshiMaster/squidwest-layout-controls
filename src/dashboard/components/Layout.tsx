import styled, { css } from "styled-components";

const DefaultCheckboxColorTag = `pink`;
const DefaultBadgeColorTag = `teal`;
const DefaultButtonColorTag = `purple`;

export const Row = styled.div<{ $align?: string, $justify?: string, $height?: string, $expand?: boolean }>`
	position: relative;
	margin: 2px 0;
	display: flex;
	flex-direction: row;
	align-items: ${({ $align }) => $align ? $align : 'center'};
	justify-content: ${({ $justify }) => $justify ? $justify : 'flex-start'};
	gap: 5px;
	height: ${({ $height }) => $height ? $height : 'auto'};
	${({ $expand }) => $expand ? css`width: 100%;` : css``}	

	& input, textarea, select {
		height: 2.25rem;
		font-size: 1rem;
	}
`;

export const GridRow = styled.div<{ $height?: string, $templateColumns?: string }>`
	position: relative;
	margin: 5px 0;
	display: grid;
	width: 100%;
	gap: 5px;
	height: ${({ $height }) => $height ? $height : 'auto'};
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
	align-items: center;
	
	${({ $templateColumns }) => $templateColumns ? css`grid-template-columns: ${$templateColumns};` : css``}
`;

export const Column = styled.div`
	position: relative;
	display: flex;	
	flex-direction: column;
	justify-content: center;
	gap: 3px;
`;

export const Image = styled.img<{ $maxWidth?: string, $maxHeight?: string }>`
	${({ $maxWidth }) => $maxWidth ? css`max-width: ${$maxWidth};` : css``}
	${({ $maxHeight }) => $maxHeight ? css`max-height: ${$maxHeight};` : css``}
`;

export const Input = styled.input<{ $expand?: boolean, $height?: string }>`
	${({ $expand }) => $expand ? css`flex-grow: 1;` : css``}

	height: 2.25rem;
	font-size: 1rem;
	min-width: 0;

	${({ $height}) => $height ? css`height: ${$height};` : css``};
`;

export const Select = styled.select<{ $expand?: boolean, $width?: string }>`
	${({ $expand }) => $expand ? css`flex-grow: 1;` : css``}

	height: 2.25rem;
	font-size: 1rem;

	${({ $width }) => $width ? css`width: ${$width};` : css``}

	& optgroup {
		font-style: normal;
	}
`;

export const Fieldset = styled.fieldset<{ $maxHeight?: number, $column?: boolean, $expand?: boolean, $height?: string }>`
	position: relative;
	display: flex;
	flex-direction: ${({ $column }) => $column ? 'column' : 'row'};
	padding: 3px;	
	margin: 0;
	border-radius: 0.5rem;
	border: 2px solid white;
	align-items: center;
	min-width: 0;

	height: ${({ $height }) => $height ? $height : 'auto'};

	${({ $expand }) => $expand ? css`width: 100%;` : css``}

	${({ $maxHeight }) => $maxHeight ? 
	css`
	overflow: auto;
	max-height: ${$maxHeight}px;
	` : css``}
`;

export const Checkbox = styled.button<{ $checked: boolean, $colorTag?: string }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 1.5rem;
	height: 1.5rem;
	margin: 3px;
	margin-right: 8px;
	padding: 15px;
	border: solid 2px var(--${({ $colorTag }) => $colorTag ? `${$colorTag}` : DefaultCheckboxColorTag});
	border-radius: 0.5rem;

	background-color: ${({ $checked, $colorTag }) => $checked ? ($colorTag ? `var(--${$colorTag})` : `var(--${DefaultCheckboxColorTag})`) : 'transparent'};

	&:not(:disabled):hover {
		background-color: var(--${({ $colorTag }) => $colorTag ? `${$colorTag}` : DefaultCheckboxColorTag}-hover);
	}

	&:not(:disabled):active {
		background-color: var(--${({ $colorTag }) => $colorTag ? `${$colorTag}` : DefaultCheckboxColorTag}-active);
	}

	&:disabled {
		opacity: 0.5;
	}

	&::after {
		content: '✓';
		display: ${({ $checked}) => $checked ? 'block' : 'none'};
		color: var(--white);
		font-size: 1.5rem;
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

export const Badge = styled.div<{ $colorTag?: string }>`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2px 4px;

	font-size: 1rem;
	border-radius: 0.5rem;
	color: var(--text);
	background-color: var(--${({ $colorTag }) => $colorTag ? `${$colorTag}` : DefaultBadgeColorTag});
	min-width: max-content;
`;

export const ButtonSmall = styled.button<{ $colorTag?: string, $expand?: boolean, $border?: boolean }>`
	position: relative;
	padding: 6px 6px;
	font-size: 1.1rem;
	font-weight: bold;
	
	border-radius: 0.25rem;
	margin: 0;
	color: var(--text);
	background-color: var(--${({ $colorTag }) => $colorTag ? `${$colorTag}` : DefaultButtonColorTag});
	border: ${({ $border, $colorTag }) => $border ? ($colorTag ? `2px solid var(--${$colorTag}-border)` : `2px solid var(--${DefaultButtonColorTag}-border)`) : `none`};

	height: ${({ $expand }) => $expand ? '100%' : 'auto'};
	width: ${({ $expand }) => $expand ? '100%' : 'auto'};

	display: flex;
	justify-content: center;
	align-items: center;

	&:not(:disabled):hover {
		background-color: var(--${({ $colorTag }) => $colorTag ? `${$colorTag}` : DefaultButtonColorTag}-hover);
	}

	&:not(:disabled):active {
		background-color: var(--${({ $colorTag }) => $colorTag ? `${$colorTag}` : DefaultButtonColorTag}-active);
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