import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { ActivityTypeDocument } from "./types/activityType";

const db = admin.firestore();

export const createActivityType = functions.https.onRequest(async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type');
  
  if (request.method === 'OPTIONS') {
    response.status(204).send('');
    return;
  }

  if (request.method !== 'POST') {
    response.status(405).send('Method Not Allowed');
    return;
  }

  try {
    const activityTypeData: Omit<ActivityTypeDocument, 'createdAt' | 'updatedAt'> = request.body;
    
    // Validate that custom id is provided
    if (!activityTypeData.id || !activityTypeData.label) {
      response.status(400).json({ error: 'Both id and label are required' });
      return;
    }

    // Check if custom id already exists
    const existingSnapshot = await db.collection('activityTypes')
      .where('id', '==', activityTypeData.id)
      .limit(1)
      .get();

    if (!existingSnapshot.empty) {
      response.status(409).json({ error: 'Activity type with this id already exists' });
      return;
    }
    
    const now = new Date();
    const docRef = await db.collection('activityTypes').add({
      ...activityTypeData,
      createdAt: now,
      updatedAt: now,
    });

    response.status(201).json({
      docId: docRef.id,
      id: activityTypeData.id,
      message: 'Activity type created successfully'
    });
  } catch (error) {
    console.error('Error creating activity type:', error);
    response.status(500).json({ error: 'Failed to create activity type' });
  }
});

export const getActivityTypes = functions.https.onRequest(async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type');
  
  if (request.method === 'OPTIONS') {
    response.status(204).send('');
    return;
  }

  if (request.method !== 'GET') {
    response.status(405).send('Method Not Allowed');
    return;
  }

  try {
    const snapshot = await db.collection('activityTypes').get();
    
    const activityTypes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    response.status(200).json({
      activityTypes,
      count: activityTypes.length
    });
  } catch (error) {
    console.error('Error fetching activity types:', error);
    response.status(500).json({ error: 'Failed to fetch activity types' });
  }
});
