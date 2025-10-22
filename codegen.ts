// codegen.ts
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_BACKEND_GRAPHQL_URL || 'http://localhost:3001/graphql',
  documents: 'app/graphql/**/*.graphql',
  generates: {
    './app/graphql/generated/': {
      preset: 'client',
      plugins: [], 
      presetConfig: {
        gqlTagName: 'gql',
        fragmentMasking: false,
      },
      config: {
        
        fetcher: {
          func: '../../common/graphql-fetcher#graphqlFetcher',
          isExternal: true, 
        },
        reactQuery: true, 
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;