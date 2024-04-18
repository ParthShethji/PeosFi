import { LensConfig, production, appId } from "@lens-protocol/react-web";

import { bindings as wagmiBindings } from "@lens-protocol/wagmi";

export const lensConfig = {
  appId: appId("zerofi-nyc23"),
  sources: [appId("zerofi-nyc23")],
  bindings: wagmiBindings(),
  environment: production,
};
