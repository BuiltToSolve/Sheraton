import { TopStats } from './components/TopStats';
import { RoomAvailability } from './components/RoomAvailability';
import { ReservationChart } from './components/ReservationChart';
import { QuickAccess } from './components/QuickAccess';
import { ServiceRequests } from './components/ServiceRequests';
import { GuestPurpose } from './components/GuestPurpose';
import { CurrentBooking } from './components/CurrentBooking';
import { HotelOccupancy } from './components/HotelOccupancy';
import { BookingTrends } from './components/BookingTrends';
import { GuestList } from './components/GuestList';
import { BookingSource } from './components/BookingSource';
import { RevenueSummary } from './components/RevenueSummary';
import { GuestOrigins } from './components/GuestOrigins';
import { VisitorsChart } from './components/VisitorsChart';
import { CustomerReview } from './components/CustomerReview';

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#27272a] hover:bg-[#3f3f46] text-white rounded-lg transition-colors font-medium text-sm">
            Download Report
          </button>
          <button className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg transition-colors font-medium text-sm">
            New Booking
          </button>
        </div>
      </div>

      <TopStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <RoomAvailability />
        </div>
        <div className="lg:col-span-2">
          <ReservationChart />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <QuickAccess />
        <ServiceRequests />
        <GuestPurpose />
      </div>

      <CurrentBooking />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HotelOccupancy />
        <BookingTrends />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <GuestList />
        </div>
        <div className="lg:col-span-2">
          <BookingSource />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RevenueSummary />
        <GuestOrigins />
        <VisitorsChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CustomerReview />
        </div>
      </div>
    </div>
  );
}
