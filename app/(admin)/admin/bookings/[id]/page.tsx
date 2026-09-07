import { getBookingById } from "../actions";
import { notFound } from "next/navigation";
import BookingDetailsClient from "./booking-details-client";

export default async function BookingDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const booking = await getBookingById(resolvedParams.id);
  
  if (!booking) {
    notFound();
  }

  return <BookingDetailsClient booking={booking} />;
}
