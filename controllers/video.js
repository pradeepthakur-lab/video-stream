/* NODE-MODULES */
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
const async = require('async');
const bcrypt = require('bcryptjs');
const randomstring = require("randomstring");
const { check, validationResult, body } = require('express-validator');
const http = require('http');
const fs =require('fs');

/* Models */
// const Job = require('../models/job');

const jobController = {
    video(req, res){
        const range =req.headers.range;
        if(!range){
            res.status(400).send("require range headers");
        }
        const videoPath ="4K-Video-Unbelievable Beauty.mp4";
        const videoSize =fs.statSync("4K-Video-Unbelievable Beauty.mp4").size;

        //parse Range
        const chunkSize =10 ** 6; // 1Mb
        const start =Number(range.replace(/\D/g, ""));
        const end =Math.min(start + chunkSize, videoSize - 1);
        const contentSize = end - start + 1;
        const headers ={
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Lenght": contentSize,
            "Content-Type": "video/mp4",
        }
        
        res.writeHead(206, headers);
        const videoStream =fs.createReadStream(videoPath, {start, end});
        videoStream.pipe(res)

        // res.send(`Hello video!`);
    }
    
};

module.exports = jobController;