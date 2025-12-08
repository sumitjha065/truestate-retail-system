// Add this NEW TABLE_COLUMNS
export const TABLE_COLUMNS = [
  { key: "Transaction ID", label: "Transaction ID", sortable: true, width: "120px" },
  { key: "Date", label: "Date", sortable: true, width: "120px" },
  { key: "Customer ID", label: "Customer ID", sortable: false, width: "140px" },
  { key: "Customer Name", label: "Customer Name", sortable: true, width: "160px" },
  { key: "Phone Number", label: "Phone Number", sortable: false, width: "150px" },
  { key: "Gender", label: "Gender", sortable: true, width: "100px" },
  { key: "Age", label: "Age", sortable: true, width: "80px" },
  { key: "Product Category", label: "Product Category", sortable: true, width: "150px" },
  { key: "Quantity", label: "Quantity", sortable: true, width: "100px" },
  { key: "Total Amount", label: "Total Amount", sortable: true, width: "140px" },
  { key: "Discount Percentage", label: "Discount %", sortable: true, width: "100px" },
  { key: "Final Amount", label: "Final Amount", sortable: true, width: "140px" },
  { key: "Customer Region", label: "Customer Region", sortable: true, width: "150px" },
  { key: "Order Status", label: "Order Status", sortable: true, width: "140px" },
];


export const SORT_OPTIONS = [
  { value: 'Date', label: 'Date (Newest First)' },
  { value: 'Quantity', label: 'Quantity (High to Low)' },
  { value: 'Customer Name', label: 'Customer Name (A-Z)' },
];

export const GENDER_OPTIONS = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
];

export const PAYMENT_METHODS = [
  { value: 'UPI', label: 'UPI' },
  { value: 'Credit Card', label: 'Credit Card' },
  { value: 'Debit Card', label: 'Debit Card' },
  { value: 'Cash', label: 'Cash' },
  { value: 'Wallet', label: 'Wallet' },
  { value: 'Net Banking', label: 'Net Banking' },
];

export const ORDER_STATUSES = [
  { value: 'Completed', label: 'Completed' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Cancelled', label: 'Cancelled' },
  { value: 'Returned', label: 'Returned' },
];

export const DELIVERY_TYPES = [
  { value: 'Standard', label: 'Standard' },
  { value: 'Express', label: 'Express' },
  { value: 'Store Pickup', label: 'Store Pickup' },
];

export const DEFAULT_FILTERS = {
  customerRegion: [],
  gender: [],
  ageRange: { min: 0, max: 100 },
  productCategory: [],
  tags: [],
  paymentMethod: [],
  orderStatus: [],
  dateRange: { start: '', end: '' },
};

export const PAGINATION_CONFIG = {
  pageSize: 10,
  maxVisiblePages: 5,
};