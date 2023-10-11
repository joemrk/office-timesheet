export enum TimesheetStatus {
  PRESENT = 'PRESENT',
  LATENESS = 'LATENESS',
  OVERTIME = 'OVERTIME',
  MISSING = 'MISSING',
  HOSPITAL = 'HOSPITAL',
  VACATION = 'VACATION',
  REMOTE = 'REMOTE',
}

// PRESENT - have one or more events
// LATENESS - firs event after 10am
// OVERTIME last event after 7pm
// MISSING - no events
// HOSPITAL, VACATION, REMOTE - manual
