import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { X, Car, DollarSign, Settings } from 'lucide-react';

// Fix para ícones do Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface Instructor {
  id: number;
  name: string;
  photo: string;
  categories: string[];
  transmission: 'manual' | 'automatic';
  price: number;
  vehicleModel: string;
  vehicleYear: number;
  rating: number;
  position: [number, number];
  availableNow: boolean;
}

interface MapViewProps {
  instructors: Instructor[];
  onSelectInstructor: (instructor: Instructor) => void;
  selectedCategory?: string;
}

export const MapView: React.FC<MapViewProps> = ({ 
  instructors, 
  onSelectInstructor,
  selectedCategory 
}) => {
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  
  // Centro padrão - São Paulo
  const defaultCenter: [number, number] = [-23.5505, -46.6333];

  const handleMarkerClick = (instructor: Instructor) => {
    setSelectedInstructor(instructor);
  };

  const handleSelectInstructor = () => {
    if (selectedInstructor) {
      onSelectInstructor(selectedInstructor);
      setSelectedInstructor(null);
    }
  };

  // Filtrar instrutores pela categoria se selecionada
  const filteredInstructors = selectedCategory
    ? instructors.filter(i => i.categories.includes(selectedCategory))
    : instructors;

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        className="h-full w-full"
        style={{ zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {filteredInstructors.map((instructor) => (
          <Marker
            key={instructor.id}
            position={instructor.position}
            eventHandlers={{
              click: () => handleMarkerClick(instructor),
            }}
          >
            <Popup>
              <div className="text-sm">
                <strong>{instructor.name}</strong>
                <br />
                {instructor.vehicleModel}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Modal de Detalhes do Instrutor */}
      {selectedInstructor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-3xl w-full max-w-md p-6 animate-slide-up">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Detalhes do Instrutor
              </h3>
              <button
                onClick={() => setSelectedInstructor(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Foto e Nome */}
              <div className="flex items-center space-x-4">
                <img
                  src={selectedInstructor.photo}
                  alt={selectedInstructor.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <h4 className="font-bold text-lg">{selectedInstructor.name}</h4>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-600">
                      {selectedInstructor.rating.toFixed(1)}
                    </span>
                  </div>
                  {selectedInstructor.availableNow && (
                    <span className="text-xs text-green-600 font-medium">
                      ● Disponível agora
                    </span>
                  )}
                </div>
              </div>

              {/* Categorias */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Categorias Habilitadas:</p>
                <div className="flex space-x-2">
                  {selectedInstructor.categories.map((cat) => (
                    <span
                      key={cat}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Veículo */}
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <Car className="text-blue-600" size={20} />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    {selectedInstructor.vehicleModel}
                  </p>
                  <p className="text-sm text-gray-600">
                    Ano: {selectedInstructor.vehicleYear}
                  </p>
                </div>
              </div>

              {/* Transmissão */}
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <Settings className="text-blue-600" size={20} />
                <div>
                  <p className="font-medium text-gray-800">Transmissão</p>
                  <p className="text-sm text-gray-600 capitalize">
                    {selectedInstructor.transmission === 'manual' ? 'Manual' : 'Automática'}
                  </p>
                </div>
              </div>

              {/* Preço */}
              <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                <DollarSign className="text-green-600" size={20} />
                <div>
                  <p className="font-medium text-gray-800">Valor por Aula</p>
                  <p className="text-xl font-bold text-green-600">
                    R$ {selectedInstructor.price.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Botão de Seleção */}
              <button
                onClick={handleSelectInstructor}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors mt-4"
              >
                Agendar com este Instrutor
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};
