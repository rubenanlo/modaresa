import React, { FC } from "react";
import { DataStoreProvider } from "providers/dataStore";

const RootProviders: FC = ({ children }) => (
  <DataStoreProvider>{children}</DataStoreProvider>
);

export default RootProviders;
