USE french_tutor;

INSERT IGNORE INTO courses
  (id, title, level, description, duration, lesson_count, instructor, cover_color, price, rating, student_count, tags)
VALUES
  ('fr-101', 'French for Absolute Beginners', 'beginner',
   'Start from zero with basic greetings, numbers, and everyday phrases. Perfect for those with no prior French knowledge.',
   '6 weeks', 24, 'Dr. Beumo Lesly', '#D4E9E2', 49.00, 4.8, 3241,
   '["Pronunciation","Vocabulary","Greetings"]'),

  ('fr-102', 'Everyday French Conversations', 'beginner',
   'Build confidence in daily situations — shopping, dining, and navigating a French-speaking city.',
   '8 weeks', 32, 'Dr. Beumo Lesly', '#C6E5DE', 69.00, 4.7, 2108,
   '["Speaking","Listening","Daily Life"]'),

  ('fr-201', 'French Grammar Mastery', 'intermediate',
   'Dive deep into verb conjugations, subjunctive mood, and complex sentence structures.',
   '10 weeks', 40, 'Dr. Beumo Lesly', '#9DD4CA', 89.00, 4.9, 1874,
   '["Grammar","Writing","Conjugation"]'),

  ('fr-202', 'French Business & Professional', 'intermediate',
   'Master the language of French boardrooms — emails, presentations, and networking vocabulary.',
   '8 weeks', 30, 'Dr. Beumo Lesly', '#73C3B5', 99.00, 4.6, 987,
   '["Business","Writing","Professional"]'),

  ('fr-301', 'TEF Canada Preparation', 'advanced',
   'Targeted preparation for the TEF Canada exam — listening, reading, writing, and speaking modules with timed practice.',
   '10 weeks', 40, 'Dr. Beumo Lesly', '#49B2A1', 119.00, 4.9, 1430,
   '["TEF","Exam Prep","Canada Immigration"]'),

  ('fr-302', 'DELF B2 Exam Preparation', 'advanced',
   'Targeted preparation for the DELF B2 diploma — past papers, timed exercises, and expert feedback.',
   '10 weeks', 38, 'Dr. Beumo Lesly', '#1F6F5F', 129.00, 4.9, 562,
   '["DELF","Exam Prep","Certification"]');
