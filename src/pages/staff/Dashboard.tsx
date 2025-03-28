import { useState, useEffect } from "react";
import Navigation from "../../components/staff/Navigation";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";
import { RiCompass3Line, RiDirectionLine, RiEdit2Line } from "react-icons/ri";
import L from "leaflet";
import BotPin from "../../assets/pins/Bot-Pin.png";
import DefaultPin from "../../assets/pins/Default-Pin.png";
import { useConfig } from "../../contexts/ConfigProvider";
import { useWebsocket } from "../../contexts/WebsocketProvider";
import QueuePin from "../../assets/pins/Queue-Pin.png";
import ConfigForm from "../../components/admin/dashboard/ConfigForm";

const customBotPin = L.icon({
  iconUrl: BotPin,
  iconSize: [52, 52],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const customQueuePin = L.icon({
  iconUrl: QueuePin,
  iconSize: [52, 52],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const customDefaultPin = L.icon({
  iconUrl: DefaultPin,
  iconSize: [52, 52],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const CenterMap = ({
  bounds,
  zoomLevel,
}: {
  bounds: LatLngBounds;
  zoomLevel: number;
}) => {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: zoomLevel });
  }, [bounds, zoomLevel, map]);

  return null;
};

const Dashboard = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [centerMap, setCenterMap] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(16);
  const { checkConfig, config } = useConfig();
  const { queue, queueWebSocket, botLocation } = useWebsocket();
  const [configForm, setConfigForm] = useState(false);

  useEffect(() => {
    checkConfig();
    queueWebSocket();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
          setCenterMap(true);
        },
        (error) => {
          console.error(error);
          setPosition([51.505, -0.09]); // Default position
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setPosition([51.505, -0.09]); // Default position
    }
  }, []);

  const handleCenterClick = () => {
    if (position) {
      setCenterMap(true);
      setTimeout(() => setCenterMap(false), 100);
    }
  };

  // Use a fallback for `position` if it's `null`
  const userLocation: [number, number] = position ?? [51.505, -0.09]; // Use default if null
  const defaultLocation: [number, number] = config
    ? [config.defaultLocation.lat, config.defaultLocation.lon]
    : [51.505, -0.09];

  const bounds = new LatLngBounds([
    [botLocation?.latitude ?? 0, botLocation?.longitude ?? 0],
    [defaultLocation[0], defaultLocation[1]],
  ]);

  return (
    <>
      <Navigation />
      {/* Center Button */}
      <div
        onClick={handleCenterClick}
        className="p-2 rounded-full fixed top-20 left-4 lg:left-[26%] z-10 bg-gradient-to-tr from-[#466600] to-[#699900] shadow-xl shadow-black/25 cursor-pointer"
      >
        <RiCompass3Line size={16} color="white" />
      </div>

      <div className="w-full flex flex-col lg:flex-row items-center justify-start lg:justify-center overflow-x-auto fixed bottom-0 left-0 p-4 z-10 gap-4 scrollbar-hide">
        <div className="bg-white p-6 rounded-xl flex flex-col space-y-8 items-center justify-center min-w-[40vw] lg:min-w-[20vw] shadow-xl shadow-black/25">
          <div className="w-full flex flex-row items-center justify-start gap-2">
            <div className="p-2 rounded-full bg-black">
              <RiDirectionLine size={16} color="white" />
            </div>
            <p className="text-xs font-semibold">Bot Location</p>
          </div>
          <div className="w-full flex p-2 rounded-lg bg-[#EDEDED] px-6 py-3">
            <p className="text-xs font-normal text-[#6E6E6E] capitalize">
              {botLocation
                ? `Latitude: ${botLocation.latitude.toFixed(
                    4
                  )}, Longitude: ${botLocation.longitude.toFixed(4)}`
                : "No Location Data"}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl flex flex-col space-y-8 items-center justify-center min-w-[40vw] lg:min-w-[20vw] shadow-xl shadow-black/25">
          <div className="w-full flex flex-row items-center justify-start gap-2">
            <div className="p-2 rounded-full bg-black">
              <RiDirectionLine size={16} color="white" />
            </div>
            <p className="text-xs font-semibold">Default Location</p>
          </div>
          <div className="w-full flex p-2 rounded-lg bg-[#EDEDED] px-6 py-3">
            <p className="text-xs font-normal text-[#6E6E6E] capitalize">
              {config
                ? `Latitude: ${config.defaultLocation.lat.toFixed(
                    4
                  )}, Longitude: ${config.defaultLocation.lon.toFixed(4)}`
                : "Fetching location..."}
            </p>
          </div>
        </div>
      </div>
      {/* Map */}

      <MapContainer
        center={userLocation} // Use userLocation directly as LatLngExpression
        zoom={zoomLevel}
        scrollWheelZoom={true}
        zoomControl={false}
        className="h-[100svh] w-full z-0"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">Carto</a>'
        />

        <>
          <CenterMap bounds={bounds} zoomLevel={zoomLevel} />
          {/* Bot location */}
          {botLocation && (
            <Marker
              position={[botLocation.latitude, botLocation.longitude]}
              icon={customBotPin}
            >
              <Popup>Bot Location</Popup>
            </Marker>
          )}
          {/* queue */}
          {queue &&
            queue.map((queue: any) => (
              <Marker
                position={[queue.location.lat, queue.location.lon]}
                icon={customQueuePin}
              >
                <Popup>
                  <p className="text-xs font-normal font-DM">
                    User:{" "}
                    {`${queue.userId.personalInfo.firstName} ${queue.userId.personalInfo.lastName}`}
                  </p>
                  <p className="text-xs font-normal font-DM">
                    Location: {queue.location.locationName}
                  </p>
                </Popup>
              </Marker>
            ))}
          {/* Default location */}
          {config && (
            <Marker position={defaultLocation} icon={customDefaultPin}>
              <Popup>Default Location</Popup>
            </Marker>
          )}
        </>
      </MapContainer>
      {configForm && (
        <ConfigForm
          onClose={() => {
            setConfigForm(false);
            checkConfig();
          }}
        />
      )}
    </>
  );
};

export default Dashboard;
