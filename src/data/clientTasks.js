export const clientTasks = [
  { id: 1, name: "Project Overview", status: "completed", dependsOn: [] },
  { id: 2, name: "First Cut Volumes & Cost", status: "completed", dependsOn: [1] },
  { id: 3, name: "Payment Receipt", status: "completed", dependsOn: [2] },
  { id: 4, name: "Booked Order Overview", status: "completed", dependsOn: [3] },
  { id: 5, name: "PDI Report", status: "completed", dependsOn: [4] },
  { id: 6, name: "2D Detailed Drawing", status: "completed", dependsOn: [5] },
  { id: 7, name: "3D Illustration", status: "completed", dependsOn: [6] },
  { id: 8, name: "Approved Production Blueprints", status: "pending", dependsOn: [7] },
  { id: 9, name: "Factory Production Tracking", status: "pending", dependsOn: [8] },
  { id: 10, name: "Site Work Progress Update", status: "pending", dependsOn: [9] },
  { id: 11, name: "Project Portfolio", status: "pending", dependsOn: [10] },
  { id: 12, name: "Download Guarantee Certificate", status: "pending", dependsOn: [11] },
];
