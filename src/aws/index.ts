import '../../env';
import AWS from "aws-sdk";
 
export const S3 = new AWS.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region,
 })