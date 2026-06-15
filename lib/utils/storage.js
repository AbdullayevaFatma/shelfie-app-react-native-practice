
export const getBookCoverUrl = (fileId) => {
  if (!fileId) return null;

  return `${process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT}
  /storage/buckets/${process.env.EXPO_PUBLIC_BUCKET_ID}
  /files/${fileId}
  /view?project=${process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID}`;
};