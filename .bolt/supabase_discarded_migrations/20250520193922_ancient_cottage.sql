/*
  # Insert Conference Agenda Data
  
  This migration inserts the conference agenda data into the agenda table.
  The data includes session information for both days of the conference.
*/

INSERT INTO agenda (id, title, category, day, time, description, format, goals, labels, target_audience)
VALUES
(1, 'Opening by Philippe Metzger, Sergio Mujica, Seizo ONOE, Stela Mocan, Alain Labrique, and Daniel Goldscheider',
 'Keynote', 'Day 1', '09:00 - 09:45',
 'Opening ceremony and welcome remarks from key leaders',
 'Keynote',
 'Set the vision for global digital collaboration',
 'keynote,opening',
 'All attendees'),

(2, 'Updates from around the world',
 'Panel', 'Day 1', '10:00 - 11:30',
 'Organized by European Commission, Bundesamt für Justiz BJ, TSA, IMDA, Digital Agency Japan, Ministry of Electronics and Information Technology, Korea Internet & Security Agency, Austroads, and World Bank Group',
 'Panel Discussion',
 'Share progress and updates on digital infrastructure initiatives',
 'government,infrastructure',
 'Policy makers, Government representatives'),

(3, 'Updates on major use cases',
 'Presentations', 'Day 1', '11:45 - 13:00',
 'Driving Licenses, Travel Credentials, Health Credentials, Educational Credentials, Trade, Payments, Organizations and businesses, Digital Assets for DPI',
 'Presentations',
 'Showcase real-world implementations and use cases',
 'use-cases,implementation',
 'Technical leaders, Implementation teams'),

(4, 'Standards for ID and wallets',
 'Workshop', 'Day 1', '14:00 - 15:30',
 'Presentations by CSC, DIF, EC, ETSI, FIDO Alliance, ISO, OWF',
 'Workshop',
 'Align on standards and specifications',
 'standards,technical',
 'Standards bodies, Technical architects'),

(5, 'Deep dives on credential formats, authentication, standards, platform requirements, and interoperability challenges',
 'Technical', 'Day 1', '15:45 - 17:00',
 'Technical deep dives into core challenges and solutions',
 'Breakout Sessions',
 'Address technical implementation challenges',
 'technical,deep-dive',
 'Developers, Technical teams');