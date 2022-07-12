import aws from 'aws-sdk';

export default async function upload(file) {

  const s3 = new aws.S3(
    {
        accessKeyId: process.env.STANDBUY_S3_ACCESS_KEY,
        secretAccessKey: process.env.STANDBUY_S3_SECRET_KEY,
        region: process.env.STANDBUY_S3_REGION,
        s3ForcePathStyle: true,
        endpoint: process.env.STANDBUY_S3_ENDPOINT,
        signatureVersion: 'v4',
      }
  );

  const params = {
    Bucket: process.env.STANDBUY_S3_BUCKET,
    Key: file.name,
    Body: file
  }
  return await s3.upload(params, function(err, data) {
      if (err) {
        console.log(err)  
        throw err;
      }      
  });

}