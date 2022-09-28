import React from 'react';
import { StyledTitle } from '../../StyledComponents/StyledTitle';
import { MapContainer, TileLayer, Circle, LayersControl, LayerGroup, Popup, Marker, GeoJSON } from 'react-leaflet'
import '../../Styles/MapDisplay.css'
import 'leaflet/dist/leaflet.css';
import { DataGrabber } from '../DataGrabber';
import { Markers } from '../Markers';
import marker from '../../Assets/Marker_icon.png';
import L from 'leaflet';
//TODO import MarkerClusterGroup from 'react-leaflet-markercluster';
//NOTE: This is an old version of the <MapDisplay/> component before being rewritten into a functional component with hooks
//      any further updates will be done on the MapDisplay.jsx file, not this one.
const center = [45.806866, 15.942904];
const markerIcon = L.icon({
    iconUrl: marker,
    iconAnchor: [24,48],
    size: [48, 48],
    popupAnchor: [0, -24],
})
export class MapDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gotData: false,
            items: {},
            updatedParent: false,
        }
        this.updateMap = this.updateMap.bind(this);
    }

    componentDidUpdate() {
        if (this.state.gotData) {
            this.generateMarkers();
            this.generateBounds();
        }
    }

    render() {
        if (this.state.gotData) {
            return (
                <div>
                    <DataGrabber updateParent={this.updateMap} gotData={this.state.gotData} items={this.state.items} updatedParent={this.state.updatedParent} />
                    <StyledTitle>MapDisplay</StyledTitle>
                    <div className="mapContainer">
                        <MapContainer className="map" center={[15.942904, 45.806866]} zoom={13} scrollWheelZoom={false} maxZoom={20} minZoom={5}>
                            <TileLayer
                                maxZoom={20}
                                maxNativeZoom={19}
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />  
                            <LayersControl position="topright">
                                <LayersControl.Overlay name="Objekti">
                                    <LayerGroup>
                                        {
                                            this.generateMarkers()
                                        }
                                    </LayerGroup>
                                </LayersControl.Overlay>
                            </LayersControl>
                        </MapContainer>
                    </div>
                </div>
            )
        } else 
        return (
            <div>
                <DataGrabber updateParent={this.updateMap} gotData={this.state.gotData} items={this.state.items} updatedParent={this.state.updatedParent} />
                <StyledTitle>MapDisplay</StyledTitle>
                <div className="mapContainer">
                    <MapContainer className="map" center={center} zoom={13} scrollWheelZoom={false} maxZoom={20} minZoom={5}>
                        <TileLayer
                            maxZoom={20}
                            maxNativeZoom={19}
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </MapContainer>
                </div>
            </div>
            )
    }
    generateMarkers() {
        const markers = this.state.items.features.map((feature, index) => {
            return (
                <Marker key={index} position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]} icon={markerIcon}>
                    <Popup>
                        <p>Naziv objekta: {feature.properties.naziv_objekta}</p>
                        <p>Ps broj: {feature.properties.ps_br}</p>
                        <p>E broj: {feature.properties.e_br}</p>
                        <p>Tip objekta: {feature.properties.tip_objekta}</p>
                        <p>Lucka kapetanija: {feature.properties.lucka_kapetanija}</p>
                        <button>Zatvori</button>
                    </Popup>
                    </Marker>
            )
        });
        return markers;

    }
    generateBounds() {
       
    }
    updateMap(items) {
        this.setState({
            items: items,
            gotData: true,
            updatedParent: true,
        });
    }
}

