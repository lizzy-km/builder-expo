/**
 * Firestore CRUD for landing pages. One function per operation; no UI concerns here.
 */

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

import { decodeBlocks, encodeBlocks } from '@/lib/block-serialization';
import { db } from '@/lib/firebase';
import type { CreateLandingPageInput, LandingPage, WidgetBlock } from '@/types/builder';

const COLLECTION = 'landingPages';

const pagesCollection = () => collection(db, COLLECTION);
const pageDoc = (id: string) => doc(db, COLLECTION, id);

/** Firestore stores everything but the id, which lives on the document itself. */
type StoredPage = Omit<LandingPage, 'id'>;

function toLandingPage(id: string, data: StoredPage): LandingPage {
  return {
    id,
    title: data.title,
    blocks: decodeBlocks(data.blocks ?? []),
    ownerId: data.ownerId,
    published: data.published ?? false,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

export async function createPage({
  title,
  ownerId,
}: CreateLandingPageInput): Promise<LandingPage> {
  const now = Date.now();
  const payload: StoredPage = {
    title,
    blocks: [],
    ownerId,
    published: false,
    createdAt: now,
    updatedAt: now,
  };
  const created = await addDoc(pagesCollection(), payload);
  return toLandingPage(created.id, payload);
}

/** Only the signed-in user's own pages; security rules reject anything broader. */
export async function listPages(ownerId: string): Promise<LandingPage[]> {
  const snapshot = await getDocs(
    query(pagesCollection(), where('ownerId', '==', ownerId), orderBy('updatedAt', 'desc')),
  );
  return snapshot.docs.map((entry) => toLandingPage(entry.id, entry.data() as StoredPage));
}

export async function getPage(id: string): Promise<LandingPage | null> {
  const snapshot = await getDoc(pageDoc(id));
  if (!snapshot.exists()) return null;
  return toLandingPage(snapshot.id, snapshot.data() as StoredPage);
}

export async function renamePage(id: string, title: string): Promise<void> {
  await updateDoc(pageDoc(id), { title, updatedAt: Date.now() });
}

export async function savePageBlocks(id: string, blocks: WidgetBlock[]): Promise<void> {
  await updateDoc(pageDoc(id), {
    blocks: encodeBlocks(blocks),
    updatedAt: Date.now(),
  });
}

export async function setPagePublished(id: string, published: boolean): Promise<void> {
  await updateDoc(pageDoc(id), { published, updatedAt: Date.now() });
}

export async function deletePage(id: string): Promise<void> {
  await deleteDoc(pageDoc(id));
}
