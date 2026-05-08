import {
  collection,
  doc,
  getDocs,
  getDoc,
  getDocFromServer,
  addDoc,
  setDoc, // ضرورية لربط اليوزر بالـ UID
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  increment,
  writeBatch,
} from 'firebase/firestore';
import { db } from './config'; // المسار المظبوط بناءً على الصورة

// عمليات Firestore CRUD الموحدة
export const firestoreService = {
  // جلب جميع المستندات من كولكشن معين (مثل الرحلات)
  async getAll(collectionName) {
    const snapshot = await getDocs(collection(db, collectionName));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  // جلب مستند واحد باستخدام الـ ID (مثالي لجلب بروفايل المستخدم)
  async getById(collectionName, id) {
    if (!id) return null;
    try {
      const docRef = doc(db, collectionName, id);
      // استخدام getDocFromServer بيضمن إننا بنقرأ الـ Role الجديد (admin) 
      // من غير ما المتصفح يخدعنا بالكاش القديم
      const docSnap = await getDocFromServer(docRef); 
      return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
    } catch (error) {
      console.error("Firestore Get Error:", error);
      return null;
    }
  },

  // إضافة مستند جديد بمعرف تلقائي
  async add(collectionName, data) {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  },

  // إضافة مستند بمعرف مخصص (مهمة لليوزرز لربط الـ UID بالـ Profile)
  async addWithId(collectionName, id, data) {
    const docRef = doc(db, collectionName, id);
    await setDoc(docRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  },

  // تحديث بيانات مستند موجود
  async update(collectionName, id, data) {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, { 
      ...data, 
      updatedAt: serverTimestamp() 
    });
  },

  // حذف مستند
  async delete(collectionName, id) {
    await deleteDoc(doc(db, collectionName, id));
  },

  // نظام الاستعلام المتقدم (Query) مع الفلترة والترتيب
  async query(collectionName, filters = [], sortField = null, limitCount = null) {
    let q = collection(db, collectionName);
    const constraints = [];

    filters.forEach(({ field, operator, value }) => {
      constraints.push(where(field, operator, value));
    });

    if (sortField) {
      constraints.push(orderBy(sortField.field, sortField.direction || 'asc'));
    }
    if (limitCount) {
      constraints.push(limit(limitCount));
    }

    q = query(q, ...constraints);
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  // مراقب التغييرات اللحظية لكولكشن كامل
  onSnapshot(collectionName, callback) {
    return onSnapshot(collection(db, collectionName), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      callback(data);
    });
  },

  // مراقب التغييرات اللحظية لمستند واحد (مفيد لتحديث البروفايل فوراً)
  onDocSnapshot(collectionName, docId, callback) {
    return onSnapshot(doc(db, collectionName, docId), (docSnap) => {
      if (docSnap.exists()) {
        callback({ id: docSnap.id, ...docSnap.data() });
      }
    });
  },

  // تقليل عدد المقاعد المتاحة (خاص بنظام الحجز)
  async decrementSeats(collectionName, id, count = 1) {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      seatsLeft: increment(-count),
      updatedAt: serverTimestamp(),
    });
  },

  // تنفيذ مجموعة عمليات في وقت واحد (Batch) لضمان سلامة البيانات
  async batchWrite(operations) {
    const batch = writeBatch(db);
    operations.forEach(({ type, collectionName, id, data }) => {
      const ref = id ? doc(db, collectionName, id) : doc(collection(db, collectionName));
      if (type === 'set') batch.set(ref, { ...data, updatedAt: serverTimestamp() });
      else if (type === 'update') batch.update(ref, { ...data, updatedAt: serverTimestamp() });
      else if (type === 'delete') batch.delete(ref);
    });
    await batch.commit();
  },
};