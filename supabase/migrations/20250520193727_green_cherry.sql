/*
  # Insert Conference Agenda Data

  1. Changes
    - Insert agenda items for day 1 (July 1, 2025)
    - Insert agenda items for day 2 (July 2, 2025)
    - Set appropriate time slots and formats
    - Add descriptions and goals

  2. Data Structure
    - Each agenda item includes:
      - Title
      - Time slot
      - Format
      - Description
      - Goals (where applicable)
*/

-- Insert Day 1 agenda items (July 1, 2025)
INSERT INTO agenda_items 
(day, start_time, end_time, title, subtitle, description, format, goals, status, labels)
VALUES
(1, '09:00', '09:45', 
 'Opening Ceremony', 
 'Welcome and Introduction',
 'Opening remarks by Philippe Metzger, Sergio Mujica, Seizo ONOE, Stela Mocan, Alain Labrique, and Daniel Goldscheider',
 'Keynote',
 ARRAY['Set the vision for global digital collaboration', 'Highlight key challenges and opportunities'],
 'confirmed',
 ARRAY['keynote', 'opening']),

(1, '10:00', '11:30',
 'Global Updates: Digital Public Infrastructure Progress',
 'Updates from around the world',
 'Comprehensive updates from major government and international organizations on digital public infrastructure initiatives. Featuring presentations from European Commission, Bundesamt für Justiz BJ, TSA, IMDA, Digital Agency Japan, Ministry of Electronics and Information Technology, Korea Internet & Security Agency, Austroads, and World Bank Group.',
 'Panel Discussion',
 ARRAY['Share progress on digital infrastructure initiatives', 'Identify common challenges and solutions', 'Foster international collaboration'],
 'confirmed',
 ARRAY['government', 'infrastructure']),

(1, '11:45', '13:00',
 'Major Use Cases in Digital Trust',
 'From Theory to Practice',
 'Deep dive into real-world applications including driving licenses, travel credentials, health credentials, educational credentials, trade documentation, payments, organizational trust, and digital assets for DPI.',
 'Presentations',
 ARRAY['Showcase successful implementations', 'Share lessons learned', 'Identify best practices'],
 'confirmed',
 ARRAY['use-cases', 'implementation']),

(1, '14:00', '15:30',
 'Standards Alignment Workshop',
 'Harmonizing Global Standards',
 'Interactive workshop featuring presentations and discussions by CSC, DIF, EC, ETSI, FIDO Alliance, ISO, and OWF on aligning standards for digital identity and wallets.',
 'Workshop',
 ARRAY['Align on common standards', 'Address interoperability challenges', 'Define next steps'],
 'confirmed',
 ARRAY['standards', 'technical']),

(1, '15:45', '17:00',
 'Technical Deep Dives',
 'Addressing Core Challenges',
 'Parallel sessions focusing on credential formats, authentication mechanisms, platform requirements, and interoperability challenges.',
 'Breakout Sessions',
 ARRAY['Solve technical challenges', 'Share implementation experiences', 'Build technical consensus'],
 'confirmed',
 ARRAY['technical', 'deep-dive']);

-- Insert Day 2 agenda items (July 2, 2025)
INSERT INTO agenda_items 
(day, start_time, end_time, title, subtitle, description, format, goals, status, labels)
VALUES
(2, '09:00', '10:30',
 'Future of Digital Identity',
 'Vision and Roadmap',
 'Strategic discussion on the evolution of digital identity systems, focusing on user-centric design, privacy, and global interoperability.',
 'Panel Discussion',
 ARRAY['Define future vision', 'Identify key priorities', 'Align on action items'],
 'confirmed',
 ARRAY['strategy', 'identity']),

(2, '10:45', '12:15',
 'Implementation Workshops',
 'Hands-on Technical Sessions',
 'Parallel technical workshops covering wallet implementation, credential issuance, verification protocols, and security considerations.',
 'Workshop',
 ARRAY['Share technical knowledge', 'Address implementation challenges', 'Foster developer community'],
 'confirmed',
 ARRAY['technical', 'implementation']),

(2, '13:30', '15:00',
 'Regulatory Landscape and Compliance',
 'Navigating Global Requirements',
 'Expert panel on regulatory requirements, compliance frameworks, and privacy considerations across different jurisdictions.',
 'Panel Discussion',
 ARRAY['Understand regulatory requirements', 'Share compliance strategies', 'Identify common challenges'],
 'confirmed',
 ARRAY['regulatory', 'compliance']),

(2, '15:15', '16:45',
 'Future Collaboration Framework',
 'Building Sustainable Partnerships',
 'Interactive session to establish ongoing collaboration mechanisms, working groups, and action items for continued progress.',
 'Workshop',
 ARRAY['Define collaboration framework', 'Establish working groups', 'Set concrete next steps'],
 'confirmed',
 ARRAY['collaboration', 'planning']),

(2, '16:45', '17:30',
 'Closing Ceremony',
 'Summary and Next Steps',
 'Recap of key outcomes, announcements of initiatives, and closing remarks from organizing committee.',
 'Keynote',
 ARRAY['Summarize key outcomes', 'Announce new initiatives', 'Set future direction'],
 'confirmed',
 ARRAY['closing', 'summary']);