const countryGroups = {
  Asia: [
    'Afghanistan',
    'Armenia',
    'Azerbaijan',
    'Bahrain',
    'Bangladesh',
    'Bhutan',
    'Brunei',
    'Cambodia',
    'China',
    'Cyprus',
    'Georgia',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Israel',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Lebanon',
    'Malaysia',
    'Maldives',
    'Mongolia',
    'Myanmar',
    'Nepal',
    'North Korea',
    'Oman',
    'Pakistan',
    'Palestine',
    'Philippines',
    'Qatar',
    'Saudi Arabia',
    'Singapore',
    'South Korea',
    'Sri Lanka',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Thailand',
    'Timor-Leste',
    'Turkey',
    'Turkmenistan',
    'United Arab Emirates',
    'Uzbekistan',
    'Vietnam',
    'Yemen'
  ],
  Europe: [
    'Albania',
    'Andorra',
    'Austria',
    'Belarus',
    'Belgium',
    'Bosnia and Herzegovina',
    'Bulgaria',
    'Croatia',
    'Czech Republic',
    'Denmark',
    'Estonia',
    'Finland',
    'France',
    'Germany',
    'Greece',
    'Hungary',
    'Iceland',
    'Ireland',
    'Italy',
    'Kosovo',
    'Latvia',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Malta',
    'Moldova',
    'Monaco',
    'Montenegro',
    'Netherlands',
    'North Macedonia',
    'Norway',
    'Poland',
    'Portugal',
    'Romania',
    'Russia',
    'San Marino',
    'Serbia',
    'Slovakia',
    'Slovenia',
    'Spain',
    'Sweden',
    'Switzerland',
    'Ukraine',
    'United Kingdom',
    'Vatican City'
  ],
  Africa: [
    'Algeria',
    'Angola',
    'Benin',
    'Botswana',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cameroon',
    'Central African Republic',
    'Chad',
    'Comoros',
    'Republic of the Congo',
    'Democratic Republic of the Congo',
    'Djibouti',
    'Egypt',
    'Equatorial Guinea',
    'Eritrea',
    'Eswatini',
    'Ethiopia',
    'Gabon',
    'Gambia',
    'Ghana',
    'Guinea',
    'Guinea-Bissau',
    'Ivory Coast',
    'Kenya',
    'Lesotho',
    'Liberia',
    'Libya',
    'Madagascar',
    'Malawi',
    'Mali',
    'Mauritania',
    'Mauritius',
    'Morocco',
    'Mozambique',
    'Namibia',
    'Niger',
    'Nigeria',
    'Rwanda',
    'Sao Tome and Principe',
    'Senegal',
    'Seychelles',
    'Sierra Leone',
    'Somalia',
    'South Africa',
    'South Sudan',
    'Sudan',
    'Tanzania',
    'Togo',
    'Tunisia',
    'Uganda',
    'Zambia',
    'Zimbabwe'
  ],
  Americas: [
    'Antigua and Barbuda',
    'Argentina',
    'Bahamas',
    'Barbados',
    'Belize',
    'Bolivia',
    'Brazil',
    'Canada',
    'Chile',
    'Colombia',
    'Costa Rica',
    'Cuba',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'El Salvador',
    'Grenada',
    'Guatemala',
    'Guyana',
    'Haiti',
    'Honduras',
    'Jamaica',
    'Mexico',
    'Nicaragua',
    'Panama',
    'Paraguay',
    'Peru',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Suriname',
    'Trinidad and Tobago',
    'United States',
    'Uruguay',
    'Venezuela'
  ],
  Oceania: [
    'Australia',
    'Fiji',
    'Kiribati',
    'Marshall Islands',
    'Micronesia',
    'Nauru',
    'New Zealand',
    'Palau',
    'Papua New Guinea',
    'Samoa',
    'Solomon Islands',
    'Tonga',
    'Tuvalu',
    'Vanuatu'
  ]
};

const schengenCountries = new Set([
  'Austria',
  'Belgium',
  'Croatia',
  'Czech Republic',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Iceland',
  'Italy',
  'Latvia',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Malta',
  'Netherlands',
  'Norway',
  'Poland',
  'Portugal',
  'Slovakia',
  'Slovenia',
  'Spain',
  'Sweden',
  'Switzerland'
]);

const gccCountries = new Set([
  'Bahrain',
  'Kuwait',
  'Oman',
  'Qatar',
  'Saudi Arabia',
  'United Arab Emirates'
]);

const fastEVisaCountries = new Set([
  'Armenia',
  'Azerbaijan',
  'Cambodia',
  'Georgia',
  'Indonesia',
  'Kenya',
  'Malaysia',
  'Singapore',
  'Sri Lanka',
  'Thailand',
  'Turkey',
  'Vietnam'
]);

const baseDocuments = [
  'Valid passport with at least 6 months validity',
  'Recent passport-size photograph',
  'Completed visa application form',
  'Travel dates and provisional itinerary',
  'Financial proof such as bank statements',
  'Employment, business or student proof'
];

const embassyDocuments = [
  ...baseDocuments,
  'Cover letter explaining purpose of travel',
  'Hotel booking or host invitation',
  'Return flight reservation if required'
];

const schengenDocuments = [
  ...baseDocuments,
  'Travel insurance as per Schengen requirement',
  'Hotel bookings and day-wise itinerary',
  'Flight reservations',
  'Income tax return or financial supporting proof'
];

const northAmericaDocuments = [
  ...baseDocuments,
  'Online visa form confirmation',
  'Appointment profile and fee receipt',
  'Invitation letter if visiting family or business host',
  'Proof of strong home-country ties'
];

const supportIncludes = [
  'Document checklist and file preparation guidance',
  'Application form support',
  'Cover letter and itinerary assistance where applicable',
  'Appointment or submission guidance',
  'Status follow-up checklist for the customer'
];

const countryAliases = {
  Australia: ['Sydney', 'Melbourne'],
  Canada: ['Toronto', 'Vancouver'],
  France: ['Paris'],
  Germany: ['Berlin'],
  Italy: ['Rome', 'Milan'],
  Malaysia: ['Kuala Lumpur'],
  Singapore: ['Sentosa'],
  Thailand: ['Bangkok', 'Phuket', 'Krabi'],
  Turkey: ['Istanbul'],
  'United Arab Emirates': ['Dubai', 'Abu Dhabi', 'UAE'],
  'United Kingdom': ['UK', 'London'],
  'United States': ['USA', 'US', 'America', 'New York']
};

function getVisaProfile(country, region) {
  if (schengenCountries.has(country)) {
    return {
      visaType: 'Schengen short-stay tourist visa',
      serviceFee: 'INR 7,499',
      processingTime: '15-25 working days',
      typicalStay: 'Up to 90 days',
      documents: schengenDocuments
    };
  }

  if (country === 'United States' || country === 'Canada') {
    return {
      visaType: 'Visitor visa appointment support',
      serviceFee: 'INR 12,999',
      processingTime: 'Appointment based',
      typicalStay: 'As granted by officer',
      documents: northAmericaDocuments
    };
  }

  if (country === 'United Kingdom' || country === 'Ireland') {
    return {
      visaType: 'Standard visitor visa support',
      serviceFee: 'INR 9,999',
      processingTime: '15-30 working days',
      typicalStay: 'Up to 6 months',
      documents: embassyDocuments
    };
  }

  if (country === 'Australia' || country === 'New Zealand') {
    return {
      visaType: 'Online visitor visa support',
      serviceFee: 'INR 10,999',
      processingTime: '20-35 working days',
      typicalStay: 'As per visa grant',
      documents: embassyDocuments
    };
  }

  if (gccCountries.has(country)) {
    return {
      visaType: 'Tourist eVisa / entry permit support',
      serviceFee: 'INR 3,499',
      processingTime: '3-7 working days',
      typicalStay: '14-60 days',
      documents: [
        'Valid passport with at least 6 months validity',
        'Passport-size photograph',
        'Confirmed travel dates',
        'Hotel or host details',
        'Return flight reservation if required'
      ]
    };
  }

  if (fastEVisaCountries.has(country)) {
    return {
      visaType: 'Tourist eVisa assistance',
      serviceFee: 'INR 2,499',
      processingTime: '3-10 working days',
      typicalStay: '15-90 days',
      documents: [
        'Passport scan',
        'Digital photograph',
        'Travel dates',
        'Hotel or address details',
        'Additional proof if requested by authority'
      ]
    };
  }

  if (region === 'Europe') {
    return {
      visaType: 'Embassy tourist visa support',
      serviceFee: 'INR 6,999',
      processingTime: '15-30 working days',
      typicalStay: 'As per embassy approval',
      documents: embassyDocuments
    };
  }

  if (region === 'Americas') {
    return {
      visaType: 'Visitor visa documentation support',
      serviceFee: 'INR 8,499',
      processingTime: '15-45 working days',
      typicalStay: 'As per visa grant',
      documents: embassyDocuments
    };
  }

  if (region === 'Africa') {
    return {
      visaType: 'Tourist visa / eVisa support',
      serviceFee: 'INR 4,999',
      processingTime: '7-20 working days',
      typicalStay: '30-90 days',
      documents: embassyDocuments
    };
  }

  if (region === 'Oceania') {
    return {
      visaType: 'Visitor visa / entry permit support',
      serviceFee: 'INR 5,999',
      processingTime: '10-25 working days',
      typicalStay: '30-90 days',
      documents: embassyDocuments
    };
  }

  return {
    visaType: 'Tourist visa support',
    serviceFee: 'INR 4,999',
    processingTime: '7-21 working days',
    typicalStay: '30-90 days',
    documents: embassyDocuments
  };
}

export const countryVisaPackages = Object.entries(countryGroups)
  .flatMap(([region, countries]) =>
    countries.map((country) => {
      const profile = getVisaProfile(country, region);
      return {
        country,
        region,
        aliases: countryAliases[country] || [],
        supportIncludes,
        ...profile
      };
    })
  )
  .sort((a, b) => a.country.localeCompare(b.country));

export const countryCount = countryVisaPackages.length;
