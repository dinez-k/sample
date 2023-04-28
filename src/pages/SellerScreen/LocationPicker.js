import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import React, { useState, useEffect } from 'react';

const center = {
    lat: 13.0827,
    lng: 80.2707
};

function LocationPicker({ handleLocation, height = '50vh' }) {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [location, setLocation] = useState(null);
    const [map, setMap] = React.useState(null);
    const [infoOptions, setInfoOptions] = useState({});
    const containerStyle = {
        width: '100%',
        height: height
    };
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            (error) => {
                setLocation(center);
                console.log(error);
                alert('Location is not enabled and default location is chennai');
            }
        );
    }, []);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyA4F9JYoct7v7oGvirzAx7_oK6XkNyL1oM'
    });

    const onLoad = React.useCallback(function callback(map) {
        setInfoOptions({
            pixelOffset: new window.google.maps.Size(0, -30)
        });
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    const markerOptions = {
        clickable: true,
        draggable: true,
        icon: {
            url: 'https://www.shareicon.net/data/512x512/2016/07/24/800943_location_512x512.png',
            scaledSize: {
                width: 40,
                height: 40
            }
        },
        position: center,
        style: { pointerEvents: 'none' }
    };

    const mapOptions = {
        minZoom: 2,
        maxZoom: 32
    };

    const onMarkerDragEnd = (event) => {
        setLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
        handleLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    };

    return isLoaded ? (
        <GoogleMap zoom={8} mapContainerStyle={containerStyle} options={mapOptions} center={location} onLoad={onLoad} onUnmount={onUnmount}>
            <Marker onDragEnd={onMarkerDragEnd} position={location} options={markerOptions} />
            {selectedMarker && (
                <InfoWindow
                    options={infoOptions}
                    position={{ lat: selectedMarker?.latitude, lng: selectedMarker?.longitude }}
                    onCloseClick={() => {
                        setSelectedMarker(null);
                        handlePopOver(false);
                    }}
                >
                    {JSON.stringify(selectedMarker)}
                </InfoWindow>
            )}
        </GoogleMap>
    ) : (
        <></>
    );
}

export default LocationPicker;
