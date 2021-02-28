import "../../env";
import fs, { readFileSync } from "fs";
import { S3 } from "../aws";
import youtubedl from "youtube-dl";
import ffmpeg from "fluent-ffmpeg";
import { bot } from "../index";

export const downloadAndConvert = async (query) => {
  try {
    let file;
    let newName;

    const video = await youtubedl(
      query.update.callback_query.data,
      ["--format=18"],
      {
        cwd: __dirname,
      }
    );

    await video.pipe(fs.createWriteStream("myvideo.mp4"));

    await video.on("info", (info) => {
      console.log("Download started");
      console.log("filename: " + info._filename);
      console.log("size: " + info.size);
      const name = info._filename;
      name.replace(".mp4", ".mp3");
      const arr = name.split(".");
      arr[arr.length - 1] = "mp3";
      newName = arr.join(".");
    });

    video.on("end", async () => {
      console.log("finished downloading!");

      await ffmpeg("/home/vahag/Desktop/telegraf/myvideo.mp4")
        .withAudioCodec("libmp3lame")
        .toFormat("mp3")
        .saveToFile(`/home/vahag/Desktop/telegraf/music/${newName}`)
        .on("end", async () => {
          file = readFileSync(`/home/vahag/Desktop/telegraf/music/${newName}`);

          const params = {
            Bucket: process.env.BucketName,
            Key: newName,
            Body: file,
            ACL: "public-read",
          };

          await S3.upload(params)
            .promise()
            .then((res) => {
              console.log(res.Location);
              bot.telegram.sendAudio(query.from.id, res.Location);
            });

          await fs.unlink(
            `/home/vahag/Desktop/telegraf/music/${newName}`,
            (err) => {
              if (err) return console.error(err);
            }
          );
        });
    });
  } catch (err) {
    console.log(err);
  }
};
