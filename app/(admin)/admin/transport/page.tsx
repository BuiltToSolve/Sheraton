import { TransportClient } from "./transport-client";
import { getVehicles, getAvailableDrivers } from "./actions";

export const dynamic = 'force-dynamic';

export default async function TransportPage() {
  const [vehicles, availableDrivers] = await Promise.all([
    getVehicles(),
    getAvailableDrivers()
  ]);

  return <TransportClient initialVehicles={vehicles} availableDrivers={availableDrivers} />;
}
