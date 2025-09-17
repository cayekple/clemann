import React from 'react';

// A simple, accessible list of tasks for a wedding invite website
// Kept static to satisfy the requirement with minimal app impact.
export default function WeddingTasks() {
  const tasks: string[] = [
    'Choose a custom domain and hosting',
    'Design the landing page (hero, couple intro, date & venue)',
    'Create the RSVP form and confirmation flow',
    'Add event schedule and locations (with maps links)',
    'Publish accommodation and travel info',
    'List registry and gifting options',
    'Include dress code and FAQs',
    'Set up photo sharing instructions (hashtag, upload link)',
    'Add contact details for questions',
    'Optimize for mobile and accessibility',
    'Set up analytics and basic SEO',
    'Test, deploy, and share the invite link'
  ];

  return (
    <section aria-labelledby="wedding-tasks-heading">
      <h2 id="wedding-tasks-heading">Wedding Invite Website Tasks</h2>
      <ul>
        {tasks.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </section>
  );
}
