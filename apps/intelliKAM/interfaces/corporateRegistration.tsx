export interface CompanyInfo {
  companyName: string
  companyWebsite: string
}

export interface AdminInfo {
  firstName: string
  lastName: string
  jobTitle: string
  email: string
  countryCode: string
  mobilePhone: string
}

export interface PlanDetails {
  planType: string
  subscriptionModel: string
  renewalPeriod: string
  goLiveDate: string
  ratePerVideo: string
  videoCreditsIncluded: string
  videoCreditsFrequency: string
  paymentMethods: string
  paymentTerms: string
  paymentDueDate: string
}

export interface BillingContact {
  firstName: string
  lastName: string
  jobTitle: string
  email: string
  countryCode: string
  mobilePhone: string
  address1: string
  appartmentEtc: string
  country: string
  state: string
  city: string
  zipCode: string
}
