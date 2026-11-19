# Atlas AI Institute: সম্পূর্ণ ওয়েবসাইট অপ্টিমাইজেশন পরিকল্পনা

## লক্ষ্য

বর্তমান Atlas AI Institute ওয়েবসাইটের পৃষ্ঠা লোড হওয়ার গতি বাড়ানো এবং ছবি ডাউনলোডে ব্যবহৃত ডেটা কমানো—কোনো লেখা, পৃষ্ঠার ঠিকানা, নকশা, লিংক বা ব্যবহারযোগ্যতা না বদলে। একটি সম্পূর্ণ ZIP ফাইল সরবরাহ করা হবে, যাতে ওয়েবসাইটের সোর্স কোড, সব মূল ও অপ্টিমাইজ করা ছবি, পাবলিক ফাইল এবং তৈরি করা প্রোডাকশন বিল্ড থাকবে।

## প্রকল্পের বর্তমান কাঠামো

- `src/pages/`-এ ওয়েবসাইটের বিভিন্ন পৃষ্ঠা রয়েছে; এর মধ্যে নেতৃত্ব ও কমিটি-সংক্রান্ত পৃষ্ঠাগুলোও আছে।
- `src/components/`-এ হেডার, ফুটার, কার্ড, ছবি-গ্যালারি এবং অ্যানিমেটেড গ্লোবসহ পুনর্ব্যবহারযোগ্য অংশগুলো রয়েছে।
- `src/data/`-এ পৃষ্ঠার লেখা, নেতৃত্ব ও কমিটির তথ্য এবং ছবির রেজিস্ট্রি রয়েছে।
- `src/lib/`-এ ছবি খোঁজা ও SEO-সংক্রান্ত সহায়ক কোড রয়েছে।
- `src/assets/`-এ ৩১টি মূল ছবি আছে; সব মিলিয়ে প্রায় ৮.৯ MB। এর মধ্যে ৮টি কমিটি-সংক্রান্ত প্রতিকৃতির আকার প্রায় ৬.৯ MB।
- `public/`-এ রুট ম্যানিফেস্ট, সাইটম্যাপ ও একটি স্থির গ্লোব-চিত্রের ফাইল রয়েছে।
- `App.tsx` এখন সব পৃষ্ঠার কোড একসঙ্গে লোড করে। বর্তমান বিল্ডে JavaScript ফাইলের আকার ৫২৬.৬ KB (gzip করার পর ১৪৪.৪ KB) এবং CSS ফাইল ৫৮.৩ KB (gzip করার পর ১১.৫ KB)।

## নকশা ও বিষয়বস্তু অক্ষুণ্ণ রাখা

বর্তমান Atlas AI Institute-এর গাঢ় নেভি, উষ্ণ কাগজের মতো হালকা পটভূমি, সোনালি রং এবং সেরিফ/স্যান্স-সেরিফ অক্ষরশৈলী বজায় থাকবে। লেখা, পৃষ্ঠার ঠিকানা, লিংক, ছবি, ছবির অনুপাত, স্বচ্ছতা, ক্রপ, বিকল্প লেখা এবং গ্যালারির আচরণ বদলানো হবে না।

## বাস্তবায়নের পদ্ধতি

১. `src/assets-optimized/`-এ মূল ছবিগুলোর ছোট ও দ্রুত লোড হওয়া আলাদা সংস্করণ তৈরি করা হবে। প্রতিকৃতির সর্বোচ্চ দৈর্ঘ্য আনুমানিক ৭৬৮ পিক্সেল রাখা হবে এবং উচ্চমানের WebP সংকোচন ব্যবহার করা হবে; স্বচ্ছ অংশ থাকলে তা সংরক্ষণ করা হবে। লোগোর চিহ্নটি উচ্চ-পিক্সেল-ঘনত্বের পর্দায় পরিষ্কার দেখানোর উপযোগী আকারে ছোট করা হবে। `src/assets/`-এর মূল ছবিগুলো একেবারে অপরিবর্তিত থাকবে এবং মূল ও অপ্টিমাইজ করা—দুই ধরনের ছবিই চূড়ান্ত ZIP-এ থাকবে।

২. নেতৃত্ব, কমিটি ও প্রোফাইলের ছবি এবং লোগো দেখানোর কোডকে নতুন অপ্টিমাইজ করা ছবিগুলো ব্যবহারের জন্য যুক্ত করা হবে। ছবিগুলো স্থানীয় থাকবে এবং Vite সেগুলোকে বিল্ডের অংশ হিসেবে সামলাবে; বাইরের ছবির সেবার ওপর নির্ভরতা যোগ হবে না। বর্তমান বিল্ড কনফিগারেশনের আচরণ অযথা বদলানো হবে না।

৩. React-এর বিলম্বিত লোডিং ব্যবহার করে পৃষ্ঠা অনুযায়ী JavaScript ভাগ করা হবে; ফলে দর্শক প্রথমে কেবল খোলা পৃষ্ঠার কোডই নামাবেন। মূল পৃষ্ঠার অ্যানিমেটেড গ্লোবের কোড গ্লোবটি পর্দায় আসার কাছাকাছি হলেই লোড হবে। লোড হওয়ার আগেই তার জন্য একই জায়গা সংরক্ষিত থাকবে, যাতে বিন্যাস হঠাৎ বদলে না যায়; কম নড়াচড়া পছন্দ করেন এমন দর্শকের জন্য বিদ্যমান আচরণও বজায় থাকবে।

৪. ছবির অগ্রাধিকার ও মাপ পর্যালোচনা করা হবে। পর্দার প্রথম অংশে জরুরি ব্র্যান্ড/হিরো ছবি অগ্রাধিকার পাবে; নিচের অংশের প্রতিকৃতি অলসভাবে লোড হবে। অপ্রয়োজনীয়ভাবে ছবি একাধিকবার বা শুরুতেই সব ছবি ডাউনলোড হবে না।

৫. বিল্ড, টাইপ পরীক্ষা, ছবির আকার এবং JavaScript/CSS ফাইলের আকার যাচাই করা হবে। গুরুত্বপূর্ণ পৃষ্ঠা ও ছবির পথ পরীক্ষা করা হবে; বিদ্যমান সব পৃষ্ঠার রুট ম্যানিফেস্টও অক্ষুণ্ণ থাকবে।

৬. পুরো সাইটে scroll progress ও section progress-এর আপডেট `requestAnimationFrame`-এ সমন্বয় করে DOM-এ সরাসরি প্রয়োগ করা হবে, যাতে প্রতিটি scroll event-এ React component অকারণে re-render না হয়। বর্তমান indicator-এর চেহারা ও অর্থ, keyboard ব্যবহার এবং `prefers-reduced-motion`-এর আচরণ অক্ষুণ্ণ থাকবে। নিচের অংশের ছবিতে asynchronous decoding রাখা হবে; প্রথম পর্দার লোগো ও profile portrait-এর অগ্রাধিকার বজায় থাকবে। Mobile navigation থেকে route পরিবর্তন হলে focus দৃশ্যমান main landmark-এ যাবে। Enquiry request-এর সময়সীমা নির্ধারিত থাকবে, যাতে দুর্বল নেটওয়ার্কে submit button অনির্দিষ্টকাল আটকে না থাকে; বিদ্যমান validation, error ও direct-email fallback বজায় থাকবে।

৭. `atlas-ai-institute-optimized.zip` তৈরি করা হবে। এতে সোর্স কোড, সব মূল ও অপ্টিমাইজ করা ছবি, `public/` ফাইল, নির্ভরতার তালিকা ও লকফাইল এবং প্রোডাকশন `dist/` বিল্ড থাকবে। `.git/`, `node_modules/`, স্থানীয় গোপন তথ্য এবং অস্থায়ী লগ বাদ থাকবে। ZIP-এর ফাইলতালিকা ও ছবির সংখ্যা যাচাই করার পরই ফাইল সরবরাহ করা হবে।

## প্রকল্প-সংক্রান্ত সীমা

বর্তমান React/Vite/npm কাঠামো ও লকফাইল বজায় থাকবে। কোনো নতুন রানটাইম নির্ভরতা যোগ হবে না; ছবির রূপান্তরে কেবল এই পরিবেশে থাকা টুল ব্যবহার করা হবে। মাপা প্রয়োজন ছাড়া বর্তমান বিল্ড বা সার্ভিং কনফিগারেশন বদলানো হবে না।

## সরবরাহ

পরিবর্তনগুলো `origin/main`-এ Git checkpoint হিসেবে সংরক্ষণ করা হবে। সাইটটি আগে থেকেই পাবলিক, তবে আপনি আলাদাভাবে প্রকাশ করতে না বললে নতুন সংস্করণটি লাইভে প্রকাশ করা হবে না। চূড়ান্ত ZIP-এর ডাউনলোড লিংক দেওয়া হবে।

## মাস্টার প্রম্পট: প্রযুক্তিগত SEO, crawlability ও machine readability

এই ধাপের সর্বোচ্চ অগ্রাধিকার হলো বিদ্যমান লেখা, ছবি, layout, typography, navigation appearance এবং ব্যবহারকারীর দৃশ্যমান আচরণ অপরিবর্তিত রাখা। আগে পূর্ণ backup ও ঘোষিত route-গুলোর desktop/mobile screenshot নেওয়া হয়েছে; পরিবর্তনের পরে একই viewport ও motion preference দিয়ে screenshot তুলনা করা হবে।

দেওয়া প্রকল্পটি Next.js নয়; এটি React 19, React Router 7 ও Vite-এর client-rendered SPA। framework migration না করে একই toolchain দিয়ে static generation/prerendering পরীক্ষা ও বাস্তবায়ন করা হবে, যাতে public route-এর অর্থবহ HTML এবং route-specific head metadata প্রথম response-এ থাকে। Static render/hydration-এর আগে ও পরে visual regression পরীক্ষা আবশ্যক।

প্রতিটি public route-এ বিদ্যমান source data থেকে title, description, canonical, Open Graph, X/Twitter এবং উপযুক্ত robots metadata তৈরি হবে। Organization, WebSite, WebPage/ProfilePage, Person, BreadcrumbList এবং বিদ্যমান publication data সমর্থন করলে Article/Report schema যোগ হবে। শুধু যাচাইযোগ্য name, role, affiliation, publication facts ও host relationship ব্যবহার করা হবে; নতুন দৃশ্যমান copy বা unsupported credential/claim তৈরি হবে না।

Vite build-এ sitemap ও 404 document, public `robots.txt`, এবং বিদ্যমান content-এ সরাসরি নির্দেশক `llms.txt` তৈরি হবে। Search/retrieval, user-triggered fetch এবং model-training bot-কে আলাদা policy হিসেবে বিবেচনা করা হবে; কোনো crawler rule-কে indexing/training-এর নিশ্চয়তা বা security boundary বলা হবে না। Public static files, code, fonts, images এবং form destination-এর ওপর প্রভাব যাচাই করা হবে।

প্রকল্পে local PDF নেই; publication data-তে বাইরের repository-এর PDF link আছে। প্রতিটি public PDF-এর status/content type/range/text layer ও metadata পরীক্ষা করে inventory লিখতে হবে; স্ক্যান কাগজে OCR-এর প্রয়োজন থাকলে কেবল সুপারিশ করতে হবে, source PDF নীরবে বদলানো যাবে না।

## যাচাইকৃত পরিবেশ ও সীমাবদ্ধতা

- `public/`-এ source project-এর জন্য বর্তমান `sitemap.xml` আছে, কিন্তু `robots.txt` ও `llms.txt` নেই। Project source-এ local PDF নেই; publication PDF-গুলো external host-এ link করা।
- Source archive-এ `.git/` এবং configured Git remote নেই; `origin/main` checkpoint করা সম্ভব নয়। Deployment platform, CDN, WAF বা production server configuration-ও archive-এ নেই; host-specific headers, caching, bot restrictions, server status codes বা deployment changes live-এ लागू হয়েছে বলে দাবি করা যাবে না।
- `https://atlasai.institute/` বর্তমানে Rank Math-সহ WordPress HTML ফেরায়, যা upload করা Vite/React code-এর সঙ্গে মেলে না; project-এর leadership slug live origin-এ 404 দেয়। Taamaattumik এই পরিবর্তনগুলো project artifact-এ সীমাবদ্ধ থাকবে; production domain-এ publish/switch করা হবে না।


## Publications কার্ড ও Insights Archive পরিষ্কারকরণ (2026-11-19)

- বিদ্যমান React 19, React Router 7, Vite এবং `src/data/publications.ts`-এর ডেটা কাঠামো বজায় থাকবে; Next.js migration বা নতুন dependency যোগ হবে না।
- Reports, Research, Frameworks এবং Publications-এর Latest resource list-এর জন্য একটি shared `ResourceCard` থাকবে। Card-এ type label ও date একবার, তিন-লাইন title/description clamp, compact metadata, responsive Details toggle এবং data-driven actions থাকবে। Desktop grid-এ একই সারির কার্ড সমান উচ্চতা পাবে; 390px মোবাইলে দুই action full-width ও এক action-যুক্ত card-ও একক full-width action দেখাবে।
- Typographic cover শুধু Reports পৃষ্ঠার featured report-এ থাকবে; card padding-এর ভেতরে full-width, clipped navy panel হবে এবং label/date দ্বিতীয়বার দেখাবে না। Report highlight তিন কলামে, `75+ / 6 / 2,500+` ফরম্যাটে থাকবে; note দুই লাইনে clamp হবে এবং accessible “Read more” toggle থাকবে। Research/Framework/সাধারণ report card-এ cover থাকবে না।
- Insights পৃষ্ঠায় একই intro-র পুনরাবৃত্তি ও redundant archive box বাদ যাবে, শুধু “Explore All Research & Publications” CTA থাকবে; `ARCHIVE` label থাকবে। Compact spacing ঐচ্ছিক SubpageLayout prop দিয়ে শুধু Insights-এ প্রয়োগ হবে। Reports section eyebrow হবে “01 / REPORTS”; অন্য পৃষ্ঠার spacing, colors, typography ও content অপরিবর্তিত থাকবে।
- বিদ্যমান navy/gold, serif-heading, monospace-label design tokens এবং semantic HTML/focus patterns ব্যবহার হবে; 390px ও desktop-এ overflow/line-clamp/action sizing পরীক্ষা করে `npm run lint` এবং `npm run build` চালানো হবে।
