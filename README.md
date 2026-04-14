# Personal Habit Tracker

A lightweight weekly habit tracker built with:

- HTML
- CSS
- Vanilla JavaScript
- localStorage for persistence

The app is designed to replace a spreadsheet-based habit tracking system and provides a fast, minimal interface for daily tracking.

## Current Features

- Dynamic task rows
- Editable task names
- Clickable daily tracking (Mon–Sun)
- Automatic row scoring
- Grand total calculation
- Weekly reset button
- Persistent storage using browser localStorage
- "Other" activity counter with +/- controls
- Automatic restoration of saved data on page reload

## Data Storage

All tracker data is stored locally in the browser using `localStorage`.

Stored keys:

- `habitTracker` – task rows and daily completion state
- `otherCounter` – miscellaneous activity counter

Weekly summaries are stored as snapshots of task scores for each week.
Each week can only be saved once to prevent duplicate records.

## Future Improvements

Potential features under consideration:

- Row deletion
- Backup/export to JSON
- Optional grouping of tasks
- Cross-device syncing


## Thoughts 4/5 to 4/18
* Place to enter dated notes
✔ Button to weekly summaries
* Button to Time/goals worksheet?
* Other rows enter numbers rather than just click (weight and walking)
* Button to credits
* Cloudbase data (firebase?) free for sharing data between devices


## TODO:
* Add export and import data buttons for backup copy of data
* Save weekly score totals and display a top 10 weeks high score first
* Button to special row for tracking weight and displaying week avg wt.
* Develop special row for tracking walk distance
✔ Button to Reset week (clear all clicked boxes green to black) 


## BUGS:
✔ 'Other Button' Doesn't save data. Should save quantity until 'Reset Button' is pressed
