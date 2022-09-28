import React, { useState, useEffect, useRef } from 'react';
import { StyledTitle } from '../../StyledComponents/StyledTitle';
import { MapContainer, TileLayer, Circle, LayersControl, LayerGroup, Popup, Marker, useMap, Polygon } from 'react-leaflet'
import '../../Styles/MapDisplay.css'
import 'leaflet/dist/leaflet.css';
import { DataGrabber } from '../DataGrabber';
import marker from '../../Assets/Marker_icon.png';
import L from 'leaflet';
import { bounds } from 'leaflet';

const center = [45.806866, 15.942904];
const markerIcon = L.icon({
    iconUrl: marker,
    iconAnchor: [24, 48],
    size: [48, 48],
    popupAnchor: [0, -24],
})

const northEast = new L.LatLng(46.81065688128482, 19.95551462348388);
const southWest = new L.LatLng(42.33965506269496, 13.266951795348515); //42.56448452231443, 13.68232177361871);
const LBounds = L.latLngBounds(southWest, northEast);
function MapModifier() {

}
export function MapDisplay(props) {
    const [gotData, updateDataFlag] = useState(false);
    const [items, setItems] = useState({});
    const [updatedParent, updateParentFlag] = useState(false);
    const mapRef = useRef(null);
    const bounds = LBounds;
    useEffect(() => {
        if (gotData) {
            generateMarkers();
        }
    })
    function closePopup() {
        mapRef.current._popup._closeButton.click();
    }
    if (gotData) {
        return (
            <div>
                <DataGrabber updateParent={updateMap} gotData={gotData} items={items} updatedParent={updatedParent}/>
                <StyledTitle>MapDisplay</StyledTitle>
                <div className="mapContainer">
                    <MapContainer ref={mapRef} className="map" center={center} zoom={13} scrollWheelZoom={true} maxZoom={20} minZoom={10} maxBounds={bounds}>
                        <TileLayer
                            maxZoom={20}
                            maxNativeZoom={19}
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapModifier/>
                        <LayersControl position="topright">
                            <LayersControl.Overlay name="Objekti">
                                <LayerGroup>
                                    {
                                        generateMarkers()
                                    }
                                </LayerGroup>
                            </LayersControl.Overlay>
                        </LayersControl>
                    </MapContainer>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <DataGrabber updateParent={updateMap} gotData={gotData} items={items} updatedParent={updatedParent} />
                <StyledTitle>MapDisplay</StyledTitle>
                <div className="mapContainer">
                    <MapContainer ref={mapRef} className="map" center={center} zoom={13} maxZoom={20} minZoom={10} maxBounds={bounds}>
                        <TileLayer
                            maxZoom={20}
                            maxNativeZoom={19}
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapModifier/>
                    </MapContainer>
                </div>
            </div>
            )
    }
    function generateMarkers() {
        const markers = items.features.map((feature, index) => {
            return (
                <Marker key={index} position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]} icon={markerIcon}>
                    <Popup>
                        <p>Naziv objekta: {feature.properties.naziv_objekta}</p>
                        <p>Ps broj: {feature.properties.ps_br}</p>
                        <p>E broj: {feature.properties.e_br}</p>
                        <p>Tip objekta: {feature.properties.tip_objekta}</p>
                        <p>Lucka kapetanija: {feature.properties.lucka_kapetanija}</p>
                        <button onClick={closePopup}>Zatvori</button>
                    </Popup>
                </Marker>
            )
        })
        return markers;
    }

    function updateMap(items) {
        setItems(items);
        updateDataFlag(true);
        updateParentFlag(true);
    }
}

export default MapDisplay;