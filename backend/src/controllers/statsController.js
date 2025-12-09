// Controller for calculating dashboard statistics.
const Transaction = require("../models/Transaction");


const normalizeArray = (val) => {
  if (!val || val === 'All') return null;
  return Array.isArray(val) ? val : [val];
};


const buildFilters = (query) => {
  const filter = {};

  // 1. Search (Handle both Name and Phone via Regex)
  if (query.search && query.search.trim() !== "") {
    const s = query.search.trim();
    filter.$or = [
      { "Customer Name": new RegExp(s, "i") },
      {
        $expr: {
          $regexMatch: {
            input: { $toString: "$Phone Number" },
            regex: s,
            options: "i",
          }
        }
      }
    ];
  }

  // 2. Simple Filters (Use $in for arrays)
  const region = normalizeArray(query.customerRegion);
  if (region) filter["Customer Region"] = { $in: region };

  const gender = normalizeArray(query.gender);
  if (gender) filter["Gender"] = { $in: gender };

  const category = normalizeArray(query.productCategory);
  if (category) filter["Product Category"] = { $in: category };

  const payment = normalizeArray(query.paymentMethod);
  if (payment) filter["Payment Method"] = { $in: payment };

  const status = normalizeArray(query.orderStatus);
  if (status) filter["Order Status"] = { $in: status };

  /* Regex based tag filter */
  const tags = normalizeArray(query.tags);
  if (tags) {
    if (!filter.$and) filter.$and = [];
    filter.$and.push({
      $or: tags.map((tag) => ({
        "Tags": { $regex: tag.trim(), $options: "i" },
      })),
    });
  }

  // 3. Age Range (Handle JSON string & String-in-DB types)
  let ageData = query.ageRange;
  if (typeof ageData === 'string') {
    try { ageData = JSON.parse(ageData); } catch (e) { }
  }

  if (ageData) {
    const min = parseInt(ageData.min) || 0;
    const max = parseInt(ageData.max) || 150;

    const ageExpr = {
      $and: [
        { $gte: [{ $toInt: "$Age" }, min] },
        { $lte: [{ $toInt: "$Age" }, max] }
      ]
    };

    if (filter.$or) {
      filter.$and = [{ $or: filter.$or }, { $expr: ageExpr }];
      delete filter.$or;
    } else {
      filter.$expr = ageExpr;
    }
  }

  // 4. Date Range (Handle JSON string)
  let dateData = query.dateRange;
  if (typeof dateData === 'string') {
    try { dateData = JSON.parse(dateData); } catch (e) { }
  }

  if (dateData?.start || dateData?.end) {
    filter.Date = {};
    if (dateData.start) filter.Date.$gte = new Date(dateData.start);
    if (dateData.end) filter.Date.$lte = new Date(dateData.end);
  }

  return filter;
};


const getDashboardStats = async (req, res) => {
  try {
    const mongoFilters = buildFilters(req.query);

    const [
      totalTransactions,
      unitsAgg,
      amountAgg,
      discountAgg
    ] = await Promise.all([
      Transaction.countDocuments(mongoFilters),

      // Total Units Sold
      Transaction.aggregate([
        { $match: mongoFilters },
        { $group: { _id: null, units: { $sum: "$Quantity" } } }
      ]),

      // Total Amount
      Transaction.aggregate([
        { $match: mongoFilters },
        { $group: { _id: null, total: { $sum: "$Total Amount" } } }
      ]),

      // Total Discount
      Transaction.aggregate([
        { $match: mongoFilters },
        {
          $group: {
            _id: null,
            total: {
              $sum: {
                $multiply: [
                  "$Total Amount",
                  { $divide: ["$Discount Percentage", 100] }
                ]
              }
            }
          }
        }
      ])
    ]);

    return res.json({
      success: true,
      data: {
        totalTransactions,
        totalUnitsSold: unitsAgg[0]?.units || 0,
        totalAmount: amountAgg[0]?.total || 0,
        totalDiscount: discountAgg[0]?.total || 0
      }
    });

  } catch (error) {
    console.error("STATS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard stats."
    });
  }
};

module.exports = { getDashboardStats };
