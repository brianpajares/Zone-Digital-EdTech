import { Product, Bundle } from './types';

// Using high-quality Unsplash images to guarantee rendering in the preview environment
export const PRODUCTS: Product[] = [
  // --- Certificaciones Profesionales ---
  {
    "id": "ebookaws",
    "category": "Certificaciones Profesionales",
    "title": "AWS Solutions Architect Associate",
    "price": 9.99,
    "currency": "USD",
    "pages": 149,
    "formats": ["PDF", "EPUB"],
    "coverImage": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800", 
    "tagline": "Certifícate y transforma tu carrera en la nube. Guía práctica en español.",
    "highlights": ["Arquitectura AWS Resiliente", "Dominio de EC2, S3 y VPC", "Escenarios reales de examen"],
    "longDescription": "Guía completa para el examen AWS Solutions Architect."
  },
  {
    "id": "ebookpmp",
    "category": "Certificaciones Profesionales",
    "title": "La Ruta Maestra hacia la Certificación PMP",
    "price": 9.99,
    "currency": "USD",
    "pages": 113,
    "formats": ["PDF", "EPUB"],
    "coverImage": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    "tagline": "Guía práctica para profesionales exitosos. Aprueba a la primera.",
    "highlights": ["Plan de estudio paso a paso", "Preguntas situacionales PMI", "Simulacro y Glosario clave"],
    "longDescription": "Sistema de preparación para la certificación PMP."
  },
  {
    "id": "ebookcfa",
    "category": "Certificaciones Profesionales",
    "title": "CFA: Éxito Financiero Global",
    "price": 9.99,
    "currency": "USD",
    "pages": 115,
    "formats": ["PDF", "EPUB"],
    "coverImage": "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800",
    "tagline": "La guía definitiva para aprobar el examen más prestigioso del mundo.",
    "highlights": ["Métodos de estudio probados", "Estrategias de alto impacto", "Análisis financiero global"],
    "longDescription": "Guía estratégica para aprobar el CFA."
  },
  {
    "id": "googlecloud",
    "category": "Certificaciones Profesionales",
    "title": "Google Cloud Engineer",
    "price": 9.99,
    "currency": "USD",
    "pages": 123,
    "formats": ["PDF", "EPUB"],
    "coverImage": "https://images.unsplash.com/photo-1484557052118-f32bd2515075?auto=format&fit=crop&q=80&w=800",
    "tagline": "Guía completa para aprobar la certificación ACE.",
    "highlights": ["Servicios esenciales de GCP", "Rutas de aprendizaje óptimas", "Enfoque a despliegue real"],
    "longDescription": "Domina Google Cloud Platform."
  },
  {
    "id": "azurecert",
    "category": "Certificaciones Profesionales",
    "title": "Domina Azure y Certifícate Rápido",
    "price": 9.99,
    "currency": "USD",
    "pages": 98,
    "formats": ["PDF", "EPUB"],
    "coverImage": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    "tagline": "La guía total para aprobar el examen AZ-104.",
    "highlights": ["Identidad y Gobernanza", "Optimización de Costos", "Simulacros examen AZ-104"],
    "longDescription": "Preparación para Azure Administrator Associate."
  },
  // --- Negocios y Tecnología ---
  {
    "id": "ebookia",
    "category": "Negocios y Tecnología",
    "title": "Domina la Era de la IA Generativa",
    "price": 9.99,
    "currency": "USD",
    "pages": 132,
    "formats": ["PDF", "EPUB"],
    "coverImage": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    "tagline": "La guía definitiva para data scientists del futuro.",
    "highlights": ["Prompt Engineering Avanzado", "Automatización con LLMs", "Ética e implementación"],
    "longDescription": "Transforma tu negocio con IA Generativa."
  },
  {
    "id": "ebookmba",
    "category": "Negocios y Tecnología",
    "title": "MBA Rediseñado",
    "price": 9.99,
    "currency": "USD",
    "pages": 130,
    "formats": ["PDF", "EPUB"],
    "coverImage": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
    "tagline": "Aprende, lidera y triunfa con las estrategias que funcionan hoy.",
    "highlights": ["Estrategia de Negocios Digitales", "Liderazgo en la era Tech", "Finanzas para no financieros"],
    "longDescription": "Conceptos clave de MBA adaptados al mundo digital."
  },
  {
    "id": "ebookarquitectura",
    "category": "Negocios y Tecnología",
    "title": "Arquitectura de Soluciones",
    "price": 9.99,
    "currency": "USD",
    "pages": 145,
    "formats": ["PDF", "EPUB"],
    "coverImage": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    "tagline": "Diseña, escala y transforma sistemas empresariales.",
    "highlights": ["Patrones de diseño modernos", "Microservicios vs Monolitos", "Arquitectura orientada a eventos"],
    "longDescription": "Manual para arquitectos de software."
  },
  // --- Minería y Tecnología ---
  {
    "id": "mineria-transformacion",
    "category": "Minería y Tecnología",
    "title": "Transformación Digital y Minería 4.0",
    "price": 9.99,
    "currency": "USD",
    "pages": 160,
    "formats": ["PDF", "EPUB"],
    "coverImage": "https://images.unsplash.com/photo-1576082236848-0d50714b7e9a?auto=format&fit=crop&q=80&w=800",
    "tagline": "La guía de todo profesional del futuro en el sector extractivo.",
    "highlights": ["IoT y Sensores en Mina", "Big Data aplicado a Geología", "Gestión del cambio tecnológico"],
    "longDescription": "La cuarta revolución industrial en la minería."
  },
  {
    "id": "mineria-accion",
    "category": "Minería y Tecnología",
    "title": "Tecnología Minera en Acción",
    "price": 9.99,
    "currency": "USD",
    "pages": 180,
    "formats": ["PDF", "EPUB"],
    "coverImage": "https://images.unsplash.com/photo-1581093588402-4857474d5fbe?auto=format&fit=crop&q=80&w=800",
    "tagline": "Instalar, automatizar y sostener soluciones con Data e IA.",
    "highlights": ["Casos de uso reales en planta", "Mantenimiento predictivo con IA", "Automatización de flota"],
    "longDescription": "Implementación práctica para ingenieros mineros."
  },
  {
    "id": "mineria-abc",
    "category": "Minería y Tecnología",
    "title": "El ABC de la Innovación Minera",
    "price": 9.99,
    "currency": "USD",
    "pages": 140,
    "formats": ["PDF", "EPUB"],
    "coverImage": "https://images.unsplash.com/photo-1535378437148-845924d47489?auto=format&fit=crop&q=80&w=800",
    "tagline": "Claves para innovar en un entorno industrial complejo.",
    "highlights": ["Metodologías ágiles en mina", "Ecosistemas de innovación abierta", "ROI de la innovación industrial"],
    "longDescription": "Guía práctica para introducir procesos de innovación."
  }
];

export const BUNDLES: Bundle[] = [
  {
    id: "mining-tech-pack",
    title: "Master Minería 4.0 Pack",
    description: "La colección completa para liderar la industria minera del futuro.",
    productIds: ["mineria-transformacion", "mineria-accion", "mineria-abc"],
    discount: 0.25,
    coverImage: "https://images.unsplash.com/photo-1576082236848-0d50714b7e9a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "cloud-architect-pack",
    title: "Cloud Architect Master",
    description: "Domina las 3 nubes líderes: AWS, Azure y Google Cloud.",
    productIds: ["ebookaws", "azurecert", "googlecloud"],
    discount: 0.20,
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
  }
];

export const CATEGORIES = ["Todos", "Certificaciones Profesionales", "Negocios y Tecnología", "Minería y Tecnología"];
export const SPOTIFY_PODCAST_URL = "https://open.spotify.com/show/4rOoJ6Egrf8K2IrywzwOMk";