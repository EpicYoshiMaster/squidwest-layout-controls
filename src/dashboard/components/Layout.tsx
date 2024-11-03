import styled from "styled-components";

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
`;

export const ErrorText = styled.div`
	font-weight: 700;
	font-size: 1.25rem;
	margin: 0.5rem 0;
	text-align: center;
`;

export const InputLabel = styled.div`
	display: flex;
	justify-content: flex-end;
	padding-right: 0.5rem;
	font-weight: 700;
	line-height: 2;
`

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

export const CollapseButton = styled.button`
    margin: 0;
    padding: 0;
    font-size: 2rem;
    font-weight: 800;
    color: white;
    background: transparent;
    border: transparent;

    :hover {
        cursor: pointer;
    }
`;

export const InputCheckbox = styled.button<{ $checked: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 1.5rem;
	height: 1.5rem;
	margin: 3px;
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
`;