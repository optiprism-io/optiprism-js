import transport from './transport'
import {
    TrackPageRequest,
    UpdateGroupRequest,
    TrackEventRequest,
    TrackClickRequest,
    IdentifyUserRequest,
    IdentifyGroupRequest,
    AliasUserRequest,
    UpdateUserRequest,
} from '../types'
import store from '../utils/store'

export const trackService = {
    trackEvent: async (body: TrackEventRequest) => await transport().dispatch(`${store.config.serverUrl}/projects/${store.config.projectId}/track/event`, body),
    trackPage: async (body: TrackPageRequest) => await transport().dispatch(`${store.config.serverUrl}/projects/${store.config.projectId}/track/page`, body),
    trackClick: async (body: TrackClickRequest) => await transport().dispatch(`${store.config.serverUrl}/projects/${store.config.projectId}/track/click`, body),

    trackUserIdentify: async (body: IdentifyUserRequest, id: string | number) => await transport().dispatch(`${store.config.serverUrl}/projects/${store.config.projectId}/track/user/${id}/identify`, body),
    trackUserSet: async (body: UpdateUserRequest, id: string | number) => await transport().dispatch(`${store.config.serverUrl}/projects/${store.config.projectId}/track/user/${id}`, body, 'put'),
    trackUserAlias: async (body: AliasUserRequest, id: string | number) => await transport().dispatch(`${store.config.serverUrl}/projects/${store.config.projectId}/track/user/${id}/alias`, body),
    trackUserOptIn: async (body: {}, id: string | number) => await transport().dispatch(`${store.config.serverUrl}/projects/${store.config.projectId}/track/user/${id}/opt-in`, body),
    trackUserOptOut: async (body: {}, id: string | number) => await transport().dispatch(`${store.config.serverUrl}/projects/${store.config.projectId}/track/user/${id}/opt-out`, body),

    trackGroupIdentify: async (body: IdentifyGroupRequest, key: string | number, id: string | number) => await transport().dispatch(`${store.config.serverUrl}/projects/${store.config.projectId}/track/group/${key}/${id}/identify`, body),
    trackGroupSet: async (body: UpdateGroupRequest, key: string | number, id: string | number) => await transport().dispatch(`${store.config.serverUrl}/projects/${store.config.projectId}/track/group/${key}/${id}`, body, 'put'),
}
