import transport from './transport'
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
  trackEvent: async (body: TrackEventRequest) =>
    await transport().dispatch(
      `${store.config.serverUrl}/ingest/${store.config.token}/track`,
      body
    ),

  /* TODO: Correct urls */
  trackPage: async (body: TrackPageRequest) =>
    await transport().dispatch(`${store.config.serverUrl}/projects/track/page`, body),
  trackClick: async (body: TrackClickRequest) =>
    await transport().dispatch(`${store.config.serverUrl}/projects/track/click`, body),

  trackUserIdentify: async (body: IdentifyUserRequest, id: string | number) =>
    await transport().dispatch(
      `${store.config.serverUrl}/projects/track/user/${id}/identify`,
      body
    ),
  trackUserSet: async (body: UpdateUserRequest, id: string | number) =>
    await transport().dispatch(`${store.config.serverUrl}/projects/track/user/${id}`, body, 'put'),
  trackUserAlias: async (body: AliasUserRequest, id: string | number) =>
    await transport().dispatch(`${store.config.serverUrl}/projects/track/user/${id}/alias`, body),
  trackUserOptIn: async (body: {}, id: string | number) =>
    await transport().dispatch(`${store.config.serverUrl}/projects/track/user/${id}/opt-in`, body),
  trackUserOptOut: async (body: {}, id: string | number) =>
    await transport().dispatch(`${store.config.serverUrl}/projects/track/user/${id}/opt-out`, body),

  trackGroupIdentify: async (
    body: IdentifyGroupRequest,
    key: string | number,
    id: string | number
  ) =>
    await transport().dispatch(
      `${store.config.serverUrl}/projects/track/group/${key}/${id}/identify`,
      body
    ),
  trackGroupSet: async (body: UpdateGroupRequest, key: string | number, id: string | number) =>
    await transport().dispatch(
      `${store.config.serverUrl}/projects/track/group/${key}/${id}`,
      body,
      'put'
    ),
}
