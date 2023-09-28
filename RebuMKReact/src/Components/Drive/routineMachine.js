import React from 'react';
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = (props) => {
  const instance = L.Routing.control({
      waypoints: [
        L.latLng(props.latitudes.startLat, props.latitudes.startLng),
        L.latLng(props.latitudes.destLat, props.latitudes.destLng)
      ],
      lineOptions: {
        styles: [{ color: "#6FA1EC", weight: 4 }]
      },
      createMarker: function() { return null; },
      show: false,
      addWaypoints: false,
      routeWhileDragging: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false
      }).on('routesfound', function(e) {
        e.sourceTarget._container.outerHTML = "None";
    });
  return instance;
};


const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
