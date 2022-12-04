import transport from './transport'
import { TrackPageRequest, TrackEventRequest, TrackClickRequest, IdentifyUserRequest, IdentifyGroupRequest } from '../types'
import store from '../utils/store'

export const trackService = {
    trackPage: async (body: TrackPageRequest) => await transport().dispatch(`${store.config.serverUrl}/track/page`, body),
    trackEvent: async (body: TrackEventRequest) => await transport().dispatch(`${store.config.serverUrl}/track/event`, body),
    trackClick: async (body: TrackClickRequest) => await transport().dispatch(`${store.config.serverUrl}/track/click`, body),
    trackUserIdentify: async (body: IdentifyUserRequest, id: string | number) => await transport().dispatch(`${store.config.serverUrl}/track/user/${id}/identify`, body),
    trackGroupIdentify: async (body: IdentifyGroupRequest, key: string | number, id: string | number) => await transport().dispatch(`${store.config.serverUrl}/track/group/${key}/${id}/identify`, body),
}
