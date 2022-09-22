import React, { useState, useEffect, StyleSheet, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function MapScreen() {

  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.local.GOOGLE_MAPS_API_KEY
  })
  
  if(!isLoaded){
    return <div>Loading...</div>
  }

  return(
    <Map />
  )

}
function Map() {
  return (
    // <GoogleMap 
    //   zoom={10} 
    //   center={{lat:37.7749, lng:-122.4194}}
    //   mapContainerClassName={styles.map_container}
    //   >
    
    // </GoogleMap>
    <div>Map</div>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#444444",
    alignItems: "center",
    justifyContent: "center",
  },
  topButtonRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  map_container: {
    width: '100%',
    height: '95vh',
  },
  button: {
    flex: 1,
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  toggleButton: {
    flex: 2,
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  search_bar: {
    flex: 1,
    position: "absolute",
    width: "95%",
    zIndex: 1,
    borderRadius: 10,
    bottom: 0,
  },
});
