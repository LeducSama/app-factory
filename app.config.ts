import type { ConfigContext, ExpoConfig } from 'expo/config';

// app.json holds the real configuration. This file only adds the web base path
// when EXPO_BASE_URL is set, which the GitHub Pages workflow does so the site
// works under https://<user>.github.io/<repo>/.
export default ({ config }: ConfigContext): ExpoConfig => {
  const baseUrl = process.env.EXPO_BASE_URL;

  return {
    ...config,
    name: config.name ?? 'App Factory',
    slug: config.slug ?? 'app-factory',
    experiments: {
      ...config.experiments,
      ...(baseUrl ? { baseUrl } : {}),
    },
  };
};
