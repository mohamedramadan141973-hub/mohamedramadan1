منصة مراجعة التربية الإسلامية - نسخة Netlify
الملفات: index.html (المنصة للطلبة) | admin.html (لوحة المعلم) | questions.json (كل الأسئلة) | netlify/functions/api.mjs (تسجيل النتائج).

خطوات النشر (مرة واحدة):
1) افتح github.com وسجّل حساباً مجانياً، ثم New repository، ثم Add file > Upload files، وارفع كل محتويات هذا المجلد (مع مجلد netlify) ثم Commit.
2) افتح app.netlify.com وسجّل بحساب GitHub، ثم Add new site > Import an existing project > GitHub > اختر المستودع > Deploy.
3) من Site configuration > Environment variables أضف المتغير TEACHER_PASSWORD وقيمته كلمة سرك، ثم Deploys > Trigger deploy.
الطلبة يفتحون رابط الموقع، ولوحتك على: رابط-موقعك/admin.html

تعديل الأسئلة: عدّل ملف questions.json (في GitHub زر القلم) وسيتحدث الموقع تلقائياً.
نشر سريع بدون لوحة المعلم: اسحب المجلد إلى app.netlify.com/drop (المنصة والدرجات تعمل، لكن لوحة المعلم لا تعمل).
