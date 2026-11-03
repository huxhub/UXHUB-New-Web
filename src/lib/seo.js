import contentPages from "@/data/page-metadata";

export const SITE_URL = "https://uxhubglobal.com";

export const ORGANIZATION_DESCRIPTION =
  "UX Hub is a digital product and software development company helping businesses build, launch and grow custom software, SaaS products, e-commerce platforms and digital experiences across India, Saudi Arabia and the GCC.";

export const seoPages = {
  home: {
    path: "/",
    title: "Software Development Company in India & Saudi Arabia | UX Hub",
    description:
      "UX Hub builds custom software, SaaS products, e-commerce platforms and high-converting digital experiences for businesses in India, Saudi Arabia and the GCC.",
  },
  about: {
    path: "/about",
    title: "About UX Hub | Digital Product & Software Company",
    description:
      "Meet UX Hub, a digital product and software company combining strategy, design, technology and growth for businesses in India, Saudi Arabia and the GCC.",
  },
  services: {
    path: "/services",
    title: "Software Development & Digital Growth Services | UX Hub",
    description:
      "Explore custom software development, SaaS and digital product strategy, e-commerce growth, UX/UI design, websites, integrations and analytics from UX Hub.",
  },
  product: {
    path: "/product",
    title: "Competitor Price Monitoring Software for GCC | UX Hub",
    description:
      "Monitor competitor prices across GCC e-commerce markets, receive price-change alerts and make faster pricing decisions with UXHUB Pricing Super Intelligence.",
  },
  "product-growth": {
    path: "/product-growth",
    title: "SaaS & Digital Product Development Company | UX Hub",
    description:
      "Take software and digital products from idea to market with product strategy, discovery, MVP validation, go-to-market, analytics, roadmaps and scalable growth.",
  },
  "e-commerce-growth": {
    path: "/e-commerce-growth",
    title: "E-commerce Development & Growth Company | UX Hub",
    description:
      "Build, optimize and scale D2C and marketplace businesses with e-commerce strategy, Shopify and custom commerce development, CRO and growth analytics.",
  },
  "digital-experience": {
    path: "/digital-experience",
    title: "Web, UX/UI & Custom Software Development | UX Hub",
    description:
      "Create premium websites, e-commerce platforms and custom digital products with UX/UI design, CRM and ERP integrations, analytics and conversion-focused development.",
  },
  markets: {
    path: "/markets",
    title: "Software & Digital Growth Company in India and KSA | UX Hub",
    description:
      "UX Hub helps businesses build software, launch digital products and grow e-commerce operations across India, Saudi Arabia and the wider GCC market.",
  },
  contact: {
    path: "/contact",
    title: "Start a Software or Digital Product Project | UX Hub",
    description:
      "Talk to UX Hub about custom software, SaaS, websites, e-commerce, UX/UI, product strategy or digital growth projects in India, Saudi Arabia and the GCC.",
  },
  insights: {
    path: "/insights",
    title: "Software, Product & E-commerce Growth Insights | UX Hub",
    description:
      "Read UX Hub perspectives on software products, e-commerce, go-to-market strategy, UX/UI, technology, conversion and digital growth.",
  },
};

// Keep titles, descriptions and discoverable routes in sync with page metadata.
for (const [key, page] of Object.entries(contentPages)) {
  seoPages[key] = {
    ...seoPages[key],
    path: key === "home" ? "/" : `/${key}`,
    title: page.title,
    description: page.description,
  };
}

export const serviceNames = [
  "Custom software development",
  "SaaS product development",
  "Digital product strategy and development",
  "E-commerce and Shopify development",
  "UX and UI design",
  "Website and platform development",
  "CRM and ERP integrations",
  "Product growth and go-to-market strategy",
  "Competitor price monitoring software",
];

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function metadataFor(key) {
  const page = seoPages[key];
  if (!page) return {};

  const url = absoluteUrl(page.path);
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.path,
      languages: {
        en: page.path,
        "x-default": page.path,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: "UX Hub",
      title: page.title,
      description: page.description,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "UX Hub",
    alternateName: "UX Hub Global",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/uxhub_logo.svg`,
    },
    description: ORGANIZATION_DESCRIPTION,
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Place", name: "Gulf Cooperation Council" },
    ],
    knowsAbout: serviceNames,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "UX Hub",
    alternateName: ["UX Hub Global", "UXHUB"],
    description: ORGANIZATION_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}

export function pageSchemas(key) {
  const page = seoPages[key];
  if (!page) return [];

  const url = absoluteUrl(page.path);
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ];

  if (key !== "home") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        ...(key.startsWith("product/") ? [{
          "@type": "ListItem",
          position: 2,
          name: "Products",
          item: absoluteUrl("/product"),
        }] : []),
        {
          "@type": "ListItem",
          position: key.startsWith("product/") ? 3 : 2,
          name: page.title.split(" | ")[0],
          item: url,
        },
      ],
    });
  }

  const serviceKeys = new Set([
    "services",
    "product-growth",
    "e-commerce-growth",
    "digital-experience",
  ]);
  if (serviceKeys.has(key)) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: page.title.split(" | ")[0],
      description: page.description,
      url,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: ["India", "Saudi Arabia", "GCC"],
      serviceType: serviceNames,
    });
  }

  return schemas;
}
