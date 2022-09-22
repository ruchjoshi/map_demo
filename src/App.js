import logo from "./logo.svg";
import "./App.css";
import React, {
    useState,
    useEffect,
    StyleSheet,
    useMemo,
    Fragment,
} from "react";
import { GoogleMap, useLoadScript, MarkerF, InfoWindow } from "@react-google-maps/api";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxList,
    ComboboxPopover,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { Icon } from "antd";


const defaultCoords = { lat: 37.383569, lng: -122.0130231 };

function App() {
    const [location, setLocation] = useState(defaultCoords);
    const [markerLoc, setMarkerLoc] = useState(defaultCoords);
    const [selected, setSelected] = useState(null);

    const markers = [
        {
            id: 1,
            lat: markerLoc.lat,
            lng: markerLoc.lng,
            title:
                "John Doe checked in at: \n2022-08-23T08:00:00\n(1 hour ago)",
        },
        {   
            id: 2,
            lat: markerLoc.lat + 0.005,
            lng: markerLoc.lng,
            title:
                "John Doe checked in at: \n2022-08-23T08:46:07\n(14 minutes ago)",
        },
        {
            id: 3,
            lat: markerLoc.lat - 0.005,
            lng: markerLoc.lng,
            title:
                "Jane Doe checked in at: \n2022-08-23T08:49:17\n(10 minutes ago)",
        },
        {
            id: 4,
            lat: markerLoc.lat,
            lng: markerLoc.lng + 0.005,
            title:
                "Jane Doe checked in at: \n2022-08-23T08:30:00\n(30 minutes ago)",
        },
        {   
            id: 5,
            lat: markerLoc.lat,
            lng: markerLoc.lng - 0.005,
            title:
                "John Doe checked at: \n2022-08-23T07:00:00\n(2 hours ago)",
        },
    ];

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    });

    // useEffect(() => {
    //     getCurrentLocation();
    //     //console.log()
    // }, []);

    useEffect(() => {
        <RenderMap />
    }, [location])

    const getCurrentLocation = () => {
        if ("geolocation" in navigator) {
            console.log("Available");
        } else {
            console.log("Not Available");
        }
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
            setMarkerLoc({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        });
    };

    const PlacesAutocomplete = ({ setSelected }) => {
        const {
            ready,
            value,
            setValue,
            suggestions: { status, data },
            clearSuggestions,
        } = usePlacesAutocomplete();

        const handleSelect = async (address) => {
            setValue(address, false);
            clearSuggestions();

            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            //if broken, change line 105 to an array instead of object
            setSelected({ lat, lng })
            setLocation({ lat, lng })
            //RenderMap()
            console.log(lat, lng)
        };

        return (
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    className="combobox-input"
                    placeholder="Search for a place..."
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ place_id, description }) => (
                                <ComboboxOption
                                    key={place_id}
                                    value={description}
                                />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        );
    };


    const RenderMap = () => {
       return (
        <React.Fragment>
            <div className="places-container">
                <PlacesAutocomplete setSelected={setSelected} />
            </div>
            <GoogleMap
                zoom={14}
                center={location}
                mapContainerClassName="map_container"
            >

            {/*    <MarkerF 
                    position={markerLoc}
                    title={"John Doe checked in at: \n2022-08-23T08:00:00\n(1 hour ago)"}
                    icon = {<Icon type="frown" theme="twoTone" />}
                />
                <MarkerF 
                    position={{lat: markerLoc.lat + 0.005,
                               lng: markerLoc.lng}}
                    title={"John Doe checked in at: \n2022-08-23T08:46:07\n(14 minutes ago)"}
                />
                <MarkerF 
                    position={{lat: markerLoc.lat - 0.005,
                                lng: markerLoc.lng}}
                    title={"Jane Doe checked in at: \n2022-08-23T08:49:17\n(10 minutes ago)"}
                />
                <MarkerF 
                    position={{lat: markerLoc.lat,
                                lng: markerLoc.lng + 0.005}}
                    title={"Jane Doe checked in at: \n2022-08-23T08:30:00\n(30 minutes ago)"}
                />
                <MarkerF 
                    position={{lat: markerLoc.lat,
                                lng: markerLoc.lng - 0.005}}
                    title={"John Doe checked at: \n2022-08-23T07:00:00\n(2 hours ago)"}
                    /> */}
               
                    {/* This doesn't render jack */}
                    
                {markers && markers.map(marker => {
                    <MarkerF 
                    position={{lat: marker.lat,
                               lng: marker.lng}}
                    title={marker.title}
                    id = {marker.id}
                    />
                })}  

                {selected && <MarkerF position={selected} />}
            </GoogleMap>
        </React.Fragment>
       )
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <RenderMap />
        );
    }
}

export default App;
