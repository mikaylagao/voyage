#!/bin/sh
# 產生短母音音檔 assets/snd/*.mp3（需要 espeak-ng 與 ffmpeg）
set -e
cd "$(dirname "$0")/.."
mkdir -p assets/snd
for p in ae:a eh:E ih:I ah:0 uh:V uu:U schwa:@; do
  n=${p%%:*}; k=${p#*:}
  espeak-ng -v en-us+f2 -s 100 -a 160 -w /tmp/$n.wav "[['$k]]"
  ffmpeg -loglevel error -y -i /tmp/$n.wav -af "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,atempo=0.8,apad=pad_dur=0.05" -ac 1 -b:a 48k assets/snd/$n.mp3
done
