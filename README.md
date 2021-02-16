# Samba Code Data Visualization

## Folder structure

Under 'src' directory.
'projects' folder is for overall projects such as a weather application or stock tracker.
'charts' contains all chart components.
'chartElements' contains things like chart axes and labels.
'chartTypes' contains components for different chart types - bar chart, scatter plot, line chart, but only the key components - a line for the line chart, bars for the bar chart.
'utils' is a file of useful utility functions.
'v12s' are complete charts combining chartTypes and chartElements - for example a bar chart with axes and labels. Anything in v12s should be usable for a project by just adding props.
