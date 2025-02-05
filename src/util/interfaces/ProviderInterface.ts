interface ProviderCategory {
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

interface Provider {
  map(arg0: (provider: any) => React.JSX.Element | null): any;
  link?: string;
  flatrate?: ProviderCategory[]
  buy?: ProviderCategory[]
  rent?: ProviderCategory[]
  free?: ProviderCategory[]
}

interface WatchProvidersResponse {
  [countryCode: string]: Provider;
}