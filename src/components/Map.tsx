import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Фикс для иконок маркеров
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface MapProps {
    latitude: number
    longitude: number
    zoom?: number
    height?: string
}

const Map: React.FC<MapProps> = ({
    latitude,
    longitude,
    zoom = 13,
    height = '300px'
}) => {
    return (
        <div className={`w-full rounded-xl overflow-hidden ${height === '400px' ? 'h-64 sm:h-80 md:h-96 lg:h-[400px]' : 'h-48 sm:h-64 md:h-80'}`}>
            <MapContainer
                center={[latitude, longitude]}
                zoom={zoom}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[latitude, longitude]}>
                    <Popup>
                        <div className="text-center">
                            <h3 className="font-bold text-lg mb-2">ESDK GROUP</h3>
                            <p className="text-sm text-gray-600">
                                Мы здесь! Приходите к нам в офис
                            </p>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Map
