# دليل البنية الجديدة للمشروع

## نظرة عامة
تم إعادة هيكلة المشروع لتنظيم كل منتج، كورس، خدمة، وتطبيق مجاني في مجلد خاص به. هذا يسهل الصيانة والتطوير وإضافة عناصر جديدة.

## البنية الجديدة

### 📁 الكورسات (Courses)
```
src/pages/courses/
├── blender/
│   ├── index.tsx          # مكون الكورس
│   └── content.md         # محتوى الكورس
├── blender-free-ext/
│   ├── index.tsx
│   └── content.md
├── blender-free-int/
│   ├── index.tsx
│   └── content.md
└── d5-render-free/
    ├── index.tsx
    └── content.md
```

### 📁 المنتجات (Products)
```
src/pages/products/
├── engineer-system/
│   ├── index.tsx          # مكون المنتج
│   ├── content.md         # وصف المنتج
│   └── prices.md          # جدول الأسعار
├── engineer-system-lite/
│   ├── index.tsx
│   ├── content.md
│   └── prices.md
└── file-encryption/
    ├── index.tsx
    ├── content.md
    └── prices.md
```

### 📁 التطبيقات المجانية (Free Apps)
```
src/pages/free/
├── kh-tools/
│   ├── index.tsx          # مكون التطبيق
│   └── content.md         # وصف التطبيق
├── quran-app/
│   ├── index.tsx
│   └── content.md
└── task-manager/
    ├── index.tsx
    └── content.md
```

### 📁 الخدمات (Services)
```
src/pages/services/
├── animation/
│   ├── index.tsx          # مكون الخدمة
│   └── content.md         # وصف الخدمة
├── exterior-design/
│   ├── index.tsx
│   └── content.md
├── interior-design/
│   ├── index.tsx
│   └── content.md
└── virtual-tours/
    ├── index.tsx
    └── content.md
```

## كيفية إضافة عنصر جديد

### إضافة كورس جديد
1. أنشئ مجلد جديد في `src/pages/courses/` باسم الكورس (مثل: `new-course/`)
2. أنشئ ملف `index.tsx` داخل المجلد
3. أنشئ ملف `content.md` للمحتوى
4. أضف استيراد في `src/pages/Courses.tsx`:
```typescript
import newCourseMd from "@/pages/courses/new-course/content.md?raw";
```
5. أضف الكورس في قائمة `courses` في نفس الملف

### إضافة منتج جديد
1. أنشئ مجلد جديد في `src/pages/products/` باسم المنتج (مثل: `new-product/`)
2. أنشئ ملف `index.tsx` داخل المجلد
3. أنشئ ملف `content.md` للوصف
4. أنشئ ملف `prices.md` للأسعار (اختياري)
5. أضف استيراد في `src/pages/Products.tsx`:
```typescript
import newProductMd from "@/pages/products/new-product/content.md?raw";
```
6. أضف المنتج في قائمة `products` في نفس الملف

### إضافة تطبيق مجاني جديد
1. أنشئ مجلد جديد في `src/pages/free/` باسم التطبيق (مثل: `new-app/`)
2. أنشئ ملف `index.tsx` داخل المجلد
3. أنشئ ملف `content.md` للمحتوى
4. أضف استيراد في `src/pages/Free.tsx`:
```typescript
import newAppMd from "@/pages/free/new-app/content.md?raw";
```
5. أضف التطبيق في قائمة `freeItems` في نفس الملف

### إضافة خدمة جديدة
1. أنشئ مجلد جديد في `src/pages/services/` باسم الخدمة (مثل: `new-service/`)
2. أنشئ ملف `index.tsx` داخل المجلد
3. أنشئ ملف `content.md` للمحتوى
4. أضف استيراد في `src/pages/Services.tsx`:
```typescript
import newServiceMd from "@/pages/services/new-service/content.md?raw";
```
5. أضف الخدمة في قائمة `services` في نفس الملف
6. إذا كان اسم المجلد مختلف عن الـ ID في الرابط، أضف التعيين في `ServiceDetail.tsx`:
```typescript
const serviceMap: Record<string, string> = {
    "new-service-id": "new-service",
    // ...
};
```

## نظام التحميل الديناميكي

تم تحديث ملفات Detail لاستخدام التحميل الديناميكي (Dynamic Imports) مع React.lazy:

- `CourseDetail.tsx` - يحمل الكورسات ديناميكياً
- `ProductDetail.tsx` - يحمل المنتجات ديناميكياً
- `FreeDetail.tsx` - يحمل التطبيقات المجانية ديناميكياً
- `ServiceDetail.tsx` - يحمل الخدمات ديناميكياً

هذا يعني أنك لا تحتاج لتعديل هذه الملفات عند إضافة عنصر جديد!

## مميزات البنية الجديدة

✅ **تنظيم أفضل**: كل عنصر في مجلد خاص به
✅ **سهولة الصيانة**: تعديل أي عنصر دون التأثير على الآخرين
✅ **قابلية التوسع**: إضافة عناصر جديدة بسهولة
✅ **تحميل ديناميكي**: تحسين الأداء بتحميل الصفحات عند الحاجة فقط
✅ **وضوح الكود**: بنية واضحة وسهلة الفهم

## ملاحظات مهمة

- اسم المجلد يجب أن يكون بالأحرف الصغيرة ومفصول بـ `-` (kebab-case)
- ملف `index.tsx` هو نقطة الدخول لكل عنصر
- ملف `content.md` يحتوي على المحتوى الرئيسي
- ملف `prices.md` اختياري للمنتجات فقط
- استخدم `useReadme` hook لقراءة محتوى الـ markdown
