import { getStaffMembers } from "./actions";
import { StaffClient } from "./staff-client";

export const dynamic = 'force-dynamic';

export default async function StaffPage() {
  const staffMembers = await getStaffMembers();
  return <StaffClient initialStaff={staffMembers} />;
}
