export const Event = {
  page: 'Page',
  click: 'Click',
} as const

export type EventName = (typeof Event)[keyof typeof Event]
