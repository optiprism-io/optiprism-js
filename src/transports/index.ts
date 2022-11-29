import transport from './transport'
import { TrackPageRequest, TrackEventRequest, TrackClickRequest, IdentifyUserRequest } from '../types'

export const trackService = {
    trackPage: async (body: TrackPageRequest) => await transport().dispatch('/track/page', body),
    trackEvent: async (body: TrackEventRequest) => await transport().dispatch('/track/event', body),
    trackClick: async (body: TrackClickRequest) => await transport().dispatch('/track/click', body),
    trackUserIdentify: async (body: IdentifyUserRequest, id: string | number) => await transport().dispatch(`/track/user/${id}/identify`, body),
}
