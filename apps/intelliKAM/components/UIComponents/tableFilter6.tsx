import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { IoSearch } from 'react-icons/io5'
import { axios, stringifyParams } from 'lib'
import { useLocation } from 'react-router'
import { useSearchParams, useParams } from 'react-router-dom'
import queryString from 'query-string'
import { useRouter } from 'next/router'

type TableProps = {
  data: any[]
}
const data = [
  {
    attributes: {
      type: 'Lead',
      url: '/services/data/v57.0/sobjects/Lead/00Q5i00000GAqYyEAL',
    },
    Id: '00Q5i00000GAqYyEAL',
    IsDeleted: false,
    MasterRecordId: null,
    LastName: 'Bair',
    FirstName: 'Betty',
    Salutation: 'Ms',
    Name: 'Betty Bair',
    Title: 'VP, Administration',
    Company: 'American Banking Corp.',
    Street: null,
    City: null,
    State: 'PA',
    PostalCode: null,
    Country: 'USA',
    Latitude: null,
    Longitude: null,
    GeocodeAccuracy: null,
    Address: {
      city: null,
      country: 'USA',
      geocodeAccuracy: null,
      latitude: null,
      longitude: null,
      postalCode: null,
      state: 'PA',
      street: null,
    },
    Phone: '(610) 265-9100',
    MobilePhone: null,
    Fax: null,
    Email: 'bblair@abankingco.com',
    Website: null,
    PhotoUrl: '/services/images/photo/00Q5i00000GAqYyEAL',
    Description: null,
    LeadSource: 'Purchased List',
    Status: 'Working - Contacted',
    Industry: null,
    Rating: null,
    AnnualRevenue: null,
    NumberOfEmployees: null,
    OwnerId: '0055i000007S72zAAC',
    IsConverted: false,
    ConvertedDate: null,
    ConvertedAccountId: null,
    ConvertedContactId: null,
    ConvertedOpportunityId: null,
    IsUnreadByOwner: true,
    CreatedDate: '2023-05-03T10:34:07.000+0000',
    CreatedById: '0055i000007S72zAAC',
    LastModifiedDate: '2023-05-03T10:34:07.000+0000',
    LastModifiedById: '0055i000007S72zAAC',
    SystemModstamp: '2023-05-03T10:37:48.000+0000',
    LastActivityDate: null,
    LastViewedDate: null,
    LastReferencedDate: null,
    Jigsaw: null,
    JigsawContactId: null,
    CleanStatus: 'Pending',
    CompanyDunsNumber: null,
    DandbCompanyId: null,
    EmailBouncedReason: null,
    EmailBouncedDate: null,
    IndividualId: null,
    SICCode__c: '2768',
    ProductInterest__c: 'GC5000 series',
    Primary__c: 'Yes',
    CurrentGenerators__c: 'All',
    NumberofLocations__c: 130,
  },
  {
    attributes: {
      type: 'Lead',
      url: '/services/data/v57.0/sobjects/Lead/00Q5i00000GAqYdEAL',
    },
    Id: '00Q5i00000GAqYdEAL',
    IsDeleted: false,
    MasterRecordId: null,
    LastName: 'Boxer',
    FirstName: 'Bertha',
    Salutation: 'Ms.',
    Name: 'Bertha Boxer',
    Title: 'Director of Vendor Relations',
    Company: 'Farmers Coop. of Florida',
    Street: '321 Westcott Building',
    City: 'Tallahassee',
    State: 'FL',
    PostalCode: '32306',
    Country: 'USA',
    Latitude: null,
    Longitude: null,
    GeocodeAccuracy: null,
    Address: {
      city: 'Tallahassee',
      country: 'USA',
      geocodeAccuracy: null,
      latitude: null,
      longitude: null,
      postalCode: '32306',
      state: 'FL',
      street: '321 Westcott Building',
    },
    Phone: '(850) 644-4200',
    MobilePhone: null,
    Fax: '(850) 644-4300',
    Email: 'bertha@fcof.net',
    Website: null,
    PhotoUrl: '/services/images/photo/00Q5i00000GAqYdEAL',
    Description: null,
    LeadSource: 'Web',
    Status: 'Working - Contacted',
    Industry: 'Agriculture',
    Rating: 'Hot',
    AnnualRevenue: 900750000,
    NumberOfEmployees: null,
    OwnerId: '0055i000007S72zAAC',
    IsConverted: false,
    ConvertedDate: null,
    ConvertedAccountId: null,
    ConvertedContactId: null,
    ConvertedOpportunityId: null,
    IsUnreadByOwner: true,
    CreatedDate: '2023-05-03T10:34:07.000+0000',
    CreatedById: '0055i000007S72zAAC',
    LastModifiedDate: '2023-05-03T10:34:07.000+0000',
    LastModifiedById: '0055i000007S72zAAC',
    SystemModstamp: '2023-05-03T10:37:48.000+0000',
    LastActivityDate: null,
    LastViewedDate: null,
    LastReferencedDate: null,
    Jigsaw: null,
    JigsawContactId: null,
    CleanStatus: 'Pending',
    CompanyDunsNumber: null,
    DandbCompanyId: null,
    EmailBouncedReason: null,
    EmailBouncedDate: null,
    IndividualId: null,
    SICCode__c: '2768',
    ProductInterest__c: 'GC5000 series',
    Primary__c: 'Yes',
    CurrentGenerators__c: 'All',
    NumberofLocations__c: 130,
  },
  {
    attributes: {
      type: 'Lead',
      url: '/services/data/v57.0/sobjects/Lead/00Q5i00000GAqYeEAL',
    },
    Id: '00Q5i00000GAqYeEAL',
    IsDeleted: false,
    MasterRecordId: null,
    LastName: 'Cotton',
    FirstName: 'Phyllis',
    Salutation: 'Ms',
    Name: 'Phyllis Cotton',
    Title: 'CFO',
    Company: 'Abbott Insurance',
    Street: null,
    City: null,
    State: 'VA',
    PostalCode: null,
    Country: 'USA',
    Latitude: null,
    Longitude: null,
    GeocodeAccuracy: null,
    Address: {
      city: null,
      country: 'USA',
      geocodeAccuracy: null,
      latitude: null,
      longitude: null,
      postalCode: null,
      state: 'VA',
      street: null,
    },
    Phone: '(703) 757-1000',
    MobilePhone: null,
    Fax: null,
    Email: 'pcotton@abbottins.net',
    Website: null,
    PhotoUrl: '/services/images/photo/00Q5i00000GAqYeEAL',
    Description: null,
    LeadSource: 'Web',
    Status: 'Open - Not Contacted',
    Industry: null,
    Rating: null,
    AnnualRevenue: null,
    NumberOfEmployees: null,
    OwnerId: '0055i000007S72zAAC',
    IsConverted: false,
    ConvertedDate: null,
    ConvertedAccountId: null,
    ConvertedContactId: null,
    ConvertedOpportunityId: null,
    IsUnreadByOwner: true,
    CreatedDate: '2023-05-03T10:34:07.000+0000',
    CreatedById: '0055i000007S72zAAC',
    LastModifiedDate: '2023-05-03T10:34:07.000+0000',
    LastModifiedById: '0055i000007S72zAAC',
    SystemModstamp: '2023-05-03T10:37:48.000+0000',
    LastActivityDate: null,
    LastViewedDate: null,
    LastReferencedDate: null,
    Jigsaw: null,
    JigsawContactId: null,
    CleanStatus: 'Pending',
    CompanyDunsNumber: null,
    DandbCompanyId: null,
    EmailBouncedReason: null,
    EmailBouncedDate: null,
    IndividualId: null,
    SICCode__c: '2768',
    ProductInterest__c: 'GC5000 series',
    Primary__c: 'Yes',
    CurrentGenerators__c: 'All',
    NumberofLocations__c: 130,
  },
  {
    attributes: {
      type: 'Lead',
      url: '/services/data/v57.0/sobjects/Lead/00Q5i00000GAqYfEAL',
    },
    Id: '00Q5i00000GAqYfEAL',
    IsDeleted: false,
    MasterRecordId: null,
    LastName: 'Glimpse',
    FirstName: 'Jeff',
    Salutation: 'Mr',
    Name: 'Jeff Glimpse',
    Title: 'SVP, Procurement',
    Company: 'Jackson Controls',
    Street: null,
    City: null,
    State: null,
    PostalCode: null,
    Country: 'Taiwan',
    Latitude: null,
    Longitude: null,
    GeocodeAccuracy: null,
    Address: {
      city: null,
      country: 'Taiwan',
      geocodeAccuracy: null,
      latitude: null,
      longitude: null,
      postalCode: null,
      state: null,
      street: null,
    },
    Phone: '886-2-25474189',
    MobilePhone: null,
    Fax: null,
    Email: 'jeffg@jackson.com',
    Website: null,
    PhotoUrl: '/services/images/photo/00Q5i00000GAqYfEAL',
    Description: null,
    LeadSource: 'Phone Inquiry',
    Status: 'Open - Not Contacted',
    Industry: null,
    Rating: null,
    AnnualRevenue: null,
    NumberOfEmployees: null,
    OwnerId: '0055i000007S72zAAC',
    IsConverted: false,
    ConvertedDate: null,
    ConvertedAccountId: null,
    ConvertedContactId: null,
    ConvertedOpportunityId: null,
    IsUnreadByOwner: true,
    CreatedDate: '2023-05-03T10:34:07.000+0000',
    CreatedById: '0055i000007S72zAAC',
    LastModifiedDate: '2023-05-03T10:34:07.000+0000',
    LastModifiedById: '0055i000007S72zAAC',
    SystemModstamp: '2023-05-03T10:37:48.000+0000',
    LastActivityDate: null,
    LastViewedDate: null,
    LastReferencedDate: null,
    Jigsaw: null,
    JigsawContactId: null,
    CleanStatus: 'Pending',
    CompanyDunsNumber: null,
    DandbCompanyId: null,
    EmailBouncedReason: null,
    EmailBouncedDate: null,
    IndividualId: null,
    SICCode__c: '2768',
    ProductInterest__c: 'GC5000 series',
    Primary__c: 'Yes',
    CurrentGenerators__c: 'All',
    NumberofLocations__c: 130,
  },
  {
    attributes: {
      type: 'Lead',
      url: '/services/data/v57.0/sobjects/Lead/00Q5i00000GAqYgEAL',
    },
    Id: '00Q5i00000GAqYgEAL',
    IsDeleted: false,
    MasterRecordId: null,
    LastName: 'Braund',
    FirstName: 'Mike',
    Salutation: 'Mr',
    Name: 'Mike Braund',
    Title: 'VP, Technology',
    Company: 'Metropolitan Health Services',
    Street: null,
    City: null,
    State: 'MD',
    PostalCode: null,
    Country: 'USA',
    Latitude: null,
    Longitude: null,
    GeocodeAccuracy: null,
    Address: {
      city: null,
      country: 'USA',
      geocodeAccuracy: null,
      latitude: null,
      longitude: null,
      postalCode: null,
      state: 'MD',
      street: null,
    },
    Phone: '(410) 381-2334',
    MobilePhone: null,
    Fax: null,
    Email: 'likeb@metro.com',
    Website: null,
    PhotoUrl: '/services/images/photo/00Q5i00000GAqYgEAL',
    Description: null,
    LeadSource: 'Purchased List',
    Status: 'Open - Not Contacted',
    Industry: null,
    Rating: null,
    AnnualRevenue: null,
    NumberOfEmployees: null,
    OwnerId: '0055i000007S72zAAC',
    IsConverted: false,
    ConvertedDate: null,
    ConvertedAccountId: null,
    ConvertedContactId: null,
    ConvertedOpportunityId: null,
    IsUnreadByOwner: true,
    CreatedDate: '2023-05-03T10:34:07.000+0000',
    CreatedById: '0055i000007S72zAAC',
    LastModifiedDate: '2023-05-03T10:34:07.000+0000',
    LastModifiedById: '0055i000007S72zAAC',
    SystemModstamp: '2023-05-03T10:37:48.000+0000',
    LastActivityDate: null,
    LastViewedDate: null,
    LastReferencedDate: null,
    Jigsaw: null,
    JigsawContactId: null,
    CleanStatus: 'Pending',
    CompanyDunsNumber: null,
    DandbCompanyId: null,
    EmailBouncedReason: null,
    EmailBouncedDate: null,
    IndividualId: null,
    SICCode__c: '2768',
    ProductInterest__c: 'GC5000 series',
    Primary__c: 'Yes',
    CurrentGenerators__c: 'All',
    NumberofLocations__c: 130,
  },
  {
    attributes: {
      type: 'Lead',
      url: '/services/data/v57.0/sobjects/Lead/00Q5i00000GAqYhEAL',
    },
    Id: '00Q5i00000GAqYhEAL',
    IsDeleted: false,
    MasterRecordId: null,
    LastName: 'Feager',
    FirstName: 'Patricia',
    Salutation: 'Ms',
    Name: 'Patricia Feager',
    Title: 'CEO',
    Company: 'International Shipping Co.',
    Street: null,
    City: null,
    State: 'NC',
    PostalCode: null,
    Country: 'USA',
    Latitude: null,
    Longitude: null,
    GeocodeAccuracy: null,
    Address: {
      city: null,
      country: 'USA',
      geocodeAccuracy: null,
      latitude: null,
      longitude: null,
      postalCode: null,
      state: 'NC',
      street: null,
    },
    Phone: '(336) 777-1970',
    MobilePhone: null,
    Fax: null,
    Email: 'patricia_feager@is.com',
    Website: null,
    PhotoUrl: '/services/images/photo/00Q5i00000GAqYhEAL',
    Description: null,
    LeadSource: 'Partner Referral',
    Status: 'Working - Contacted',
    Industry: null,
    Rating: null,
    AnnualRevenue: null,
    NumberOfEmployees: null,
    OwnerId: '0055i000007S72zAAC',
    IsConverted: false,
    ConvertedDate: null,
    ConvertedAccountId: null,
    ConvertedContactId: null,
    ConvertedOpportunityId: null,
    IsUnreadByOwner: true,
    CreatedDate: '2023-05-03T10:34:07.000+0000',
    CreatedById: '0055i000007S72zAAC',
    LastModifiedDate: '2023-05-03T10:34:07.000+0000',
    LastModifiedById: '0055i000007S72zAAC',
    SystemModstamp: '2023-05-03T10:37:48.000+0000',
    LastActivityDate: null,
    LastViewedDate: null,
    LastReferencedDate: null,
    Jigsaw: null,
    JigsawContactId: null,
    CleanStatus: 'Pending',
    CompanyDunsNumber: null,
    DandbCompanyId: null,
    EmailBouncedReason: null,
    EmailBouncedDate: null,
    IndividualId: null,
    SICCode__c: '2768',
    ProductInterest__c: 'GC5000 series',
    Primary__c: 'Yes',
    CurrentGenerators__c: 'All',
    NumberofLocations__c: 130,
  },
  {
    attributes: {
      type: 'Lead',
      url: '/services/data/v57.0/sobjects/Lead/00Q5i00000GAqYiEAL',
    },
    Id: '00Q5i00000GAqYiEAL',
    IsDeleted: false,
    MasterRecordId: null,
    LastName: 'Mcclure',
    FirstName: 'Brenda',
    Salutation: 'Ms',
    Name: 'Brenda Mcclure',
    Title: 'CFO',
    Company: 'Cadinal Inc.',
    Street: null,
    City: null,
    State: 'IL',
    PostalCode: null,
    Country: 'USA',
    Latitude: null,
    Longitude: null,
    GeocodeAccuracy: null,
    Address: {
      city: null,
      country: 'USA',
      geocodeAccuracy: null,
      latitude: null,
      longitude: null,
      postalCode: null,
      state: 'IL',
      street: null,
    },
    Phone: '(847) 262-5000',
    MobilePhone: null,
    Fax: null,
    Email: 'brenda@cardinal.net',
    Website: null,
    PhotoUrl: '/services/images/photo/00Q5i00000GAqYiEAL',
    Description: null,
    LeadSource: 'Web',
    Status: 'Working - Contacted',
    Industry: null,
    Rating: null,
    AnnualRevenue: null,
    NumberOfEmployees: null,
    OwnerId: '0055i000007S72zAAC',
    IsConverted: false,
    ConvertedDate: null,
    ConvertedAccountId: null,
    ConvertedContactId: null,
    ConvertedOpportunityId: null,
    IsUnreadByOwner: true,
    CreatedDate: '2023-05-03T10:34:07.000+0000',
    CreatedById: '0055i000007S72zAAC',
    LastModifiedDate: '2023-05-03T10:34:07.000+0000',
    LastModifiedById: '0055i000007S72zAAC',
    SystemModstamp: '2023-05-03T10:37:48.000+0000',
    LastActivityDate: null,
    LastViewedDate: null,
    LastReferencedDate: null,
    Jigsaw: null,
    JigsawContactId: null,
    CleanStatus: 'Pending',
    CompanyDunsNumber: null,
    DandbCompanyId: null,
    EmailBouncedReason: null,
    EmailBouncedDate: null,
    IndividualId: null,
    SICCode__c: '2768',
    ProductInterest__c: 'GC5000 series',
    Primary__c: 'Yes',
    CurrentGenerators__c: 'All',
    NumberofLocations__c: 130,
  },
  {
    attributes: {
      type: 'Lead',
      url: '/services/data/v57.0/sobjects/Lead/00Q5i00000GAqYjEAL',
    },
    Id: '00Q5i00000GAqYjEAL',
    IsDeleted: false,
    MasterRecordId: null,
    LastName: 'Maccleod',
    FirstName: 'Violet',
    Salutation: 'Ms',
    Name: 'Violet Maccleod',
    Title: 'VP, Finance',
    Company: 'Emerson Transport',
    Street: null,
    City: null,
    State: 'GA',
    PostalCode: null,
    Country: 'USA',
    Latitude: null,
    Longitude: null,
    GeocodeAccuracy: null,
    Address: {
      city: null,
      country: 'USA',
      geocodeAccuracy: null,
      latitude: null,
      longitude: null,
      postalCode: null,
      state: 'GA',
      street: null,
    },
    Phone: '(770) 395-2370',
    MobilePhone: null,
    Fax: null,
    Email: 'violetm@emersontransport.com',
    Website: null,
    PhotoUrl: '/services/images/photo/00Q5i00000GAqYjEAL',
    Description: null,
    LeadSource: 'Phone Inquiry',
    Status: 'Working - Contacted',
    Industry: null,
    Rating: null,
    AnnualRevenue: null,
    NumberOfEmployees: null,
    OwnerId: '0055i000007S72zAAC',
    IsConverted: false,
    ConvertedDate: null,
    ConvertedAccountId: null,
    ConvertedContactId: null,
    ConvertedOpportunityId: null,
    IsUnreadByOwner: true,
    CreatedDate: '2023-05-03T10:34:07.000+0000',
    CreatedById: '0055i000007S72zAAC',
    LastModifiedDate: '2023-05-03T10:34:07.000+0000',
    LastModifiedById: '0055i000007S72zAAC',
    SystemModstamp: '2023-05-03T10:37:48.000+0000',
    LastActivityDate: null,
    LastViewedDate: null,
    LastReferencedDate: null,
    Jigsaw: null,
    JigsawContactId: null,
    CleanStatus: 'Pending',
    CompanyDunsNumber: null,
    DandbCompanyId: null,
    EmailBouncedReason: null,
    EmailBouncedDate: null,
    IndividualId: null,
    SICCode__c: '2768',
    ProductInterest__c: 'GC5000 series',
    Primary__c: 'Yes',
    CurrentGenerators__c: 'All',
    NumberofLocations__c: 130,
  },
  {
    attributes: {
      type: 'Lead',
      url: '/services/data/v57.0/sobjects/Lead/00Q5i00000GAqYkEAL',
    },
    Id: '00Q5i00000GAqYkEAL',
    IsDeleted: false,
    MasterRecordId: null,
    LastName: 'Snyder',
    FirstName: 'Kathy',
    Salutation: 'Ms',
    Name: 'Kathy Snyder',
    Title: 'Regional General Manager',
    Company: 'TNR Corp.',
    Street: null,
    City: null,
    State: 'CT',
    PostalCode: null,
    Country: 'USA',
    Latitude: null,
    Longitude: null,
    GeocodeAccuracy: null,
    Address: {
      city: null,
      country: 'USA',
      geocodeAccuracy: null,
      latitude: null,
      longitude: null,
      postalCode: null,
      state: 'CT',
      street: null,
    },
    Phone: '(860) 273-0123',
    MobilePhone: null,
    Fax: null,
    Email: 'ksynder@tnr.net',
    Website: null,
    PhotoUrl: '/services/images/photo/00Q5i00000GAqYkEAL',
    Description: null,
    LeadSource: 'Purchased List',
    Status: 'Working - Contacted',
    Industry: null,
    Rating: null,
    AnnualRevenue: null,
    NumberOfEmployees: null,
    OwnerId: '0055i000007S72zAAC',
    IsConverted: false,
    ConvertedDate: null,
    ConvertedAccountId: null,
    ConvertedContactId: null,
    ConvertedOpportunityId: null,
    IsUnreadByOwner: true,
    CreatedDate: '2023-05-03T10:34:07.000+0000',
    CreatedById: '0055i000007S72zAAC',
    LastModifiedDate: '2023-05-03T10:34:07.000+0000',
    LastModifiedById: '0055i000007S72zAAC',
    SystemModstamp: '2023-05-03T10:37:48.000+0000',
    LastActivityDate: null,
    LastViewedDate: null,
    LastReferencedDate: null,
    Jigsaw: null,
    JigsawContactId: null,
    CleanStatus: 'Pending',
    CompanyDunsNumber: null,
    DandbCompanyId: null,
    EmailBouncedReason: null,
    EmailBouncedDate: null,
    IndividualId: null,
    SICCode__c: '2768',
    ProductInterest__c: 'GC5000 series',
    Primary__c: 'Yes',
    CurrentGenerators__c: 'All',
    NumberofLocations__c: 130,
  },
  {
    attributes: {
      type: 'Lead',
      url: '/services/data/v57.0/sobjects/Lead/00Q5i00000GAqYlEAL',
    },
    Id: '00Q5i00000GAqYlEAL',
    IsDeleted: false,
    MasterRecordId: null,
    LastName: 'James',
    FirstName: 'Tom',
    Salutation: 'Mr',
    Name: 'Tom James',
    Title: 'SVP, Production',
    Company: 'Delphi Chemicals',
    Street: null,
    City: null,
    State: 'MN',
    PostalCode: null,
    Country: 'USA',
    Latitude: null,
    Longitude: null,
    GeocodeAccuracy: null,
    Address: {
      city: null,
      country: 'USA',
      geocodeAccuracy: null,
      latitude: null,
      longitude: null,
      postalCode: null,
      state: 'MN',
      street: null,
    },
    Phone: '(952) 346-3500',
    MobilePhone: null,
    Fax: null,
    Email: 'tom.james@delphi.chemicals.com',
    Website: null,
    PhotoUrl: '/services/images/photo/00Q5i00000GAqYlEAL',
    Description: null,
    LeadSource: 'Web',
    Status: 'Working - Contacted',
    Industry: null,
    Rating: null,
    AnnualRevenue: null,
    NumberOfEmployees: null,
    OwnerId: '0055i000007S72zAAC',
    IsConverted: false,
    ConvertedDate: null,
    ConvertedAccountId: null,
    ConvertedContactId: null,
    ConvertedOpportunityId: null,
    IsUnreadByOwner: true,
    CreatedDate: '2023-05-03T10:34:07.000+0000',
    CreatedById: '0055i000007S72zAAC',
    LastModifiedDate: '2023-05-03T10:34:07.000+0000',
    LastModifiedById: '0055i000007S72zAAC',
    SystemModstamp: '2023-05-03T10:37:48.000+0000',
    LastActivityDate: null,
    LastViewedDate: null,
    LastReferencedDate: null,
    Jigsaw: null,
    JigsawContactId: null,
    CleanStatus: 'Pending',
    CompanyDunsNumber: null,
    DandbCompanyId: null,
    EmailBouncedReason: null,
    EmailBouncedDate: null,
    IndividualId: null,
    SICCode__c: '2768',
    ProductInterest__c: 'GC5000 series',
    Primary__c: 'Yes',
    CurrentGenerators__c: 'All',
    NumberofLocations__c: 130,
  },
  {
    attributes: {
      type: 'Lead',
      url: '/services/data/v57.0/sobjects/Lead/00Q5i00000GAqYmEAL',
    },
    Id: '00Q5i00000GAqYmEAL',
    IsDeleted: false,
    MasterRecordId: null,
    LastName: 'Brownell',
    FirstName: 'Shelly',
    Salutation: 'Ms',
    Name: 'Shelly Brownell',
    Title: 'SVP, Technology',
    Company: 'Western Telecommunications Corp.',
    Street: null,
    City: null,
    State: 'CA',
    PostalCode: null,
    Country: 'USA',
    Latitude: null,
    Longitude: null,
    GeocodeAccuracy: null,
    Address: {
      city: null,
      country: 'USA',
      geocodeAccuracy: null,
      latitude: null,
      longitude: null,
      postalCode: null,
      state: 'CA',
      street: null,
    },
    Phone: '(408) 326-9000',
    MobilePhone: null,
    Fax: null,
    Email: 'shellyb@westerntelecom.com',
    Website: null,
    PhotoUrl: '/services/images/photo/00Q5i00000GAqYmEAL',
    Description: null,
    LeadSource: 'Partner Referral',
    Status: 'Working - Contacted',
    Industry: null,
    Rating: null,
    AnnualRevenue: null,
    NumberOfEmployees: null,
    OwnerId: '0055i000007S72zAAC',
    IsConverted: false,
    ConvertedDate: null,
    ConvertedAccountId: null,
    ConvertedContactId: null,
    ConvertedOpportunityId: null,
    IsUnreadByOwner: true,
    CreatedDate: '2023-05-03T10:34:07.000+0000',
    CreatedById: '0055i000007S72zAAC',
    LastModifiedDate: '2023-05-03T10:34:07.000+0000',
    LastModifiedById: '0055i000007S72zAAC',
    SystemModstamp: '2023-05-03T10:37:48.000+0000',
    LastActivityDate: null,
    LastViewedDate: null,
    LastReferencedDate: null,
    Jigsaw: null,
    JigsawContactId: null,
    CleanStatus: 'Pending',
    CompanyDunsNumber: null,
    DandbCompanyId: null,
    EmailBouncedReason: null,
    EmailBouncedDate: null,
    IndividualId: null,
    SICCode__c: '2768',
    ProductInterest__c: 'GC5000 series',
    Primary__c: 'Yes',
    CurrentGenerators__c: 'All',
    NumberofLocations__c: 130,
  },
  {
    attributes: {
      type: 'Lead',
      url: '/services/data/v57.0/sobjects/Lead/00Q5i00000GAqYnEAL',
    },
    Id: '00Q5i00000GAqYnEAL',
    IsDeleted: false,
    MasterRecordId: null,
    LastName: 'Owenby',
    FirstName: 'Pamela',
    Salutation: 'Ms',
    Name: 'Pamela Owenby',
    Title: 'SVP, Technology',
    Company: 'Hendrickson Trading',
    Street: null,
    City: null,
    State: 'PA',
    PostalCode: null,
    Country: 'USA',
    Latitude: null,
    Longitude: null,
    GeocodeAccuracy: null,
    Address: {
      city: null,
      country: 'USA',
      geocodeAccuracy: null,
      latitude: null,
      longitude: null,
      postalCode: null,
      state: 'PA',
      street: null,
    },
    Phone: '(570) 326-1571',
    MobilePhone: null,
    Fax: null,
    Email: 'pam_owenby@hendricksontrading.com',
    Website: null,
    PhotoUrl: '/services/images/photo/00Q5i00000GAqYnEAL',
    Description: null,
    LeadSource: 'Partner Referral',
    Status: 'Closed - Not Converted',
    Industry: null,
    Rating: null,
    AnnualRevenue: null,
    NumberOfEmployees: null,
    OwnerId: '0055i000007S72zAAC',
    IsConverted: false,
    ConvertedDate: null,
    ConvertedAccountId: null,
    ConvertedContactId: null,
    ConvertedOpportunityId: null,
    IsUnreadByOwner: true,
    CreatedDate: '2023-05-03T10:34:07.000+0000',
    CreatedById: '0055i000007S72zAAC',
    LastModifiedDate: '2023-05-03T10:34:07.000+0000',
    LastModifiedById: '0055i000007S72zAAC',
    SystemModstamp: '2023-05-03T10:37:48.000+0000',
    LastActivityDate: null,
    LastViewedDate: null,
    LastReferencedDate: null,
    Jigsaw: null,
    JigsawContactId: null,
    CleanStatus: 'Pending',
    CompanyDunsNumber: null,
    DandbCompanyId: null,
    EmailBouncedReason: null,
    EmailBouncedDate: null,
    IndividualId: null,
    SICCode__c: '7267',
    ProductInterest__c: 'GC5000 series',
    Primary__c: 'Yes',
    CurrentGenerators__c: 'John Deere',
    NumberofLocations__c: 3,
  },
  {
    attributes: {
      type: 'Lead',
      url: '/services/data/v57.0/sobjects/Lead/00Q5i00000GAqYoEAL',
    },
    Id: '00Q5i00000GAqYoEAL',
    IsDeleted: false,
    MasterRecordId: null,
    LastName: 'May',
    FirstName: 'Norm',
    Salutation: 'Mr',
    Name: 'Norm May',
    Title: 'VP, Facilities',
    Company: 'Greenwich Media',
    Street: null,
    City: null,
    State: 'OH',
    PostalCode: null,
    Country: 'USA',
    Latitude: null,
    Longitude: null,
    GeocodeAccuracy: null,
    Address: {
      city: null,
      country: 'USA',
      geocodeAccuracy: null,
      latitude: null,
      longitude: null,
      postalCode: null,
      state: 'OH',
      street: null,
    },
    Phone: '(419) 289-3555',
    MobilePhone: null,
    Fax: null,
    Email: 'norm_may@greenwich.net',
    Website: null,
    PhotoUrl: '/services/images/photo/00Q5i00000GAqYoEAL',
    Description: null,
    LeadSource: 'Web',
    Status: 'Working - Contacted',
    Industry: null,
    Rating: null,
    AnnualRevenue: null,
    NumberOfEmployees: null,
    OwnerId: '0055i000007S72zAAC',
    IsConverted: false,
    ConvertedDate: null,
    ConvertedAccountId: null,
    ConvertedContactId: null,
    ConvertedOpportunityId: null,
    IsUnreadByOwner: true,
    CreatedDate: '2023-05-03T10:34:07.000+0000',
    CreatedById: '0055i000007S72zAAC',
    LastModifiedDate: '2023-05-03T10:34:07.000+0000',
    LastModifiedById: '0055i000007S72zAAC',
    SystemModstamp: '2023-05-03T10:37:48.000+0000',
    LastActivityDate: null,
    LastViewedDate: null,
    LastReferencedDate: null,
    Jigsaw: null,
    JigsawContactId: null,
    CleanStatus: 'Pending',
    CompanyDunsNumber: null,
    DandbCompanyId: null,
    EmailBouncedReason: null,
    EmailBouncedDate: null,
    IndividualId: null,
    SICCode__c: '2768',
    ProductInterest__c: 'GC5000 series',
    Primary__c: 'Yes',
    CurrentGenerators__c: 'All',
    NumberofLocations__c: 130,
  },
  {
    attributes: {
      type: 'Lead',
      url: '/services/data/v57.0/sobjects/Lead/00Q5i00000GAqYpEAL',
    },
    Id: '00Q5i00000GAqYpEAL',
    IsDeleted: false,
    MasterRecordId: null,
    LastName: 'Stumuller',
    FirstName: 'Pat',
    Salutation: 'Ms',
    Name: 'Pat Stumuller',
    Title: 'SVP, Administration and Finance',
    Company: 'Pyramid Construction Inc.',
    Street: null,
    City: null,
    State: null,
    PostalCode: null,
    Country: 'France',
    Latitude: null,
    Longitude: null,
    GeocodeAccuracy: null,
    Address: {
      city: null,
      country: 'France',
      geocodeAccuracy: null,
      latitude: null,
      longitude: null,
      postalCode: null,
      state: null,
      street: null,
    },
    Phone: '33562156600',
    MobilePhone: null,
    Fax: null,
    Email: 'pat@pyramid.net',
    Website: null,
    PhotoUrl: '/services/images/photo/00Q5i00000GAqYpEAL',
    Description: null,
    LeadSource: 'Phone Inquiry',
    Status: 'Closed - Converted',
    Industry: null,
    Rating: null,
    AnnualRevenue: null,
    NumberOfEmployees: null,
    OwnerId: '0055i000007S72zAAC',
    IsConverted: false,
    ConvertedDate: null,
    ConvertedAccountId: null,
    ConvertedContactId: null,
    ConvertedOpportunityId: null,
    IsUnreadByOwner: true,
    CreatedDate: '2023-05-03T10:34:07.000+0000',
    CreatedById: '0055i000007S72zAAC',
    LastModifiedDate: '2023-05-03T10:34:07.000+0000',
    LastModifiedById: '0055i000007S72zAAC',
    SystemModstamp: '2023-05-03T10:37:48.000+0000',
    LastActivityDate: null,
    LastViewedDate: null,
    LastReferencedDate: null,
    Jigsaw: null,
    JigsawContactId: null,
    CleanStatus: 'Pending',
    CompanyDunsNumber: null,
    DandbCompanyId: null,
    EmailBouncedReason: null,
    EmailBouncedDate: null,
    IndividualId: null,
    SICCode__c: '2768',
    ProductInterest__c: 'GC5000 series',
    Primary__c: 'Yes',
    CurrentGenerators__c: 'All',
    NumberofLocations__c: 130,
  },
  {
    attributes: {
      type: 'Lead',
      url: '/services/data/v57.0/sobjects/Lead/00Q5i00000GAqYqEAL',
    },
    Id: '00Q5i00000GAqYqEAL',
    IsDeleted: false,
    MasterRecordId: null,
    LastName: 'Young',
    FirstName: 'Andy',
    Salutation: 'Mr',
    Name: 'Andy Young',
    Title: 'SVP, Operations',
    Company: 'Dickenson plc',
    Street: null,
    City: null,
    State: 'KS',
    PostalCode: null,
    Country: 'USA',
    Latitude: null,
    Longitude: null,
    GeocodeAccuracy: null,
    Address: {
      city: null,
      country: 'USA',
      geocodeAccuracy: null,
      latitude: null,
      longitude: null,
      postalCode: null,
      state: 'KS',
      street: null,
    },
    Phone: '(620) 241-6200',
    MobilePhone: null,
    Fax: null,
    Email: 'a_young@dickenson.com',
    Website: null,
    PhotoUrl: '/services/images/photo/00Q5i00000GAqYqEAL',
    Description: null,
    LeadSource: 'Purchased List',
    Status: 'Closed - Converted',
    Industry: null,
    Rating: null,
    AnnualRevenue: null,
    NumberOfEmployees: null,
    OwnerId: '0055i000007S72zAAC',
    IsConverted: false,
    ConvertedDate: null,
    ConvertedAccountId: null,
    ConvertedContactId: null,
    ConvertedOpportunityId: null,
    IsUnreadByOwner: true,
    CreatedDate: '2023-05-03T10:34:07.000+0000',
    CreatedById: '0055i000007S72zAAC',
    LastModifiedDate: '2023-05-03T10:34:07.000+0000',
    LastModifiedById: '0055i000007S72zAAC',
    SystemModstamp: '2023-05-03T10:37:48.000+0000',
    LastActivityDate: null,
    LastViewedDate: null,
    LastReferencedDate: null,
    Jigsaw: null,
    JigsawContactId: null,
    CleanStatus: 'Pending',
    CompanyDunsNumber: null,
    DandbCompanyId: null,
    EmailBouncedReason: null,
    EmailBouncedDate: null,
    IndividualId: null,
    SICCode__c: '2768',
    ProductInterest__c: 'GC5000 series',
    Primary__c: 'Yes',
    CurrentGenerators__c: 'All',
    NumberofLocations__c: 130,
  },
  {
    attributes: {
      type: 'Lead',
      url: '/services/data/v57.0/sobjects/Lead/00Q5i00000GAqYrEAL',
    },
    Id: '00Q5i00000GAqYrEAL',
    IsDeleted: false,
    MasterRecordId: null,
    LastName: 'Akin',
    FirstName: 'Kristen',
    Salutation: 'Ms',
    Name: 'Kristen Akin',
    Title: 'Director, Warehouse Mgmt',
    Company: 'Aethna Home Products',
    Street: null,
    City: null,
    State: 'VA',
    PostalCode: null,
    Country: 'USA',
    Latitude: null,
    Longitude: null,
    GeocodeAccuracy: null,
    Address: {
      city: null,
      country: 'USA',
      geocodeAccuracy: null,
      latitude: null,
      longitude: null,
      postalCode: null,
      state: 'VA',
      street: null,
    },
    Phone: '(434) 369-3100',
    MobilePhone: null,
    Fax: null,
    Email: 'kakin@athenahome.com',
    Website: null,
    PhotoUrl: '/services/images/photo/00Q5i00000GAqYrEAL',
    Description: null,
    LeadSource: 'Partner Referral',
    Status: 'Working - Contacted',
    Industry: null,
    Rating: null,
    AnnualRevenue: null,
    NumberOfEmployees: null,
    OwnerId: '0055i000007S72zAAC',
    IsConverted: false,
    ConvertedDate: null,
    ConvertedAccountId: null,
    ConvertedContactId: null,
    ConvertedOpportunityId: null,
    IsUnreadByOwner: true,
    CreatedDate: '2023-05-03T10:34:07.000+0000',
    CreatedById: '0055i000007S72zAAC',
    LastModifiedDate: '2023-05-03T10:34:07.000+0000',
    LastModifiedById: '0055i000007S72zAAC',
    SystemModstamp: '2023-05-03T10:37:48.000+0000',
    LastActivityDate: null,
    LastViewedDate: null,
    LastReferencedDate: null,
    Jigsaw: null,
    JigsawContactId: null,
    CleanStatus: 'Pending',
    CompanyDunsNumber: null,
    DandbCompanyId: null,
    EmailBouncedReason: null,
    EmailBouncedDate: null,
    IndividualId: null,
    SICCode__c: '2768',
    ProductInterest__c: 'GC5000 series',
    Primary__c: 'Yes',
    CurrentGenerators__c: 'All',
    NumberofLocations__c: 130,
  },
  {
    attributes: {
      type: 'Lead',
      url: '/services/data/v57.0/sobjects/Lead/00Q5i00000GAqYsEAL',
    },
    Id: '00Q5i00000GAqYsEAL',
    IsDeleted: false,
    MasterRecordId: null,
    LastName: 'Monaco',
    FirstName: 'David',
    Salutation: 'Mr',
    Name: 'David Monaco',
    Title: 'CFO',
    Company: 'Blues Entertainment Corp.',
    Street: null,
    City: null,
    State: null,
    PostalCode: null,
    Country: 'Japan',
    Latitude: null,
    Longitude: null,
    GeocodeAccuracy: null,
    Address: {
      city: null,
      country: 'Japan',
      geocodeAccuracy: null,
      latitude: null,
      longitude: null,
      postalCode: null,
      state: null,
      street: null,
    },
    Phone: '(033) 452-1299',
    MobilePhone: null,
    Fax: null,
    Email: 'david@blues.com',
    Website: null,
    PhotoUrl: '/services/images/photo/00Q5i00000GAqYsEAL',
    Description: null,
    LeadSource: 'Purchased List',
    Status: 'Working - Contacted',
    Industry: null,
    Rating: null,
    AnnualRevenue: null,
    NumberOfEmployees: null,
    OwnerId: '0055i000007S72zAAC',
    IsConverted: false,
    ConvertedDate: null,
    ConvertedAccountId: null,
    ConvertedContactId: null,
    ConvertedOpportunityId: null,
    IsUnreadByOwner: true,
    CreatedDate: '2023-05-03T10:34:07.000+0000',
    CreatedById: '0055i000007S72zAAC',
    LastModifiedDate: '2023-05-03T10:34:07.000+0000',
    LastModifiedById: '0055i000007S72zAAC',
    SystemModstamp: '2023-05-03T10:37:48.000+0000',
    LastActivityDate: null,
    LastViewedDate: null,
    LastReferencedDate: null,
    Jigsaw: null,
    JigsawContactId: null,
    CleanStatus: 'Pending',
    CompanyDunsNumber: null,
    DandbCompanyId: null,
    EmailBouncedReason: null,
    EmailBouncedDate: null,
    IndividualId: null,
    SICCode__c: '2768',
    ProductInterest__c: 'GC5000 series',
    Primary__c: 'Yes',
    CurrentGenerators__c: 'All',
    NumberofLocations__c: 130,
  },
  {
    attributes: {
      type: 'Lead',
      url: '/services/data/v57.0/sobjects/Lead/00Q5i00000GAqYtEAL',
    },
    Id: '00Q5i00000GAqYtEAL',
    IsDeleted: false,
    MasterRecordId: null,
    LastName: 'Crenshaw',
    FirstName: 'Carolyn',
    Salutation: 'Ms',
    Name: 'Carolyn Crenshaw',
    Title: 'VP, Technology',
    Company: 'Ace Iron and Steel Inc.',
    Street: null,
    City: null,
    State: 'AL',
    PostalCode: null,
    Country: 'USA',
    Latitude: null,
    Longitude: null,
    GeocodeAccuracy: null,
    Address: {
      city: null,
      country: 'USA',
      geocodeAccuracy: null,
      latitude: null,
      longitude: null,
      postalCode: null,
      state: 'AL',
      street: null,
    },
    Phone: '(251) 679-2200',
    MobilePhone: null,
    Fax: null,
    Email: 'carolync@aceis.com',
    Website: null,
    PhotoUrl: '/services/images/photo/00Q5i00000GAqYtEAL',
    Description: null,
    LeadSource: 'Phone Inquiry',
    Status: 'Closed - Not Converted',
    Industry: null,
    Rating: null,
    AnnualRevenue: null,
    NumberOfEmployees: null,
    OwnerId: '0055i000007S72zAAC',
    IsConverted: false,
    ConvertedDate: null,
    ConvertedAccountId: null,
    ConvertedContactId: null,
    ConvertedOpportunityId: null,
    IsUnreadByOwner: true,
    CreatedDate: '2023-05-03T10:34:07.000+0000',
    CreatedById: '0055i000007S72zAAC',
    LastModifiedDate: '2023-05-03T10:34:07.000+0000',
    LastModifiedById: '0055i000007S72zAAC',
    SystemModstamp: '2023-05-03T10:37:48.000+0000',
    LastActivityDate: null,
    LastViewedDate: null,
    LastReferencedDate: null,
    Jigsaw: null,
    JigsawContactId: null,
    CleanStatus: 'Pending',
    CompanyDunsNumber: null,
    DandbCompanyId: null,
    EmailBouncedReason: null,
    EmailBouncedDate: null,
    IndividualId: null,
    SICCode__c: '2768',
    ProductInterest__c: 'GC5000 series',
    Primary__c: 'Yes',
    CurrentGenerators__c: 'All',
    NumberofLocations__c: 130,
  },
  {
    attributes: {
      type: 'Lead',
      url: '/services/data/v57.0/sobjects/Lead/00Q5i00000GAqYuEAL',
    },
    Id: '00Q5i00000GAqYuEAL',
    IsDeleted: false,
    MasterRecordId: null,
    LastName: 'Rogers',
    FirstName: 'Jack',
    Salutation: 'Mr.',
    Name: 'Jack Rogers',
    Title: 'VP, Facilities',
    Company: 'Burlington Textiles Corp of America',
    Street: '525 S. Lexington Ave',
    City: 'Burlington',
    State: 'NC',
    PostalCode: '27215',
    Country: 'USA',
    Latitude: null,
    Longitude: null,
    GeocodeAccuracy: null,
    Address: {
      city: 'Burlington',
      country: 'USA',
      geocodeAccuracy: null,
      latitude: null,
      longitude: null,
      postalCode: '27215',
      state: 'NC',
      street: '525 S. Lexington Ave',
    },
    Phone: '(336) 222-7000',
    MobilePhone: null,
    Fax: '(336) 222-8000',
    Email: 'jrogers@btca.com',
    Website: null,
    PhotoUrl: '/services/images/photo/00Q5i00000GAqYuEAL',
    Description: null,
    LeadSource: 'Web',
    Status: 'Closed - Converted',
    Industry: 'Apparel',
    Rating: 'Warm',
    AnnualRevenue: 350000000,
    NumberOfEmployees: 9000,
    OwnerId: '0055i000007S72zAAC',
    IsConverted: false,
    ConvertedDate: null,
    ConvertedAccountId: null,
    ConvertedContactId: null,
    ConvertedOpportunityId: null,
    IsUnreadByOwner: true,
    CreatedDate: '2023-05-03T10:34:07.000+0000',
    CreatedById: '0055i000007S72zAAC',
    LastModifiedDate: '2023-05-03T10:34:07.000+0000',
    LastModifiedById: '0055i000007S72zAAC',
    SystemModstamp: '2023-05-03T10:37:48.000+0000',
    LastActivityDate: null,
    LastViewedDate: null,
    LastReferencedDate: null,
    Jigsaw: null,
    JigsawContactId: null,
    CleanStatus: 'Pending',
    CompanyDunsNumber: null,
    DandbCompanyId: null,
    EmailBouncedReason: null,
    EmailBouncedDate: null,
    IndividualId: null,
    SICCode__c: '7267',
    ProductInterest__c: 'GC5000 series',
    Primary__c: 'Yes',
    CurrentGenerators__c: 'John Deere',
    NumberofLocations__c: 3,
  },
  {
    attributes: {
      type: 'Lead',
      url: '/services/data/v57.0/sobjects/Lead/00Q5i00000GAqYvEAL',
    },
    Id: '00Q5i00000GAqYvEAL',
    IsDeleted: false,
    MasterRecordId: null,
    LastName: 'Dadio Jr',
    FirstName: 'Bill',
    Salutation: 'Mr',
    Name: 'Bill Dadio Jr',
    Title: 'CFO',
    Company: 'Zenith Industrial Partners',
    Street: null,
    City: null,
    State: 'OH',
    PostalCode: null,
    Country: 'USA',
    Latitude: null,
    Longitude: null,
    GeocodeAccuracy: null,
    Address: {
      city: null,
      country: 'USA',
      geocodeAccuracy: null,
      latitude: null,
      longitude: null,
      postalCode: null,
      state: 'OH',
      street: null,
    },
    Phone: '(614) 431-5000',
    MobilePhone: null,
    Fax: null,
    Email: 'bill_dadio@zenith.com',
    Website: null,
    PhotoUrl: '/services/images/photo/00Q5i00000GAqYvEAL',
    Description: null,
    LeadSource: 'Web',
    Status: 'Closed - Not Converted',
    Industry: null,
    Rating: null,
    AnnualRevenue: null,
    NumberOfEmployees: null,
    OwnerId: '0055i000007S72zAAC',
    IsConverted: false,
    ConvertedDate: null,
    ConvertedAccountId: null,
    ConvertedContactId: null,
    ConvertedOpportunityId: null,
    IsUnreadByOwner: true,
    CreatedDate: '2023-05-03T10:34:07.000+0000',
    CreatedById: '0055i000007S72zAAC',
    LastModifiedDate: '2023-05-03T10:34:07.000+0000',
    LastModifiedById: '0055i000007S72zAAC',
    SystemModstamp: '2023-05-03T10:37:48.000+0000',
    LastActivityDate: null,
    LastViewedDate: null,
    LastReferencedDate: null,
    Jigsaw: null,
    JigsawContactId: null,
    CleanStatus: 'Pending',
    CompanyDunsNumber: null,
    DandbCompanyId: null,
    EmailBouncedReason: null,
    EmailBouncedDate: null,
    IndividualId: null,
    SICCode__c: '7267',
    ProductInterest__c: 'GC5000 series',
    Primary__c: 'Yes',
    CurrentGenerators__c: 'John Deere',
    NumberofLocations__c: 3,
  },
  {
    attributes: {
      type: 'Lead',
      url: '/services/data/v57.0/sobjects/Lead/00Q5i00000GAqYwEAL',
    },
    Id: '00Q5i00000GAqYwEAL',
    IsDeleted: false,
    MasterRecordId: null,
    LastName: 'Luce',
    FirstName: 'Eugena',
    Salutation: 'Ms',
    Name: 'Eugena Luce',
    Title: 'CEO',
    Company: 'Pacific Retail Group',
    Street: null,
    City: null,
    State: 'MA',
    PostalCode: null,
    Country: 'USA',
    Latitude: null,
    Longitude: null,
    GeocodeAccuracy: null,
    Address: {
      city: null,
      country: 'USA',
      geocodeAccuracy: null,
      latitude: null,
      longitude: null,
      postalCode: null,
      state: 'MA',
      street: null,
    },
    Phone: '(781) 270-6500',
    MobilePhone: null,
    Fax: null,
    Email: 'eluce@pacificretail.com',
    Website: null,
    PhotoUrl: '/services/images/photo/00Q5i00000GAqYwEAL',
    Description: null,
    LeadSource: 'Purchased List',
    Status: 'Closed - Not Converted',
    Industry: null,
    Rating: null,
    AnnualRevenue: null,
    NumberOfEmployees: null,
    OwnerId: '0055i000007S72zAAC',
    IsConverted: false,
    ConvertedDate: null,
    ConvertedAccountId: null,
    ConvertedContactId: null,
    ConvertedOpportunityId: null,
    IsUnreadByOwner: true,
    CreatedDate: '2023-05-03T10:34:07.000+0000',
    CreatedById: '0055i000007S72zAAC',
    LastModifiedDate: '2023-05-03T10:34:07.000+0000',
    LastModifiedById: '0055i000007S72zAAC',
    SystemModstamp: '2023-05-03T10:37:48.000+0000',
    LastActivityDate: null,
    LastViewedDate: null,
    LastReferencedDate: null,
    Jigsaw: null,
    JigsawContactId: null,
    CleanStatus: 'Pending',
    CompanyDunsNumber: null,
    DandbCompanyId: null,
    EmailBouncedReason: null,
    EmailBouncedDate: null,
    IndividualId: null,
    SICCode__c: '2768',
    ProductInterest__c: 'GC5000 series',
    Primary__c: 'Yes',
    CurrentGenerators__c: 'All',
    NumberofLocations__c: 130,
  },
  {
    attributes: {
      type: 'Lead',
      url: '/services/data/v57.0/sobjects/Lead/00Q5i00000GAqYxEAL',
    },
    Id: '00Q5i00000GAqYxEAL',
    IsDeleted: false,
    MasterRecordId: null,
    LastName: 'Eberhard',
    FirstName: 'Sandra',
    Salutation: 'Ms',
    Name: 'Sandra Eberhard',
    Title: 'VP, Production',
    Company: 'Highland Manufacturing Ltd.',
    Street: null,
    City: null,
    State: 'CA',
    PostalCode: null,
    Country: 'USA',
    Latitude: null,
    Longitude: null,
    GeocodeAccuracy: null,
    Address: {
      city: null,
      country: 'USA',
      geocodeAccuracy: null,
      latitude: null,
      longitude: null,
      postalCode: null,
      state: 'CA',
      street: null,
    },
    Phone: '(626) 440-0700',
    MobilePhone: null,
    Fax: null,
    Email: 'sandra_e@highland.net',
    Website: null,
    PhotoUrl: '/services/images/photo/00Q5i00000GAqYxEAL',
    Description: null,
    LeadSource: 'Purchased List',
    Status: 'Working - Contacted',
    Industry: null,
    Rating: null,
    AnnualRevenue: null,
    NumberOfEmployees: null,
    OwnerId: '0055i000007S72zAAC',
    IsConverted: false,
    ConvertedDate: null,
    ConvertedAccountId: null,
    ConvertedContactId: null,
    ConvertedOpportunityId: null,
    IsUnreadByOwner: true,
    CreatedDate: '2023-05-03T10:34:07.000+0000',
    CreatedById: '0055i000007S72zAAC',
    LastModifiedDate: '2023-05-03T10:34:07.000+0000',
    LastModifiedById: '0055i000007S72zAAC',
    SystemModstamp: '2023-05-03T10:37:48.000+0000',
    LastActivityDate: null,
    LastViewedDate: null,
    LastReferencedDate: null,
    Jigsaw: null,
    JigsawContactId: null,
    CleanStatus: 'Pending',
    CompanyDunsNumber: null,
    DandbCompanyId: null,
    EmailBouncedReason: null,
    EmailBouncedDate: null,
    IndividualId: null,
    SICCode__c: '2768',
    ProductInterest__c: 'GC5000 series',
    Primary__c: 'Yes',
    CurrentGenerators__c: 'All',
    NumberofLocations__c: 130,
  },
  {
    attributes: {
      type: 'Lead',
      url: '/services/data/v57.0/sobjects/Lead/00Q5i00000FFO6aEAH',
    },
    Id: '00Q5i00000FFO6aEAH',
    IsDeleted: false,
    MasterRecordId: null,
    LastName: 'malik',
    FirstName: 'imran',
    Salutation: 'Mr.',
    Name: 'imran malik',
    Title: 'software engineer',
    Company: 'nlstech',
    Street: null,
    City: null,
    State: null,
    PostalCode: null,
    Country: null,
    Latitude: null,
    Longitude: null,
    GeocodeAccuracy: null,
    Address: null,
    Phone: null,
    MobilePhone: null,
    Fax: null,
    Email: 'imran.malik@nlstech.com',
    Website: null,
    PhotoUrl: '/services/images/photo/00Q5i00000FFO6aEAH',
    Description: null,
    LeadSource: null,
    Status: 'Open - Not Contacted',
    Industry: null,
    Rating: null,
    AnnualRevenue: null,
    NumberOfEmployees: null,
    OwnerId: '0055i000007S72zAAC',
    IsConverted: false,
    ConvertedDate: null,
    ConvertedAccountId: null,
    ConvertedContactId: null,
    ConvertedOpportunityId: null,
    IsUnreadByOwner: false,
    CreatedDate: '2023-05-05T09:52:45.000+0000',
    CreatedById: '0055i000007S72zAAC',
    LastModifiedDate: '2023-05-05T09:52:49.000+0000',
    LastModifiedById: '0055i000007S72zAAC',
    SystemModstamp: '2023-05-05T09:52:49.000+0000',
    LastActivityDate: null,
    LastViewedDate: '2023-05-16T07:16:04.000+0000',
    LastReferencedDate: '2023-05-16T07:16:04.000+0000',
    Jigsaw: null,
    JigsawContactId: null,
    CleanStatus: 'Pending',
    CompanyDunsNumber: null,
    DandbCompanyId: null,
    EmailBouncedReason: null,
    EmailBouncedDate: null,
    IndividualId: null,
    SICCode__c: null,
    ProductInterest__c: null,
    Primary__c: null,
    CurrentGenerators__c: null,
    NumberofLocations__c: null,
  },
  {
    attributes: {
      type: 'Lead',
      url: '/services/data/v57.0/sobjects/Lead/00Q5i00000FFO6fEAH',
    },
    Id: '00Q5i00000FFO6fEAH',
    IsDeleted: false,
    MasterRecordId: null,
    LastName: 'sweeden',
    FirstName: 'malmo',
    Salutation: 'Ms.',
    Name: 'malmo sweeden',
    Title: null,
    Company: 'nlstech',
    Street: null,
    City: null,
    State: null,
    PostalCode: null,
    Country: null,
    Latitude: null,
    Longitude: null,
    GeocodeAccuracy: null,
    Address: null,
    Phone: null,
    MobilePhone: null,
    Fax: null,
    Email: null,
    Website: null,
    PhotoUrl: '/services/images/photo/00Q5i00000FFO6fEAH',
    Description: null,
    LeadSource: null,
    Status: 'Open - Not Contacted',
    Industry: null,
    Rating: null,
    AnnualRevenue: null,
    NumberOfEmployees: null,
    OwnerId: '0055i000007S72zAAC',
    IsConverted: false,
    ConvertedDate: null,
    ConvertedAccountId: null,
    ConvertedContactId: null,
    ConvertedOpportunityId: null,
    IsUnreadByOwner: false,
    CreatedDate: '2023-05-05T09:53:44.000+0000',
    CreatedById: '0055i000007S72zAAC',
    LastModifiedDate: '2023-05-08T07:54:14.000+0000',
    LastModifiedById: '0055i000007S72zAAC',
    SystemModstamp: '2023-05-08T07:54:14.000+0000',
    LastActivityDate: null,
    LastViewedDate: '2023-05-08T07:54:17.000+0000',
    LastReferencedDate: '2023-05-08T07:54:17.000+0000',
    Jigsaw: null,
    JigsawContactId: null,
    CleanStatus: 'Pending',
    CompanyDunsNumber: null,
    DandbCompanyId: null,
    EmailBouncedReason: null,
    EmailBouncedDate: null,
    IndividualId: null,
    SICCode__c: null,
    ProductInterest__c: null,
    Primary__c: null,
    CurrentGenerators__c: null,
    NumberofLocations__c: null,
  },
]
const customStyles = {
  pagination: 'flex justify-center mt-8 space-x-2',
  pageLink:
    'bg-white hover:bg-black hover:text-white text-black px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-black cursor-pointer',
  disabledLink:
    'bg-gray-200 px-4 py-2 rounded-md text-gray-400 pointer-events-none',
  activeLink: 'cursor-pointer border border-gray-800',
}

const TableComponents6: React.FC<TableProps> = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [contacts, setContacts] = useState([])
  const usersPerPage = 5
  const pagesVisited = (pageNumber - 1) * usersPerPage
  const [globalSearch, setGlobalSearch] = useState('')
  const [searchFirstname, setSearchFirstname]: any = useState('')
  const [searchLastName, setSearchLastName]: any = useState('')
  const [searchIndustry, setSearchIndustry] = useState('')
  const [searchJobTitle, setSearchJobTitle] = useState('')
  // const [searchAccountName, setSearchAccountName] = useState('')
  const [searchLeadOwner, setSearchLeadOwner] = useState('')
  const [searchWebsite, setSearchWebsite] = useState('')
  const [searchLeadSource, setSearchLeadSource] = useState('')
  const [searchEmail, setSearchEmail] = useState('')
  const [searchCountry, setSearchCountry] = useState('')
  const [searchPhone, setSearchPhone] = useState('')
  const [filteredData, setfilteredData] = useState(contacts)
  const [allData, setAllData] = useState([])
  // const [filteredData, setfilteredData] = useState(data)
  // const [allData, setAllData] = useState(data)
  const [updateData, setUpdateData] = useState(data)
  const [accessToken, setAccessToken] = useState('')
  const router = useRouter()
  const { code }: any = router.query

  useEffect(() => {
    const refreshToken = async () => {
      console.log('access code', code)
      if (code !== undefined && code !== null && code) {
        const refreshTokenData: any = await axios.post(
          '/api/salesforce/authentication',
          {
            body: {
              code: code,
            },
          }
        )
        setAccessToken(refreshTokenData.data.access_token)
      }
    }

    refreshToken()
  }, [code])

  const filterFirstNameSearch = async () => {
    const contactsData: any = await axios.get('/api/salesforce/leads', {
      params: {
        FirstName: searchFirstname,
        Industry: searchIndustry,
        Title: searchJobTitle,
        // AccountName: searchAccountName,
        LeadOwner: searchLeadOwner,
        LastName: searchLastName,
        Website: searchWebsite,
        LeadSource: searchLeadSource,
        Country: searchCountry,
        Email: searchEmail,
        Phone: searchPhone,
        accessToken: accessToken,
      },
    })
    // console.log(contactsData.data)
    setfilteredData(contactsData.data)
  }

  const filterGlobalSearch = async () => {
    const contactsData: any = await axios.get('/api/salesforce/leads', {
      params: {
        GlobalSearch: globalSearch,
        accessToken: accessToken,
      },
    })
    // console.log(contactsData.data)
    setfilteredData(contactsData.data)
  }

  useEffect(() => {}, [
    searchFirstname,
    searchIndustry,
    searchJobTitle,
    // searchAccountName,
    searchLeadOwner,
    searchWebsite,
    searchLeadSource,
    searchEmail,
    searchCountry,
    searchPhone,
    searchLastName,
    globalSearch,
    setfilteredData,
  ])

  const handleInputChange = (index: any, field: any, value: any) => {
    const updatedData: any = [...updateData]
    updatedData[index][field] = value
    // console.log("updatedData",updatedData)
  }

  const handleInputSubmit = (index: any, field: any, value: any) => {
    const updatedData: any = [...updateData]
    updatedData[index][field] = value
    setUpdateData(updatedData)
  }

  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected + 1)
  }

  const pageCount = Math.ceil(filteredData?.length / usersPerPage)

  const handleImportContacts = async () => {
    const contactsData: any = await axios.get(`/api/salesforce/leads`, {
      params: {
        accessToken: accessToken,
      },
    })
    setContacts(contactsData.data)
    setAllData(contactsData.data)
    setfilteredData(contactsData.data)

    // console.log('contactsData', contactsData.data)
    // console.log('filteredData', filteredData)
  }

  const handleSubmitContacts = async () => {
    // console.log('updateData', updateData)
    const contactsData: any = await axios.post(
      `/api/salesforce/leads`,
      updateData
    )
    // console.log('contactsData', contactsData)
  }

  return (
    <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8 mt-[3%]">
      {/* <button onClick={refreshToken}>Refresh Token </button> */}
      <div className="flex flex-wrap justify-between items-center">
        <h2 className="text-lg leading-6 font-medium text-gray-900 w-full md:w-auto mb-4 md:mb-0">
          Your Leads Table
        </h2>
        <div className="flex items-center w-full md:w-auto">
          <div className="relative text-gray-400 focus-within:text-gray-600 w-full md:w-auto">
            <input
              className="block w-full pl-10 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              style={{ backgroundColor: '#E8EDEF' }}
              type="text"
              placeholder="Search"
              value={globalSearch}
              onChange={(e) => {
                setGlobalSearch(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  filterGlobalSearch()
                }
              }}
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <IoSearch className="h-5 w-5" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead
                  className="bg-gray-50"
                  style={{ backgroundColor: '#E8EDEF' }}
                >
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      select
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      First Name
                      <div className="relative text-gray-400 focus-within:text-gray-600 w-full md:w-auto border border-black rounded-md">
                        <input
                          className="block w-full pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-black focus:ring-1 focus:ring-black-500 focus:border-black-500 sm:text-sm"
                          style={{ backgroundColor: '#E8EDEF' }}
                          type="text"
                          placeholder="Search"
                          value={searchFirstname}
                          onChange={(e) => {
                            setSearchFirstname(e.target.value)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              filterFirstNameSearch()
                            }
                          }}
                        />
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                          <IoSearch className="h-5 w-5" aria-hidden="true" />
                        </span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Last Name
                      <div className="relative text-gray-400 focus-within:text-gray-600 w-full md:w-auto border border-black rounded-md">
                        <input
                          className="block w-full pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-black focus:ring-1 focus:ring-black-500 focus:border-black-500 sm:text-sm"
                          style={{ backgroundColor: '#E8EDEF' }}
                          type="text"
                          placeholder="Search"
                          value={searchLastName}
                          onChange={(e) => {
                            setSearchLastName(e.target.value)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              filterFirstNameSearch()
                            }
                          }}
                        />
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                          <IoSearch className="h-5 w-5" aria-hidden="true" />
                        </span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Job Title
                      <div className="relative text-gray-400 focus-within:text-gray-600 w-full md:w-auto border border-black rounded-md">
                        {/* JobTitle filter */}
                        <input
                          className="block w-full pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-black focus:ring-1 focus:ring-black-500 focus:border-black-500 sm:text-sm"
                          style={{ backgroundColor: '#E8EDEF' }}
                          type="text"
                          placeholder="Search jobTitle"
                          value={searchJobTitle}
                          onChange={(e) => {
                            setSearchJobTitle(e.target.value)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              // filterJobTitleSearch()
                              filterFirstNameSearch()
                            }
                          }}
                        />
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                          <IoSearch className="h-5 w-5" aria-hidden="true" />
                        </span>
                      </div>
                    </th>
                    {/* <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Account Name
                      <div className="relative text-gray-400 focus-within:text-gray-600 w-full md:w-auto border border-black rounded-md">
                        Account Name filter
                        <input
                          className="block w-full pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-black focus:ring-1 focus:ring-black-500 focus:border-black-500 sm:text-sm"
                          style={{ backgroundColor: '#E8EDEF' }}
                          type="text"
                          placeholder="Search Account"
                          value={searchAccountName}
                          onChange={(e) => {
                            setSearchAccountName(e.target.value)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              filterFirstNameSearch()
                            }
                          }}
                        />
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                          <IoSearch className="h-5 w-5" aria-hidden="true" />
                        </span>
                      </div>
                    </th> */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Country
                      <div className="relative text-gray-400 focus-within:text-gray-600 w-full md:w-auto border border-black rounded-md">
                        {/* Country filter */}
                        <input
                          className="block w-full pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-black focus:ring-1 focus:ring-black-500 focus:border-black-500 sm:text-sm"
                          style={{ backgroundColor: '#E8EDEF' }}
                          type="text"
                          placeholder="Search Country"
                          value={searchCountry}
                          onChange={(e) => {
                            setSearchCountry(e.target.value)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              // filterCountrySearch()
                              filterFirstNameSearch()
                            }
                          }}
                        />
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                          <IoSearch className="h-5 w-5" aria-hidden="true" />
                        </span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Phone Number
                      <div className="relative text-gray-400 focus-within:text-gray-600 w-full md:w-auto border border-black rounded-md">
                        {/* Phone filter */}
                        <input
                          className="block w-full pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-black focus:ring-1 focus:ring-black-500 focus:border-black-500 sm:text-sm"
                          style={{ backgroundColor: '#E8EDEF' }}
                          type="text"
                          placeholder="Search Phone"
                          value={searchPhone}
                          onChange={(e) => {
                            setSearchPhone(e.target.value)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              // filterPhoneSearch()
                              filterFirstNameSearch()
                            }
                          }}
                        />
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                          <IoSearch className="h-5 w-5" aria-hidden="true" />
                        </span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Primary Email
                      <div className="relative text-gray-400 focus-within:text-gray-600 w-full md:w-auto border border-black rounded-md">
                        {/* Email filter */}
                        <input
                          className="block w-full pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-black focus:ring-1 focus:ring-black-500 focus:border-black-500 sm:text-sm"
                          style={{ backgroundColor: '#E8EDEF' }}
                          type="text"
                          placeholder="Search Email"
                          value={searchEmail}
                          onChange={(e) => {
                            setSearchEmail(e.target.value)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              // filterEmailSearch()
                              filterFirstNameSearch()
                            }
                          }}
                        />
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                          <IoSearch className="h-5 w-5" aria-hidden="true" />
                        </span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Website
                      <div className="relative text-gray-400 focus-within:text-gray-600 w-full md:w-auto border border-black rounded-md">
                        {/* website filter */}
                        <input
                          className="block w-full pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-black focus:ring-1 focus:ring-black-500 focus:border-black-500 sm:text-sm"
                          style={{ backgroundColor: '#E8EDEF' }}
                          type="text"
                          placeholder="Search website"
                          value={searchWebsite}
                          onChange={(e) => {
                            setSearchWebsite(e.target.value)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              filterFirstNameSearch()
                            }
                          }}
                        />
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                          <IoSearch className="h-5 w-5" aria-hidden="true" />
                        </span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Industry
                      <div className="relative text-gray-400 focus-within:text-gray-600 w-full md:w-auto border border-black rounded-md">
                        {/* Industry filter */}
                        <input
                          className="block w-full pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-black focus:ring-1 focus:ring-black-500 focus:border-black-500 sm:text-sm"
                          style={{ backgroundColor: '#E8EDEF' }}
                          type="text"
                          placeholder="Search Industry"
                          value={searchIndustry}
                          onChange={(e) => {
                            setSearchIndustry(e.target.value)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              filterFirstNameSearch()
                            }
                          }}
                        />
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                          <IoSearch className="h-5 w-5" aria-hidden="true" />
                        </span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Lead Owner
                      <div className="relative text-gray-400 focus-within:text-gray-600 w-full md:w-auto border border-black rounded-md">
                        {/* Lead Owner filter */}
                        <input
                          className="block w-full pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-black focus:ring-1 focus:ring-black-500 focus:border-black-500 sm:text-sm"
                          style={{ backgroundColor: '#E8EDEF' }}
                          type="text"
                          placeholder="Search Owner"
                          value={searchLeadOwner}
                          onChange={(e) => {
                            setSearchLeadOwner(e.target.value)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              filterFirstNameSearch()
                            }
                          }}
                        />
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                          <IoSearch className="h-5 w-5" aria-hidden="true" />
                        </span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Lead Source
                      <div className="relative text-gray-400 focus-within:text-gray-600 w-full md:w-auto border border-black rounded-md">
                        {/* Lead Source filter */}
                        <input
                          className="block w-full pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-black focus:ring-1 focus:ring-black-500 focus:border-black-500 sm:text-sm"
                          style={{ backgroundColor: '#E8EDEF' }}
                          type="text"
                          placeholder="Search LeadSource"
                          value={searchLeadSource}
                          onChange={(e) => {
                            setSearchLeadSource(e.target.value)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              filterFirstNameSearch()
                            }
                          }}
                        />
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                          <IoSearch className="h-5 w-5" aria-hidden="true" />
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData ? (
                    filteredData
                      .slice(pagesVisited, pagesVisited + usersPerPage)
                      .map((item: any, index) => (
                        <tr key={item.Id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-blue-600"
                            />
                          </td>
                          {/* firstname */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.FirstName ? (
                                item.FirstName
                              ) : (
                                <input
                                  className="block w-full pl-5 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-black focus:ring-1 focus:ring-black-500 focus:border-black-500 sm:text-sm"
                                  style={{ backgroundColor: '#E8EDEF' }}
                                  type="text"
                                  placeholder="Enter FirstName"
                                  value={item.FirstName}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      'FirstName',
                                      e.target.value
                                    )
                                  }
                                  onKeyDown={(e: any) => {
                                    if (e.key === 'Enter') {
                                      handleInputSubmit(
                                        index,
                                        'FirstName',
                                        e.target.value
                                      )
                                    }
                                  }}
                                />
                              )}
                            </div>
                          </td>
                          {/* lastname */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.LastName ? (
                                item.LastName
                              ) : (
                                <input
                                  className="block w-full pl-5 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-black focus:ring-1 focus:ring-black-500 focus:border-black-500 sm:text-sm"
                                  style={{ backgroundColor: '#E8EDEF' }}
                                  type="text"
                                  placeholder="Enter LastName"
                                  value={item.LastName}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      'LastName',
                                      e.target.value
                                    )
                                  }
                                  onKeyDown={(e: any) => {
                                    if (e.key === 'Enter') {
                                      handleInputSubmit(
                                        index,
                                        'LastName',
                                        e.target.value
                                      )
                                    }
                                  }}
                                />
                              )}
                            </div>
                          </td>
                          {/* job title */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.Title ? (
                                item.Title
                              ) : (
                                <input
                                  className="block w-full pl-5 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-black focus:ring-1 focus:ring-black-500 focus:border-black-500 sm:text-sm"
                                  style={{ backgroundColor: '#E8EDEF' }}
                                  type="text"
                                  placeholder="Enter Job Title"
                                  value={item.Title}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      'Title',
                                      e.target.value
                                    )
                                  }
                                  onKeyDown={(e: any) => {
                                    if (e.key === 'Enter') {
                                      handleInputSubmit(
                                        index,
                                        'Title',
                                        e.target.value
                                      )
                                    }
                                  }}
                                />
                              )}
                            </div>
                          </td>
                          {/* account name */}
                          {/* <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.AccountName ? (
                              item.AccountName
                            ) : (
                              <input
                                className="block w-full pl-5 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-black focus:ring-1 focus:ring-black-500 focus:border-black-500 sm:text-sm"
                                style={{ backgroundColor: '#E8EDEF' }}
                                type="text"
                                placeholder="Enter Account Name"
                                value={item.AccountName}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    'AccountName',
                                    e.target.value
                                  )
                                }
                                onKeyDown={(e: any) => {
                                  if (e.key === 'Enter') {
                                    handleInputSubmit(
                                      index,
                                      'AccountName',
                                      e.target.value
                                    )
                                  }
                                }}
                              />
                            )}
                          </div>
                        </td> */}
                          {/* country */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.Country ? (
                                item.Country
                              ) : (
                                <input
                                  className="block w-full pl-5 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-black focus:ring-1 focus:ring-black-500 focus:border-black-500 sm:text-sm"
                                  style={{ backgroundColor: '#E8EDEF' }}
                                  type="text"
                                  placeholder="Enter Country"
                                  value={item.Country}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      'Country',
                                      e.target.value
                                    )
                                  }
                                  onKeyDown={(e: any) => {
                                    if (e.key === 'Enter') {
                                      handleInputSubmit(
                                        index,
                                        'Country',
                                        e.target.value
                                      )
                                    }
                                  }}
                                />
                              )}
                            </div>
                          </td>
                          {/* phone */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.Phone ? (
                                item.Phone
                              ) : (
                                <input
                                  className="block w-full pl-5 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-black focus:ring-1 focus:ring-black-500 focus:border-black-500 sm:text-sm"
                                  style={{ backgroundColor: '#E8EDEF' }}
                                  type="text"
                                  placeholder="Enter Phone"
                                  value={item.Phone}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      'Phone',
                                      e.target.value
                                    )
                                  }
                                  onKeyDown={(e: any) => {
                                    if (e.key === 'Enter') {
                                      handleInputSubmit(
                                        index,
                                        'Phone',
                                        e.target.value
                                      )
                                    }
                                  }}
                                />
                              )}
                            </div>
                          </td>
                          {/* email */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.Email ? (
                                item.Email
                              ) : (
                                <input
                                  className="block w-full pl-5 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-black focus:ring-1 focus:ring-black-500 focus:border-black-500 sm:text-sm"
                                  style={{ backgroundColor: '#E8EDEF' }}
                                  type="text"
                                  placeholder="Enter Email"
                                  value={item.Email}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      'Email',
                                      e.target.value
                                    )
                                  }
                                  onKeyDown={(e: any) => {
                                    if (e.key === 'Enter') {
                                      handleInputSubmit(
                                        index,
                                        'Email',
                                        e.target.value
                                      )
                                    }
                                  }}
                                />
                              )}
                            </div>
                          </td>
                          {/* website */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.Website ? (
                                item.Website
                              ) : (
                                <input
                                  className="block w-full pl-5 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-black focus:ring-1 focus:ring-black-500 focus:border-black-500 sm:text-sm"
                                  style={{ backgroundColor: '#E8EDEF' }}
                                  type="text"
                                  placeholder="Enter Website"
                                  value={item.Website}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      'Website',
                                      e.target.value
                                    )
                                  }
                                  onKeyDown={(e: any) => {
                                    if (e.key === 'Enter') {
                                      handleInputSubmit(
                                        index,
                                        'Website',
                                        e.target.value
                                      )
                                    }
                                  }}
                                />
                              )}
                            </div>
                          </td>
                          {/* industry */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.Industry ? (
                                item.Industry
                              ) : (
                                <input
                                  className="block w-full pl-5 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-black focus:ring-1 focus:ring-black-500 focus:border-black-500 sm:text-sm"
                                  style={{ backgroundColor: '#E8EDEF' }}
                                  type="text"
                                  placeholder="Enter Industry"
                                  value={item.Industry}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      'Industry',
                                      e.target.value
                                    )
                                  }
                                  onKeyDown={(e: any) => {
                                    if (e.key === 'Enter') {
                                      handleInputSubmit(
                                        index,
                                        'Industry',
                                        e.target.value
                                      )
                                    }
                                  }}
                                />
                              )}
                            </div>
                          </td>
                          {/* Lead Owner */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.Owner ? (
                                item.Owner.Name
                              ) : (
                                <input
                                  className="block w-full pl-5 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-black focus:ring-1 focus:ring-black-500 focus:border-black-500 sm:text-sm"
                                  style={{ backgroundColor: '#E8EDEF' }}
                                  type="text"
                                  placeholder="Enter LeadOwner"
                                  value={item.Owner?.Name}
                                  // onChange={(e) =>
                                  //   handleInputChange(
                                  //     index,
                                  //     'Owner.Name',
                                  //     e.target.value
                                  //   )
                                  // }
                                  // onKeyDown={(e: any) => {
                                  //   if (e.key === 'Enter') {
                                  //     handleInputSubmit(
                                  //       index,
                                  //       'Owner.Name',
                                  //       e.target.value
                                  //     )
                                  //   }
                                  // }}
                                />
                              )}
                            </div>
                          </td>
                          {/* Lead Source */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.LeadSource ? (
                                item.LeadSource
                              ) : (
                                <input
                                  className="block w-full pl-5 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-black focus:ring-1 focus:ring-black-500 focus:border-black-500 sm:text-sm"
                                  style={{ backgroundColor: '#E8EDEF' }}
                                  type="text"
                                  placeholder="Enter LeadSource"
                                  value={item.LeadSource}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      'LeadSource',
                                      e.target.value
                                    )
                                  }
                                  onKeyDown={(e: any) => {
                                    if (e.key === 'Enter') {
                                      handleInputSubmit(
                                        index,
                                        'LeadSource',
                                        e.target.value
                                      )
                                    }
                                  }}
                                />
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <h4> data is not present</h4>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="flex justify-center mt-8">
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={customStyles.pagination}
            pageLinkClassName={customStyles.pageLink}
            previousLinkClassName={customStyles.pageLink}
            nextLinkClassName={customStyles.pageLink}
            activeLinkClassName={customStyles.activeLink}
            disabledLinkClassName={customStyles.disabledLink}
            pageClassName="pagination-item"
          />
          <div className="absolute right-4 mt-6">
            <button
              className="bg-black hover:bg-gray-500 hover:text-white text-white px-4 py-2 rounded-full border border-transparent"
              onClick={handleImportContacts}
            >
              Import Contacts
            </button>
            <button
              className="bg-black hover:bg-gray-500 hover:text-white text-white px-4 py-2 rounded-full border border-transparent mr-10 ml-5"
              onClick={handleSubmitContacts}
            >
              Submit Contacts
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TableComponents6
