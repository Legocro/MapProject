import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { DataGrabber } from './DataGrabber';


export class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.rows = [];
        this.columns = [];
        this.state = {
            items: {},
            gotData: false,
            hasGeneratedColumns: false,
            updatedParent: false,   
        }
        this.updateTable = this.updateTable.bind(this);
    }

    componentDidMount() {
    }

    componentDidUpdate() {
        if (this.state.gotData && !this.state.hasGeneratedColumns) {
            this.generateRows();
            this.generateColumns();
        }
    }


    render() {
        if (this.state.hasGeneratedColumns) {
            return (
                <div style={{ height: '400px', width: '100%' }}>
                    <DataGrabber updateParent={this.updateTable} gotData={this.state.gotData} items={this.state.items} updatedParent={this.state.updatedParent} />
                    <DataGrid
                        rows={this.rows}
                        columns={this.columns}
                        pageSize={20}
                        rowsPerPageOptions={[20]}
                        autoHeight  
                        showCellRightBorder
                    />
                </div>
            );

        } else {
            return (
                <div>
                    <h2>Nema prikupljenih podataka...</h2>
                    <DataGrabber updateParent={this.updateTable} gotData={this.state.gotData} updatedParent={this.state.updatedParent} />
                </div>
                )

        }
    }
    updateTable(items) {
        this.setState({
            items: items,
            gotData: true,
            updatedParent: true,
        });
    }
    generateRows() {
        const featureArray = this.state.items.features;
        const rows = [];
        console.log(this.state.items);
        featureArray.forEach((val, index, arr) => {
            rows.push({
                id: index,
                naziv_objekta: val.properties.naziv_objekta,
                ps_br: val.properties.ps_br,
                e_br: val.properties.e_br,
                tip_objekta: val.properties.tip_objekta,
                lucka_kapetanija: val.properties.lucka_kapetanija,
            })
        })

        this.rows = rows;
    }

    generateColumns() {
        const columns = [
            {
                field: "naziv_objekta",
                headerName: "Naziv objekta",
                width: 400,
                editable: false,
                                            },   
            {
                field: "ps_br",
                headerName: "Ps broj",
                width: 100,
                editable: false,            },
            {
                field: "e_br",
                headerName: "E broj",
                width: 100,
                editable: false,            },
            {
                field: "tip_objekta",
                headerName: "Tip objekta",
                width: 100,
                editable: false,            },
            {
                field: "lucka_kapetanija",
                headerName: "Lucka kapetanija",
                width: 150,
                editable: false,            },
        ]
        this.setState({ hasGeneratedColumns: true });
        this.columns = columns;
    }
};