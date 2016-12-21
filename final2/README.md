# Final Project Two

### [App](https://data-structures-2-nancyzhao888.c9users.io)

### Collecting Data with Potentiometer
![alt tag](https://raw.githubusercontent.com/nancyzhao888/data-structures/master/final2/IMG_0656.JPG)

* I built a metronome with the potentiometer and button. By turning the knob, I could control the frequence of the LED blinking to match the tempo of the song playing. By pressing the button and through a formula in the program, I am able to record the bpm of the song. 

### Design Sketch
![My image](https://raw.githubusercontent.com/nancyzhao888/data-structures/master/final2/music.png)


### Contents of Postgres Database 

```javascript
[ { genre: 'pop',
    metronomebpm: 74,
    monthcreated: Tue Dec 20 2016 02:41:24 GMT+0000 (UTC) },
  { genre: 'pop',
    metronomebpm: 121,
    monthcreated: Tue Dec 20 2016 02:42:32 GMT+0000 (UTC) },
  { genre: 'pop',
    metronomebpm: 109,
    monthcreated: Tue Dec 20 2016 02:43:44 GMT+0000 (UTC) },
  { genre: 'pop',
    metronomebpm: 124,
    monthcreated: Tue Dec 20 2016 02:45:05 GMT+0000 (UTC) },
  { genre: 'pop',
    metronomebpm: 94,
    monthcreated: Tue Dec 20 2016 02:46:34 GMT+0000 (UTC) },
  { genre: 'pop',
    metronomebpm: 138,
    monthcreated: Tue Dec 20 2016 02:47:30 GMT+0000 (UTC) },
  { genre: 'pop',
    metronomebpm: 104,
    monthcreated: Tue Dec 20 2016 02:48:40 GMT+0000 (UTC) },
  { genre: 'hiphop',
    metronomebpm: 148,
    monthcreated: Tue Dec 20 2016 02:51:21 GMT+0000 (UTC) },
  { genre: 'hiphop',
    metronomebpm: 136,
    monthcreated: Tue Dec 20 2016 02:52:24 GMT+0000 (UTC) },
  { genre: 'hiphop',
    metronomebpm: 146,
    monthcreated: Tue Dec 20 2016 02:53:00 GMT+0000 (UTC) },
  { genre: 'R&B',
    metronomebpm: 93,
    monthcreated: Tue Dec 20 2016 02:55:18 GMT+0000 (UTC) },
  { genre: 'R&B',
    metronomebpm: 80,
    monthcreated: Tue Dec 20 2016 02:56:15 GMT+0000 (UTC) },
  { genre: 'country',
    metronomebpm: 71,
    monthcreated: Tue Dec 20 2016 02:57:53 GMT+0000 (UTC) },
  { genre: 'pop',
    metronomebpm: 109,
    monthcreated: Tue Dec 20 2016 03:26:40 GMT+0000 (UTC) },
  { genre: 'pop',
    metronomebpm: 92,
    monthcreated: Tue Dec 20 2016 03:27:38 GMT+0000 (UTC) },
  { genre: 'pop',
    metronomebpm: 98,
    monthcreated: Tue Dec 20 2016 03:28:56 GMT+0000 (UTC) },
  { genre: 'pop',
    metronomebpm: 103,
    monthcreated: Tue Dec 20 2016 03:29:31 GMT+0000 (UTC) },
  { genre: 'pop',
    metronomebpm: 65,
    monthcreated: Tue Dec 20 2016 03:30:36 GMT+0000 (UTC) },
  { genre: 'pop',
    metronomebpm: 108,
    monthcreated: Tue Dec 20 2016 03:31:40 GMT+0000 (UTC) },
  { genre: 'pop',
    metronomebpm: 62,
    monthcreated: Tue Dec 20 2016 03:32:42 GMT+0000 (UTC) },
  { genre: 'pop',
    metronomebpm: 117,
    monthcreated: Tue Dec 20 2016 03:33:19 GMT+0000 (UTC) },
  { genre: 'pop',
    metronomebpm: 109,
    monthcreated: Tue Dec 20 2016 03:34:50 GMT+0000 (UTC) },
  { genre: 'hiphop',
    metronomebpm: 71,
    monthcreated: Tue Dec 20 2016 03:36:23 GMT+0000 (UTC) },
  { genre: 'hiphop',
    metronomebpm: 71,
    monthcreated: Tue Dec 20 2016 03:37:09 GMT+0000 (UTC) },
  { genre: 'hiphop',
    metronomebpm: 80,
    monthcreated: Tue Dec 20 2016 03:41:21 GMT+0000 (UTC) },
  { genre: 'R&B',
    metronomebpm: 97,
    monthcreated: Tue Dec 20 2016 03:42:44 GMT+0000 (UTC) },
  { genre: 'country',
    metronomebpm: 107,
    monthcreated: Tue Dec 20 2016 03:43:43 GMT+0000 (UTC) },
  { genre: 'electronic',
    metronomebpm: 112,
    monthcreated: Tue Dec 20 2016 03:44:53 GMT+0000 (UTC) } ]
```

### Reformatting Data for Visualization

```javascript
[{"genre":"pop","metronomebpm":74,"month":2},{"genre":"pop","metronomebpm":121,"month":2},
{"genre":"pop","metronomebpm":109,"month":2},{"genre":"pop","metronomebpm":124,"month":2},
{"genre":"pop","metronomebpm":94,"month":2},{"genre":"pop","metronomebpm":138,"month":2},
{"genre":"pop","metronomebpm":104,"month":2},{"genre":"hiphop","metronomebpm":148,"month":2},
{"genre":"hiphop","metronomebpm":136,"month":2},{"genre":"hiphop","metronomebpm":146,"month":2},
{"genre":"R&B","metronomebpm":93,"month":2},{"genre":"R&B","metronomebpm":80,"month":2},
{"genre":"country","metronomebpm":71,"month":2},{"genre":"pop","metronomebpm":109,"month":3},
{"genre":"pop","metronomebpm":92,"month":3},{"genre":"pop","metronomebpm":98,"month":3},
{"genre":"pop","metronomebpm":103,"month":3},{"genre":"pop","metronomebpm":65,"month":3},
{"genre":"pop","metronomebpm":108,"month":3},{"genre":"pop","metronomebpm":62,"month":3},
{"genre":"pop","metronomebpm":117,"month":3},{"genre":"pop","metronomebpm":109,"month":3},
{"genre":"hiphop","metronomebpm":71,"month":3},{"genre":"hiphop","metronomebpm":71,"month":3},
{"genre":"hiphop","metronomebpm":80,"month":3},{"genre":"R&B","metronomebpm":97,"month":3},
{"genre":"country","metronomebpm":107,"month":3},{"genre":"electronic","metronomebpm":112,"month":3}]
```