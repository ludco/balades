import { db } from './firebase.config';

/* ----------------- WALKS --------------------- */

/**
 * Get Walks documents from firebase
 */
export const fetchWalks = async () => {
  try {
    const response = await db.collection('balades');
    const data = await response.get();
    const walksArray = [];
    data.docs.forEach((item) => {
      walksArray.push(item.data());
    });
    return walksArray;
  } catch (e) {
    console.log(e);
  }
};
/**
 * Create Walk document
 * @param {Object} walkToAdd
 * @param {String} fireBaseUrl
 * @returns
 */
export const createWalk = async (walkToAdd, fireBaseUrl) => {
  try {
    const walkRef = await db
      .collection('balades')
      .add({ ...walkToAdd, pics: [fireBaseUrl] });
    console.log('Document successfully written!');

    return getWalkDocument(walkRef.id);
  } catch (e) {
    console.error('Error creating walk document', e);
  }
};

/**
 * Get firebase Walk document by Id
 * @param {string} id
 * @returns
 */
export const getWalkDocument = async (id) => {
  if (!id) return null;
  try {
    const walkDocument = await db.doc(`balades/${id}`).get();
    return {
      id,
      ...walkDocument.data(),
    };
  } catch (error) {
    console.error('Error fetching walk', error);
  }
};

/* ----------------- USER --------------------- */

/**
 * Generate firebase User Document (signUp)
 * @param {Object} newUser
 * @param {Object} additionalDatas
 * @returns user
 */
export const generateUserDocument = async (newUser, additionalDatas) => {
  if (!newUser) return;
  const userRef = db.doc(`users/${newUser.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email } = newUser;
    try {
      await userRef.set({
        email,
        ...additionalDatas,
      });
    } catch (error) {
      console.error('Error creating user document', error);
    }
  }
  return getUserDocument(newUser.uid);
};

/**
 * Get firebase User document
 * @param {string} uid
 * @returns
 */
export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await db.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error('Error fetching user', error);
  }
};
