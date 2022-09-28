import '../Styles/App.css';
import { Header } from '../Components/Header';
import { DataDisplay } from '../Components/Sections/DataDisplay';
import { MapDisplay } from '../Components/Sections/MapDisplay';
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from 'react';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Header/>
                <Routes>
                    <Route path="/map" element={<MapDisplay/>} />
                    <Route path="/data" element={<DataDisplay />} />
                    <Route path="*" element={<Navigate to="/map" replace />} />
                </Routes>
            </Router>
        )
    }
}

export default App;
