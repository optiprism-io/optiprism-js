export const Event = {
  page: 'page',
  click: 'click',
} as const

export type EventName = typeof Event[keyof typeof Event]
