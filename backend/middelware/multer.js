import multer from "multer";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 20 * 1024 * 1024 },
}).fields([
    { name: 'bannerImg', maxCount: 1 },
    { name: 'profileImg', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
    {name:'logo',maxCount:1},
]);

export default upload;