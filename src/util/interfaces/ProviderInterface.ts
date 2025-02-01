interface ProviderCategory {
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

interface Provider {
  link?: string;
  flatrate?: ProviderCategory[]
  buy?: ProviderCategory[]
  rent?: ProviderCategory[]
  free?: ProviderCategory[]
}

interface WatchProvidersResponse {
  [countryCode: string]: Provider;
}