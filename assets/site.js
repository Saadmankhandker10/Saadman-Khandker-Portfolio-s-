/* =====================================================================
   Saadman Khandker Portfolio — site behaviour
   Sections:
     1. Environment flags & helpers
     2. Translations (Bangla) + language switching
     3. Live Dhaka clock
     4. Navigation (mobile menu, scroll spy)
     5. Scroll-reveal choreography (char / word split)
     6. Accessible dialogs (focus trap, Escape, backdrop)
     7. Photo lightbox
     8. Projects & case-study dialog
     9. Quote calculator
    10. Typing-speed test
    11. Contact form (validation, honeypot, delivery check)
    12. Studio videos & hero subtitles
    13. Supabase content sync (admin panel)
   ===================================================================== */
(function () {
    'use strict';

    /* ---------- 1. ENVIRONMENT FLAGS & HELPERS ---------- */
    const root = document.documentElement;
    const REDUCE = root.classList.contains('reduce-motion');
    const LITE = root.classList.contains('lite-motion');
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
    const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c]));
    const isPlaceholder = s => /^\s*[“"]?\[/.test(String(s || ''));
    const WHATSAPP = '8801320399465';

    /* ---------- 2. TRANSLATIONS ---------- */
    // English lives in the HTML (good for SEO); this dictionary holds the Bangla for every [data-i18n] key.
    const BN = {
        'a11y.skip': 'মূল অংশে যান',
        'nav.about': 'পরিচিতি', 'nav.skills': 'দক্ষতা', 'nav.work': 'কাজ', 'nav.proof': 'প্রমাণ',
        'nav.pricing': 'মূল্য', 'nav.journey': 'যাত্রা', 'nav.gallery': 'গ্যালারি', 'nav.contact': 'যোগাযোগ',
        'navm.home': '০০ — হোম', 'navm.about': '০১ — পরিচিতি', 'navm.skills': '০২ — দক্ষতা', 'navm.work': '০৩ — কাজ',
        'navm.proof': '০৪ — প্রমাণ', 'navm.testimonials': '০৫ — মতামত', 'navm.pricing': '০৬ — মূল্য',
        'navm.journey': '০৭ — যাত্রা', 'navm.gallery': '০৮ — গ্যালারি', 'navm.contact': '০৯ — যোগাযোগ',

        'hero.role1': 'বাংলা ও ইংরেজি টাইপিং এবং ডকুমেন্ট কনভার্শন',
        'hero.role2': 'বাংলা · ইংরেজি · স্ক্যান PDF → ওয়ার্ড',
        'hero.tag1': 'বাংলা ও ইংরেজি টাইপিং।',
        'hero.tag2': 'স্ক্যান থেকে এডিটযোগ্য ওয়ার্ড।',
        'hero.bio': 'স্ক্যান করা PDF, মোবাইলে তোলা ছবি আর হাতে লেখা পাতাকে আমি পরিষ্কার, এডিটযোগ্য <strong class="text-white font-semibold">MS Word</strong> ফাইলে রূপ দিই — <strong class="text-white font-semibold">বাংলা (অভ্র / বিজয়)</strong> ও <strong class="text-white font-semibold">ইংরেজি</strong> দুই ভাষাতেই, <strong class="text-white font-semibold">৬৫+ WPM</strong> গতিতে ও <strong class="text-white font-semibold">৯৯.৯% নির্ভুলতায়</strong>। পাশাপাশি PowerPoint প্রেজেন্টেশনও ডিজাইন করি।',
        'hero.ctaQuote': 'ফ্রি কোটেশন নিন', 'hero.ctaSamples': 'আগে / পরে দেখুন',
        'hero.credLabel': 'এছাড়াও',
        'hero.cred1': 'গ্রাফিক ডিজাইন টেকনোলজির শিক্ষার্থী · GGAI',
        'hero.cred2': 'ডিজাইন ও ওয়েব ইন্টার্ন · Classvel',
        'hero.cred3': 'যুব স্বেচ্ছাসেবক · BDRCS',
        'hero.dhaka': 'ঢাকা',

        'about.eyebrow': 'পরিচিতি', 'about.h1': 'বিশেষজ্ঞ', 'about.h2': 'হয়ে ', 'about.h3': 'উঠছি।',
        'about.p1': 'দ্বিভাষিক টাইপিং আমার মূল কাজ। স্ক্যান করা PDF, মোবাইলের ছবি, হাতের লেখা নোট, থিসিস ও রিপোর্ট — সবকিছু <strong class="text-zinc-100 font-semibold">বাংলা (অভ্র ইউনিকোড ও বিজয়)</strong> এবং <strong class="text-zinc-100 font-semibold">ইংরেজিতে</strong> নতুন করে টাইপ করে গোছানো <strong class="text-zinc-100 font-semibold">MS Word</strong> ফাইল হিসেবে দিই — <strong class="text-zinc-100 font-semibold">৬৫+ WPM</strong> গতি ও <strong class="text-zinc-100 font-semibold">৯৯.৯% নির্ভুলতায়</strong>, এ পর্যন্ত ৫০+ কাজে।',
        'about.p2': 'আমি <strong class="text-zinc-100 font-semibold">সাদমান খন্দকার</strong> (<strong class="text-zinc-200 font-medium">খন্দকার সাদমান রাফিদ সাদ</strong>), <strong class="text-zinc-100 font-semibold">সরকারি গ্রাফিক আর্টস ইনস্টিটিউট, ঢাকা</strong>-য় <strong class="text-zinc-100 font-semibold">গ্রাফিক ডিজাইন টেকনোলজি</strong> নিয়ে পড়ছি — তাই গতির পাশাপাশি লেআউট, টাইপোগ্রাফি ও প্রিন্ট-উপযোগী ফরম্যাটিং আমার কাছে সমান গুরুত্বপূর্ণ।',
        'about.p3': '<strong class="text-zinc-100 font-semibold">Classvel-এ প্রোডাক্ট ডিজাইন ও ওয়েব ইন্টার্ন</strong> হিসেবে প্রেজেন্টেশন ডেক ও ওয়েব কনটেন্ট তৈরি করি। এর আগে <strong class="text-zinc-200 font-medium">আগোরা সুপারস্টোর</strong> ও <strong class="text-zinc-200 font-medium">মীনা বাজারে</strong> কাজ করে চাপের মধ্যে দ্রুত ও নির্ভুল ডেটা এন্ট্রি শিখেছি।',
        'about.p4': 'কাজের বাইরে <strong class="text-zinc-100 font-semibold">বাংলাদেশ রেড ক্রিসেন্ট সোসাইটি (BDRCS)</strong>-এর যুব স্বেচ্ছাসেবক হিসেবে ত্রাণ কার্যক্রম, মাঠের ডকুমেন্টেশন ও কমিউনিটি অনুষ্ঠানে অংশ নিই।',
        'about.kpi1': 'গতি · বাংলা ও ইংরেজি', 'about.kpi2': 'ডকুমেন্টের নির্ভুলতা',
        'about.kpi3v': 'ডিজাইন ইন্টার্ন', 'about.kpi3': 'CLASSVEL · ওয়েব ও প্রেজেন্টেশন',
        'about.kpi4v': 'যুব স্বেচ্ছাসেবক', 'about.kpi4': 'BDRCS · রেড ক্রিসেন্ট যুব',

        'skills.eyebrow': 'দক্ষতা', 'skills.h1': 'টুল', 'skills.h2': 'কিট।',
        'skills.intro': 'টাইপিং ও ডকুমেন্ট কনভার্শন প্রধান কাজ; ডিজাইন, ওয়েব ও মাঠপর্যায়ের অভিজ্ঞতা এর সহায়ক।',
        'skills.primary': 'প্রধান',
        'skills.r1': 'ডকুমেন্ট টাইপিং ও কনভার্শন', 'skills.r1b': 'স্ক্যান PDF থেকে ওয়ার্ড', 'skills.r1c': 'হাতের লেখা টাইপ',
        'skills.r2': 'দ্বিভাষিক টাইপোগ্রাফি', 'skills.r2a': 'বাংলা (অভ্র / বিজয়)', 'skills.r2b': 'ইংরেজি (৬৫+ WPM)',
        'skills.r2c': 'ইউনিকোড কনভার্শন', 'skills.r2d': 'প্রুফরিডিং',
        'skills.r3': 'সম্পাদনা ও লেআউট', 'skills.r3a': 'থিসিস', 'skills.r3b': 'রিপোর্ট', 'skills.r3c': 'টেবিল সাজানো', 'skills.r3d': 'প্রিন্ট-উপযোগী ফরম্যাটিং',
        'skills.r4': 'প্রেজেন্টেশন ও ডেক', 'skills.r4b': 'পিচ ডেক', 'skills.r4c': 'স্লাইড মাস্টার', 'skills.r4d': 'ভিজ্যুয়াল স্টোরিটেলিং',
        'skills.r5': 'ওয়েব ও ডিজিটাল কনটেন্ট', 'skills.r5c': 'UI/UX লেআউট', 'skills.r5d': 'রেসপনসিভ ওয়েব অ্যাসেট',
        'skills.r6': 'রিটেইল ও স্টোর অপারেশন', 'skills.r6a': 'POS বিলিং', 'skills.r6b': 'ইনভেন্টরি অডিট', 'skills.r6c': 'ফ্লোর তদারকি', 'skills.r6d': 'গ্রাহকসেবা',
        'skills.r7': 'মাঠপর্যায়ে স্বেচ্ছাসেবা', 'skills.r7a': 'দুর্যোগে সাড়া (BDRCS)', 'skills.r7b': 'প্রাথমিক চিকিৎসা', 'skills.r7c': 'দল সংগঠন', 'skills.r7d': 'মাঠ লজিস্টিকস',

        'projects.eyebrow': 'নির্বাচিত প্রজেক্ট', 'projects.h1': 'নির্বাচিত', 'projects.h2': 'কাজ।',
        'projects.intro': 'যেকোনো প্রজেক্টে ক্লিক করে কেস স্টাডি দেখুন: সমস্যা, প্রক্রিয়া, টুল ও ফলাফল।',
        'common.present': 'বর্তমান',
        'p0.title': 'দ্বিভাষিক ডকুমেন্ট ডিজিটাইজেশন',
        'p0.desc': 'স্ক্যান করা PDF, হাতের লেখা নোট ও থিসিস বাংলা (অভ্র ও বিজয়) এবং ইংরেজিতে টাইপ করে প্রিন্ট-উপযোগী ওয়ার্ড ফাইল তৈরি।',
        'p0.cat': 'টাইপিং · ডকুমেন্ট প্রোডাকশন',
        'p1.title': 'স্ক্যান PDF → এডিটযোগ্য ওয়ার্ড',
        'p1.desc': 'কেস স্টাডি: একটি স্ক্যান করা ডকুমেন্টকে পরিষ্কার, এডিটযোগ্য ওয়ার্ড ফাইলে রূপান্তর।',
        'p1.descPh': '[ক্লায়েন্টের ডকুমেন্টের ধরন ও পৃষ্ঠাসংখ্যা লিখুন]',
        'p1.cat': 'ডকুমেন্ট কনভার্শন', 'p1.tag3': 'টেবিল পুনর্গঠন', 'p1.demo': '[ডেমো দেখুন ↗]',
        'p2.title': 'Classvel ডেক ও ওয়েব কনটেন্ট',
        'p2.desc': 'Classvel-এ প্রোডাক্ট ডিজাইন ও ওয়েব ইন্টার্ন হিসেবে প্রেজেন্টেশন ডেক, শিক্ষামূলক ভিজ্যুয়াল ও ওয়েব কনটেন্ট তৈরি।',
        'p2.cat': 'প্রোডাক্ট ডিজাইন · ওয়েব', 'p2.tag4': 'ভিজ্যুয়াল সিস্টেম',
        'p3.title': 'BDRCS মাঠপর্যায়ের স্বেচ্ছাসেবা',
        'p3.desc': 'বাংলাদেশ রেড ক্রিসেন্ট সোসাইটির যুব স্বেচ্ছাসেবক হিসেবে ঢাকায় ১৫+ মিশনে ত্রাণ বিতরণ, প্রাথমিক চিকিৎসা সহায়তা ও মাঠের ডকুমেন্টেশন।',
        'p3.cat': 'মানবিক কাজ · লজিস্টিকস', 'p3.tag1': 'ত্রাণ কার্যক্রম', 'p3.tag2': 'প্রাথমিক চিকিৎসা', 'p3.tag3': 'ফিল্ড স্কোয়াড',
        'p3.gallery': '[গ্যালারি দেখুন ↗]',

        'proof.eyebrow': 'প্রমাণ', 'proof.h1': 'নিজেই', 'proof.h2': 'দেখে নিন।',
        'proof.intro': 'বাংলা বা ইংরেজিতে নিজের টাইপিং গতি যাচাই করুন, তারপর একটি স্ক্যান করা পাতা ও তৈরি ওয়ার্ড ফাইল পাশাপাশি মিলিয়ে দেখুন।',
        'test.title': 'টাইপিং স্পিড টেস্ট',
        'test.help': 'ভাষা বেছে নিন, টাইপ শুরু করলেই টাইমার চালু হবে। বাংলার জন্য অভ্র, বিজয় (ইউনিকোড) বা ফোনের বাংলা কিবোর্ড ব্যবহার করতে পারেন।',
        'test.srNote': 'উপরের লেখাটি নিচের বক্সে টাইপ করুন।',
        'test.inputLabel': 'এখানে টাইপ করুন', 'test.restart': 'আবার শুরু',
        'test.formula': 'WPM = প্রতি মিনিটে সঠিক অক্ষর ÷ ৫',
        'test.accuracy': 'নির্ভুলতা', 'test.seconds': 'সেকেন্ড বাকি',
        'test.benchmark': 'সাদমানের বেঞ্চমার্ক: ৬৫+ WPM · ৯৯.৯% নির্ভুলতা',
        'ba.title': 'আগে / পরে',
        'ba.help': 'বাঁয়ে: এডিট করা যায় না এমন একটি স্ক্যান করা পাতা। ডানে: একই লেখা নতুন করে টাইপ করা, স্টাইল করা ও সার্চযোগ্য ওয়ার্ড ডকুমেন্ট।',
        'ba.badge': 'ডেমো নমুনা · পাবলিক-ডোমেইন লেখা',
        'ba.before': 'আগে', 'ba.beforeCap': 'স্ক্যান করা পাতা', 'ba.after': 'পরে', 'ba.afterCap': 'এডিটযোগ্য ওয়ার্ড ফাইল',
        'ba.download': 'নমুনা ডাউনলোড (.DOCX)',
        'ba.note': 'লেখা: রবীন্দ্রনাথ ঠাকুর, “আমাদের ছোট নদী”; মানবাধিকারের সর্বজনীন ঘোষণাপত্র, অনুচ্ছেদ ১।',

        'testi.eyebrow': 'মতামত', 'testi.h1': 'ক্লায়েন্টের', 'testi.h2': 'কথা।', 'testi.ph': 'প্লেসহোল্ডার',
        'testi.quote': '“[ক্লায়েন্টের মতামত — অনুমতি নিয়ে আসল রিভিউ এখানে বসান।]”',
        'testi.name': '[ক্লায়েন্টের নাম]', 'testi.role': '[পদ, প্রতিষ্ঠান]', 'testi.project': 'প্রজেক্ট:',
        'testi.type1': '[যেমন: বাংলা থিসিস টাইপিং]', 'testi.type2': '[যেমন: স্ক্যান PDF থেকে ওয়ার্ড]', 'testi.type3': '[যেমন: PowerPoint ডেক]',

        'pricing.eyebrow': 'মূল্য', 'pricing.h1': 'স্পষ্ট', 'pricing.h2': 'মূল্য।',
        'pricing.intro': 'টাইপিং ও কনভার্শনের রেট প্রতি পৃষ্ঠা, প্রেজেন্টেশনের রেট প্রতি স্লাইড। নিচে খরচ হিসাব করে WhatsApp-এ বুক করুন।',
        'rate.en': 'ইংরেজি ডকুমেন্ট টাইপিং', 'rate.bn': 'বাংলা টাইপিং (অভ্র ইউনিকোড / বিজয়)',
        'rate.scan': 'স্ক্যান PDF / হাতের লেখা থেকে ওয়ার্ড', 'rate.deck': 'PowerPoint স্লাইড ডিজাইন',
        'rate.perPage': '/ পৃষ্ঠা', 'rate.perSlide': '/ স্লাইড',
        'calc.title': 'তাৎক্ষণিক কোটেশন', 'calc.service': 'সার্ভিস',
        'calc.optEn': 'ইংরেজি ডকুমেন্ট টাইপিং (BDT 30 / পৃষ্ঠা)', 'calc.optBn': 'বাংলা অভ্র / বিজয় টাইপিং (BDT 45 / পৃষ্ঠা)',
        'calc.optScan': 'স্ক্যান PDF / হাতের লেখা থেকে ওয়ার্ড (BDT 60 / পৃষ্ঠা)', 'calc.optDeck': 'PowerPoint স্লাইড ডিজাইন (BDT 150 / স্লাইড)',
        'calc.volume': 'পরিমাণ (পৃষ্ঠা / স্লাইড)', 'calc.express': 'এক্সপ্রেস ২৪ ঘণ্টায় ডেলিভারি (+২৫%)',
        'calc.total': 'আনুমানিক মোট', 'calc.book': 'এই হিসাবে WhatsApp-এ বুক করুন',
        'terms.title': 'মূল্য সংক্রান্ত শর্ত', 'terms.minT': 'সর্বনিম্ন অর্ডার', 'terms.minV': '[যেমন: BDT 300]',
        'terms.revT': 'রিভিশন', 'terms.revV': '[যেমন: ৩ দিনের মধ্যে ১টি ফ্রি রিভিশন]',
        'terms.payT': 'পেমেন্ট', 'terms.payV': 'বিকাশ, Nagad, ব্যাংক ট্রান্সফার বা ক্যাশ।', 'terms.payPh': '[যেমন: ৫০% অগ্রিম, বাকি ডেলিভারিতে]',
        'terms.note': 'এটি আনুমানিক হিসাব; ফাইল দেখে চূড়ান্ত মূল্য নিশ্চিত করা হবে। USD অঙ্কটি আনুমানিক।',

        'exp.eyebrow': 'অভিজ্ঞতা ও শিক্ষা', 'exp.h1': 'আমার', 'exp.h2': 'যাত্রা।',
        'exp.tagFreelance': 'ফ্রিল্যান্স', 'exp.tagExp': 'অভিজ্ঞতা', 'exp.tagVol': 'স্বেচ্ছাসেবা', 'exp.tagEdu': 'শিক্ষা',
        'exp.f.title': 'দ্বিভাষিক টাইপিং ও ডকুমেন্ট কনভার্শন', 'exp.f.role': 'স্বনিয়োজিত — ঢাকা ও অনলাইনে',
        'exp.f.b1': 'বাংলা (অভ্র / বিজয়) ও ইংরেজি টাইপিং, স্ক্যান PDF ও হাতের লেখা থেকে ওয়ার্ড, এবং ডকুমেন্ট ফরম্যাটিং।',
        'exp.f.b2': '৬৫+ WPM গতি ও ৯৯.৯% নির্ভুলতায় ৫০+ কাজ ডেলিভারি।',
        'exp.c.role': 'প্রোডাক্ট ডিজাইন ও ওয়েব অপারেশনস ইন্টার্ন — ঢাকা',
        'exp.c.b1': 'প্রোডাক্ট লঞ্চের জন্য প্রেজেন্টেশন ডেক, শিক্ষামূলক ভিজ্যুয়াল ও ওয়েব ইন্টারফেস ডিজাইন।',
        'exp.c.b2': 'দ্বিভাষিক ডকুমেন্ট ফরম্যাটিং ও কনটেন্ট ওয়ার্কফ্লো সহজ করে কাজের সময় ৪০% কমানো।',
        'exp.b.org': 'বাংলাদেশ রেড ক্রিসেন্ট সোসাইটি (BDRCS)', 'exp.b.role': 'যুব স্বেচ্ছাসেবক — ঢাকা',
        'exp.b.b1': 'দুর্যোগে ত্রাণ, প্রাথমিক চিকিৎসা সহায়তা ও জাতীয় কর্মসূচিতে যুব দলের সঙ্গে কাজ।',
        'exp.b.b2': '১৫+ মিশনে ত্রাণ বিতরণ সমন্বয় ও মাঠের ডকুমেন্টেশন।',
        'exp.r.org': 'আগোরা সুপারস্টোর ও মীনা বাজার', 'exp.r.role': 'রিটেইল অপারেশন ও গ্রাহকসেবা — ঢাকা',
        'exp.r.b1': 'ব্যস্ত সময়ে দ্রুত POS বিলিং, দৈনিক ইনভেন্টরি মিলানো ও গ্রাহকসেবা।',
        'exp.e.org': 'সরকারি গ্রাফিক আর্টস ইনস্টিটিউট, ঢাকা', 'exp.e.role': 'গ্রাফিক ডিজাইন টেকনোলজি বিভাগ',
        'ach.h1': 'অর্জন', 'ach.h2': 'সমূহ।',
        'ach.1t': '৬৫+ WPM দ্বিভাষিক টাইপিং', 'ach.1d': 'বাংলা (অভ্র ও বিজয়) ও ইংরেজিতে ৯৯.৯% নির্ভুল ডকুমেন্ট তৈরি।',
        'ach.2t': 'যুব স্বেচ্ছাসেবক হিসেবে স্বীকৃতি, BDRCS', 'ach.2d': 'ঢাকায় ত্রাণ, রক্তদান কর্মসূচি ও প্রাথমিক চিকিৎসায় স্বেচ্ছাসেবার জন্য স্বীকৃতি।',
        'ach.2link': 'মাঠের আর্কাইভ',
        'ach.3t': '৫০+ ডকুমেন্ট ডেলিভারি', 'ach.3d': 'স্ক্যান PDF কনভার্শন, থিসিস ও প্রেজেন্টেশন সময়মতো ডেলিভারি।',
        'ach.4t': 'গ্রাফিক ডিজাইন প্রশিক্ষণ', 'ach.4d': 'সরকারি গ্রাফিক আর্টস ইনস্টিটিউট, ঢাকায় টাইপোগ্রাফি, লেআউট ও প্রিপ্রেস মানদণ্ড।',

        'gal.eyebrow': 'ভিজ্যুয়াল গ্যালারি · মাঠ ও স্টুডিও', 'gal.h1': 'ছবির', 'gal.h2': 'আর্কাইভ।',
        'gal.intro': 'রেড ক্রিসেন্ট যুব কার্যক্রম ও স্টুডিও পোর্ট্রেট। বড় করে দেখতে যেকোনো ছবিতে ক্লিক করুন; অ্যারো কি দিয়ে পরের ছবিতে যান।',
        'g1.k': '০১ · পোর্ট্রেট', 'g1.t': 'স্টুডিও পোর্ট্রেট',
        'g2.k': '০২ · কমিউনিটি', 'g2.t': 'খাদ্য বিতরণ',
        'g3.k': '০৩ · শোভাযাত্রা', 'g3.t': 'পুষ্পস্তবক নিয়ে শোভাযাত্রা',
        'g4.k': '০৪ · নেতৃত্ব', 'g4.t': 'শোভাযাত্রার নেতৃত্বে',
        'g5.k': '০৫ · কুচকাওয়াজ', 'g5.t': 'প্যারেড মাঠে কুচকাওয়াজ',
        'g6.k': '০৬ · স্বীকৃতি', 'g6.t': 'সম্মাননা ক্রেস্ট গ্রহণ',
        'g7.k': '০৭ · অনুষ্ঠান', 'g7.t': 'পুরস্কার বিতরণী অনুষ্ঠান',
        'g8.k': '০৮ · দল', 'g8.t': 'যুব দলের সারি',
        'g9.k': '০৯ · শোভাযাত্রা', 'g9.t': 'পুষ্পস্তবক অর্পণ',
        'g10.k': '১০ · দল', 'g10.t': 'ইউনিফর্মে যুব দল',
        'g11.k': '১১ · ক্যাডেট', 'g11.t': 'সহ-ক্যাডেটদের সঙ্গে',
        'g12.k': '১২ · স্টুডিও', 'g12.t': 'সিনেমাটিক স্টুডিও পোর্ট্রেট',

        'contact.eyebrow': 'যোগাযোগ', 'contact.h1': 'ডকুমেন্ট আছে?', 'contact.h2': 'চলুন সেটিকে', 'contact.h3': 'এডিটযোগ্য করি।',
        'contact.write': 'আমাকে লিখুন', 'contact.direct': 'সরাসরি / WhatsApp:', 'contact.city': 'ঢাকা, বাংলাদেশ',
        'contact.send': 'মেসেজ পাঠান', 'contact.copy': 'ঠিকানা কপি করুন', 'contact.find': 'আমাকে খুঁজে পাবেন',
        'footer.tag': 'বাংলা ও ইংরেজি টাইপিং · ঢাকা', 'footer.gallery': 'ভিজ্যুয়াল গ্যালারি (১২)',
        'footer.quote': 'তাৎক্ষণিক কোটেশন', 'footer.testimonials': 'মতামত',

        'form.eyebrow': 'সরাসরি মেসেজ', 'form.h1': 'একটি', 'form.h2': 'মেসেজ পাঠান',
        'form.lead': 'সরাসরি সাদমানের ইনবক্সে যাবে',
        'form.name': 'আপনার নাম *', 'form.namePh': 'আপনার পূর্ণ নাম', 'form.email': 'আপনার ইমেইল *',
        'form.message': 'প্রজেক্টের বিবরণ *', 'form.messagePh': 'ডকুমেন্টের ধরন, ভাষা, পৃষ্ঠাসংখ্যা ও ডেডলাইন',
        'form.submit': 'মেসেজ পাঠান', 'form.whatsapp': 'বরং WhatsApp-এ'
    };

    // Strings built by JavaScript (both languages)
    const STR = {
        en: {
            'status.available': 'AVAILABLE FOR PROJECTS', 'status.queued': 'ACCEPTING QUEUED ORDERS',
            'unit.pages': 'Pages', 'unit.slides': 'Slides', 'calc.usd': '≈ ${usd} USD (approx.)',
            'copy.done': 'COPIED ✓',
            'err.name': 'Please enter your name (at least 2 characters).',
            'err.email': 'Please enter a valid email address, e.g. name@example.com.',
            'err.message': 'Please describe your project in at least 20 characters.',
            'form.fix': 'Please fix the highlighted fields.',
            'form.sending': 'SENDING…',
            'form.ok': '✓ Message sent — Saadman will reply soon.',
            'form.fail': '✕ Your message could not be sent. Please try again, or message on WhatsApp.',
            'case.problem': 'THE PROBLEM', 'case.process': 'THE PROCESS', 'case.tools': 'TOOLS', 'case.result': 'THE RESULT',
            'case.discuss': 'DISCUSS A SIMILAR PROJECT', 'case.demo': 'SEE THE DEMO SAMPLE',
            'test.result': '{wpm} WPM at {acc}% accuracy — {chars} correct characters in {secs} seconds. Saadman\'s benchmark is 65+ WPM.',
            'lb.count': 'Photo {i} of {n}',
            'lang.label': 'বাংলায় দেখুন (Switch to Bangla)', 'lang.text': 'বাংলা',
            'menu.open': 'Open menu', 'menu.close': 'Close menu'
        },
        bn: {
            'status.available': 'নতুন কাজের জন্য প্রস্তুত', 'status.queued': 'অর্ডার নেওয়া হচ্ছে (সকালে উত্তর)',
            'unit.pages': 'পৃষ্ঠা', 'unit.slides': 'স্লাইড', 'calc.usd': '≈ ${usd} USD (আনুমানিক)',
            'copy.done': 'কপি হয়েছে ✓',
            'err.name': 'অনুগ্রহ করে আপনার নাম লিখুন (কমপক্ষে ২ অক্ষর)।',
            'err.email': 'অনুগ্রহ করে সঠিক ইমেইল লিখুন, যেমন name@example.com।',
            'err.message': 'অনুগ্রহ করে কমপক্ষে ২০ অক্ষরে প্রজেক্টের বিবরণ দিন।',
            'form.fix': 'চিহ্নিত ঘরগুলো ঠিক করুন।',
            'form.sending': 'পাঠানো হচ্ছে…',
            'form.ok': '✓ মেসেজ পাঠানো হয়েছে — সাদমান শিগগির উত্তর দেবেন।',
            'form.fail': '✕ মেসেজ পাঠানো যায়নি। আবার চেষ্টা করুন, অথবা WhatsApp-এ লিখুন।',
            'case.problem': 'সমস্যা', 'case.process': 'প্রক্রিয়া', 'case.tools': 'টুল', 'case.result': 'ফলাফল',
            'case.discuss': 'এমন প্রজেক্ট নিয়ে কথা বলুন', 'case.demo': 'ডেমো নমুনা দেখুন',
            'test.result': '{acc}% নির্ভুলতায় {wpm} WPM — {secs} সেকেন্ডে {chars}টি সঠিক অক্ষর। সাদমানের বেঞ্চমার্ক ৬৫+ WPM।',
            'lb.count': '{n}টির মধ্যে {i} নম্বর ছবি',
            'lang.label': 'Switch to English (ইংরেজিতে দেখুন)', 'lang.text': 'EN',
            'menu.open': 'মেনু খুলুন', 'menu.close': 'মেনু বন্ধ করুন'
        }
    };

    let lang = root.lang === 'bn' ? 'bn' : 'en';
    const t = (key, vars) => {
        let s = (STR[lang] && STR[lang][key]) || STR.en[key] || key;
        if (vars) Object.keys(vars).forEach(k => { s = s.split('{' + k + '}').join(vars[k]); });
        return s;
    };

    // Remember the English text that ships in the HTML
    const EN_TEXT = new Map(), EN_HTML = new Map(), EN_ATTR = new Map();
    $$('[data-i18n]').forEach(el => EN_TEXT.set(el, el.textContent));
    $$('[data-i18n-html]').forEach(el => EN_HTML.set(el, el.innerHTML));
    $$('[data-i18n-attr]').forEach(el => {
        const saved = {};
        el.dataset.i18nAttr.split(';').forEach(pair => { const [attr] = pair.split(':'); saved[attr] = el.getAttribute(attr); });
        EN_ATTR.set(el, saved);
    });
    // Original text of every split heading target (before it is split into spans)
    $$('.reel-split-chars').forEach(el => { el.dataset.text = el.textContent; });

    const textFor = el => lang === 'bn' && BN[el.dataset.i18n] != null ? BN[el.dataset.i18n] : EN_TEXT.get(el);
    const langListeners = [];

    function applyLanguage(next) {
        lang = next;
        root.lang = next;
        const dirtyGroups = new Set();

        EN_TEXT.forEach((en, el) => {
            const val = next === 'bn' && BN[el.dataset.i18n] != null ? BN[el.dataset.i18n] : en;
            if (el.classList.contains('reel-split-chars')) {
                el.dataset.text = val;
                dirtyGroups.add(el.closest('.reel-char-group'));
            } else {
                el.textContent = val;
            }
        });
        EN_HTML.forEach((en, el) => {
            el.innerHTML = next === 'bn' && BN[el.dataset.i18nHtml] != null ? BN[el.dataset.i18nHtml] : en;
        });
        EN_ATTR.forEach((saved, el) => {
            el.dataset.i18nAttr.split(';').forEach(pair => {
                const [attr, key] = pair.split(':');
                el.setAttribute(attr, next === 'bn' && BN[key] != null ? BN[key] : saved[attr]);
            });
        });
        dirtyGroups.forEach(g => g && renderCharGroup(g));

        const toggle = $('#langToggle');
        if (toggle) {
            toggle.textContent = t('lang.text');
            toggle.setAttribute('aria-label', t('lang.label'));
            toggle.setAttribute('lang', next === 'bn' ? 'en' : 'bn');
        }
        langListeners.forEach(fn => fn(next));
    }

    /* ---------- 3. LIVE DHAKA CLOCK ---------- */
    $('#year').textContent = new Date().getFullYear();

    function updateDhakaTime() {
        try {
            const now = new Date();
            $('#liveClock').textContent = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
            const hour = parseInt(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Dhaka', hour: '2-digit', hour12: false }), 10);
            const awake = hour >= 8 && hour < 24;
            $('#widgetDot').className = awake ? 'w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse' : 'w-1.5 h-1.5 rounded-full bg-amber-400';
            $('#widgetStatusText').textContent = t(awake ? 'status.available' : 'status.queued');
        } catch (e) { /* older browsers without Intl time zones keep the static text */ }
    }
    updateDhakaTime();
    setInterval(updateDhakaTime, 1000);
    langListeners.push(updateDhakaTime);

    /* ---------- 4. NAVIGATION ---------- */
    (function initNav() {
        const btn = $('#mobileMenuBtn');
        const drawer = $('#mobileMenuDrawer');
        const setMenu = open => {
            drawer.classList.toggle('hidden', !open);
            btn.setAttribute('aria-expanded', String(open));
            btn.setAttribute('aria-label', t(open ? 'menu.close' : 'menu.open'));
        };
        btn.addEventListener('click', () => setMenu(drawer.classList.contains('hidden')));
        $$('a', drawer).forEach(a => a.addEventListener('click', () => setMenu(false)));
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && !drawer.classList.contains('hidden')) { setMenu(false); btn.focus(); }
        });

        const links = $$('.reel-nav-link');
        const sections = ['home', 'about', 'skills', 'projects', 'proof', 'testimonials', 'pricing', 'experience', 'gallery', 'contact']
            .map(id => document.getElementById(id)).filter(Boolean);
        // Testimonials have no top-level link; highlight PROOF while reading them
        const navTarget = id => (id === 'testimonials' ? 'proof' : id);

        let ticking = false;
        const spy = () => {
            ticking = false;
            const y = window.scrollY + window.innerHeight * 0.35;
            let current = 'home';
            sections.forEach(sec => { if (sec.offsetTop <= y) current = sec.id; });
            current = navTarget(current);
            links.forEach(link => {
                const active = link.dataset.section === current;
                link.classList.toggle('active', active);
                if (active) link.setAttribute('aria-current', 'true'); else link.removeAttribute('aria-current');
            });
        };
        window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(spy); } }, { passive: true });
        spy();

        $('#langToggle').addEventListener('click', () => {
            const next = lang === 'bn' ? 'en' : 'bn';
            try { localStorage.setItem('sk_lang', next); } catch (e) { /* private mode */ }
            applyLanguage(next);
        });
    })();

    /* ---------- 5. SCROLL-REVEAL CHOREOGRAPHY ---------- */
    // English headings animate letter by letter; Bangla animates word by word so conjuncts and vowel signs stay joined.
    function renderCharGroup(group) {
        const baseDelay = parseFloat(group.dataset.baseDelay || '0.04');
        const lineStagger = parseFloat(group.dataset.lineStagger || '0.14');
        const charStagger = parseFloat(group.dataset.charStagger || '0.022');
        const isDisplay = group.classList.contains('reel-display');
        const animate = !LITE;

        $$('.reel-line-mask', group).forEach((line, lineIdx) => {
            let n = 0;
            const targets = $$('.reel-split-chars', line);
            targets.forEach((target, targetIdx) => {
                const raw = target.dataset.text || '';
                const frag = document.createDocumentFragment();
                const isLastTarget = targetIdx === targets.length - 1;

                if (!animate) {
                    // Static text; keep the crimson full stop on display headings
                    if (isDisplay && isLastTarget && raw.endsWith('.')) {
                        frag.append(raw.slice(0, -1));
                        const dot = document.createElement('span');
                        dot.className = 'reel-dot';
                        dot.textContent = '.';
                        frag.append(dot);
                    } else {
                        frag.append(raw);
                    }
                } else {
                    const units = lang === 'bn' ? raw.split(/(\s+)/).filter(Boolean) : Array.from(raw);
                    const step = lang === 'bn' ? charStagger * 4 : charStagger;
                    units.forEach((u, i) => {
                        const span = document.createElement('span');
                        const isDot = isDisplay && isLastTarget && i === units.length - 1 && u === '.';
                        span.className = isDot ? 'reel-char reel-dot' : 'reel-char';
                        span.style.setProperty('--char-delay', (baseDelay + lineIdx * lineStagger + n * step).toFixed(3) + 's');
                        if (/^\s+$/.test(u)) span.innerHTML = '&nbsp;'; else span.textContent = u;
                        frag.appendChild(span);
                        n++;
                    });
                }
                target.textContent = '';
                target.appendChild(frag);
            });
        });
    }

    (function initReveal() {
        if (lang === 'bn') applyLanguage('bn');
        $$('.reel-char-group').forEach(renderCharGroup);

        $$('.reel-stagger-children').forEach(container => {
            const base = parseFloat(container.dataset.staggerBase || '0.1');
            const step = parseFloat(container.dataset.staggerStep || '0.08');
            Array.from(container.children).forEach((child, idx) => {
                child.style.setProperty('--item-delay', (LITE ? 0 : base + idx * step).toFixed(3) + 's');
            });
        });

        const targets = $$('.reel-reveal, .reel-char-group, .reel-stagger-children');
        if (REDUCE || !('IntersectionObserver' in window)) {
            targets.forEach(el => el.classList.add('is-visible'));
            return;
        }
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    if (LITE) io.unobserve(entry.target);
                } else if (!LITE && (entry.boundingClientRect.top > window.innerHeight * 0.95 || entry.boundingClientRect.bottom < 0)) {
                    entry.target.classList.remove('is-visible');
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
        requestAnimationFrame(() => requestAnimationFrame(() => targets.forEach(el => io.observe(el))));
    })();

    /* ---------- 6. ACCESSIBLE DIALOGS ---------- */
    const Dialog = (function () {
        const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
        const stack = [];
        const visible = el => el.getClientRects().length > 0 && !el.closest('.hidden[aria-hidden="true"]');

        function open(el, trigger) {
            if (!el || stack.some(s => s.el === el)) return;
            stack.push({ el, trigger: trigger || document.activeElement });
            el.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            const first = $('[data-autofocus]', el) || $$(FOCUSABLE, el).find(visible);
            if (first) first.focus();
        }

        // restoreFocus=false when the dialog closes because the user followed a link elsewhere
        function close(el, restoreFocus = true) {
            const i = stack.findIndex(s => s.el === el);
            if (i < 0) return;
            const { trigger } = stack[i];
            stack.splice(i, 1);
            el.classList.add('hidden');
            if (!stack.length) document.body.style.overflow = '';
            if (restoreFocus && trigger && typeof trigger.focus === 'function') trigger.focus({ preventScroll: true });
        }

        document.addEventListener('keydown', e => {
            const top = stack[stack.length - 1];
            if (!top) return;
            if (e.key === 'Escape') {
                e.preventDefault();
                close(top.el);
            } else if (e.key === 'Tab') {
                const items = $$(FOCUSABLE, top.el).filter(visible);
                if (!items.length) return;
                const first = items[0], last = items[items.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        });

        $$('[role="dialog"]').forEach(el => {
            el.addEventListener('click', e => { if (e.target === el) close(el); });
            $$('[data-close-dialog]', el).forEach(b => b.addEventListener('click', () => close(el)));
        });

        return { open, close, isOpen: el => stack.some(s => s.el === el) };
    })();

    /* ---------- 7. PHOTO LIGHTBOX ---------- */
    (function initLightbox() {
        const lb = $('#lightbox'), img = $('#lightbox-img'), cap = $('#lightbox-caption');
        const prev = $('#lightboxPrev'), next = $('#lightboxNext');
        const items = $$('.gallery-item');
        let idx = -1;

        function showGallery(i) {
            idx = (i + items.length) % items.length;
            const btn = items[idx];
            const thumb = $('img', btn);
            img.src = btn.dataset.full;
            img.alt = thumb.alt;
            const title = $('[data-i18n$=".t"]', btn).textContent;
            cap.textContent = title + ' — ' + t('lb.count', { i: idx + 1, n: items.length });
        }

        const showArrows = on => [prev, next].forEach(b => b.classList.toggle('hidden', !on));

        items.forEach((btn, i) => btn.addEventListener('click', () => {
            showArrows(true);
            showGallery(i);
            Dialog.open(lb, btn);
        }));

        // Single-image mode (e.g. the before/after scan)
        $$('[data-lightbox-src]').forEach(btn => btn.addEventListener('click', () => {
            idx = -1;
            showArrows(false);
            img.src = btn.dataset.lightboxSrc;
            img.alt = $('img', btn) ? $('img', btn).alt : '';
            cap.textContent = btn.dataset.lightboxCaption || '';
            Dialog.open(lb, btn);
        }));

        prev.addEventListener('click', () => showGallery(idx - 1));
        next.addEventListener('click', () => showGallery(idx + 1));
        document.addEventListener('keydown', e => {
            if (!Dialog.isOpen(lb) || idx < 0) return;
            if (e.key === 'ArrowLeft') showGallery(idx - 1);
            if (e.key === 'ArrowRight') showGallery(idx + 1);
        });
        langListeners.push(() => { if (Dialog.isOpen(lb) && idx >= 0) showGallery(idx); });
    })();

    /* ---------- 8. PROJECTS & CASE STUDIES ---------- */
    // Text beginning with "[" is a placeholder Saadman must replace; it renders with the yellow placeholder style.
    const CASES = {
        en: [
            {
                title: 'Bilingual Document Digitization', category: 'Typing · Document production',
                problem: 'Clients arrive with low-resolution scans, phone photos and handwritten Bangla/English pages that can\'t be edited, searched or reprinted — usually on a deadline.',
                process: 'Retype in Avro Unicode or Bijoy (whichever the client needs), rebuild headings, tables and page numbers with MS Word styles, proofread line by line against the source, then deliver .docx (plus PDF on request).',
                tools: ['MS Word', 'Avro (Unicode)', 'Bijoy 52', 'Google Docs'],
                result: '50+ multi-page commissions delivered in Bangla and English at 65+ WPM with 99.9% accuracy.'
            },
            {
                title: 'Scanned PDF → Editable Word', category: 'Document conversion', demo: true,
                problem: '[Describe the client\'s document: type, language, page count and scan quality.]',
                process: 'Page-by-page retyping in Unicode Bangla and English, tables and headings rebuilt with Word styles, then a full proofread against the scan.',
                tools: ['MS Word', 'Avro Unicode', 'Bijoy 52', 'PDF viewer'],
                result: '[Add the real outcome: pages delivered, turnaround time and the client\'s feedback.]'
            },
            {
                title: 'Classvel Decks & Web Content', category: 'Product design · Web',
                problem: 'Product and education teams needed consistent slide decks and digital assets with a clear visual hierarchy, on tight launch schedules.',
                process: 'Built PowerPoint slide-master templates, bilingual typography styles and responsive web layouts the team could reuse.',
                tools: ['PowerPoint', 'UI/UX', 'HTML/CSS', 'Visual Systems'],
                result: 'Cut deck production turnaround by 40% while keeping typography and layout consistent across releases.'
            },
            {
                title: 'BDRCS Field Volunteering', category: 'Humanitarian · Logistics',
                problem: 'Relief activities need disciplined volunteer coordination, quick field reporting and accurate supply records.',
                process: 'Worked in Red Crescent Youth teams at relief distributions and first-aid posts, and kept field documentation and photo records.',
                tools: ['Relief Ops', 'First Aid', 'Field Squad', 'Field Documentation'],
                result: 'Field documentation across 15+ missions and recognition for youth volunteering (see the gallery).'
            }
        ],
        bn: [
            {
                title: 'দ্বিভাষিক ডকুমেন্ট ডিজিটাইজেশন', category: 'টাইপিং · ডকুমেন্ট প্রোডাকশন',
                problem: 'ক্লায়েন্টরা সাধারণত ঝাপসা স্ক্যান, মোবাইলের ছবি বা হাতে লেখা বাংলা/ইংরেজি পাতা নিয়ে আসেন, যা এডিট, সার্চ বা আবার প্রিন্ট করা যায় না — আর প্রায়ই ডেডলাইন থাকে কাছেই।',
                process: 'ক্লায়েন্টের প্রয়োজনমতো অভ্র ইউনিকোড বা বিজয়ে টাইপ, MS Word স্টাইলে শিরোনাম, টেবিল ও পৃষ্ঠা নম্বর সাজানো, মূল কপির সঙ্গে লাইন ধরে প্রুফরিড, তারপর .docx (চাইলে PDF-ও) ডেলিভারি।',
                tools: ['MS Word', 'অভ্র (ইউনিকোড)', 'বিজয় ৫২', 'Google Docs'],
                result: 'বাংলা ও ইংরেজিতে ৫০+ বহু-পৃষ্ঠার কাজ ডেলিভারি — ৬৫+ WPM গতি ও ৯৯.৯% নির্ভুলতায়।'
            },
            {
                title: 'স্ক্যান PDF → এডিটযোগ্য ওয়ার্ড', category: 'ডকুমেন্ট কনভার্শন', demo: true,
                problem: '[ক্লায়েন্টের ডকুমেন্টের বিবরণ দিন: ধরন, ভাষা, পৃষ্ঠাসংখ্যা ও স্ক্যানের মান।]',
                process: 'ইউনিকোড বাংলা ও ইংরেজিতে পৃষ্ঠা ধরে টাইপ, ওয়ার্ড স্টাইলে টেবিল ও শিরোনাম পুনর্গঠন, তারপর স্ক্যানের সঙ্গে মিলিয়ে পূর্ণ প্রুফরিড।',
                tools: ['MS Word', 'অভ্র ইউনিকোড', 'বিজয় ৫২', 'PDF ভিউয়ার'],
                result: '[আসল ফলাফল লিখুন: কত পৃষ্ঠা, কত সময়ে ডেলিভারি এবং ক্লায়েন্টের মতামত।]'
            },
            {
                title: 'Classvel ডেক ও ওয়েব কনটেন্ট', category: 'প্রোডাক্ট ডিজাইন · ওয়েব',
                problem: 'প্রোডাক্ট ও শিক্ষা টিমের দরকার ছিল স্পষ্ট ভিজ্যুয়াল হায়ারার্কিসহ একই ধাঁচের স্লাইড ডেক ও ডিজিটাল অ্যাসেট — অল্প সময়ের মধ্যে।',
                process: 'টিম বারবার ব্যবহার করতে পারে এমন PowerPoint স্লাইড-মাস্টার টেমপ্লেট, দ্বিভাষিক টাইপোগ্রাফি স্টাইল ও রেসপনসিভ ওয়েব লেআউট তৈরি।',
                tools: ['PowerPoint', 'UI/UX', 'HTML/CSS', 'ভিজ্যুয়াল সিস্টেম'],
                result: 'টাইপোগ্রাফি ও লেআউট একই রেখে ডেক তৈরির সময় ৪০% কমানো।'
            },
            {
                title: 'BDRCS মাঠপর্যায়ের স্বেচ্ছাসেবা', category: 'মানবিক কাজ · লজিস্টিকস',
                problem: 'ত্রাণ কার্যক্রমে দরকার শৃঙ্খলাবদ্ধ স্বেচ্ছাসেবক সমন্বয়, দ্রুত মাঠের রিপোর্ট ও সঠিক সরবরাহের হিসাব।',
                process: 'রেড ক্রিসেন্ট যুব দলের সঙ্গে ত্রাণ বিতরণ ও প্রাথমিক চিকিৎসা কেন্দ্রে কাজ, এবং মাঠের ডকুমেন্টেশন ও ছবির রেকর্ড রাখা।',
                tools: ['ত্রাণ কার্যক্রম', 'প্রাথমিক চিকিৎসা', 'ফিল্ড স্কোয়াড', 'মাঠের ডকুমেন্টেশন'],
                result: '১৫+ মিশনে মাঠের ডকুমেন্টেশন এবং যুব স্বেচ্ছাসেবার জন্য স্বীকৃতি (গ্যালারিতে দেখুন)।'
            }
        ]
    };
    let cloudProjects = null; // filled by the admin-panel sync (English only)

    (function initProjects() {
        const grid = $('#projectsGrid'), modal = $('#projectModal'), body = $('#modalBody');
        const rows = $$('.reel-project-row', grid);
        let openIdx = -1;

        rows.forEach(r => r.addEventListener('mouseenter', () => {
            rows.forEach(x => x.classList.remove('is-featured'));
            r.classList.add('is-featured');
        }));

        const logoHtml = idx => {
            if (idx === 2) return '<span class="w-9 h-9 rounded-xl bg-white p-1.5 flex items-center justify-center flex-shrink-0"><img src="./public/logos/classvel.webp" width="128" height="128" alt="" class="w-full h-full object-contain"></span>';
            if (idx === 3) return '<span class="w-9 h-9 rounded-xl bg-white p-1.5 flex items-center justify-center flex-shrink-0"><img src="./public/logos/bdrcs.webp" width="128" height="128" alt="" class="w-full h-full object-contain"></span>';
            return '';
        };
        const textBlock = s => isPlaceholder(s) ? `<span class="ph">${esc(s)}</span>` : esc(s);

        function render(idx) {
            const list = cloudProjects || CASES[lang];
            const p = list[idx] || list[0];
            const msg = encodeURIComponent('Hello Saadman, I saw your case study on ' + (CASES.en[idx] || p).title);
            body.innerHTML = `
                <div class="reel-eyebrow"><span class="reel-eyebrow-num">0${idx + 1}</span><span class="reel-eyebrow-dash" style="transform:scaleX(1)"></span><span>${esc(p.category)}</span></div>
                <div class="flex items-center gap-3.5">${logoHtml(idx)}<h2 id="modalTitle" class="reel-display text-2xl sm:text-4xl text-white">${esc(p.title)}<span class="reel-dot">.</span></h2></div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="border border-white/10 bg-[#07070c] p-4"><h3 class="font-mono text-[10px] tracking-[0.2em] uppercase text-studio-rose mb-1.5">${t('case.problem')}</h3><p class="text-sm text-zinc-300 leading-relaxed">${textBlock(p.problem)}</p></div>
                    <div class="border border-white/10 bg-[#07070c] p-4"><h3 class="font-mono text-[10px] tracking-[0.2em] uppercase text-emerald-400 mb-1.5">${t('case.process')}</h3><p class="text-sm text-zinc-300 leading-relaxed">${textBlock(p.process)}</p></div>
                </div>
                <div><h3 class="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-300 mb-2">${t('case.tools')}</h3>
                    <ul class="flex flex-wrap gap-2 font-mono text-xs text-zinc-200" role="list">${(p.tools || []).map(x => `<li class="border border-white/15 px-2.5 py-1">${esc(x)}</li>`).join('')}</ul></div>
                <div class="border-t border-b border-white/10 py-4"><h3 class="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-300 mb-1">${t('case.result')}</h3><p class="text-sm text-zinc-100 font-medium leading-relaxed">${textBlock(p.result)}</p></div>
                <div class="flex flex-wrap gap-3">
                    <a href="https://wa.me/${WHATSAPP}?text=${msg}" target="_blank" rel="noopener" class="reel-btn-primary py-2.5 px-5"><span>${t('case.discuss')}</span><span aria-hidden="true">&#8599;</span></a>
                    ${p.demo ? `<a href="#before-after" data-demo-link class="reel-btn-outline py-2.5 px-5">${t('case.demo')}</a>` : ''}
                </div>`;
            const demo = $('[data-demo-link]', body);
            if (demo) demo.addEventListener('click', () => {
                Dialog.close(modal, false);
                setTimeout(() => $('#beforeAfterTitle').focus({ preventScroll: true }), 0);
            });
        }

        $$('.project-open', grid).forEach(btn => btn.addEventListener('click', () => {
            openIdx = parseInt(btn.dataset.projectIdx, 10) || 0;
            render(openIdx);
            Dialog.open(modal, btn);
        }));
        langListeners.push(() => { if (Dialog.isOpen(modal)) render(openIdx); });

        window.setCloudProjects = list => { cloudProjects = list; };
    })();

    /* ---------- 9. QUOTE CALCULATOR ---------- */
    (function initQuoteCalc() {
        const service = $('#calcService'), pages = $('#calcPages'), pagesVal = $('#calcPagesVal');
        const urgent = $('#calcUrgent'), totalBdt = $('#calcTotalBdt'), totalUsd = $('#calcTotalUsd'), waBtn = $('#waBtn');

        function recalc() {
            const opt = service.options[service.selectedIndex];
            const rate = parseInt(opt.dataset.rate || '30', 10);
            const n = parseInt(pages.value || '10', 10);
            const isDeck = service.value === 'deck';
            let total = rate * n;
            if (urgent.checked) total = Math.round(total * 1.25);
            const usd = Math.max(1, Math.round(total / 118));
            pagesVal.textContent = `${n} ${t(isDeck ? 'unit.slides' : 'unit.pages')}`;
            pages.setAttribute('aria-valuetext', pagesVal.textContent);
            totalBdt.textContent = `BDT ${total.toLocaleString('en-US')}`;
            totalUsd.textContent = t('calc.usd', { usd });
            const enLabel = EN_TEXT.get(opt) || opt.text;
            const msg = `Hello Saadman, I'd like to book: ${enLabel} — ${n} ${isDeck ? 'slides' : 'pages'}${urgent.checked ? ', express 24h' : ''}. Estimate: BDT ${total}`;
            waBtn.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
        }
        service.addEventListener('change', recalc);
        pages.addEventListener('input', recalc);
        urgent.addEventListener('change', recalc);
        langListeners.push(recalc);
        recalc();
    })();

    /* ---------- 10. TYPING-SPEED TEST ---------- */
    (function initTypingTest() {
        const PASSAGES = {
            en: 'Clear documents save time. A well typed page has consistent headings, tidy tables and no spelling mistakes. When a scanned file becomes an editable Word document, it can be searched, updated and printed again without losing its layout.',
            bn: 'পরিষ্কার ডকুমেন্ট সময় বাঁচায়। ভালোভাবে টাইপ করা পাতায় শিরোনাম একই রকম থাকে, টেবিল গোছানো থাকে এবং কোনো বানান ভুল থাকে না। স্ক্যান করা ফাইল যখন এডিটযোগ্য ওয়ার্ড ডকুমেন্টে পরিণত হয়, তখন সেটি খোঁজা, বদলানো এবং আবার ছাপানো সহজ হয়।'
        };
        const passageEl = $('#testPassage'), input = $('#testInput');
        const wpmEl = $('#testWpm'), accEl = $('#testAcc'), timeEl = $('#testTime'), resultEl = $('#testResult');
        const langBtns = $$('[data-test-lang]'), timeBtns = $$('[data-test-time]');

        let testLang = 'en', duration = 60, words = [], startAt = 0, timer = null, finished = false;
        // NFC normalisation makes precomposed and decomposed Bangla letters (e.g. য় / য়) compare equal
        const norm = s => s.normalize('NFC');

        function renderPassage() {
            words = norm(PASSAGES[testLang]).split(' ');
            passageEl.lang = input.lang = testLang;
            passageEl.innerHTML = words.map((w, i) => `<span class="tw" data-w="${i}">${esc(w)}</span>`).join(' ');
        }

        function score() {
            const typed = norm(input.value).replace(/\s+/g, ' ').replace(/^ /, '');
            const typedWords = typed.split(' ');
            let correct = 0, total = 0;
            const spans = passageEl.children;
            typedWords.forEach((tw, i) => {
                const target = words[i] || '';
                const done = i < typedWords.length - 1;
                for (let c = 0; c < tw.length; c++) { total++; if (tw[c] === target[c]) correct++; }
                if (done) { total++; if (tw === target) correct++; } // the space after a finished word
                const span = spans[i];
                if (span) span.className = 'tw ' + (done ? (tw === target ? 'ok' : 'bad') : ('current' + (target.startsWith(tw) ? '' : ' bad')));
            });
            for (let i = typedWords.length; i < spans.length; i++) spans[i].className = 'tw';
            const lastDone = typedWords.length >= words.length && typedWords[words.length - 1] === words[words.length - 1];
            return { correct, total, lastDone };
        }

        function update() {
            if (!startAt) return;
            const elapsed = Math.min(duration, (performance.now() - startAt) / 1000);
            const { correct, total, lastDone } = score();
            const wpm = elapsed > 0 ? Math.round((correct / 5) / (elapsed / 60)) : 0;
            const acc = total ? Math.round((correct / total) * 1000) / 10 : 100;
            wpmEl.textContent = wpm;
            accEl.textContent = acc + '%';
            timeEl.textContent = Math.max(0, Math.ceil(duration - elapsed));
            if (elapsed >= duration || lastDone) finish(wpm, acc, correct, Math.round(elapsed));
        }

        function finish(wpm, acc, correct, secs) {
            if (finished) return;
            finished = true;
            clearInterval(timer);
            input.disabled = true;
            resultEl.textContent = t('test.result', { wpm, acc, chars: correct, secs });
            resultEl.classList.remove('hidden');
        }

        function reset(focus) {
            clearInterval(timer);
            startAt = 0; finished = false;
            input.value = ''; input.disabled = false;
            wpmEl.textContent = '0'; accEl.textContent = '100%'; timeEl.textContent = duration;
            resultEl.classList.add('hidden');
            renderPassage();
            if (focus) input.focus();
        }

        input.addEventListener('input', () => {
            if (finished) return;
            if (!startAt && input.value.length) {
                startAt = performance.now();
                timer = setInterval(update, 250);
            }
            update();
        });
        // Block pasting so the result reflects real typing
        input.addEventListener('paste', e => e.preventDefault());

        const press = (btns, active) => btns.forEach(b => b.setAttribute('aria-pressed', String(b === active)));
        langBtns.forEach(b => b.addEventListener('click', () => { testLang = b.dataset.testLang; press(langBtns, b); reset(true); }));
        timeBtns.forEach(b => b.addEventListener('click', () => { duration = parseInt(b.dataset.testTime, 10); press(timeBtns, b); reset(true); }));
        $('#testRestart').addEventListener('click', () => reset(true));

        // Default the test to the page language
        if (lang === 'bn') { testLang = 'bn'; press(langBtns, langBtns.find(b => b.dataset.testLang === 'bn')); }
        reset(false);
    })();

    /* ---------- 11. CONTACT FORM ---------- */
    (function initContact() {
        const modal = $('#contactDrawerModal');
        $('#openContactBtn').addEventListener('click', e => Dialog.open(modal, e.currentTarget));

        const form = $('#contactForm'), alertBox = $('#formAlert'), submitBtn = $('#contactSubmitBtn');
        const fields = [
            { el: $('#contactName'), err: $('#contactNameError'), key: 'err.name', ok: v => v.length >= 2 },
            { el: $('#contactEmail'), err: $('#contactEmailError'), key: 'err.email', ok: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) },
            { el: $('#contactMessage'), err: $('#contactMessageError'), key: 'err.message', ok: v => v.length >= 20 }
        ];
        let attempted = false;

        const showAlert = (ok, text) => {
            alertBox.className = ok
                ? 'text-xs font-mono p-3 border border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                : 'text-xs font-mono p-3 border border-rose-500/40 bg-rose-500/10 text-rose-200';
            alertBox.textContent = text;
        };

        function validate(focusFirst) {
            let firstBad = null;
            fields.forEach(f => {
                const valid = f.ok(f.el.value.trim());
                f.el.setAttribute('aria-invalid', String(!valid));
                f.err.textContent = valid ? '' : t(f.key);
                f.err.classList.toggle('hidden', valid);
                if (!valid && !firstBad) firstBad = f.el;
            });
            if (firstBad && focusFirst) firstBad.focus();
            return !firstBad;
        }
        fields.forEach(f => f.el.addEventListener('blur', () => { if (attempted) validate(false); }));
        langListeners.push(() => { if (attempted) validate(false); });

        form.addEventListener('submit', async e => {
            e.preventDefault();
            attempted = true;
            if (!validate(true)) { showAlert(false, t('form.fix')); return; }

            const name = fields[0].el.value.trim(), email = fields[1].el.value.trim(), message = fields[2].el.value.trim();
            // Bots fill the hidden honeypot field; pretend success without sending anything
            if ($('#contactWebsite').value) { showAlert(true, t('form.ok')); form.reset(); return; }

            submitBtn.disabled = true;
            const label = $('span', submitBtn), original = label.textContent;
            label.textContent = t('form.sending');
            try {
                const results = await Promise.allSettled([
                    fetch('https://oiruilsgqfqpmhradcrm.supabase.co/rest/v1/contact_messages', {
                        method: 'POST',
                        headers: { 'apikey': 'sb_publishable_eejxo50gMcgeLDFM91a70A_trAfjMPm', 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
                        body: JSON.stringify({ name, email, message })
                    }),
                    fetch('https://formsubmit.co/ajax/gamerhindi571@gmail.com', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                        body: JSON.stringify({ name, email, message, _subject: `New Portfolio Inquiry from ${name}` })
                    })
                ]);
                // fetch() does not reject on HTTP errors, so check each response status
                if (!results.some(r => r.status === 'fulfilled' && r.value.ok)) throw new Error('not delivered');
                showAlert(true, t('form.ok'));
                form.reset();
                attempted = false;
                fields.forEach(f => f.el.removeAttribute('aria-invalid'));
            } catch (err) {
                showAlert(false, t('form.fail'));
            } finally {
                submitBtn.disabled = false;
                label.textContent = textFor(label) || original;
            }
        });

        // Copy e-mail address
        const copyBtn = $('#editorialCopyEmailBtn'), copyText = $('#editorialCopyEmailText');
        copyBtn.addEventListener('click', () => {
            const email = copyBtn.dataset.email || 'gamerhindi571@gmail.com';
            if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(email).catch(() => {});
            copyText.textContent = t('copy.done');
            setTimeout(() => { copyText.textContent = textFor(copyText); }, 2400);
        });
    })();

    /* ---------- 12. STUDIO VIDEOS & HERO SUBTITLES ---------- */
    (function initVideos() {
        const vHero = $('#portraitVideoHero'), vAbout = $('#portraitVideoAbout'), vBg = $('#portraitVideoBg');
        const stage = $('#cinematicPortraitStage'), skills = $('#skills');

        // Videos attach their src only when needed; posters show the same first frame meanwhile
        const attach = v => {
            if (!v || !v.dataset.src) return;
            v.src = v.dataset.src;
            delete v.dataset.src;
            v.muted = true;
            v.autoplay = true;
            const p = v.play();
            if (p && p.catch) p.catch(() => {});
        };

        if (REDUCE) return; // reduced motion: posters only, no moving video

        // Hero: after the page has loaded (desktop) or on first interaction (phones / low-end devices)
        if (LITE) {
            const kick = () => { attach(vHero); ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(ev => window.removeEventListener(ev, kick)); };
            ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(ev => window.addEventListener(ev, kick, { passive: true, once: true }));
        } else {
            window.addEventListener('load', () => {
                const go = () => attach(vHero);
                if ('requestIdleCallback' in window) requestIdleCallback(go, { timeout: 2500 }); else setTimeout(go, 800);
            });
        }

        // About & background portrait: desktop only, as they come into view
        if (!LITE && 'IntersectionObserver' in window) {
            const io = new IntersectionObserver(entries => {
                if (entries.some(e => e.isIntersecting)) { attach(vAbout); io.disconnect(); }
            }, { rootMargin: '0px', threshold: 0.05 });
            io.observe(vAbout);
        }

        let ticking = false;
        function updateStage() {
            ticking = false;
            const r = skills.getBoundingClientRect();
            const vh = window.innerHeight || 1;
            if (!LITE && r.top < vh * 1.6) attach(vBg);
            const k = r.top < vh * 0.75 ? Math.min(1, Math.max(0, (vh * 0.75 - r.top) / (vh * 0.45))) : 0;
            stage.style.opacity = (k * 0.48).toFixed(3);
        }
        window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(updateStage); } }, { passive: true });
        window.addEventListener('resize', updateStage);
        updateStage();

        // Word-by-word subtitles synced to the hero video (runs only while it plays)
        const bar = $('#heroSubtitleBar'), textEl = $('#heroLiveSubtitleText'), cueEl = $('#heroSubCueIndex'), fill = $('#heroSubProgressFill');
        const PHRASES = [
            { num: '01 / 03', start: 0.0, end: 1.48, words: [['Hi,', 0.04], ["I'm", 0.32], ['Saadman', 0.56, 1], ['Khandker.', 0.84, 1]] },
            { num: '02 / 03', start: 1.48, end: 2.68, words: [['Engineering', 1.50], ['precision', 1.84, 1], ['workflows.', 2.16]] },
            { num: '03 / 03', start: 2.68, end: 4.35, words: [["Let's", 2.70], ['build', 2.94], ['something', 3.18, 1], ['remarkable.', 3.52, 1]] }
        ];
        let phraseIdx = -1, raf = 0;

        function sync() {
            const time = vHero.currentTime || 0;
            if (time > 4.35 && time < 5.95) {
                bar.classList.add('is-resting');
                fill.style.width = '100%';
            } else {
                bar.classList.remove('is-resting');
                let active = PHRASES.findIndex(p => time >= p.start && time < p.end);
                if (active < 0) active = 0;
                const phrase = PHRASES[active];
                if (active !== phraseIdx) {
                    phraseIdx = active;
                    cueEl.textContent = phrase.num;
                    textEl.innerHTML = phrase.words.map(w => `<span class="reel-sub-word${w[2] ? ' is-accent' : ''}">${w[0]}</span>`).join('');
                }
                const spans = textEl.children;
                phrase.words.forEach((w, i) => { if (spans[i]) spans[i].classList.toggle('is-spoken', time >= w[1] || time >= 5.95); });
                fill.style.width = Math.min(100, Math.max(0, (time / 4.15) * 100)).toFixed(1) + '%';
            }
            raf = requestAnimationFrame(sync);
        }
        vHero.addEventListener('playing', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(sync); });
        vHero.addEventListener('pause', () => cancelAnimationFrame(raf));

        // Pause the hero video while it is off-screen
        if ('IntersectionObserver' in window) {
            new IntersectionObserver(([entry]) => {
                if (!vHero.src) return;
                if (entry.isIntersecting) { const p = vHero.play(); if (p && p.catch) p.catch(() => {}); } else vHero.pause();
            }).observe(vHero);
        }
    })();

    /* ---------- 13. SUPABASE CONTENT SYNC (ADMIN PANEL) ---------- */
    (async function initCloudContentSync() {
        const SUPABASE_URL = 'https://oiruilsgqfqpmhradcrm.supabase.co';
        const SUPABASE_KEY = 'sb_publishable_eejxo50gMcgeLDFM91a70A_trAfjMPm';

        const applyContent = c => {
            if (!c) return;
            if (c.resumeUrl && c.resumeUrl.trim()) {
                $$('a[data-resume-link]').forEach(a => { a.href = c.resumeUrl.trim(); a.classList.remove('hidden'); });
            }
            if (c.email && c.email.trim()) {
                $('#editorialCopyEmailBtn').setAttribute('data-email', c.email.trim());
                const mailto = $('a[href^="mailto:"]');
                if (mailto) mailto.href = `mailto:${c.email.trim()}`;
            }
            const links = { linkedin: 'socialLinkLinkedin', github: 'socialLinkGithub', facebook: 'socialLinkFacebook', instagram: 'socialLinkInstagram' };
            Object.keys(links).forEach(k => { if (c[k]) { const el = document.getElementById(links[k]); if (el) el.href = c[k]; } });
            if (c.whatsapp) $('#socialLinkWhatsapp').href = `https://wa.me/${c.whatsapp.replace(/\D/g, '')}?text=Hello%20Saadman,%20I%20visited%20your%20portfolio`;
            // Case studies come from the admin panel only when it holds a full set of 4
            if (Array.isArray(c.projects) && c.projects.length >= 4) {
                window.setCloudProjects(c.projects.map(p => ({
                    title: p.title || '',
                    category: p.category || '',
                    problem: p.problem || p.challenge || p.description || '',
                    process: p.process || p.solution || '',
                    result: p.result || '',
                    tools: Array.isArray(p.tags) ? p.tags : (p.tags ? String(p.tags).split(/[,•·]+/).map(s => s.trim()).filter(Boolean) : [])
                })));
            }
        };

        try {
            const cached = localStorage.getItem('portfolioData');
            if (cached) applyContent(JSON.parse(cached));
        } catch (e) { /* ignore bad cache */ }

        try {
            const res = await fetch(`${SUPABASE_URL}/rest/v1/portfolio_content?id=eq.1&select=content`, {
                headers: { 'apikey': SUPABASE_KEY, 'Accept': 'application/json' }
            });
            if (res.ok) {
                const rows = await res.json();
                if (rows && rows[0] && rows[0].content) {
                    applyContent(rows[0].content);
                    try { localStorage.setItem('portfolioData', JSON.stringify(rows[0].content)); } catch (e) { /* storage full / private mode */ }
                }
            }
        } catch (e) { /* offline: the static HTML is complete on its own */ }
    })();
})();
