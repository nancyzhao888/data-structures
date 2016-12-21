# Final Project One

### [App]()

### All Manhattan AA Meetings - Map Markers
[![](http://nancyzhao888.github.io/data-structures/final1/preview1.png)]()

### Info Window
[![](http://nancyzhao888.github.io/data-structures/final1/preview2.png)]()

##### Structure
* Meeting House Name
* Address
* Meeting Group Name 1
* Days - Time - Type
* Meeting Group Name 2
* Days - Time - Type

### Example Contents of Mongo Database

```javascript
{
		"locationName": "N.Y.U Bronfman Center",
		"groupName": "12 CONCEPTS WORKSHOP",
		"address": "7 East 10th Street, New York, NY",
		"detail": "Only meets on the 1st Wednesday of the month. A.A.'s 12 Concepts Meeting.",
		"days": [
			"Wednesdays"
		],
		"start": [
			2015
		],
		"end": [
			2115
		],
		"type": [
			"C"
		],
		"specialInterest": [
			null
		],
		"latLong": {
			"lat": 40.7332774,
			"lng": -73.99463109999999
		}
	},
	{
		"locationName": "Gustavus Adolphus Church",
		"groupName": "22 BELOW",
		"address": "155 East 22nd Street, New York, NY",
		"detail": "Trad.1st Wed., Fri.=Topic, Sat.=Round Robin Sharing All meetings are non-smoking.",
		"days": [
			"Thursdays",
			"Fridays",
			"Mondays",
			"Tuesdays",
			"Wednesdays"
		],
		"start": [
			1215,
			1215,
			1215,
			1215,
			1215
		],
		"end": [
			1315,
			1315,
			1315,
			1315,
			1315
		],
		"type": [
			"OD",
			"C",
			"BB",
			"B",
			"S"
		],
		"specialInterest": [
			null,
			null,
			null,
			"Living Sober",
			null
		],
		"latLong": {
			"lat": 40.7385571,
			"lng": -73.9840372
		}
	},
	{
		"locationName": "Three Jewels Community Center",
		"groupName": "AA AT THE THREE JEWELS",
		"address": "61 Fourth Avenue, New York, NY",
		"detail": "Topic meeting, focus is on meditation Thursday meeting ends at 7:10",
		"days": [
			"",
			""
		],
		"start": [
			1800,
			1900
		],
		"end": [
			1915,
			2030
		],
		"type": [
			"Thu",
			"Sun"
		],
		"specialInterest": [
			"Meditation",
			"Meditation"
		],
		"latLong": {
			"lat": 40.7307918,
			"lng": -73.9903808
		}
	}
```

### Result of Mongo query at 3:13pm on a Wednesday

```javascript
[
  {
    "_id": {
      "latLong": {
        "lat": 40.7656978,
        "lng": -73.9672859
      }
    },
    "meetingGroups": [
      {
        "groupInfo": {
          "latLong": {
            "lat": 40.7656978,
            "lng": -73.9672859
          },
          "meetingGroup": "RENEWAL EAST",
          "meetingHouse": "Central Presbyterian Church",
          "meetingAddress": "593 Park Avenue, New York, NY",
          "meetingDetails": "",
          "meetingWheelchair": "Wheelchair Access"
        },
        "meetingDay": [
          "Wednesdays"
        ],
        "meetingStartTime": [
          1830
        ],
        "meetingType": [
          "C"
        ]
      }
    ]
  },
  {
    "_id": {
      "latLong": {
        "lat": 40.7991395,
        "lng": -73.9711355
      }
    },
    "meetingGroups": [
      {
        "groupInfo": {
          "latLong": {
            "lat": 40.7991395,
            "lng": -73.9711355
          },
          "meetingGroup": "WESTSIDE 11th STEP MEDITATION WORKSHOP",
          "meetingHouse": "Addiction Institute",
          "meetingAddress": "306 West 102nd Street, New York, NY",
          "meetingDetails": ""
        },
        "meetingDay": [
          "Wednesdays"
        ],
        "meetingStartTime": [
          1900
        ],
        "meetingType": [
          "C"
        ]
      }
    ]
  },
  {
    "_id": {
      "latLong": {
        "lat": 40.7791559,
        "lng": -73.9563083
      }
    },
    "meetingGroups": [
      {
        "groupInfo": {
          "latLong": {
            "lat": 40.7791559,
            "lng": -73.9563083
          },
          "meetingGroup": "NEW CHOICES",
          "meetingHouse": "Congregational Kehilath Jeshurun",
          "meetingAddress": "125 East 85th Street, New York, NY",
          "meetingDetails": "",
          "meetingWheelchair": "Wheelchair Access"
        },
        "meetingDay": [
          "Wednesdays"
        ],
        "meetingStartTime": [
          1830
        ],
        "meetingType": [
          "S"
        ]
      }
    ]
  }
 ```