export const getAllEvents = async () => {
  try {
    const jsonRes = await fetch(
      'https://meetups-explorer-default-rtdb.firebaseio.com/events.json',
    );
    const res = await jsonRes.json();
    if (res.length > 0) return res;
    else return [];
  } catch (err) {
    return [];
  }
};

export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter((e) => e.isFeatured);
};
