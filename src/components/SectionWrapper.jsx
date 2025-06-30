import React from 'react';
const SectionWrapper = ({ id, children }) => (
  <section id={id} className="min-h-screen flex items-center justify-center py-20 px-4 fade-in-up">
    {children}
  </section>
);
export default SectionWrapper;