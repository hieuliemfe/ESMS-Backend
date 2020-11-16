'use strict'

import path from 'path';
import { Storage } from '@google-cloud/storage'

export const uploadEvidence = async (fileUpload) => {
  try {
    let evidenceUrl;
    const gc = new Storage({
      keyFilename: path.join(__dirname + '/../' + process.env.GCS_EVIDENCE_CREDENTIAL),
      projectId: process.env.GCS_EVIDENCE_PROJECT_ID
    })
    const evidenceStreamBucket = gc.bucket(process.env.GCS_EVIDENCE_BUCKET_NAME);
    const gcsname = Date.now() + "-" + fileUpload.originalname;
    const file = evidenceStreamBucket.file(gcsname);
    //config for getSignedUrl
    const config = {
      action: 'read',
      expires: '12-31-2099'
    }
    await file.save(fileUpload.buffer)
      .then(async (result, err) => {
        if (err) {
          console.log("ERROR" + err);
          return null;
        } else {
          await file.getSignedUrl(config)
            .then((url, err) => {
              evidenceUrl = url;
            });
        }
      });
    return evidenceUrl;
  } catch (error) {
    console.log(error)
  }
}

export const getSignedURL = async (gcpath) => {
  try {
    let evidenceUrl = "";
    const gc = new Storage({
      keyFilename: path.join(__dirname + '/../' + process.env.GCS_EVIDENCE_CREDENTIAL),
      projectId: process.env.GCS_EVIDENCE_PROJECT_ID
    })
    const evidenceStreamBucket = gc.bucket(process.env.GCS_EVIDENCE_BUCKET_NAME);

    const config = {
      version: 'v4',
      action: 'read',
      expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    };
    const file = evidenceStreamBucket.file(gcpath)
    let existed = await file.exists()
    if(existed[0]){
      await file.getSignedUrl(config).then((url, err) => {
        evidenceUrl = url;
      });
    }else{
      evidenceUrl = "File not existed"
    }
    return evidenceUrl;
  } catch (error) {
    console.log(error)
  }
}

