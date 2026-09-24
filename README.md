# 🏨 Hotel Samrat Sheraton — Enterprise Hotel PMS & Guest Experience Platform

A state-of-the-art, full-stack Hotel Property Management System (PMS) and luxury guest-facing web application built for **Hotel Samrat Sheraton** (Varanasi, India). Engineered with **Next.js 16 (App Router)**, **React 19**, **Prisma ORM**, and **PostgreSQL**, this platform bridges front-desk operations, back-of-house hospitality logistics, and high-conversion guest bookings into a unified, high-performance architecture.

---

## 🌟 Architecture & Creative Highlights

This platform is not just a standard CRUD dashboard or static landing page. It is an enterprise-grade hospitality operating system with advanced real-world features:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       HOTEL SAMRAT SHERATON PLATFORM                        │
├──────────────────────────────────────┬──────────────────────────────────────┤
│        PUBLIC GUEST PORTAL           │       ADMIN & OPERATIONS PMS         │
│  • Next.js App Router (RSC + SSR)    │  • Multi-Folio Tax Invoicing (GST)   │
│  • Dynamic Booking & Room Showcase   │  • Transactional Check-In / Out      │
│  • Interactive Facilities & Dining   │  • Housekeeping Turnover Automation  │
│  • Banquet & Event RFP Engine        │  • Restaurant POS & KOT Kitchen Disp │
│  • Concierge Transport Booking       │  • Vehicle Fleet & Driver Dispatch   │
└──────────────────────────────────────┴──────────────────────────────────────┘
                                       │
                         PRISMA 5 + POSTGRESQL (SUPABASE)
```

### 💎 What Makes This System Advanced & Unique:
1. **Automated Post-Checkout Room Turnover Lifecycle**: 
   When the front desk executes a guest check-out, an ACID database transaction simultaneously closes the reservation, marks the room as `Cleaning` and `Dirty`, and generates an urgent `PostCheckout` housekeeping task with a 9-point sanitization checklist ready for supervisor dispatch.
2. **Indian Statutory Hospitality GST & Multi-Folio Engine**:
   Intelligent tax slab calculator automatically applies Indian hospitality GST rules: below ₹7,500/night is taxed at 5% GST (2.5% CGST + 2.5% SGST under SAC `996311`), while ₹7,500/night and above is taxed at 18% GST (9% CGST + 9% SGST). F&B orders are locked to 5% GST (SAC `996331`), and banquets to 18% GST (SAC `997212`).
3. **Multi-Folio Invoicing Architecture**:
   Guests can maintain multiple distinct folios: `ADVANCE_DEPOSIT`, `ROOM_STAY`, `DINING`, and `FINAL_CHECKOUT`. Includes real-time balance calculations, payment breakdowns, and automated client-side vector PDF invoice generation using jsPDF & HTML2Canvas.
4. **Banquet Conflict Engine with Operational Buffers**:
   Prevents double bookings for halls and event lawns by calculating mathematical schedule overlaps with mandatory 2-hour setup and 1-hour teardown operational turnover buffers.
5. **Hybrid Media Storage & Client-Side Image Compression**:
   Dual image upload subsystem supporting direct URLs or direct file uploads. Uploaded images are automatically compressed in a Web Worker using `browser-image-compression` to minimize bandwidth and storage, before uploading via a resilient storage adapter that seamlessly switches between Vercel Blob, local disk storage, and base64 fallbacks.
6. **Granular Role-Based Access Control (RBAC)**:
   Module-level security with 5 hierarchical roles (`SUPERADMIN`, `ADMIN`, `MANAGER`, `RECEPTIONIST`, `STAFF`) enforcing permission checks across 9 operational modules.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | **Next.js 16** (App Router, Server Components, Server Actions) |
| **UI Library** | **React 19**, **Tailwind CSS 3**, **Radix UI**, **Framer Motion 12** |
| **Database & ORM** | **PostgreSQL** (Supabase), **Prisma ORM 5.22** |
| **Icons & Design** | **Lucide React**, **Sonner** (Toast notifications), **Vaul** (Drawers) |
| **Forms & Validation** | **React Hook Form**, **Zod 3** |
| **Document Generation**| **jsPDF**, **html2canvas**, **ExcelJS**, **FileSaver** |
| **Media & Storage** | **Vercel Blob**, **browser-image-compression**, Node.js File System |
| **Authentication** | Custom Session Tokens via **Jose** (JWT) & HTTP-only cookies |
| **Language** | **TypeScript 5** (Strict mode) |

---

## 📋 Comprehensive Feature Breakdown

### 1. Front Desk & Room Reservations (PMS)
* **Visual Room Matrix**: Real-time room status grid categorized by floor and room type (`Standard`, `Deluxe`, `Super Deluxe`, `Family Suite`).
* **Room State Machine**: Synchronized state management across `RoomStatus` (`Available`, `Occupied`, `Cleaning`, `Maintenance`) and `HKStatus` (`Clean`, `Dirty`, `Inspected`).
* **Hospitality Meal Plans**:
  * **EP (European Plan)**: Room only.
  * **CP (Continental Plan)**: Room + Daily Breakfast Buffet.
  * **MAP (Modified American Plan)**: Room + Breakfast + Dinner.
  * **AP (American Plan)**: Full Board (All 3 meals included).
* **Walk-In & Online Check-In**:
  * Guest identity verification with ID type & document number.
  * Live camera snapshot capture or file upload for ID proofs.
  * Digital registration card generation.

### 2. Housekeeping & Turnover Management (`HKTask`)
* **Task Automation**: Automated ticket creation upon room checkout.
* **Staff Dispatch**: Direct foreign key relation linking tasks to `StaffMember.id` (`onDelete: SetNull`).
* **Interactive Checklist Drawer**: Pre-configured templates with real-time checkbox toggling:
  * `PostCheckout` (9 points)
  * `DailyClean` (6 points)
  * `TurndownService` (5 points)
  * `DeepClean` (8 points)
  * `PreCheckin` (6 points)
  * `Maintenance` (5 points)
* **Status Progression**: One-click status lifecycle (`Pending` $\rightarrow$ `InProgress` $\rightarrow$ `Done` $\rightarrow$ `Inspected`) with automated room clean status sync.

### 3. Food & Beverage (F&B) POS & Dining
* **Table & Room Service Orders**: Quick order entry with real-time Kitchen Order Ticket (KOT) generation.
* **Menu Engineering**: Items categorized by meal types, dietary tags (`Veg`, `NonVeg`, `Egg`, `Vegan`), preparation times, calorie counts, and food allergens.
* **Folio Transfer**: Seamlessly route dining bills directly to guest room invoices.

### 4. Banquet, Conventions & Event Management
* **Venues**: Grand Ballroom (500+ pax), Conference Hall (150 pax), Boardroom (25 pax), Rooftop Terrace (200 pax), and Poolside Lawn (350 pax).
* **Catering Packages**: Dynamic price-per-person calculation with menu customizers.
* **Schedule Collision Guard**: Automatic validation against existing bookings including 2-hour pre-event setup and 1-hour post-event breakdown intervals.

### 5. Transport Fleet & Concierge Transfers
* **Vehicle Fleet Tracking**: Luxury sedans, airport shuttles, and executive SUVs.
* **Driver Dispatch**: Shift assignment, contact details, and pickup/drop scheduling.
* **Transfer Billing**: Airport and railway station pickup/drop billing integrated into guest folios.

### 6. Public Guest Website & Brand Experience
* **Next-Gen Aesthetics**: High-end luxury typography, gold & navy palette, dynamic ambient lighting effects.
* **Live Facilities Showcase**: Reads directly from database `Service` table with image lightbox, Lucide icons, and real-time maintenance indicators.
* **Room Showcase & Booking Engine**: Availability search, amenity breakdowns, and reservation inquiry flow.
