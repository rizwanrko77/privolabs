/**
 * PrivoLabs — SEO Utilities
 * Source: 01-ARCHITECTURE.md §7
 *
 * Meta tag builders and structured data generators.
 * Domain: privolabs.com
 */

export interface PageMeta {
  title: string;           // Under 60 characters
  description: string;     // Under 160 characters
  canonical?: string;      // Full URL — defaults to current path
  ogImage?: string;        // Open Graph image URL
  ogType?: string;         // 'website' | 'article'
  noIndex?: boolean;
}

const SITE_URL = 'https://privolabs.com';
const SITE_NAME = 'PrivoLabs Technologies';

/**
 * Build the full canonical URL from a path.
 */
export function canonicalUrl(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${clean}`;
}

/**
 * Build the page title with site name suffix.
 */
export function pageTitle(title: string): string {
  if (title === SITE_NAME) return title;
  return `${title} | ${SITE_NAME}`;
}

/**
 * §7.2 Organization structured data
 * Omits properties whose tokens are unfilled rather than emitting empty strings.
 */
export function organizationSchema(tokens?: {
  phone?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    country?: string;
  };
  founder?: {
    name?: string;
  };
}): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    sameAs: [
      'https://www.linkedin.com/company/privolabs',
      'https://www.youtube.com/@privolabs',
      'https://www.instagram.com/privolabs',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@privolabs.com',
      contactType: 'sales',
    },
  };

  // Only include address if tokens are supplied (not {{TOKEN}})
  if (tokens?.phone && !tokens.phone.startsWith('{{')) {
    (schema.contactPoint as Record<string, unknown>).telephone = tokens.phone;
  }

  if (tokens?.address?.line1 && !tokens.address.line1.startsWith('{{')) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: [tokens.address.line1, tokens.address.line2]
        .filter(Boolean)
        .join(', '),
      ...(tokens.address.city && !tokens.address.city.startsWith('{{')
        ? { addressLocality: tokens.address.city }
        : {}),
      ...(tokens.address.country && !tokens.address.country.startsWith('{{')
        ? { addressCountry: tokens.address.country }
        : {}),
    };
  }

  if (tokens?.founder?.name && !tokens.founder.name.startsWith('{{')) {
    schema.founder = {
      '@type': 'Person',
      name: tokens.founder.name,
    };
  }

  return schema;
}

/**
 * §7.2 WebSite structured data
 */
export function websiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  };
}

/**
 * §7.2 BreadcrumbList structured data
 */
export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

/**
 * §7.2 Service structured data
 */
export function serviceSchema(service: {
  name: string;
  description: string;
  url: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: canonicalUrl(service.url),
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
  };
}

/**
 * §7.2 Article structured data
 */
export function articleSchema(article: {
  title: string;
  description: string;
  url: string;
  publishedAt: Date;
  updatedAt?: Date;
  author: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: canonicalUrl(article.url),
    datePublished: article.publishedAt.toISOString(),
    ...(article.updatedAt
      ? { dateModified: article.updatedAt.toISOString() }
      : {}),
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
  };
}
