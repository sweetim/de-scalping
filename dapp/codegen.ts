import { CodegenConfig } from "@graphql-codegen/cli"

import "dotenv/config"

const { VITE_GRAPH_QUERY_URL } = process.env

const config: CodegenConfig = {
  schema: VITE_GRAPH_QUERY_URL,
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: [ "src/**/*.{ts,tsx}" ],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
