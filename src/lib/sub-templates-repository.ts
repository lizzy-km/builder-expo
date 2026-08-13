/**
 * Firestore CRUD for sub templates — reusable block groups saved out of a page.
 */

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

import { decodeBlocks, encodeBlocks } from '@/lib/block-serialization';
import { db } from '@/lib/firebase';
import type { SubTemplate, WidgetBlock } from '@/types/builder';

const COLLECTION = 'subTemplates';

const templatesCollection = () => collection(db, COLLECTION);

type StoredTemplate = Omit<SubTemplate, 'id'>;

function toSubTemplate(id: string, data: StoredTemplate): SubTemplate {
  return {
    id,
    name: data.name,
    blocks: decodeBlocks(data.blocks ?? []),
    ownerId: data.ownerId,
    createdAt: data.createdAt,
  };
}

export async function listSubTemplates(ownerId: string): Promise<SubTemplate[]> {
  const snapshot = await getDocs(
    query(templatesCollection(), where('ownerId', '==', ownerId), orderBy('createdAt', 'desc')),
  );
  return snapshot.docs.map((entry) => toSubTemplate(entry.id, entry.data() as StoredTemplate));
}

export async function createSubTemplate(
  name: string,
  blocks: WidgetBlock[],
  ownerId: string,
): Promise<SubTemplate> {
  const payload: StoredTemplate = {
    name,
    blocks: encodeBlocks(blocks),
    ownerId,
    createdAt: Date.now(),
  };
  const created = await addDoc(templatesCollection(), payload);
  return toSubTemplate(created.id, payload);
}

export async function deleteSubTemplate(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}
