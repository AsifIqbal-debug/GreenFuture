import { DonationPackage, Stat, TreeRecord } from "./types";

export const PRICE_PER_TREE = 100; // BDT

export const MOCK_STATS: Stat[] = [
  { label: "Total Trees Planted", value: "12,456" },
  { label: "Total Donors", value: "842" },
  { label: "CO₂ Offset (Est.)", value: "312.4t", subtext: "Over 10 years" },
];

export const DONATION_PACKAGES: DonationPackage[] = [
  { label: "Birthday Tree", trees: 5, slug: "birthday", description: "Celebrate life" },
  { label: "Anniversary Forest", trees: 10, slug: "anniversary", description: "Grow love" },
  { label: "In Memory", trees: 1, slug: "memory", description: "Living tribute" },
  { label: "Gift a Tree", trees: 3, slug: "gift", description: "Sustainable gift" },
];

export const PRESET_AMOUNTS = [1, 5, 10, 50, 100];

export const MOCK_USER_TREES: TreeRecord[] = [
  {
    id: "TR-8821",
    species: "Mango (Amrapali)",
    plantedAt: "2023-08-15",
    status: "Growing",
    lat: 23.8103,
    lng: 90.4125,
    imageUrl: "https://picsum.photos/400/300?random=101"
  },
  {
    id: "TR-9943",
    species: "Neem",
    plantedAt: "2023-09-02",
    status: "Sapling",
    lat: 24.3636,
    lng: 88.6241,
    imageUrl: "https://picsum.photos/400/300?random=102"
  }
];