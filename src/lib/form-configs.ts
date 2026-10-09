/**
 * Form field configurations — single source of truth.
 * এই config দিয়ে: (১) form render, (২) client/server validation,
 * (৩) admin dashboard এর modal detail — তিনটাই চলে।
 *
 * নতুন field যোগ/বাদ দিতে চাইলে শুধু এখানে edit করলেই সব জায়গায় প্রতিফলিত হবে।
 */

export type FieldType =
  | 'text'
  | 'textarea'
  | 'email'
  | 'tel'
  | 'number'
  | 'date'
  | 'radio'
  | 'checkbox' // multi-select (একাধিক হতে পারে)
  | 'select'
  | 'file'
  | 'section'; // শুধু heading, কোনো input না

export interface FieldConfig {
  /** unique key — MongoDB answers object এ এই key তে value save হয় */
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[]; // radio / checkbox / select এর জন্য
  placeholder?: string;
  help?: string; // ছোট সহায়ক টেক্সট
}

export interface FormConfig {
  slug: string;
  title: string;
  description?: string;
  /** submit API path — না দিলে `/api/form/${slug}` ব্যবহার হবে */
  submitPath?: string;
  /** table/sort এর জন্য primary column keys (admin list এ দেখাবে) */
  listColumns: { key: string; label: string }[];
  fields: FieldConfig[];
}

/* ============================================================
 *  NIKAH AID — পাত্র/পাত্রীর তথ্য
 * ============================================================ */
export const nikahAidConfig: FormConfig = {
  slug: 'nikah-aid',
  title: 'পাত্র/পাত্রীর তথ্য',
  description:
    'নিকাহ এইড — বিয়ের জন্য পাত্র/পাত্রীর তথ্য ফর্ম। সব তথ্য সঠিকভাবে দিন। আপনার নাম গোপন থাকবে।',
  listColumns: [
    { key: 'candidateName', label: 'নাম' },
    { key: 'lookingFor', label: 'খুঁজছেন' },
    { key: 'guardianPhone', label: 'মোবাইল' },
  ],
  fields: [
    { name: 'section_identity', label: 'পরিচয়', type: 'section' },
    { name: 'facebookLink', label: 'পাত্র/পাত্রীর ফেসবুক আইডি লিংক', type: 'text', help: 'জরুরি না' },
    { name: 'candidateName', label: 'পাত্র / পাত্রীর নাম', type: 'text', required: true, help: 'গোপন থাকবে' },
    { name: 'lookingFor', label: 'আপনি কী খুঁজছেন?', type: 'radio', required: true, options: ['পাত্র', 'পাত্রী'] },
    {
      name: 'relationToCandidate',
      label: 'পাত্র/পাত্রীর সাথে আপনার পরিচয়',
      type: 'radio',
      required: true,
      options: ['পাত্র/পাত্রী আপনি নিজে', 'বাবা/মা', 'ভাই/বোন', 'বন্ধু/বান্ধবী'],
    },
    { name: 'guardianName', label: 'পাত্র/পাত্রীর অভিভাবকের নাম', type: 'text', required: true, help: 'ইনশা আল্লাহ্‌ যার সাথে যোগাযোগ করা হবে' },
    { name: 'guardianRelation', label: 'পাত্র/পাত্রীর সাথে অভিভাবকের সম্পর্ক', type: 'text', required: true },
    { name: 'guardianPhone', label: 'অভিভাবকের মোবাইল নাম্বার', type: 'tel', required: true },

    { name: 'section_personal', label: 'ব্যক্তিগত তথ্য', type: 'section' },
    { name: 'birthDate', label: 'পাত্র/পাত্রীর প্রকৃত জন্ম তারিখ', type: 'date', required: true },
    { name: 'jobIntent', label: 'পাত্রী কি বিবাহের পরে চাকরি করতে ইচ্ছুক / স্ত্রীকে বিয়ের পরে চাকরি করাতে ইচ্ছুক?', type: 'text', required: true },
    { name: 'highestEducation', label: 'পাত্র/পাত্রীর সর্বোচ্চ শিক্ষাগত যোগ্যতাসমূহ বিস্তারিত', type: 'textarea', required: true, help: 'স্কুল/কলেজ/বিশ্ববিদ্যালয়/আলিয়া/কউমি/অন্যান্য বিস্তারিত' },
    { name: 'institutions', label: 'পাত্র/পাত্রীর পঠিত শিক্ষা প্রতিষ্ঠানসমূহ', type: 'textarea', required: true },
    { name: 'presentAddress', label: 'বর্তমান / যোগাযোগের ঠিকানা (Present Address)', type: 'textarea', required: true },
    { name: 'permanentAddress', label: 'স্থায়ী ঠিকানা (Permanent Address)', type: 'textarea', required: true },
    { name: 'candidatePhone', label: 'পাত্র/পাত্রীর মোবাইল নং (Phone number)', type: 'tel' },
    { name: 'height', label: 'পাত্র/পাত্রীর উচ্চতা', type: 'text', required: true },
    { name: 'complexion', label: 'পাত্র/পাত্রীর গায়ের রং', type: 'text', required: true },
    { name: 'weight', label: 'পাত্র/পাত্রীর ওজন', type: 'text', required: true },
    {
      name: 'maritalStatus',
      label: 'বৈবাহিক অবস্থা',
      type: 'radio',
      options: ['অবিবাহিত', 'বিবাহিত', 'ডিভোর্সড', 'স্বামী/স্ত্রী অমুসলিম; পাত্র/পাত্রী নওমুসলিম'],
    },
    { name: 'childrenInfo', label: 'ডিভোর্সড/বিধবা/বিবাহিত হলে সন্তানের সংখ্যা ও অবস্থান', type: 'text' },
    { name: 'siblingsInfo', label: 'ভাই-বোনের সংখ্যা ও পাত্র/পাত্রীর অবস্থান', type: 'text' },
    { name: 'bloodGroup', label: 'পাত্র/পাত্রীর রক্তের গ্রুপ', type: 'text', help: 'জানা থাকলে' },

    { name: 'section_deen', label: 'দ্বীনদারি', type: 'section' },
    { name: 'whyMarry', label: 'পাত্র/পাত্রী কেন বিবাহ করতে চান?', type: 'textarea', required: true },
    { name: 'organizations', label: 'কী কী দীনি সংগঠন বা প্রতিষ্ঠানের সাথে যুক্ত আছেন?', type: 'textarea', help: 'থাকলে প্রতিদিন কতটুকু সময় দেন ও কীভাবে কাজ করেন' },
    {
      name: 'salahRegularity',
      label: 'পাত্র কি মসজিদে জামাতে / পাত্রী কি নিয়মিত আওয়াল ওয়াক্তে ৫ ওয়াক্ত নামাজ পড়েন?',
      type: 'radio',
      required: true,
      options: ['হ্যাঁ', 'না', 'মাঝে মাঝে মিস হয়', 'চেষ্টা করছি'],
    },
    { name: 'specialAmal', label: 'নিয়মিত বিশেষ কোন ওযীফা/আমল করেন কি না', type: 'text', required: true },
    { name: 'dawahWork', label: 'নিয়মিত ইসলামের কোন দাওয়াতি কাজে শরীক থাকেন কি না', type: 'text', required: true, help: 'থাকলে সেটার পরিচয় ও বিবরণ' },
    { name: 'occupation', label: 'পাত্র/পাত্রীর পেশার বিস্তারিত বিবরণ', type: 'text', required: true, help: 'প্রতিষ্ঠান ও স্থানের নাম সহ' },
    { name: 'monthlyIncome', label: 'পাত্র/পাত্রীর মাসিক আয়', type: 'text', help: 'যদি থাকে' },
    { name: 'hasBeard', label: '(পাত্রের জন্য প্রযোজ্য) দাঁড়ি রেখেছেন?', type: 'radio', options: ['হ্যাঁ', 'না', 'চেষ্টা করছি', 'নিয়ত আছে'] },
    { name: 'sunnahDress', label: '(পাত্রের জন্য প্রযোজ্য) নিয়মিত সুন্নতি পোশাক (পাঞ্জাবি/জুব্বা+টুপি) পড়েন?', type: 'radio', options: ['হ্যাঁ', 'না', 'চেষ্টা করছি', 'নিয়ত আছে'] },
    { name: 'dressType', label: 'কী ধরণের পোশাক পড়েন?', type: 'text' },
    { name: 'wearsBorkha', label: '(পাত্রীর জন্য প্রযোজ্য) সুন্নতি বোরখা + হাত মোজা + পা মোজা পড়েন?', type: 'radio', options: ['হ্যাঁ', 'না', 'চেষ্টা করছি', 'নিয়ত আছে'] },
    {
      name: 'observesPurdah',
      label: 'নন-মাহরাম বিপরীত লিঙ্গের মানুষদের থেকে শরয়ী পর্দা করেন?',
      type: 'radio',
      required: true,
      options: ['হ্যাঁ', 'না', 'চেষ্টা করি', 'নিয়ত আছে', 'অন্য কিছু হলে নিচে বিস্তারিত বলুন'],
    },
    { name: 'quranReading', label: 'শুদ্ধভাবে কোরআন পড়তে পারেন কি না', type: 'text', help: 'হাফেজ হলে উল্লেখ করবেন / খতম করেছেন কি না' },
    { name: 'favoriteBooks', label: 'আপনার প্রিয় ৩-৫ টি বইয়ের নাম', type: 'textarea', required: true },
    { name: 'whyBooks', label: 'যে কারণে বইগুলো প্রিয়?', type: 'text', required: true },
    { name: 'favoriteScholars', label: 'আপনার ৩-৫ জন প্রিয় স্কলার/লেকচারার/মনীষী', type: 'textarea', required: true },
    { name: 'mazhab', label: 'আপনার মাযহাব?', type: 'textarea', required: true, help: 'হানাফি/আহলে হাদিস/সালাফী/শাফি/হাম্বলি/মালেকি' },

    { name: 'section_partner', label: 'কেমন জীবনসঙ্গী চান?', type: 'section' },
    { name: 'importantToDisclose', label: 'অপর পক্ষকে যা জানানো জরুরি (খারাপ গুণ/স্বভাব/রোগ)', type: 'textarea', required: true },
    {
      name: 'partnerProfession',
      label: 'কী ধরণের পেশার / অবস্থার জীবনসঙ্গী পেতে চান?',
      type: 'radio',
      required: true,
      options: ['ব্যবসায়ী', 'চাকুরিজীবী', 'গৃহিণী', 'বেকার', 'ছাত্র/ছাত্রী', 'রাজনীতিবিদ', 'প্রবাসী', 'নওমুসলিম'],
    },
    { name: 'partnerAge', label: 'জীবনসঙ্গীর বয়স (কত থেকে কত বছর)', type: 'text' },
    { name: 'partnerComplexion', label: 'জীবনসঙ্গীর গায়ের রং (কমপক্ষে কেমন)', type: 'text' },
    { name: 'partnerHeight', label: 'জীবনসঙ্গীর উচ্চতা (কমপক্ষে কেমন)', type: 'text' },
    { name: 'partnerEducation', label: 'জীবনসঙ্গীর শিক্ষাগত যোগ্যতা (কমপক্ষে কেমন)', type: 'textarea', required: true },
    { name: 'partnerDress', label: 'জীবনসঙ্গীর পোশাক (কমপক্ষে কেমন)', type: 'textarea', required: true },
    { name: 'partnerArea', label: 'জীবনসঙ্গীর স্থায়ী বাড়ির এলাকা নিয়ে আগ্রহ', type: 'text' },
    {
      name: 'partnerBackground',
      label: 'জীবনসঙ্গীর ব্যাকগ্রাউন্ড গ্রহণযোগ্য (এক বা একাধিক)',
      type: 'checkbox',
      required: true,
      options: ['নওমুসলিম', 'পাত্রী মাসনা হতে আগ্রহী', 'ডিভোর্সড', 'দরিদ্র', 'জেনারেল ব্যাকগ্রাউন্ড', 'মাদ্রাসা ব্যাকগ্রাউন্ড'],
    },
    { name: 'otherInfo', label: 'আরও কোন তথ্য যা অপর পক্ষকে জানাতে চান', type: 'textarea', required: true },
    { name: 'mustMatch', label: 'অপর পক্ষের আর কোন তথ্য/মতের যেদিকে মিল থাকা আবশ্যক', type: 'text' },
    { name: 'futurePlan', label: 'আপনার ভবিষ্যৎ পরিকল্পনা', type: 'textarea', required: true },

    { name: 'section_misc', label: 'অন্যান্য', type: 'section' },
    { name: 'preferredCandidateId', label: 'পছন্দের পাত্র/পাত্রীর আইডি নম্বর (পেজ/গ্রুপ/ওয়েবসাইট থেকে)', type: 'text' },
    { name: 'feedback', label: 'নিকাহ এইড এর জন্য কোন অভিযোগ/পরামর্শ?', type: 'textarea' },
    {
      name: 'honestyConfirm',
      label: 'কোন কৌশল ছাড়াই আপনি কি আমাদের ১০০% সঠিক তথ্য দিচ্ছেন?',
      type: 'text',
      required: true,
      help: 'কোন তথ্য গোপন করা যাবে না। মুসলিম মিথ্যা বলতে পারে না।',
    },
  ],
};

/* ============================================================
 *  NAF — নওমুসলিমদের জন্ম নিবন্ধনে নাম পরিবর্তন সহায়তা
 * ============================================================ */
export const nafConfig: FormConfig = {
  slug: 'naf',
  submitPath: '/api/form/birthCertificateReform',
  title: 'নওমুসলিমদের জন্ম নিবন্ধনে নাম পরিবর্তন সহায়তা',
  description:
    'জন্ম নিবন্ধন সনদে নাম/তথ্য পরিবর্তন বা নতুন আবেদনে সহায়তার জন্য এই ফর্ম পূরণ করুন।',
  listColumns: [
    { key: 'newNameBn', label: 'নতুন ইসলামী নাম' },
    { key: 'phone', label: 'মোবাইল' },
    { key: 'birthDate', label: 'জন্ম তারিখ' },
  ],
  fields: [
    { name: 'section_basic', label: 'মৌলিক তথ্য', type: 'section' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'oldNameBn', label: 'আপনার পূর্বের পরিপূর্ণ নাম (বাংলা)', type: 'text', required: true },
    { name: 'oldNameEn', label: 'আপনার পূর্বের পরিপূর্ণ নাম (ইংরেজি)', type: 'text', required: true },
    { name: 'newNameBn', label: 'আপনার সম্পূর্ণ নতুন ইসলামী নাম (বাংলা)', type: 'text', required: true },
    { name: 'newNameEn', label: 'আপনার সম্পূর্ণ নতুন ইসলামী নাম (ইংরেজি)', type: 'text', required: true },
    { name: 'phone', label: 'যোগাযোগের সচল মোবাইল নম্বর (English)', type: 'tel', required: true, help: 'যোগাযোগের ব্যক্তি স্বামী/নিজ/অন্যান্য অভিভাবক হলে উল্লেখ করুন (যেমন: স্বামী- 01...)' },

    { name: 'section_support', label: 'সহযোগিতার ধরন', type: 'section' },
    {
      name: 'supportType',
      label: 'আপনি জন্ম নিবন্ধন সনদে কী ধরণের সহযোগিতা চান?',
      type: 'checkbox',
      required: true,
      options: [
        'জন্ম নিবন্ধন নেই। নতুন জন্ম নিবন্ধনের আবেদন করতে চাই।',
        'জন্ম নিবন্ধন আছে। জন্ম নিবন্ধন সনদে নাম পরিবর্তন করতে চাই।',
        'জন্ম নিবন্ধন আছে। জন্ম নিবন্ধন সনদে অন্যান্য তথ্য পরিবর্তন করতে চাই।',
        'পরামর্শ (কাউন্সিলিং) প্রয়োজন',
      ],
    },
    { name: 'existingCertFile', label: 'পূর্বে জন্ম নিবন্ধন থাকলে তার ছবি বা পিডিএফ', type: 'file' },
    { name: 'birthRegNumber', label: 'জন্ম নিবন্ধন নম্বর (১৭ ডিজিটের, ইংরেজি)', type: 'text', help: 'যদি থাকে' },
    { name: 'birthDate', label: 'জন্ম তারিখ (সনদ অনুযায়ী যা আছে)', type: 'date' },
    { name: 'desiredBirthDate', label: 'জন্ম তারিখ সনদে যা উল্লেখ করতে চান', type: 'textarea', help: 'প্রমাণক আবশ্যক' },
    { name: 'birthDateProofFile', label: 'জন্ম তারিখের বিপরীতে প্রমাণক', type: 'file', help: 'টিকা কার্ড/সার্টিফিকেট/চেয়ারম্যান সনদ ইত্যাদি' },
    { name: 'otherChangeProofFile', label: 'অন্যান্য তথ্য পরিবর্তনের বিপরীতে প্রমাণক', type: 'file' },

    { name: 'section_family', label: 'পারিবারিক ও ঠিকানা', type: 'section' },
    { name: 'fatherName', label: 'পিতার নাম (বাংলা ও ইংরেজি উভয়)', type: 'textarea', required: true },
    { name: 'motherName', label: 'মাতার নাম (বাংলা ও ইংরেজি উভয়)', type: 'textarea', required: true },
    { name: 'presentAddress', label: 'বর্তমান ঠিকানা (বাংলা ও ইংরেজি উভয়)', type: 'textarea', required: true, help: 'যেখান থেকে আবেদন করতে চান' },
    { name: 'permanentAddress', label: 'স্থায়ী ঠিকানা / জন্মস্থান (বাংলা ও ইংরেজি উভয়)', type: 'textarea', required: true },

    { name: 'section_docs', label: 'কাগজপত্র ও মন্তব্য', type: 'section' },
    { name: 'affidavitFile', label: 'ধর্ম ও নাম পরিবর্তনের এফিডেভিট (Affidavit)', type: 'file', required: true },
    { name: 'comments', label: 'কোনো জিজ্ঞাসা বা মন্তব্য থাকলে লিখুন', type: 'textarea', required: true },
  ],
};

export const formConfigs: Record<string, FormConfig> = {
  'nikah-aid': nikahAidConfig,
  naf: nafConfig,
  'birth-CertificateReform': nafConfig,
  birthCertificateReform: nafConfig,
};

export function getFormConfig(slug: string): FormConfig | undefined {
  return formConfigs[slug];
}
