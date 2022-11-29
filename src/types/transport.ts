export enum TransportType {
  XHR = 'xhr',
  SendBeacon = 'beacon',
}

export interface TrackOptions {
  transport: TransportType
}
