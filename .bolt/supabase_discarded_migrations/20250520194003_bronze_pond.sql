-- Query first 10 rows from agenda table
SELECT id, title, category, day, time, description, format, goals, labels, room, target_audience
FROM agenda
LIMIT 10;