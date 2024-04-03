export type PropertyName = string
export type PropertyValue = string | number | boolean | null

export interface Persist {
  properties?: Map<PropertyName, PropertyValue>
  deviceId?: string
  groupKey?: string
  groups?: Map<string, string>
  sessionId?: number
  anonymousId?: string
  userId?: string
  optedOut: boolean
}

export interface User {
  appendToList(data: Map<PropertyName, PropertyValue>): void
  removeFromList(data: Map<PropertyName, PropertyValue>): void
  increment(data: Map<PropertyName, number>): void
  decrement(data: Map<PropertyName, number>): void
  set(data: Map<PropertyName, PropertyValue>): void
  setOnce(data: Map<PropertyName, PropertyValue>): void
  unset(properties: PropertyName[]): void
  identify(userId: string, props?: Map<PropertyName, PropertyValue>): void
  alias(newId: string, oldId: string): void
  optOut(): void
  optIn(): void
}

export interface Group {
  identify(groupType: string, groupId: string, props?: Map<PropertyName, PropertyValue>): void
  appendToList(groupType: string, data: Map<PropertyName, PropertyValue>): void
  removeFromList(groupType: string, data: Map<PropertyName, PropertyValue>): void
  increment(groupType: string, data: Map<PropertyName, number>): void
  decrement(groupType: string, data: Map<PropertyName, number>): void
  set(groupType: string, groupId: string, data: Map<PropertyName, PropertyValue>): void
  setOnce(groupType: string, groupId: string, data: Map<PropertyName, PropertyValue>): void
  unset(groupType: string, properties: PropertyName[]): void
}
