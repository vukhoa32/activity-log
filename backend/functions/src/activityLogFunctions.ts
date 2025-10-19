import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { ActivityLogDocument } from "./types/activityLog";

const db = admin.firestore();

export const createActivityLog = functions.https.onRequest(async (request, response) => {
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
    const { activityTypeId, data, timestamp } = request.body;

    // Find activity type by custom id field
    const activityTypesSnapshot = await db.collection('activityTypes')
      .where('id', '==', activityTypeId)
      .limit(1)
      .get();

    if (activityTypesSnapshot.empty) {
      response.status(404).json({ error: 'Activity type not found' });
      return;
    }

    const logData: Omit<ActivityLogDocument, 'createdAt'> = {
      activityTypeId, // Store the custom id, not Firestore doc id
      data,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
    };

    const docRef = await db.collection('activityLogs').add({
      ...logData,
      createdAt: new Date(),
    });

    response.status(201).json({
      id: docRef.id,
      message: 'Activity log created successfully'
    });
  } catch (error) {
    console.error('Error creating activity log:', error);
    response.status(500).json({ error: 'Failed to create activity log' });
  }
});

export const getActivityLogs = functions.https.onRequest(async (request, response) => {
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
    const snapshot = await db.collection('activityLogs')
      .orderBy('timestamp', 'desc')
      .get();
    
    const activityLogs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    response.status(200).json({
      activityLogs,
      count: activityLogs.length
    });
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    response.status(500).json({ error: 'Failed to fetch activity logs' });
  }
});
