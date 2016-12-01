#subway-server

subway-server is an API server for the Subway project.

##Running

This framework uses [npm](https://www.npmjs.com), and a [mongodb](https://www.mongodb.com) database. Be sure to have both installed, and the latter running.


```bash
git clone https://github.com/tomidelucca/subway-server.git
cd subway-server
npm install
npm start
```

The server's default port is **3000**.

##Request & Response Examples

### Models

####City
```
    - id
    - name
    - country
    - lines [Line]
    - updated_at
```

####Line
```
    - id
    - name
    - line_code
    - color_code
    - stations [Station]
    - status
        - message
        - state
        - last_updated
```

####Station
```
    - id
    - name
    - address
        - coord
            - long
            - lat
    - working_hours [open, close, days]
    - combines [Line]
```

###API Resources

* GET /cities
* GET /cities/[id]
* GET /lines/[id]

#### GET /cities

Response body:


```json
[{
    "name": "Ciudad de Buenos Aires",
    "country": "Argentina",
    "updated_at": "2016-07-07T04:37:09.000Z",
    "id": "57650ec15ca55e12b906d6fd",
    "number_of_lines": 6
}]
```

####GET /cities/[id]

Response body:


```json
{
    "name": "Ciudad de Buenos Aires",
    "country": "Argentina",
    "updated_at": "2016-07-07T04:37:09.000Z",
    "lines": [{
        "name": "C",
        "line_code": "C",
        "color_code": "#126CB2",
        "status": {
            "message": "Normal",
            "state": "N",
            "last_updated": "2016-12-01T02:55:00.369Z"
        },
        "id": "5765bc03bd7a7ecabadf0201"
    }, {
        "name": "D",
        "line_code": "D",
        "color_code": "#157E69",
        "status": {
            "message": "Normal",
            "state": "N",
            "last_updated": "2016-12-01T02:55:00.369Z"
        },
        "id": "5765bc0bbd7a7ecabadf0202"
    }],
    "id": "57650ec15ca55e12b906d6fd"
}
```

####GET /lines/[id]

Example response:


```json
{
    "name": "D",
    "line_code": "D",
    "color_code": "#157E69",
    "stations": [{
        "name": "Callao",
        "address": {
            "coord": []
        },
        "combines": [],
        "working_hours": [],
        "id": "5765c670bd7a7ecabadf022b"
    }, {
        "name": "Tribunales",
        "central_dock": true,
        "address": {
            "coord": []
        },
        "combines": [],
        "working_hours": [],
        "id": "5765c670bd7a7ecabadf022c"
    }, {
        "name": "9 de Julio",
        "central_dock": true,
        "address": {
            "coord": []
        },
        "combines": [{
            "name": "B",
            "line_code": "B",
            "color_code": "#E61C2F",
            "id": "5765bb0cbd7a7ecabadf01ff"
        }, {
            "name": "C",
            "line_code": "C",
            "color_code": "#126CB2",
            "id": "5765bc03bd7a7ecabadf0201"
        }],
        "working_hours": [],
        "id": "5765c670bd7a7ecabadf022d"
    }],
    "status": {
        "message": "Normal",
        "state": "N",
        "last_updated": "2016-12-01T02:55:00.369Z"
    },
    "id": "5765bc0bbd7a7ecabadf0202"
}
```

##License

MIT License

Copyright (c) 2016 Tomi De Lucca

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
