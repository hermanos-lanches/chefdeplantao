import React, { useCallback, useState, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Loader2 } from 'lucide-react';

// A chave deve vir de variáveis de ambiente para segurança
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

const darkMapStyles = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
  // ... (estilos simplificados para brevidade, manter os originais no arquivo real)
];

interface Location {
  lat: number;
  lng: number;
}

interface MapMarker extends Location {
  id: string;
  title: string;
  type: 'restaurant' | 'professional' | 'user';
  data?: any;
}

interface GoogleMapComponentProps {
  center: Location;
  markers?: MapMarker[];
  onMarkerClick?: (marker: MapMarker) => void;
  className?: string;
  zoom?: number;
}

export const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ 
  center, 
  markers = [],
  onMarkerClick,
  className = "w-full h-full",
  zoom = 14
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['places'] // Útil para busca de endereços no onboarding
  });

  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);

  const mapOptions = useMemo(() => ({
    styles: darkMapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
  }), []);

  if (loadError) {
    return (
      <div className={`bg-gray-900 flex items-center justify-center text-white p-4 rounded-xl ${className}`}>
        <p>Erro ao carregar o mapa. Verifique sua conexão e chave de API.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={`bg-gray-900 flex items-center justify-center ${className}`}>
        <Loader2 className="animate-spin text-orange-500" size={32} />
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerClassName={className}
      center={center}
      zoom={zoom}
      options={mapOptions}
    >
      {/* Marcador da posição central/usuário */}
      <Marker 
        position={center}
        icon={{
          url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          scaledSize: new window.google.maps.Size(40, 40)
        }}
      />

      {/* Marcadores dinâmicos (Vagas ou Profissionais) */}
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={() => {
            setSelectedMarker(marker);
            if (onMarkerClick) onMarkerClick(marker);
          }}
          icon={{
            url: marker.type === 'restaurant' 
              ? 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png' 
              : 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
            scaledSize: new window.google.maps.Size(35, 35)
          }}
        />
      ))}

      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div className="p-2 text-gray-900">
            <h3 className="font-bold">{selectedMarker.title}</h3>
            {selectedMarker.data?.price && (
              <p className="text-sm text-green-600 font-semibold">
                R$ {(selectedMarker.data.price / 100).toFixed(2)}
              </p>
            )}
            <button 
              className="mt-2 text-xs bg-orange-500 text-white px-2 py-1 rounded"
              onClick={() => onMarkerClick?.(selectedMarker)}
            >
              Ver Detalhes
            </button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};
