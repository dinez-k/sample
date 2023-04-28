import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Circle } from '@react-google-maps/api';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Grid, Stack, Typography, IconButton } from '@mui/material/index';
import { Polyline } from '@react-google-maps/api';

const center = {
    lat: 13.0827,
    lng: 80.2707
};

function MapComponent({ data, handlePopOver }) {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [location, setLocation] = useState(null);
    const [map, setMap] = React.useState(null);
    const [infoOptions, setInfoOptions] = useState({});
    const containerStyle = {
        width: '100%',
        height: '92vh'
    };

    useEffect(() => {
        // alert(JSON.stringify(navigator.userAgentData));
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

    const markers = [
        {
            lat: 13.0827,
            lng: 80.2707
        },
        {
            lat: 13.0418,
            lng: 80.2341
        },
        {
            lat: 13.0694,
            lng: 80.1948
        }
    ];

    const markerOptions = {
        clickable: true,
        draggable: false,
        icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
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

    const path = [
        { lat: 37.772, lng: -122.214 },
        { lat: 21.291, lng: -157.821 },
        { lat: -18.142, lng: 178.431 },
        { lat: -27.467, lng: 153.027 }
    ];

    const options = {
        strokeColor: 'yellow',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'yellow',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 30000,
        paths: [
            { lat: 37.772, lng: -122.214 },
            { lat: 21.291, lng: -157.821 },
            { lat: -18.142, lng: 178.431 },
            { lat: -27.467, lng: 153.027 }
        ],
        zIndex: 1
    };

    return isLoaded ? (
        <GoogleMap zoom={8} mapContainerStyle={containerStyle} options={mapOptions} center={location} onLoad={onLoad} onUnmount={onUnmount}>
            {data.map((marker, index) => (
                <Marker
                    options={markerOptions}
                    key={index}
                    position={{ lat: marker?.latitude, lng: marker?.longitude }}
                    onClick={(e) => setSelectedMarker(marker)}
                />
            ))}
            {location ? <Marker position={location} /> : <></>}
            <Polyline onLoad={onLoad} path={path} options={options} />
            {selectedMarker && (
                <InfoWindow
                    options={infoOptions}
                    position={{ lat: selectedMarker?.latitude, lng: selectedMarker?.longitude }}
                    onCloseClick={() => {
                        setSelectedMarker(null);
                        handlePopOver(false);
                    }}
                >
                    <Grid container spacing={0}>
                        <Grid
                            item
                            md={12}
                            xs={12}
                            sm={12}
                            sx={{ paddingBottom: '5px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
                        >
                            <Stack flexDirection="row" gap={2} justifyContent="flex-start">
                                <Avatar
                                    src="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/img/avatars/team1.jpg"
                                    variant="square"
                                    alt="P"
                                    sx={{ height: 50, width: 50 }}
                                ></Avatar>
                                <Stack>
                                    <Typography sx={{ color: '#013f56', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                        <b>{selectedMarker?.seller?.name}</b>
                                        <>
                                            <StarRateRoundedIcon sx={{ color: 'orange' }} style={{ fontSize: '20px' }} />
                                            <b style={{ fontSize: '12px' }}>{selectedMarker?.seller?.rating}</b>
                                        </>
                                    </Typography>
                                    <Typography sx={{ color: 'grey', fontWeight: 'bold' }}>
                                        <LocationOnIcon style={{ fontSize: '15px' }} />
                                        20km
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Grid>
                        {selectedMarker?.seller?.products.map((product, index) => {
                            return (
                                <Grid key={index} item md={3} xs={6} sm={6} sx={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}>
                                    <Stack sx={{ justifyContent: 'center', textAlign: 'center' }}>
                                        <Tooltip title={product?.name}>
                                            <Typography noWrap>{product?.name}</Typography>
                                        </Tooltip>
                                        {/* <IconButton size="small"> */}
                                        <button
                                            style={{ display: 'flex', backgroundColor: 'white', border: 'none', justifyContent: 'center' }}
                                        >
                                            <Avatar
                                                src="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/img/avatars/team1.jpg"
                                                variant="square"
                                                alt="P"
                                            ></Avatar>
                                        </button>

                                        {/* </IconButton> */}
                                        <Typography>10Kg</Typography>
                                    </Stack>
                                </Grid>
                            );
                        })}
                        <Grid item md={12} xs={12} sm={12} sx={{ paddingTop: '5px' }}>
                            <Stack flexDirection="row" sx={{ justifyContent: 'space-between', width: '100%' }} gap={2}>
                                <button className="btn1" style={{ width: '50%' }}>
                                    Bid Now
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handlePopOver(true)}
                                    style={{ color: '#1bd7a0', border: 'none', width: '50%' }}
                                >
                                    View Details
                                </button>
                            </Stack>
                        </Grid>
                    </Grid>
                </InfoWindow>
            )}
            <Circle
                center={location}
                radius={10 * 1000}
                options={{
                    fillColor: '#1bd7a0',
                    strokeColor: '#1bd7a0',
                    strokeWeight: 0
                }}
            />
        </GoogleMap>
    ) : (
        <></>
    );
}

export default React.memo(MapComponent);
