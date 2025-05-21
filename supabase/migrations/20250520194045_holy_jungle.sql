-- Query to show first 10 rows from agenda table
SELECT id, title, category, day, time, description, format, goals, labels, list_of_organizers, list_of_speakers
FROM agenda
LIMIT 10;