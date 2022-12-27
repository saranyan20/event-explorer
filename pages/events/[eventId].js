import { Fragment } from 'react';

import { getEventById, getFeaturedEvents } from '../../api/eventApi';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

function EventDetailPage(props) {
  const { event } = props;

  if (!event) {
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
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

  return {
    props: {
      event,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  return {
    paths: events.map((e) => ({ params: { eventId: e.id } })),
    fallback: 'blocking',
  };
}

export default EventDetailPage;
