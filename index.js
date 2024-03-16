const express = require('express')
const app = express()
const port = 3000

//Utility to parse the path name
const path = require('path');

// Enable CORS (import module and use it globally)
const cors = require('cors')
app.use(cors())

// Enable usage of CLI tools
const { exec, spawn } = require('child_process');

// Configure body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))

// Configure multer to handle file upload
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

// Logger
function MWLogger (req, res, next){
  console.log(`${req.method} ${req.path} ${req.ip}`)
  next()
}

    
// app.post("/stt", upload.single("sendfile"), MWLogger, (req, res)=>{
//
//   if (!['.mp3', '.mp4', '.mpweg', '.mpga', '.m4a', '.wav', '.webm'].includes(path.extname(req.file.originalname).toLowerCase())) return res.json({err:"Invalid type"})
//
//   exec(`whisper "uploads/${req.file.filename}" --model base --language=Spanish --output_dir text`, async (error, stdout, stderr) => {
//
//       res.setHeader('Content-Disposition',`attachment; filename=${req.file.originalname}.txt`);
//       res.setHeader('Content-Type', 'application/octet-stream');
//
//       return res.sendFile( __dirname +`/text/${req.file.filename}.txt`, (err)=>{
//         if (err) return res.json({err: err})
//         const remotion = `text/${req.file.filename}.vtt text/${req.file.filename}.txt text/${req.file.filename}.tsv text/${req.file.filename}.srt text/${req.file.filename}.json`
//         exec(`rm ${remotion}`)
//         exec(`rm "uploads/${req.file.filename}"` )
//       })    
//
//     })
//
// });




app.post("/stt", upload.single("sendfile"), MWLogger, (req, res) => {
    if (!['.mp3', '.mp4', '.mpweg', '.mpga', '.m4a', '.wav', '.webm'].includes(path.extname(req.file.originalname).toLowerCase())) {
        return res.json({ err: "Invalid type" });
    }

    const process = spawn('whisper', [`uploads/${req.file.filename}`, '--model', 'base', '--language=Spanish', '--output_dir', 'text']);

    process.stdout.on('data', (data) => {
        // Handle stdout data if needed
        console.log(`stdout: ${data}`);
    });

    process.stderr.on('data', (data) => {
        // Handle stderr data if needed
        console.error(`stderr: ${data}`);
    });

    process.on('close', async (code) => {
        if (code !== 0) {
            return res.json({ err: `Process exited with code ${code}` });
        }

        res.setHeader('Content-Disposition', `attachment; filename=${req.file.originalname}.txt`);
        res.setHeader('Content-Type', 'application/octet-stream');

        return res.sendFile(__dirname + `/text/${req.file.filename}.txt`, (err) => {
            if (err) {
                return res.json({ err: err });
            }
            const remotion = `text/${req.file.filename}.vtt text/${req.file.filename}.txt text/${req.file.filename}.tsv text/${req.file.filename}.srt text/${req.file.filename}.json uploads/${req.file.filename}`;
            spawn('rm', remotion.split(' ')); // Spawn a separate process to remove files
            // spawn('rm', [``]); // Spawn a separate process to remove uploaded file
        });
    });
});


//App is ready to go!
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
