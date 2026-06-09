// ============================================================
//  🔄 بارگذار هوشمند کاتالوگ
//  این فایل باید بعد از catalog.js لود شود.
//  اگر داده‌ای در localStorage موجود باشد، آن را جایگزین
//  مقادیر catalog.js می‌کند — بدون نیاز به دانلود فایل.
// ============================================================

(function () {
  const STORAGE_KEY = 'navaye_basyrat_catalog';

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);

      // بازنویسی CATALOG با داده‌های به‌روز localStorage
      if (Array.isArray(parsed) && parsed.length > 0) {
        // چون CATALOG با const تعریف شده، محتوای آرایه را جایگزین می‌کنیم
        CATALOG.length = 0;
        parsed.forEach(function (item) {
          CATALOG.push(item);
        });

        // بروزرسانی CATEGORIES
        if (typeof CATEGORIES !== 'undefined') {
          CATEGORIES.length = 0;
          CATEGORIES.push('همه');
          const cats = [...new Set(CATALOG.map(function (b) { return b.category; }))];
          cats.forEach(function (c) { CATEGORIES.push(c); });
        }

        console.info('[catalog-loader] ✅ کاتالوگ از localStorage بارگذاری شد. تعداد کتاب‌ها:', CATALOG.length);
      }
    } else {
      console.info('[catalog-loader] ℹ️ داده‌ای در localStorage نیست — از catalog.js استفاده می‌شود.');
    }
  } catch (e) {
    console.warn('[catalog-loader] ⚠️ خطا در بارگذاری از localStorage:', e);
  }
})();
