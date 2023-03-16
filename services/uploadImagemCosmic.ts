import multer from 'multer';
import cosmicjs from 'cosmicjs';

const{
    KEY_RECORD_BOOKS,
    BUCKET_BOOKS
} = process.env

const Cosmic = cosmicjs()

const bucketLivros = Cosmic.bucket({
    slug : BUCKET_BOOKS,
    write_key: KEY_RECORD_BOOKS
})

const storage = multer.memoryStorage()

const upload = multer({storage: storage})

const uploadImagemCosmic =async (req:any) => {
    if(req?.file?.originalname){
        const objeto_midea = {
            originalname: req.file.storage,
            buffer : req.file.buffer
        }
        return await bucketLivros.addMedia({media : objeto_midea});
    }
}
export {upload, uploadImagemCosmic}