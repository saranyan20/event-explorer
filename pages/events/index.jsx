import React from 'react';
import { getFeaturedEvents } from '../../dummy-data';

const AllEventsPage = () => {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <EventItem items={featuredEvents} />
    </div>
  );
};

export default AllEventsPage;
