import { Transport } from './transport'
import {
  AliasUserRequest,
  IdentifyGroupRequest,
  IdentifyUserRequest,
  TrackClickRequest,
  TrackEventRequest,
  TrackPageRequest,
  UpdateGroupRequest,
  UpdateUserRequest,
} from '../types'
import { store } from '../store'

export const trackService = {
  trackEvent: (body: TrackEventRequest) =>
    Transport.sendBeacon(`${store.config.serverUrl}/ingest/${store.config.token}/track`, body),

  /* TODO: Correct urls */
  trackPage: (body: TrackPageRequest) =>
    Transport.sendBeacon(`${store.config.serverUrl}/projects/track/page`, body),
  trackClick: (body: TrackClickRequest) =>
    Transport.sendBeacon(`${store.config.serverUrl}/projects/track/click`, body),

  trackUserIdentify: (body: IdentifyUserRequest, id: string | number) =>
    Transport.sendBeacon(`${store.config.serverUrl}/projects/track/user/${id}/identify`, body),
  trackUserSet: (body: UpdateUserRequest, id: string | number) =>
    Transport.dispatch(`${store.config.serverUrl}/projects/track/user/${id}`, body, 'put'),
  trackUserAlias: (body: AliasUserRequest, id: string | number) =>
    Transport.sendBeacon(`${store.config.serverUrl}/projects/track/user/${id}/alias`, body),
  trackUserOptIn: (body: {}, id: string | number) =>
    Transport.sendBeacon(`${store.config.serverUrl}/projects/track/user/${id}/opt-in`, body),
  trackUserOptOut: (body: {}, id: string | number) =>
    Transport.sendBeacon(`${store.config.serverUrl}/projects/track/user/${id}/opt-out`, body),

  trackGroupIdentify: (body: IdentifyGroupRequest, key: string | number, id: string | number) =>
    Transport.sendBeacon(
      `${store.config.serverUrl}/projects/track/group/${key}/${id}/identify`,
      body
    ),
  trackGroupSet: (body: UpdateGroupRequest, key: string | number, id: string | number) =>
    Transport.dispatch(`${store.config.serverUrl}/projects/track/group/${key}/${id}`, body, 'put'),
}
