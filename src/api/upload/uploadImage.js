const { format } = require('util');
const { Storage } = require('@google-cloud/storage');


const uploadRoute = (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  // Instantiate a storage client
  const storage = new Storage();
  // A bucket is a container for objects (files).
  const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);
  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on('error', (err) => {
    next(err);
  });

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
    );
    res.status(200).send(publicUrl);
  });

  blobStream.end(req.file.buffer);
};

module.exports = uploadRoute;
