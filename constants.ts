import { Product, Bundle } from './types';

// NOTA PARA EL DESARROLLADOR:
// Guarda las imágenes de tus libros en la carpeta 'public/covers/' con estos nombres:
// aws.jpg, pmp.jpg, cfa.jpg, google.jpg, azure.jpg, mba.jpg, ia.jpg, arq.jpg, exponenciales.jpg
// mineria-transformacion.jpg, mineria-accion.jpg, mineria-abc.jpg

export const PRODUCTS: Product[] = [
  // --- Certificaciones ---
  {
    "id":"ebookaws",
    "category":"Certificaciones Profesionales",
    "title":"AWS Solutions Architect Associate",
    "price":9.99,
    "currency":"USD",
    "pages":149,
    "formats":["PDF","EPUB"],
    "coverImage": "/covers/aws.jpg", 
    "tagline":"Certifícate y transforma tu carrera en la nube. Guía práctica en español.",
    "highlights":[
      "Arquitectura AWS: resiliencia y seguridad",
      "Servicios clave (EC2, S3, VPC, RDS)",
      "Estrategia de examen + escenarios"
    ],
    "longDescription":"Guía completa en español para preparar el examen AWS Solutions Architect Associate y pensar como Solutions Architect."
  },
  {
    "id":"ebookpmp",
    "category":"Certificaciones Profesionales",
    "title":"La Ruta Maestra hacia la Certificación PMP",
    "price":9.99,
    "currency":"USD",
    "pages":113,
    "formats":["PDF","EPUB"],
    "coverImage":"/covers/pmp.jpg",
    "tagline":"Guía práctica para profesionales exitosos. Aprueba a la primera.",
    "highlights":[
      "Plan de estudio paso a paso",
      "Dominio de preguntas situacionales",
      "Plantillas + glosario + simulacro"
    ],
    "longDescription":"Sistema completo de preparación: requisitos, postulación, dominios del examen y técnicas para el examen."
  },
  {
    "id":"ebookcfa",
    "category":"Certificaciones Profesionales",
    "title":"CFA: El Camino Certificado hacia el Éxito Financiero Global",
    "price":9.99,
    "currency":"USD",
    "pages":115,
    "formats":["PDF","EPUB"],
    "coverImage":"/covers/cfa.jpg",
    "tagline":"La guía definitiva para aprobar y triunfar en el examen más prestigioso.",
    "highlights":[
      "Métodos probados para estudiar",
      "Estrategias de alto impacto",
      "Herramientas prácticas"
    ],
    "longDescription":"Guía estratégica para aprobar CFA y desarrollar pensamiento de analista financiero global."
  },
  {
    "id":"googlecloud",
    "category":"Certificaciones Profesionales",
    "title":"Certificate como Google Cloud Engineer",
    "price":9.99,
    "currency":"USD",
    "pages":123,
    "formats":["PDF","EPUB"],
    "coverImage":"/covers/google.jpg",
    "tagline":"Guía completa para aprobar la certificación ACE.",
    "highlights":[
      "Servicios esenciales explicados claro",
      "Rutas de aprendizaje + práctica",
      "Enfoque a desempeño real"
    ],
    "longDescription":"Ebook diseñado para aprender y certificarte con claridad: qué priorizar y cómo aplicar en escenarios reales."
  },
  {
    "id":"azurecert",
    "category":"Certificaciones Profesionales",
    "title":"Domina Azure y Certifícate Rápido",
    "price":9.99,
    "currency":"USD",
    "pages":98,
    "formats":["PDF","EPUB"],
    "coverImage":"/covers/azure.jpg",
    "tagline":"La guía total para aprobar el examen AZ-104 y liderar en la nube.",
    "highlights":[
      "Identidad, redes, cómputo y storage",
      "Seguridad y optimización de costos",
      "Errores típicos del examen"
    ],
    "longDescription":"Guía práctica y estratégica para dejar de saltar entre docs infinitas y dominar lo que realmente evalúa AZ-104."
  },
  
  // --- Negocios y Tecnología ---
  {
    "id":"ebookmba",
    "category":"Negocios y Tecnología",
    "title":"MBA Rediseñado",
    "price":9.99,
    "currency":"USD",
    "pages":130,
    "formats":["PDF","EPUB"],
    "coverImage":"/covers/mba.jpg",
    "tagline":"Aprende, lidera y triunfa con las estrategias que funcionan hoy.",
    "highlights":[
      "Pensar como CEO desde el día 1",
      "Negocios digitales escalables",
      "Finanzas y marketing conectados"
    ],
    "longDescription":"Guía moderna con principios accionables: liderazgo, estrategia, finanzas, talento, marketing e innovación."
  },
  {
    "id":"ebookia",
    "category":"Negocios y Tecnología",
    "title":"Domina la Era de la Inteligencia Artificial Generativa",
    "price":9.99,
    "currency":"USD",
    "pages":132,
    "formats":["PDF","EPUB"],
    "coverImage":"/covers/ia.jpg",
    "tagline":"La guía definitiva para Data Scientists del futuro.",
    "highlights":[
      "Cómo funcionan los LLMs",
      "Proyectos con Python + APIs",
      "Casos reales y ética"
    ],
    "longDescription":"Guía para profesionales que quieren transformar industrias con IA generativa: visión, técnica e implementación."
  },
  {
    "id":"ebookarquitectura",
    "category":"Negocios y Tecnología",
    "title":"Arquitectura de Soluciones para Líderes Tecnológicos",
    "price":9.99,
    "currency":"USD",
    "pages":null,
    "formats":["PDF","EPUB"],
    "coverImage":"/covers/arq.jpg",
    "tagline":"Diseña, escala y transforma sistemas empresariales.",
    "highlights":[
      "Escalabilidad y resiliencia",
      "Comunicación ejecutiva",
      "Casos empresariales"
    ],
    "longDescription":"Guía inspiradora y práctica para liderar transformación digital desde arquitectura de soluciones."
  },
  {
    "id":"negociosexponenciales",
    "category":"Negocios y Tecnología",
    "title":"Negocios Exponenciales con IA",
    "price":9.99,
    "currency":"USD",
    "pages":null,
    "formats":["PDF","EPUB"],
    "coverImage":"/covers/exponenciales.jpg",
    "tagline":"Diseña una empresa digital que crece aunque duermas.",
    "highlights":[
      "Oferta irresistible + embudos",
      "Automatización de operaciones",
      "KPIs para escalar"
    ],
    "longDescription":"Estrategias accionables para diseñar y escalar negocios digitales con IA, automatización y métricas claras."
  },

  // --- Minería y Tecnología (NUEVOS) ---
  {
    "id":"mineria-transformacion",
    "category":"Minería y Tecnología",
    "title":"La Transformación Digital y la Minería 4.0",
    "price":14.99,
    "currency":"USD",
    "pages":160,
    "formats":["PDF","EPUB"],
    "coverImage":"/covers/mineria-transformacion.jpg",
    "tagline":"La guía de todo profesional del futuro en el sector extractivo.",
    "highlights":[
      "Fundamentos de Minería 4.0",
      "Nuevas tecnologías operativas",
      "Cambio cultural en la mina"
    ],
    "longDescription":"Una visión integral sobre cómo la tecnología está redefiniendo una de las industrias más importantes del mundo."
  },
  {
    "id":"mineria-accion",
    "category":"Minería y Tecnología",
    "title":"Tecnología Minera en Acción",
    "price":14.99,
    "currency":"USD",
    "pages":180,
    "formats":["PDF","EPUB"],
    "coverImage":"/covers/mineria-accion.jpg",
    "tagline":"Guía completa para instalar, automatizar y sostener soluciones con Data e IA.",
    "highlights":[
      "Implementación real de IA",
      "Automatización de procesos",
      "Sostenibilidad tecnológica"
    ],
    "longDescription":"Manual técnico y estratégico para llevar la teoría a la práctica en operaciones mineras reales."
  },
  {
    "id":"mineria-abc",
    "category":"Minería y Tecnología",
    "title":"El ABC de la Innovación Minera",
    "price":12.99,
    "currency":"USD",
    "pages":140,
    "formats":["PDF","EPUB"],
    "coverImage":"/covers/mineria-abc.jpg",
    "tagline":"Claves para innovar en un entorno industrial complejo.",
    "highlights":[
      "Metodologías ágiles en minería",
      "Gestión del cambio",
      "Ecosistemas de innovación"
    ],
    "longDescription":"Los principios fundamentales para liderar la innovación dentro del sector minero moderno."
  }
];

export const BUNDLES: Bundle[] = [
  {
    id: "cloud-pack",
    title: "Cloud Master Pack",
    description: "Domina las 3 nubes (AWS, Azure, GCP). El kit definitivo para arquitectos.",
    productIds: ["ebookaws", "azurecert", "googlecloud"],
    discount: 0.20,
    coverImage: "/covers/aws.jpg" // Placeholder fallback
  },
  {
    id: "career-pack",
    title: "Career Accelerator",
    description: "Gestión y Negocio. PMP + MBA para liderar con autoridad.",
    productIds: ["ebookpmp", "ebookmba"],
    discount: 0.15,
    coverImage: "/covers/pmp.jpg" // Placeholder fallback
  },
  {
    id: "mining-tech-pack",
    title: "Mining Tech Expert",
    description: "El pack completo para liderar la minería 4.0. Innovación + Acción + Transformación.",
    productIds: ["mineria-transformacion", "mineria-accion", "mineria-abc"],
    discount: 0.25,
    coverImage: "/covers/mineria-transformacion.jpg" // Placeholder fallback
  }
];

export const CATEGORIES = ["Todos", "Certificaciones Profesionales", "Negocios y Tecnología", "Minería y Tecnología"];

export const TESTIMONIALS = [
  {
    name: "Carlos M.",
    role: "Senior Dev",
    text: "El ebook de AWS fue directo al grano. Aprobé el examen a la primera. Vale cada centavo.",
    rating: 5
  },
  {
    name: "Ana S.",
    role: "Ingeniera de Minas",
    text: "Por fin material actualizado sobre Minería 4.0. El libro de 'Tecnología Minera en Acción' es mi biblia diaria.",
    rating: 5
  },
  {
    name: "David R.",
    role: "CTO Startup",
    text: "El material de IA y MBA cambió mi forma de gestionar el equipo. Contenido premium de verdad.",
    rating: 5
  }
];

export const SPOTIFY_PODCAST_URL = "https://open.spotify.com/show/4rOoJ6Egrf8K2IrywzwOMk";