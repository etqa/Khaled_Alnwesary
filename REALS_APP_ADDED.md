# إضافة تطبيق "مانع الريلز" إلى قسم المجانية

## التغييرات التي تمت:

### 1. تحديث ملف صفحة التطبيق
**الملف:** `src/pages/free/reals/index.tsx`
- تم تغيير اسم المكون من `HadeApp` إلى `RealsApp`
- تم تحديث معرف التطبيق (id) من `"hade_app"` إلى `"reals"`
- تم تصدير المكون باسمه الصحيح `RealsApp`

### 2. إنشاء ملف محتوى جديد للتطبيق
**الملف:** `src/pages/free/reals/content.md`
- تم إنشاء ملف markdown كامل لتطبيق "مانع الريلز"
- يحتوي على:
  - **العنوان:** مانع الريلز - ساعدك على التوقف عن إهدار الوقت
  - **الوصف القصير:** تطبيق أندرويد يساعدك على التوقف عن إهدار الوقت في الفيديوهات القصيرة
  - **النسخة:** 16.0.0
  - **النوع:** مجاني
  - **المنصة:** أندرويد
  - **رابط التحميل:** https://play.google.com/store/apps/details?id=com.mane3.alreels
  - **المزايا الرئيسية:**
    1. مراقبة 5 تطبيقات شهيرة (يوتيوب، انستغرام، فيسبوك، تيك توك، سناب شات)
    2. ثلاثة مستويات حظر قابلة للتخصيص
    3. ميزة "الريلز الأول مجاناً"
    4. إحصائيات استخدام تفصيلية
    5. اقتراحات أنشطة بديلة
    6. واجهة عربية بالكامل
    7. الخصوصية والأمان
    8. وضع تشخيص متقدم
  - نسخة إنجليزية كاملة من المحتوى

### 3. إضافة التطبيق إلى صفحة المجانيات
**الملف:** `src/pages/Free.tsx`
- تم استيراد ملف المحتوى: `import realsMd from "@/pages/free/reals/content.md?raw";`
- تم إضافة hook للقراءة: `const reals = useReadme({ localContent: realsMd, id: "reals" });`
- تم إضافة التطبيق إلى مصفوفة `freeItems`:
  ```typescript
  {
    id: "reals",
    title: reals.titleContent || "",
    description: reals.shortDesc || reals.overviewContent || reals.longDesc || "",
    longDescription: reals.longDesc || "",
    icon: BookOpen,
    category: t("free.categories.mobile_app"),
    link: "/free/reals",
    isPaid: reals.isPaid,
    isComingSoon: reals.isComingSoon,
    typeLabel: reals.typeLabel,
    imageName: "RealsApp"
  }
  ```

### 4. إضافة التطبيق إلى معاينة المجانيات في الصفحة الرئيسية
**الملف:** `src/components/sections/FreePreview.tsx`
- تم استيراد ملف المحتوى: `import realsMd from "@/pages/free/reals/content.md?raw";`
- تم إضافة hook للقراءة: `const reals = useReadme({ localContent: realsMd, id: "reals" });`
- تم إضافة التطبيق إلى مصفوفة `freeItems` لعرضه في الصفحة الرئيسية

### 5. الملفات الموجودة مسبقاً
- **الأيقونة:** `src/pages/free/reals/icon.png` (موجودة بالفعل)
- **التوجيه:** يتم التعامل معه تلقائياً عبر `FreeDetail.tsx` الذي يحمل المكونات ديناميكياً

## النتيجة:

✅ **تم بناء المشروع بنجاح** (Build successful)
✅ **التطبيق يظهر الآن في:**
   - الصفحة الرئيسية (قسم المعاينة)
   - صفحة المجانيات الكاملة (/free)
   - صفحة تفاصيل التطبيق (/free/reals)

✅ **يعمل بنفس طريقة تطبيق "هدي":**
   - عرض الأيقونة
   - عرض المعلومات الأساسية
   - زر التحميل من Google Play Store
   - زر التواصل عبر WhatsApp
   - عرض المزايا والتفاصيل الكاملة

## للاختبار:

1. شغّل الخادم المحلي:
   ```bash
   npm run dev
   ```

2. افتح المتصفح على: `http://localhost:5173`

3. تحقق من:
   - ظهور التطبيق في الصفحة الرئيسية (قسم المجانيات)
   - ظهوره في صفحة `/free`
   - عمل صفحة التفاصيل `/free/reals`
   - عمل أزرار التحميل والتواصل

## ملاحظات:

- التطبيق معرّف كـ **مجاني** (Free)
- النسخة الحالية: **16.0.0**
- يدعم اللغتين العربية والإنجليزية
- الأيقونة موجودة في المجلد
- جميع الروابط تعمل بشكل صحيح
