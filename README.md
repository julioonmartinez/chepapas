// Estructura de carpetas y archivos del proyecto
zamoraPapas/
├── src/
│   ├── app/
│   │   ├── core/                           # Módulo core con servicios y guardias esenciales
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── business.service.ts
│   │   │   │   ├── rating.service.ts
│   │   │   │   └── geolocation.service.ts
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts
│   │   │   └── interceptors/
│   │   │       └── auth.interceptor.ts
│   │   │
│   │   ├── shared/                         # Componentes y utilidades compartidas
│   │   │   ├── components/
│   │   │   │   ├── header/
│   │   │   │   ├── footer/
│   │   │   │   ├── rating-card/
│   │   │   │   └── business-card/
│   │   │   ├── pipes/
│   │   │   │   └── distance.pipe.ts
│   │   │   └── interfaces/
│   │   │       ├── business.interface.ts
│   │   │       └── rating.interface.ts
│   │   │
│   │   ├── features/                       # Módulos principales de la aplicación
│   │   │   ├── home/
│   │   │   │   ├── components/
│   │   │   │   │   ├── hero/
│   │   │   │   │   ├── featured-businesses/
│   │   │   │   │   └── culture-section/
│   │   │   │   └── home.component.ts
│   │   │   │
│   │   │   ├── businesses/
│   │   │   │   ├── components/
│   │   │   │   │   ├── business-list/
│   │   │   │   │   ├── business-detail/
│   │   │   │   │   ├── business-map/
│   │   │   │   │   └── filters/
│   │   │   │   └── businesses.component.ts
│   │   │   │
│   │   │   ├── rating/
│   │   │   │   ├── components/
│   │   │   │   │   ├── rating-flow/
│   │   │   │   │   ├── rating-history/
│   │   │   │   │   └── super-shot-modal/
│   │   │   │   └── rating.component.ts
│   │   │   │
│   │   │   └── culture/
│   │   │       ├── components/
│   │   │       │   ├── history/
│   │   │       │   ├── recipe/
│   │   │       │   └── gallery/
│   │   │       └── culture.component.ts
│   │   │
│   │   └── admin/                          # Panel de administración
│   │       ├── components/
│   │       │   ├── dashboard/
│   │       │   ├── business-management/
│   │       │   └── user-management/
│   │       └── admin.component.ts
│   │
│   ├── assets/
│   │   ├── images/
│   │   │   ├── hero/
│   │   │   ├── businesses/
│   │   │   └── culture/
│   │   └── icons/
│   │
│   ├── styles/
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   └── themes/
│   │       ├── _light.scss
│   │       └── _dark.scss
│   │
│   └── environments/
│       ├── environment.ts
│       └── environment.prod.ts

// Ejemplo de business.interface.ts
export interface Business {
  id: string;
  name: string;
  description: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  photos: string[];
  specialties: string[];
  schedule: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  ratings: {
    average: number;
    total: number;
    superShots: number;
  };
  features: {
    hasSalsa: boolean;
    hasChurros: boolean;
    hasDining: boolean;
    isTraditional: boolean;
  };
  priceRange: {
    min: number;
    max: number;
  };
  contact: {
    phone?: string;
    whatsapp?: string;
    facebook?: string;
  };
}

// Ejemplo de rating.interface.ts
export interface Rating {
  id: string;
  businessId: string;
  userId: string;
  type: 'like' | 'dislike' | 'supershot';
  comment?: string;
  photos?: string[];
  createdAt: Date;
  metrics: {
    taste: number;
    service: number;
    cleanliness: number;
    value: number;
  };
  recommended: boolean;
}