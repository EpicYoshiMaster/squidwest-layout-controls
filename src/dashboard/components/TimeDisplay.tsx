
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { formatTimeHMSC } from '../../helpers/utils';

interface TimeDisplayProps {
    timingName: string;
	time: number;
}

export const TimeDisplay: React.FC<TimeDisplayProps> = ({ timingName, time }) => {

    return (
        <Container>
            <TimeHeader>{timingName}</TimeHeader>
			<Time>
				{formatTimeHMSC(time)}
			</Time>
        </Container>
    )
};

const Container = styled.div`
    display: contents;
`;

const TimeHeader = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 0.5rem;
`;

const Time = styled.div`
	font-size: 4rem;
	font-weight: 600;
	font-family: 'Courier New', Courier, Consolas, monospace;
`;