export const Event = {
  page: 'page',
  click: 'click',
} as const

export const EventType = {
  track: 'track',
} as const

export type EventName = typeof Event[keyof typeof Event]
export type IEventType = typeof EventType[keyof typeof EventType]
