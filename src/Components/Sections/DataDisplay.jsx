import React from 'react';
import { styled } from '@mui/material/styles';
import { DataTable } from '../DataTable';
import { StyledTitle } from '../../StyledComponents/StyledTitle';
export class DataDisplay extends React.Component {
    render() {
        return (
            <div>
                <StyledTitle>Data Display</StyledTitle>
                <DataTable/>
            </div>
        )
    }
}