import { Fragment } from 'react';

import { getEventById, getAllEvents } from '../../api/eventApi';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

function EventDetailPage(props) {
  const { event } = props;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const { eventId } = context.params;

  const event = await getEventById(eventId);

  console.log(event);

  return {
    props: {
      event,
    },
  };
}

export async function getStaticPaths() {
  const allEvents = await getAllEvents();

  return {
    paths: allEvents.map((e) => ({ params: { eventId: e.id } })),
    fallback: false,
  };
}

export default EventDetailPage;
