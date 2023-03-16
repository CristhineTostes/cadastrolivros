import type { NextApiRequest, NextApiResponse } from 'next';
import { registerReq } from '../../types/registerReq';
import { bookModel } from '../../models/bookModel';
import { connectDB } from '../../middlewares/connectDB';
import  nextConnect  from 'next-connect';
import { upload, uploadImagemCosmic } from '../../services/uploadImagemCosmic';


const register = nextConnect()
  .use(upload.single('photo'))
  .post(async (
  req: NextApiRequest,
  res: NextApiResponse
  ) => {

  try {
    const registerBook = req.body as registerReq

    if (!registerBook.name)
      return res.status(400).json({error: "nome invalido"})
    else if (!registerBook.autor)
      return res.status(400).json({error: "autor invalido"})
    else if (!registerBook.edition)
      return res.status(400).json({error: "edicao invalida"})
    else (!registerBook.category)
      return res.status(400).json({error: "categoria invalida"})
   
    const image = await uploadImagemCosmic(req)

    const registeredBook = {
      name: registerBook.name,
      autor: registerBook.autor,
      edition: registerBook.edition,
      category: registerBook.category,
      file: image?.media.url
    }
     await bookModel.create(registeredBook);
     return res.status(200).json({msg:"Livro cadastrado com sucesso"})
  } catch (e) {
    console.log(e)
    return res.status(405).json({error:"metodo invalido"})
  }
})

export default connectDB(register);