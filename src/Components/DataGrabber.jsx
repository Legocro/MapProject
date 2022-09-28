import React from 'react';

export class DataGrabber extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gotData: props.gotData,
            items: props.items,
            updatedParent: props.updatedParent,
        }
    }

    componentDidMount() {
        if (!this.state.gotData) {
            this.grabData();
        }
    }

    componentDidUpdate() {
        if (!this.state.updatedParent) {
            this.updateParent();
        }
    }

    render() {
        return <div></div>;
    }

    grabData() {
        if (this.state.gotData) {
            return;
        } else {
            fetch("https://plovput.li-st.net/getObjekti/")
                .then((res) => res.json())
                .then((json) => {
                    this.setState({
                        items: json,
                        dataRecieved: true
                    });
                }).catch((e) => { console.error(e.stack) })

        }
    }
    updateParent() {
        this.props.updateParent(this.state.items);
        this.setState({
            updatedParent: true,
        })
    }

    
}