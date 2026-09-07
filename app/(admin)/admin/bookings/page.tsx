import { getBookings } from "./actions";
import BookingsClient from "./bookings-client";

export default async function BookingsPage() {
  const bookings = await getBookings();
  
  return <BookingsClient initialBookings={bookings} />;
}
