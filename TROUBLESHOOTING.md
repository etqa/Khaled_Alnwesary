# دليل حل المشاكل

## مشكلة: الموقع يتوقف عند الضغط على F12

### الأسباب المحتملة:

1. **Service Worker يحاول تحميل ملفات غير موجودة**
   - الحل: تم تحديث Service Worker ليتعامل مع الأخطاء بشكل أفضل

2. **Breakpoints في المتصفح**
   - الحل: افتح DevTools → Sources → تأكد من عدم وجود breakpoints نشطة

3. **Console Errors**
   - الحل: تم تحسين معالجة الأخطاء في Service Worker

### التحديثات التي تم إجراؤها:

#### 1. تحسين Service Worker (`public/sw.js`)
```javascript
// تم تغيير CACHE_NAME إلى v6
// استخدام Promise.allSettled بدلاً من addAll
// إضافة معالجة أفضل للأخطاء في fetch
// تخطي طلبات chrome extensions
```

#### 2. تحسين تسجيل Service Worker (`src/main.tsx`)
```javascript
// تفعيل Service Worker فقط في Production
// إضافة فحص دوري للتحديثات
```

### خطوات حل المشكلة:

#### الطريقة 1: مسح Cache وإعادة التحميل
1. افتح DevTools (F12)
2. اذهب إلى Application → Storage
3. اضغط على "Clear site data"
4. أعد تحميل الصفحة (Ctrl+Shift+R)

#### الطريقة 2: إلغاء تسجيل Service Worker
1. افتح DevTools (F12)
2. اذهب إلى Application → Service Workers
3. اضغط على "Unregister" لكل service worker
4. أعد تحميل الصفحة

#### الطريقة 3: تعطيل Service Worker مؤقتاً
في `src/main.tsx`، غير الشرط:
```typescript
if ('serviceWorker' in navigator && false) {
  // Service Worker معطل مؤقتاً
}
```

### نصائح للتطوير:

1. **استخدم وضع التطوير بدون Service Worker**
   ```bash
   npm run dev
   ```

2. **في DevTools، فعّل "Bypass for network"**
   - Application → Service Workers → ✓ Bypass for network

3. **استخدم Incognito Mode للاختبار**
   - لا يحتفظ بـ cache أو service workers

### الأخطاء الشائعة وحلولها:

#### خطأ: `Failed to fetch`
- **السبب**: Service Worker يحاول تحميل ملف غير موجود
- **الحل**: تم إصلاحه في التحديث الجديد

#### خطأ: `BREAKPOINT_DISCONNECTED`
- **السبب**: breakpoint نشط في الكود
- **الحل**: Sources → تعطيل جميع breakpoints

#### خطأ: `Uncaught (in promise)`
- **السبب**: promise غير معالج
- **الحل**: تم إضافة catch handlers

### للتأكد من عمل التحديثات:

1. احذف مجلد `dist`:
   ```bash
   rm -rf dist
   ```

2. أعد البناء:
   ```bash
   npm run build
   ```

3. اختبر محلياً:
   ```bash
   npm run preview
   ```

4. افتح DevTools وتحقق من:
   - Console: لا أخطاء حمراء
   - Network: جميع الطلبات ناجحة
   - Application: Service Worker نشط بدون أخطاء

### ملاحظات مهمة:

- Service Worker الآن يعمل فقط في Production
- تم تحسين معالجة الأخطاء
- Cache version تم تحديثه إلى v6
- الموقع يجب أن يعمل بشكل طبيعي الآن

---

**إذا استمرت المشكلة، جرب:**
1. مسح كل بيانات المتصفح
2. استخدام متصفح آخر
3. التحقق من Console للأخطاء الجديدة
