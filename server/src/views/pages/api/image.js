import axios from 'axios';
import formidable from 'formidable'
import fs from 'fs'
import path, { dirname } from 'path'

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const formData = new FormData();

        const form = new formidable.IncomingForm()
        form.parse(req, async (err, field, files) => {
            const model = files.model
            fs.readFile(model.filepath, async (err, data) => {
                const fileData = {
                    name: model.originalFilename,
                    data
                }
                const response = await axios.post(`${process.env.SERVER_URL}/image/upload`, fileData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': req.header('Authorization')
                    }
                })
            })
        })
        // try {
        //     const response = await axios.post(`${process.env.SERVER_URL}/image/upload`, formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //             'Authorization': req.header('Authorization')
        //         }
        //     })
        //     console.log(response.data)
        
        // } catch(e) {
        //     console.log('error')
        // }
    
        //const response = await axios.post(`${process.env.SERVER_URL}/image/upload`, req.bod)
        res.status(200).send()
    }
}

export default handler;