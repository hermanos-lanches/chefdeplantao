import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Loader2 } from 'lucide-react';

// SUBSTITUA PELA SUA CHAVE DE API REAL
const GOOGLE_MAPS_API_KEY = "SUA_CHAVE_AQUI";

// Configuração visual Dark Mode para o Mapa
const darkMapStyles = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

interface Location {
  lat: number;
  lng: number;
}

interface GoogleMapComponentProps {
  userLocation: Location;
  destinationLocation: Location;
  className?: string;
  loadingComponent?: React.ReactNode;
}

export const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ 
  userLocation, 
  destinationLocation,
  className,
  loadingComponent
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  });

  const [map, setMap] = useState<any | null>(null);

  const onLoad = useCallback((mapInstance: any) => {
    // Cria os limites (bounds) para incluir ambos os marcadores
    const bounds = new (window as any).google.maps.LatLngBounds();
    bounds.extend(userLocation);
    bounds.extend(destinationLocation);
    mapInstance.fitBounds(bounds);
    
    // Ajusta o zoom levemente para não ficar muito perto se os pontos forem próximos
    const listener = (window as any).google.maps.event.addListener(mapInstance, "idle", () => { 
        if (mapInstance.getZoom()! > 16) mapInstance.setZoom(16); 
        (window as any).google.maps.event.removeListener(listener); 
    });

    setMap(mapInstance);
  }, [userLocation, destinationLocation]);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // FALLBACK: Se houver erro (ex: falta de API Key) ou ainda estiver carregando
  if (loadError) {
    return (
      <div className={`relative w-full h-full bg-[#1c1c1e] flex flex-col items-center justify-center text-center p-4 border border-white/10 rounded-2xl overflow-hidden ${className}`}>
        {/* Background Image de Fallback */}
        <div className="absolute inset-0 z-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1748')] bg-cover bg-center grayscale"></div>
        <div className="relative z-10 bg-black/60 p-4 rounded-xl backdrop-blur-sm border border-white/5">
            <span className="material-symbols-outlined text-red-500 text-3xl mb-2">map</span>
            <p className="text-white font-bold text-sm">Mapa Indisponível</p>
            <p className="text-gray-400 text-xs mt-1">Verifique a API Key ou sua conexão.</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    if (loadingComponent) return <>{loadingComponent}</>;

    return (
      <div className={`w-full h-full bg-[#1c1c1e] flex items-center justify-center ${className}`}>
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerClassName={className}
      center={userLocation}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        styles: darkMapStyles,
        disableDefaultUI: true, // Remove controles padrão para visual app-like
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      {/* Marcador do Usuário (Azul) */}
      <Marker
        position={userLocation}
        title="Você está aqui"
        icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      />

      {/* Marcador do Destino (Restaurante - Vermelho Padrão) */}
      <Marker
        position={destinationLocation}
        title="Restaurante"
      />
    </GoogleMap>
  );
};