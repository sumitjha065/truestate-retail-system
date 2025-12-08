/**
 * @file Transaction.js
 * @description Mongoose model for the 'sales' collection.
 * Defines the schema, indexes, and static methods for advanced searching and filtering.
 */

const mongoose = require("mongoose");

/* ---------------------------------------------
   GETTERS FOR CLEANING RAW MONGODB VALUES
--------------------------------------------- */

/**
 * Type Getter: Converts BSON Long objects to strings for JSON safety.
 * @param {Object|String} v - The raw value from MongoDB.
 * @returns {String} The string representation of the phone number.
 */
const phoneNumberGetter = (v) => {
  if (!v) return "";
  if (v && typeof v === "object" && v.$numberLong) {
    return v.$numberLong.toString();
  }
  return v.toString();
};

// Convert "tag1,tag2" → ["tag1","tag2"]
const tagsGetter = (v) => {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  if (typeof v === "string") {
    return v
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
  }
  return [];
};

/* ---------------------------------------------
   TRANSACTION SCHEMA
--------------------------------------------- */

const transactionSchema = new mongoose.Schema(
  {
    "Transaction ID": { type: Number, required: true, index: true },

    "Date": { type: Date, required: true, index: -1 },

    "Customer ID": { type: String, required: true },

    "Customer Name": { type: String, required: true, index: true },

    "Phone Number": {
      type: mongoose.Schema.Types.Mixed,
      get: phoneNumberGetter,
      index: true,
    },

    "Gender": {
      type: String,
      enum: ["Male", "Female"],
      index: true,
    },

    "Age": { type: Number, min: 0, max: 150, index: true },

    "Customer Region": {
      type: String,
      enum: ["East", "West", "North", "South", "Central"],
      index: true,
    },

    "Customer Type": {
      type: String,
      enum: ["New", "Returning", "Loyal"],
    },

    "Product ID": { type: String, required: true },

    "Product Name": { type: String, required: true },

    "Brand": { type: String },

    "Product Category": { type: String, index: true },

    "Tags": { type: mongoose.Schema.Types.Mixed, get: tagsGetter, index: true },

    "Quantity": { type: Number, min: 0, index: true },

    "Price per Unit": { type: Number, min: 0 },

    "Discount Percentage": { type: Number, min: 0, max: 100 },

    "Total Amount": { type: Number, min: 0 },

    "Final Amount": { type: Number, min: 0 },

    "Payment Method": {
      type: String,
      enum: ["UPI", "Credit Card", "Debit Card", "Cash", "Wallet", "Net Banking"],
      index: true,
    },

    "Order Status": {
      type: String,
      enum: ["Completed", "Pending", "Cancelled", "Returned"],
    },

    "Delivery Type": {
      type: String,
      enum: ["Standard", "Express", "Store Pickup"],
    },

    "Store ID": { type: String },

    "Store Location": { type: String },

    "Salesperson ID": { type: String },

    "Employee Name": { type: String },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

/* ---------------------------------------------
   INDEXES
--------------------------------------------- */

transactionSchema.index({ "Customer Name": 1, "Phone Number": 1 });
transactionSchema.index({ "Date": -1, "Customer Region": 1 });
transactionSchema.index({ "Product Category": 1, "Payment Method": 1 });
transactionSchema.index({ "Tags": 1 });

transactionSchema.virtual("phoneNumberString").get(function () {
  return phoneNumberGetter(this["Phone Number"]);
});

/* ---------------------------------------------
   SEARCH + FILTER + SORT + PAGINATION
--------------------------------------------- */

/**
 * Advanced search method with support for pagination, sorting, and multi-field filtering.
 * 
 * @param {Object} options - Search options.
 * @param {number} [options.page=1] - Current page number.
 * @param {number} [options.limit=10] - Number of items per page.
 * @param {string} [options.search=""] - Search term (Name or Phone).
 * @param {string} [options.sortBy="Date"] - Field to sort by.
 * @param {string} [options.sortOrder="desc"] - Sort direction ('asc' or 'desc').
 * @param {Object} [options.filters={}] - Dictionary of active filters.
 * @returns {Promise<Object>} Object containing transactions array and pagination metadata.
 */
transactionSchema.statics.searchWithFilters = async function ({
  page = 1,
  limit = 10,
  search = "",
  sortBy = "Date",
  sortOrder = "desc",
  filters = {},
}) {
  const query = {};

  // Search logic
  if (search && search.trim() !== "") {
    const s = search.trim();

    query.$or = [
      { "Customer Name": new RegExp(s, "i") },
      {
        $expr: {
          $regexMatch: {
            input: { $toString: "$Phone Number" },
            regex: s,
            options: "i",
          },
        },
      },
    ];
  }

  // filters
  if (filters.customerRegion?.length)
    query["Customer Region"] = { $in: filters.customerRegion };

  if (filters.gender?.length) query["Gender"] = { $in: filters.gender };

  if (filters.ageRange) {
    // We use $expr with $toInt to handle cases where Age might be stored as a String in the DB
    // This ensures numeric comparison works regardless of the field type
    const min = filters.ageRange.min !== undefined ? filters.ageRange.min : 0;
    const max = filters.ageRange.max !== undefined ? filters.ageRange.max : 150;

    // Use $and inside $expr to combine conditions
    query.$expr = {
      $and: [
        // Integer comparison for age filtering
        { $gte: [{ $toInt: "$Age" }, min] },
        { $lte: [{ $toInt: "$Age" }, max] }
      ]
    };
  }

  if (filters.productCategory?.length)
    query["Product Category"] = { $in: filters.productCategory };

  if (filters.tags?.length) query["Tags"] = { $in: filters.tags };

  if (filters.paymentMethod?.length)
    query["Payment Method"] = { $in: filters.paymentMethod };

  if (filters.dateRange && (filters.dateRange.start || filters.dateRange.end)) {
    query["Date"] = {};
    if (filters.dateRange.start) {
      query["Date"].$gte = new Date(filters.dateRange.start);
    }
    if (filters.dateRange.end) {
      query["Date"].$lte = new Date(filters.dateRange.end);
    }
  }

  if (filters.orderStatus?.length)
    query["Order Status"] = { $in: filters.orderStatus };

  // sort
  const sortOptions = {};
  const dir = sortOrder === "asc" ? 1 : -1;

  if (sortBy === "Customer Name") sortOptions["Customer Name"] = dir;
  else if (sortBy === "Quantity") sortOptions["Quantity"] = dir;
  else sortOptions["Date"] = dir;

  const skip = (page - 1) * limit;

  const [transactions, total] = await Promise.all([
    this.find(query)
      .select({
        "Transaction ID": 1,
        "Date": 1,
        "Customer ID": 1,
        "Customer Name": 1,
        "Phone Number": 1,
        "Gender": 1,
        "Age": 1,
        "Customer Region": 1,
        "Product Category": 1,
        "Quantity": 1,
        "Total Amount": 1,
        "Product ID": 1,
        "Employee Name": 1,
      })
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean(),
    this.countDocuments(query),
  ]);

  return {
    transactions,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    },
  };
};

/* ---------------------------------------------
   FILTER OPTIONS FOR DROPDOWNS
--------------------------------------------- */

/**
 * Retrieves all distinct values for filterable fields to populate frontend dropdowns.
 * @returns {Promise<Object>} Object containing arrays of distinct values for each filter category.
 */
transactionSchema.statics.getFilterOptions = async function () {
  const [regions, genders, categories, paymentMethods, orderStatuses, tags] =
    await Promise.all([
      this.distinct("Customer Region").sort(),
      this.distinct("Gender").sort(),
      this.distinct("Product Category").sort(),
      this.distinct("Payment Method").sort(),
      this.distinct("Order Status").sort(),
      this.distinct("Tags").sort(),
    ]);

  return {
    regions,
    genders,
    categories,
    paymentMethods,
    orderStatuses,
    tags: [...new Set(tags.flat())].sort(),
  };
};

const Transaction = mongoose.model("Transaction", transactionSchema, "sales");
module.exports = Transaction;
