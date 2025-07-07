declare module '*.css'

interface FreighterWindow {
  signTransaction?: (xdr: string, network: string) => Promise<string>;
  requestAccess?: () => Promise<string>;
  getNetwork?: () => Promise<string>;
}

interface Window {
  freighter?: FreighterWindow;
}
