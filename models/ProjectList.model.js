const mongoose = require("mongoose");

const projectListSchema = new mongoose.Schema(
  {
    project_name: { type: String, required: true },
    project_symbol: { type: String, required: true },
    email: { type: String, required: true },
    pincode: { type: String, required: true },
    website_url: { type: String },
    project_description: { type: String, required: true },
    required_investment: { type: Number, required: true },
    pr_to_burn: { type: Number },
    min_investment: { type: Number, required: true },
    lock_in_period: { type: String },
    max_token_supply: { type: Number },
    currencies_accepted: [String],
    project_type: { type: String },
    project_storage: { type: String },
    geographic_market: { type: String },
    project_logo: { type: String },
    balance_sheet: { type: String },
    other_document: [String],
    additional_image: [String],
    about: { type: String },
    status: { type: String },
    raised: { type: Number },
    goal: { type: Number },
    certificate: { type: String },
    project_phases: [{ name: String, description: String }],
    responds: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProjectList", projectListSchema);
