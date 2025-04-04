export enum LogLevel {
  Fatal = 0,
  Warnings = 1,
  Normal = 2,
  Info = 3,
  Debug = 4,
  Trace = 5,
  Silent = -999,
  Verbose = 999,
}

export const LogLevelName = Object.fromEntries(
  Object.entries(LogLevel).map(([key, value]) => [value, key])
)
