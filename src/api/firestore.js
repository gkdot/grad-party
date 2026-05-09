import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const rsvpAPI = {
  async create(data) {
    return addDoc(collection(db, 'rsvps'), { ...data, created_date: serverTimestamp() });
  },
  async list() {
    const snap = await getDocs(query(collection(db, 'rsvps'), orderBy('created_date', 'desc')));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },
  async update(id, data) {
    return updateDoc(doc(db, 'rsvps', id), data);
  },
  async remove(id) {
    return deleteDoc(doc(db, 'rsvps', id));
  },
};
